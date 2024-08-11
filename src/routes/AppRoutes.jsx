import React from "react";
import { Route, Routes } from "react-router-dom";
import Cadastro from "../pages/Cadastro/Cadastro";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/dashboard/Dashboard";

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/" element={<Login />} />
			<Route path="/cadastro" element={<Cadastro />} />
			<Route path="/dashboard" element={<Dashboard />} />
		</Routes>
	);
};

export default AppRoutes;
