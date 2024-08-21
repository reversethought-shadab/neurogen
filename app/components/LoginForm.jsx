'use client';
import React, { useState } from 'react';
import { MdCheckCircle, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import "../styles/globals.css";

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const validateEmail = () => {
        if (!email) {
            return 'Email is required';
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            return 'Invalid email address';
        }
        return '';
    };
    
    const validatePassword = () => {
        if (!password) {
            return 'Password is required';
        }
        const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[0-9]).{8,}$/;
        if (!passwordPattern.test(password)) {
            return 'Password must be at least 8 characters long, contain an uppercase letter, one special character, a number, and a lowercase letter';
        }
        setIsPasswordValid(true);
        return '';
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const emailError = validateEmail();
        const passwordError = validatePassword();
        
        if (emailError || passwordError) {
            setErrors({ email: emailError, password: passwordError });
            setIsPasswordValid(false);
        } else {
            setErrors({});
            // Add form submission logic here
        }
    };
    
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    
    return (
        <div className="login-container">
            <h2 className="welcome-title">Welcome</h2>
            <p className="welcome-subtitle">Login to NeuroLAB AI to Enter the Dashboard</p>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <span className="error-msg">{errors.email}</span>}
                </div>
                <div className="input-container password-container">
                    <label htmlFor="password">Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={isPasswordValid ? 'valid' : ''}
                    />
                    <button
                        type="button"
                        onClick={toggleShowPassword}
                        className="toggle-password"
                        aria-label="Toggle password visibility"
                    >
                        {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                    </button>
                    {isPasswordValid && <MdCheckCircle className="check-icon" />}
                    {errors.password && <span className="error-msg">{errors.password}</span>}
                </div>
                <a href="#" className="forgot-password">Forgot password?</a>
                <button type="submit" className="login-btn">Login</button>
                <div className="alternative-login">
                    <div className="separator">
                        <hr className="line"/>
                        <p className="or-text">Or</p>
                        <hr className="line"/>
                    </div>
                    <button className="google-login">
                    <img src="/google.png" alt="Google logo" className="social-logo" />
                    Continue with Google
                </button>
                <button className="apple-login">
                    <img src="/apple-logo.png" alt="Apple logo" className="social-logo" />
                    Continue with Apple
                </button>
                </div>
                <p className="signup-text">Don’t have an account? <a href="#">Signup</a></p>
            </form>
        </div>
    );
}
