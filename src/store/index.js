import { configureStore } from "@reduxjs/toolkit";

// configureStore(): обертка для createStore(), упрощающая настройку хранилища с настройками по умолчанию. Позволяет автоматически комбинировать отдельные частичные редукторы (slice reducers), добавлять промежуточные слои или посредников (middlewares), по умолчанию включает redux-thunk (преобразователя), позволяет использовать расширение
import todoReducer from "./todoSlice";
//  todoReducer можно назвать как хочешь
import projectsReducer from "./projectsSlice";

export const store = configureStore({
	// Редюсер (reducer) — это чистая функция, которая принимает предыдущее состояние и экшен (state и action) и возвращает следующее состояние (новую версию предыдущего). Функция называется редюсером (reducer) потому, что ее можно передать в Array.
	// в шдавном редюсере могут быть много мелких редюсеров
	reducer: {
		todos: todoReducer,
		projects: projectsReducer,
	
	},
});
