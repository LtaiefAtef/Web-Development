"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./nav-link.module.css";
export default function NavLink({href,children,dropDown}){
    const path =usePathname();
    return(
        <Link href={href} className={path.startsWith(href) ? `${classes[dropDown]} ${classes.active} ${classes.link}`:`${classes.link} ${classes[dropDown]}` }>{children}
        {dropDown ==="drop"? <ul className={classes["dropdown-menu"]}>
            <li>Stock</li>
            <li>Market</li>
            <li>lorem</li>
            <li>lorem 2</li>
            <li>lorem ipsum</li>
            <li>lorem ipsum2</li>
        </ul> :""}
        </Link>
    )
}