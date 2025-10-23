import logo from "@/assets/logo.svg";
import user_pic from "@/assets/user.png";
import {getUserCookie} from "@/lib/auth";
import { GetUserInfo } from "@/lib/DATA_OPS";
import Link from "next/link";
import NavLink from "./nav-link";
export default async function UserNavbar(){
    const {user,session}=await getUserCookie();
    const userInfo = await GetUserInfo(user.id);
    return <nav className="user_navbar">
        <Link href="/" className="title" >
            <img src={logo.src} alt="page logo"/>
            <h1>Blogs World</h1>
        </Link>
        <ul className="links">
            <NavLink href="/blogs">Blogs</NavLink>
            <NavLink href="/create-blog">Create Blog</NavLink>
            <Link href="/profile?current_tab=user_info" className="user-profile"><img className="profile_image" src={user_pic.src} width={25} alt="user profile picture"/>{userInfo.full_name}</Link>
        </ul>
    </nav>
}