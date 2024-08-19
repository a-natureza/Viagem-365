import React from "react";
import { Route, Routes } from "react-router-dom";
import Cadastro from "../pages/Cadastro/Cadastro";
import CadastroLocal from "../pages/CadastroLocal/CadastroLocal";
import Locais from "../pages/Locais/Locais";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/" element={<Login />} />
			<Route path="/cadastro" element={<Cadastro />} />
			<Route
				path="/dashboard"
				element={
					<ProtectedRoute>
						<Dashboard />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/cadastro-local"
				element={
					<ProtectedRoute>
						<CadastroLocal />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/locais"
				element={
					<ProtectedRoute>
						<Locais />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/cadastro-local/:id"
				element={
					<ProtectedRoute>
						<CadastroLocal />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/locais/:id"
				element={
					<ProtectedRoute>
						<CadastroLocal />
					</ProtectedRoute>
				}
			/>
		</Routes>
	);
};

export default AppRoutes;
