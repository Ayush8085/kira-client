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

// ------------- UPDATE ISSUE ---------------
export const updateIssue = async (axiosPrivate: any, issueId: string, data: any) => {
    try {
        const response = await axiosPrivate.put(`${BASE_URL}/issues/update/${issueId}`, data);
        console.log("update-issue-response: ", response.data);
        return response.data;
    } catch (err) {
        console.error(err);
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
        console.log("attach-issue-response: ", response.data);
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

// ------------- DOWNLOAD ATTACHMENT -------------
export const downloadIssueAttachment = async (axiosPrivate: any, attachmentId: string) => {
    try {
        const response = await axiosPrivate.get(`${BASE_URL}/issues/attachment/${attachmentId}`, {
            responseType: "blob",
        });
        console.log("download-attachment-response: ", response.data);
        return response.data;
    } catch (err) {
        console.error(err);
    }
}
 
// ------------- DELETE ATTACHMENT -------------
export const deleteIssueAttachment = async(axiosPrivate: any, issueId: string, attachmentId: string) => {
    try {
        const response = await axiosPrivate.delete(`${BASE_URL}/issues/attachment/${issueId}/${attachmentId}`);
        console.log("delete-attachment-response", response.data);
        return response.data;
    } catch (err) {
        console.error(err);        
    }
}