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