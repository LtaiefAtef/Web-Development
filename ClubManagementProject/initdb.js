import sql from "better-sqlite3"
const db = sql("biCrew.db")
db.exec(`
    CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name text,
        phone INT,
        email TEXT UNIQUE,
        password TEXT
    );`)
db.exec(`CREATE TABLE IF NOT EXISTS sessions(
    id TEXT NOT NULL PRIMARY KEY ,
    expires_at INTEGER NOT NULL,
    user_id TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
    );`);
export default db;
