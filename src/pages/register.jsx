import React, { useContext, useState } from 'react'
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import { useSpinner } from '../context/spinnerContext';
import TermsAndConditions from '../components/termsAndConditions';
import { toast } from 'react-toastify';

export default function Register() {
    const { user, updateUser } = useContext(UserContext);
    const [localUser, setLocalUser] = useState({ username: user.username, password: user.password });
    const navigate = useNavigate();
    const server = "http://127.0.0.1:5000/";

    const [showTerms, setShowTerms] = useState(false);

    const { showSpinner, hideSpinner } = useSpinner();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
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
        try {
            showSpinner();
            const response = await fetch(server + 'register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(localUser),
            });
            hideSpinner();
            const result = await response.json();
            if (response.ok) {
                toast.dismiss();
                toast.success(result);
                handleNavigate('/');
            } else {
                hideSpinner();
                throw new Error(result.statusText);
            }
        } catch (error) {
            console.log(error);

            hideSpinner();
            toast.dismiss();
            toast.error(`${error.message}`);
        }
    }

    return (
        <div>
            <form className='mt-5 ' onSubmit={submit}>
                <div>
                    <input
                        required
                        type="text"
                        pattern="^[A-Za-z0-9\u0590-\u05FF]+$"
                        title="Please enter only English letters, Hebrew letters, and numbers."
                        name="username"
                        placeholder="Username"
                        className="col-11 col-sm-9 col-md-6 col-lg-4 input-group-text text-start my-2"
                        value={localUser.username}
                        onChange={handleInputChange}
                    />
                    <input
                        required
                        minLength={4}
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="col-11 col-sm-9 col-md-6 col-lg-4 input-group-text text-start my-2"
                        value={localUser.password}
                        onChange={handleInputChange}
                    />
                </div>
                <label>
                    <input required className=' form-check-inline' type='checkbox' /><span className=' user-select-none'>I accept the</span>
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
