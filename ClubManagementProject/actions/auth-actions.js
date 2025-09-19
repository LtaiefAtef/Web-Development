"use server"

import { createAuthSession } from "@/lib/auth";
import { createUser } from "@/lib/DATA_OPS";
import { hashUserPassword } from "@/lib/hash";
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
    const result = await createUser(full_name,phone,email,password)
    if(result.success){
        await createAuthSession(result.userId)
        redirect("/")
    }else{
        // return "User Already Exists"
        console.log(result)
    }
}
export async function login(prevState,formData){
    return null;
}
export async function auth(mode,prevState,formData){
    if(mode==="login"){
        return login(prevState,formData);
    }
    return signup(prevState,formData);
}