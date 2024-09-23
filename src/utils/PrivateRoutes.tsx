import { selectIsLoggedIn } from '@/features/auth/authSlice';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoutes = () => {
    const auth = useSelector(selectIsLoggedIn);

    return (
        auth ? <Outlet /> : <Navigate to="/login" />
    )
}
