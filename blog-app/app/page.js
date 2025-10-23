import Link from "next/link";
import logo from "@/assets/logo.svg"
import { verifyAuth } from "@/lib/auth";
export default async function HomePage(){
  const verified = await verifyAuth();
  return (
<div className="home-page">
    <img className="page-logo" src={logo.src} alt="Page logo"/>
    <h1>Welcome to Blogs World</h1>
    <p>
      Your go-to hub for fresh ideas, thoughtful insights, and practical tips across tech, lifestyle, productivity, and more. 
      Whether you're here to learn something new, stay informed, or get inspired, we've got content tailored to your curiosity.
      Dive into our latest posts, explore trending topics, and join a community that loves to grow and share.
    </p>

    {/* Featured Posts Section */}
    <section className="featured-posts">
      <h2>Featured Posts</h2>
      <ul>
        <li><a href="/post/1">5 Ways to Boost Your Productivity Today</a></li>
        <li><a href="/post/2">Top 10 Tools Every Developer Should Know</a></li>
        <li><a href="/post/3">Healthy Lifestyle Habits for Busy People</a></li>
      </ul>
    </section>

    {/* Call to Action */}
    <section className="cta">
      <h2>Stay in the Loop</h2>
      <p>Subscribe to our newsletter and never miss an update.</p>
        <Link href={verified.user ? "/blogs":"/authentication?mode=login"} type="submit">Get started</Link>
    </section>
    {/* Categories or Tags */}
    <section className="categories">
      <h2>Explore by Category</h2>
      <div className="category-tags">
        <a href="/category/tech">#Tech</a>
        <a href="/category/lifestyle">#Lifestyle</a>
        <a href="/category/productivity">#Productivity</a>
        <a href="/category/career">#Career</a>
      </div>
    </section>
    {/* About the Author */}
    <section className="about-author">
      <h2>About the Author</h2>
      <p>Hi, I'm atef ltaief, a passionate writer, developer, and lifelong learner. I created this blog to share insights, ideas, and resources that help others grow in both personal and professional life.</p>
    </section>
  </div>
  );
}