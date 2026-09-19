import json
from pathlib import Path
from jsonschema import validate
from remediation.models import RemediationResult

def test_remediation_result_matches_contract():
    root=Path(__file__).resolve().parents[2]
    schema=json.loads((root/"contracts"/"remediation.schema.json").read_text())
    validate(RemediationResult("f1","REJECTED","","rejected").as_contract(),schema)
