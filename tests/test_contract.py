import importlib.util
import sys
import types
from pathlib import Path

import pytest

class _Decorator:
    def __call__(self, fn): return fn
class _VM:
    UserError = ValueError
    @staticmethod
    def run_nondet(leader, validator):
        result = leader()
        assert validator(result) == result
        return result
class _Nondet:
    def __init__(self): self.result = {"v":1,"decision":"COMPATIBLE","reason_code":"ALIGNED","evidence_hash":"a"*64}
    def exec_prompt(self, prompt, response_format=None):
        assert response_format == "json"
        assert "UNTRUSTED BASE" in prompt
        return self.result
class _Contract: pass
class _GL:
    contract = types.SimpleNamespace(Contract=_Contract)
    public = types.SimpleNamespace(write=_Decorator(), view=_Decorator())
    vm = _VM()
    nondet = _Nondet()
    message = types.SimpleNamespace(sender_address="0xowner")

gl = _GL()
sys.modules["genlayer"] = gl
spec = importlib.util.spec_from_file_location("contract", Path(__file__).parents[1] / "contracts" / "main.py")
contract = importlib.util.module_from_spec(spec)
spec.loader.exec_module(contract)


def test_create_freeze_evaluate_and_readback():
    instance = contract.ClauseBranchCompatibilityCouncil()
    pair_id = instance.create_pair("base", "branch", "n1")
    assert pair_id == 1
    assert instance.create_pair("base", "branch", "n1") == pair_id
    instance.freeze_pair(pair_id, 0)
    result = instance.evaluate_pair(pair_id, 1)
    assert result["decision"] == "COMPATIBLE"
    assert instance.get_decision(pair_id)["state"] == "COMPATIBLE"


def test_invalid_consensus_result_fails_closed():
    instance = contract.ClauseBranchCompatibilityCouncil()
    pair_id = instance.create_pair("base", "branch", "n2")
    instance.freeze_pair(pair_id, 0)
    gl.nondet.result = {"v": 1, "decision": "COMPATIBLE"}
    with pytest.raises(ValueError):
        instance.evaluate_pair(pair_id, 1)
    assert instance.get_pair(pair_id)["state"] == "FROZEN"


