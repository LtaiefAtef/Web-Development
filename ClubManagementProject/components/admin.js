"use client"
import search from "@/assets/search.png"
import { getRequests, modifyRequest } from "@/lib/DATA_OPS";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Admin({verified}) {
    const [request,setRequests] = useState(null)
    const [status,setStatus] = useState(null)
    const [category,setCategory] = useState(null)
    const [orignalData,setOriginalData] = useState(null)
    const router = useRouter()
    if(!verified?.session){
        return router.back()
    }
    async function getData(){
        const result = await getRequests();
        setStatus([...new Set(result.stmt.map((req)=>req.status))])
        setCategory([... new Set(result.stmt.map((req)=>req.category))])
        setOriginalData(result)
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
    function filterByCategory(e){
        if(e.target.value === "All"){
            setRequests(orignalData)
        }else{
            setRequests({success:true,stmt:request.stmt.filter((req)=>req.category === e.target.value)})
        }
    }
    function filterByStatus(e) {
        if(e.target.value === "All"){
            setRequests(orignalData)
        }else{
            setRequests({success:true,stmt:orignalData.stmt.filter((req)=>req.status === e.target.value)})
        }
    }
    function searchRequests(){
        const status = document.getElementById("status").value;
        const category = document.getElementById("category").value;
        const query  = document.getElementById("search-requests").value.toLowerCase();
        setRequests({success:true,stmt:orignalData.stmt.filter((req)=> (req.request.toLowerCase().includes(query) && req.status.includes(status) && req.category.includes(category)))})
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
                            <input className="" id="search-requests" type="search" placeholder="Search for category,name,status,etc"/>
                        </div>
                    </div>
                    <div className="search-category">
                        <h4>Category</h4>
                        <select id="category">
                            <option value="">All</option>
                            {category?.map((cat,index)=><option key={index} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                    <div className="search-status">
                        <h4>Status</h4>
                        <select id="status">
                            <option value="">All</option>
                            {status?.map((stat,index)=><option key={index} value={stat}>{stat}</option>)}
                        </select>
                    </div>
                    <button onClick={searchRequests}>SEARCH</button>
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
                            </td>:<td>Finalized</td>}
                        </tr>)}
                    </tbody>
                    :<tfoot><tr><td colSpan={9}>{request?.error}</td></tr></tfoot>}
                    {request?.success &&<tfoot className="total_request">
                        <tr>
                        <td colSpan={9}>Total: {request.stmt.filter((req)=>req.status==="Pending").length} requests</td>
                        </tr>
                    </tfoot>}
                </table>
            </div>
        </main>
    );
}