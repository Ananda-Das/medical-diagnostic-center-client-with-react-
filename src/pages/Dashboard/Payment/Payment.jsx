/* eslint-disable react/prop-types */
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

// import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {

    // const location = useLocation();
    // const { finalPrice } = location.state || {};
  
    // console.log(finalPrice);

    // const [searchParams] = useSearchParams();

    // console.log(searchParams.get('price'));
   

    return (
        <div>
            <div>
            <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;