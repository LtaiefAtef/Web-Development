import Link from "next/link";

export  default function Images({meals}) {
    // Function to truncate description to 100 characters
    const truncateDescription = (desc) => {
        return desc.length > 100 ? `${desc.substring(0, 40)}...` : desc;
    };
    return (
        <div className="container" style={{height:"100vh",overflow:"scroll"}}>
            <div className="row " style={{padding:"5px"}}>
                {meals.map(meal => (
                <div key={meal.id} className="col-md-4 col-sm-6 col-12 mb-4 ">
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
                    <p className="text-light ">{truncateDescription(meal.description)}</p>
                    <p className="d-flex gap-2">                    
                        <Link href={`/order-online/${meal.title}`} className="btn btn-outline-primary">View more</Link>
                        <Link href="#" className="btn btn-outline-primary">Order</Link></p>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
    };
