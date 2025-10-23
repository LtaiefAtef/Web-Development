import db from "@/db";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
import { Lucia } from "lucia";
import { cookies } from "next/headers";
const adapter = new BetterSqlite3Adapter(db,{
    user:"users",
    session:"sessions"
});
const lucia = new Lucia(adapter,{
    sessionCookie:{
        expires:false,
        attributes:{
            secure:process.env.NODE_ENV==="production"
        }
    }
});
export async function createAuthSession(userId){
    const session=  await lucia.createSession(userId,{})
    const sessionCookie = lucia.createSessionCookie(session.id);
    (await cookies()).set(sessionCookie.name,sessionCookie.value,sessionCookie.attributes);
}
export async function verifyAuth(){
    const sessionCookie=(await cookies()).get(lucia.sessionCookieName);
    if(!sessionCookie){
        return{
            user:null,
            session:null,
        };
    }
    const sessionId=sessionCookie.value;
    if(!sessionId){
        return{
            user:null,
            session:null,
        };
    }
    const result = await lucia.validateSession(sessionId);
    console.log(result.session)
    try{
    if(result.session && result.session.fresh){
        console.log("this is working")
        const sessionCookie = lucia.createSessionCookie(result.session.id);
            (await cookies()).set(sessionCookie.name,sessionCookie.value,sessionCookie.attributes);
    }
    if(!result.session){
        const sessionCookie=lucia.createBlankSessionCookie();
        (await cookies()).set(sessionCookie.name,sessionCookie.value,sessionCookie.attributes);
    }
    }catch{}
    return result;
}
export async function getUserCookie(){
    const sessionCookie=(await cookies()).get(lucia.sessionCookieName);
    if(!sessionCookie){
        return {
            user:null,
            session:null
        }
    }
    const sessionId = sessionCookie.value;
    if(!sessionId){
        return{
            user:null,
            session:null,
        }
    }
    const result = await lucia.validateSession(sessionId);
    return result;
}
export async function logout() {
    const sessionCookie = (await cookies()).get(lucia.sessionCookieName);
    if (!sessionCookie) return false;
    const sessionId = sessionCookie.value;
    await lucia.invalidateSession(sessionId);
    const blankSessionCookie = lucia.createBlankSessionCookie();
    (await cookies()).set(
        blankSessionCookie.name,
        blankSessionCookie.value,
        blankSessionCookie.attributes
    );
    return true;
}
