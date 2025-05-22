import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/userContext';
import { AuthContext } from '../context/authContext';
import { useContext } from 'react';

export default function useRefreshToken() {
    const navigate = useNavigate();
    const { updateUsername } = useContext(UserContext);
    const { updateIsLoggedIn } = useContext(AuthContext);

    return async () => {
        const response = await fetch("http://127.0.0.1:5000/auth/refreshtoken", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        if (!response.ok) {
            navigate('/');
            toast.dismiss();
            toast.error('Authentication failed, please login again');
            return null;
        }
        const username = await response.json();
        // localStorage.setItem('isLoggedIn', username);
        updateIsLoggedIn(true);
        updateUsername(username)
        console.log('Token renewal successful');
        return true;

    };
};