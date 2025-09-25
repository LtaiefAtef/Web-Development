"use client";
import search from "@/assets/search.png"
import group from "@/assets/group.png"
import {getClubs } from "@/lib/DATA_OPS";
import { useSearchParams } from "next/navigation";
import { startTransition, useActionState, useEffect, useState } from "react";
import close from "@/assets/close.png"
import Link from "next/link";
import { sendClubCreateRequest } from "@/actions/auth-actions";
export default function Clubs({verified}) {
    const params = useSearchParams()
    const [showClubForm,setShowClubForm] = useState(false)
    const [formState,formAction,isPending] = useActionState(sendClubCreateRequest.bind(null,params.get("userId")),null)
    const [clubList,setClubList] = useState(null)
    const [originalList,setOriginalList] = useState(null)
    async function getData(){
        const result = await getClubs()
        setClubList(result)
        setOriginalList(result)
    }
    useEffect(()=>{
        getData()
        if(formState && formState.success && showClubForm){
            startTransition(()=>{
                formAction(null)
            })
            setShowClubForm(false)
            alert(formState.message)
        }
    },[formState])
    function searchClub(){
        const searchTerm = document.getElementById("search").value;
        if(searchTerm===""){
            setClubList(originalList)
        }else{
            setClubList({
            success:true,
            stmt:clubList.stmt.filter((club) =>
            club.club_name.toLowerCase().includes(searchTerm) ||
            club.description.toLowerCase().includes(searchTerm) ||
            club.author_name.toLowerCase().includes(searchTerm))})
        }
    }
    return(
        <main className="clubs-page">
            <div className="search-box">
                <div className="search">
                    <img src={search.src} width={20} height={20} alt="search icon"/>
                    <input text="search" placeholder="Search for Club,Founder,etc" id="search" />
                </div>
                <button onClick={searchClub}>SEARCH</button>
                <button onClick={()=>{
                    console.log(verified)
                    if(!verified.session){
                        alert("You need to Sign Up first !!")
                    }else{
                        setShowClubForm(true)
                    }
                }}>CREATE CLUB</button>
            </div>
            {showClubForm && <form className="club-form" action={formAction}>
                    {formState && !formState.success && <div className="error">{formState.error}</div>}
                    <h4>Club Name:</h4>
                    <input type="text" name="club-name" placeholder="Chess leaders,heroes,etc"/>
                    <h4>Description</h4>
                    <textarea name="club-description"></textarea>
                    <button>{isPending? "Loading":"Create"}</button>
            </form>}
            <h1>Discover Clubs</h1>
            <div className="line"></div>
            {(clubList  && clubList.success && clubList.stmt.length > 0) ? <div className="club-list">
                {clubList?.stmt.map((club,index) =>{
                    return <div className="club" key={index}>
                    <img src={close.src} width={350} height={180} alt="Club banner"/>
                    <div className="club_info">
                        <Link href={`/club-detail?club_id=${club.id}&author_id=${club.author_id}`} className="club_name">{club.club_name}</Link>
                        <h4>Founded on {club.creation_date.slice(0,10)} by<span>{club.author_name}</span></h4>
                        <small><img width={20} height={20} src={group.src} className="members" alt="members"/><label>{club.member_list ? "":"0"} Members</label></small>
                    </div>
                </div>})}
            </div>:<h1 style={{marginTop:"10%"}}>No Clubs Found...</h1>}
        </main>
    );
}