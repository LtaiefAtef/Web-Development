import UserNavbar from "@/components/user-navbar";
import { verifyAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
export default async function BlogsLayout({children}){
    const result  = await verifyAuth();
    if(!result.user){
        return redirect("/authentication?mode=login");
    }
    return (
        <div className="blogs-layout">
            <UserNavbar />
            {children}
        </div>
    );
}