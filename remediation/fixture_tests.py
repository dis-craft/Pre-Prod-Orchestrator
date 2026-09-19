"""Stdlib-only acceptance test for the seeded SQL remediation fixture."""
from remediation.fixtures.vulnerable_sql import get_user

class FakeConnection:
    def __init__(self):
        self.calls = []
    def execute(self, query, params=None):
        self.calls.append((query, params))
        return self.calls[-1]

def main() -> int:
    conn = FakeConnection()
    get_user(conn, "alice")
    assert conn.calls == [("SELECT * FROM users WHERE name = ?", ("alice",))]
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
