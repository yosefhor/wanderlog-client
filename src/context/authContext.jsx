import { createContext, useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/userContext';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem('isLoggedIn') !== null;
    });

    const updateIsLoggedIn = (newState) => {
        setIsLoggedIn(newState);
        if (newState) {
            localStorage.setItem('isLoggedIn', 'true');
        } else {
            localStorage.removeItem('isLoggedIn');
        }
    };

    const { username, updateUsername } = useContext(UserContext);
    
    //sync username & isLoggedIn with localStorage:
    useEffect(() => {
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
        if (storedIsLoggedIn === 'true' && !isLoggedIn) {
            updateIsLoggedIn(true);
        }

        const storedUsername = localStorage.getItem('username');
        if (storedUsername && !username) {
            updateUsername(storedUsername);
        } else if (username) {
            localStorage.setItem('username', username);
        }
    }, [isLoggedIn, username]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, updateIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
}
