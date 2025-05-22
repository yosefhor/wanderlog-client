import React, { useContext, useRef, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useSpinner } from '../context/spinnerContext';
import { toast } from 'react-toastify';
import { VscEye } from 'react-icons/vsc';
import { UserContext } from '../context/userContext';
import httpRequest from '../utils/httpRequest';
import useRefreshToken from "../hooks/useRefreshToken";

export default function ChangePassword({ showChangePassword, handleClose }) {
    const refreshToken = useRefreshToken();
    const {username } = useContext(UserContext);
    const formRef = useRef(null);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const { showSpinner, hideSpinner } = useSpinner();
    const handleChangePassword = async (e) => {
        const form = formRef.current;
        if (!form.checkValidity()) {
            form.reportValidity();
        } else {
            try {
                showSpinner();
                const userDetails = { username: username, oldPassword: oldPassword, newPassword: newPassword };
                const customResponse = await httpRequest({ url: 'auth/change-password', method: 'PUT', credentials: 'include', body: userDetails, refreshToken: refreshToken });
                hideSpinner();
                if (customResponse.ok) {
                    toast.dismiss();
                    toast.success('the password has been changed');
                    handleClose()
                }
                else {
                    throw new Error(customResponse.statusText);
                }
            } catch (error) {
                hideSpinner();
                toast.dismiss();
                toast.error(`${error.message}`);
            }
        }
    };

    return (
        <Modal show={showChangePassword} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body className=' text-black'>
                <form ref={formRef}>
                    <div className="mb-3">
                        <span className='flo text-danger'>*</span>
                        <label for="InputPassword" className="form-label">Old Password</label>
                        <div className="input-group border rounded">
                            <input
                                required
                                className="form-control shadow-none border-0"
                                placeholder='old password'
                                type={showOldPassword ? 'text' : 'password'}
                                onChange={(e) => { setOldPassword(e.target.value) }}
                            />
                            <button onMouseDown={() => setShowOldPassword(true)} onMouseLeave={() => { setShowOldPassword(false) }} onMouseUp={() => { setShowOldPassword(false) }} type='button' className=' btn border-0 bg-white' ><VscEye /></button>
                        </div>
                    </div>
                    <div className="mb-3">
                        <span className='flo text-danger'>*</span>
                        <label for="InputPassword" className="form-label">New Password</label>
                        <div className='input-group border rounded'>
                            <input
                                required
                                minLength={4}
                                className="form-control shadow-none border-0"
                                placeholder='new password'
                                type={showNewPassword ? 'text' : 'password'}
                                onChange={(e) => { setNewPassword(e.target.value) }}
                            />
                            <button onMouseDown={() => setShowNewPassword(true)} onMouseLeave={() => { setShowNewPassword(false) }} onMouseUp={() => { setShowNewPassword(false) }} type='button' className=' btn border-0 bg-white' ><VscEye /></button>
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-between'>
                <Button variant="info" onClick={handleChangePassword}>Change password</Button>
                <Button variant="secondary" onClick={handleClose}>close</Button>
            </Modal.Footer>
        </Modal>
    )
}
