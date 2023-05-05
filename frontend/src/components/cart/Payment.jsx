import React from 'react'
import Payments from "./Payments"
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const Patment = ({stripeApiKey}) => {
  return (
    <>
     
    <Elements stripe={loadStripe(stripeApiKey)}> 
          <Payments />
        </Elements>
    </>
  )
}

export default Patment