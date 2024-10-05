import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
    name: "project",
    initialState: {
        projects: [],
        project: null,
        projectUsers: [],
        otherUsers: [],
    },
    reducers: {
        setProjects: (state, action) => {
            state.projects = action.payload;
        },
        setProject: (state, action) => {
            state.project = action.payload;
        },
        setProjectUsers: (state, action) => {
            state.projectUsers = action.payload;
        },
        setOtherUsers: (state, action) => {
            state.otherUsers = action.payload;
        },
    },
});

export const { setProjects, setProject, setProjectUsers, setOtherUsers } = projectSlice.actions;

export const projectReducer = projectSlice.reducer;

export const selectProjects = (state: any) => state.project.projects;
export const selectProject = (state: any) => state.project.project;
export const selectProjectUsers = (state: any) => state.project.projectUsers;
export const selectOtherUsers = (state: any) => state.project.otherUsers;