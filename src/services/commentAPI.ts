import { BASE_URL } from "@/App";


// -------------- CREATE COMMENT ---------------
export const createComment = async (axiosPrivate: any, issueId: string, data: any) => {
    try {
        const response = await axiosPrivate.post(`${BASE_URL}/comments/create/${issueId}`, data);
        console.log("create-comment-response: ", response.data);
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

// -------------- GET COMMENTS ---------------
export const getComments = async (axiosPrivate: any, issueId: string) => {
    try {
        const response = await axiosPrivate.get(`${BASE_URL}/comments/get-all/${issueId}`);
        console.log("get-comments-response: ", response.data);
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

// -------------- GET COMMENT ---------------
export const getComment = async (axiosPrivate: any, commentId: string) => {
    try {
        const response = await axiosPrivate.get(`${BASE_URL}/comments/get/${commentId}`);
        console.log("get-comment-response: ", response.data);
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

// -------------- UPDATE COMMENT ---------------
export const updateComment = async (axiosPrivate: any, commentId: string, data: any) => {
    try {
        const response = await axiosPrivate.put(`${BASE_URL}/comments/update/${commentId}`, data);
        console.log("update-comment-response: ", response.data);
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

// -------------- DELETE COMMENT ---------------
export const deleteComment = async (axiosPrivate: any, commentId: string) => {
    try {
        const response = await axiosPrivate.delete(`${BASE_URL}/comments/delete/${commentId}`);
        console.log("delete-comment-response: ", response.data);
        return response.data;
    } catch (err) {
        console.error(err);
    }
}