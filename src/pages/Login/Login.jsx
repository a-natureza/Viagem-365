import axios from "axios";
import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const navigate = useNavigate();
	const [loginError, setLoginError] = useState("");

	const onSubmit = async (data) => {
		try {
			const response = await axios.post(
				"http://localhost:3000/login",
				{
					email: data.email,
					senha: data.senha,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
			if (response.status === 200) {
				navigate("/dashboard");
				console.log(data);
			} else {
				setLoginError("Email ou senha incorretos.");
				navigate("/login");
				console.log(setLoginError);
			}
		} catch (error) {
			console.error("Erro ao tentar fazer login:", error);
			setLoginError("Erro ao tentar fazer login. Tente novamente mais tarde.");
		}
	};

	return (
		<Container className="login-container">
			<div className="img">
				<img src="./lab365.png" width="100%" alt="lab365" className="lab" />
				<img src="./trip.jpg" width="100%" alt="trip" className="trip" />
			</div>
			<div className="login-form">
				<h1>Viagem 365°</h1>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Form.Group className="mb-3">
						<Form.Label>Email</Form.Label>
						<Form.Control
							type="email"
							id="email"
							placeholder="Digite seu e-mail"
							isInvalid={!!errors.email}
							{...register("email", { required: "Email é obrigatório" })}
						/>
						<Form.Control.Feedback type="invalid">
							{errors.email?.message}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Senha</Form.Label>
						<Form.Control
							type="password"
							id="password"
							placeholder="Digite a sua senha"
							isInvalid={!!errors.password}
							{...register("password", { required: "Senha é obrigatória" })}
						/>
						<Form.Control.Feedback type="invalid">
							{errors.password?.message}
						</Form.Control.Feedback>
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
		</Container>
	);
};

export default Login;
