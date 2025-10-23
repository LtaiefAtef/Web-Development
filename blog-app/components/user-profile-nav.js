"use client";
import { logUserOut } from "@/actions/auth-action";
import user from "@/assets/user.png"
import Link from "next/link";
export default function UserProfileNav() {
        return <aside>
        <div className="user_container">
            <img src={user.src} alt="user_profile_pic" />
            <button onClick={async()=>{await logUserOut() }}>Log Out</button>
            <div className="addional_links">
                <Link href="/profile?current_tab=user_info">User Info</Link>
                <Link href="/profile?current_tab=user_settings">User Settings</Link>
                <Link href="/profile?current_tab=user_blogs">About Blogs</Link>
            </div>
        </div>
    </aside>
}