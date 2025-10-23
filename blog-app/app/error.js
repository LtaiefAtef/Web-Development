"use client";
import logo from "@/assets/logo.svg";
export default function ErrorPage({error}){
    return <div className="error-page">
        <img className="logo" width="400" src={logo.src} alt="page logo"/>
        <h1 style={{alignSelf:"center",fontSize:"30px",marginLeft:0}} className="error">{error.message}</h1>
    </div>
}