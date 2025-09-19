import db from "@/initdb";
import { Lucia } from "lucia";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
import { cookies } from "next/headers";
// Inilizing the adapter
const adapter = new BetterSqlite3Adapter(db,{
    user:'users',
    session:'sessions'
})

const lucia = new Lucia(adapter,{
    sessionCookie:{
        expires:false,
        attributes:{
            secure:process.env.NODE_ENV==="production"
        }
    }
})
export async function createAuthSession(userId){
    const session = await lucia.createSession(userId);
    const sessionCookie = lucia.createSessionCookie(session.id)
    const cook = await cookies()
    cook.set(sessionCookie.name,sessionCookie.value,sessionCookie.value)
}