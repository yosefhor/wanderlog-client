import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/userContext';
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { useSpinner } from '../context/spinnerContext';
import { toast } from 'react-toastify';
import { VscEye } from 'react-icons/vsc';
import httpRequest from '../utils/httpRequest';
import useRefreshToken from "../hooks/useRefreshToken";

export default function Login() {
    const refreshToken = useRefreshToken();
    const { username, updateUsername } = useContext(UserContext);
    const { isLoggedIn, updateIsLoggedIn } = useContext(AuthContext);
    const [localUser, setLocalUser] = useState({ username: username, password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
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
        await updateUsername(localUser.username);
        navigate(path);
    };

    const submit = async (e) => {
        e.preventDefault();
        setLocalUser({ username: localUser.username.trim(), password: localUser.password.trim() })
        try {
            showSpinner();
            const customResponse = await httpRequest({ url: 'auth/login', method: 'POST', credentials: 'include', body: localUser, refreshToken: refreshToken });
            hideSpinner();
            if (customResponse.ok) {
                updateIsLoggedIn(true);
                updateUsername(localUser.username);
                navigate('/dashboard');
            }
            else {
                throw new Error(customResponse.data.statusText);
            }
        } catch (error) {
            hideSpinner();
            toast.dismiss();
            toast.error(`${error.message}`);
        }
    }

    useEffect(() => {
        if (isLoggedIn) { navigate('/dashboard') };
    }, [navigate]);

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
                <button type='submit' className='input-group-text btn btn-lg fs-3 px-5 mt-3 btn-outline-success text-success-emphasis custom_buttons_text_color'>
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
