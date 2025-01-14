import React, { useState } from 'react';
import TermsAndConditions from './termsAndConditions';

export default function Footer() {
    const [showTerms, setShowTerms] = useState(false);

    return (
        <footer className=' container fixed-bottom bg-white text-center text-body d-inline-flex justify-content-center align-items-center small'>
            <button className='border-0 bg-white text-primary' onClick={() => setShowTerms(true)}>Terms & Conditions</button>|
            <div className='ms-1'>Designed and built by : <a className='text-decoration-none' target='_blanc' href='https://www.linkedin.com/in/yossef-horvitz-511786278/'>Yossef Horvitz</a></div>
            <TermsAndConditions showTerms={showTerms} handleClose={() => setShowTerms(false)} />
        </footer>
    )
}
