import { cloudinary_Url } from "../Constant";
import "../styles/restraunt.css";
const Restraunt = ({
	cloudinaryImageId,
	name,
	cuisines,
	avgRating,
	slaString,
	costForTwoString,
}) => {
	return (
		<div className="restrauntCard box-border flex flex-col w-180 p-2 border border-transparent rounded hover:border hover:border-slate-300 lg:w-56 mb-3">
			<img
				src={`${cloudinary_Url}/${cloudinaryImageId}`}
				className="rounded object-contain"
			/>
			<h3 className="text-base break-all h-6 overflow-hidden mt-3">{name}</h3>
			<h4 className="text-sm h-5 overflow-hidden mb-2 text-stone-600">{cuisines.join(", ")}</h4>
			<ul className="details flex items-center gap-2 text-10 flex-wrap text-stone-500">
				<li className="list-none">⭐ {avgRating}</li>
				<div className="w-1 h-1 bg-black rounded-full"></div>
				<li className="">{slaString}</li>
				<div className="w-1 h-1 bg-black rounded-full"></div>
				<li className="">{costForTwoString}</li>
			</ul>
		</div>
	);
};

export default Restraunt;
