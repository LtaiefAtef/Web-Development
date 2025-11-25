"use client";
import React, { useState } from "react";
import NavBar from "@/Components/navbar";

export default function SignUpPage() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        gender: "",
    });

    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
        gender: "",
        general: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let newErrors = { username: "", email: "", password: "", gender: "", general: "" };

        if (!formData.username) {
            newErrors.username = "Username is required.";
        }

        if (!formData.email) {
            newErrors.email = "Email is required.";
        } else if (!validateEmail(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (!formData.password) {
            newErrors.password = "Password is required.";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }

        if (!formData.gender) {
            newErrors.gender = "Please select your gender.";
        }

        setErrors(newErrors);

        if (!Object.values(newErrors).some((error) => error)) {
            alert("Form submitted successfully!");
        }
    };

    const inputStyle = { background: "none", border: "1px solid #0D6EFD" };

    return (
        <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
            <NavBar />
            <div className="container-fluid d-flex justify-content-center align-items-center" style={{ flex: 1, marginTop: "20px" }}>
                <form onSubmit={handleSubmit} className="text-light w-100" style={{ maxWidth: "500px" }}>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {errors.general && (
                        <div className="alert alert-danger" role="alert">
                            {errors.general}
                        </div>
                    )}
                    <div className="form-group mb-3">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className={`form-control text-light ${errors.username && "is-invalid"}`}
                            id="username"
                            name="username"
                            style={inputStyle}
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                        {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className={`form-control text-light ${errors.email && "is-invalid"}`}
                            id="email"
                            name="email"
                            style={inputStyle}
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="form-group mb-3 position-relative">
                        <label htmlFor="password">Password</label>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                className={`form-control text-light ${errors.password && "is-invalid"}`}
                                id="password"
                                name="password"
                                style={inputStyle}
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                    <div className="form-group mb-3">
                        <label>Gender</label>
                        <div className="d-flex gap-3">
                            <div className="form-check">
                                <input
                                    className="form-check-input text-light"
                                    type="radio"
                                    name="gender"
                                    id="male"
                                    value="Male"
                                    onChange={handleInputChange}
                                    style={inputStyle}
                                />
                                <label className="form-check-label" htmlFor="male">
                                    Male
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input text-light"
                                    type="radio"
                                    name="gender"
                                    id="female"
                                    value="Female"
                                    onChange={handleInputChange}
                                    style={inputStyle}
                                />
                                <label className="form-check-label" htmlFor="female">
                                    Female
                                </label>
                            </div>
                        </div>
                        {errors.gender && <div className="text-danger mt-1">{errors.gender}</div>}
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}
