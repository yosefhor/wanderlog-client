import '../css files/header.css'
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from './navbar';
import UserIcon from './userIcon';

export default function Header() {
  const location = useLocation();
  const isLoggedIn = location.pathname.includes('/dashboard') ? true : false;

  return (
    <>
      <div className=' align-content-center'
        style={{
          height: 'clamp(50px,7vw + 20px,100px)',
          backgroundImage: `url('/bg2.jpeg')`,
          backgroundSize: 'cover'
        }}>
        <div className="d-flex align-items-center">
          <div className="float-star">
            {isLoggedIn && <UserIcon />}
          </div>
          <div className="flex-grow-1 d-flex justify-content-center">
            <Link
              to="/"
              className="navbar-brand ps-2 ps-sm-0 fw-bold text-info-emphasis fs-1 text-decoration-underline z-0">
              Wander-log
            </Link>
          </div>
        </div>
      </div >
      <Navbar />
    </>
  )
}
