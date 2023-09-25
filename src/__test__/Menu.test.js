import { fireEvent, render, waitFor, act } from "@testing-library/react";
import { Data } from "../mocks/sanwaraMenu";
import RestrauntMenu from "../Pages/RestrauntMenu";
import { Provider } from "react-redux";
import Store from "../store/store";
import { StaticRouter } from "react-router-dom/server";
import Header from "../Components/Header";

const mockGeoLocation = {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn(),
};

global.navigator.geolocation = mockGeoLocation;

global.fetch = jest.fn(() => {
    return Promise.resolve({
        json: () => Promise.resolve(Data),
    });
});

test("cart should update on adding food", async () => {
    const Menu = await act(() => render(
        <StaticRouter>
            <Provider store={Store}>
                <Header />
                <RestrauntMenu />
            </Provider>
        </StaticRouter>
    ));

    await waitFor(() => expect(Menu.getByTestId("category")));

    //category should have 20
    const category = Menu.getByTestId("category");
    expect(category.children.length).toBe(20);

    // clicking on recommended category
    fireEvent.click(Menu.getAllByTestId("category-box")[0]);

    // add food to cart
    fireEvent.click(Menu.getAllByTestId("food-add-btn")[0]);

    // cart should update
    expect(Menu.getByTestId("cart").innerHTML).toBe("1");
});
