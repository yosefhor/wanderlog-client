import React, { useMemo } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export default function TimelineTrips({ sortedTrips }) {
    const groupedByYear = useMemo(() => {
        if (!sortedTrips || sortedTrips.length === 0) return [];
        const grouped = sortedTrips.reduce((acc, trip) => {
            const year = trip.year;
            if (!acc[year]) {
                acc[year] = [];
            }
            acc[year].push(trip);
            return acc;
        }, {});
        return Object.entries(grouped).map(([year, trips]) => ({ year, trips }));
    }, [sortedTrips]);

    if (!groupedByYear || groupedByYear.length === 0) return null;

    return (
        <div className="overflow-x-auto my-4">
            <div className="d-flex justify-content-around">
                {groupedByYear.map((group, index) => (
                    <div className='text-center mx-3'>
                        <div key={index} className=" text-center d-flex justify-content-around">
                            {group.trips.map((trip, index) => (
                                <div key={index} className="text-center">
                                    <OverlayTrigger
                                        tripment="top"
                                        overlay={
                                            <Tooltip>
                                                <strong >{trip.city}</strong><br />
                                                {trip.month}/{trip.year}
                                            </Tooltip>
                                        }
                                    >
                                        <div className='mx-1' style={{ width: "3rem", height: "3rem" }}>
                                            <img src={trip.images[0]} alt={trip.city} className="img-fluid rounded-circle" style={{ width: "3rem", height: "3rem" }} />
                                        </div>
                                    </OverlayTrigger>
                                </div>
                            ))}
                        </div>
                        <div className="mt-2 text-muted small">{group.year}</div>
                    </div>
                ))}
            </div>
        </div>
    );

}
