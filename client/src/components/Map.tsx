import GoogleMapReact from "google-map-react";
import { providersMarker } from "./providersMarker";
import { EmailForm } from "./EmailForm";
import { useState, useEffect } from "react";

export const Map = () => {
	const [providers, setproviders] = useState([]);
	useEffect(() => {
		fetch("/providers/").then((response) =>
			response.json().then((providers) => {
				setproviders(providers);
			}),
		);
	}, []);

	const [latitude, setLatitude] = useState<number>(40);
	const [longitude, setLongitude] = useState<number>(80); // default: Canada
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((position) => {
			setLatitude(position.coords.latitude);
			setLongitude(position.coords.longitude);
		});
	}
	useEffect(() => {
		fetch(`/providers/?latitude=${latitude}&longitude=${longitude}`).then(
			(response) =>
				response.json().then((providers) => {
					setproviders(providers);
				}),
		);
	}, [latitude, longitude]);

	return (
		<div style={{ height: "100vh", width: "100vw" }}>
			<GoogleMapReact
				bootstrapURLKeys={{
					key: "AIzaSyCJP19pVm0VWvpcNuVOax5gcPeKTr0JvKI",
				}}
				center={{ lat: latitude, lng: longitude }}
				defaultZoom={3}>
				{providers.map(
					(providers: {
						name: string;
						description: string;
						latitude: number;
						longitude: number;
						last_updated: string;
					}) => (
						<providersMarker
							key={providers.name}
							name={providers.name}
							description={providers.description}
							lat={providers.latitude}
							lng={providers.longitude}
							last_updated={
								providers.last_updated
							}></providersMarker>
					),
				)}
			</GoogleMapReact>
			<EmailForm latitude={latitude} longitude={longitude}></EmailForm>
		</div>
	);
};
