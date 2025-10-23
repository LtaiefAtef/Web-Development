"use client"
import { post } from "@/actions/auth-action";
import empty_photo from "@/assets/empty_photo.png";
import { useActionState, useState } from "react";
export default function CreateBlog() {
    const [photo,setPhoto]= useState(empty_photo.src);
    const [formState,formAction,isPending]=useActionState(post,"");
    return(
        <div className="create-blog">
            <form className="container" action={formAction}>
                <div className="flex">
                    <label>Subject</label>
                    <input name="subject" id="subject" placeholder="e.g Artifical Intellingence , Buisness Intelligence ..."/>
                </div>
                <div className="flex">
                    <label>Description</label>
                    <textarea name="description" id="description"></textarea>
                </div>
                <div className="flex add-photo">
                    <img className="photo-container" src={photo} alt="photo container"/>
                    <input type="file"  
                    onChange={(e)=>{const image = e.target.files[0];setPhoto(URL.createObjectURL(image));}} 
                    accept="image/*" 
                    name="uploaded_photo" 
                    id="uploaded_photo"/>
                    <button type="button" onClick={()=>document.getElementById("uploaded_photo").click()}>Add photo</button>
                </div>
                {formState && <div className="error">{formState}</div>}
                {isPending ? <button type="button" className="loading">Posting</button>:<button type="submit">Post</button>}
            </form>
        </div>
    );
}