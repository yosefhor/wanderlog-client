import React, { useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { useLogout } from './logout';
import ChangePassword from './changePassword';
import DeleteAccount from './deleteAccount';

export default function UserIcon() {

    const getInitials = (fullName) => {
        if (!fullName) return false;
        const index = (fullName?.indexOf(' '));
        return index !== -1 ? fullName[0] + fullName[index + 1].toUpperCase() : fullName.slice(0, 2).toUpperCase();
    }

    const userInitials = getInitials(localStorage.getItem('isLoggedIn'));
    const userAvatar = userInitials ? userInitials : <FaRegUserCircle />;
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showDeleteAccount, setShowDeleteAccount] = useState(false);
    const { logout } = useLogout();
    const changePassword = () => { setShowChangePassword(true) };
    const deleteAccount = () => { setShowDeleteAccount(true) };

    return (
        <div>
            <div className='dropdown'>
                <div className='ms-1 ms-sm-3 btn border-3 border-success-subtle fw-bold rounded-circle bg-light align-items-center justify-content-center d-flex dropdown-toggle custom_remove_caret' role="button" data-bs-toggle="dropdown" aria-expanded="false"
                    style={{
                        aspectRatio: 1,
                        width: 'clamp(40px,5vw,60px)',
                        fontSize: 'clamp(1rem, 2vw, 1.6rem)'
                    }}>{userAvatar}</div>
                <ul className='dropdown-menu'>
                    <li><button onClick={logout} className='dropdown-item'>log out</button></li>
                    <li><button onClick={changePassword} className='dropdown-item'>change password</button></li>
                    <li><button onClick={deleteAccount} className='dropdown-item'>delete account</button></li>
                </ul>
            </div>
            <ChangePassword showChangePassword={showChangePassword} handleClose={() => setShowChangePassword(false)} />
            <DeleteAccount showDeleteAccount={showDeleteAccount} handleClose={() => setShowDeleteAccount(false)} />
        </div>
    )
}
