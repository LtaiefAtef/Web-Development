import Clubs from "@/components/clubs";
import { verifyAuth } from "@/lib/auth";

export default async function ClubsPage() {
    const verified = await verifyAuth()
    return <Clubs verified= {verified}/>
}