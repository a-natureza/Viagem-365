import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import "./CadastroLocal.css";

function CadastroLocal() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { register, reset } = useForm();

	// States to hold the form data
	const [nome, setNome] = useState("");
	const [descricao, setDescricao] = useState("");
	const [cep, setCep] = useState("");
	const [logradouro, setLogradouro] = useState("");
	const [numero, setNumero] = useState("");
	const [complemento, setComplemento] = useState("");
	const [bairro, setBairro] = useState("");
	const [cidade, setCidade] = useState("");
	const [estado, setEstado] = useState("");
	const [latitude, setLatitude] = useState("");
	const [longitude, setLongitude] = useState("");

	// Fetch data if editing an existing location
	useEffect(() => {
		if (id) {
			const fetchLocation = async () => {
				try {
					const response = await axios.get(
						`http://localhost:3000/locations/${id}`,
					);
					const locationData = response.data;
					setNome(locationData.nome);
					setDescricao(locationData.descricao);
					setCep(locationData.cep);
					setLogradouro(locationData.logradouro);
					setNumero(locationData.numero);
					setComplemento(locationData.complemento);
					setBairro(locationData.bairro);
					setCidade(locationData.cidade);
					setEstado(locationData.estado);
					setLatitude(locationData.latitude);
					setLongitude(locationData.longitude);
				} catch (error) {
					console.error("Erro ao buscar local:", error);
				}
			};
			fetchLocation();
		}
	}, [id]);

	const handleCepChange = async (e) => {
		const value = e.target.value;
		setCep(value);
		if (value.length === 8) {
			try {
				const response = await axios.get(
					`https://cep.awesomeapi.com.br/json/${value}`,
				);
				const data = response.data;
				setLogradouro(data.address || "");
				setBairro(data.district || "");
				setCidade(data.city || "");
				setEstado(data.state || "");

				const geocodeResponse = await axios.get(
					`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
						`${data.address}, ${data.city}, ${data.state}, Brazil`,
					)}&format=jsonv2&limit=1`,
				);

				if (geocodeResponse.data.length > 0) {
					const geocodeData = geocodeResponse.data[0];
					setLatitude(geocodeData.lat);
					setLongitude(geocodeData.lon);
				} else {
					console.error(
						"Não foi possível obter coordenadas para o CEP informado.",
					);
				}
			} catch (error) {
				console.error("Erro ao buscar CEP ou coordenadas:", error);
			}
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const user = JSON.parse(localStorage.getItem("usuario"));
			const newLocation = {
				nome,
				descricao,
				cep,
				logradouro,
				numero,
				complemento,
				bairro,
				cidade,
				estado,
				latitude,
				longitude,
				usuario: { nome: user.nome },
			};

			if (id) {
				await axios.put(`http://localhost:3000/locations/${id}`, newLocation);
				alert("Local atualizado com sucesso!");
			} else {
				await axios.post("http://localhost:3000/locations", newLocation);
				alert("Local cadastrado com sucesso!");
			}

			reset();
			navigate("/dashboard");
		} catch (error) {
			console.error("Erro ao cadastrar ou atualizar local:", error);
		}
	};

	return (
		<Container className="cadastro-container">
			<form className="cadastro-form" onSubmit={handleSubmit}>
				<h2>{id ? "Editar Local de Viagem" : "Cadastro de Local de Viagem"}</h2>
				<div className="form-group">
					<label htmlFor="nome">Nome do Local:</label>
					<input
						{...register("nome", { required: true })}
						type="text"
						id="nome"
						value={nome}
						onChange={(e) => setNome(e.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="descricao">Descrição:</label>
					<textarea
						{...register("descricao", { required: true })}
						id="descricao"
						value={descricao}
						onChange={(e) => setDescricao(e.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="cep">CEP:</label>
					<input
						{...register("cep", { required: true })}
						type="text"
						id="cep"
						value={cep}
						onChange={handleCepChange}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="logradouro">Logradouro:</label>
					<input
						{...register("logradouro", { required: true })}
						type="text"
						id="logradouro"
						value={logradouro}
						readOnly
					/>
				</div>
				<div className="form-group">
					<label htmlFor="numero">Número:</label>
					<input
						{...register("numero", { required: true })}
						type="text"
						id="numero"
						value={numero}
						onChange={(e) => setNumero(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="complemento">Complemento:</label>
					<input
						{...register("complemento", { required: false })}
						type="text"
						id="complemento"
						value={complemento}
						onChange={(e) => setComplemento(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="bairro">Bairro:</label>
					<input
						{...register("bairro", { required: true })}
						type="text"
						id="bairro"
						value={bairro}
						readOnly
					/>
				</div>
				<div className="form-group">
					<label htmlFor="cidade">Cidade:</label>
					<input
						{...register("cidade", { required: true })}
						type="text"
						id="cidade"
						value={cidade}
						readOnly
					/>
				</div>
				<div className="form-group">
					<label htmlFor="estado">Estado:</label>
					<input
						{...register("estado", { required: true })}
						type="text"
						id="estado"
						value={estado}
						readOnly
					/>
				</div>
				<div className="form-group">
					<label htmlFor="latitude">Latitude:</label>
					<input
						{...register("latitude", { required: true })}
						type="text"
						id="latitude"
						value={latitude}
						readOnly
					/>
				</div>
				<div className="form-group">
					<label htmlFor="longitude">Longitude:</label>
					<input
						{...register("longitude", { required: true })}
						type="text"
						id="longitude"
						value={longitude}
						readOnly
					/>
				</div>
				<button type="submit">
					{id ? "Atualizar Local" : "Cadastrar Local"}
				</button>
				<button type="button" onClick={() => navigate(-1)}>
					Cancelar
				</button>
			</form>
		</Container>
	);
}

export default CadastroLocal;
