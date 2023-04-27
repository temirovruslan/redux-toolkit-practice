import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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

const projectsSlice = createSlice({
	name: "projectsSlice",
	initialState: {
		projects: [],
		error: null,
		loading: null,
		// selectedProject: null,
	},
	reducers: {
		// selectedProjectNow(state, action) {
		// 	// update the selectedProject when a new project is chosen
		// 	const selectedProj = state.projects.find(
		// 		(proj) => proj.id === action.payload.id
		// 	);
		// 	state.selectedProject = selectedProj;
		// 	localStorage.setItem(
		// 		"selectedProject",
		// 		JSON.stringify(selectedProj)
		// 	);
		// },
	},
	extraReducers: {
		[fetchProjects.pending](state, action) {
			state.loading = true;
			state.error = null;
		},
		[fetchProjects.fulfilled](state, action) {
			state.projects = action.payload;
			// state.selectedProjectNow = action.payload[0];
		
			// localStorage.setItem(
			// 	"selectedProject",
			// 	JSON.stringify(action.payload[0])
			// );
			state.loading = false;
		},
		[fetchProjects.rejected](state, action) {
			state.error = action.payload;
			state.loading = false;
		},
	},
});

export const { selectedProjectNow } = projectsSlice.actions;

export default projectsSlice.reducer;
