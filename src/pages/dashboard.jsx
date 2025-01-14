import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {

  const navigate = useNavigate();
  // useEffect(() => {
  //   const validateToken = async () => {
  //     try {
  //       console.log()
  //       const url = "http://127.0.0.1:5000/";
  //       const response = await fetch(url + 'auth/validateAccessToken', {
  //         method: 'POST',
  //         credentials: 'include',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       })
  //       console.log(response);

  //       if (response.ok) {
  //         console.log('Access Token is valid');
  //       } else {
  //         navigate('/');
  //         throw new Error('Access Token is not valid');
  //       }
  //     }
  //     catch (error) {
  //       console.error('Error:', error);
  //     }
  //   }
  //   validateToken();
  // }, []);

  return (
    <div>
      Dashboard
      <div>
        username:
      </div>
    </div>
  )
}
