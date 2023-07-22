import Body from "./Components/Body";
import Header from "./Components/Header";
import "./styles/header.css";
import "./styles/body.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Footer from "./Components/Footer";
import About from "./Pages/About.js";
import Cart from "./Pages/Cart";
import Profile from "./Components/Profile";
import RestrauntMenu from "./pages/RestrauntMenu";
import Registration from "./Components/Registration";
import Login from "./Components/Login.js";

const Frame = () => {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
};
const Routes = createBrowserRouter([
	{
		path: "/",
		element: <Frame />,
		children: [
			{
				path: "/",
				element: <Body />,
			},
			{
				path: "/about",
				element: <About />,
			},
			{
				path: "/cart",
				element: <Cart />,
			},
			{
				path: "/profile",
				element: <Profile name={"Aditya"} />,
			},
			{
				path: "/restraunt/:id",
				element: <RestrauntMenu />,
			},
			{
				path: "/signup",
				element: <Registration />,
			},
			{
				path: "/login",
				element: <Login />,
			},
		],
	},
]);
const App = () => {
	return <RouterProvider router={Routes}></RouterProvider>;
};

export default App;
