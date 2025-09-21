"use server"

import { createAuthSession } from "@/lib/auth";
import { createUser, findUser, findUserWithId, updateUserPassword, verifyOldPassword } from "@/lib/DATA_OPS";
import { hashUserPassword, verifyPassword } from "@/lib/hash";
import { redirect } from "next/navigation";

export async function signup(prevState,formData){
    const full_name = formData.get("prename") + " " + formData.get("name");
    const phone = formData.get("phone");
    const email = formData.get("email")
    const password = formData.get("password")
    const email_regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const full_name_regex =/^[A-Za-z]+/;
    const phone_number_regex=/^[0-9]{8}/;
    if(!full_name_regex.test(full_name)) return "Please enter a valid full name ";
    if(!phone_number_regex.test(phone)) return "Phone number must be 8 digits";
    if(!email_regex.test(email)) return "Please enter a valid email.";
    if(password.trim().length < 8) return "Password must be at least 8 characters long.";
    const hashedPassword = hashUserPassword(password)
    const result = await createUser(full_name,phone,email,hashedPassword)
    if(result.success){
        await createAuthSession(result.userId)
        redirect("/")
    }else{
        return "User Already Exists"
    }
}
export async function login(prevState,formData) {
    const email = formData.get("email")
    const password = formData.get("password")
    const result = await findUser(email)
    if(result.success){
        const verif = verifyPassword(result.userInfo.password,password)
        if(verif){
            await createAuthSession(result.userInfo.id)
            redirect("/")
        }
        return "User Not Found"
    }else{
        console.log("error")
        return result.error
    }
}
export async function auth(mode,prevState,formData){
    if(mode==="login"){
        return login(prevState,formData);
    }
    return signup(prevState,formData);
}
export async function changePassword(userId,prevState,formData){
    if(!formData){
        return;
    }
    const oldPassword = formData.get("old-password")
    const newPassword = formData.get("new-password")
    const confirmNewPassword = formData.get("confirm-new-password")
    if(oldPassword===""||newPassword===""||confirmNewPassword===""){
        return{
            success:false,
            error:"All the fields must be filled."
        }
    }
    const result  =await findUserWithId(userId)
    const verif =  verifyPassword(result.userInfo.password,oldPassword)
    if(!verif){
        return{
            success:false,
            error:"Incorrect Old Password."
        }
    }
    if(newPassword!=confirmNewPassword){
        return {
            success:false,
            error:"New password and confirmation do not match."
        }
    }
    const passwordChanged = await updateUserPassword(userId,hashUserPassword(newPassword))
    if(passwordChanged.changes > 0){
        return{
            success:true,
            message:"Password Changed Sucessfully"
        }
    }
}