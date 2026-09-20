## 🛡️ AI Security Remediation

**4** finding(s) fixed | **7** failed | **0** skipped

### ✅ Applied Fixes

| Finding | File | Line | CWE | Severity | Fix |
|---------|------|------|-----|----------|-----|
| `INJ-SQL-JS` | `new_vulnerable_service.js` | L17-19 | CWE-89 | CRITICAL | Use parameterized SQL query to prevent SQL injection. |
| `INJ-CMD-JS` | `new_vulnerable_service.js` | L28-28 | CWE-78 | CRITICAL | Use execFile with an argument array instead of exec to prevent command injection. |
| `INJ-SQL-JS` | `vulnerable.js` | L18-20 | CWE-89 | CRITICAL | Use parameterized query instead of string interpolation to prevent SQL injection. |
| `INJ-CMD-JS` | `vulnerable.js` | L28-28 | CWE-78 | CRITICAL | Use execFile with arguments array to safely execute commands without passing input through a shell. |

<details>
<summary>📝 Detailed changes</summary>

#### INJ-SQL-JS — `new_vulnerable_service.js:17`

**Attacker can execute arbitrary SQL queries.**

**`new_vulnerable_service.js` L17-19:**
```diff
-   const sql = `SELECT * FROM invoices WHERE customer_id = '${customerId}'`;
- 
-   db.query(sql, (err, rows) => {
+   const sql = "SELECT * FROM invoices WHERE customer_id = ?";
+ 
+   db.query(sql, [customerId], (err, rows) => {
```

#### INJ-CMD-JS — `new_vulnerable_service.js:28`

**Attacker can execute arbitrary OS commands.**

**`new_vulnerable_service.js` L28-28:**
```diff
-   require("child_process").exec(`tar -czf backup.tar.gz ${targetFolder}`, (err, stdout) => {
+   require("child_process").execFile("tar", ["-czf", "backup.tar.gz", targetFolder], (err, stdout) => {
```

#### INJ-SQL-JS — `vulnerable.js:18`

**Attacker can execute arbitrary SQL queries.**

**`vulnerable.js` L18-20:**
```diff
-   const query = `SELECT * FROM users WHERE username = '${username}'`;
- 
-   db.query(query, (err, results) => {
+   db.query("SELECT * FROM users WHERE username = ?", [username], (err, results) => {
```

#### INJ-CMD-JS — `vulnerable.js:30`

**Attacker can execute arbitrary OS commands.**

**`vulnerable.js` L28-28:**
```diff
-   require("child_process").exec(`ping -c 1 ${host}`, (err, stdout) => {
+   require("child_process").execFile("ping", ["-c", "1", host], (err, stdout) => {
```

</details>

### ❌ Failed

- `71decab5-fea5-4504-9a26-6e34a0b0831f`: 503 UNAVAILABLE. {'error': {'code': 503, 'message': 'This model is currently experiencing high demand. Spikes in demand are usually temporary. Please try again later.', 'status': 'UNAVAILABLE'}}
- `f7a9b7c1-8eb1-4efd-b6c0-950dbe4f8c30`: 429 RESOURCE_EXHAUSTED. {'error': {'code': 429, 'message': 'You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits. To monitor your current usage, head to: https://ai.dev/rate-limit. \n* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 5, model: gemini-3.6-flash\nPlease retry in 57.570070542s.', 'status': 'RESOURCE_EXHAUSTED', 'details': [{'@type': 'type.googleapis.com/google.rpc.Help', 'links': [{'description': 'Learn more about Gemini API quotas', 'url': 'https://ai.google.dev/gemini-api/docs/rate-limits'}]}, {'@type': 'type.googleapis.com/google.rpc.QuotaFailure', 'violations': [{'quotaMetric': 'generativelanguage.googleapis.com/generate_content_free_tier_requests', 'quotaId': 'GenerateRequestsPerMinutePerProjectPerModel-FreeTier', 'quotaDimensions': {'location': 'global', 'model': 'gemini-3.6-flash'}, 'quotaValue': '5'}]}, {'@type': 'type.googleapis.com/google.rpc.RetryInfo', 'retryDelay': '57s'}]}}
- `1a62e924-7ea7-4ab9-baf7-e1fc64a14dff`: 503 UNAVAILABLE. {'error': {'code': 503, 'message': 'This model is currently experiencing high demand. Spikes in demand are usually temporary. Please try again later.', 'status': 'UNAVAILABLE'}}
- `d6ebcaf7-6e2d-47ee-a331-ddf7b39c6332`: 429 RESOURCE_EXHAUSTED. {'error': {'code': 429, 'message': 'You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits. To monitor your current usage, head to: https://ai.dev/rate-limit. \n* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 20, model: gemini-3.6-flash\nPlease retry in 23.680455299s.', 'status': 'RESOURCE_EXHAUSTED', 'details': [{'@type': 'type.googleapis.com/google.rpc.Help', 'links': [{'description': 'Learn more about Gemini API quotas', 'url': 'https://ai.google.dev/gemini-api/docs/rate-limits'}]}, {'@type': 'type.googleapis.com/google.rpc.QuotaFailure', 'violations': [{'quotaMetric': 'generativelanguage.googleapis.com/generate_content_free_tier_requests', 'quotaId': 'GenerateRequestsPerDayPerProjectPerModel-FreeTier', 'quotaDimensions': {'model': 'gemini-3.6-flash', 'location': 'global'}, 'quotaValue': '20'}]}, {'@type': 'type.googleapis.com/google.rpc.RetryInfo', 'retryDelay': '23s'}]}}
- `b83bc792-46fd-44de-a446-a190758e7c22`: 429 RESOURCE_EXHAUSTED. {'error': {'code': 429, 'message': 'You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits. To monitor your current usage, head to: https://ai.dev/rate-limit. \n* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 20, model: gemini-3.6-flash\nPlease retry in 15.174671914s.', 'status': 'RESOURCE_EXHAUSTED', 'details': [{'@type': 'type.googleapis.com/google.rpc.Help', 'links': [{'description': 'Learn more about Gemini API quotas', 'url': 'https://ai.google.dev/gemini-api/docs/rate-limits'}]}, {'@type': 'type.googleapis.com/google.rpc.QuotaFailure', 'violations': [{'quotaMetric': 'generativelanguage.googleapis.com/generate_content_free_tier_requests', 'quotaId': 'GenerateRequestsPerDayPerProjectPerModel-FreeTier', 'quotaDimensions': {'model': 'gemini-3.6-flash', 'location': 'global'}, 'quotaValue': '20'}]}, {'@type': 'type.googleapis.com/google.rpc.RetryInfo', 'retryDelay': '15s'}]}}
- `d3914412-7d4f-4efb-a774-d6e95266cb5a`: 429 RESOURCE_EXHAUSTED. {'error': {'code': 429, 'message': 'You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits. To monitor your current usage, head to: https://ai.dev/rate-limit. \n* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 20, model: gemini-3.6-flash\nPlease retry in 6.743833234s.', 'status': 'RESOURCE_EXHAUSTED', 'details': [{'@type': 'type.googleapis.com/google.rpc.Help', 'links': [{'description': 'Learn more about Gemini API quotas', 'url': 'https://ai.google.dev/gemini-api/docs/rate-limits'}]}, {'@type': 'type.googleapis.com/google.rpc.QuotaFailure', 'violations': [{'quotaMetric': 'generativelanguage.googleapis.com/generate_content_free_tier_requests', 'quotaId': 'GenerateRequestsPerDayPerProjectPerModel-FreeTier', 'quotaDimensions': {'location': 'global', 'model': 'gemini-3.6-flash'}, 'quotaValue': '20'}]}, {'@type': 'type.googleapis.com/google.rpc.RetryInfo', 'retryDelay': '6s'}]}}
- `ec06e52c-bb3d-41e5-b85a-4bae2f542895`: 429 RESOURCE_EXHAUSTED. {'error': {'code': 429, 'message': 'You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits. To monitor your current usage, head to: https://ai.dev/rate-limit. \n* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 20, model: gemini-3.6-flash\nPlease retry in 58.403044888s.', 'status': 'RESOURCE_EXHAUSTED', 'details': [{'@type': 'type.googleapis.com/google.rpc.Help', 'links': [{'description': 'Learn more about Gemini API quotas', 'url': 'https://ai.google.dev/gemini-api/docs/rate-limits'}]}, {'@type': 'type.googleapis.com/google.rpc.QuotaFailure', 'violations': [{'quotaMetric': 'generativelanguage.googleapis.com/generate_content_free_tier_requests', 'quotaId': 'GenerateRequestsPerDayPerProjectPerModel-FreeTier', 'quotaDimensions': {'model': 'gemini-3.6-flash', 'location': 'global'}, 'quotaValue': '20'}]}, {'@type': 'type.googleapis.com/google.rpc.RetryInfo', 'retryDelay': '58s'}]}}

---

> ⚠️ **Human review required.** These fixes were generated by AI and must be reviewed before merging. Do not auto-merge this PR.

*Generated by [Pre-Prod Tester](https://github.com/dis-craft/Pre-prod-tester)*