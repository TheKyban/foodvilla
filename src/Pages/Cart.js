import listImg from "../assets/list.webp";
import { cloudinary_Url_2 } from "../Constant";
import useCart from "../hooks/useCart";
import deleteIcon from "../assets/delete.png";

const Cart = () => {
    const [carts, increaseItem, decreaseItem, total,deleteItem] = useCart();
    return (
        <div
            className={`flex flex-col items-center ${
                carts?.length > 0 ? "justify-start" : "justify-center"
            } h-[calc(100vh-60px)] gap-3 w-screen`}
        >
            {/* Food Cart */}
            {carts?.[0] ? (
                <div
                    className={`flex  flex-col ${
                        carts?.length > 0 ? "justify-start" : "justify-center"
                    } items-center h-[calc(100vh-57px-95px)] overflow-hidden overflow-y-auto`}
                >
                    {carts.map((food) => (
                        <FoodCart
                            food={food}
                            key={food.id}
                            increaseItem={increaseItem}
                            decreaseItem={decreaseItem}
                            deleteItem={deleteItem}
                        />
                    ))}
                </div>
            ) : (
                <h1 className="text-2xl font-bold">No items in cart</h1>
            )}

            {/* Place Order */}
            {carts?.[0] && <PlaceOrderBtn total={total} />}
        </div>
    );
};
const PlaceOrderBtn = ({ total }) => {
    return (
        <div className="total bg-orange-100 rounded max-w-5xl sm:min-w-[600px]  w-mobile h-[88px] flex items-center gap-3 px-4 relative">
            <span className="text-xl">Total:</span>{" "}
            <span className="text-2xl">₹ {total / 100}</span>
            <button className="bg-lime-200 rounded px-4 py-2 text-xl absolute right-3">
                Place Order
            </button>
        </div>
    );
};
const FoodCart = ({ food, decreaseItem, increaseItem,deleteItem }) => {
    return (
        <div className="listWrapper flex items-center justify-center max-w-5xl sm:min-w-[600px]  w-mobile">
            <div className="left">
                <img src={listImg} />
                <span>{food.name}</span>
                <span>₹ {food.price / 100}</span>
            </div>
            <div className="rightWrapper">
                <div className="right">
                    {food.imageId && (
                        <img
                            src={`${cloudinary_Url_2}/${food.imageId}`}
                            alt=" "
                        />
                    )}
                    {/* BUTTONS */}
                    <div className="flex gap-4 items-center justify-center h-fit py-2">
                        <button
                            onClick={() => decreaseItem({ id: food.id })}
                            className="text-2xl font-bold bg-amber-200 w-10 rounded select-none"
                        >
                            -
                        </button>
                        <span>{food.quantity}</span>
                        <button
                            onClick={() => increaseItem({ id: food.id })}
                            className="text-2xl font-bold bg-amber-200 w-10 rounded select-none"
                        >
                            +
                        </button>
                    </div>
                </div>
                    <div>
                        <button onClick={() => deleteItem({id:food.id})} className="bg-lime-200 px-3 py-2 rounded">
                            <img className="w-4" src={deleteIcon} />
                        </button>
                    </div>
            </div>
        </div>
    );
};

export default Cart;
