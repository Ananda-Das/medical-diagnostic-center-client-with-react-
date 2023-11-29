import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useSearchParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
// import { useLocation } from "react-router-dom";

const CheckoutForm = () => {
  const [searchParams] = useSearchParams();

  const {user} = useAuth();

  // console.log(searchParams.get('price'));

//   const price = searchParams.get("price");

//   console.log(price);

  const testId = searchParams.get('tid');

  const { data: testInfo = {}, refetch } = useQuery({
    queryKey: ["tests"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/test/${testId}`);
      return res.data;
    },
  });

  const price = testInfo.price;

  const slot = testInfo.slot;

  const oldSlot = parseInt(slot);
  console.log(oldSlot);

  const [newSlot, setNewSlot] = useState(oldSlot);



  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const axiosSecure = useAxiosSecure();

  const [transactionId, setTransactionId] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  // const location = useLocation();
  // const { finalPrice } = location.state || {};

  // console.log(finalPrice);

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price: price }).then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [price, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

     // confirm payment
     const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: card,
            billing_details: {
                email: user?.email || 'anonymous',
                name: user?.displayName || 'anonymous'
            }
        }
    })

    if (confirmError) {
        console.log('confirm error')
    }

    else {
        console.log('payment intent', paymentIntent)
        if (paymentIntent.status === 'succeeded') {
            console.log('transaction id', paymentIntent.id);
            setTransactionId(paymentIntent.id);

            // now save the payment in the database
            const payment = {
                email: user.email,
                price: price,
                transactionId: paymentIntent.id,
                date: new Date(),
                status: 'pending',
                testId: testId,
            }

            const res = await axiosSecure.post('/payments', payment);
            console.log('payment saved', res.data);
            refetch();
            if (res.data?.paymentResult?.insertedId) {

            //  axiosSecure.patch(`/updateTest/${testId}`).then(res=>{
            //   console.log(res.data);
            //  })
            if(newSlot>0){
              setNewSlot(newSlot-1);
            }

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Thank you for the taka paisa",
                    showConfirmButton: false,
                    timer: 1500
                });

                console.log('after booking Slots', newSlot);
                // Navigate('/dashboard/paymentHistory')
            }

        }
    }

    

  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>
      <p className="text-red-600">{error}</p>
      {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
    </form>
  );
};

export default CheckoutForm;
