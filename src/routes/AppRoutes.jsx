import React from "react";
import { Route, Routes } from "react-router-dom";
import Cadastro from "../pages/Cadastro/Cadastro";
import CadastroLocal from "../pages/CadastroLocal/CadastroLocal";
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
		</Routes>
	);
};

export default AppRoutes;

// {
// 	"id": "07a3",
// 	"nome": "Costa da Lagoa",
// 	"descricao": "casa",
// 	"cep": "88062370",
// 	"logradouro": "Servidão Caminho Costa da Lagoa",
// 	"numero": "",
// 	"complemento": "",
// 	"bairro": "Lagoa da Conceição",
// 	"cidade": "Florianópolis",
// 	"estado": "SC",
// 	"latitude": "-27.6096258",
// 	"longitude": "-48.4542132"
//   },
//   {
// 	"id": "50bd",
// 	"nome": "Espaço Aviva",
// 	"descricao": "Massagem & Acupuntura",
// 	"cep": "88061701",
// 	"logradouro": "Rodovia Jornalista Manoel de Menezes",
// 	"numero": "1872",
// 	"complemento": "Praia Mole",
// 	"bairro": "Barra da Lagoa",
// 	"cidade": "Florianópolis",
// 	"estado": "SC",
// 	"latitude": "-27.5885926",
// 	"longitude": "-48.4360798"
//   },
//   {
// 	"id": "7c7c",
// 	"nome": "Lagoa do Peri",
// 	"descricao": "Lagoa no sul da ilha",
// 	"cep": "88066000",
// 	"logradouro": "Rodovia Francisco Thomaz dos Santos",
// 	"numero": "3150",
// 	"complemento": "Restaurante Peri",
// 	"bairro": "Morro das Pedras",
// 	"cidade": "Florianópolis",
// 	"estado": "SC",
// 	"latitude": "-27.7517229",
// 	"longitude": "-48.5098145"
//   }
