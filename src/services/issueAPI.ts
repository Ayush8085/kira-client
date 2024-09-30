import { BASE_URL } from "@/App";

// ------------- CREATE ISSUE ---------------
export const createIssue = async (axiosPrivate: any, projectId: string, data: any) => {
    try {
        const response = await axiosPrivate.post(`${BASE_URL}/issues/create/${projectId}`, data);
        console.log("create-issue-response: ", response.data);
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

// ------------- GET ISSUE ---------------
export const getIssue = async (axiosPrivate: any, issueId: string) => {
    try {
        const response = await axiosPrivate.get(`${BASE_URL}/issues/get/${issueId}`);
        console.log("get-issue-response: ", response.data);
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

// ------------- GET ISSUES ---------------
export const getIssues = async (axiosPrivate: any, projectId: string) => {
    try {
        const response = await axiosPrivate.get(`${BASE_URL}/issues/get-all/${projectId}`);
        console.log("get-issues-response: ", response.data);
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

// ------------- DELETE ISSUE ---------------
export const deleteIssue = async (axiosPrivate: any, issueId: string) => {
    try {
        const response = await axiosPrivate.delete(`${BASE_URL}/issues/delete/${issueId}`);
        console.log("delete-issue-response: ", response.data);
        return response.data;
    } catch (err) {
        console.error(err);
    }
};
