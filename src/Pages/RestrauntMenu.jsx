import { useParams } from "react-router-dom";
import "../styles/restrauntMenu.css";
import Shimmer from "../Components/Shimmer";
import useRestraunt from "../hooks/useRestraunt";
import {
	Item,
	LocationAndSearch,
	MenuHeader,
} from "../Components/RestrauntMenuComponent";

const RestrauntMenu = () => {
	const { id } = useParams();
	const [data, list, isLoading] = useRestraunt(id);

	return isLoading ? (
		<div className="shimmer">
			{Array(15)
				.fill("")
				.map((s, i) => (
					<Shimmer key={i} />
				))}
		</div>
	) : (
		<div className="MenuWrapper">
			<LocationAndSearch location={data?.city} name={data?.name} />

			<MenuHeader
				name={data?.name}
				cousines={data?.cuisines.join(",")}
				location={
					data?.areaName + ", " + data?.sla?.lastMileTravelString
				}
				avRating={data?.avgRating}
				Ratings={data?.totalRatingsString}
				message={data?.feeDetails?.message}
				time={data?.sla?.slaString}
				price={data?.costForTwoMessage}
			/>

			<div className="itemWrapper">
				{list?.map((card, i) => {
					const data = card?.card?.card;
					{
						return (
							data?.title && (
								<Item
									title={data?.title}
									key={i}
									itemCards={data?.itemCards}
								/>
							)
						);
					}
				})}
			</div>
		</div>
	);
};

export default RestrauntMenu;
