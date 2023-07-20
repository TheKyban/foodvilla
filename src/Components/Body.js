import Restraunt from "./Restraunt";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import searchImg from "../styles/search.svg";

const searchFilter = (allrestraunts, query, setAllRestraunts) => {
	const filtered = allrestraunts.filter((restraunt) => {
		return restraunt.data.name.toLowerCase().includes(query.toLowerCase());
	});

	setAllRestraunts(filtered);
};

const Body = () => {
	const [query, setQuery] = useState("");
	const [seeAllRestaurants, setSeeAllRestaurants] = useState([]);
	const [filteredRestraunt, setFilteredRestraunt] = useState(); // filtered
	const [coordinates, setCoordinates] = useState({
		lat: "25.5940947",
		lng: "85.1375645",
	});

	const onFilter = (e) => {
		setQuery(e.target.value);
		searchFilter(seeAllRestaurants, query, setFilteredRestraunt);
	};

	/**
	 *                GETTING COORDINATES
	 * ---------------------------------------------------
	 */

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

	/**
	 *                FETCHING API
	 * ---------------------------------------------------
	 */
	useEffect(() => {
		(async () => {
			const restaurants = await getRestraunts();
			setSeeAllRestaurants(restaurants);
			setFilteredRestraunt(restaurants);
		})();
	}, []);

	/**
	 *                FUNCTION FOR API CALL
	 * ---------------------------------------------------
	 */

	async function getRestraunts() {
		const data = await fetch(
			`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${coordinates.lat}&lng=${coordinates.lng}&page_type=DESKTOP_WEB_LISTING`,
		);
		const json = await data.json();
		return json?.data?.cards[2].data?.data?.cards;
	}

	return (
		<div className="body">
			<div className="search">
				<input
					placeholder="Search Restraunts"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<button
					onClick={() =>
						searchFilter(
							seeAllRestaurants,
							query,
							setFilteredRestraunt,
						)
					}
				>
					<img src={searchImg} />
				</button>
			</div>
			<div className="allrestraunts">
				{filteredRestraunt
					? filteredRestraunt?.map((restraunt) => {
							return (
								<Link
									to={`/restraunt/${restraunt.data.id}`}
									key={restraunt.data.uuid}
								>
									<Restraunt {...restraunt.data} />
								</Link>
							);
					  })
					: Array(15)
							.fill("")
							.map((s, i) => <Shimmer key={i} />)}
			</div>
		</div>
	);
};

export default Body;
