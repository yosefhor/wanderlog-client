import '../css files/header.css'
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navbar';
import { useSpinner } from '../context/spinnerContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Header() {
  const userLetters = 'AA'

  const navigate = useNavigate();
  const url = "http://127.0.0.1:5000/";
  const { showSpinner, hideSpinner } = useSpinner();

  const handleClick = async (e) => {
    try {
      e.preventDefault();
      showSpinner();
      const response = await fetch(url + 'auth/refreshtoken/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      hideSpinner();
      const result = await response.json();
      if (response.ok) {
        toast.dismiss();
        toast.success(result);
      }
      else {
        console.log(result.statusText);
        throw new Error(result.statusText);
      }
    } catch (error) {
      hideSpinner();
      toast.dismiss();
      toast.error(`${error.message}`);
    } finally {
      navigate('/');
    }
  }

  return (
    <>
      <div className=' align-content-center' style={{ height: 'clamp(50px,7vw + 20px,100px)' }}>
        <div className='top-0 start-0 end-0 bottom-0 position-absolute opacity-50 cove'
          style={{
            backgroundImage: `url('/bg2.jpeg')`,
            backgroundSize: 'cover',
            zIndex: -1,
          }} />
        <div className='d-flex align-items-center'>
          <div className='dropdown'>
            <a className='m-1 btn border-3 border-success-subtle fw-bold rounded-circle bg-light align-items-center justify-content-center d-flex dropdown-toggle custom_remove_caret' role="button" data-bs-toggle="dropdown" aria-expanded="false"
              style={{
                aspectRatio: 1,
                width: 'clamp(40px,5vw,60px)',
                fontSize: 'clamp(1rem, 2vw, 1.6rem)'
              }}>{userLetters}</a>
            <ul className='dropdown-menu'>
              <li><button onClick={handleClick} className='dropdown-item'>log out</button></li>
            </ul>
          </div>
          <Link to='/' className=' navbar-brand mx-auto ps-2 pe-5 fw-bold text-info-emphasis fs-1 text-decoration-underline'>
            Wander-log
          </Link>
        </div>
      </div >
      <Navbar />
    </>
  )
}
