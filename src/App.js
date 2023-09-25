import Body from "./Components/Body";
import Header from "./Components/Header";
import {
    createBrowserRouter,
    Outlet,
    RouterProvider,
    useLocation,
} from "react-router-dom";
import Footer from "./Components/Footer";
import Cart from "./Pages/Cart";
import Profile from "./Components/Profile";
import RestrauntMenu from "./pages/RestrauntMenu";
import Registration from "./Components/Registration";
import Login from "./Components/Login.js";
import Error from "./Pages/Error";
import Offline from "./Pages/Offline";
import useOnline from "./hooks/useOnline";

const Frame = () => {
    const location = useLocation();
    const online = useOnline();

    return (
        <>
            <Header />
            {online ? <Outlet /> : <Offline />}
            {location.pathname === "/cart" ? "" : <Footer />}
        </>
    );
};
const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Frame />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Body />,
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
