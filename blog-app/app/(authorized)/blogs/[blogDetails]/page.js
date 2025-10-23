import { GetBlogById } from "@/lib/DATA_OPS";

export default async function BlogDetails({searchParams}) {
    const encodedData = (await searchParams).data;
    const dataParams = JSON.parse(Buffer.from(Buffer.from(encodedData, 'base64').toString('utf8')));
    const blog = await GetBlogById(dataParams.blogId);
    return <div className="blog_details">
                <div key={blog.id} className="blog">
                    <img src={blog.path} alt="blog cover" width="100"/>
                    <h1>{blog.subject}</h1>
                    <p>{blog.description}</p>
                    <div className="footer">
                        <small>Author: {dataParams.authorName}</small>                
                        <small>Created at: {blog.created_at}</small>
                    </div>
                </div>
        </div>
}