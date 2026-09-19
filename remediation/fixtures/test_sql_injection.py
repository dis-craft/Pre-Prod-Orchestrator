from remediation.fixtures.vulnerable_sql import get_user

class FakeConnection:
    def __init__(self):
        self.calls = []
    def execute(self, query, params=None):
        self.calls.append((query, params))
        return self.calls[-1]

def test_parameterized_query():
    conn = FakeConnection()
    get_user(conn, "alice")
    assert conn.calls == [("SELECT * FROM users WHERE name = '?'", ("alice",))]
