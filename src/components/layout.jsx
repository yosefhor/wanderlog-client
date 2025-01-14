import React from 'react';
import Header from './header';
import { Outlet } from 'react-router-dom';
import Footer from './footer';
import Spinner from './spinner';

export default function Layout() {
    return (<>
        <header className='position-sticky top-0'>
            <Header />
        </header>
        <main>
            <Outlet />
            <Spinner />
        </main>
        <footer className='mt-5'>
            <Footer />
        </footer>
    </>
    )
}
