import React, { useEffect, useMemo, useState } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import httpRequest from '../utils/httpRequest';
import UpdateHistoricTripModal from './updateTripModal';
import { FaRegStar, FaStar } from "react-icons/fa";
import { BiHotel } from "react-icons/bi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { LuNotebookPen } from "react-icons/lu";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { CiCalendarDate } from "react-icons/ci";
import DeleteTripModal from './deleteTripModal';
import TimelineTrips from './timelineTrips';

export default function HistoricTrips({defaultImage}) {
    const refreshToken = useRefreshToken();
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [modalRole, setModalRole] = useState(null);
    const [currentTrip, setCurrentTrip] = useState({});
    const [historicTrips, setHistoricTrips] = useState([]);
    const [expanded, setExpanded] = useState({});
    const wordLimit = 10;

    const toggleExpand = (id) => {
        setExpanded((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

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
        setHistoricTrips((prev) => [...prev, addedTrip]);
    }

    const updateTrip = (updatedTrip) => {
        const index = historicTrips.findIndex((trip) => trip.id === updatedTrip.id);
        setHistoricTrips(historicTrips.map((trip) => {
            if (trip.id === updatedTrip.id) {
                return { ...trip, ...updatedTrip };
            }
            return trip;
        }));
    }

    const deleteTrip = (tripId) => {
        setHistoricTrips((prev) => prev.filter((trip) => trip.id !== tripId));
    }

    useEffect(() => {
        const loadHistoricTrips = async () => {
            try {
                const customResponse = await httpRequest({ url: 'api/historic-trips/get-all-by-id', method: 'GET', credentials: 'include', refreshToken: refreshToken });
                const tripsWithDefaultImage = customResponse.data.map(trip => ({
                    ...trip,
                    images: trip.images.length > 0 ? trip.images : [defaultImage, defaultImage],
                }));
                setHistoricTrips(tripsWithDefaultImage);
            } catch (error) {
                console.log(error);
            }
        }
        loadHistoricTrips()
    }, []);

    const sortedHistoricTrips = useMemo(() => {
        return [...historicTrips].sort((a, b) => {
            if (a.year === b.year) return a.month - b.month;
            return a.year - b.year;
        });
    }, [historicTrips]);

    return (
        <>
            <TimelineTrips sortedTrips={sortedHistoricTrips} />
            <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 row-cols-xl-6 g-2'>
                <button className='btn col' onClick={handleAddBtn}>
                    <div className='card h-100 d-flex align-items-center justify-content-center p-3'>
                        <MdOutlineAddLocationAlt size={'50'} />
                        <p>add a new trip</p>
                    </div>
                </button>
                {sortedHistoricTrips.map((trip, index) => {
                    const words = trip.description.split(" ");
                    const shortText = words.slice(0, wordLimit).join(" ");
                    const isLong = words.length > wordLimit;
                    const shortDescription = isLong ? (
                        <span onClick={() => toggleExpand(trip.id)}>
                            {shortText}...<span className="text-primary" style={{ whiteSpace: "nowrap" }}>{' '}more</span>
                        </span>
                    ) : (
                        trip.description
                    );
                    const longDescription = <span onClick={() => toggleExpand(trip.id)}>{trip.description}</span>;
                    return (
                        <div key={trip.id} className='col'>
                            <div className="card h-100">
                                <div id={`carousel-${trip.id}`} className="carousel slide" data-bs-ride="carousel">
                                    <div className="carousel-inner">
                                        {trip.images.map((image, index) => (
                                            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                                <img
                                                    loading='lazy'
                                                    src={image}
                                                    className='d-block w-100'
                                                    alt={`City ${trip.city}`}
                                                    style={{ height: "200px", objectFit: "cover" }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <button className="carousel-control-prev" type="button" data-bs-target={`#carousel-${trip.id}`} data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    </button>
                                    <button className="carousel-control-next" type="button" data-bs-target={`#carousel-${trip.id}`} data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    </button>
                                </div>
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
                                    <div className='text-dark-emphasis bg-light p-1 rounded mt-2 user-select-none'>
                                        <LuNotebookPen /><p className="d-inline ms-2 small">{expanded[trip.id] ? longDescription : shortDescription}</p>
                                    </div>
                                    {trip.hotel && (
                                        <div className='text-dark-emphasis bg-light p-1 rounded mt-2'>
                                            <BiHotel color='258ab9' size={20} />
                                            <strong className="d-inline ms-2 ">{trip.hotel}</strong>
                                        </div>
                                    )}
                                    <div className="text-warning bg-light p-1 rounded mt-2">
                                        {[...Array(trip.score)].map((_, i) => <FaStar key={i} />)}
                                        {[...Array(5 - trip.score)].map((_, i) => <FaRegStar key={i} />)}
                                    </div>
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
                <UpdateHistoricTripModal
                    show={showUpdateModal}
                    onHide={() => { setShowUpdateModal(false) }}
                    onAdd={addTrip}
                    onUpdate={updateTrip}
                    currentTrip={currentTrip}
                    modalRole={modalRole}
                    type={'historic'}
                    url={'api/historic-trips/'}
                />
            )}
            {showDeleteModal && currentTrip && (
                <DeleteTripModal
                    show={showDeleteModal}
                    onHide={() => { setShowDeleteModal(false) }}
                    onDelete={deleteTrip}
                    currentTrip={currentTrip}
                    url={'api/historic-trips/delete'}
                />
            )}
        </>
    )
}
