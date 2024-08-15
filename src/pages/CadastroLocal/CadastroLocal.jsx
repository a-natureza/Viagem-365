import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./CadastroLocal.css";

function CadastroLocal() {
	const { register, reset } = useForm();
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
	const [userName, setUserName] = useState("");

	const navigate = useNavigate();

	// UseEffect para pegar o nome do usuário ao carregar o componente
	useEffect(() => {
		// Recupera o usuário do localStorage
		const user = JSON.parse(localStorage.getItem("usuario"));
		if (user?.nome) {
			setUserName(user.nome);
		}
	}, []);

	const handleCepChange = async (e) => {
		const value = e.target.value;
		setCep(value);
		if (value.length === 8) {
			try {
				// Busca dados do CEP
				const response = await axios.get(
					`https://cep.awesomeapi.com.br/json/${value}`,
				);
				const data = response.data;
				setLogradouro(data.address || "");
				setBairro(data.district || "");
				setCidade(data.city || "");
				setEstado(data.state || "");

				// Obter coordenadas geográficas
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
		// Lógica para enviar os dados do formulário
		try {
			// Obter o usuário logado
			const user = JSON.parse(localStorage.getItem("usuario"));
			// Verificar se o usuário está logado
			// if (!user) {
			// 	alert("Você precisa estar logado para cadastrar um local.");
			// 	navigate("/login");
			// 	return;
			// }
			// Criar o objeto do local
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
				usuario: { nome: user.nome }, // Adiciona o nome do usuário ao objeto
			};

			// Enviar os dados para o servidor usando POST para salvar no database.json
			await axios.post("http://localhost:3000/locations", newLocation);

			alert("Local cadastrado com sucesso!");
			// Limpar os campos do formulário
			reset();
			// ... (limpar outros campos) ...
			navigate("/dashboard");
		} catch (error) {
			console.error("Erro ao cadastrar local:", error);
		}
	};

	return (
		<Container className="cadastro-container">
			<form className="cadastro-form" onSubmit={handleSubmit}>
				<h2>Cadastro de Local de Viagem</h2>
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
				<button type="submit">Cadastrar Local</button>
				<button type="button" onClick={() => navigate(-1)}>
					Cancelar
				</button>
			</form>
		</Container>
	);
}

export default CadastroLocal;
