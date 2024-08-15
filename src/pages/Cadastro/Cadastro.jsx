import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Cadastro.css";

const Cadastro = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [users, setUsers] = useState([]);
	const [cepData, setCepData] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const loadUsers = async () => {
			try {
				const response = await axios.get("http://localhost:3000/users");
				setUsers(response.data);
			} catch (error) {
				console.error("Erro ao carregar usuários:", error);
			}
		};
		loadUsers();
	}, []);

	const formatCPF = (cpf) => {
		return cpf.replace(/[^\d]/g, "");
	};

	const checkUniqueFields = (cpf, email) => {
		const formattedCpf = formatCPF(cpf);
		const cpfExists = users.some((user) => user.cpf === formattedCpf);
		const emailExists = users.some((user) => user.email === email);

		if (cpfExists) {
			alert("CPF já cadastrado.");
			return false;
		}
		if (emailExists) {
			alert("E-mail já cadastrado.");
			return false;
		}

		return true;
	};

	const onSubmit = async (data) => {
		if (!checkUniqueFields(data.cpf, data.email)) {
			alert("CPF ou e-mail já cadastrados.");
			return;
		}

		if (data.senha !== data.confirmarSenha) {
			alert("As senhas não coincidem.");
			return;
		}

		try {
			const response = await axios.post("http://localhost:3000/users", data, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.status === 201) {
				alert("Usuário cadastrado com sucesso!");
				navigate("/login");
			} else {
				alert("Erro ao cadastrar usuário:", response.statusText);
			}
		} catch (error) {
			console.error("Erro ao cadastrar usuário:", error);
		}
	};

	const formatCEP = (cep) => {
		return cep.replace(/\D/g, "");
	};

	const handleCepChange = async (e) => {
		const cep = formatCEP(e.target.value);
		if (cep.length === 8) {
			try {
				const response = await axios.get(
					`https://viacep.com.br/ws/${cep}/json/`,
				);
				setCepData(response.data);
			} catch (error) {
				console.error("Erro ao buscar CEP:", error);
			}
		} else {
			setCepData(null);
		}
	};

	return (
		<Container className="cadastro-container">
			<div className="img">
				<img src="./lab365.png" width="100%" alt="lab365" className="lab" />
				<img src="./trip.jpg" width="100%" alt="trip" className="trip" />
			</div>
			<h1>INSCREVA-SE AGORA</h1>
			<form onSubmit={handleSubmit(onSubmit)} className="cadastro-form">
				<div className="form-group">
					<label htmlFor="nome">Nome: </label>
					<input
						{...register("nome", { required: true })}
						type="text"
						className="form-control"
						id="nome"
						placeholder="Digite seu nome"
					/>
					{errors.nome && <p>Nome é obrigatório.</p>}
				</div>
				<div className="form-row">
					<div className="form-group">
						<label htmlFor="sexo">Sexo: </label>
						<select
							{...register("sexo", { required: true })}
							className="form-control"
							id="sexo"
						>
							<option value="">Selecione</option>
							<option value="Feminino">Feminino</option>
							<option value="Masculino">Masculino</option>
							<option value="Outro">Outro</option>
						</select>
						{errors.sexo && <p>Sexo é obrigatório.</p>}
					</div>
					<div className="form-group">
						<label htmlFor="dataNascimento">Data de Nascimento: </label>
						<input
							{...register("dataNascimento", { required: true })}
							type="date"
							className="form-control"
							id="dataNascimento"
						/>
						{errors.dataNascimento && <p>Data de Nascimento é obrigatória.</p>}
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="cpf">CPF: </label>
					<input
						{...register("cpf", {
							required: true,
							validate: (value) => formatCPF(value).length === 11,
						})}
						type="text"
						className="form-control"
						id="cpf"
						placeholder="Digite seu CPF"
					/>
					{errors.cpf && <p>CPF é obrigatório e deve conter 11 dígitos.</p>}
				</div>
				<div className="form-group">
					<label htmlFor="email">E-mail: </label>
					<input
						{...register("email", {
							required: true,
							pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
						})}
						type="email"
						className="form-control"
						id="email"
						placeholder="Digite seu e-mail"
					/>
					{errors.email && <p>E-mail é obrigatório e deve ser válido.</p>}
				</div>
				<div className="form-group">
					<label htmlFor="senha">Senha: </label>
					<input
						{...register("senha", { required: true, minLength: 6 })}
						type="password"
						className="form-control"
						id="senha"
						placeholder="Digite sua senha"
					/>
					{errors.senha && (
						<p>Senha é obrigatória e deve conter pelo menos 6 caracteres.</p>
					)}
				</div>
				<div className="form-group">
					<label htmlFor="confirmarSenha">Confirmar Senha: </label>
					<input
						{...register("confirmarSenha", { required: true, minLength: 6 })}
						type="password"
						className="form-control"
						id="confirmarSenha"
						placeholder="Confirme sua senha"
					/>
					{errors.confirmarSenha && (
						<p>
							Confirmação de senha é obrigatória e deve coincidir com a senha.
						</p>
					)}
				</div>
				<div className="form-group">
					<label htmlFor="cep">CEP: </label>
					<input
						{...register("cep", {
							required: "O CEP é obrigatório e deve conter apenas números",
							validate: (value) => {
								const formattedCep = formatCEP(value);
								return formattedCep.length === 8 || "CEP deve conter 8 dígitos";
							},
						})}
						type="text"
						className="form-control"
						id="cep"
						placeholder="Digite seu CEP"
						onChange={handleCepChange}
					/>
					{errors.cep && <p>{errors.cep.message}</p>}
				</div>
				{cepData && (
					<>
						<div className="form-group">
							<label htmlFor="logradouro">Logradouro: </label>
							<input
								{...register("logradouro")}
								type="text"
								className="form-control"
								id="logradouro"
								placeholder="Logradouro"
								value={cepData.logradouro || ""}
								readOnly
							/>
						</div>
						<div className="form-group">
							<label htmlFor="numero">Número: </label>
							<input
								{...register("numero", { required: true })}
								type="text"
								className="form-control"
								id="numero"
								placeholder="Número"
							/>
							{errors.numero && <p>Número é obrigatório.</p>}
						</div>
						<div className="form-group">
							<label htmlFor="bairro">Bairro: </label>
							<input
								{...register("bairro")}
								type="text"
								className="form-control"
								id="bairro"
								placeholder="Bairro"
								value={cepData.bairro || ""}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="cidade">Cidade: </label>
							<input
								{...register("cidade")}
								type="text"
								className="form-control"
								id="cidade"
								placeholder="Cidade"
								value={cepData.localidade || ""}
								readOnly
							/>
						</div>
						<div className="form-group">
							<label htmlFor="estado">Estado: </label>
							<input
								{...register("estado")}
								type="text"
								className="form-control"
								id="estado"
								placeholder="Estado"
								value={cepData.uf || ""}
								readOnly
							/>
						</div>
					</>
				)}
				<div className="form-group">
					<button type="submit" className="btn btn-primary">
						Cadastrar
					</button>
				</div>
			</form>
		</Container>
	);
};

export default Cadastro;
