import sql from "better-sqlite3";
const db = sql("blogs.db");
db.exec(
    `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT,
        phone_number INT,
        email TEXT UNIQUE,
        password TEXT
    );`
);
db.exec(`CREATE TABLE IF NOT EXISTS sessions(
    id TEXT NOT NULL PRIMARY KEY ,
    expires_at INTEGER NOT NULL,
    user_id TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
    );`);
db.exec(`
    CREATE TABLE IF NOT EXISTS blogs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        author INTEGER NOT NULL,
        subject TEXT NOT NULL,
        description TEXT NOT NULL,
        path TEXT NOT NULL,
        created_at date,
        FOREIGN KEY (author) REFERENCES users(id) 
    );
`);
export default db;