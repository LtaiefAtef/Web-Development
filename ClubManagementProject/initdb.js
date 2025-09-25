import sql from "better-sqlite3"
const db = sql("biCrew.db")
db.exec(`
    CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        rank text,
        full_name text,
        phone INTEGER,
        email TEXT UNIQUE,
        password TEXT
    );`)
db.exec(`CREATE TABLE IF NOT EXISTS sessions(
    id TEXT NOT NULL PRIMARY KEY ,
    expires_at INTEGER NOT NULL,
    user_id TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
    );`);
db.exec(`CREATE TABLE IF NOT EXISTS clubs(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    club_name text,
    description text,
    creation_date date,
    author_id INTEGER,
    author_name text,
    member_list INTEGER,
    event_list INTEGER
    );`)
db.exec(`CREATE TABLE IF NOT EXISTS presidents(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );`)
db.exec(`CREATE TABLE IF NOT EXISTS member_list(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    full_name text
    );`)
db.exec(`CREATE TABLE IF NOT EXISTS requests(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        username text,
        email text,
        category text,
        request text,
        status text,
        request_date date
    );`)
export default db;
