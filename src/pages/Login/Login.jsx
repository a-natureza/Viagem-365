import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
	const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch("http://localhost:3000/users");
			const usuarios = await response.json();

			const usuarioEncontrado = usuarios.find(
				(usuario) => usuario.email === email && usuario.senha === senha,
			);

			if (usuarioEncontrado) {
				localStorage.setItem("isAuthenticated", "true");
				localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));
				navigate("/dashboard");
			} else {
				alert("E-mail ou senha incorretos");
			}
		} catch (error) {
			console.error("Erro de autenticação: ", error);
		}
	};

	return (
		<div className="login-container">
			<div className="img-login">
				<img src="./lab365.png" alt="lab365" className="lab" />
				<img src="./trip.jpg" alt="trip" className="trip" />
			</div>
			<div className="login-form">
				<h1>VIAGEM 365°</h1>
				<Form onSubmit={handleSubmit}>
					<Form.Group className="mb-3">
						<Form.Label>Email</Form.Label>
						<Form.Control
							type="email"
							id="email"
							placeholder="Digite seu e-mail"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Senha</Form.Label>
						<Form.Control
							type="password"
							id="password"
							placeholder="Digite a sua senha"
							value={senha}
							onChange={(e) => setSenha(e.target.value)}
						/>
					</Form.Group>
					<div className="button-group">
						<Button type="submit" className="btn btn-primary">
							Entrar
						</Button>
						<Button
							type="button"
							onClick={() => navigate("/cadastro")}
							className="btn btn-secondary"
						>
							Cadastrar
						</Button>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default Login;
