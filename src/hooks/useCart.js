import {
    IncreaseItem,
    DecreaseItem,
    DeleteItem,
} from "../store/slices/CartSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useCart = () => {
    const carts = useSelector((slice) => slice.cart.carts);
    const [total, setTotal] = useState(0);
    const dispatch = useDispatch();
    const increaseItem = (id) => {
        if (!id) return;
        dispatch(IncreaseItem({ id }));
    };
    const decreaseItem = (id) => {
        if (!id) return;
        dispatch(DecreaseItem({ id }));
    };
    const deleteItem = (id) => {
        if (!id) return;
        dispatch(DeleteItem({ id }));
    };
    useEffect(() => {
        let total = 0;
        carts.map((food) => {
            total += food.price;
        });
        setTotal(total);
    }, [carts]);

    return [carts, increaseItem, decreaseItem, total, deleteItem];
};
export default useCart;
