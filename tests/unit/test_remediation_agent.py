"""
Tests for remediation agent edit verification and application logic.
"""
import pytest
from remediation.remediation_agent import EditProposal, RemediationAgent


SAMPLE_CODE = """const express = require("express");
const mysql = require("mysql2");

app.get("/user", (req, res) => {
  const username = req.query.username;

  const query = `SELECT * FROM users WHERE username = '${username}'`;

  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err.message);
    res.json(results);
  });
});
"""


def test_verify_edit_exact_match():
    edit = EditProposal(
        file="server.js",
        start_line=7,
        end_line=7,
        original="  const query = `SELECT * FROM users WHERE username = '${username}'`;",
        replacement="  const query = 'SELECT * FROM users WHERE username = ?';",
        explanation="Use parameterized query placeholder"
    )
    assert RemediationAgent._verify_edit(SAMPLE_CODE, edit) is True


def test_verify_edit_mismatch():
    edit = EditProposal(
        file="server.js",
        start_line=7,
        end_line=7,
        original="  const query = 'SELECT * FROM users';",
        replacement="  const query = 'SELECT * FROM users WHERE username = ?';",
        explanation="Mismatch original"
    )
    assert RemediationAgent._verify_edit(SAMPLE_CODE, edit) is False


def test_verify_edit_out_of_bounds():
    edit = EditProposal(
        file="server.js",
        start_line=100,
        end_line=105,
        original="something",
        replacement="replacement",
        explanation="Out of bounds"
    )
    assert RemediationAgent._verify_edit(SAMPLE_CODE, edit) is False


def test_apply_edit_success():
    edit = EditProposal(
        file="server.js",
        start_line=7,
        end_line=7,
        original="  const query = `SELECT * FROM users WHERE username = '${username}'`;",
        replacement="  const query = 'SELECT * FROM users WHERE username = ?';",
        explanation="Use parameterized query"
    )
    new_content = RemediationAgent._apply_edit(SAMPLE_CODE, edit)
    assert "SELECT * FROM users WHERE username = ?" in new_content
    assert "${username}" not in new_content


def test_context_extraction():
    # Test context extraction heuristic
    agent = RemediationAgent(api_key="mock_key", repo_path=".")
    ctx, start, end = agent._extract_context(SAMPLE_CODE, line=7, end_line=7)
    assert "7:   const query = `SELECT * FROM users WHERE username = '${username}'`;" in ctx
    assert start <= 7
    assert end >= 7

