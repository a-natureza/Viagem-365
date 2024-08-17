import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MapaLocais from "../../components/MapaLocais";
import "./Locais.css";

function Locais() {
	const [locations, setLocations] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchLocations = async () => {
			try {
				const response = await axios.get("http://localhost:3000/locations");
				setLocations(response.data);
			} catch (error) {
				console.error("Erro ao buscar locais:", error);
			}
		};
		fetchLocations();
	}, []);

	const handleEdit = (id) => {
		navigate(`/cadastro-local/${id}`);
	};

	const handleDelete = async (id) => {
		try {
			await axios.delete(`http://localhost:3000/locations/${id}`);
			setLocations(locations.filter((location) => location.id !== id));
			alert("Local deletado com sucesso!");
		} catch (error) {
			console.error("Erro ao deletar local:", error);
		}
	};

	return (
		<div className="locais-container">
			<h1>Locais de Viagem</h1>
			<ul className="locais-list">
				{locations.map((location) => (
					<li key={location.id} className="locais-item">
						<h3>{location.nome}</h3>

						<MapaLocais
							latitude={location.latitude}
							longitude={location.longitude}
						/>
						<p>Descrição: {location.descricao}</p>
						<p>Cidade: {location.cidade}</p>
						<p>Estado: {location.estado}</p>
						<p>Viajante: {location.usuario.nome}</p>
						<div className="locais-actions">
							<button type="button" onClick={() => handleEdit(location.id)}>
								Editar
							</button>
							<button type="button" onClick={() => handleDelete(location.id)}>
								Deletar
							</button>
							<button type="button" onClick={() => navigate(-1)}>
								Dashboard
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}

export default Locais;
