"use client";
import { useEffect, useState } from "react"

export default function Menu({meals}){
    const [currentMealIndex,setCurrentMealIndex]=useState(0);
    const [newMeals,setNewMeals]=useState();

    useEffect(() => {
        const interval = setInterval(() => {
        setCurrentMealIndex((prevIndex) =>
            prevIndex < meals.length - 1 ? prevIndex + Math.floor(Math.random() * 10)+1 : 0
        );
        }, 5000);
        return () => clearInterval(interval);
    }, []);
    return(
            meals.map((meal)=>(
                <div key={Math.random()*10}>
                    <span className="text-light" key={meal.id}>{meal.id===currentMealIndex ? <p >{meal.title}</p>:""}</span>
                    <span className="text-light" key={meal.id+1}>{meal.id===currentMealIndex+1 ? <p >{meal.title}</p>:""}</span>
                    <span className="text-light" key={meal.id+2}>{meal.id===currentMealIndex+2 ? <p >{meal.title}</p>:""}</span>
                </div>
            )
            )
    )
}