import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from './navbar';
import UserIcon from './userIcon';
import LoginBtn from './loginBtn';
import { AuthContext } from '../context/authContext';

export default function Header() {

  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      <div className=' align-content-center '
        style={{
          height: 'clamp(50px,7vw + 20px,100px)',
          backgroundImage: `url('/bg4.webp')`,
          backgroundSize: 'cover'
        }}>
        <div className="d-flex align-items-center position-relative">
          <div className="float-star">
            {isLoggedIn && <UserIcon />}
            {!isLoggedIn && < LoginBtn />}
          </div>
          <div className=" position-absolute start-50 translate-middle-x">
            <Link
              to="/"
              className="navbar-brand fw-bold fst-italic"
              style={{
                fontSize: 'clamp(2rem, 4vw + 1rem, 4rem)',
                color: 'aqua',
                textShadow: `
                 0 0 5px #FFA500,
                 0 0 10px #FF8C00,
                 0 0 20px #FF8C00
                `,
                letterSpacing: '2px',
                transition: 'transform 0.3s ease-in-out',
              }}
            >
              Wander-log
            </Link>
          </div>
        </div>
      </div >
      <Navbar />
    </>
  )
}
