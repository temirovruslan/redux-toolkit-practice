import { useSelector } from "react-redux";

const GetDataFromSelectedProject = () => {
	const selectedProject = useSelector(
		(state) => state.projects.selectProject
	);
	// console.log("MyComponent ~ selectedProject >", selectedProject);

	return (
		<div className="mb-24">
			{selectedProject && (
				<div>
					<h1 className="text-3xl">{selectedProject.name}</h1>
					<p>Created: {selectedProject.created}</p>
					<p>Team size: {selectedProject.teamSize}</p>
					<p>Location: {selectedProject.location.city}</p>
				</div>
			)}
		</div>
	);
};
export default GetDataFromSelectedProject;
