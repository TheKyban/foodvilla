import { useEffect, useState } from "react";

const useCoordinates = () => {
	const [coordinates, setCoordinates] = useState({
		lat: "25.5940947",
		lng: "85.1375645",
	});

	useEffect(() => {
		const options = {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0,
		};

		function success(pos) {
			setCoordinates({
				lat: pos.coords.latitude,
				lng: pos.coords.longitude,
			});
		}

		function error(err) {
			console.warn(`ERROR(${err.code}): ${err.message}`);
		}

		navigator.geolocation.getCurrentPosition(success, error, options);
	}, []);

	return coordinates;
};

export default useCoordinates;
