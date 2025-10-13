const sql = require('better-sqlite3');
const db = sql('bank.db');

db.prepare(`
  CREATE TABLE IF NOT EXISTS fakeUsers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cin TEXT NOT NULL,
    account_number TEXT NOT NULL,
    password TEXT NOT NULL
  );
`).run();
