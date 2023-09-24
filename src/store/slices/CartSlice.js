import { createSlice } from "@reduxjs/toolkit";
const CartSlice = createSlice({
    name: "cart",
    initialState: {
        carts: [],
        totalPrice:0
    },
    reducers: {
        addItem: (state, actions) => {
            const { id, name, price, imageId } = actions.payload;
            // check in the cart that the item is Already
            let isExist = false;
            state.carts.map((cart, idx) => {
                if (cart.id === id) {
                    isExist = true;
                    state.carts[idx].quantity = state.carts[idx].quantity + 1;
                    state.carts[idx].price =
                        state.carts[idx].initialPrice *
                        state.carts[idx].quantity;
                }
            });
            if (!isExist) {
                state.carts.push({
                    id,
                    name,
                    imageId,
                    price,
                    initialPrice: price,
                    quantity: 1,
                });
            }
        },
        IncreaseItem: (state, actions) => {
            const { id } = actions.payload;
            state.carts.map((cart, idx) => {
                if (cart.id === id.id) {
                    state.carts[idx].quantity = state.carts[idx].quantity + 1;
                    state.carts[idx].price =
                        state.carts[idx].initialPrice *
                        state.carts[idx].quantity;
                }
            });
        },
        DecreaseItem: (state, actions) => {
            const { id } = actions.payload;
            state.carts.map((cart, idx) => {
                if (cart.id === id.id && cart.quantity > 1) {
                    state.carts[idx].quantity = state.carts[idx].quantity - 1;
                    state.carts[idx].price =
                        state.carts[idx].price - state.carts[idx].initialPrice;
                }
            });
        },
    },
});

export const { addItem, IncreaseItem, DecreaseItem } = CartSlice.actions;
export default CartSlice.reducer;
