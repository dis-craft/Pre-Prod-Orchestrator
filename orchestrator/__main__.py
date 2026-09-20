import sys

if __name__ == "__main__":
    if len(sys.argv) > 1 and any(arg.startswith("--") for arg in sys.argv):
        import argparse
        import json
        import logging
        from orchestrator.pipeline import Pipeline, PipelineConfig

        logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
        parser = argparse.ArgumentParser(prog="orchestrator", description="Pre-Prod Orchestrator CLI")
        parser.add_argument("--findings", required=True, type=str)
        parser.add_argument("--repo", default=".", type=str)
        parser.add_argument("--api-key", default=None, type=str)
        parser.add_argument("--model-name", default="gemini-3.6-flash", type=str)
        parser.add_argument("--base", default="main", type=str)
        parser.add_argument("--severity-threshold", default="INFO", type=str)
        parser.add_argument("--branch-prefix", default="security-remediation", type=str)
        parser.add_argument("--dry-run", action="store_true")
        args = parser.parse_args()

        config = PipelineConfig(
            repo_path=args.repo,
            findings_path=args.findings,
            api_key=args.api_key or "",
            model_name=args.model_name,
            base_ref=args.base,
            severity_threshold=args.severity_threshold,
            dry_run=args.dry_run,
            branch_prefix=args.branch_prefix,
        )
        pipeline = Pipeline(config)
        res = pipeline.run()
        print(json.dumps(res, indent=2))
    else:
        try:
            import uvicorn
            uvicorn.run("orchestrator.main:app", host="127.0.0.1", port=8000, reload=False)
        except ImportError:
            print("uvicorn not installed. Use CLI options: python -m orchestrator --findings <file>")
            sys.exit(1)
