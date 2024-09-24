import { selectAccessToken, setAccessToken, setCredentials, setIsLoggedIn } from '@/features/auth/authSlice';
import { useAxiosPrivate } from '@/hooks/useAxiosPrivate';
import { getLoggedInUser } from '@/services/authAPI';
import React, { createContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const axiosPrivate = useAxiosPrivate();
    const [isLoading, setIsLoading] = useState(false);
    const accessToken = useSelector(selectAccessToken);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const userData = async () => {
            setIsLoading(true);
            try {
                const data = await getLoggedInUser(axiosPrivate);
                if (data) {
                    dispatch(setCredentials(data.user));
                    dispatch(setAccessToken(data.accessToken));
                    dispatch(setIsLoggedIn(data.isLoggedIn));
                    navigate('/');
                } else {
                    console.error('No data returned from getLoggedInUser');
                }
            } catch (error) {
                console.error('Error getting logged in user: ', error);
                navigate('/login');
            } finally {
                setIsLoading(false);
            }
        }
        userData();
    }, [dispatch, axiosPrivate, accessToken]);

    return (
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
