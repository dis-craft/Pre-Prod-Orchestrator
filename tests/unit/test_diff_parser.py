"""Unit tests for the diff parser."""

import os
import sys
import tempfile

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from scanner.diff_parser import DiffParser, DiffHunk


SAMPLE_DIFF = """diff --git a/app.py b/app.py
index 1234567..abcdefg 100644
--- a/app.py
+++ b/app.py
@@ -10,6 +10,8 @@ def handler():
     user = get_user()
     if user:
         name = user.name
+        password = "hardcoded_secret"
+        cursor.execute(f"SELECT * FROM users WHERE id = {user_id}")
         return render(name)
     return None
"""


class TestDiffParser:
    """Tests for the DiffParser class."""

    def test_parse_unified_diff_extracts_hunks(self):
        hunks = DiffParser.parse_unified_diff(SAMPLE_DIFF)
        assert len(hunks) == 1
        assert hunks[0].file == "app.py"

    def test_parse_unified_diff_extracts_added_lines(self):
        hunks = DiffParser.parse_unified_diff(SAMPLE_DIFF)
        added = hunks[0].added_lines
        assert len(added) == 2
        assert any("hardcoded_secret" in line for line in added.values())
        assert any("execute" in line for line in added.values())

    def test_parse_unified_diff_line_numbers(self):
        hunks = DiffParser.parse_unified_diff(SAMPLE_DIFF)
        added = hunks[0].added_lines
        # The +10,8 means starting at line 10, and the two added lines come after 3 context lines
        # Line 10 = context, 11 = context, 12 = context, 13 = added, 14 = added
        line_nums = sorted(added.keys())
        assert line_nums[0] == 13
        assert line_nums[1] == 14

    def test_parse_unified_diff_context_lines(self):
        hunks = DiffParser.parse_unified_diff(SAMPLE_DIFF)
        context = hunks[0].context_lines
        assert len(context) > 0
        assert any("user" in line for line in context.values())

    def test_parse_unified_diff_empty_input(self):
        hunks = DiffParser.parse_unified_diff("")
        assert hunks == []

    def test_parse_unified_diff_multiple_files(self):
        multi_diff = SAMPLE_DIFF + """diff --git a/config.py b/config.py
--- a/config.py
+++ b/config.py
@@ -1,3 +1,4 @@
 DEBUG = True
+SECRET_KEY = "abc123"
 PORT = 8080
"""
        hunks = DiffParser.parse_unified_diff(multi_diff)
        assert len(hunks) == 2
        assert hunks[0].file == "app.py"
        assert hunks[1].file == "config.py"

    def test_parse_diff_file(self):
        with tempfile.NamedTemporaryFile(mode="w", suffix=".patch", delete=False, encoding="utf-8") as f:
            f.write(SAMPLE_DIFF)
            f.flush()
            hunks = DiffParser.parse_diff_file(f.name)
        os.unlink(f.name)
        assert len(hunks) == 1
        assert hunks[0].file == "app.py"

    def test_walk_repo_skips_git_dir(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            # Create .git directory with a file
            git_dir = os.path.join(tmpdir, ".git")
            os.makedirs(git_dir)
            with open(os.path.join(git_dir, "config"), "w") as f:
                f.write("gitconfig")

            # Create a normal Python file
            with open(os.path.join(tmpdir, "app.py"), "w") as f:
                f.write("print('hello')\n")

            hunks = DiffParser.walk_repo(tmpdir)
            files = [h.file for h in hunks]
            assert any("app.py" in f for f in files)
            assert not any(".git" in f for f in files)

    def test_walk_repo_skips_node_modules(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            nm_dir = os.path.join(tmpdir, "node_modules", "pkg")
            os.makedirs(nm_dir)
            with open(os.path.join(nm_dir, "index.js"), "w") as f:
                f.write("module.exports = {}\n")

            with open(os.path.join(tmpdir, "main.js"), "w") as f:
                f.write("console.log('hi')\n")

            hunks = DiffParser.walk_repo(tmpdir)
            files = [h.file for h in hunks]
            assert any("main.js" in f for f in files)
            assert not any("node_modules" in f for f in files)

    def test_walk_repo_skips_binary_files(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            with open(os.path.join(tmpdir, "binary.bin"), "wb") as f:
                f.write(b"\x00\x01\x02\x03" * 100)

            with open(os.path.join(tmpdir, "text.py"), "w") as f:
                f.write("x = 1\n")

            hunks = DiffParser.walk_repo(tmpdir)
            files = [h.file for h in hunks]
            assert any("text.py" in f for f in files)
            assert not any("binary.bin" in f for f in files)

    def test_walk_repo_extension_filter(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            with open(os.path.join(tmpdir, "app.py"), "w") as f:
                f.write("x = 1\n")
            with open(os.path.join(tmpdir, "style.css"), "w") as f:
                f.write("body {}\n")

            hunks = DiffParser.walk_repo(tmpdir, extensions=[".py"])
            files = [h.file for h in hunks]
            assert any("app.py" in f for f in files)
            assert not any("style.css" in f for f in files)

    def test_walk_repo_all_lines_as_added(self):
        """In full-repo mode, all lines should appear as added_lines."""
        with tempfile.TemporaryDirectory() as tmpdir:
            with open(os.path.join(tmpdir, "test.py"), "w") as f:
                f.write("line1\nline2\nline3\n")

            hunks = DiffParser.walk_repo(tmpdir)
            assert len(hunks) == 1
            assert len(hunks[0].added_lines) == 3
            assert hunks[0].added_lines[1] == "line1"
            assert hunks[0].added_lines[2] == "line2"
            assert hunks[0].added_lines[3] == "line3"

