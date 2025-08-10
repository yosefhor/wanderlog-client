import Header from './header';
import { Outlet } from 'react-router-dom';
import Spinner from './spinner';
import Footer from './footer';

export default function Layout() {
    return (
        <>
            <header className='position-sticky top-0 z-3'>
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
