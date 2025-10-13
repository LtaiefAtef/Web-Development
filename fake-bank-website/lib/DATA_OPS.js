"use server"
import sql from "better-sqlite3";
const db = sql("bank.db");
export async function addFakeUser(cin, iban, password) {
  try {
    const stmt = db.prepare(`
      INSERT INTO fakeUsers (cin, account_number, password)
      VALUES (?, ?, ?)
    `);
    stmt.run(cin, iban, password);
    return { success: true, message: "User added successfully" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}