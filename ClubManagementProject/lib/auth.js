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
export async function verifyAuth(){
    const sessionCookie = (await cookies()).get(lucia.sessionCookieName)
    if(!sessionCookie){
        return{user:null,session:null}
    }
    const sessionId  = sessionCookie.value
    if(!sessionId){
        return{user:null,session:null}
    }
    const result = await lucia.validateSession(sessionId)
    try{
        if(!result.session){
            const sessionCookie=lucia.createBlankSessionCookie();
            (await cookies()).set(sessionCookie.name,sessionCookie.value,sessionCookie.attributes);
        }
    }catch{}
    return result
}