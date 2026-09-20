from dataclasses import dataclass, field
import os
import subprocess
import re

@dataclass
class DiffHunk:
    file: str
    added_lines: dict[int, str]    # line_num -> line_content (only added/modified)
    context_lines: dict[int, str]  # surrounding context lines

class DiffParser:
    @staticmethod
    def parse_unified_diff(diff_text: str) -> list[DiffHunk]:
        hunks = []
        current_hunk = None
        current_file = ""
        current_line_num = 0
        
        for line in diff_text.splitlines():
            if line.startswith("+++ "):
                current_file = line[4:].lstrip("b/")
                current_hunk = DiffHunk(file=current_file, added_lines={}, context_lines={})
                hunks.append(current_hunk)
            elif line.startswith("@@ "):
                # @@ -X,Y +A,B @@
                match = re.search(r"@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@", line)
                if match:
                    current_line_num = int(match.group(1))
            elif current_hunk:
                if line.startswith("+"):
                    current_hunk.added_lines[current_line_num] = line[1:]
                    current_line_num += 1
                elif line.startswith(" "):
                    current_hunk.context_lines[current_line_num] = line[1:]
                    current_line_num += 1
                elif line.startswith("-") or line == "\\ No newline at end of file":
                    pass
        
        return hunks
    
    @staticmethod
    def parse_git_diff(repo_path: str, base: str = 'HEAD~1', head: str = 'HEAD') -> list[DiffHunk]:
        try:
            result = subprocess.run(
                ["git", "diff", f"{base}..{head}"],
                cwd=repo_path,
                capture_output=True,
                text=True,
                check=True
            )
            return DiffParser.parse_unified_diff(result.stdout)
        except subprocess.CalledProcessError:
            return []
    
    @staticmethod
    def parse_diff_file(diff_file_path: str) -> list[DiffHunk]:
        with open(diff_file_path, "r", encoding="utf-8") as f:
            content = f.read()
            # If file is JSON, parse as json payload
            if diff_file_path.endswith(".json") or content.strip().startswith("{"):
                try:
                    return DiffParser.parse_json_payload(content)
                except Exception:
                    pass
            return DiffParser.parse_unified_diff(content)
    
    @staticmethod
    def parse_json_payload(data: dict | str, include_context: bool = True) -> list[DiffHunk]:
        import json
        if isinstance(data, str):
            data = json.loads(data)
            
        hunks = []
        files_data = []
        if "changes" in data and isinstance(data["changes"], dict) and "files" in data["changes"]:
            files_data = data["changes"]["files"]
        elif "files" in data and isinstance(data["files"], list):
            files_data = data["files"]
            
        for f in files_data:
            file_path = f.get("path") or f.get("filename") or "unknown"
            hunk_list = f.get("hunks", [])
            for h in hunk_list:
                added_lines = {}
                context_lines = {}
                for line_item in h.get("lines", []):
                    line_type = line_item.get("type")
                    content = line_item.get("content", "")
                    line_no = line_item.get("new_line") or line_item.get("old_line") or 0
                    if line_type == "added":
                        added_lines[line_no] = content
                    elif line_type == "context":
                        context_lines[line_no] = content
                        if include_context:
                            added_lines[line_no] = content
                            
                if added_lines or context_lines:
                    hunks.append(DiffHunk(file=file_path, added_lines=added_lines, context_lines=context_lines))
            
            if not hunk_list and "diff" in f and f["diff"]:
                hunks.extend(DiffParser.parse_unified_diff(f["diff"]))
                
        return hunks

    @staticmethod
    def parse_json_file(file_path: str, include_context: bool = True) -> list[DiffHunk]:
        with open(file_path, "r", encoding="utf-8") as f:
            return DiffParser.parse_json_payload(f.read(), include_context=include_context)
    
    @staticmethod
    def walk_repo(repo_path: str, extensions: list[str] | None = None) -> list[DiffHunk]:
        skip_dirs = {".git", "node_modules", "__pycache__", ".venv", "venv", "dist", "build", ".next"}
        hunks = []
        
        for root, dirs, files in os.walk(repo_path):
            dirs[:] = [d for d in dirs if d not in skip_dirs]
            
            for file in files:
                if extensions and not any(file.endswith(ext) for ext in extensions):
                    continue
                    
                file_path = os.path.join(root, file)
                rel_path = os.path.relpath(file_path, repo_path)
                
                try:
                    with open(file_path, "rb") as f:
                        header = f.read(1024)
                        if b"\0" in header:
                            continue
                            
                    with open(file_path, "r", encoding="utf-8") as f:
                        lines = f.read().splitlines()
                        
                    added_lines = {i + 1: line for i, line in enumerate(lines)}
                    hunks.append(DiffHunk(file=rel_path.replace("\\", "/"), added_lines=added_lines, context_lines={}))
                except UnicodeDecodeError:
                    continue
                    
        return hunks
