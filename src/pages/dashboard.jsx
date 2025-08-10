import React from 'react';
import HistoricTrips from '../components/historicTrips';
import UpcomingTrips from '../components/upcomingTrips';
import defaultImage from '../pictures/defaultImage.webp';

export default function Dashboard() {

  return (
    <div>
      <h2 className='mt-2 text-primary-emphasis fst-italic'>Trips I've Already Taken</h2>
      <HistoricTrips defaultImage={defaultImage} />
      <h2 className='mt-2 text-primary-emphasis fst-italic'>Trips I'm Planning to Take</h2>
      <UpcomingTrips defaultImage={defaultImage} />
    </div>
  )
}
