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

// setSelectedProject is action which updates selectedProject
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
			// if fulfilled is true getItem  from localStorage
			const projectFromLocalStorage = JSON.parse(
				localStorage.getItem("selectedProject")
			);
			state.projects = action.payload;
			// if projectFromLocalStorage is true put it if not put action.payload[7]
			state.selectProject = projectFromLocalStorage ?? action.payload[7];
			state.loading = false;
		},
		// setSelectedProject is action which updates selectedProject
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
