import React, { useContext, useState } from 'react'
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import { useSpinner } from '../context/spinnerContext';
import { toast } from 'react-toastify';

export default function Login() {
    const { user, updateUser } = useContext(UserContext);
    const [localUser, setLocalUser] = useState({ username: user.username, password: user.password });
    const navigate = useNavigate();

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

    const url = "http://127.0.0.1:5000/";
    const { showSpinner, hideSpinner } = useSpinner();

    const submit = async (e) => {
        e.preventDefault();
        try {
            showSpinner();
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
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
                navigate('/dashboard');
            }
            else {
                console.log(result.statusText);
                throw new Error(result.statusText);
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
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="col-11 col-sm-9 col-md-6 col-lg-4 input-group-text text-start my-2"
                        value={localUser.password}
                        onChange={handleInputChange}
                    />
                </div>
                <button type='submit' className='input-group-text btn btn-lg fs-3 px-5 btn-outline-success text-success-emphasis custom_buttons_text_color'>
                    Log in
                </button>
            </form>
            <p className=' my-2'>-------- or --------</p>
            <button onClick={() => handleNavigate('/register')} className=' btn btn-light border border-2' to='/register'>
                I don't have an account
            </button>
        </div>
    )
}
