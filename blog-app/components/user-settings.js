"use client";

import { handleChangePhoto, verifyCurrentPassword } from "@/actions/auth-action";
import { UpdateEmail, UpdateFullName, UpdatePassword, UpdatePhone } from "@/lib/DATA_OPS";
import { useState } from "react";

export default function UserSettings({userId}) {
const [fullNameError, setFullNameError] = useState("");
const [phoneError, setPhoneError] = useState("");
const [emailError, setEmailError] = useState("");
const [passwordError, setPasswordError] = useState("");
async function handleField(option) {
    // Ressetting Errors
    setEmailError("");
    setFullNameError("");
    setPasswordError("");
    setPhoneError("");
let valid = true;
// Regex definitions
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{8,}$/;

switch (true) {
    case option === "full_name": {
    const fullName = document.getElementById("full_name").value.trim();
    if (fullName.length < 4) {
        setFullNameError("Full name must be at least 4 characters long.");
        valid = false;
    }
    if(valid){
        const result =  UpdateFullName(userId,fullName);
        if(result){
            alert("FullName Updated Sucessfully");
        }
    }
    break;
    }

    case option === "phone": {
    const phone = document.getElementById("phone").value.trim();
    if (!phoneRegex.test(phone)) {
        setPhoneError("Phone number must be exactly 8 digits.");
        valid = false;
    }
    if(valid){
        const result = UpdatePhone(userId,phone)
        if(result){
            alert("Phone Number Changed Sucessfully");
        }
    }
    break;
    }
    case option === "email": {
    const email = document.getElementById("email").value.trim();
    if (!emailRegex.test(email)) {
        setEmailError("Please enter a valid email address.");
        valid = false;
    }
    if(valid){
        const result = UpdateEmail(userId,email);
        if(result){
            alert("Email Changed Successfully");
        }
    }
    break;
    }

    default: {
    const [currentId, newId, confirmId] = option;
    const current = document.getElementById(currentId).value;
    const next = document.getElementById(newId).value;
    const confirm = document.getElementById(confirmId).value;
    if (!(await verifyCurrentPassword(userId,current))){
        setPasswordError("Current password is wrong");
        valid = false;
    }
    else if (next.length < 8) {
        setPasswordError("New password must be at least 8 characters long.");
        valid = false;
    } else if (next !== confirm) {
        setPasswordError("New password and confirmation do not match.");
        valid = false;
    }
    if(valid){
        const result = await UpdatePassword(userId,confirm);
        if(result){
            alert("Password changed sucessfully");
        }
    }
    break;
    }
}
}

return (
<article className="user_settings">
    <section>
    <label>Full Name:</label>
    <input id="full_name" type="text" placeholder="e.g. Max Marie" />
    <button onClick={() => handleField("full_name")}>Update</button>
    </section>
    {fullNameError && <p className="error">{fullNameError}</p>}

    <section>
    <label>Phone Number:</label>
    <input id="phone" type="text" placeholder="e.g. 12345678" />
    <button onClick={() => handleField("phone")}>Update</button>
    </section>
    {phoneError && <p className="error">{phoneError}</p>}

    <section>
    <label>Email:</label>
    <input id="email" type="email" placeholder="example@gmail.com" />
    <button onClick={() => handleField("email")}>Update</button>
    </section>
    {emailError && <p className="error">{emailError}</p>}
    <section className="profile_photo">
        <button id="change_profile_photo" onClick={()=>{document.getElementById("uploaded_profile_photo").click()}}>Change Profile Photo</button>
        <input id="uploaded_profile_photo" onChange={(e)=>{handleChangePhoto(e.target.files[0])}} type="file" accept="image/*" />
    </section>
    <section>
    <label>Change Password:</label>
    <input id="current_password" type="password" placeholder="Current Password" />
    <input id="new_password" type="password" placeholder="New Password" />
    <input id="confirm_new_password" type="password" placeholder="Confirm New Password" />
    {passwordError && <p className="error">{passwordError}</p>}
    <button onClick={() => handleField(["current_password", "new_password", "confirm_new_password"])}>
        Update
    </button>
    </section>
</article>
);
}
