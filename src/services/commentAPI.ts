import { BASE_URL } from "@/App";
import { toast } from "react-toastify";


// -------------- CREATE COMMENT ---------------
export const createComment = async (axiosPrivate: any, issueId: string, data: any) => {
    try {
        const response = await axiosPrivate.post(`${BASE_URL}/comments/create/${issueId}`, data);
        return response.data;
    } catch (err) {
        toast.error(err as string);
    }
};

// -------------- GET COMMENTS ---------------
export const getComments = async (axiosPrivate: any, issueId: string) => {
    try {
        const response = await axiosPrivate.get(`${BASE_URL}/comments/get-all/${issueId}`);
        return response.data;
    } catch (err) {
        toast.error(err as string);
    }
};

// -------------- GET COMMENT ---------------
export const getComment = async (axiosPrivate: any, commentId: string) => {
    try {
        const response = await axiosPrivate.get(`${BASE_URL}/comments/get/${commentId}`);
        return response.data;
    } catch (err) {
        toast.error(err as string);
    }
};

// -------------- UPDATE COMMENT ---------------
export const updateComment = async (axiosPrivate: any, commentId: string, data: any) => {
    try {
        const response = await axiosPrivate.put(`${BASE_URL}/comments/update/${commentId}`, data);
        return response.data;
    } catch (err) {
        toast.error(err as string);
    }
};

// -------------- DELETE COMMENT ---------------
export const deleteComment = async (axiosPrivate: any, commentId: string) => {
    try {
        const response = await axiosPrivate.delete(`${BASE_URL}/comments/delete/${commentId}`);
        return response.data;
    } catch (err) {
        toast.error(err as string);
    }
}