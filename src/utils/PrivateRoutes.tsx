import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoutes = () => {
    const auth = false;

    return (
        auth ? <Outlet /> : <Navigate to="/login" />
    )
}
