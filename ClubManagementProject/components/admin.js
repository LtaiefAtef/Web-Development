"use client"
import search from "@/assets/search.png"
import { useRouter } from "next/navigation";
export default function Admin({verified}) {
    const router = useRouter()
    // if(!verified?.session){
    //     router.back()
    // }
    return (
        <main className="admin-page">
            <div className="requests">
                <h1>Club Membership Application</h1>
                <div className="search-box">
                    <div className="search">
                        <h4>What are you looking for ?</h4>
                        <div className="search-input">
                            <img src={search.src} alt="search logo" width={20} height={20} />
                            <input className="" type="search" placeholder="Search for category,name,status,etc"/>
                        </div>
                    </div>
                    <div className="search-category">
                        <h4>Category</h4>
                        <select className="">
                            <option value="all">All</option>
                        </select>
                    </div>
                    <div className="search-status">
                        <h4>Status</h4>
                        <select>
                            <option value="all">All</option>
                        </select>
                    </div>
                    <button>SEARCH</button>
                </div>
            </div>
        </main>
    );
}