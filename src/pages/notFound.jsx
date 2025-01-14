import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className='containern mt-5 text-center'>
            <h2 className='  mb-3'>404 - Oops, the page you're looking for doesn't exist yet</h2>
            <h3 className='  mb-3'>In the meantime, you can return to the homepage by clicking</h3>
            <Link to="/">
                <button className="btn btn-lg btn-outline-secondary col-5">here</button>
            </Link>
        </div>
    )
}
