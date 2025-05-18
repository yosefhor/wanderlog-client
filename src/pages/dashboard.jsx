import React from 'react';
import HistoricTrips from '../components/historicTrips';
import UpcomingTrips from '../components/upcomingTrips';

export default function Dashboard() {

  return (
    <div>
      <h2 className='mt-2 text-primary-emphasis fst-italic'>Trips I've visited already</h2>
      <HistoricTrips />
      <h2 className='mt-2 text-primary-emphasis fst-italic'>And upcoming trips</h2>
      <UpcomingTrips />
    </div>
  )
}
