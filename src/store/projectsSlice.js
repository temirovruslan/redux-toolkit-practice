import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProjects = createAsyncThunk(
	"fetchProjects",
	async function (_, { rejectWithValue }) {
		try {
			const url = "http://localhost:3500/projects";
			const fetch = await axios.get(url);
			return fetch.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const setSelectedProject = createAction("projects/setSelectedProject");

const projectsSlice = createSlice({
	name: "projectsSlice",
	initialState: {
		projects: [],
		selectProject: null,
	},
	reducers: {},
	extraReducers: {
		[fetchProjects.fulfilled](state, action) {
			state.projects = action.payload;
			state.selectProject = action.payload[7];
			state.loading = false;
		},
		[setSelectedProject](state, action) {
			state.selectProject = action.payload;
			localStorage.setItem(
				"selectedProject",
				JSON.stringify(action.payload)
			);
		},
	},
});

export default projectsSlice.reducer;
