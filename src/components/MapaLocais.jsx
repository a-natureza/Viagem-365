import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

function MapaLocais() {
	const [locais, setLocais] = useState([]);

	useEffect(() => {
		const fetchLocations = async () => {
			try {
				const response = await fetch("http://localhost:3000/locations");
				const data = await response.json();
				setLocais(data);
			} catch (error) {
				console.error("Erro ao buscar locais:", error);
			}
		};

		fetchLocations();
	}, []);

	const centroInicial =
		locais.length > 0
			? [locais[0].latitude, locais[0].longitude]
			: [-27.595377, -48.54805];

	return (
		<MapContainer
			center={centroInicial} // Centro inicial do mapa
			zoom={10}
			className="leaflet-container"
			style={{ height: "500px", width: "100%" }}
		>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			/>

			{/* Iteração sobre todos os locais para renderizar marcadores */}
			{locais.map((location) => (
				<Marker
					key={location.id}
					position={[location.latitude, location.longitude]}
				>
					<Popup>
						<strong>{location.nome}</strong>
						<br />
						{location.descricao}
					</Popup>
				</Marker>
			))}
		</MapContainer>
	);
}

export default MapaLocais;
