"use server";

import  { createAuthSession, getUserCookie, logout } from "@/lib/auth";
import { AddPost, CreateUser, FindUser, GetUserInfo, UpdatePath } from "@/lib/DATA_OPS";
import { hashUserPassword, verifyPassword } from "@/lib/hash";
import { redirect } from "next/navigation";

export async function signup(prevState,formData) {
    const full_name=formData.get("full_name");
    const phone_number =formData.get("phone_number");
    const email = formData.get("email");
    const password= formData.get("password");
    const email_regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const full_name_regex =/^[A-Za-z]+/;
    const phone_number_regex=/^[0-9]{8}/;
    let values = {};
    let errors={};
    if(!email_regex.test(email)) errors.email="Please enter a valid email password.";
    else values.email = email;
    if(password.trim().length < 8) errors.password="Password must be at least 8 characters long.";
    else values.password = password;
    if(!phone_number_regex.test(phone_number)) errors.phone_number ="Phone number must be 8 digits";
    else values.phone_number=phone_number;
    if(!full_name_regex.test(full_name)) errors.full_name = "Please enter a valid full name ";
    else values.full_name=full_name;
    if(Object.keys(errors).length > 0){
        return {
            errors,
            values,
        }
    }
    const hashedPassword = hashUserPassword(password);
        const result =await CreateUser(full_name,phone_number,email,hashedPassword);
        if(result.success){
            await createAuthSession(result.id)
            redirect("/blogs");
        }else{
            return {
                errors:{
                    email:"Account with chosen email already exists."
                }
            }
        }
}
export async function verifyCurrentPassword(userId,password){
    const currentPassword = (await GetUserInfo(userId)).password;
    return verifyPassword(currentPassword,password);
}
export async function login(prevState,formData) {
    const email = formData.get("email");
    const password= formData.get("password");
    const existingUser = await FindUser(email);
    if(!existingUser){
        return {
            values:{
                password:password
            }
            ,
            errors:{
                email:"Could not authenticate user please check your credentials"
            }
        }
    }
    const isValidPassword= verifyPassword(existingUser.password,password);
    if(!isValidPassword){
        return{
            values:{
                email:email
            },
            errors:{
                password:"Incorrect password"
            }
        }
    }
    await createAuthSession(existingUser.id);
    redirect("/blogs");
}
export async function auth(mode,prevState,formData) {
    if(mode==="login"){
        return login(prevState,formData);
    }
    return signup(prevState,formData);
}
export async function logUserOut(){
    const result = logout();
    if(result){
        redirect("/")
    }
}
export async function post(prevState,formData){
    console.log(formData);
    const subject = formData.get("subject");
    const description = formData.get("description");
    const image = formData.get("uploaded_photo");
    if(subject ==="" || description==="" || image.name==="undefined"){
        return "Please fill all the required fields.";
    }
    var userId= (await getUserCookie()).user.id;
    const post_id = await AddPost(userId,subject,description,"");
    formData.append("id",`${userId}__${post_id}`);
    let image_extension =image.name.split(".");
    const update_path = await UpdatePath(`/uploads/${image_extension[0]}_${formData.get("id")}.${image_extension[1]}`,post_id);
    console.log("PATH UPDATE",update_path);
    console.log("FORM DATA ",formData);
    const response = await fetch("http://localhost:3000/api",{
        method:"POST",
        body:formData
    })
    if(response.ok){
        redirect("/blogs")
    }
}
export async function handleChangePhoto(image){
    const formData = new FormData();
    formData.append("image",image);
    formData.append("saveProfileImage",true);
    const result = await fetch("http://localhost:3000/api",{
        method:"POST",
        body:formData
    })
    console.log(result.json);
}