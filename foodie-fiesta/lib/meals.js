import sql from "better-sqlite3";
const db = sql("meals.db");
export function  getAllMeals(){
    return db.prepare("SELECT * FROM meals").all();
}

export function  getMealByType(type){
    return db.prepare("SELECT * FROM meals where type=?").all(type);
}