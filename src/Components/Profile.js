import React from "react";

// const Profile = () => {
// 	return <h3>This is Profile page</h3>;
// };

class Profile extends React.Component {
	constructor() {
		super();
		this.state = {
			x: 1,
		};

		console.log("This is constructor");
	}

	componentDidUpdate() {
		console.log("component updated");
	}

	componentDidMount() {
		console.log("Component mounted");
	}

	render() {
		return (
			<div>
				<h1>This is Profile of {this.props.name}</h1>
				<h1>{this.state.x}</h1>
				<button
					onClick={() =>
						this.setState({
							x: this.state.x + 1,
						})
					}
				>
					click
				</button>
			</div>
		);
	}
}

export default Profile;
