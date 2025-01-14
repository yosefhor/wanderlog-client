import React from 'react';
import { ClipLoader } from 'react-spinners';
import { useSpinner } from '../context/spinnerContext.jsx';

export default function Spinner() {
    const { isLoading } = useSpinner();

    return (
        <div className=' position-absolute top-50 start-50 translate-middle'>
            <ClipLoader
                loading={isLoading}
                color='#000080'
            />
        </div>
    )
}
