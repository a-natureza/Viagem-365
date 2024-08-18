import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

function MapaLocais({ locations }) {
	if (!locations || locations.length === 0) {
		return <p>Nenhum local encontrado.</p>;
	}

	// Verifica se é uma lista de locais ou um único local
	const isMultiple = Array.isArray(locations);

	// Define o centro do mapa com base nos locais
	const centroInicial = isMultiple
		? [locations[0].latitude, locations[0].longitude]
		: [locations.latitude, locations.longitude];

	return (
		<MapContainer
			center={centroInicial} // Centro inicial do mapa
			zoom={isMultiple ? 11 : 15}
			className="leaflet-container"
			style={{ height: "222px", maxWidth: "100%", width: "100%" }}
		>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			/>
			{locations.map((location) => (
				<Marker
					key={location.id}
					position={[location.latitude, location.longitude]}
				>
					<Popup>
						<strong>{location.nome}</strong>
						<br />
						{location.descricao}
						<br />
						<strong>{location.usuario.nome}</strong>
					</Popup>
				</Marker>
			))}
		</MapContainer>
	);
}

export default MapaLocais;
