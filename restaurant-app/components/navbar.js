"use client";
import classes from "./navbar.module.css";
import NavLink from "./nav-link";
import { useState } from "react";
export default function Navbar(){
    const [showMenu,setShowMenu]=useState(false);
    return(
        <div className={classes["nav-bar"]}>
            <span className={classes["logo"]}>Logo</span>
            <ul className={classes["links"]}>
                <li><NavLink href="/" name="Home">Home</NavLink></li>
                <li><NavLink href="/about" name="About">About</NavLink></li>
                <li><NavLink href="/contact" name="Contact">Contact</NavLink></li>
                <li><NavLink href="/Pricing">Pricing</NavLink></li>
                <li><NavLink dropDown="drop" href="#" name="Contact">More</NavLink></li>
            </ul>
            <div className={classes["buttons"]}>
                <button className={classes["B1"]}>Login</button>
                <button className={classes["B2"]}>Sign Up</button>
            </div>
            <span  className={classes["burger"]} onClick={()=>setShowMenu(true)}>≡</span>
            {showMenu && 
                <div className={classes["menu"]}> 
                    <button className={classes["close__menu__button"]} onClick={()=> setShowMenu(false)}>✖</button>
                    <ul className={classes["mobile__links"]}>
                        <li><NavLink href="/" name="Home">Home</NavLink></li>
                        <li><NavLink href="/about" name="About">About</NavLink></li>
                        <li><NavLink href="/contact" name="Contact">Contact</NavLink></li>
                        <li><NavLink href="/Pricing">Pricing</NavLink></li>
                        <li><NavLink dropDown="drop" href="#" name="Contact">More</NavLink></li>
                    </ul>
                </div>}
        </div>
    )
}