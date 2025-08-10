import { toast } from 'react-toastify';
import { useSpinner } from '../context/spinnerContext';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { UserContext } from '../context/userContext';
import useRefreshToken from '../hooks/useRefreshToken';
import httpRequest from '../utils/httpRequest';
import { useContext } from 'react';

export function useLogout() {
    const refreshToken = useRefreshToken();
    const navigate = useNavigate();
    const { updateIsLoggedIn } = useContext(AuthContext);
    const { updateUsername } = useContext(UserContext);
    const { showSpinner, hideSpinner } = useSpinner();

    const logout = async () => {
        try {
            showSpinner();
            const customResponse = await httpRequest({ url: 'auth/logout', method: 'POST', credentials: 'include', refreshToken: refreshToken });
            hideSpinner();

            if (!customResponse.ok) {
                throw new Error(customResponse.statusText);
            }
            toast.dismiss();
            toast.success(customResponse.data);
        } catch (error) {
            hideSpinner();
            toast.dismiss();
            toast.error(`${error.message}`);
        } finally {
            updateIsLoggedIn(false)
            updateUsername('');
            localStorage.removeItem('username');
            navigate('/');
        }
    };
    return { logout }
}