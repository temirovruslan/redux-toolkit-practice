import { useEffect, useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo, fetchTodos, addNewTodo } from "./store/todoSlice";

function App() {
	const [text, setText] = useState("");
	const { status, error } = useSelector((state) => state.todos);
	// console.log(status, error);
	// dispatch создает одну функцию которая зрабатывает после какогото события
	const dispatch = useDispatch();

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
			<div className="flex flex-col  w-64">
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

export default App;

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
// const addText = () => {
// 	if (text2.trim().length) {
// 		setLists([
// 			...lists,
// 			{
// 				id: new Date().toISOString(),
// 				completed: false,
// 				text2: text2,
// 			},
// 		]);
// 		setText2("");
// 	}
// };

// const deleteList = (listId) => {
// 	setLists(lists.filter((list) => list.id !== listId));
// };

// const toggle = (listId) => {
// 	setLists(
// 		lists.map((list) => {
// 			if (list.id !== listId) return list;

// 			return { ...list, completed: !list.completed };
// 		})
// 	);
// };
