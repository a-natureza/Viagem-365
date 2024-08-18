import React from "react";
import { Route, Routes } from "react-router-dom";
import Cadastro from "../pages/Cadastro/Cadastro";
import CadastroLocal from "../pages/CadastroLocal/CadastroLocal";
import Locais from "../pages/Locais/Locais";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/dashboard/Dashboard";

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/" element={<Login />} />
			<Route path="/cadastro" element={<Cadastro />} />
			<Route path="/dashboard" element={<Dashboard />} />
			<Route path="/cadastro-local" element={<CadastroLocal />} />
			<Route path="/locais" element={<Locais />} />
			<Route path="/cadastro-local/:id" element={<CadastroLocal />} />
			<Route path="/locais/:id" element={<CadastroLocal />} />
		</Routes>
	);
};

export default AppRoutes;
