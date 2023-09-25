import "../styles/Shimmer.css"

const Shimmer = () => {
	return (
		<div className="shimmerWrapper" data-testid="simmer">
			<div className="main"></div>
			<div className="paragraphs">
				<div id="first"></div>
				<div id="second"></div>
			</div>
		</div>
	);
};

export default Shimmer;