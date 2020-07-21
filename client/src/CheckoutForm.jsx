import React, { useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";

import Row from "./prebuilt/Row";
import BillingDetailsFields from "./prebuilt/BillingDetailsFields.jsx";
import SubmitButton from "./prebuilt/SubmitButton";
import CheckoutError from "./prebuilt/CheckoutError";
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';

const CardElementContainer = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;

  & .StripeElement {
    width: 100%;
    padding: 15px;
  }
`;

const CheckoutForm = ({ price, onSuccessfulCheckout }) => {
  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();
  const [succeeded, setSucceeded] = useState(false);
  const [disabled, setDisabled] = useState(true);


  const stripe = useStripe();
  const elements = useElements();

  const handleCardDetailsChange = ev => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
  };



    const handleFormSubmit = async ev => {
      ev.preventDefault();

      const billingDetails = {
        name: ev.target.name.value,
        email: ev.target.email.value,
        address: {
          postal_code: ev.target.zip.value
        }
      };

      // create a payment intent on the Server
      // client_secret of that payment intent
      // need reference to the cardElement

      // need stripe.js
      // create a payment methods
      // confirm card payment
      // need payment method id and client_secret


      setProcessingTo(true);

      const { data: clientSecret } = await axios.post("http://localhost:8080/api/paymentIntent", {
        numDonation: price
      });

//      const clientSecret1 = JSON.stringify(clientSecretObj);


      console.log(clientSecret);

      const cardElement = elements.getElement(CardElement);

      const paymentMethodReq = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: billingDetails
      });

      console.log(paymentMethodReq);

      const confirmedCardPayment = await stripe.confirmCardPayment(clientSecret,{
        payment_method: paymentMethodReq.paymentMethod.id
      });

      console.log(confirmedCardPayment);

      if (confirmedCardPayment.error) {
        // Show error to your customer (e.g., insufficient funds)
        alert(confirmedCardPayment.error.message);
        console.log(confirmedCardPayment.error.message);
      } else {
          // The payment has been processed!
          if (confirmedCardPayment.paymentIntent.status === 'succeeded') {
            console.log(confirmedCardPayment.paymentIntent.status);
            const payment = await axios.post("http://localhost:8080/hooks", {
              payment_id: paymentMethodReq.paymentMethod.id,
              payment_status: confirmedCardPayment.paymentIntent.status
      //        payment_status: confirmedCardPayment.paymentIntent.status
            });
          }
                setSucceeded(true);
        };

//      setSucceeded(true);



      };


  const iframeStyles = {
    base: {
      color: "#fff",
      fontSize: "16px",
      iconColor: "#fff",
      "::placeholder": {
        color: "#87bbfd"
      }
    },
    invalid: {
      iconColor: "#FFC7EE",
      color: "#FFC7EE"
    },
    complete: {
      iconColor: "#cbf4c9"
    }
  };


  const cardElementOpts = {
    iconStyle: "solid",
    style: iframeStyles,
    hidePostalCode: true
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Row>
        <BillingDetailsFields />
      </Row>
      <Row>
        <CardElementContainer>
          <CardElement
            options={cardElementOpts}
            onChange={handleCardDetailsChange}
          />
        </CardElementContainer>
      </Row>
      {checkoutError && <CheckoutError>{checkoutError}</CheckoutError>}
      <Row>
        <SubmitButton disabled={isProcessing || disabled || succeeded}>
          {isProcessing ? `Processing...` : `Pay $${price}`},
          {succeeded ? "Payment successful!" : ``}
        </SubmitButton>
      </Row>
    </form>
  );
};

export default CheckoutForm;
