// import "leaflet/dist/leaflet.css";
// import React, { useEffect, useState } from "react";
// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

// function MapaLocal({ localId }) {
// 	const [local, setLocal] = useState(null);

// 	useEffect(() => {
// 		constfetchLocation = async () => {
// 			try {
// 				const response = awaitfetch(
// 					`http://localhost:3000/locations/${localId}`,
// 				);
// 				const data = await response.json();
// 				setLocal(data);
// 			} catch (error) {
// 				console.error("Erro ao buscar o local:", error);
// 			}
// 		};

// 		fetchLocation();
// 	}, [localId]);

// 	if (!local) {
// 		return <p>Carregando mapa...</p>;
// 	}

// 	const centroInicial = [local.latitude, local.longitude];

// 	return (
// 		<MapContainer
// 			center={centroInicial} // Centro inicial domapa
// 			zoom={10}
// 			className="leaflet-container"
// 			style={{ height: "500px", width: "100%" }}
// 		>
// 			<TileLayer
// 				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// 				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// 			/>

// 			{/* Renderiza o marcador para o local específico */}
// 			<Marker position={[local.latitude, local.longitude]}>
// 				<Popup>
// 					<strong>{local.nome}</strong>
// 					<br />
// 					{local.descricao}
// 					<br />
// 					<em>Viajante: {local.usuario}</em>{" "}
// 					{/* Nome do usuário que cadastrou o local */}
// 				</Popup>
// 			</Marker>
// 		</MapContainer>
// 	);
// }
// export default MapaLocal;
