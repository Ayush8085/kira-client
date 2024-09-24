import { useDispatch } from "react-redux";
import { setAccessToken } from "@/features/auth/authSlice";
import { getRefreshToken } from "@/services/authAPI";

export const useRefreshToken = () => {
    const dispatch = useDispatch();    

    const refresh = async () => {
        const data = await getRefreshToken();
        dispatch(setAccessToken(data.accessToken));
        return data.accessToken;
    }

    return refresh;
}
