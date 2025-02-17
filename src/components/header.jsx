import '../css files/header.css'
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from './navbar';
import UserIcon from './userIcon';

export default function Header() {
  const location = useLocation();
  const isLoggedIn = location.pathname.includes('/dashboard') ? true : false;
  console.log(location.pathname);

  return (
    <>
      <div className=' align-content-center' style={{ height: 'clamp(50px,7vw + 20px,100px)' }}>
        <div className='top-0 start-0 end-0 bottom-0 position-absolute opacity-50 cove'
          style={{
            backgroundImage: `url('/bg2.jpeg')`,
            backgroundSize: 'cover',
            zIndex: -1,
          }} />
        <div className="d-flex align-items-center">
          {isLoggedIn && <UserIcon />}
          <div className="flex-grow-1 d-flex justify-content-center">
            <Link
              to="/"
              className="navbar-brand ps-2 ps-sm-0 fw-bold text-info-emphasis fs-1 text-decoration-underline">
              Wander-log
            </Link>
          </div>
        </div>

      </div >
      <Navbar />
    </>
  )
}
