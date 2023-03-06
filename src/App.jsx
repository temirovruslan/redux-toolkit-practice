import { useEffect, useState } from "react";
import "./App.css";
import clsx from "clsx";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { useDispatch } from "react-redux";
import { addTodo, removeTodo } from "./store/todoSlice";
import { Routes, Route } from "react-router-dom";
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

	const [lists, setLists] = useState([]);
	const [text2, setText2] = useState("");
	console.log(lists);

	const addText = () => {
		if (text2.trim().length) {
			setLists([
				...lists,
				{
					id: new Date().toISOString(),
					completed: false,
					text2: text2,
				},
			]);
			setText2("");
		}
	};

	const deleteList = (listId) => {
		setLists(lists.filter((list) => list.id !== listId));
	};

	const toggle = (listId) => {
		setLists(
			lists.map((list) => {
				if (list.id !== listId) return list;

				return { ...list, completed: !list.completed };
			})
		);
	};

	return (
		<div className="App">
			{/* <div className="flex flex-col  w-64">
				<InputField
					text={text}
					handleInput={setText}
					handleSubmit={addTask}
				/>

				<TodoList />
			</div> */}

			<div className="w-[500px] h-[500px] border bg-slate-200">
				<label className="flex flex-col items-center">
					<input
						onChange={(e) => setText2(e.target.value)}
						type="text"
						value={text2}
						className="w-3/5"
					/>
					<button
						onClick={addText}
						className="border bg-slate-500 px-2 py-2 rounded-md hover:bg-orange-500"
					>
						Submit
					</button>
				</label>
				<ul>
					{lists.map((list) => {
						return (
							<li key={list.id}>
								<input
									onChange={() => toggle(list.id)}
									type="checkbox"
									checked={list.completed}
								/>
								<span>{list.text2}</span>
								<span
									className="cursor-pointer"
									onClick={() => deleteList(list.id)}
								>
									&times;
								</span>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}

export default App;
