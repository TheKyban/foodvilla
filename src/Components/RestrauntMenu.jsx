import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/restrauntMenu.css";
import mImg from "../styles/stressSurge.png";
import timeImg from "../styles/time.webp";
import priceImg from "../styles/price.webp";
import listImg from "../styles/list.webp";
import { cloudinary_Url_2 } from "../Constant.js";
import downArrow from "../styles/down-arrow.svg";
import Shimmer from "./Shimmer";

const RestrauntMenu = () => {
	const { id } = useParams();
	const [coordinates, setCoordinates] = useState({
		lat: "25.5940947",
		lng: "85.1375645",
	});

	const [data, setData] = useState(null);
	const [list, setList] = useState(null);
	const [isLoading, setLoading] = useState(false);

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

const LocationAndSearch = ({ location, name }) => {
	return (
		<div className="LocationAndSearch">
			<div className="location">
				<Link to={"/"}>Home / </Link>
				<span id="location">{location} / </span>
				<span>{name}</span>
			</div>

			<button>Search</button>
		</div>
	);
};

const MenuHeader = ({
	name,
	cousines,
	location,
	avRating,
	Ratings,
	message,
	time,
	price,
}) => {
	return (
		<div className="MenuHeaderWrapper">
			<div className="MenuHeader">
				<div className="Details">
					<h1>{name}</h1>
					<span>{cousines}</span>
					<span>{location}</span>
				</div>

				<div className="rating">
					<span>⭐ {avRating}</span>
					<hr />
					<span>{Ratings}</span>
				</div>
			</div>
			{message && (
				<div className="message">
					<img src={mImg} />
					<p>{message}</p>
				</div>
			)}

			<hr />

			<div className="TimeAndPrice">
				<span>
					<img src={timeImg} /> {time}
				</span>
				<span>
					<img src={priceImg} />
					{price}
				</span>
			</div>

			<hr />
		</div>
	);
};

const Item = ({ title, itemCards }) => {
	const [showList, setShowList] = useState(false);
	return (
		<div className="MenuItem">
			<div
				className="MenuItemHeader"
				onClick={() => setShowList(!showList)}
			>
				<h1>{title}</h1>
				<img src={downArrow} />
			</div>

			{showList ? (
				<>
					{itemCards &&
						itemCards.map((list) => {
							const data = list.card.info;

							return (
								data && (
									<MenuList
										key={data.id}
										name={data?.name}
										imageId={data?.imageId}
										price={data?.price}
										description={data?.description}
									/>
								)
							);
						})}
				</>
			) : (
				<span className="blank"></span>
			)}
		</div>
	);
};

const MenuList = ({ name, price, description, imageId }) => {
	return (
		<div className="listWrapper">
			<div className="left">
				<img src={listImg} />
				<span>{name}</span>
				<span>₹ {price / 100}</span>
				{description && <span>{description}</span>}
			</div>

			<div className="right">
				{imageId && (
					<img src={`${cloudinary_Url_2}/${imageId}`} alt=" " />
				)}
				<button
					style={{
						position: `${!imageId ? "relative" : ""}`,
						marginRight: `${!imageId ? "50px" : ""}`,
					}}
				>
					ADD
				</button>
			</div>
		</div>
	);
};
