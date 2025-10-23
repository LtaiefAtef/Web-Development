"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function NavLink({children,href}) {
    const path = usePathname();
    return <Link className={path.includes(href) ? "active_link":""} href={href}>{children}</Link>
}