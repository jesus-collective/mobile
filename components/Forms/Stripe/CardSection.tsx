import { CardCvcElement, CardExpiryElement, CardNumberElement } from "@stripe/react-stripe-js"
import React from "react"
import "./CardSectionStyles.css"

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
}

function CardSection(): React.ReactNode {
  return (
    <label>
      <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
      <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
      <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
    </label>
  )
}

export default CardSection
