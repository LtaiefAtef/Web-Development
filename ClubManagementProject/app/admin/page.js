import Admin from "@/components/admin"
import { verifyAuth } from "@/lib/auth"
export default async function AdminPage(){
    const verified =await verifyAuth()
    return <Admin verified={verified}/>
}