import { useEffect, useState } from "react";
import "./App.css";
import clsx from "clsx";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { useDispatch } from "react-redux";
import { addTodo, removeTodo } from "./store/todoSlice";

function App() {
	const [text, setText] = useState("");

	// dispatch создает одну функцию которая зрабатывает после какогото события
	const dispatch = useDispatch();

	const addTask = () => {
		dispatch(addTodo({ text }));
		setText("");
	};

	// const toggleHandleComplited = (todoId) => {
		// setTodos(
		// 	todos.map((todo) => {
		//find coming id in the list
		// 		if (todo.id !== todoId) return todo;
		//if we found id i  return ... todo and change value of todo.comlited
		// 		return { ...todo, completed: !todo.completed };
		// 	})
		// );
	// };

	// const deleteTodos = (todoId) => {
		// получаем todoId
		//  в setTodos оставляем только те котоый id не равен todoId
		// setTodos(todos.filter((todo) => todo.id !== todoId));
	// };

	return (
		<div className="App">
			<div className="flex flex-col  w-64">
				<InputField
					text={text}
					handleInput={setText}
					handleSubmit={addTask}
				/>

				<TodoList />
			</div>
		</div>
	);
}

export default App;
