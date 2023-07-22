import Restraunt from "./Restraunt";
import { useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import searchImg from "../assets/search.svg";
import useData from "../hooks/useData";
import useSearch from "../hooks/useSearch";

const Body = () => {
	const [query, setQuery] = useState("");
	const [seeAllRestaurants, filteredRestraunts, setFilteredRestraunts] =
		useData();

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
						useSearch(
							seeAllRestaurants,
							query,
							setFilteredRestraunts,
						)
					}
				>
					<img src={searchImg} />
				</button>
			</div>
			<div className="allrestraunts">
				{filteredRestraunts
					? filteredRestraunts?.map((restraunt) => {
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
