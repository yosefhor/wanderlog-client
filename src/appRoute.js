import React from 'react';
import UserProvider from './context/userContext.jsx';
import SpinnerProvider from './context/spinnerContext.jsx';
import { Routes, Route } from "react-router";
import Layout from './components/layout';
import Home from './pages/home';
import Login from './components/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import NotFound from './pages/notFound';
import { ToastContainer } from 'react-toastify';

export default function AppRoute() {
    return (
        <UserProvider>
            <SpinnerProvider>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path='/' element={<Home />}>
                            <Route index element={<Login />} />
                            <Route path='/register' element={<Register />} />
                        </Route>
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path='*' element={<NotFound />} />
                    </Route>

                </Routes>
                <ToastContainer position="bottom-center" />
            </SpinnerProvider>
        </UserProvider>
    )
}
