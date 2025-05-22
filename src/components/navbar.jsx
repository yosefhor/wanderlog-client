import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

export default function Navbar() {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-lg bg-light border-bottom border-2 border-black">
            <button className="navbar-toggler ms-auto me-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    {isLoggedIn && <li className="nav-item d-flex align-items-center">
                        <Link className="nav-link mx-4" to="/dashboard">Dashboard</Link><span className=" d-none d-lg-block text-muted">|</span>
                    </li>}
                    <li className="nav-item d-flex align-items-center">
                        <Link className="nav-link mx-4" to="/TravelInfo">Travel Info </Link><span className=" d-none d-lg-block text-muted">|</span>
                    </li>
                    <li className="nav-item d-flex align-items-center">
                        <Link className="nav-link mx-4" to="/travelDestinations">Travel Destinations</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};