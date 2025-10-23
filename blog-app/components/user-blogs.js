import { GetBlogByUserId } from "@/lib/DATA_OPS"
import Link from "next/link";

export default async function UserBlogs({userId}) {
    const blogs = await GetBlogByUserId(userId);
    return <article className="user_blogs">
                {blogs ? blogs.map((blog)=>{
                    return <Link key={blog.id} href={`/blogs/BlogsDetails?data=${Buffer.from(JSON.stringify({ blogId: blog.id, authorName: blog.author_name })).toString("base64")}`}>{blog.subject}</Link>
                    }):"Loading"
                } 
    </article>
}