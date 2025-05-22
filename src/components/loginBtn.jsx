import React from 'react'
import { Link } from 'react-router-dom'

export default function LoginBtn() {
    return (
        <Link to='/' className='d-none d-sm-block btn btn-warning fs-4 ms-sm-2 ms-md-3 text-decoration-none'>
            Login
        </Link>
    )
}
