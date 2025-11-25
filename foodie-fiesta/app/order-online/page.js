import MainContent from "@/Components/main-content";
import { getAllMeals } from "@/lib/meals";
export default async function OrderPage() {
    const allMeals=await getAllMeals();
    return (
        <div className="container-fluid overflow-hidden " style={{height:"100vh"}}>
            <MainContent meals={allMeals}/>
        </div>
        );
    };
    