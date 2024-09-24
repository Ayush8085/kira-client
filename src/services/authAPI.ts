import { BASE_URL } from "@/App";
import axios from "axios";

// -------------- REGISTER USER ----------------
export const registerUser = async (data: any) => {
    try {
        console.log("authAPI_register: ", data);
        const response = await axios.post(`${BASE_URL}/auth/register`, data);
        return response.data;
    }
    catch (err) {
        console.error(err);
    }
};

// --------------- LOGIN USER ----------------
export const loginUser = async (data: any) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, data);
        console.log("authAPI_login: ", response.data);
        return response.data;
    }
    catch (err) {
        console.error(err);
    }
}

// -------------- LOGOUT USER ----------------
export const logoutUser = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/auth/logout`);
        localStorage.clear();
        return response.data;
    }
    catch (err) {
        console.error(err);
    }
}

// ------------ GET LOGGED IN USER ----------------
export const getLoggedInUser = async (axiosPrivate: any) => {
    try {
        const response = await axiosPrivate.get(`${BASE_URL}/auth/get-log-in-user`);
        console.log("get-log-in-user-data", response.data);
        return response.data;
    }
    catch (err) {
        console.error(err);
    }
}

// -------------- REFRESH TOKEN ----------------
export const getRefreshToken = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/refresh-token`);
        console.log("get-refresh-token-data", response.data);
        return response.data;
    }
    catch (err) {
        console.error(err);
    }
}