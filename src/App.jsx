import "./App.css";
import Todo from "./pages/Todo";
import Users from "./pages/Users";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import PracticeToFetchAndAddTodos from "./pages/practice01/PracticeToFetchAndAddTodos";

function App() {
	return (
		<Router>
			<Routes>
				<Route exact path="/" element={<Todo />} />
				<Route exact path="/users" element={<Users />} />
				<Route
					exact
					path="/project1"
					element={<PracticeToFetchAndAddTodos />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
