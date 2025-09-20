import Authentication from "@/components/authentication";
import { verifyAuth } from "@/lib/auth";

export default async function AuthenticationPage(){
    const verified = await verifyAuth()
    return <Authentication verified ={verified}/>
}