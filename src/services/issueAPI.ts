import { BASE_URL } from "@/App";
import { toast } from "react-toastify";

// ------------- CREATE ISSUE ---------------
export const createIssue = async (axiosPrivate: any, projectId: string, data: any) => {
    try {
        const response = await axiosPrivate.post(`${BASE_URL}/issues/create/${projectId}`, data);
        return response.data;
    } catch (err) {
        toast.error(err as string);
    }
};

// ------------- GET ISSUE ---------------
export const getIssue = async (axiosPrivate: any, issueId: string) => {
    try {
        const response = await axiosPrivate.get(`${BASE_URL}/issues/get/${issueId}`);
        return response.data;
    } catch (err) {
        toast.error(err as string);
    }
};

// ------------- GET ISSUES ---------------
export const getIssues = async (axiosPrivate: any, projectId: string) => {
    try {
        const response = await axiosPrivate.get(`${BASE_URL}/issues/get-all/${projectId}`);
        return response.data;
    } catch (err) {
        toast.error(err as string);
    }
};

// ------------- DELETE ISSUE ---------------
export const deleteIssue = async (axiosPrivate: any, issueId: string) => {
    try {
        const response = await axiosPrivate.delete(`${BASE_URL}/issues/delete/${issueId}`);
        return response.data;
    } catch (err) {
        toast.error(err as string);
    }
};

// ------------- UPDATE ISSUE ---------------
export const updateIssue = async (axiosPrivate: any, issueId: string, data: any) => {
    try {
        const response = await axiosPrivate.put(`${BASE_URL}/issues/update/${issueId}`, data);
        return response.data;
    } catch (err) {
        toast.error(err as string);
    }
}

// ------------- ATTACH TO ISSUE -------------
export const attachToIssue = async (axiosPrivate: any, issueId: string, data: any) => {
    try {
        const response = await axiosPrivate.post(`${BASE_URL}/issues/attachment/${issueId}`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (err) {
        toast.error(err as string);
    }
}

// ------------- DOWNLOAD ATTACHMENT -------------
export const downloadIssueAttachment = async (axiosPrivate: any, attachmentId: string) => {
    try {
        const response = await axiosPrivate.get(`${BASE_URL}/issues/attachment/${attachmentId}`, {
            responseType: "blob",
        });
        return response.data;
    } catch (err) {
        toast.error(err as string);
    }
}

// ------------- DELETE ATTACHMENT -------------
export const deleteIssueAttachment = async (axiosPrivate: any, issueId: string, attachmentId: string) => {
    try {
        const response = await axiosPrivate.delete(`${BASE_URL}/issues/attachment/${issueId}/${attachmentId}`);
        return response.data;
    } catch (err) {
        toast.error(err as string);
    }
}