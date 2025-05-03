import React, { useEffect, useMemo, useState } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import httpRequest from '../utils/httpRequest';
import UpdateHistoricPlaceModal from '../components/updateHistoricPlaceModal';
import { FaRegStar, FaStar } from "react-icons/fa";
import { BiHotel } from "react-icons/bi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { LuNotebookPen } from "react-icons/lu";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { CiCalendarDate } from "react-icons/ci";
import DeletePlaceModal from './deletePlaceModal';
import { map } from 'lodash';

export default function HistoricPlaces() {
    const refreshToken = useRefreshToken();
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [modalRole, setModalRole] = useState(null);
    const [currentPlace, setCurrentPlace] = useState({});
    const [historicPlaces, setHistoricPlaces] = useState([]);
    const [expanded, setExpanded] = useState({});
    const wordLimit = 10;

    const toggleExpand = (id) => {
        setExpanded((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleAddBtn = () => {
        setCurrentPlace({});
        setModalRole('add');
        setShowUpdateModal(true);
    }

    const handleUpdateBtn = (place) => {
        setCurrentPlace(place);
        setModalRole('update');
        setShowUpdateModal(true);
    }

    const handleDeleteBtn = (place) => {
        setCurrentPlace(place);
        setShowDeleteModal(true);
    }

    const addPlace = (addedPlace) => {
        setHistoricPlaces((prev) => [...prev, addedPlace]);
    }

    const updatePlace = (updatedPlace) => {
        const index = historicPlaces.findIndex((place) => place.id === updatedPlace.id);
        setHistoricPlaces(map(historicPlaces, (place) => {
            if (place.id === updatedPlace.id) {
                return { ...place, ...updatedPlace };
            }
            return place;
        }));
        // setHistoricPlaces((prev) => [...prev, prev[index] = updatedPlace]);
    }

    const deletePlace = (placeId) => {
        setHistoricPlaces((prev) => prev.filter((place) => place.id !== placeId));
    }

    useEffect(() => {
        const loadHistoricPlaces = async () => {
            try {
                const customResponse = await httpRequest({ url: 'api/historic-places/get-all-by-id', method: 'GET', credentials: 'include', refreshToken: refreshToken });
                setHistoricPlaces(customResponse.data);
                console.log(customResponse.data);
            } catch (error) {
                console.log(error);
            }
        }
        loadHistoricPlaces()
    }, []);

    const sortedHistoricPlaces = useMemo(() => {
        return [...historicPlaces].sort((a, b) => {
            if (a.year === b.year) return a.month - b.month;
            return a.year - b.year;
        });
    }, [historicPlaces]);

    return (
        <>
            <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 row-cols-xl-6 g-2'>
                <button className='btn col' onClick={handleAddBtn}>
                    <div className='card h-100 d-flex align-items-center justify-content-center p-3'>
                        <MdOutlineAddLocationAlt size={'50'} />
                        <p>add a new place</p>
                    </div>
                </button>
                {sortedHistoricPlaces.map((place) => {
                    const words = place.description.split(" ");
                    const shortText = words.slice(0, wordLimit).join(" ");
                    const isLong = words.length > wordLimit;
                    const shortDescription = isLong ? (
                        <span onClick={() => toggleExpand(place.id)}>
                            {shortText}...<span className="text-primary" style={{ whiteSpace: "nowrap" }}>{' '}more</span>
                        </span>
                    ) : (
                        place.description
                    );
                    const longDescription = <span onClick={() => toggleExpand(place.id)}>{place.description}</span>;
                    return (
                        <div key={place.id} className='col'>
                            <div className="card h-100">
                                {place.images.length > 0 ? (
                                    <div id={`carousel-${place.id}`} className="carousel slide" data-bs-ride="carousel">
                                        <div className="carousel-inner">
                                            {place.images.map((image, index) => (
                                                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                                    <img src={image} className='d-block w-100' alt={`City ${place.city}`} style={{ height: "200px", objectFit: "cover" }} />
                                                </div>
                                            ))}
                                        </div>
                                        <button className="carousel-control-prev" type="button" data-bs-target={`#carousel-${place.id}`} data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target={`#carousel-${place.id}`} data-bs-slide="next">
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
                                            <h5 className="mb-0 ms-2"><strong>{place.city}</strong></h5>
                                            <p className="mb-0 ms-2">{place.country}</p>
                                        </div>
                                    </div>
                                    <div className='text-dark-emphasis bg-light p-1 rounded mt-2 user-select-none'>
                                        <CiCalendarDate size={24} /><p className="d-inline ms-2 align-bottom">{place.month >= 10 ? place.month : `0${place.month}`}/{place.year}</p>
                                    </div>
                                    <div className='text-dark-emphasis bg-light p-1 rounded mt-2 user-select-none'>
                                        <LuNotebookPen /><p className="d-inline ms-2 small">{expanded[place.id] ? longDescription : shortDescription}</p>
                                    </div>
                                    {place.hotel && (
                                        <div className='text-dark-emphasis bg-light p-1 rounded mt-2'>
                                            <BiHotel color='258ab9' size={20} />
                                            <strong className="d-inline ms-2 ">{place.hotel}</strong>
                                        </div>
                                    )}
                                    <div className="text-warning bg-light p-1 rounded mt-2">
                                        {[...Array(place.score)].map((_, i) => <FaStar key={i} />)}
                                        {[...Array(5 - place.score)].map((_, i) => <FaRegStar key={i} />)}
                                    </div>
                                </div>
                                <div className="btn-group justify-content-center">
                                    <button className='btn border-0' onClick={() => { handleUpdateBtn(place) }}><HiOutlinePencilSquare color='808080' size={30} /></button>
                                    <button className='btn border-0' onClick={() => { handleDeleteBtn(place) }}><MdDeleteForever color='aa1919' size={30} /></button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            {showUpdateModal && currentPlace && (
                <UpdateHistoricPlaceModal
                    show={showUpdateModal}
                    onHide={() => { setShowUpdateModal(false) }}
                    onAdd={addPlace}
                    onUpdate={updatePlace}
                    currentPlace={currentPlace}
                    modalRole={modalRole}
                />
            )}
            {showDeleteModal && currentPlace && (
                <DeletePlaceModal
                    show={showDeleteModal}
                    onHide={() => { setShowDeleteModal(false) }}
                    onDelete={deletePlace}
                    currentPlace={currentPlace}
                />
            )}
        </>
    )
}
