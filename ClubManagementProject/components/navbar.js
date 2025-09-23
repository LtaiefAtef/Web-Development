import logo from "@/assets/logo.png"
import user from "@/assets/user.png"
import { verifyAuth } from "@/lib/auth";
import {findUserWithId } from "@/lib/DATA_OPS";
import Link from "next/link";
export default async function Navbar() {
    const verifyUser = await verifyAuth()
    let data=null;
    if(verifyUser.user){
        data = await findUserWithId(verifyUser.user.id)
    }
    return(
        <nav className="navbar">
            <img className="logo" src={logo.src} alt="Website logo"/>
            <ul className="nav-links">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href={data ? `/clubs?userId=${data.userInfo.id}`:`/clubs`}>Clubs</Link></li>
            </ul>
            {verifyUser.user ? <Link className="user" href={`/profile?userId=${verifyUser.user.id}`}>
                    <img src={user.src} width={25} height={25} alt="User profile picture"/>
                    <span>{data.userInfo.full_name}</span>
                </Link>:<div className="auth">
                <Link href="/auth?type=login"><button>Login</button></Link>
                <Link href="/auth?type=sign-up"><button>Sign Up</button></Link>
            </div>}
        </nav>
    );
}