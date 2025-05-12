import React, { useMemo } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export default function TimelinePlaces({ sortedHistoricPlaces }) {

    const groupedByYear = useMemo(() => {
        const grouped = sortedHistoricPlaces.reduce((acc, place) => {
            const year = place.year;
            if (!acc[year]) {
                acc[year] = [];
            }
            acc[year].push(place);
            return acc;
        }, {});
        return Object.entries(grouped).map(([year, places]) => ({ year, places }));
    }, [sortedHistoricPlaces]);

    return (
        <div className="overflow-x-auto my-4">
            <div className="d-flex justify-content-around">
                {groupedByYear.map((group, index) => (
                    <div className='text-center mx-3'>
                        <div key={index} className=" text-center d-flex justify-content-around">
                            {group.places.map((place, index) => (
                                <div key={index} className="text-center">
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={
                                            <Tooltip>
                                                <strong >{place.city}</strong><br />
                                                {place.month}/{place.year}
                                            </Tooltip>
                                        }
                                    >
                                        <div className='mx-1' style={{ width: "3rem", height: "3rem" }}>
                                            <img src={place.images[0]} alt={place.city} className="img-fluid rounded-circle" style={{ width: "3rem", height: "3rem" }} />
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
