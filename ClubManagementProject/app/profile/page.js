import Profile from "@/components/profile";
import { verifyAuth } from "@/lib/auth";

export default async function ProfilePage() {
    const verified = await verifyAuth()
    return <Profile verified={verified}/>
}