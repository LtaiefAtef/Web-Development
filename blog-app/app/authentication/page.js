import Authentication from "@/components/auth-page";
import { verifyAuth } from "@/lib/auth"

export default async function AuthenticationPage(){
    const verified =await verifyAuth();
    return <Authentication verified={verified.user}/>
}