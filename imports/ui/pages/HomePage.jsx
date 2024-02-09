import React from 'react';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/login');
    };

    const goToRegister = () => {
        navigate('/register');
    };

    return (
        <div className="home-page">
            <h1>Welcome to Our Clinic Management System</h1>
            <p>Please choose an option below to continue.</p>
            <button onClick={goToLogin}>Login</button>
            <button onClick={goToRegister}>Register</button>
        </div>
    );
};
