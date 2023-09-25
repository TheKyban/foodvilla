import { fireEvent, render } from "@testing-library/react";
import Header from "../Components/Header";
import { StaticRouter } from "react-router-dom/server";
import { Provider } from "react-redux";
import Store from "../store/store";
import "@testing-library/jest-dom";

test("Header should render correctly", () => {
    //load header
    const header = render(
        <StaticRouter>
            <Provider store={Store}>
                <Header />
            </Provider>
        </StaticRouter>
    );
    
    expect(header.getByTestId("headerWrapper")).toBeInTheDocument()

    // links should be three
    expect(header.getByTestId("links").children.length).toBe(3);

    // check cart
    expect(header.getByTestId("cart").textContent).toBe("0");


    // clicking hamburger for mobile
    fireEvent.click( header.getByTestId("hamburger"));

    expect(header.getByTestId("mobile-nav").children[0].children.length).toBe(3);

    // check if logo is loaded
    expect(header.getByTestId("logo").src).toBe("http://localhost/dummy.png");

    // clicking hamburger for mobile
    fireEvent.click( header.getByTestId("hamburger"));

    // expect(header.getByTestId("mobile-nav")).not.toBeInTheDocument()
    // console.log(header.getByTestId("hamburger").innerText)
});
