import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MapaLocais from "../../components/maps/MapaLocais";
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
		const confirmDelete = window.confirm(
			"Tem certeza que deseja deletar este local?",
		);
		if (confirmDelete) {
			try {
				await axios.delete(`http://localhost:3000/locations/${id}`);
				setLocations(locations.filter((location) => location.id !== id));
				alert("Local deletado com sucesso!");
			} catch (error) {
				console.error("Erro ao deletar local:", error);
				alert(
					"Houve um problema ao deletar o local. Por favor, tente novamente mais tarde.",
				);
			}
		} else {
			alert("Ação cancelada.");
		}
	};

	return (
		<Container className="locais-container">
			<h1>Locais de Viagem</h1>
			<Row>
				{locations.map((location) => (
					<Col key={location.id} md={4} className="mb-4">
						<Card style={{ width: "444px" }} className="locais-item">
							<Card.Body>
								<Card.Title>{location.nome}</Card.Title>
								<MapaLocais locations={[location]} />
								<Card.Text>Descrição: {location.descricao}</Card.Text>
								<Card.Text>Cidade: {location.cidade}</Card.Text>
								<Card.Text>Estado: {location.estado}</Card.Text>
								<Card.Text>Viajante: {location.usuario.nome}</Card.Text>
								<div className="locais-actions">
									<Button variant="primary" onClick={() => navigate(-1)}>
										Dashboard
									</Button>
									<Button
										variant="warning"
										onClick={() => handleEdit(location.id)}
									>
										Editar
									</Button>
									<Button
										variant="danger"
										onClick={() => handleDelete(location.id)}
									>
										Deletar
									</Button>
								</div>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>
		</Container>
	);
}

export default Locais;
