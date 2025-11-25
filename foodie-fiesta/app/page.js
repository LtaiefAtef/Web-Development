import Link from "next/link";
import Image from "next/image";
import AboutUs from "@/assets/Images/About_us.webp";
import NavBar from "@/Components/navbar";
import { getAllMeals } from "@/lib/meals";
import Menu from "@/Components/menu";

export  default async function Home() {
    const meals= getAllMeals();
    return (
        <main className="">
            <NavBar position="sticky-top" />
            {/* Hero Section */}
            <div className="d-flex align-items-center hero-section" id="Home" style={{marginTop:"100px"}}>
                <div className="container-fluid text-center py-4 text-light">
                    <h1 className="display-4 fw-bold">Welcome to Our Restaurant</h1>
                    <p className="lead">Experience the perfect blend of flavors and hospitality at our restaurant.</p>
                    <p className="lead">Make your dining experience unforgettable.</p>
                    <Link className="btn btn-dark btn-lg" href="#" role="button">
                        Discover Menu
                    </Link>
                </div>
            </div>
            <div className="container text-center py-5">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="fw-semibold text-light">
                            Explore a World of Culinary Delights
                        </h2>
                        <p className="text-light ">
                            Whether you’re in the mood for classic comfort food or adventurous global flavors, our menu is designed to satisfy every craving. 
                            Sourced from the freshest ingredients and inspired by diverse cuisines, each dish tells a story.
                        </p>
                        <p className="text-light">
                            Join us and take your taste buds on an unforgettable journey, 
                            because at Foodie Fiesta, every bite is crafted with passion and care.
                        </p>
                    </div>
                </div>
            </div>
            {/* Menu Section */}
            <div className="d-flex flex-column align-items-center">
                <h1 className="text-light">Menu</h1>
                <Menu meals={meals}/>
            </div>
            {/* About Section */}
            <div className="container my-5 text-light " id="About">
                <div className="row align-items-center">
                    <div className="col-md-4">
                        <Image
                            width={500}
                            src={AboutUs}
                            className="img-fluid rounded"
                            alt="About us"
                        />
                    </div>
                    <div className="col-md-6">
                        <h2>About Us</h2>
                        <p>
                            Welcome to Foodie Fiesta, where passion meets flavor. Since our establishment in 2024, we’ve been dedicated to crafting unforgettable dining experiences. Our menu combines the finest ingredients with innovative culinary techniques to create dishes that tantalize your taste buds.
                        </p>
                        <p>
                            At Foodie Fiesta, we believe in the art of hospitality. From the warm ambiance of our dining space to the meticulous care in every plate served, our goal is to make every visit special. Whether you’re joining us for a celebration, a casual meal, or just to explore our unique flavors, we’re here to make you feel at home.
                        </p>
                        <p>
                            Thank you for being part of our journey—we can’t wait to serve you!
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-dark text-white text-center py-3">
                <div className="container">
                    <p className="mb-0">© 2024 Restaurant. All Rights Reserved.</p>
                </div>
            </footer>
        </main>
    );
}
