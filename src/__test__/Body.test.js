import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom/server";
import Store from "../store/store";
import Body from "../Components/Body";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { restrauntData } from "../Constant";
import "@testing-library/jest-dom";

const mockGeoLocation = {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn(),
};

// geolocation
global.navigator.geolocation = mockGeoLocation;

// fetch
global.fetch = jest.fn(() =>
    Promise.resolve({ json: () => Promise.resolve(restrauntData) })
);

test("Simmer should render first", async () => {
    const body = render(
        <StaticRouter>
            <Provider store={Store}>
                <Body />
            </Provider>
        </StaticRouter>
    );
    const simmer = body.getAllByTestId("simmer");
    // expect(simmer).toBeInTheDocument()
    expect(simmer.length).toBe(15);
});

test("restraunt cards should render", async () => {
    const body = render(
        <StaticRouter>
            <Provider store={Store}>
                <Body />
            </Provider>
        </StaticRouter>
    );

    await waitFor(() => expect(body.getByTestId("search-div")));
    const restrauntCards = body.getAllByTestId("restraunt");
    expect(restrauntCards.length).toBe(15);
});

test("on search restraunt length should change", async () => {
    const body = render(
        <StaticRouter>
            <Provider store={Store}>
                <Body />
            </Provider>
        </StaticRouter>
    );

    await waitFor(() => expect(body.getByTestId("search-div")));
    const searchinput = body.getByTestId("search-input");
    const searchbtn = body.getByTestId("search-btn");

    // searching for sanwara restraunt
    fireEvent.change(searchinput, { target: { value: "sanwara" } });
    fireEvent.click(searchbtn);
    
    // one restraunt should be shown
    expect(body.getAllByTestId("restraunt").length).toBe(1);
    
    // searching for empty string(all restraunts should be shown again)
    fireEvent.change(searchinput, { target: { value: "" } });
    fireEvent.click(searchbtn);
    
    // all restraunt should be shown
    expect(body.getAllByTestId("restraunt").length).toBe(15);
});
