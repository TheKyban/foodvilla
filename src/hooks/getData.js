import { restrauntData } from "../Constant";

async function getData(coordinates) {
    const data = await fetch(
        `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${coordinates.lat}&lng=${coordinates.lng}&page_type=DESKTOP_WEB_LISTING`
    );

    // original data
    await data.json();

    // constant data
    const json = restrauntData;
    return json?.data?.cards[2].data?.data?.cards;
}

export default getData;
