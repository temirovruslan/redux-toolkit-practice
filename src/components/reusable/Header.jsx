import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<div className="mb-12 mt-4 absolute right-24 bottom-5">
			<ul className="block">
				<Link to="/">
					<p className="text-2xl">Home</p>
				</Link>
				<Link to="/users">
					<p className="text-2xl">Users</p>
				</Link>
				<Link to="/project1">
					<p className="text-2xl">Prac 1</p>
				</Link>
			</ul>
		</div>
	);
};

export default Header;
