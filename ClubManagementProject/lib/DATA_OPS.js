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

export async function findUser(email){
    const stmt = db.prepare("SELECT * FROM users WHERE email = ?").get(email)
    if(stmt){
        return{
            success:true,
            userInfo:stmt
        }
    }
    return{
            success:false,
            error:"User Not found"
    }
}
export async function findUserWithId(userId){
    const stmt = db.prepare("SELECT * FROM users where id = ?").get(userId)
    if(stmt){
        return {
            success:true,
            userInfo:stmt
        }
    }
    return{
        success:false,
        error:"User Not Found"
    }
}
export async function requestUserData(userId){
    const stmt = db.prepare("SELECT * FROM users where id = ?").get(userId)
    if(stmt){
        return{
            success:true,
            userInfo:stmt
        }
    }
    return {
        success:false,
        error:"User Not Found"
    }
}
export async function updateUserPassword(userId,password){
    const stmt = db.prepare("UPDATE users set password = ? where id=?").run(password,userId)
    return stmt
}