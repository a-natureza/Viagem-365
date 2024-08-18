import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MapaLocais from "../../components/maps/MapaLocais";
import "./Dashboard.css";

const Dashboard = () => {
	const [locations, setLocations] = useState([]);
	const [activeUsers, setActiveUsers] = useState(0);
	const [registeredLocations, setRegisteredLocations] = useState(0);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const locationResponse = await axios.get(
					"http://localhost:3000/locations",
				);
				setLocations(locationResponse.data);
				setRegisteredLocations(locationResponse.data.length);

				// Buscar apenas usuários ativos
				const activeUsersResponse = await axios.get(
					"http://localhost:3000/users?active=true",
				);
				setActiveUsers(activeUsersResponse.data.length);
			} catch (error) {
				console.error("Erro ao buscar dados:", error);
			}
		};
		fetchData();
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("autenticado");
		navigate("/login");
		alert("Logout realizado com sucesso!");
	};

	return (
		<Container className="dashboard-container">
			<h1>Dashboard: Trips</h1>
			<div className="dashboard-navigation">
				<button type="button" onClick={() => navigate("/locais")}>
					Locais de Viagem
				</button>
				<button type="button" onClick={() => navigate("/cadastro-local")}>
					Cadastrar Novo Local
				</button>
				<button type="button" onClick={handleLogout}>
					Sair
				</button>
			</div>
			<div className="dashboard-cards">
				<div className="card">
					<h3>Usuários Ativos</h3>
					<p>{activeUsers}</p>
				</div>
				<div className="card">
					<h3>Locais Cadastrados</h3>
					<p>{registeredLocations}</p>
				</div>
			</div>
			<div className="locations-list">
				<h2>Mapa de Viagens</h2>
				<MapaLocais locations={locations} />
			</div>
		</Container>
	);
};

export default Dashboard;
