"use client"
import { changePassword } from "@/actions/auth-actions";
import user from "@/assets/user.png"
import { requestUserData } from "@/lib/DATA_OPS";
import { useSearchParams } from "next/navigation";
import { startTransition, useActionState, useEffect, useState } from "react";
export default function ProfilePage() {
    const userId = useSearchParams().get("userId")
    const [userInfo,setUserInfo] = useState(null)
    const [modifyPassword,setModifyPassword] = useState(false)
    if(!userId){
        throw new Error("User Not Found")
    }
    async function getData(){
        const data = await requestUserData(userId)
        if(!data.success){
            throw new Error(data.error)
        }
        setUserInfo(data)
    }
    const [formState,formAction,isPending] = useActionState(changePassword.bind(null,userInfo?.userInfo.id),null)
    useEffect(()=>{
        getData()
        if(formState && formState.success){
            startTransition(()=>{
                formAction(null)
            })
            setModifyPassword(false)
            alert("Password Changed Sucessfully")
        }
    },[formState])
    return(
        <main className="profile-page">
            {modifyPassword && <form className="modify-password" action={formAction}>
                <div className="password-error">{formState && !formState.success && formState.error}</div>
                <div className="flex"><h4>Old Password</h4><input type="text" name="old-password"/></div>
                <div className="flex"><h4>New Password</h4><input type="text" name="new-password"/></div>
                <div className="flex"><h4>Confirm New Password</h4><input type="text" name="confirm-new-password"/></div>
                <div className="flex"><button>{isPending?"Loading":"Confirm"}</button><button type="button" onClick={()=> setModifyPassword(false)}>Cancel</button></div>
            </form>
            }
            <div className="container">
                <aside><img src={user.src} height={260} width={260} alt="Profile picture"/></aside>
                <section className="user-info">
                    <div className="flex"><h1>Fullname:</h1><label>{userInfo?.userInfo.full_name}</label></div>
                    <div className="flex"><h1>Phone:</h1><label>{userInfo?.userInfo.phone}</label></div>
                    <div className="flex"><h1>Email:</h1><label>{userInfo?.userInfo.email}</label></div>
                    <div className="flex"><h1>Password:</h1><label>*********</label></div>
                    <button onClick={()=> setModifyPassword(true)}>Modify password</button>
                </section>
            </div>
        </main>
    );
}