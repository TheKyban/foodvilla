import mImg from "../assets/stressSurge.png";
import timeImg from "../assets/time.webp";
import priceImg from "../assets/price.webp";
import listImg from "../assets/list.webp";
import { cloudinary_Url_2 } from "../Constant.js";
import downArrow from "../assets/down-arrow.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../store/slices/CartSlice";

export const LocationAndSearch = ({ location, name }) => {
    return (
        <div className="LocationAndSearch">
            <div className="location">
                <Link to={"/"}>Home / </Link>
                <span id="location">{location} / </span>
                <span>{name}</span>
            </div>

            <button>Search</button>
        </div>
    );
};

export const MenuHeader = ({
    name,
    cousines,
    location,
    avRating,
    Ratings,
    message,
    time,
    price,
}) => {
    return (
        <div className="MenuHeaderWrapper">
            <div className="MenuHeader">
                <div className="Details">
                    <h1>{name}</h1>
                    <span>{cousines}</span>
                    <span>{location}</span>
                </div>

                <div className="rating">
                    <span>⭐ {avRating}</span>
                    <hr />
                    <span>{Ratings}</span>
                </div>
            </div>
            {message && (
                <div className="message">
                    <img src={mImg} />
                    <p>{message}</p>
                </div>
            )}

            <hr />

            <div className="TimeAndPrice">
                <span>
                    <img src={timeImg} /> {time}
                </span>
                <span>
                    <img src={priceImg} />
                    {price}
                </span>
            </div>

            <hr />
        </div>
    );
};

export const Item = ({ title, itemCards }) => {
    const [showList, setShowList] = useState(false);
    return (
        <div className="MenuItem">
            <div
                data-testid="category-box"
                className="MenuItemHeader"
                onClick={() => setShowList(!showList)}
            >
                <h1>{title}</h1>
                <img src={downArrow} />
            </div>

            {showList ? (
                <>
                    {itemCards &&
                        itemCards.map((list) => {
                            const data = list.card.info;

                            return data && <Food key={data.id} data={data} />;
                        })}
                </>
            ) : (
                <span className="blank"></span>
            )}
        </div>
    );
};

export const Food = ({ data }) => {
    const { name, price, description, imageId } = data;
    const dispatch = useDispatch();
    const AddToCart = () => {
        dispatch(addItem(data));
    };
    return (
        <div className="listWrapper" data-testid="food">
            <div className="left">
                <img src={listImg} />
                <span>{name}</span>
                <span>₹ {price / 100}</span>
            </div>
            <div className="rightWrapper">
                <div className="right">
                    {imageId && (
                        <img src={`${cloudinary_Url_2}/${imageId}`} alt=" " />
                    )}
                    <button data-testid="food-add-btn" onClick={AddToCart}>
                        ADD
                    </button>
                </div>
            </div>

            {description && <span>{description}</span>}
        </div>
    );
};
