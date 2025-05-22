import React, { useContext, useEffect, useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { useLogout } from './logout';
import { UserContext } from '../context/userContext';
import { AuthContext } from '../context/authContext';
import ChangePassword from './changePassword';
import DeleteAccount from './deleteAccount';
import { CiLogout } from 'react-icons/ci';
import { TbLockPassword } from 'react-icons/tb';
import { MdDeleteOutline } from 'react-icons/md';

export default function UserIcon() {

    const getInitials = (fullName) => {
        if (!fullName) return false;
        const index = (fullName?.indexOf(' '));
        return index !== -1 ? fullName[0].toUpperCase() + fullName[index + 1].toUpperCase() : fullName.slice(0, 2).toUpperCase();
    }
    const { username } = useContext(UserContext);
    const { isLoggedIn } = useContext(AuthContext);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showDeleteAccount, setShowDeleteAccount] = useState(false);
    const { logout } = useLogout();

    const changePassword = () => { setShowChangePassword(true) };
    const deleteAccount = () => { setShowDeleteAccount(true) };

    const userInitials = getInitials(username);

    return (
        <div>
            <div className='dropdown'>
                <div className='ms-1 ms-sm-3 btn border-3 border-success-subtle fw-bold rounded-circle bg-light align-items-center justify-content-center d-flex' role="button" data-bs-toggle="dropdown" aria-expanded="false"
                    style={{
                        aspectRatio: 1,
                        width: 'clamp(40px,5vw,60px)',
                        fontSize: 'clamp(1rem, 2vw, 1.6rem)'
                    }}>{userInitials || <FaRegUserCircle />}</div>
                <ul className='dropdown-menu'>
                    <li><button onClick={logout} className='dropdown-item d-flex align-items-center justify-content-between'>log out<CiLogout /></button></li>
                    <li><button onClick={changePassword} className='dropdown-item d-flex align-items-center justify-content-between gap-3'>change password<TbLockPassword /></button></li>
                    <li><button onClick={deleteAccount} className='dropdown-item d-flex align-items-center justify-content-between'>delete account<MdDeleteOutline /></button></li>
                </ul>
            </div>
            <ChangePassword showChangePassword={showChangePassword} handleClose={() => setShowChangePassword(false)} />
            <DeleteAccount showDeleteAccount={showDeleteAccount} handleClose={() => setShowDeleteAccount(false)} />
        </div >
    )
}
