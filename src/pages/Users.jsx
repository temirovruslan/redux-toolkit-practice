import axios from "axios";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import toast, { Toaster } from "react-hot-toast";
import Header from "../components/reusable/Header";

const Users = () => {
	const [users, setUsers] = useState({});
	const [userEdit, setUserEdit] = useState({});

	const [modal, setModal] = useState(false);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await axios.get(
					"http://localhost:3500/users/1"
				);
				setUsers({ ...response.data });
			} catch (error) {
				console.log(error);
			}
		};
		fetchPosts();
	}, [userEdit]);

	// The function is triggered when the user changes the value of an input field.
	// e is an event object that contains information about the user's input. e.target refers to the element that triggered the event, in this case the input field.
	const handleInput = (e) => {
		// (prevState) => ({...prevState, [e.target.name]: e.target.value}) is a function that takes the previous state (prevState) as input and returns a new state object with the property specified by e.target.name updated to the new value specified by e.target.value.
		setUserEdit((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.put("http://localhost:3500/users/1", {
				...users,
				...userEdit,
			})
			// let a = { name: "rus", surname: "nerrus" };
			// let b = { surname: "tem" };
			// console.log({ ...a, ...b }); will give  { name: "rus", surname: "tem" };
			// we merge to object into one
			// Any properties that are shared between the two objects will be overwritten by the value in userEdit, since userEdit is spread after users.
			.then((response) => {
				setUsers(response.data);
				setUserEdit({});
				setModal(false);
				toast("The data was successfully updated:)");
			})
			.catch((error) => {
				console.log(error);
				toast("Something get wron:(");
			});
	};
	return (
		<div className="bg-blue-100">
			<Header/>
			<div>
				{users?.name && <p>{users.name}</p>}
				{users?.surname && <p>{users.surname}</p>}
				{users?.position && <p>{users.position}</p>}
				{users?.email && <p>{users.email}</p>}
				{users?.phone && <p>{users.phone}</p>}
				<button
					onClick={() => setModal((e) => !e)}
					className="text-2xl"
				>
					Edit
				</button>
			</div>

			<form
				className={clsx(
					modal
						? " flex flex-col justify-center items-center "
						: "none"
				)}
				onSubmit={handleSubmit}
			>
				{/* In the input fields, value is set to userEdit.name || users.name. This means that if the userEdit object has a value for the name property, it will be used as the input's value. If userEdit.name is undefined (or falsy), the value of users.name will be used instead. */}
				<input
					type="text"
					name="name"
					value={userEdit.name || users.name}
					onChange={handleInput}
				/>
				<input
					type="text"
					name="surname"
					value={userEdit.surname || users.surname}
					onChange={handleInput}
				/>
				<input
					type="text"
					name="position"
					value={userEdit.position || users.position}
					onChange={handleInput}
				/>
				<input
					type="email"
					name="email"
					value={userEdit.email || users.email}
					onChange={handleInput}
				/>
				<input
					type="text"
					name="phone"
					value={userEdit.phone || users.phone}
					onChange={handleInput}
				/>

				<button type="submit">submit</button>
			</form>
			<Toaster />
		</div>
	);
};

export default Users;

// explanation for handleInput fun

// The ...prevState line in the handleInput function is used to create a new object that includes all the properties of the previous state object.

// When you update the state in React, you should always use a function that takes the previous state as input and returns the new state, instead of directly modifying the previous state. This is because React uses the previous state to determine the new state, and if you modify the previous state directly, React may not detect the change and your component may not re-render properly.

// By including ...prevState in the new state object returned by the function, we are creating a copy of the previous state object with all its properties intact, except for the one that we are updating with [e.target.name]: e.target.value. This ensures that we don't lose any data from the previous state that we're not updating.

// If you removed the ...prevState line and the code still works properly, it's likely because the userEdit state only has one property ([e.target.name]: e.target.value) and there are no other properties in the userEdit state to preserve. However, it's still a good practice to include ...prevState in your state updates to ensure that you don't accidentally overwrite any existing data in your state.
