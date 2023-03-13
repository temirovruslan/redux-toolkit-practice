//base
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//slices
import { fetchTodos, addNewTodo } from "../store/todoSlice";

// components
import TodoList from "../components/TodoList";
import InputField from "../components/InputField";

function Todo() {
	const [text, setText] = useState("");
	const { status, error } = useSelector((state) => state.todos);
	const dispatch = useDispatch();
	// dispatch создает одну функцию которая зрабатывает после какогото события
	const addTask = () => {
		if (text.trim().length) {
			dispatch(addNewTodo(text));
			setText("");
		}
	};
	// dispatch(fetchTodos()) это вызовет нашу функцию в todoSlice - fetchTodos
	useEffect(() => {
		dispatch(fetchTodos());
	}, [dispatch]);

	return (
		<div className="App flex">
			<div className="flex flex-col  w-64 bg-zinc-300">
				<h2 className="text-2xl">Add, delete, change text</h2>
				<InputField
					text={text}
					handleInput={setText}
					handleSubmit={addTask}
				/>
				{status === "loading" && <p>loading...</p>}
				{error && <p>{error}</p>}
				<TodoList />
			</div>
		</div>
	);
}

export default Todo;
