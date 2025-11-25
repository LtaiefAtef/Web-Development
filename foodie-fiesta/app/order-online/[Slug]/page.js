import { getAllMeals } from "@/lib/meals"
import Link from "next/link";
export default  async function Meal({params}){
    const meals= getAllMeals();
    const slug=params.Slug.replace(/%20/g," ");
    const meal=meals.filter((meal)=> meal.title===slug)[0];

    return(
        <div className="container d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
            <div  className="col-md-4 col-sm-6 col-12 mb-4 ">
                <div className="image-container ">
                <img
                    src={meal.src}
                    alt={meal.title}
                    className="img-fluid rounded"
                />
                <h5 className="mt-2 text-light">{meal.title}</h5>
                <p className="text-light d-flex">
                    Rating: {'⭐'.repeat(Math.round(meal.rating))}
                    /<label className="text-light fs-6">{meal.rating}</label>
                </p>
                <p className="text-light ">{meal.description}</p>
                <p className="d-flex gap-2">                    
                    <Link href="#" className="btn btn-outline-primary">Order</Link></p>
                </div>
            </div>
        </div>
    )
}