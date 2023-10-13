import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';

export const StripeContextProvider = ({ children }) => {
    const stripePromise = loadStripe("pk_test_51MWf1EFXrDAHybijeHawuLOLbG3wpnvbszvVcdpIfa1kuoKQM4YJWHtiJPRInxmeqRrKK0hwZgR0LezBG42zOzsR00xxrswqKt");
    return (
        <Elements stripe={stripePromise} >{children}</Elements>
    )
}