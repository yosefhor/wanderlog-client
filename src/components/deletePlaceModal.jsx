import React from 'react'
import { Modal } from 'react-bootstrap'
import httpRequest from '../utils/httpRequest';
import useRefreshToken from '../hooks/useRefreshToken';
import { useSpinner } from '../context/spinnerContext';
import { toast } from 'react-toastify';

export default function DeletePlaceModal({ show, onHide, onDelete, currentPlace }) {
    const refreshToken = useRefreshToken();
    const { showSpinner, hideSpinner } = useSpinner();

    const handleDeletePlace = async (e) => {
        e.preventDefault();
        try {
            showSpinner();
            const customResponse = await httpRequest({ url: 'api/historic-places/delete', method: 'DELETE', credentials: 'include', body: { placeId: currentPlace.id }, refreshToken: refreshToken });
            hideSpinner();
            if (customResponse.status === 200) {
                onHide();
                toast.dismiss();
                toast.success(customResponse.data);
                onDelete(currentPlace.id);
            }
        } catch (error) {
            hideSpinner();
            console.log(error.message);
        }
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton />
            <Modal.Body className=''>
                <p>Are you sure you want to delete your trip to <strong >{currentPlace.city}, {currentPlace.country}</strong>?</p>
            </Modal.Body>
            <Modal.Footer>
                <button className='btn btn-secondary' onClick={() => onHide()}>Cancel</button>
                <button type="submit" className='btn btn-danger' onClick={handleDeletePlace}>Delete</button>
            </Modal.Footer>
        </Modal >
    )
}