"use client";
import NavBar from '@/Components/navbar';
import React, { useState } from 'react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (!e.target.value.includes('@') || !e.target.value.endsWith('.com')) {
            setEmailError('Invalid email format. Must include "@" and end with ".com".');
        } else {
            setEmailError('');
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        const hasUpperCase = /[A-Z]/.test(e.target.value);
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(e.target.value);
        const isValidLength = e.target.value.length > 4;
        if (!hasUpperCase || !hasSymbol || !isValidLength) {
            setPasswordError(
                'Password must be more than 4 characters, include at least one uppercase letter, and one symbol.'
            );
        } else {
            setPasswordError('');
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!emailError && !passwordError && email && password) {
            alert('Login Successful!');
        } else {
            alert('Please fix the errors before submitting.');
        }
    };

    const inputStyles = {
        background: "none",
        border: "1px solid #0D6EFD",
    };

    return (
        <div style={{height:"100vh"}}>
            <NavBar position="absolute" />
            <div className="container-fluid" style={{marginTop:"100px"}}>
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-11 col-sm-9 col-md-7 col-lg-5">
                        <div className="card" style={{ backgroundColor: "transparent", border: "none" }}>
                            <div className="card-body">
                                <h3 className="card-title text-center text-light">Login</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label text-light">Email address</label>
                                        <input
                                            type="email"
                                            className={`form-control text-light ${emailError ? 'is-invalid' : ''}`}
                                            style={inputStyles}
                                            id="email"
                                            value={email}
                                            onChange={handleEmailChange}
                                        />
                                        {emailError && <div className="invalid-feedback">{emailError}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label text-light">Password</label>
                                        <div className="input-group">
                                            <input
                                                style={inputStyles}
                                                type={showPassword ? 'text' : 'password'}
                                                className={`form-control text-light ${passwordError ? 'is-invalid' : ''}`}
                                                id="password"
                                                value={password}
                                                onChange={handlePasswordChange}
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={toggleShowPassword}
                                            >
                                                {showPassword ? 'Hide' : 'Show'}
                                            </button>
                                        </div>
                                        {passwordError && <div className="invalid-feedback d-block">{passwordError}</div>}
                                    </div>
                                    <div className="mb-3 form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="rememberMe"
                                        />
                                        <label className="form-check-label text-light" htmlFor="rememberMe">Remember me</label>
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
