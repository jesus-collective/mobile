/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const updateDirectMessage = /* GraphQL */ `
  mutation UpdateDirectMessage($input: UpdateDirectMessageInput!) {
    updateDirectMessage(input: $input) {
      id
      when
    }
  }
`

export const previewInvoice = /* GraphQL */ `
  mutation PreviewInvoice(
    $stripeCustomerID: String
    $idempotency: String
    $priceInfo: StripePriceInput
  ) {
    previewInvoice(
      stripeCustomerID: $stripeCustomerID
      idempotency: $idempotency
      priceInfo: $priceInfo
    ) {
      invoice {
        id
        object
        account_country
        account_name
        account_tax_ids
        amount_due
        amount_paid
        amount_remaining
        application_fee_amount
        attempt_count
        attempted
        auto_advance
        billing_reason
        charge
        collection_method
        created
        currency
        custom_fields
        customer
        customer_address {
          city
          country
          line1
          line2
          postal_code
          state
        }
        customer_email
        customer_name
        customer_phone
        customer_shipping
        customer_tax_exempt
        customer_tax_ids
        default_payment_method
        default_source
        default_tax_rates
        description
        discount
        discounts
        due_date
        ending_balance
        footer
        hosted_invoice_url
        invoice_pdf
        last_finalization_error
        lines {
          data {
            id
            object
            amount
            currency
            description
            discount_amounts
            discountable
            discounts
            livemode
            metadata
            period {
              end
              start
            }
            price {
              id
              object
              active
              billing_scheme
              created
              currency
              livemode
              lookup_key
              metadata
              nickname
              product
              recurring {
                aggregate_usage
                interval
                interval_count
                usage_type
              }
              tiers_mode
              transform_quantity
              type
              unit_amount
              unit_amount_decimal
            }
            proration
            quantity
            subscription
            subscription_item
            tax_amounts
            tax_rates
            type
          }
          has_more
          object
          url
        }
        livemode
        metadata
        next_payment_attempt
        number
        paid
        payment_intent
        period_end
        period_start
        post_payment_credit_notes_amount
        pre_payment_credit_notes_amount
        receipt_number
        starting_balance
        statement_descriptor
        status
        status_transitions {
          finalized_at
          marked_uncollectible_at
          paid_at
          voided_at
        }
        subscription
        subtotal
        tax
        total
        total_discount_amounts
        total_tax_amounts
        transfer_data
        webhooks_delivered_at
      }
    }
  }
`
