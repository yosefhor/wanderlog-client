import React, { useEffect, useState } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import httpRequest from '../utils/httpRequest';

export default function Dashboard() {
  const refreshToken = useRefreshToken();
  const [historicPlaces, setHistoricPlaces] = useState([]);
  const [newPlace, setNewPlace] = useState({});
  useEffect(() => {
    const customResponse = async () => {
      await httpRequest({ url: '/api/historic-places/getall', method: 'GET', credentials: 'include', refreshToken: refreshToken });
    }
    if (customResponse.status === 200) {
      setHistoricPlaces(customResponse.data);
    }
    console.log(historicPlaces);
    
  }, []);
  
  const addPlace = async () => {
    setNewPlace({ city: 'New York', country: 'USA' });
    await httpRequest({ url: '/api/historic-places/add', method: 'POST', credentials: 'include', body: newPlace, refreshToken: refreshToken });
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Historic Places</h2>
        <div className='card'>
          <button onClick={addPlace}>+</button>
        </div>
      {/* <div>
        {historicPlaces.map((place) => (
          <div key={place.id} className='card'>{place.city}</div>
        ))}
      </div> */}
    </div>
  )
}
