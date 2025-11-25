import NavbarBackground from "./navbar-background";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/Images/Logo.png"
import { SlBasket } from "react-icons/sl";
import classes from "./responsive.module.css";
export default function NavBar({position}){
    const navLink="nav-link active text-light ";
    return(
        <header className={position} style={{height:"210px"}}>
            <NavbarBackground/>
            <nav className="navbar navbar-expand-lg "  >
            <div className="container-fluid ">
                <Link className="mw-100 navbar-brand d-flex align-items-center callout" href="/" >
                <Image  src={logo}  alt="Restaurant logo" id={classes.logo} />
                <label className="text-light text-decoration-none font-monospace fs-*">FOODIE FIESTA</label>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <main className="collapse navbar-collapse"  id="navbarNavDropdown">
                <ul className="navbar-nav d-flex justify-content-around" style={{width:"100%",paddingRight:"100px"}}>
                    <li className="nav-item">
                        <Link className={navLink} href="#Home">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="#" className={navLink}>Menu</Link>  
                    </li>
                    <li className="nav-item">
                        <Link href="#About" className={navLink}>About us</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle text-light " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Plan
                        </Link>
                        <ul className="dropdown-menu ">
                        <li><Link className="dropdown-item " href="/order-online">Order online</Link></li>
                        <li><Link className="dropdown-item " href="#">Reservation</Link></li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <Link href="#" className={navLink}>Contact us</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="#" className={navLink}>Purchases <SlBasket/><div></div></Link>
                    </li>
                    <li className="nav-item">
                        <div className="d-flex gap-3">
                        <Link href="/login-page" className="btn btn-light ">Login</Link>
                        <Link href="/signup-page" className="btn btn-outline-light ">Sign Up</Link>
                        </div>
                    </li>
                </ul>
                </main>
            </div>
        </nav>
        </header>
    );
}