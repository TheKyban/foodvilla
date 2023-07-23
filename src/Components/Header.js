import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import hamburger from "../assets/hamburger.svg";
import { useState } from "react";

const Header = () => {
	const [login] = useState(false);
	return (
		<div className="headerWrapper shadow-md flex items-center justify-center">
			<div className="header flex justify-between items-center py-3 w-mobile sm:w-tablet lg:w-pc pl-2">
				<img id={"logo"} className="w-14 object-contain " src={logo} />
				<ul className="hidden flex-row gap-4 items-center sm:flex">
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
				<img src={hamburger} className="w-6 sm:hidden" />
			</div>
		</div>
	);
};

export default Header;
