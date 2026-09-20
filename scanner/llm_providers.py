import json
import os
import re
from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Any, Dict, List, Optional

import requests

from scanner.findings import EnrichedFinding, RuleHit, VulnRule, finding_from_rule_hit

@dataclass
class LLMVerdict:
    is_true_positive: bool
    adjusted_severity: str
    what_and_why: str
    how_to_fix: str
    why_fix_helps: str
    confidence: float

class LLMProvider(ABC):
    @abstractmethod
    def analyze_hits(self, hits: list[RuleHit]) -> dict[str, LLMVerdict]:
        """Analyze rule hits and return verdicts keyed by hit fingerprint."""
        pass
    
    def _build_prompt(self, hit: RuleHit) -> str:
        """Build the analysis prompt for a single hit."""
        rule_info = (
            f"Rule ID: {hit.rule.id}\n"
            f"Rule Name: {hit.rule.name}\n"
            f"CWE: {hit.rule.cwe}\n"
            f"Description: {hit.rule.description}\n"
        )
        code_context = (
            f"File: {hit.file}\n"
            f"Line: {hit.line}\n"
            f"Matched Text: {hit.matched_text}\n"
            f"Context:\n{hit.context}\n"
        )
        
        prompt = (
            "You are a senior security engineer analyzing potential security vulnerabilities.\n"
            "Review the following finding and determine if it is a true positive.\n\n"
            f"{rule_info}\n"
            "--- Code Context ---\n"
            f"{code_context}\n"
            "--------------------\n"
            "Please respond ONLY with a JSON object containing the following exact keys:\n"
            "- \"is_true_positive\" (boolean)\n"
            "- \"severity\" (string: CRITICAL, HIGH, MEDIUM, LOW, INFO)\n"
            "- \"what_and_why\" (string: detailed explanation of the vulnerability and attacker impact)\n"
            "- \"how_to_fix\" (string: actionable remediation steps)\n"
            "- \"why_fix_helps\" (string: explanation of the security benefit)\n"
            "- \"confidence\" (float: 0.0 to 1.0 indicating your confidence)\n"
        )
        return prompt

    def _build_batch_prompt(self, hits: list[RuleHit]) -> str:
        """Build the analysis prompt for multiple hits in the same file."""
        if not hits:
            return ""
        
        prompt = (
            "You are a senior security engineer analyzing potential security vulnerabilities.\n"
            "Review the following findings from a source file and determine if each is a true positive.\n\n"
        )
        
        for i, hit in enumerate(hits):
            prompt += f"--- Finding {i + 1} (Fingerprint: {hit.fingerprint}) ---\n"
            prompt += f"Rule ID: {hit.rule.id} (CWE: {hit.rule.cwe})\n"
            prompt += f"Description: {hit.rule.description}\n"
            prompt += f"Line: {hit.line}\n"
            prompt += f"Matched Text: {hit.matched_text}\n"
            prompt += f"Context:\n{hit.context}\n"
            prompt += "--------------------------------------\n\n"
            
        prompt += (
            "Please respond ONLY with a JSON dictionary where keys are the finding 'Fingerprint' "
            "and values are objects containing the exact following keys:\n"
            "- \"is_true_positive\" (boolean)\n"
            "- \"severity\" (string: CRITICAL, HIGH, MEDIUM, LOW, INFO)\n"
            "- \"what_and_why\" (string: detailed explanation of the vulnerability and attacker impact)\n"
            "- \"how_to_fix\" (string: actionable remediation steps)\n"
            "- \"why_fix_helps\" (string: explanation of the security benefit)\n"
            "- \"confidence\" (float: 0.0 to 1.0 indicating your confidence)\n"
        )
        return prompt

    def _parse_response(self, response_text: str) -> LLMVerdict:
        """Parse LLM response into a structured verdict."""
        try:
            match = re.search(r"\{.*\}", response_text, re.DOTALL)
            json_str = match.group(0) if match else response_text
            data = json.loads(json_str)
            return LLMVerdict(
                is_true_positive=bool(data.get("is_true_positive", False)),
                adjusted_severity=str(data.get("severity", "INFO")).upper(),
                what_and_why=str(data.get("what_and_why", "")),
                how_to_fix=str(data.get("how_to_fix", "")),
                why_fix_helps=str(data.get("why_fix_helps", "")),
                confidence=float(data.get("confidence", 0.0))
            )
        except Exception:
            # Return a default fallback on parsing failure
            return LLMVerdict(False, "INFO", "Parse failed", "", "", 0.0)
            
    def _parse_batch_response(self, response_text: str, hits: list[RuleHit]) -> dict[str, LLMVerdict]:
        """Parse LLM response for a batch of hits."""
        results = {}
        try:
            match = re.search(r"\{.*\}", response_text, re.DOTALL)
            json_str = match.group(0) if match else response_text
            data = json.loads(json_str)
            
            for hit in hits:
                fp = hit.fingerprint
                if fp in data:
                    item = data[fp]
                    results[fp] = LLMVerdict(
                        is_true_positive=bool(item.get("is_true_positive", False)),
                        adjusted_severity=str(item.get("severity", hit.rule.severity)).upper(),
                        what_and_why=str(item.get("what_and_why", hit.rule.impact)),
                        how_to_fix=str(item.get("how_to_fix", hit.rule.remediation)),
                        why_fix_helps=str(item.get("why_fix_helps", "")),
                        confidence=float(item.get("confidence", 0.5))
                    )
                else:
                    results[fp] = self._get_fallback_verdict(hit)
        except Exception:
            for hit in hits:
                results[hit.fingerprint] = self._get_fallback_verdict(hit)
        
        return results

    def _get_fallback_verdict(self, hit: RuleHit) -> LLMVerdict:
        return LLMVerdict(
            is_true_positive=True,
            adjusted_severity=hit.rule.severity,
            what_and_why=hit.rule.impact,
            how_to_fix=hit.rule.remediation,
            why_fix_helps="Mitigates vulnerability",
            confidence=0.5
        )

class GeminiProvider(LLMProvider):
    """Google Gemini API provider using google-genai SDK."""
    def __init__(self, api_key: str | None = None, model_name: str = 'gemini-3.5-flash-lite'):
        self.model_name = model_name or 'gemini-3.5-flash-lite'
        self.api_key = api_key or os.environ.get("GEMINI_API_KEY") or DEFAULT_GEMINI_API_KEY
        if not self.api_key:
            print("Warning: Gemini API key not found.")
            self.client = None
        else:
            try:
                from google import genai
                self.client = genai.Client(api_key=self.api_key)
            except ImportError:
                print("Warning: google-genai not installed.")
                self.client = None

    def analyze_hits(self, hits: list[RuleHit]) -> dict[str, LLMVerdict]:
        if not self.client:
            return {hit.fingerprint: self._get_fallback_verdict(hit) for hit in hits}
            
        # Batch by file
        from collections import defaultdict
        file_hits = defaultdict(list)
        for hit in hits:
            file_hits[hit.file].append(hit)
            
        verdicts = {}
        for fpath, fhits in file_hits.items():
            prompt = self._build_batch_prompt(fhits)
            try:
                response = self.client.models.generate_content(
                    model=self.model_name,
                    contents=prompt
                )
                batch_results = self._parse_batch_response(response.text, fhits)
                verdicts.update(batch_results)
            except Exception as e:
                print(f"Error calling Gemini: {e}")
                for hit in fhits:
                    verdicts[hit.fingerprint] = self._get_fallback_verdict(hit)
        return verdicts

class OllamaProvider(LLMProvider):
    """Ollama local model provider."""
    def __init__(self, model_name: str | None = None, base_url: str = 'http://localhost:11434'):
        self.base_url = base_url.rstrip("/")
        
        available = self.fetch_available_models(self.base_url)
        if not available:
            print("Warning: No Ollama models found or Ollama not running.")
            self.model_name = None
        elif model_name is None or model_name not in available:
            self.model_name = self.prompt_model_selection(available)
        else:
            self.model_name = model_name

    @staticmethod
    def fetch_available_models(base_url: str = 'http://localhost:11434') -> list[str]:
        """Fetch list of available Ollama models via GET /api/tags."""
        try:
            response = requests.get(f"{base_url}/api/tags", timeout=5)
            response.raise_for_status()
            data = response.json()
            return [m.get("name") for m in data.get("models", []) if m.get("name")]
        except Exception:
            return []

    @staticmethod
    def prompt_model_selection(models: list[str]) -> str:
        """Display available models and prompt user to select one."""
        if not models:
            return "default"
        print("Available Ollama models:")
        for i, m in enumerate(models):
            print(f"{i + 1}. {m}")
        
        while True:
            try:
                choice = input(f"Select a model (1-{len(models)}): ")
                idx = int(choice) - 1
                if 0 <= idx < len(models):
                    return models[idx]
            except ValueError:
                pass
            print("Invalid selection.")

    def analyze_hits(self, hits: list[RuleHit]) -> dict[str, LLMVerdict]:
        if not self.model_name:
            return {hit.fingerprint: self._get_fallback_verdict(hit) for hit in hits}
            
        from collections import defaultdict
        file_hits = defaultdict(list)
        for hit in hits:
            file_hits[hit.file].append(hit)
            
        verdicts = {}
        for fpath, fhits in file_hits.items():
            prompt = self._build_batch_prompt(fhits)
            try:
                payload = {
                    "model": self.model_name,
                    "prompt": prompt,
                    "stream": False
                }
                response = requests.post(
                    f"{self.base_url}/api/generate",
                    json=payload,
                    timeout=60
                )
                response.raise_for_status()
                response_text = response.json().get("response", "")
                batch_results = self._parse_batch_response(response_text, fhits)
                verdicts.update(batch_results)
            except Exception as e:
                print(f"Error calling Ollama: {e}")
                for hit in fhits:
                    verdicts[hit.fingerprint] = self._get_fallback_verdict(hit)
        return verdicts

class CustomProvider(LLMProvider):
    """Custom OpenAI-compatible endpoint."""
    def __init__(self, api_url: str, model_name: str = 'default', api_key: str | None = None):
        self.api_url = api_url.rstrip("/")
        self.model_name = model_name
        self.api_key = api_key

    def analyze_hits(self, hits: list[RuleHit]) -> dict[str, LLMVerdict]:
        from collections import defaultdict
        file_hits = defaultdict(list)
        for hit in hits:
            file_hits[hit.file].append(hit)
            
        headers = {"Content-Type": "application/json"}
        if self.api_key:
            headers["Authorization"] = f"Bearer {self.api_key}"
            
        verdicts = {}
        for fpath, fhits in file_hits.items():
            prompt = self._build_batch_prompt(fhits)
            try:
                payload = {
                    "model": self.model_name,
                    "messages": [
                        {"role": "user", "content": prompt}
                    ]
                }
                endpoint = f"{self.api_url}/v1/chat/completions"
                if not endpoint.startswith("http"):
                    endpoint = f"https://{endpoint}"
                    
                response = requests.post(endpoint, json=payload, headers=headers, timeout=60)
                response.raise_for_status()
                data = response.json()
                content = data["choices"][0]["message"]["content"]
                
                batch_results = self._parse_batch_response(content, fhits)
                verdicts.update(batch_results)
            except Exception as e:
                print(f"Error calling custom provider: {e}")
                for hit in fhits:
                    verdicts[hit.fingerprint] = self._get_fallback_verdict(hit)
        return verdicts

class NoLLMProvider(LLMProvider):
    """Pass-through provider that returns rule-based verdicts without LLM."""
    def analyze_hits(self, hits: list[RuleHit]) -> dict[str, LLMVerdict]:
        verdicts = {}
        for hit in hits:
            verdicts[hit.fingerprint] = self._get_fallback_verdict(hit)
        return verdicts

def create_provider(model_type: str, **kwargs) -> LLMProvider:
    """Factory function to create the right provider."""
    model_type = model_type.lower()
    if model_type == "gemini":
        return GeminiProvider(
            api_key=kwargs.get("api_key"),
            model_name=kwargs.get("model_name", "gemini-3.5-flash-lite")
        )
    elif model_type == "ollama":
        return OllamaProvider(
            model_name=kwargs.get("model_name"),
            base_url=kwargs.get("base_url", "http://localhost:11434")
        )
    elif model_type == "custom":
        return CustomProvider(
            api_url=kwargs.get("api_url", ""),
            model_name=kwargs.get("model_name", "default"),
            api_key=kwargs.get("api_key")
        )
    else:
        return NoLLMProvider()
