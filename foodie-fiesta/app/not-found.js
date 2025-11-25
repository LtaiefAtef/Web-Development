import Link from "next/link";

export default function notFound(){
    return(
        
        <div className="container d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
        <div className="text-light fs-1 d-flex gap-4 text-align-items">
            Page not found 
        </div>
        <Link className="text-warning fs-5" href={"/"}>Go back</Link>
    </div>
    );
}