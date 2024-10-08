import { BASE_URL } from "@/App";
import axios from "axios";
import { toast } from "react-toastify";

// -------------- REGISTER USER ----------------
export const registerUser = async (data: any) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/register`, data);
        return response.data;
    }
    catch (err) {
        toast.error(err as string);
    }
};

// --------------- LOGIN USER ----------------
export const loginUser = async (data: any) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, data);
        return response.data;
    }
    catch (err) {
        toast.error(err as string);
    }
}

// -------------- LOGOUT USER ----------------
export const logoutUser = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/auth/logout`);
        return response.data;
    }
    catch (err) {
        toast.error(err as string);
    }
}

// ------------ GET LOGGED IN USER ----------------
export const getLoggedInUser = async (axiosPrivate: any) => {
    try {
        const response = await axiosPrivate.get(`${BASE_URL}/auth/get-log-in-user`);
        return response.data;
    }
    catch (err) {
        toast.error(err as string);
    }
}

// -------------- REFRESH TOKEN ----------------
export const getRefreshToken = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/refresh-token`);
        return response.data;
    }
    catch (err) {
        toast.error(err as string);
    }
}