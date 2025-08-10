import UserProvider from './context/userContext.jsx';
import AuthProvider from './context/authContext.jsx';
import SpinnerProvider from './context/spinnerContext.jsx';
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from './components/layout';
import Home from './pages/home';
import Login from './components/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import TravelInfo from './pages/travelInfo';
import NotFound from './pages/notFound';
import { ToastContainer } from 'react-toastify';
import TravelDestinations from './pages/travelDestinations.jsx';
import { useContext } from 'react';
import { AuthContext } from './context/authContext.jsx';


function ProtectedRoute({ children }) {
    const { isLoggedIn } = useContext(AuthContext);
    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
    }
    return children;
}

export default function AppRoute() {
    return (
        <UserProvider>
            <AuthProvider>
                <SpinnerProvider>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route path='/' element={<Home />}>
                                <Route index element={<Login />} />
                                <Route path='/register' element={<Register />} />
                            </Route>
                            <Route path='/dashboard' element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            } />
                            <Route path='/travelInfo' element={<TravelInfo />} />
                            <Route path='/travelDestinations' element={<TravelDestinations />} />
                            <Route path='*' element={<NotFound />} />
                        </Route>
                    </Routes>
                    <ToastContainer position="bottom-center" />
                </SpinnerProvider>
            </AuthProvider>
        </UserProvider>
    )
}
