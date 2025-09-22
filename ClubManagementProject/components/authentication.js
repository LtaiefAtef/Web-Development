"use client"
import logo from "@/assets/logo.png"
import view from "@/assets/view.png"
import hide from "@/assets/eye.png"
import { useActionState, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { auth } from "@/actions/auth-actions"
export default function Authentication({verified}){
    const router = useRouter()
    if(verified?.session){
        router.back()
    }
    const [show,setShow] = useState(false)
    const params = useSearchParams().get("type")
    if(!params){
        throw new Error("Failed To Reach Your Page")
    }
    function focused(e){
        if(e.target.value.length != 0){
            document.querySelector("."+e.target.name).classList.add("stay-top")
        }else{
            document.querySelector("."+e.target.name).classList.remove("stay-top")
        }
    }
    const [formState,formAction,isPending] = useActionState(auth.bind(null,params),null)
    return(
        <div className="auth-page">
            <form action={formAction}>
                <header><img src={logo.src} alt="logo"/><h1>BI Crew</h1><img src={logo.src} alt="logo"/></header>
                {formState && <div className="auth-error">{formState}</div>}
                <div className="container" style={{marginTop:params=="login" && "25px"}}>
                {params==="sign-up" && <div className="content">
                        <div className="field"><input type="text" name="name" onChange={focused}/><small className="name">Name</small></div>
                        <div className="field"><input type="text" name="prename" onChange={focused}/><small className="prename">Prename</small></div>
                    </div>}
                    {params==="sign-up" && <div className="field"><input type="text" name="phone" onChange={focused}/><small className="phone">Phone Number</small></div>}
                    <div className="field"><input type="email" name="email" onChange={focused}/><small className="email">Email</small></div>
                    <div className="field"><input type={show ? "text":"password"} name="password" id="password" onChange={focused}/><small className="password">Password</small>
                    <img 
                    width={20}
                    height={20} 
                    src={show ? view.src:hide.src} 
                    className="toggle-password"
                    alt="toggle-password"
                    onClick={()=>setShow(!show)}
                    /></div>
                    {isPending ?<button disabled>Loading</button>:<button type="submit">{params ==="login" ? "Login":"Sign Up"}</button>}
                </div>
            </form>
        </div>
    );
}