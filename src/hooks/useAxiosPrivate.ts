import { axiosPrivate } from '@/api/axios'
import { useRefreshToken } from './useRefreshToken';
import { useEffect } from 'react';
import { HTTP_FORBIDDEN } from '@/utils/http.status';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '@/features/auth/authSlice';

export const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const accessToken = useSelector(selectAccessToken);

    useEffect(() => {
        const requestInterceptor = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                }
                return config;
            },
            error => Promise.reject(error)
        )

        const responseInterceptor = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === HTTP_FORBIDDEN && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        )

        // CLEAN UP
        return () => {
            axiosPrivate.interceptors.request.eject(requestInterceptor);
            axiosPrivate.interceptors.response.eject(responseInterceptor);
        }
    }, [accessToken, refresh]);

    return axiosPrivate;
}
