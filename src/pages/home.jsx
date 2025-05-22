import React from 'react';
import '../css files/home.css';
import { Outlet } from 'react-router-dom';

export default function Home() {

    return (
        <div className='p-3 position-relative' style={{ height: 'calc(100vh - 200px)' }}>
            <div className='img-fluid rounded-bottom-3 position-absolute'
                style={{
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url('/background.webp')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.7,
                    zIndex: -1,
                }}
            ></div>
            <h1 className='me-sm-3 text-center text-info-emphasis custom_title'>
                Relive your journeys – and dream up the next one
            </h1>
            <Outlet />
        </div>
    );
}
