import getData from "./getData";
import useCoordinates from "./useCoordinates";
import { useState, useEffect } from "react";

const useData = () => {
	const [seeAllRestaurants, setSeeAllRestaurants] = useState([]);
	const [filteredRestraunts, setFilteredRestraunts] = useState([]); // filtered
	const coordinates = useCoordinates();

	useEffect(() => {
		(async () => {
			const restaurants = await getData(coordinates);
			setSeeAllRestaurants(restaurants);
			setFilteredRestraunts(restaurants);
		})();
	}, []);

	return [seeAllRestaurants, filteredRestraunts, setFilteredRestraunts];
};

export default useData;
