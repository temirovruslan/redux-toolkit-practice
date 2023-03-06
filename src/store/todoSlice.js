import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
	// имя
	name: "todos",
	// изначальное состояние
	initialState: {
		todos: [],
	},
	// перечиляю набор методов функции что мне нужно сделать например addTodo, toggleHandleComplited deleteTodos
	// action это как вызвать событие и передать туда пропсы как я передаю это во функцию например:
	// onClick вызвать функцию addText  в онКлик передаю пропсы onClick={props => addText(props)}
	// и в action там все хранится
	reducers: {
		addTodo(state, action) {
			state.todos.push({
				//  new Date().toISOString(),  - добавляет уникальный id
				id: new Date().toISOString(),
				text: action.payload.text,
				completed: false,
			});
		},
		removeTodo(state, action) {
			//  в setTodos оставляем только те котоый id не равен todoId
			state.todos = state.todos.filter(
				(todo) => todo.id !== action.payload.id
			);
		},
		toggleComplete(state, action) {
			const toggleTodo = state.todos.find(
				(todo) => todo.id === action.payload.id
			);
			toggleTodo.completed = !toggleTodo.completed;
		},
	},
});

// достаем actions
// деструктурируес методы
export const { addTodo, removeTodo, toggleComplete } = todoSlice.actions;

// достаем некий редусер создает один большой редюсер от наших редюсеров addTodo removeTodo toggleHandleComplited
export default todoSlice.reducer;
