import { createReducer, on } from "@ngrx/store";
import { products } from "../../services/attribute";
import { addToCart, incrementQuantity, decrementQuantity, deleteFromCart, clearCart } from "./cart.actions";

export interface CartState {
    items: products[];
    counter: number;
}

export const initialState: CartState = {
    items: [],
    counter: 0
};

export const cartReducer = createReducer(
    initialState,
    on(addToCart, (state, { product }) => {
        const existingItemIndex = state.items.findIndex(item => item.id === product.id);
        if (existingItemIndex > -1) {
            const updatedItems = state.items.map(item => {
                if (item.id === product.id) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
            return {
                ...state,
                items: updatedItems,
                counter: state.counter + 1
            };
        } else {
            return {
                ...state,
                items: [...state.items, { ...product, quantity: 1 }],
                counter: state.counter + 1
            };
        }
    }),
    on(incrementQuantity, (state, { id }) => {
        const updatedItems = state.items.map(item => {
            if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        return {
            ...state,
            items: updatedItems,
            counter: state.counter + 1
        };
    }),
    on(decrementQuantity, (state, { id }) => {
        const updatedItems = state.items.map(item => {
            if (item.id === id && item.quantity > 0) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        return {
            ...state,
            items: updatedItems,
            counter: state.counter > 0 ? state.counter - 1 : 0
        };
    }),
    on(deleteFromCart, (state, { id }) => ({
        ...state,
        items: state.items.filter(item => item.id !== id),
        counter: state.counter - 1 // Remove item from items array
      })),
      on(clearCart, () => {
        // Return the initial state to clear the cart
        return initialState;
    })
       
);

export function reducer(state: CartState | undefined, action: any) {
    return cartReducer(state, action);
}
