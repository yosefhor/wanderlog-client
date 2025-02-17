import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') ? true : false;
    return (
        <nav className="navbar navbar-expand-lg bg-light border-bottom border-2 border-black">
            <div className="container-fluid ">
                <Link className="navbar-brand me-1" to="/">WanderLog</Link>
                <button className="navbar-toggler ms-auto me-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {isLoggedIn && <li className="nav-item">
                            <Link className="nav-link" to="/dashboard">Dashboard</Link>
                        </li>}
                        <li className="nav-item">
                            <Link className="nav-link" to="/services">Services</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};