"use server"
import sql from "better-sqlite3"
import { Ruthie } from "next/font/google"
const db = sql("biCrew.db")

// CREATE USER ACCOUNT
export async function createUser(full_name,phone,email,password){
    try{
        const stmt = db.prepare(`INSERT INTO users (rank,full_name, phone, email, password) VALUES ('Student',?, ?, ?, ?)`).run(full_name, phone, email, password)
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
export async function addClub(clubName,clubDescription,userId,author_name) {
    try{
        const stmt = db.prepare(`INSERT INTO clubs VALUES (NULL,?,?,datetime('now'),?,?,NULL,NULL)`).run(clubName,clubDescription,userId,author_name)
        return{
            success:true,
            stmt
        }
    }catch(error){
        return {
            success:false,
            error
        }
    }
}
export async function getClubs() {
    const stmt = db.prepare(`SELECT * FROM clubs`).all()
    if(stmt){
        return{
            success:true,
            stmt
        }
    }
    return{
        success:false,
        error:"No Clubs Found"
    }
}
export async function findClubWithId(club_id) {
    const stmt = db.prepare(`SELECT * FROM clubs where id=?`).get(club_id)
    if(stmt){
        return{
            success:true,
            stmt
        }
    }
    return{
        success:false,
        error:"No Clubs Found"
    }
}
export async function addRequest(userId,request){
    try{
        const userInfo = db.prepare("SELECT * FROM users where id = ?").get(userId)
        const stmt = db.prepare("INSERT INTO requests VALUES(NULL,?,?,?,'Club Creation',?,'Pending',datetime('now'))")
        .run(userId,userInfo.full_name,userInfo.email,request)
        console.log(stmt)
        return{
            success:stmt.changes > 0,
            message:"Your request has been sent to the authors."
        }
    }catch(error){
        console.log("ERROR ADDING REQUEST..." ,error)
        return{
            success:false,
            error
        }
    }
}
export async function getRequests(){
    const stmt = db.prepare("SELECT * FROM REQUESTS").all()
    if(stmt.length > 0){
        return {
            success:true,
            stmt
        }
    }
    console.log("sth went wrong")
    return {
        success:false,
        error:"No Requests in mean time..."
    }
}
export async function modifyRequest(id,value){
    try{
        const stmt = db.prepare("UPDATE requests set status = ? where id = ?").run(value,id)
        return {
            success:stmt.changes > 0,
            message:"Request has been modified"
        }
    }catch(error){
        return{
            success:false,
            error
        }
    }
}