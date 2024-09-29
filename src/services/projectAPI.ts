import { BASE_URL } from "@/App";

// -------------- CREATE PROJECT ---------------
export const createProject = async (axiosPrivate: any, data: any) => {
    try {
        const response = await axiosPrivate.post(`${BASE_URL}/projects/create`, data);
        return response.data;
    }
    catch (err) {
        console.error(err);
    }
}

// ------------- GET ALL PROJECTS OF USER ---------------
export const getProjectsOfUser = async (axiosPrivate: any) => {
    try {
        const response = await axiosPrivate.get(`${BASE_URL}/projects/get-all`);
        return response.data;
    }
    catch (err) {
        console.error(err);
    }
}

// ------------- GET PROJECT ---------------
export const getProject = async (axiosPrivate: any, id: string) => {
    try {
        const response = await axiosPrivate.get(`${BASE_URL}/projects/get/${id}`);
        return response.data;
    }
    catch (err) {
        console.error(err);
    }
}

// ------------- DELETE PROJECT ---------------
export const deleteProject = async (axiosPrivate: any, id: string) => {
    try {
        const response = await axiosPrivate.delete(`${BASE_URL}/projects/delete/${id}`);
        console.log("delete-project-response: ", response.data);
        return response.data;
    }
    catch (err) {
        console.error(err);
    }
}