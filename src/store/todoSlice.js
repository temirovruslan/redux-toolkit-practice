import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get todos
export const fetchTodos = createAsyncThunk(
	"todos/fetchTodos",
	// 1 что ошибку передать в extraReducer нам нужно получить аргументы { rejectWithValue } и потом можно избять ошибку
	// из state.error = action.payload;
	// 2 _, параментр это то что мы передаем через диспатч 	dispatch(fetchTodos(тут)); если ничего нет то делам там _,
	// 3 rejectWithValue в сулч ошиьки дает сообщение
	async function (_, { rejectWithValue }) {
		try {
			const responce = await fetch(
				"https://jsonplaceholder.typicode.com/todos?_limit=10"
			);
			const data = await responce.json();
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

// delete todos
export const deleteTodo = createAsyncThunk(
	"todos/deleteTodo",
	// из второго парам можно получить диспатч и уже с этой страницы слайса вызывать редюсер, поэтому удаляем его с компонента
	// id получаем как данные которые приходят на диспатч
	async function (id, { rejectWithValue, dispatch }) {
		try {
			const responce = await axios.delete(
				`https://jsonplaceholder.typicode.com/todos/${id}`
			);

			if (responce.status !== 200) {
				//  throw new Error   я сам создаю кастомную ошибку
				throw new Error("Cant delete");
			}
			// передаем в дисп редюсер с id
			dispatch(removeTodo({ id }));
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const toggleStatus = createAsyncThunk(
	"todos/toggleToddo",
	async function (id, { rejectWithValue, dispatch, getState }) {
		const todo = getState().todos.todos.find((todo) => todo.id === id);

		try {
			const response = await axios.patch(
				`https://jsonplaceholder.typicode.com/todos/${id}`,
				{
					completed: !todo.completed,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status !== 200) {
				//  throw new Error   я сам создаю кастомную ошибку
				throw new Error("Cant toggle todo");
			}
			dispatch(toggleComplete({ id }));
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const addNewTodo = createAsyncThunk(
	"todos/addNewTodo",
	async function (text, { rejectWithValue, dispatch, getState }) {
		try {
			const todo = {
				title: text,
				userId: 1,
				completed: false,
			};
			const response = await axios.post(
				"https://jsonplaceholder.typicode.com/todos",
				todo,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status !== 201) {
				throw new Error("Can't add task. Server error.");
			}

			dispatch(addTodo(response.data));
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const todoSlice = createSlice({
	// имя
	name: "todos",
	// изначальное состояние
	initialState: {
		todos: [],
		loading: null,
		error: null,
	},
	// перечиляю набор методов функции что мне нужно сделать например addTodo, toggleHandleComplited deleteTodos
	// action это как вызвать событие и передать туда пропсы как я передаю это во функцию например:
	// onClick вызвать функцию addText  в онКлик передаю пропсы onClick={props => addText(props)}
	// и в action там все хранится
	reducers: {
		addTodo(state, action) {
			state.todos.push(
				// action.payload в данном случае приходит обьект который я перебросил dispatch(addTodo(response.data));
				// этот обьект:
				// const todo = {
				// 	title: text,
				// 	userId: 1,
				// 	completed: false,
				// };
				action.payload
				//  new Date().toISOString(),  - добавляет уникальный id
				// id: new Date().toISOString(),
				// id: 1,
				// title: action.payload.text,
				// completed: false,
			);
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
	extraReducers: {
		[fetchTodos.pending](state) {
			state.loading = "loading";
			state.error = null;
		},
		[fetchTodos.fulfilled](state, action) {
			state.loading = "filled";
			state.todos = action.payload;
		},
		[fetchTodos.rejected](state, action) {
			state.status = "rejected";
			state.error = action.payload;
		},
		[deleteTodo.rejected](state, action) {
			state.status = "rejected";
			state.error = action.payload;
		},
		[toggleStatus.rejected](state, action) {
			state.status = "rejected";
			state.error = action.payload;
		},
		[addNewTodo.rejected](state, action) {
			state.status = "rejected";
			state.error = action.payload;
			console.log(state.error);
		},
	},
});

// достаем actions
// деструктурируес методы
export const { addTodo, removeTodo, toggleComplete } = todoSlice.actions;

// достаем некий редусер создает один большой редюсер от наших редюсеров addTodo removeTodo toggleHandleComplited
export default todoSlice.reducer;
