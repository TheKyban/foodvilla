async function getData(coordinates) {
	const data = await fetch(
		`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${coordinates.lat}&lng=${coordinates.lng}&page_type=DESKTOP_WEB_LISTING`,
	);
	const json = await data.json();
	return json?.data?.cards[2].data?.data?.cards;
}

export default getData;
