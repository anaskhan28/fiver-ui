import React, { useEffect, useState } from "react";
import "./Pay.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "../../utils/baseurl.js";
import { useParams } from "react-router-dom";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51MvJBbSINruR0VvjhSN1rVL3b4fIfB1TbvPqxxjLx2ZcY1ku1D2K9aZxkkGXv6uWJxSOQzS1ns2E8RAzuyL4KqUL00LXUFmkHp"
);

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(
          `/orders/create-payment-intent/${id}`
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return <div className="pay">
    {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
  </div>;
};

export default Pay;