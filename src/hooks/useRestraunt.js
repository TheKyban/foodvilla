import { useEffect, useState } from "react";
import useCoordinates from "./useCoordinates";

const useRestrauntsMenu = (id) => {
	const coordinates = useCoordinates();

	const [data, setData] = useState(null);
	const [list, setList] = useState(null);
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		fetchMenu();
	}, []);

	const fetchMenu = async () => {
		setLoading(true);
		const data = await fetch(
			`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${coordinates.lat}&lng=${coordinates.lng}&restaurantId=${id}&submitAction=ENTER`,
		);

		const json = await data.json();
		setData(json?.data?.cards[0]?.card?.card?.info);

		const lists = json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR
			?.cards
			? json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards
			: json?.data?.cards[3]?.groupedCard?.cardGroupMap?.REGULAR?.cards;

		setList(lists);

		setLoading(false);
	};

	return [data, list, isLoading];
};

export default useRestrauntsMenu;
