import { CardCvcElement, CardExpiryElement, CardNumberElement } from "@stripe/react-stripe-js"
import React from "react"
import { View } from "react-native"
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
    <View>
      <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
      <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
      <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
    </View>
  )
}

export default CardSection
