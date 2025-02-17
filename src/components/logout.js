import { toast } from 'react-toastify';
import { useSpinner } from '../context/spinnerContext';
import { useNavigate } from 'react-router-dom';
import useRefreshToken from '../hooks/useRefreshToken';
import httpRequest from '../utils/httpRequest';

export function useLogout() {
    const refreshToken = useRefreshToken();
    const navigate = useNavigate();
    const { showSpinner, hideSpinner } = useSpinner();
    const logout = async () => {

        try {
            showSpinner();
            const customResponse = await httpRequest({ url: 'auth/logout', method: 'POST', credentials: 'include', refreshToken: refreshToken });
            hideSpinner();
            if (customResponse.ok) {
                toast.dismiss();
                toast.success(customResponse.data);
            }
            else {
                throw new Error(customResponse.statusText);
            }
        } catch (error) {
            hideSpinner();
            toast.dismiss();
            toast.error(`${error.message}`);
        } finally {
            localStorage.removeItem('isLoggedIn');
            navigate('/');
        }
    };
    return { logout }
}