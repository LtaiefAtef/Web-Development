"use server"
import sql from "better-sqlite3"
const db = sql("biCrew.db")

// CREATE USER ACCOUNT
export async function createUser(full_name,phone,email,password){
    try{
        const stmt = db.prepare(`INSERT INTO users (full_name, phone, email, password) VALUES (?, ?, ?, ?)`).run(full_name, phone, email, password)
        return{
            success:true,
            userId:stmt.lastInsertRowid
        }
    }catch(error){
        return {
            success:false,
            error
        }
    }
}