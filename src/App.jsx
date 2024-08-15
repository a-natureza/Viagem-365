import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
// import Sidebar from "./components/Sidebar/Sidebar";
import AppRoutes from "./routes/AppRoutes";

function App() {
	return (
		<Router>
			{/* <Sidebar /> */}
			<AppRoutes />
		</Router>
	);
}

export default App;
