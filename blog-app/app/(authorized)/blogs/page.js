"use client";
import { GetAuthor, GetBlogs } from "@/lib/DATA_OPS";
import Link from "next/link";
import { useEffect, useState } from "react";
export default  function Blogs(){
    const [blogs,setBlogs]=useState(null)
    const loading = Array.from({ length: 4 }).map((_, i) => (
    <div key={i} className="loading_blog">
        <div className="image" />
        <h1></h1>
        <p></p>
        <div className="footer">
        <small></small>                
        <small></small>
        </div>
        <div className="link"></div>
    </div>
    ));

    useEffect(()=>{
        async function  GetData() {
            const result=await GetBlogs();
            const display = await Promise.all(result.map(async(blog)=>{
                const author_name = (await GetAuthor(blog.author)).full_name;   
                return {...blog,author_name}
            }));
            setBlogs(display);
        }
        GetData();
    },[])
    return <div className="blogs" >
        <div className="container" >
            {blogs ? blogs.map((blog)=>{
                return <div key={blog.id} className="blog">
                <img src={blog.path} alt="blog cover" width="100"/>
                <h1>{blog.subject}</h1>
                <p>{blog.description.split(" ").slice(0,14).join(" ")}...</p>
                <div className="footer">
                    <small>Author:{blog.author_name}</small>                
                    <small>Created at: {blog.created_at.substring(0,10)}</small>
                </div>
                <Link href={`/blogs/BlogsDetails?data=${Buffer.from(JSON.stringify({ blogId: blog.id, authorName: blog.author_name })).toString("base64")}`}>Read more</Link>
            </div>}):loading}  
        </div>
    </div>
}