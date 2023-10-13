import Footer from "components/Footer";
import NavbarCart from "components/NavbarCart";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getUserCart, removeItemFromCart } from "redux/actions/cartActions";
import { checkoutCart } from "redux/actions/checkoutSessionActions";
import { useStripe, useElements, PaymentRequestButtonElement } from "@stripe/react-stripe-js";

const Cart = () => {
    const stripe = useStripe();
    const dispatch = useDispatch();
    const userCartState = useSelector(state => state.getUserCart);
    const updatedCartState = useSelector(state => state.removedFromCart);
    const checkoutCartSession = useSelector(state => state.cartCheckoutSession);

    useEffect(() => {
        dispatch(getUserCart());
    }, [updatedCartState]);

    console.log("userCartState", userCartState);
    console.log("updatedCartState", updatedCartState);

    const deleteItem = (id) => {
        dispatch(removeItemFromCart(id));
    }

    const renderUserCartItems = userCartState?.cart?.items?.map((data, i) => {
        return (
            <div key={i} >
                <span>Product Name: {data.orderType} </span><br />
                <span>Ouantity: {data.quantity} </span><br />
                <span>Price: {data.price} </span><br />
                <span>Subtotal: {data.subTotal} </span><br />
                <button onClick={() => deleteItem(data.id)} > Remove Item </button><br /> <br />
            </div>
        )
    });

    const cartCheckoutHandler = () => {
        let qty = userCartState?.cart?.totalQuantity;
        let price = Math.ceil(userCartState?.cart?.totalPrice);
        document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
        dispatch(checkoutCart({ qty, price }));
        console.log("checkoutCartSession", checkoutCartSession);
        let sessionId = checkoutCartSession?.order?.session?.id;
        console.log("sessionId", sessionId);
        if (sessionId) {
            stripe.redirectToCheckout({ sessionId });
        }
        document.cookie = `paymentSessionId=${checkoutCartSession?.order?.session?.id};`
        document.cookie = `quantity=${qty};`
        document.cookie = `price="";`
        document.cookie = `totalPrice=${price};`
        document.cookie = `productName=Mix;`
        document.cookie = `name=${userCartState?.cart?.shippingDetails?.fName} ${userCartState?.cart?.shippingDetails?.fName}`
        document.cookie = `email=${userCartState?.cart?.shippingDetails?.eMail}`
        document.cookie = `contactNo=${userCartState?.cart?.shippingDetails?.contactNo}`
        document.cookie = `addLineOne=${userCartState?.cart?.shippingDetails?.addLineOne}`
        document.cookie = `addLineTwo=${userCartState?.cart?.shippingDetails?.addLineTwo}`
        document.cookie = `addCity=${userCartState?.cart?.shippingDetails?.addCity}`
        document.cookie = `addState=${userCartState?.cart?.shippingDetails?.addState}`
        document.cookie = `zipCode=${userCartState?.cart?.shippingDetails?.zipCode}`
        localStorage.removeItem("userCart");
    }

    return (
        <div>
            <NavbarCart />
            {
                userCartState?.cart?.items?.length != 0 ? (
                    <>
                        <div className="order-success-page">
                            <div className="card-success">
                                <h3>Hello {userCartState?.cart?.shippingDetails?.fName + " " + userCartState?.cart?.shippingDetails?.lName + " !"}</h3>
                                <> {renderUserCartItems} </>
                                <div>Shipping Address: <br />
                                    <span> {userCartState?.cart?.shippingDetails?.addLineOne} </span><br />
                                    <span> {userCartState?.cart?.shippingDetails?.addLineTwo} </span><br />
                                    <span>City: {userCartState?.cart?.shippingDetails?.addCity} </span><br />
                                    <span>State: {userCartState?.cart?.shippingDetails?.addState} </span><br />
                                    <span>Zipcode: {userCartState?.cart?.shippingDetails?.zipCode} </span><br />
                                    <span>email: {userCartState?.cart?.shippingDetails?.eMail} </span><br />
                                    <span>Contact no: {userCartState?.cart?.shippingDetails?.contactNo} </span>
                                </div>< br />
                                <div>
                                    <strong><i>Total: {userCartState?.cart?.totalPrice} </i></strong>
                                </div>
                                <div>
                                    <button onClick={cartCheckoutHandler} id="input_13" class="form-submit-button submit-button jf-form-buttons jsTest-submitField" data-component="button" data-content="">Checkout Cart</button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="result-section">
                            <div class="container">
                                <h2 className="result-head">Your cart is empty !</h2>
                            </div>
                        </div>
                    </>
                )
            }
            <Footer />
        </div>
    )
}

export default Cart