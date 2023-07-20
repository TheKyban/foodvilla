import { cloudinary_Url } from "../Constant";
import '../styles/restraunt.css'
const Restraunt = ({
	cloudinaryImageId,
	name,
	cuisines,
	avgRating,
	slaString,
	costForTwoString,
}) => {
	return (
		<div className="restrauntCard">
			<img src={`${cloudinary_Url}/${cloudinaryImageId}`} />
			<h3>{name}</h3>
			<h4>{cuisines.join(", ")}</h4>
			<ul className="details">
				<li>⭐ {avgRating}</li>
				<li>{slaString}</li>
				<li>{costForTwoString}</li>
			</ul>
		</div>
	);
};

export default Restraunt;
