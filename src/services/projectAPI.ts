import { BASE_URL } from "@/App";
import { toast } from "react-toastify";

// -------------- CREATE PROJECT ---------------
export const createProject = async (axiosPrivate: any, data: any) => {
    try {
        const response = await axiosPrivate.post(`${BASE_URL}/projects/create`, data);
        return response.data;
    }
    catch (err) {
        toast.error(err as string);
    }
}

// ------------- GET ALL PROJECTS OF USER ---------------
export const getProjectsOfUser = async (axiosPrivate: any) => {
    try {
        const response = await axiosPrivate.get(`${BASE_URL}/projects/get-all`);
        return response.data;
    }
    catch (err) {
        toast.error(err as string);
    }
}

// ------------- GET PROJECT ---------------
export const getProject = async (axiosPrivate: any, id: string) => {
    try {
        const response = await axiosPrivate.get(`${BASE_URL}/projects/get/${id}`);
        return response.data;
    }
    catch (err) {
        toast.error(err as string);
    }
}

// ------------- DELETE PROJECT ---------------
export const deleteProject = async (axiosPrivate: any, id: string) => {
    try {
        const response = await axiosPrivate.delete(`${BASE_URL}/projects/delete/${id}`);
        return response.data;
    }
    catch (err) {
        toast.error(err as string);
    }
}

// ------------- GET PROJECT USER ---------------
export const getProjectUsers = async (axiosPrivate: any, projectId: string) => {
    try {
        const response = await axiosPrivate.get(`${BASE_URL}/projects/get-project-users/${projectId}`);
        return response.data;
    }
    catch (err) {
        toast.error(err as string);
    }
}

// ------------- CHANGE ROLE ---------------
export const changeRole = async (axiosPrivate: any, projectId: string, data: any) => {
    try {
        const response = await axiosPrivate.put(`${BASE_URL}/projects/change-role/${projectId}`, data);
        return response.data;
    }
    catch (err) {
        toast.error(err as string);
    }
}