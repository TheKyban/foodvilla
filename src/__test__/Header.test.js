import { render } from "@testing-library/react";
import Header from "../Components/Header";
import { StaticRouter } from "react-router-dom/server";
import { Provider } from "react-redux";
import Store from "../store/store";

// Unit testing

test("Logo should load on rendering header", () => {
    // load header
    const header = render(
        <StaticRouter>
            <Provider store={Store}>
                <Header />
            </Provider>
        </StaticRouter>
    );

    // check if logo is loaded
    const logo = header.getByTestId("logo");
    expect(logo.src).toBe("http://localhost/dummy.png");
});

test("cart should be zero", () => {
    //load header
    const header = render(
        <StaticRouter>
            <Provider store={Store}>
                <Header />
            </Provider>
        </StaticRouter>
    );

    // check cart

    const cart = header.getByTestId("cart");
    expect(cart.textContent).toBe("0");
});
