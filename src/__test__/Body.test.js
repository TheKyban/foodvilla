import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom/server";
import Store from "../store/store";
import Body from "../Components/Body";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
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

test("restraunt cards should render", async () => {
    // by using act we are telling react to wait for the promise to resolve(means we render first shimmer then restraunt cards)
    const body = await act(async () =>
        render(
            <StaticRouter>
                <Provider store={Store}>
                    <Body />
                </Provider>
            </StaticRouter>
        )
    );
    expect(body.getAllByTestId("restraunt").length).toBe(15);
});

test("on search restraunt length should change", async () => {
    const body = await act(async () =>
        render(
            <StaticRouter>
                <Provider store={Store}>
                    <Body />
                </Provider>
            </StaticRouter>
        )
    );

    await waitFor(() => expect(body.getByTestId("search-div")));

    // searching for sanwara restraunt
    fireEvent.change(body.getByTestId("search-input"), {
        target: { value: "sanwara" },
    });
    fireEvent.click(body.getByTestId("search-btn"));

    // one restraunt should be shown
    expect(body.getAllByTestId("restraunt").length).toBe(1);

    // searching for empty string(all restraunts should be shown again)
    fireEvent.change(body.getByTestId("search-input"), {
        target: { value: "" },
    });
    fireEvent.click(body.getByTestId("search-btn"));

    // all restraunt should be shown
    expect(body.getAllByTestId("restraunt").length).toBe(15);
});
