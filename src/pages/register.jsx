import React, { useContext, useState } from 'react'
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import { useSpinner } from '../context/spinnerContext';
import TermsAndConditions from '../components/termsAndConditions';
import { toast } from 'react-toastify';
import { VscEye } from 'react-icons/vsc';
import httpRequest from '../utils/httpRequest';
import useRefreshToken from "../hooks/useRefreshToken";

export default function Register() {
    const refreshToken = useRefreshToken();
    const { user, updateUser } = useContext(UserContext);
    const [localUser, setLocalUser] = useState({ username: user.username, password: user.password });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [showTerms, setShowTerms] = useState(false);
    const { showSpinner, hideSpinner } = useSpinner();
    const handleInputChange = (e) => {
        let { name, value } = e.target;
        value = value.replace(/\s+/g, ' ');
        setLocalUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleNavigate = async (path) => {
        await updateUser(localUser);
        navigate(path);
    };

    const submit = async (e) => {
        e.preventDefault();
        setLocalUser({ username: localUser.username.trim(), password: localUser.password.trim() })
        try {
            showSpinner();
            const customResponse = await httpRequest({ url: 'auth/register', method: 'POST', credentials: 'include', body: localUser, refreshToken: refreshToken });
            hideSpinner();
            if (customResponse.ok) {
                toast.dismiss();
                toast.success(customResponse.data);
                handleNavigate('/');
            } else {
                throw new Error(customResponse.data.statusText);
            }
        } catch (error) {
            hideSpinner();
            toast.dismiss();
            toast.error(`${error.message}`);
        }
    }

    return (
        <div>
            <form className='mt-5 ' onSubmit={submit}>
                <div className=" col-11 col-sm-9 col-md-6 col-lg-4">
                    <div className='mb-2'>
                        <input
                            required
                            type="text"
                            pattern="^[A-Za-z0-9\u0590-\u05FF\s]+$"
                            title="Please enter only English letters, Hebrew letters, and numbers."
                            name="username"
                            placeholder="Username"
                            className=" text-start form-control shadow-none border-0"
                            value={localUser.username}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            required
                            minLength={4}
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Password"
                            className="form-control text-start border-0 shadow-none"
                            value={localUser.password}
                            onChange={handleInputChange}
                        />
                        <button onMouseDown={() => setShowPassword(true)} onMouseLeave={() => { setShowPassword(false) }} onMouseUp={() => { setShowPassword(false) }} type='button' className=' btn border-0 bg-white' ><VscEye /></button>
                    </div>
                </div>
                <label>
                    <input required className=' form-check-inline me-2' type='checkbox' />
                    <span className=' user-select-none'><span className=' text-danger'>*</span>I accept the</span>
                    <button type='button' className='btn text-primary ps-1 pb-2' onClick={() => setShowTerms(true)}>Terms & Conditions</button>
                    <TermsAndConditions showTerms={showTerms} handleClose={() => setShowTerms(false)} />
                </label>
                <br />
                <button type='submit' className='input-group-text btn btn-lg fs-3 px-5 btn-outline-success text-success-emphasis custom_buttons_text_color'>
                    Sign up
                </button>
            </form>
            <p className=' my-2'>-------- or --------</p>
            <button onClick={() => handleNavigate('/')} className=' btn btn-light border border-2' to='/login'>
                I already have an account
            </button>
        </div>
    )
}
