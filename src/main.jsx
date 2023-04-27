// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./index.css";
// import { BrowserRouter, Route, Routes } from "react-router-dom";

// ReactDOM.createRoot(document.getElementById("root")).render(
// 	<React.StrictMode>
// 		<Provider store={store}>
// 			<BrowserRouter>
// 				<Routes>
// 					<Route path="/*" element={<App />} />
// 				</Routes>
// 			</BrowserRouter>
// 			<Provider store={store}>
// 	</React.StrictMode>
// );
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { store } from "./store/index";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
