import { cartState } from "redux/initStates/cartState";
import {
    ADD_TO_CART_REQUEST,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAIL,
    GET_USER_CART_REQUEST,
    GET_USER_CART_SUCCESS,
    GET_USER_CART_FAIL,
    REMOVE_FROM_CART_REQUEST,
    REMOVE_FROM_CART_SUCCESS,
    REMOVE_FROM_CART_FAIL
} from "../types/cartTypes";


export const addToCartReducer = (state = cartState, action) => {
    switch (action.type) {
        case ADD_TO_CART_REQUEST:
            let formattedCart = {};
            let cartCurrentState = localStorage.getItem("userCart");
            if (cartCurrentState == null) {
                formattedCart = {
                    items: [],
                    totalPrice: 0,
                    totalQuantity: 0,
                    shippingDetails: {}
                }
                return { loading: true, cart: formattedCart };
            }
            console.log("formatedCartState", JSON.parse(cartCurrentState));
            formattedCart = JSON.parse(cartCurrentState);
            return { loading: true, cart: formattedCart };

        case ADD_TO_CART_SUCCESS:
            console.log("dataReducer", action.payload);
            console.log("state", state);
            let updatedTotalPrice = ((Number(state.cart.totalPrice) + Number(action.payload.totalPrice)).toFixed(2)).toString();
            let updatedTotalQuantity = ((Number(state.cart.totalQuantity) + Number(action.payload.totalQuantity))).toString();
            let updatedItems = state.cart.items.concat(action.payload.item);
            localStorage.setItem("userCart", JSON.stringify({
                items: updatedItems,
                totalPrice: updatedTotalPrice,
                totalQuantity: updatedTotalQuantity,
                shippingDetails: action.payload.shippingDetails
            }))

            return {
                loading: false, cart: {
                    items: updatedItems,
                    totalPrice: updatedTotalPrice,
                    totalQuantity: updatedTotalQuantity,
                    shippingDetails: action.payload.shippingDetails
                }
            };

        case ADD_TO_CART_FAIL:
            return { loading: false, cart: null, error: action.payload };
    }
    return state;
}

export const getUserCartReducer = (state = cartState, action) => {
    switch (action.type) {
        case GET_USER_CART_REQUEST:            
            return { loading: true, cart: null };

        case GET_USER_CART_SUCCESS:
            let formattedCart = {};
            let cartCurrentState = localStorage.getItem("userCart");
            if (cartCurrentState == null) {
                formattedCart = {
                    items: [],
                    totalPrice: 0,
                    totalQuantity: 0,
                    shippingDetails: {}
                }
                localStorage.setItem("userCart", JSON.stringify({ ...formattedCart }))
                return { loading: true, cart: formattedCart };
            }
            console.log("formatedCartState", JSON.parse(cartCurrentState));
            formattedCart = JSON.parse(cartCurrentState);
            return {
                loading: false, cart: { ...formattedCart }
            };

        case GET_USER_CART_FAIL:
            return { loading: false, cart: null, error: action.payload };
    }
    return state;
}

export const removeItemFromCartReducer = (state = cartState, action) => {
    switch (action.type) {
        case REMOVE_FROM_CART_REQUEST:            
        let formattedCart = {};
        let cartCurrentState = localStorage.getItem("userCart");
        if (cartCurrentState == null) {
            formattedCart = {
                items: [],
                totalPrice: 0,
                totalQuantity: 0,
                shippingDetails: {}
            }
            return { loading: true, cart: formattedCart };
        }
        console.log("formatedCartState", JSON.parse(cartCurrentState));
        formattedCart = JSON.parse(cartCurrentState);
        return { loading: true, cart: formattedCart };

        case REMOVE_FROM_CART_SUCCESS:
            console.log("dataReducer", action.payload);
            console.log("state", state);
            const getItem = state.cart.items.find(data => data.id === action.payload.id);
            console.log("getItem", getItem); 
            let updatedTotalPrice = ((Number(state.cart.totalPrice) - Number(getItem.subTotal)).toFixed(2)).toString();
            let updatedTotalQuantity = ((Number(state.cart.totalQuantity) - Number(getItem.quantity))).toString();
            let updatedItems = state.cart.items.filter(data => data.id !== action.payload.id);
            const updatedCart = {                
                items: updatedItems,
                totalPrice: updatedTotalPrice, 
                totalQuantity: updatedTotalQuantity,
                shippingDetails: state.cart.shippingDetails
            }
            localStorage.setItem("userCart", JSON.stringify({ ...updatedCart }))

            return {
                loading: false, cart: { ...updatedCart }
            };

        case REMOVE_FROM_CART_FAIL:
            return { loading: false, cart: null, error: action.payload };
    }
    return state;
}