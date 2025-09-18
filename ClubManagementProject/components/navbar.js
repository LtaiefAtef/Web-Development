import logo from "@/assets/logo.png"
import Link from "next/link";
export default function Navbar() {
    return(
        <nav className="navbar">
            <img className="logo" src={logo.src} alt="Website logo"/>
            <ul className="nav-links">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/clubs">Clubs</Link></li>
            </ul>
            <div className="auth">
                <button><Link href="/auth?type=login">Login</Link></button>
                <button><Link href="/auth?type=sign-up">Sign Up</Link></button>
            </div>
        </nav>
    );
}