const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "AdminSuperSecretPassword999!",
  database: "billing"
});

// Vulnerability 1: SQL Injection
app.get("/invoices", (req, res) => {
  const customerId = req.query.customerId;
  const sql = `SELECT * FROM invoices WHERE customer_id = '${customerId}'`;

  db.query(sql, (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});

// Vulnerability 2: Command Injection
app.get("/backup", (req, res) => {
  const targetFolder = req.query.folder;
  require("child_process").exec(`tar -czf backup.tar.gz ${targetFolder}`, (err, stdout) => {
    if (err) return res.status(500).send(err.message);
    res.send("Backup created");
  });
});

// Vulnerability 3: Dangerous eval
app.post("/formula", (req, res) => {
  const formula = req.body.formula;
  const computed = eval(formula);
  res.json({ result: computed });
});

app.listen(8080);

