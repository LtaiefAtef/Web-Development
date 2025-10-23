"use server";
import sql from "better-sqlite3";
import { hashUserPassword } from "./hash";
const db = sql("blogs.db");
export async function CreateUser(full_name,phone_number,email,password){       
    try{
        const stmt = db.prepare("INSERT INTO users values(NULL,?,?,?,?)").run(full_name,phone_number,email,password);
        return {success:true,id:stmt.lastInsertRowid};
    }catch(error){
        return {success:false,error}
    }
}
export async function FindUser(email) {
    const result = db.prepare("SELECT * FROM users WHERE email=?").get(email);
    return result;
}
export async function GetUserInfo(userId) {
    return db.prepare("SELECT * FROM users WHERE id=?").get(userId);
}
export async function UpdateFullName(userId, newFullName) {
    return (db.prepare("UPDATE users SET full_name = ? WHERE id = ?").run(newFullName, userId)).changes > 0 ;
}
export async function UpdatePhone(userId, newPhone) {
    return (db.prepare("UPDATE users SET phone_number = ? WHERE id = ?").run(newPhone, userId)).changes > 0 ;
}
export async function UpdateEmail(userId, newEmail) {
    return (db.prepare("UPDATE users SET email = ? WHERE id = ?").run(newEmail, userId)).changes > 0 ;
}
export async function UpdatePassword(userId, newPassword) {
    return (db.prepare("UPDATE users SET password = ? WHERE id = ?").run(hashUserPassword(newPassword), userId)).changes > 0 ;
}
export async function AddPost(author,subject,description,path) {
    return (db.prepare("INSERT INTO blogs VALUES(NULL,?,?,?,?,DATETIME('now'))").run(author,subject,description,path)).lastInsertRowid;
}
export async function UpdatePath(path,id) {
    return (db.prepare("UPDATE blogs SET path = ? WHERE id = ?").run(path, id)).changes > 0 ;
}
export async function GetBlogs() {
    return new Promise((resolve,reject)=>{
        setTimeout(()=>resolve((db.prepare("SELECT * FROM blogs").all())),2000)
    })
}
export async function GetBlogById(id){
    return db.prepare("SELECT * from blogs where id =?").get(id);
}
export async function GetAuthor(id) {
    return (db.prepare("SELECT full_name from users where id =?").get(id));
}
export async function GetBlogByUserId(id){
    return (db.prepare("SELECT * from blogs where author=?").all(id));
}