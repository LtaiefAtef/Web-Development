"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/assets/Images/Logo.png"
import Images from "./images";
import Link from "next/link";
export default function MainContent({meals}){
    const [currentMeals,setCurrentMeals]=useState([]);
    useEffect(()=>{
        document.getElementById("All").classList.add("tags-active");
        setCurrentMeals(meals);
    },[])
    function active(){
            document.querySelectorAll(".nav-link").forEach(element => {
                element.classList.remove("tags-active");
            });
            console.log(event.target.id);
            document.getElementById(event.target.id).classList.add("tags-active");
            if(event.target.id==="All"){
                setCurrentMeals(meals);
            }else{
            setCurrentMeals(meals.filter((meal)=> meal.type===event.target.id));}
        }
            return(
                <div className={`row`} aria-current="true">
                    <div className="col-md-3 text-white p-3 " id="sidebar">
                        <h4 className="d-flex align-items-center"><Link href="/" ><Image src={logo} width={120} height={120} alt="foodie fiesta"/><label className="font-monospace text-light">FOODIE FIESTA</label></Link></h4>
                        <ul className="nav flex-column">
                        <li className="nav-item"> 
                            <label onClick={active} id="All" className="nav-link" style={{cursor:"pointer"}}>
                                All
                                
                            </label>
                        </li>
                        <li className="nav-item">
                            <label onClick={active} id="Food"className="nav-link" style={{cursor:"pointer"}}>
                            Food
                            </label>
                        </li>
                        <li className="nav-item">
                            <label onClick={active} id="Drinks" className="nav-link" style={{cursor:"pointer"}}>
                            Drinks
                            </label>
                        </li>
                        </ul>
                            <style jsx>{`
                            
                            #All,#Food,#Drinks{
                                color:white;
                            }
                            #tags:hover{
                                color:black;
                                background:white;
                            }
                            .tags-active{
                                background:rgb(19, 19, 91);

                            }
                            `}</style>
                    </div>
                    <div className="col-md-9 p-3" >
                            <h1 className="text-light">Fast Food</h1>
                            <p className="text-light">
                                Welcome! Choose your option wisely from our great selection of food.
                            </p>
                            <Images meals={currentMeals}/>
                        </div>
                    </div>
            
            )
    }