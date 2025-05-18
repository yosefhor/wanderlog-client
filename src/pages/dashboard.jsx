import React from 'react';
import HistoricTrips from '../components/historicTrips';
import UpcomingTrips from '../components/upcomingTrips';
import defaultImage from '../defaultImage .webp';

export default function Dashboard() {

  return (
    <div>
      <h2 className='mt-2 text-primary-emphasis fst-italic'>Trips I've visited already</h2>
      <HistoricTrips defaultImage={defaultImage} />
      <h2 className='mt-2 text-primary-emphasis fst-italic'>And upcoming trips</h2>
      <UpcomingTrips defaultImage={defaultImage} />
    </div>
  )
}
