"use client"
import search from "@/assets/search.png"
import { getRequests, modifyRequest } from "@/lib/DATA_OPS";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Admin({verified}) {
    const [request,setRequests] = useState(null)
    const router = useRouter()
    if(!verified?.session){
        return router.back()
    }
    async function getData(){
        const result = await getRequests();
        setRequests(result)
    }
    async function acceptRequest(e){
        const id = e.target.getAttribute("data-request-id")
        const result = await modifyRequest(id,"Accepted")
        await getData()
    }
    async function declineRequest(e){
        const id = e.target.getAttribute("data-request-id")
        const result = await modifyRequest(id,"Declined")
        await getData()
    }
    useEffect(()=>{
        getData()
    },[])
    return (
        <main className="admin-page">
            <div className="requests">
                <h1>Request Queue</h1>
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
                <table>
                    <thead>
                        <tr>
                        <th>Request_ID</th>
                        <th>User_ID</th>
                        <th>Author</th>
                        <th>Email</th>
                        <th>Category</th>
                        <th>Request</th>
                        <th>Status</th>
                        <th>Sent On</th>
                        <th>Decision</th>
                        </tr>
                    </thead>
                    {request?.success ? <tbody>
                        {request.stmt.map((request,index)=><tr key={index}>
                            <td>{request.id}</td>
                            <td>{request.userId}</td>
                            <td>{request.username}</td>
                            <td>{request.email}</td>
                            <td>{request.category}</td>
                            <td>{request.request}</td>
                            {request.status === "Pending" && <td><div className="pending">{request.status}</div></td>}
                            {request.status === "Accepted" && <td><div className="accepted">{request.status}</div></td>}
                            {request.status === "Declined" && <td><div className="declined">{request.status}</div></td>}
                            <td>{request.request_date}</td>
                            {request.status === "Pending" ? <td className="decision">
                                <button data-request-id={request.id} className="accept" onClick={(e)=>acceptRequest(e)}>Accept</button>
                                <button data-request-id={request.id} className="decline" onClick={(e)=>declineRequest(e)}>Decline</button>
                            </td>:<td></td>}
                        </tr>)}
                    </tbody>
                    :<tfoot><tr><td colSpan={9}>{request?.error}</td></tr></tfoot>}
                    {request?.sucess &&<tfoot>
                        <tr>
                        <td colSpan={9}>Total: 2 requests</td>
                        </tr>
                    </tfoot>}
                </table>
            </div>
        </main>
    );
}