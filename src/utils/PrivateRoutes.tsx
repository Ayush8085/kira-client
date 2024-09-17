import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoutes = () => {
    const auth = localStorage.getItem("accessToken") || null;

    return (
        auth ? <Outlet /> : <Navigate to="/login" />
    )
}
