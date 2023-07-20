import { Link } from "react-router-dom";
import logo from "../styles/logo.png";
import { useState } from "react";

const Header = () => {
	const [login] = useState(false);
	return (
		<>
			<div className="header">
				<img id={"logo"} src={logo} />
				<ul>
					<li>
						<Link to={"/"}>Home</Link>
					</li>
					<li>
						<Link to={"/about"}>About</Link>
					</li>
					<li>
						<Link to={"/cart"}>Cart</Link>
					</li>
					<li>
						{login ? (
							<Link to={"/profile"}>Profile</Link>
						) : (
							<Link to={"/login"}>Login</Link>
						)}
					</li>
				</ul>
			</div>
		</>
	);
};

export default Header;
