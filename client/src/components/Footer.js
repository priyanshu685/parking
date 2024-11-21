// Footer.js
import React from 'react';
import '../styles/Footer.css'; // Import the CSS file

export const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
                <p>
                    <a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms of Service</a>
                </p>
            </div>
        </footer>
    );
};