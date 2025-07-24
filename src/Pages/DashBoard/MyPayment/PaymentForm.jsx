import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import UseAxiosSecureApi from "../../../Hooks/Api/UseAxiosSecureApi";
import LoadingSpinner from "../../../Component/Sheard/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error , setError ] =useState('')
  const {bookingId} = useParams()
  const axiosSecure = UseAxiosSecureApi()
  const navigate = useNavigate()
  const {user} = useAuth()
  console.log(bookingId);


  const { isPending, data: bookingInfo = {} } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/${bookingId}`);
      return res?.data;
    },
  });

  if(isPending){
       return <LoadingSpinner></LoadingSpinner>
  }
//   console.log();
  const amount = bookingInfo.data.price;
  const amountInCents = amount * 100 ;
  console.log(amountInCents);





  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("error", error);
      setError(error.message)
    } else {
       setError('')
      console.log("payment method", paymentMethod);


      

    const res = await axiosSecure.post('/create-payment-intent' , {
       amountInCents,
       bookingId
    })
    
    const clientSecret = res.data.clientSecret;
    
    const result = await stripe.confirmCardPayment(clientSecret, {
           payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
               name: user?.displayName || "random User",
               email : user.email,
              },
       },
});

 if (result.error) {
      setError(result.error.message);
    } else {
      setError("");
      if (result.paymentIntent.status === "succeeded") {
        console.log("Payment Succeeded");
        console.log(result);

       
        const transactionId = result?.paymentIntent?.id;
        console.log(transactionId);
       //  step4 mark parcel paid also create payment history

        const paymentData = {
          bookingId,
          email: user?.email,
          amount,
          
          transactionId: transactionId,
          paymentMethod: result?.paymentIntent?.payment_method_types,
        };

        const paymentsRes = await axiosSecure.post("/payments", paymentData);
        if (paymentsRes.data.insertedId) {
          console.log("payment SuccessFully");
          await Swal.fire({
            icon: "success",
            title: "payment SuccessFull",
            html: ` <strong>Transaction ID :</strong><code>
              ${transactionId}
            </code>`,
            confirmButtonText: "Go to my parcel",
          });
       //    redirect to /my parcel
          navigate(-1);
        }
      }
    }


console.log("res from intent " , res);

    }




  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className=" rounded-xl w-full bg-gray-100  space-y-4  shadow-md p-4 max-w-md mx-auto"
      >
        <CardElement className="mb-4 p-2 border rounded" />
        <button
          className=" btn btn-primary text-black rounded w-full"
          type="Submit"
          disabled={!stripe}
        >
          Pay Tk: {' '}
          {amount}
        </button>

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
