import { useContext, useRef, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useSpinner } from '../context/spinnerContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../context/userContext';
import { AuthContext } from '../context/authContext';
import { VscEye } from 'react-icons/vsc';
import httpRequest from '../utils/httpRequest';
import useRefreshToken from "../hooks/useRefreshToken";

export default function DeleteAccount({ showDeleteAccount, handleClose }) {
    const refreshToken = useRefreshToken();

    const formRef = useRef(null);

    const { username, updateUsername } = useContext(UserContext);
    const { updateIsLoggedIn } = useContext(AuthContext);
    const { showSpinner, hideSpinner } = useSpinner();

    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleDeleteAccount = async (e) => {
        const form = formRef.current;
        if (!form.checkValidity()) {
            form.reportValidity();
        } else {
            try {
                showSpinner();
                const user = { username: username, password: password };
                const customResponse = await httpRequest({ url: 'auth/delete-account', method: 'DELETE', credentials: 'include', body: user, refreshToken: refreshToken });
                hideSpinner();

                if (!customResponse.ok) {
                    throw new Error(customResponse.statusText);
                }

                toast.dismiss();
                toast.success('the account has been deleted');
                updateIsLoggedIn(false);
                updateUsername('');
                localStorage.removeItem('username');
                navigate('/');
                updateUsername('');
            } catch (error) {
                hideSpinner();
                toast.dismiss();
                toast.error(`${error.message}`);
            }
        }
    };

    return (
        <Modal show={showDeleteAccount} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body className=''>
                <form ref={formRef}>
                    <div className="mb-3">
                        <span className='flo text-danger'>*</span>
                        <label for="InputPassword" className="form-label">Password</label>
                        <div className="input-group border rounded">
                            <input
                                onChange={(e) => { setPassword(e.target.value) }}
                                required
                                type={showPassword ? 'text' : 'password'}
                                className="form-control shadow-none border-0"
                                placeholder='password'
                            />
                            <button onMouseDown={() => setShowPassword(true)} onMouseLeave={() => { setShowPassword(false) }} onMouseUp={() => { setShowPassword(false) }} type='button' className=' btn border-0 bg-white' ><VscEye /></button>
                        </div>
                    </div>
                    <label className="mb-3 form-check user-select-none">
                        <input required type="checkbox" className="form-check-input" />
                        <span className=' text-danger'>*</span>
                        <span className="form-check-inline" >I want to permanantly delete my account</span>
                    </label>
                </form>
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-between'>
                <Button variant="danger" onClick={handleDeleteAccount}>Delete account</Button>
                <Button variant="secondary" onClick={handleClose}>cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}
