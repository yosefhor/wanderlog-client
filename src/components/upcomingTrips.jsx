import React, { useEffect, useMemo, useState } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import httpRequest from '../utils/httpRequest';
import UpdateTripModal from '../components/updateTripModal';
import { BiHotel } from "react-icons/bi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { CiCalendarDate } from "react-icons/ci";
import DeleteTripModal from './deleteTripModal';
import TimelineTrips from './timelineTrips';

export default function UpcomingTrips({ defaultImage }) {
    const refreshToken = useRefreshToken();
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [modalRole, setModalRole] = useState(null);
    const [currentTrip, setCurrentTrip] = useState({});
    const [upcomingTrips, setUpcomingTrips] = useState([]);

    const handleAddBtn = () => {
        setCurrentTrip({});
        setModalRole('add');
        setShowUpdateModal(true);
    }

    const handleUpdateBtn = (trip) => {
        setCurrentTrip(trip);
        setModalRole('update');
        setShowUpdateModal(true);
    }

    const handleDeleteBtn = (trip) => {
        setCurrentTrip(trip);
        setShowDeleteModal(true);
    }

    const addTrip = (addedTrip) => {
        setUpcomingTrips((prev) => [...prev, addedTrip]);
    }

    const updateTrip = (updatedTrip) => {
        const index = upcomingTrips.findIndex((trip) => trip.id === updatedTrip.id);
        setUpcomingTrips(upcomingTrips.map((trip) => {
            if (trip.id === updatedTrip.id) {
                return { ...trip, ...updatedTrip };
            }
            return trip;
        }));
    }

    const deleteTrip = (tripId) => {
        setUpcomingTrips((prev) => prev.filter((trip) => trip.id !== tripId));
    }

    useEffect(() => {
        const loadUpcomingTrips = async () => {
            try {
                const customResponse = await httpRequest({ url: 'api/upcoming-trips/get-all-by-id', method: 'GET', credentials: 'include', refreshToken: refreshToken });
                const tripsWithDefaultImage = customResponse.data.map(trip => ({
                    ...trip,
                    images: trip.images.length > 0 ? trip.images : [defaultImage, defaultImage],
                }));
                setUpcomingTrips(tripsWithDefaultImage);
            } catch (error) {
                console.log(error);
            }
        }
        loadUpcomingTrips()
    }, []);

    const sortedUpcomingTrips = useMemo(() => {
        return [...upcomingTrips].sort((a, b) => {
            if (a.year === b.year) return a.month - b.month;
            return a.year - b.year;
        });
    }, [upcomingTrips]);

    return (
        <>
            <TimelineTrips sortedTrips={sortedUpcomingTrips} />
            <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 row-cols-xl-6 g-2'>
                <button className='btn col' onClick={handleAddBtn}>
                    <div className='card h-100 d-flex align-items-center justify-content-center p-3'>
                        <MdOutlineAddLocationAlt size={'50'} />
                        <p>add a new trip</p>
                    </div>
                </button>
                {sortedUpcomingTrips.map((trip, index) => {
                    return (
                        <div key={index} className='col'>
                            <div className="card h-100">
                                {Array.isArray(trip.images) && trip.images.length > 0 ? (
                                    <div id={`carousel-${index}`} className="carousel slide" data-bs-ride="carousel">
                                        <div className="carousel-inner">
                                            {trip.images.map((image, index) => (
                                                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                                    <img loading='lazy' src={image} className='d-block w-100' alt={`City ${trip.city}`} style={{ height: "200px", objectFit: "cover" }} />
                                                </div>
                                            ))}
                                        </div>
                                        <button className="carousel-control-prev" type="button" data-bs-target={`#carousel-${index}`} data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target={`#carousel-${index}`} data-bs-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        </button>
                                    </div>
                                ) : (
                                    <p>No images available</p>
                                )}
                                <div className="card-body">
                                    <div className="d-flex align-items-center ">
                                        <CiLocationOn color='red' size={'2.5rem'} style={{ margin: -8 }} />
                                        <div className="">
                                            <h5 className="mb-0 ms-2"><strong>{trip.city}</strong></h5>
                                            <p className="mb-0 ms-2">{trip.country}</p>
                                        </div>
                                    </div>
                                    <div className='text-dark-emphasis bg-light p-1 rounded mt-2 user-select-none'>
                                        <CiCalendarDate size={24} /><p className="d-inline ms-2 align-bottom">{trip.month >= 10 ? trip.month : `0${trip.month}`}/{trip.year}</p>
                                    </div>
                                    {trip.hotel && (
                                        <div className='text-dark-emphasis bg-light p-1 rounded mt-2'>
                                            <BiHotel color='258ab9' size={20} />
                                            <strong className="d-inline ms-2 ">{trip.hotel}</strong>
                                        </div>
                                    )}
                                </div>
                                <div className="btn-group justify-content-center">
                                    <button className='btn border-0' onClick={() => { handleUpdateBtn(trip) }}><HiOutlinePencilSquare color='808080' size={30} /></button>
                                    <button className='btn border-0' onClick={() => { handleDeleteBtn(trip) }}><MdDeleteForever color='aa1919' size={30} /></button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            {showUpdateModal && currentTrip && (
                <UpdateTripModal
                    show={showUpdateModal}
                    onHide={() => { setShowUpdateModal(false) }}
                    onAdd={addTrip}
                    onUpdate={updateTrip}
                    currentTrip={currentTrip}
                    modalRole={modalRole}
                    type={'upcoming'}
                    url={'api/upcoming-trips/'}
                />
            )}
            {showDeleteModal && currentTrip && (
                <DeleteTripModal
                    show={showDeleteModal}
                    onHide={() => { setShowDeleteModal(false) }}
                    onDelete={deleteTrip}
                    currentTrip={currentTrip}
                    url={'api/upcoming-trips/delete'}
                />
            )}
        </>
    )
}
