import React from 'react';
import '../styles/Navbar.css'; // Create this CSS file for styling

export const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Parking Management-System</h1>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/register">Register</a></li>
                <li><a href="/login">Login</a></li>
            </ul>
        </nav>
    );
};