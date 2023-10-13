import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    CART_CHECKOUT_REQUEST,
    CART_CHECKOUT_SUCCESS,
    CART_CHECKOUT_FAIL
} from "../types/checkoutSesstionTypes"
import axios from "axios";
import AxiosInstance from "../../helper/AxiosInstance";

export const createOrder = ({ productName, qty, price }) => async (dispatch) => {
    try {
        console.log("createOrder", { productName, qty, price });
        dispatch({ type: CREATE_ORDER_REQUEST });
        const { data } = await AxiosInstance.post(`/api/product-checkout-session`, { productName, quantity: qty, price });
        console.log("dataAction", data);
        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error
        });
    }
}

export const checkoutCart = ({ qty, price }) => async (dispatch) => {
    try {
        console.log("createOrder", { qty, price });
        dispatch({ type: CART_CHECKOUT_REQUEST });
        const { data } = await AxiosInstance.post(`/api/cart-checkout-session`, { quantity: qty, price });
        console.log("dataAction", data);
        dispatch({
            type: CART_CHECKOUT_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: CART_CHECKOUT_FAIL,
            payload: error
        });
    }
}