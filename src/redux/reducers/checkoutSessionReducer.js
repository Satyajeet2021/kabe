import { createOrderState, cartCheckoutState } from "../initStates/checkoutSessionState";
import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    CART_CHECKOUT_REQUEST,
    CART_CHECKOUT_SUCCESS,
    CART_CHECKOUT_FAIL
} from "../types/checkoutSesstionTypes"

export const orderReducer = (state = createOrderState, action) => {
    switch (action.type){
        case CREATE_ORDER_REQUEST:
            return { loading: true, order: null };
        case CREATE_ORDER_SUCCESS:
            console.log("dataReducer", action.payload);
            return { loading: false, order: action.payload };
        case CREATE_ORDER_FAIL:
            return { loading: false, order: null, error: action.payload };
    }
    return state;
}

export const checkoutCartReducer = (state = cartCheckoutState, action) => {
    switch (action.type){
        case CART_CHECKOUT_REQUEST:
            return { loading: true, order: null };
        case CART_CHECKOUT_SUCCESS:
            console.log("dataReducer", action.payload);
            return { loading: false, order: action.payload };
        case CART_CHECKOUT_FAIL:
            return { loading: false, order: null, error: action.payload };
    }
    return state;
}