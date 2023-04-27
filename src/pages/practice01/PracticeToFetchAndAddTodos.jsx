import React, { useEffect, useState } from "react";
import Header from "../../components/reusable/Header";
import { fetchProjects, setSelectedProject } from "../../store/projectsSlice";
import { useDispatch, useSelector } from "react-redux";
import ListOfProjects from "./ListOfProjects";
import GetDataFromSelectedProject from "./GetDataFromSelectedProject";

const PracticeToFetchAndAddTodos = () => {
	const projects = useSelector((state) => state.projects.projects);
	const projectsData = useSelector((state) => state.projects);

	const [pickProject, setpickProject] = useState();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchProjects());
	}, []);

	useEffect(() => {
		if (projects && projects.length > 0) {
			// Get the selected project from localStorage, if available
			const selectedProject = JSON.parse(
				localStorage.getItem("selectedProject")
			);
			if (selectedProject) {
				setpickProject(selectedProject);
			} else {
				setpickProject(projectsData.selectProject);
			}
		}
	}, [projects]);

	const chooseProject = (id) => {
		const choosenProject = projects.filter((project) => {
			return project.id == id;
		});
		setpickProject(choosenProject[0]);
		dispatch(setSelectedProject(choosenProject[0]));
		localStorage.setItem(
			"selectedProject",
			JSON.stringify(choosenProject[0])
		);
	};

	return (
		<div>
			{pickProject && (
				<div className="mb-24">
					<h1 className="text-3xl">{pickProject.name}</h1>
					<p>Created: {pickProject.created}</p>
					<p>Team size: {pickProject.teamSize}</p>
					<p>Location: {pickProject.location.city}</p>
				</div>
			)}
			<ListOfProjects projects={projects} chooseProject={chooseProject} />
			<Header />
			<GetDataFromSelectedProject />
		</div>
	);
};

export default PracticeToFetchAndAddTodos;
