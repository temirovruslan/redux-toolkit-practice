

const ListOfProjects = ({ projects, chooseProject }) => {
   
	return (
		<ul>
			{projects.map((project, id) => {
				return (
					<li
						className="cursor-pointer mb-3 hover:text-xl"
						key={id}
						onClick={() => chooseProject(project.id)}
					>
						{project.name}
					</li>
				);
			})}
		</ul>
	);
};

export default ListOfProjects;
