"use client";
import { auth } from "@/actions/auth-action";
import logo from "@/assets/logo.svg";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect } from "react";
export default function Authentication({verified}){
    const router = useRouter();
    useEffect(()=>{
        if(verified){
            router.back();
        }
    },[verified]);
    const mode= useSearchParams().get("mode");
    if(mode!="login" && mode!="signup")throw new Error("Unauthorized action");
    const [formState,formAction,isPending]=useActionState(auth.bind(null,mode),{});
    return <div className="authentication-page">
        <div className="container">
            <header>
                <img className="page-logo" src={logo.src}/>
            </header>
            <form action={formAction}>
                {mode==="signup" && <div className="flex">
                    <label>Full Name</label>
                    <input type="text" name="full_name" id="full_name" placeholder="Enter your full name"
                    defaultValue={formState?.values?.full_name?? ""}/>
                </div>}
                {formState?.errors&& formState.errors.full_name && <div className="error">{mode==="signup" && formState.errors.full_name}</div>}
                {mode==="signup"&&
                <div className="flex">
                <label>Phone Number</label>
                <input type="text" name="phone_number" id="phone_number" placeholder="Enter your phone number" 
                defaultValue={formState?.values?.phone_number?? ""}/>
                </div>}
                {formState?.errors&& formState.errors.phone_number && <div className="error">{mode==="signup" && formState.errors.phone_number}</div>}
                <div className="flex">
                    <label>Email</label>
                    <input type="text" name="email" id="email" placeholder="example@gmail.com"
                    defaultValue={formState?.values?.email?? "" }/>
                </div>
                {formState?.errors&& formState.errors.email && <div className="error">{formState.errors.email}</div>}
                <div className="flex">
                    <label>Password</label>
                    <input type="password" name="password" id="password" placeholder="Enter your password" 
                    defaultValue={formState?.values?.password?? ""} />
                </div>
                {formState?.errors&& formState.errors.password && <div className="error">{formState.errors.password}</div>}
                {isPending ?<button type="button" className="loading" disabled >Loading</button>:mode==="login" ? <button type="submit">Login</button>:<button type="submit">Sign Up</button>}
                {mode==="login" ?<div className="flex create">
                <label>Dont have an existing account ?</label>
                <Link href="/authentication?mode=signup">Create account</Link>
                </div>:<div className="flex create">
                <label>Already have an account ?</label>
                <Link href="/authentication?mode=login">Login</Link>
                </div>}
            </form>
        </div>
    </div>
}