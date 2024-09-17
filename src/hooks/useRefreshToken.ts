import { useDispatch } from "react-redux";
import { setAccessToken } from "@/features/auth/authSlice";
import { getRefreshToken } from "@/services/authAPI";

export const useRefreshToken = () => {
    const dispatch = useDispatch();    

    const refresh = async () => {
        const data = await getRefreshToken();
        dispatch(setAccessToken(data.accessToken));
        console.log("before: ", localStorage.getItem("accessToken"));
        localStorage.setItem("accessToken", data.accessToken);
        console.log("after: ", localStorage.getItem("accessToken"));
        return data.accessToken;
    }

    return refresh;
}
