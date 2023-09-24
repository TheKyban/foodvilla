import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import hamburger from "../assets/hamburger.svg";
import cross from "../assets/cross.png";
import { useState } from "react";

const Header = () => {
    const [login] = useState(false);
    const [menu, setMenu] = useState(false);
    return (
        <div className="headerWrapper shadow-md flex items-center justify-center">
            <div className="header flex justify-between items-center py-3 w-mobile sm:w-tablet lg:w-pc pl-2">
                <img id={"logo"} className="w-14 object-contain " src={logo} />
                <ul className="hidden flex-row gap-4 items-center sm:flex">
                    <li>
                        <Link to={"/"}>Home</Link>
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
                <img
                    src={menu ? cross : hamburger}
                    className="w-6 sm:hidden"
                    onClick={() => setMenu(!menu)}
                />
                {menu && (
                    <div className="sm:hidden absolute z-10 top-16 left-0 w-screen flex items-center justify-center">
                        <ul className=" flex flex-col gap-4 items-center rounded w-[95%] justify-center border py-3 bg-white">
                            <li onClick={() => setMenu(false)}>
                                <Link to={"/"}>Home</Link>
                            </li>

                            <li onClick={() => setMenu(false)}>
                                <Link to={"/cart"}>Cart</Link>
                            </li>
                            <li onClick={() => setMenu(false)}>
                                {login ? (
                                    <Link to={"/profile"}>Profile</Link>
                                ) : (
                                    <Link to={"/login"}>Login</Link>
                                )}
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
