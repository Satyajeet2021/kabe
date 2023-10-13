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

export const addToCartAction = ({ totalPrice, shippingDetails, item, totalQuantity }) => (dispatch) => {
    try {        
        dispatch({ type: ADD_TO_CART_REQUEST });        
        console.log("addToCartAction", { totalPrice, shippingDetails, item, totalQuantity });
        dispatch({
            type: ADD_TO_CART_SUCCESS,
            payload: { totalPrice, shippingDetails, item, totalQuantity }
        });
    } catch (error) {
        dispatch({
            type: ADD_TO_CART_FAIL,
            payload: error
        });
    }
}

export const getUserCart = () => (dispatch) => {
    try {        
        dispatch({ type: GET_USER_CART_REQUEST });        
        console.log("gettingUserCartAction");
        dispatch({
            type: GET_USER_CART_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: GET_USER_CART_FAIL,
            payload: error
        });
    }
}

export const removeItemFromCart = (id) => (dispatch) => {
    try {        
        dispatch({ type: REMOVE_FROM_CART_REQUEST });        
        console.log("removeItemFromCartAction");
        dispatch({
            type: REMOVE_FROM_CART_SUCCESS,
            payload: { id }
        });
    } catch (error) {
        dispatch({
            type: REMOVE_FROM_CART_FAIL,
            payload: error
        });
    }
}