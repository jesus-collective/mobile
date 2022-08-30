/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const batchCreateDirectMessageUsers = /* GraphQL */ `
  mutation BatchCreateDirectMessageUsers($dmusers: [batchCreateDirectMessageUsersInput]) {
    batchCreateDirectMessageUsers(dmusers: $dmusers) {
      id
      userName
      userID
      roomID
      room {
        id
        name
        messageUsers {
          nextToken
        }
        directMessage {
          nextToken
        }
        roomType
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
        stripeCustomerID
        stripeSubscriptionID
        hasPaidState
        profileState
        billingAddress {
          city
          country
          line1
          line2
          postal_code
          state
        }
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        interests
        currentRole
        currentScope
        personality
        orgName
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        isArchived
        primaryOrganization
        organizations {
          nextToken
        }
        owns {
          nextToken
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
        directMessages {
          nextToken
        }
        messageReplies {
          nextToken
        }
        coachingTriad {
          nextToken
        }
        userTriad {
          nextToken
        }
        courseInstructing {
          nextToken
        }
        courseBackOfficeStaff {
          nextToken
        }
        payments {
          nextToken
        }
        alertConfig {
          emailDirectMessage
          emailGroupMessage
          emailEventMessage
          emailOrgMessage
          emailResourceMessage
          emailCourseMessage
          emailPromotions
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const createPaymentIntent = /* GraphQL */ `
  mutation CreatePaymentIntent($msg: String) {
    createPaymentIntent(msg: $msg) {
      id
      client_secret
      status
    }
  }
`
export const createStripeCustomer = /* GraphQL */ `
  mutation CreateStripeCustomer(
    $idempotency: String
    $phone: String
    $email: String
    $firstName: String
    $lastName: String
    $orgName: String
    $billingAddress: StripeAddressInput
  ) {
    createStripeCustomer(
      idempotency: $idempotency
      phone: $phone
      email: $email
      firstName: $firstName
      lastName: $lastName
      orgName: $orgName
      billingAddress: $billingAddress
    ) {
      customer {
        id
        object
        address
        balance
        created
        currency
        default_source
        delinquent
        description
        discount
        email
        invoice_prefix
        invoice_settings {
          custom_fields
          default_payment_method
          footer
        }
        livemode
        metadata
        name
        next_invoice_sequence
        phone
        preferred_locales
        shipping
        tax_exempt
      }
    }
  }
`
export const createStripeCustomerAdmin = /* GraphQL */ `
  mutation CreateStripeCustomerAdmin(
    $idempotency: String
    $phone: String
    $email: String
    $firstName: String
    $lastName: String
    $orgName: String
    $billingAddress: StripeAddressInput
    $userId: String
  ) {
    createStripeCustomerAdmin(
      idempotency: $idempotency
      phone: $phone
      email: $email
      firstName: $firstName
      lastName: $lastName
      orgName: $orgName
      billingAddress: $billingAddress
      userId: $userId
    ) {
      customer {
        id
        object
        address
        balance
        created
        currency
        default_source
        delinquent
        description
        discount
        email
        invoice_prefix
        invoice_settings {
          custom_fields
          default_payment_method
          footer
        }
        livemode
        metadata
        name
        next_invoice_sequence
        phone
        preferred_locales
        shipping
        tax_exempt
      }
    }
  }
`
export const createSubscription = /* GraphQL */ `
  mutation CreateSubscription(
    $stripeCustomerID: String
    $stripeSubscriptionID: String
    $idempotency: String
    $paymentMethodId: String
    $priceInfo: StripePriceInput
    $freeDays: Int
  ) {
    createSubscription(
      stripeCustomerID: $stripeCustomerID
      stripeSubscriptionID: $stripeSubscriptionID
      idempotency: $idempotency
      paymentMethodId: $paymentMethodId
      priceInfo: $priceInfo
      freeDays: $freeDays
    ) {
      subscription {
        id
        object
        application_fee_percent
        billing_cycle_anchor
        billing_thresholds
        cancel_at
        cancel_at_period_end
        canceled_at
        collection_method
        created
        current_period_end
        current_period_start
        customer
        days_until_due
        default_payment_method
        default_source
        default_tax_rates
        discount
        ended_at
        items {
          object
          has_more
          url
        }
        latest_invoice {
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
          subscription
          subtotal
          tax
          total
          total_discount_amounts
          total_tax_amounts
          transfer_data
          webhooks_delivered_at
        }
        livemode
        metadata
        next_pending_invoice_item_invoice
        pause_collection
        pending_invoice_item_interval
        pending_setup_intent
        pending_update
        schedule
        start_date
        status
        transfer_data
        trial_end
        trial_start
      }
      payedInvoice {
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
export const listInvoices = /* GraphQL */ `
  mutation ListInvoices($idempotency: String) {
    listInvoices(idempotency: $idempotency) {
      data {
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
export const cancelSubscription = /* GraphQL */ `
  mutation CancelSubscription($idempotency: String) {
    cancelSubscription(idempotency: $idempotency) {
      subscription {
        id
        object
        application_fee_percent
        billing_cycle_anchor
        billing_thresholds
        cancel_at
        cancel_at_period_end
        canceled_at
        collection_method
        created
        current_period_end
        current_period_start
        customer
        days_until_due
        default_payment_method
        default_source
        default_tax_rates
        discount
        ended_at
        items {
          object
          has_more
          url
        }
        latest_invoice {
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
          subscription
          subtotal
          tax
          total
          total_discount_amounts
          total_tax_amounts
          transfer_data
          webhooks_delivered_at
        }
        livemode
        metadata
        next_pending_invoice_item_invoice
        pause_collection
        pending_invoice_item_interval
        pending_setup_intent
        pending_update
        schedule
        start_date
        status
        transfer_data
        trial_end
        trial_start
      }
      payedInvoice {
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
export const sendHelpRequest = /* GraphQL */ `
  mutation SendHelpRequest($email: String, $body: String) {
    sendHelpRequest(email: $email, body: $body) {
      err
      data
    }
  }
`
export const createApplicationProcess = /* GraphQL */ `
  mutation CreateApplicationProcess($input: CreateApplicationProcessInput!) {
    createApplicationProcess(input: $input) {
      id
      createdAt
      updatedAt
    }
  }
`
export const updateApplicationProcess = /* GraphQL */ `
  mutation UpdateApplicationProcess($input: UpdateApplicationProcessInput!) {
    updateApplicationProcess(input: $input) {
      id
      createdAt
      updatedAt
    }
  }
`
export const deleteApplicationProcess = /* GraphQL */ `
  mutation DeleteApplicationProcess($input: DeleteApplicationProcessInput!) {
    deleteApplicationProcess(input: $input) {
      id
      createdAt
      updatedAt
    }
  }
`
export const createUser = /* GraphQL */ `
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      given_name
      family_name
      email
      phone
      owner
      mainUserGroup
      stripeCustomerID
      stripeSubscriptionID
      hasPaidState
      profileState
      billingAddress {
        city
        country
        line1
        line2
        postal_code
        state
      }
      location {
        latitude
        longitude
        geocodeFull
        geocodeCity
        geocodeRegion
        randomLatitude
        randomLongitude
      }
      profileImage {
        userId
        filenameSmall
        filenameMedium
        filenameLarge
        filenameUpload
      }
      aboutMeShort
      aboutMeLong
      interests
      currentRole
      currentScope
      personality
      orgName
      orgType
      orgSize
      denomination
      pplServed
      sundayAttendance
      numberVolunteers
      orgDescription
      joined
      isArchived
      primaryOrganization
      organizations {
        items {
          id
          userRole
          userId
          organizationId
          organizationName
          createdAt
          updatedAt
        }
        nextToken
      }
      owns {
        items {
          id
          owner
          readGroups
          ownerOrgID
          type
          name
          description
          memberCount
          image
          time
          lastUpdated
          location
          length
          effort
          cost
          promotionalText
          eventType
          eventUrl
          tz
          isSponsored
          createdAt
          updatedAt
        }
        nextToken
      }
      groups {
        items {
          id
          groupID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      messages {
        items {
          id
          content
          when
          attachment
          attachmentName
          attachmentOwner
          roomId
          userId
          postingAs
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      directMessages {
        items {
          id
          content
          attachment
          attachmentName
          attachmentOwner
          when
          recipients
          userId
          messageRoomID
          createdAt
          updatedAt
        }
        nextToken
      }
      messageReplies {
        items {
          id
          content
          when
          attachment
          attachmentName
          attachmentOwner
          userId
          messageId
          roomId
          parentReplyId
          createdAt
          updatedAt
        }
        nextToken
      }
      coachingTriad {
        items {
          id
          triadID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      userTriad {
        items {
          id
          triadID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      courseInstructing {
        items {
          id
          courseInfoID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      courseBackOfficeStaff {
        items {
          id
          courseInfoID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      payments {
        items {
          id
          productID
          userID
          dateCompleted
          paymentType
          paymentInfo
          createdAt
          updatedAt
        }
        nextToken
      }
      alertConfig {
        emailDirectMessage
        emailGroupMessage
        emailEventMessage
        emailOrgMessage
        emailResourceMessage
        emailCourseMessage
        emailPromotions
      }
      createdAt
      updatedAt
    }
  }
`
export const updateUser = /* GraphQL */ `
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      given_name
      family_name
      email
      phone
      owner
      mainUserGroup
      stripeCustomerID
      stripeSubscriptionID
      hasPaidState
      profileState
      billingAddress {
        city
        country
        line1
        line2
        postal_code
        state
      }
      location {
        latitude
        longitude
        geocodeFull
        geocodeCity
        geocodeRegion
        randomLatitude
        randomLongitude
      }
      profileImage {
        userId
        filenameSmall
        filenameMedium
        filenameLarge
        filenameUpload
      }
      aboutMeShort
      aboutMeLong
      interests
      currentRole
      currentScope
      personality
      orgName
      orgType
      orgSize
      denomination
      pplServed
      sundayAttendance
      numberVolunteers
      orgDescription
      joined
      isArchived
      primaryOrganization
      organizations {
        items {
          id
          userRole
          userId
          organizationId
          organizationName
          createdAt
          updatedAt
        }
        nextToken
      }
      owns {
        items {
          id
          owner
          readGroups
          ownerOrgID
          type
          name
          description
          memberCount
          image
          time
          lastUpdated
          location
          length
          effort
          cost
          promotionalText
          eventType
          eventUrl
          tz
          isSponsored
          createdAt
          updatedAt
        }
        nextToken
      }
      groups {
        items {
          id
          groupID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      messages {
        items {
          id
          content
          when
          attachment
          attachmentName
          attachmentOwner
          roomId
          userId
          postingAs
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      directMessages {
        items {
          id
          content
          attachment
          attachmentName
          attachmentOwner
          when
          recipients
          userId
          messageRoomID
          createdAt
          updatedAt
        }
        nextToken
      }
      messageReplies {
        items {
          id
          content
          when
          attachment
          attachmentName
          attachmentOwner
          userId
          messageId
          roomId
          parentReplyId
          createdAt
          updatedAt
        }
        nextToken
      }
      coachingTriad {
        items {
          id
          triadID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      userTriad {
        items {
          id
          triadID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      courseInstructing {
        items {
          id
          courseInfoID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      courseBackOfficeStaff {
        items {
          id
          courseInfoID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      payments {
        items {
          id
          productID
          userID
          dateCompleted
          paymentType
          paymentInfo
          createdAt
          updatedAt
        }
        nextToken
      }
      alertConfig {
        emailDirectMessage
        emailGroupMessage
        emailEventMessage
        emailOrgMessage
        emailResourceMessage
        emailCourseMessage
        emailPromotions
      }
      createdAt
      updatedAt
    }
  }
`
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input) {
      id
      given_name
      family_name
      email
      phone
      owner
      mainUserGroup
      stripeCustomerID
      stripeSubscriptionID
      hasPaidState
      profileState
      billingAddress {
        city
        country
        line1
        line2
        postal_code
        state
      }
      location {
        latitude
        longitude
        geocodeFull
        geocodeCity
        geocodeRegion
        randomLatitude
        randomLongitude
      }
      profileImage {
        userId
        filenameSmall
        filenameMedium
        filenameLarge
        filenameUpload
      }
      aboutMeShort
      aboutMeLong
      interests
      currentRole
      currentScope
      personality
      orgName
      orgType
      orgSize
      denomination
      pplServed
      sundayAttendance
      numberVolunteers
      orgDescription
      joined
      isArchived
      primaryOrganization
      organizations {
        items {
          id
          userRole
          userId
          organizationId
          organizationName
          createdAt
          updatedAt
        }
        nextToken
      }
      owns {
        items {
          id
          owner
          readGroups
          ownerOrgID
          type
          name
          description
          memberCount
          image
          time
          lastUpdated
          location
          length
          effort
          cost
          promotionalText
          eventType
          eventUrl
          tz
          isSponsored
          createdAt
          updatedAt
        }
        nextToken
      }
      groups {
        items {
          id
          groupID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      messages {
        items {
          id
          content
          when
          attachment
          attachmentName
          attachmentOwner
          roomId
          userId
          postingAs
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      directMessages {
        items {
          id
          content
          attachment
          attachmentName
          attachmentOwner
          when
          recipients
          userId
          messageRoomID
          createdAt
          updatedAt
        }
        nextToken
      }
      messageReplies {
        items {
          id
          content
          when
          attachment
          attachmentName
          attachmentOwner
          userId
          messageId
          roomId
          parentReplyId
          createdAt
          updatedAt
        }
        nextToken
      }
      coachingTriad {
        items {
          id
          triadID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      userTriad {
        items {
          id
          triadID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      courseInstructing {
        items {
          id
          courseInfoID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      courseBackOfficeStaff {
        items {
          id
          courseInfoID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      payments {
        items {
          id
          productID
          userID
          dateCompleted
          paymentType
          paymentInfo
          createdAt
          updatedAt
        }
        nextToken
      }
      alertConfig {
        emailDirectMessage
        emailGroupMessage
        emailEventMessage
        emailOrgMessage
        emailResourceMessage
        emailCourseMessage
        emailPromotions
      }
      createdAt
      updatedAt
    }
  }
`
export const createGroupMember = /* GraphQL */ `
  mutation CreateGroupMember($input: CreateGroupMemberInput!) {
    createGroupMember(input: $input) {
      id
      groupID
      userID
      group {
        id
        owner
        readGroups
        ownerOrgID
        ownerOrg {
          id
          orgName
          adminEmail
          phone
          admins
          superAdmin
          hasPaidState
          profileState
          address
          city
          province
          postalCode
          country
          aboutMeShort
          aboutMeLong
          orgType
          orgSize
          denomination
          pplServed
          sundayAttendance
          numberVolunteers
          orgDescription
          joined
          parentOrganizationId
          createdAt
          updatedAt
        }
        type
        name
        description
        memberCount
        members {
          nextToken
        }
        image
        time
        lastUpdated
        location
        locationLatLong {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        length
        effort
        cost
        promotionalText
        messages {
          nextToken
        }
        eventType
        eventUrl
        tz
        isSponsored
        createdAt
        updatedAt
        ownerUser {
          id
          given_name
          family_name
          email
          phone
          owner
          mainUserGroup
          stripeCustomerID
          stripeSubscriptionID
          hasPaidState
          profileState
          aboutMeShort
          aboutMeLong
          interests
          currentRole
          currentScope
          personality
          orgName
          orgType
          orgSize
          denomination
          pplServed
          sundayAttendance
          numberVolunteers
          orgDescription
          joined
          isArchived
          primaryOrganization
          createdAt
          updatedAt
        }
      }
      createdAt
      updatedAt
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
        stripeCustomerID
        stripeSubscriptionID
        hasPaidState
        profileState
        billingAddress {
          city
          country
          line1
          line2
          postal_code
          state
        }
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        interests
        currentRole
        currentScope
        personality
        orgName
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        isArchived
        primaryOrganization
        organizations {
          nextToken
        }
        owns {
          nextToken
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
        directMessages {
          nextToken
        }
        messageReplies {
          nextToken
        }
        coachingTriad {
          nextToken
        }
        userTriad {
          nextToken
        }
        courseInstructing {
          nextToken
        }
        courseBackOfficeStaff {
          nextToken
        }
        payments {
          nextToken
        }
        alertConfig {
          emailDirectMessage
          emailGroupMessage
          emailEventMessage
          emailOrgMessage
          emailResourceMessage
          emailCourseMessage
          emailPromotions
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const updateGroupMember = /* GraphQL */ `
  mutation UpdateGroupMember($input: UpdateGroupMemberInput!) {
    updateGroupMember(input: $input) {
      id
      groupID
      userID
      group {
        id
        owner
        readGroups
        ownerOrgID
        ownerOrg {
          id
          orgName
          adminEmail
          phone
          admins
          superAdmin
          hasPaidState
          profileState
          address
          city
          province
          postalCode
          country
          aboutMeShort
          aboutMeLong
          orgType
          orgSize
          denomination
          pplServed
          sundayAttendance
          numberVolunteers
          orgDescription
          joined
          parentOrganizationId
          createdAt
          updatedAt
        }
        type
        name
        description
        memberCount
        members {
          nextToken
        }
        image
        time
        lastUpdated
        location
        locationLatLong {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        length
        effort
        cost
        promotionalText
        messages {
          nextToken
        }
        eventType
        eventUrl
        tz
        isSponsored
        createdAt
        updatedAt
        ownerUser {
          id
          given_name
          family_name
          email
          phone
          owner
          mainUserGroup
          stripeCustomerID
          stripeSubscriptionID
          hasPaidState
          profileState
          aboutMeShort
          aboutMeLong
          interests
          currentRole
          currentScope
          personality
          orgName
          orgType
          orgSize
          denomination
          pplServed
          sundayAttendance
          numberVolunteers
          orgDescription
          joined
          isArchived
          primaryOrganization
          createdAt
          updatedAt
        }
      }
      createdAt
      updatedAt
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
        stripeCustomerID
        stripeSubscriptionID
        hasPaidState
        profileState
        billingAddress {
          city
          country
          line1
          line2
          postal_code
          state
        }
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        interests
        currentRole
        currentScope
        personality
        orgName
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        isArchived
        primaryOrganization
        organizations {
          nextToken
        }
        owns {
          nextToken
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
        directMessages {
          nextToken
        }
        messageReplies {
          nextToken
        }
        coachingTriad {
          nextToken
        }
        userTriad {
          nextToken
        }
        courseInstructing {
          nextToken
        }
        courseBackOfficeStaff {
          nextToken
        }
        payments {
          nextToken
        }
        alertConfig {
          emailDirectMessage
          emailGroupMessage
          emailEventMessage
          emailOrgMessage
          emailResourceMessage
          emailCourseMessage
          emailPromotions
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const deleteGroupMember = /* GraphQL */ `
  mutation DeleteGroupMember($input: DeleteGroupMemberInput!) {
    deleteGroupMember(input: $input) {
      id
      groupID
      userID
      group {
        id
        owner
        readGroups
        ownerOrgID
        ownerOrg {
          id
          orgName
          adminEmail
          phone
          admins
          superAdmin
          hasPaidState
          profileState
          address
          city
          province
          postalCode
          country
          aboutMeShort
          aboutMeLong
          orgType
          orgSize
          denomination
          pplServed
          sundayAttendance
          numberVolunteers
          orgDescription
          joined
          parentOrganizationId
          createdAt
          updatedAt
        }
        type
        name
        description
        memberCount
        members {
          nextToken
        }
        image
        time
        lastUpdated
        location
        locationLatLong {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        length
        effort
        cost
        promotionalText
        messages {
          nextToken
        }
        eventType
        eventUrl
        tz
        isSponsored
        createdAt
        updatedAt
        ownerUser {
          id
          given_name
          family_name
          email
          phone
          owner
          mainUserGroup
          stripeCustomerID
          stripeSubscriptionID
          hasPaidState
          profileState
          aboutMeShort
          aboutMeLong
          interests
          currentRole
          currentScope
          personality
          orgName
          orgType
          orgSize
          denomination
          pplServed
          sundayAttendance
          numberVolunteers
          orgDescription
          joined
          isArchived
          primaryOrganization
          createdAt
          updatedAt
        }
      }
      createdAt
      updatedAt
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
        stripeCustomerID
        stripeSubscriptionID
        hasPaidState
        profileState
        billingAddress {
          city
          country
          line1
          line2
          postal_code
          state
        }
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        interests
        currentRole
        currentScope
        personality
        orgName
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        isArchived
        primaryOrganization
        organizations {
          nextToken
        }
        owns {
          nextToken
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
        directMessages {
          nextToken
        }
        messageReplies {
          nextToken
        }
        coachingTriad {
          nextToken
        }
        userTriad {
          nextToken
        }
        courseInstructing {
          nextToken
        }
        courseBackOfficeStaff {
          nextToken
        }
        payments {
          nextToken
        }
        alertConfig {
          emailDirectMessage
          emailGroupMessage
          emailEventMessage
          emailOrgMessage
          emailResourceMessage
          emailCourseMessage
          emailPromotions
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const createGroup = /* GraphQL */ `
  mutation CreateGroup($input: CreateGroupInput!) {
    createGroup(input: $input) {
      id
      owner
      readGroups
      ownerOrgID
      ownerOrg {
        id
        orgName
        adminEmail
        phone
        admins
        superAdmin
        hasPaidState
        profileState
        address
        city
        province
        postalCode
        country
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        parentOrganizationId
        parentOrganization {
          id
          orgName
          adminEmail
          phone
          admins
          superAdmin
          hasPaidState
          profileState
          address
          city
          province
          postalCode
          country
          aboutMeShort
          aboutMeLong
          orgType
          orgSize
          denomination
          pplServed
          sundayAttendance
          numberVolunteers
          orgDescription
          joined
          parentOrganizationId
          createdAt
          updatedAt
        }
        subOrganizations {
          nextToken
        }
        members {
          nextToken
        }
        ownsGroups {
          nextToken
        }
        resource {
          nextToken
        }
        createdAt
        updatedAt
      }
      type
      name
      description
      memberCount
      members {
        items {
          id
          groupID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      image
      time
      lastUpdated
      location
      locationLatLong {
        latitude
        longitude
        geocodeFull
        geocodeCity
        geocodeRegion
        randomLatitude
        randomLongitude
      }
      length
      effort
      cost
      promotionalText
      messages {
        items {
          id
          content
          when
          attachment
          attachmentName
          attachmentOwner
          roomId
          userId
          postingAs
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      eventType
      eventUrl
      tz
      isSponsored
      createdAt
      updatedAt
      ownerUser {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
        stripeCustomerID
        stripeSubscriptionID
        hasPaidState
        profileState
        billingAddress {
          city
          country
          line1
          line2
          postal_code
          state
        }
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        interests
        currentRole
        currentScope
        personality
        orgName
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        isArchived
        primaryOrganization
        organizations {
          nextToken
        }
        owns {
          nextToken
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
        directMessages {
          nextToken
        }
        messageReplies {
          nextToken
        }
        coachingTriad {
          nextToken
        }
        userTriad {
          nextToken
        }
        courseInstructing {
          nextToken
        }
        courseBackOfficeStaff {
          nextToken
        }
        payments {
          nextToken
        }
        alertConfig {
          emailDirectMessage
          emailGroupMessage
          emailEventMessage
          emailOrgMessage
          emailResourceMessage
          emailCourseMessage
          emailPromotions
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const updateGroup = /* GraphQL */ `
  mutation UpdateGroup($input: UpdateGroupInput!) {
    updateGroup(input: $input) {
      id
      owner
      readGroups
      ownerOrgID
      ownerOrg {
        id
        orgName
        adminEmail
        phone
        admins
        superAdmin
        hasPaidState
        profileState
        address
        city
        province
        postalCode
        country
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        parentOrganizationId
        parentOrganization {
          id
          orgName
          adminEmail
          phone
          admins
          superAdmin
          hasPaidState
          profileState
          address
          city
          province
          postalCode
          country
          aboutMeShort
          aboutMeLong
          orgType
          orgSize
          denomination
          pplServed
          sundayAttendance
          numberVolunteers
          orgDescription
          joined
          parentOrganizationId
          createdAt
          updatedAt
        }
        subOrganizations {
          nextToken
        }
        members {
          nextToken
        }
        ownsGroups {
          nextToken
        }
        resource {
          nextToken
        }
        createdAt
        updatedAt
      }
      type
      name
      description
      memberCount
      members {
        items {
          id
          groupID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      image
      time
      lastUpdated
      location
      locationLatLong {
        latitude
        longitude
        geocodeFull
        geocodeCity
        geocodeRegion
        randomLatitude
        randomLongitude
      }
      length
      effort
      cost
      promotionalText
      messages {
        items {
          id
          content
          when
          attachment
          attachmentName
          attachmentOwner
          roomId
          userId
          postingAs
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      eventType
      eventUrl
      tz
      isSponsored
      createdAt
      updatedAt
      ownerUser {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
        stripeCustomerID
        stripeSubscriptionID
        hasPaidState
        profileState
        billingAddress {
          city
          country
          line1
          line2
          postal_code
          state
        }
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        interests
        currentRole
        currentScope
        personality
        orgName
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        isArchived
        primaryOrganization
        organizations {
          nextToken
        }
        owns {
          nextToken
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
        directMessages {
          nextToken
        }
        messageReplies {
          nextToken
        }
        coachingTriad {
          nextToken
        }
        userTriad {
          nextToken
        }
        courseInstructing {
          nextToken
        }
        courseBackOfficeStaff {
          nextToken
        }
        payments {
          nextToken
        }
        alertConfig {
          emailDirectMessage
          emailGroupMessage
          emailEventMessage
          emailOrgMessage
          emailResourceMessage
          emailCourseMessage
          emailPromotions
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const deleteGroup = /* GraphQL */ `
  mutation DeleteGroup($input: DeleteGroupInput!) {
    deleteGroup(input: $input) {
      id
      owner
      readGroups
      ownerOrgID
      ownerOrg {
        id
        orgName
        adminEmail
        phone
        admins
        superAdmin
        hasPaidState
        profileState
        address
        city
        province
        postalCode
        country
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        parentOrganizationId
        parentOrganization {
          id
          orgName
          adminEmail
          phone
          admins
          superAdmin
          hasPaidState
          profileState
          address
          city
          province
          postalCode
          country
          aboutMeShort
          aboutMeLong
          orgType
          orgSize
          denomination
          pplServed
          sundayAttendance
          numberVolunteers
          orgDescription
          joined
          parentOrganizationId
          createdAt
          updatedAt
        }
        subOrganizations {
          nextToken
        }
        members {
          nextToken
        }
        ownsGroups {
          nextToken
        }
        resource {
          nextToken
        }
        createdAt
        updatedAt
      }
      type
      name
      description
      memberCount
      members {
        items {
          id
          groupID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      image
      time
      lastUpdated
      location
      locationLatLong {
        latitude
        longitude
        geocodeFull
        geocodeCity
        geocodeRegion
        randomLatitude
        randomLongitude
      }
      length
      effort
      cost
      promotionalText
      messages {
        items {
          id
          content
          when
          attachment
          attachmentName
          attachmentOwner
          roomId
          userId
          postingAs
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      eventType
      eventUrl
      tz
      isSponsored
      createdAt
      updatedAt
      ownerUser {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
        stripeCustomerID
        stripeSubscriptionID
        hasPaidState
        profileState
        billingAddress {
          city
          country
          line1
          line2
          postal_code
          state
        }
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        interests
        currentRole
        currentScope
        personality
        orgName
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        isArchived
        primaryOrganization
        organizations {
          nextToken
        }
        owns {
          nextToken
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
        directMessages {
          nextToken
        }
        messageReplies {
          nextToken
        }
        coachingTriad {
          nextToken
        }
        userTriad {
          nextToken
        }
        courseInstructing {
          nextToken
        }
        courseBackOfficeStaff {
          nextToken
        }
        payments {
          nextToken
        }
        alertConfig {
          emailDirectMessage
          emailGroupMessage
          emailEventMessage
          emailOrgMessage
          emailResourceMessage
          emailCourseMessage
          emailPromotions
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const createOrganizationMember = /* GraphQL */ `
  mutation CreateOrganizationMember($input: CreateOrganizationMemberInput!) {
    createOrganizationMember(input: $input) {
      id
      userRole
      userId
      organizationId
      organizationName
      organization {
        id
        orgName
        adminEmail
        phone
        admins
        superAdmin
        hasPaidState
        profileState
        address
        city
        province
        postalCode
        country
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        parentOrganizationId
        parentOrganization {
          id
          orgName
          adminEmail
          phone
          admins
          superAdmin
          hasPaidState
          profileState
          address
          city
          province
          postalCode
          country
          aboutMeShort
          aboutMeLong
          orgType
          orgSize
          denomination
          pplServed
          sundayAttendance
          numberVolunteers
          orgDescription
          joined
          parentOrganizationId
          createdAt
          updatedAt
        }
        subOrganizations {
          nextToken
        }
        members {
          nextToken
        }
        ownsGroups {
          nextToken
        }
        resource {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
        stripeCustomerID
        stripeSubscriptionID
        hasPaidState
        profileState
        billingAddress {
          city
          country
          line1
          line2
          postal_code
          state
        }
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        interests
        currentRole
        currentScope
        personality
        orgName
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        isArchived
        primaryOrganization
        organizations {
          nextToken
        }
        owns {
          nextToken
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
        directMessages {
          nextToken
        }
        messageReplies {
          nextToken
        }
        coachingTriad {
          nextToken
        }
        userTriad {
          nextToken
        }
        courseInstructing {
          nextToken
        }
        courseBackOfficeStaff {
          nextToken
        }
        payments {
          nextToken
        }
        alertConfig {
          emailDirectMessage
          emailGroupMessage
          emailEventMessage
          emailOrgMessage
          emailResourceMessage
          emailCourseMessage
          emailPromotions
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const updateOrganizationMember = /* GraphQL */ `
  mutation UpdateOrganizationMember($input: UpdateOrganizationMemberInput!) {
    updateOrganizationMember(input: $input) {
      id
      userRole
      userId
      organizationId
      organizationName
      organization {
        id
        orgName
        adminEmail
        phone
        admins
        superAdmin
        hasPaidState
        profileState
        address
        city
        province
        postalCode
        country
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        parentOrganizationId
        parentOrganization {
          id
          orgName
          adminEmail
          phone
          admins
          superAdmin
          hasPaidState
          profileState
          address
          city
          province
          postalCode
          country
          aboutMeShort
          aboutMeLong
          orgType
          orgSize
          denomination
          pplServed
          sundayAttendance
          numberVolunteers
          orgDescription
          joined
          parentOrganizationId
          createdAt
          updatedAt
        }
        subOrganizations {
          nextToken
        }
        members {
          nextToken
        }
        ownsGroups {
          nextToken
        }
        resource {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
        stripeCustomerID
        stripeSubscriptionID
        hasPaidState
        profileState
        billingAddress {
          city
          country
          line1
          line2
          postal_code
          state
        }
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        interests
        currentRole
        currentScope
        personality
        orgName
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        isArchived
        primaryOrganization
        organizations {
          nextToken
        }
        owns {
          nextToken
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
        directMessages {
          nextToken
        }
        messageReplies {
          nextToken
        }
        coachingTriad {
          nextToken
        }
        userTriad {
          nextToken
        }
        courseInstructing {
          nextToken
        }
        courseBackOfficeStaff {
          nextToken
        }
        payments {
          nextToken
        }
        alertConfig {
          emailDirectMessage
          emailGroupMessage
          emailEventMessage
          emailOrgMessage
          emailResourceMessage
          emailCourseMessage
          emailPromotions
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const deleteOrganizationMember = /* GraphQL */ `
  mutation DeleteOrganizationMember($input: DeleteOrganizationMemberInput!) {
    deleteOrganizationMember(input: $input) {
      id
      userRole
      userId
      organizationId
      organizationName
      organization {
        id
        orgName
        adminEmail
        phone
        admins
        superAdmin
        hasPaidState
        profileState
        address
        city
        province
        postalCode
        country
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        parentOrganizationId
        parentOrganization {
          id
          orgName
          adminEmail
          phone
          admins
          superAdmin
          hasPaidState
          profileState
          address
          city
          province
          postalCode
          country
          aboutMeShort
          aboutMeLong
          orgType
          orgSize
          denomination
          pplServed
          sundayAttendance
          numberVolunteers
          orgDescription
          joined
          parentOrganizationId
          createdAt
          updatedAt
        }
        subOrganizations {
          nextToken
        }
        members {
          nextToken
        }
        ownsGroups {
          nextToken
        }
        resource {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
        stripeCustomerID
        stripeSubscriptionID
        hasPaidState
        profileState
        billingAddress {
          city
          country
          line1
          line2
          postal_code
          state
        }
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        interests
        currentRole
        currentScope
        personality
        orgName
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        isArchived
        primaryOrganization
        organizations {
          nextToken
        }
        owns {
          nextToken
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
        directMessages {
          nextToken
        }
        messageReplies {
          nextToken
        }
        coachingTriad {
          nextToken
        }
        userTriad {
          nextToken
        }
        courseInstructing {
          nextToken
        }
        courseBackOfficeStaff {
          nextToken
        }
        payments {
          nextToken
        }
        alertConfig {
          emailDirectMessage
          emailGroupMessage
          emailEventMessage
          emailOrgMessage
          emailResourceMessage
          emailCourseMessage
          emailPromotions
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const createOrganization = /* GraphQL */ `
  mutation CreateOrganization($input: CreateOrganizationInput!) {
    createOrganization(input: $input) {
      id
      orgName
      adminEmail
      phone
      admins
      superAdmin
      hasPaidState
      profileState
      address
      city
      province
      postalCode
      country
      location {
        latitude
        longitude
        geocodeFull
        geocodeCity
        geocodeRegion
        randomLatitude
        randomLongitude
      }
      profileImage {
        userId
        filenameSmall
        filenameMedium
        filenameLarge
        filenameUpload
      }
      aboutMeShort
      aboutMeLong
      orgType
      orgSize
      denomination
      pplServed
      sundayAttendance
      numberVolunteers
      orgDescription
      joined
      parentOrganizationId
      parentOrganization {
        id
        orgName
        adminEmail
        phone
        admins
        superAdmin
        hasPaidState
        profileState
        address
        city
        province
        postalCode
        country
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        parentOrganizationId
        parentOrganization {
          id
          orgName
          adminEmail
          phone
          admins
          superAdmin
          hasPaidState
          profileState
          address
          city
          province
          postalCode
          country
          aboutMeShort
          aboutMeLong
          orgType
          orgSize
          denomination
          pplServed
          sundayAttendance
          numberVolunteers
          orgDescription
          joined
          parentOrganizationId
          createdAt
          updatedAt
        }
        subOrganizations {
          nextToken
        }
        members {
          nextToken
        }
        ownsGroups {
          nextToken
        }
        resource {
          nextToken
        }
        createdAt
        updatedAt
      }
      subOrganizations {
        items {
          id
          orgName
          adminEmail
          phone
          admins
          superAdmin
          hasPaidState
          profileState
          address
          city
          province
          postalCode
          country
          aboutMeShort
          aboutMeLong
          orgType
          orgSize
          denomination
          pplServed
          sundayAttendance
          numberVolunteers
          orgDescription
          joined
          parentOrganizationId
          createdAt
          updatedAt
        }
        nextToken
      }
      members {
        items {
          id
          userRole
          userId
          organizationId
          organizationName
          createdAt
          updatedAt
        }
        nextToken
      }
      ownsGroups {
        items {
          id
          owner
          readGroups
          ownerOrgID
          type
          name
          description
          memberCount
          image
          time
          lastUpdated
          location
          length
          effort
          cost
          promotionalText
          eventType
          eventUrl
          tz
          isSponsored
          createdAt
          updatedAt
        }
        nextToken
      }
      resource {
        items {
          id
          type
          groupId
          organizationId
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`
export const updateOrganization = /* GraphQL */ `
  mutation UpdateOrganization($input: UpdateOrganizationInput!) {
    updateOrganization(input: $input) {
      id
      orgName
      adminEmail
      phone
      admins
      superAdmin
      hasPaidState
      profileState
      address
      city
      province
      postalCode
      country
      location {
        latitude
        longitude
        geocodeFull
        geocodeCity
        geocodeRegion
        randomLatitude
        randomLongitude
      }
      profileImage {
        userId
        filenameSmall
        filenameMedium
        filenameLarge
        filenameUpload
      }
      aboutMeShort
      aboutMeLong
      orgType
      orgSize
      denomination
      pplServed
      sundayAttendance
      numberVolunteers
      orgDescription
      joined
      parentOrganizationId
      parentOrganization {
        id
        orgName
        adminEmail
        phone
        admins
        superAdmin
        hasPaidState
        profileState
        address
        city
        province
        postalCode
        country
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        parentOrganizationId
        parentOrganization {
          id
          orgName
          adminEmail
          phone
          admins
          superAdmin
          hasPaidState
          profileState
          address
          city
          province
          postalCode
          country
          aboutMeShort
          aboutMeLong
          orgType
          orgSize
          denomination
          pplServed
          sundayAttendance
          numberVolunteers
          orgDescription
          joined
          parentOrganizationId
          createdAt
          updatedAt
        }
        subOrganizations {
          nextToken
        }
        members {
          nextToken
        }
        ownsGroups {
          nextToken
        }
        resource {
          nextToken
        }
        createdAt
        updatedAt
      }
      subOrganizations {
        items {
          id
          orgName
          adminEmail
          phone
          admins
          superAdmin
          hasPaidState
          profileState
          address
          city
          province
          postalCode
          country
          aboutMeShort
          aboutMeLong
          orgType
          orgSize
          denomination
          pplServed
          sundayAttendance
          numberVolunteers
          orgDescription
          joined
          parentOrganizationId
          createdAt
          updatedAt
        }
        nextToken
      }
      members {
        items {
          id
          userRole
          userId
          organizationId
          organizationName
          createdAt
          updatedAt
        }
        nextToken
      }
      ownsGroups {
        items {
          id
          owner
          readGroups
          ownerOrgID
          type
          name
          description
          memberCount
          image
          time
          lastUpdated
          location
          length
          effort
          cost
          promotionalText
          eventType
          eventUrl
          tz
          isSponsored
          createdAt
          updatedAt
        }
        nextToken
      }
      resource {
        items {
          id
          type
          groupId
          organizationId
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`
export const deleteOrganization = /* GraphQL */ `
  mutation DeleteOrganization($input: DeleteOrganizationInput!) {
    deleteOrganization(input: $input) {
      id
      orgName
      adminEmail
      phone
      admins
      superAdmin
      hasPaidState
      profileState
      address
      city
      province
      postalCode
      country
      location {
        latitude
        longitude
        geocodeFull
        geocodeCity
        geocodeRegion
        randomLatitude
        randomLongitude
      }
      profileImage {
        userId
        filenameSmall
        filenameMedium
        filenameLarge
        filenameUpload
      }
      aboutMeShort
      aboutMeLong
      orgType
      orgSize
      denomination
      pplServed
      sundayAttendance
      numberVolunteers
      orgDescription
      joined
      parentOrganizationId
      parentOrganization {
        id
        orgName
        adminEmail
        phone
        admins
        superAdmin
        hasPaidState
        profileState
        address
        city
        province
        postalCode
        country
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        parentOrganizationId
        parentOrganization {
          id
          orgName
          adminEmail
          phone
          admins
          superAdmin
          hasPaidState
          profileState
          address
          city
          province
          postalCode
          country
          aboutMeShort
          aboutMeLong
          orgType
          orgSize
          denomination
          pplServed
          sundayAttendance
          numberVolunteers
          orgDescription
          joined
          parentOrganizationId
          createdAt
          updatedAt
        }
        subOrganizations {
          nextToken
        }
        members {
          nextToken
        }
        ownsGroups {
          nextToken
        }
        resource {
          nextToken
        }
        createdAt
        updatedAt
      }
      subOrganizations {
        items {
          id
          orgName
          adminEmail
          phone
          admins
          superAdmin
          hasPaidState
          profileState
          address
          city
          province
          postalCode
          country
          aboutMeShort
          aboutMeLong
          orgType
          orgSize
          denomination
          pplServed
          sundayAttendance
          numberVolunteers
          orgDescription
          joined
          parentOrganizationId
          createdAt
          updatedAt
        }
        nextToken
      }
      members {
        items {
          id
          userRole
          userId
          organizationId
          organizationName
          createdAt
          updatedAt
        }
        nextToken
      }
      ownsGroups {
        items {
          id
          owner
          readGroups
          ownerOrgID
          type
          name
          description
          memberCount
          image
          time
          lastUpdated
          location
          length
          effort
          cost
          promotionalText
          eventType
          eventUrl
          tz
          isSponsored
          createdAt
          updatedAt
        }
        nextToken
      }
      resource {
        items {
          id
          type
          groupId
          organizationId
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`
export const createActivity = /* GraphQL */ `
  mutation CreateActivity($input: CreateActivityInput!) {
    createActivity(input: $input) {
      id
      readUser
      ownerName
      ownerID
      activityGroupId
      activityGroupType
      activityActionType
      time
      date
      expirationDate
      createdAt
      updatedAt
      owner {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
        stripeCustomerID
        stripeSubscriptionID
        hasPaidState
        profileState
        billingAddress {
          city
          country
          line1
          line2
          postal_code
          state
        }
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        interests
        currentRole
        currentScope
        personality
        orgName
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        isArchived
        primaryOrganization
        organizations {
          nextToken
        }
        owns {
          nextToken
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
        directMessages {
          nextToken
        }
        messageReplies {
          nextToken
        }
        coachingTriad {
          nextToken
        }
        userTriad {
          nextToken
        }
        courseInstructing {
          nextToken
        }
        courseBackOfficeStaff {
          nextToken
        }
        payments {
          nextToken
        }
        alertConfig {
          emailDirectMessage
          emailGroupMessage
          emailEventMessage
          emailOrgMessage
          emailResourceMessage
          emailCourseMessage
          emailPromotions
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const updateActivity = /* GraphQL */ `
  mutation UpdateActivity($input: UpdateActivityInput!) {
    updateActivity(input: $input) {
      id
      readUser
      ownerName
      ownerID
      activityGroupId
      activityGroupType
      activityActionType
      time
      date
      expirationDate
      createdAt
      updatedAt
      owner {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
        stripeCustomerID
        stripeSubscriptionID
        hasPaidState
        profileState
        billingAddress {
          city
          country
          line1
          line2
          postal_code
          state
        }
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        interests
        currentRole
        currentScope
        personality
        orgName
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        isArchived
        primaryOrganization
        organizations {
          nextToken
        }
        owns {
          nextToken
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
        directMessages {
          nextToken
        }
        messageReplies {
          nextToken
        }
        coachingTriad {
          nextToken
        }
        userTriad {
          nextToken
        }
        courseInstructing {
          nextToken
        }
        courseBackOfficeStaff {
          nextToken
        }
        payments {
          nextToken
        }
        alertConfig {
          emailDirectMessage
          emailGroupMessage
          emailEventMessage
          emailOrgMessage
          emailResourceMessage
          emailCourseMessage
          emailPromotions
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const deleteActivity = /* GraphQL */ `
  mutation DeleteActivity($input: DeleteActivityInput!) {
    deleteActivity(input: $input) {
      id
      readUser
      ownerName
      ownerID
      activityGroupId
      activityGroupType
      activityActionType
      time
      date
      expirationDate
      createdAt
      updatedAt
      owner {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
        stripeCustomerID
        stripeSubscriptionID
        hasPaidState
        profileState
        billingAddress {
          city
          country
          line1
          line2
          postal_code
          state
        }
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        interests
        currentRole
        currentScope
        personality
        orgName
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        isArchived
        primaryOrganization
        organizations {
          nextToken
        }
        owns {
          nextToken
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
        directMessages {
          nextToken
        }
        messageReplies {
          nextToken
        }
        coachingTriad {
          nextToken
        }
        userTriad {
          nextToken
        }
        courseInstructing {
          nextToken
        }
        courseBackOfficeStaff {
          nextToken
        }
        payments {
          nextToken
        }
        alertConfig {
          emailDirectMessage
          emailGroupMessage
          emailEventMessage
          emailOrgMessage
          emailResourceMessage
          emailCourseMessage
          emailPromotions
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const createPayment = /* GraphQL */ `
  mutation CreatePayment($input: CreatePaymentInput!) {
    createPayment(input: $input) {
      id
      productID
      product {
        id
        price
        pricePer
        isDefault
        name
        confirmationMsg
        payments {
          nextToken
        }
        isOrgTier
        isIndividualTier
        isLogin
        eula
        enabled
        isStripe
        isPaypal
        tiered {
          name
          stripePaymentID
          defaultAmount
          amountIsEditable
          isSubscription
        }
        submitButtonText
        createdAt
        updatedAt
      }
      userID
      dateCompleted
      paymentType
      paymentInfo
      createdAt
      updatedAt
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
        stripeCustomerID
        stripeSubscriptionID
        hasPaidState
        profileState
        billingAddress {
          city
          country
          line1
          line2
          postal_code
          state
        }
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        interests
        currentRole
        currentScope
        personality
        orgName
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        isArchived
        primaryOrganization
        organizations {
          nextToken
        }
        owns {
          nextToken
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
        directMessages {
          nextToken
        }
        messageReplies {
          nextToken
        }
        coachingTriad {
          nextToken
        }
        userTriad {
          nextToken
        }
        courseInstructing {
          nextToken
        }
        courseBackOfficeStaff {
          nextToken
        }
        payments {
          nextToken
        }
        alertConfig {
          emailDirectMessage
          emailGroupMessage
          emailEventMessage
          emailOrgMessage
          emailResourceMessage
          emailCourseMessage
          emailPromotions
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const updatePayment = /* GraphQL */ `
  mutation UpdatePayment($input: UpdatePaymentInput!) {
    updatePayment(input: $input) {
      id
      productID
      product {
        id
        price
        pricePer
        isDefault
        name
        confirmationMsg
        payments {
          nextToken
        }
        isOrgTier
        isIndividualTier
        isLogin
        eula
        enabled
        isStripe
        isPaypal
        tiered {
          name
          stripePaymentID
          defaultAmount
          amountIsEditable
          isSubscription
        }
        submitButtonText
        createdAt
        updatedAt
      }
      userID
      dateCompleted
      paymentType
      paymentInfo
      createdAt
      updatedAt
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
        stripeCustomerID
        stripeSubscriptionID
        hasPaidState
        profileState
        billingAddress {
          city
          country
          line1
          line2
          postal_code
          state
        }
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        interests
        currentRole
        currentScope
        personality
        orgName
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        isArchived
        primaryOrganization
        organizations {
          nextToken
        }
        owns {
          nextToken
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
        directMessages {
          nextToken
        }
        messageReplies {
          nextToken
        }
        coachingTriad {
          nextToken
        }
        userTriad {
          nextToken
        }
        courseInstructing {
          nextToken
        }
        courseBackOfficeStaff {
          nextToken
        }
        payments {
          nextToken
        }
        alertConfig {
          emailDirectMessage
          emailGroupMessage
          emailEventMessage
          emailOrgMessage
          emailResourceMessage
          emailCourseMessage
          emailPromotions
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const deletePayment = /* GraphQL */ `
  mutation DeletePayment($input: DeletePaymentInput!) {
    deletePayment(input: $input) {
      id
      productID
      product {
        id
        price
        pricePer
        isDefault
        name
        confirmationMsg
        payments {
          nextToken
        }
        isOrgTier
        isIndividualTier
        isLogin
        eula
        enabled
        isStripe
        isPaypal
        tiered {
          name
          stripePaymentID
          defaultAmount
          amountIsEditable
          isSubscription
        }
        submitButtonText
        createdAt
        updatedAt
      }
      userID
      dateCompleted
      paymentType
      paymentInfo
      createdAt
      updatedAt
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
        stripeCustomerID
        stripeSubscriptionID
        hasPaidState
        profileState
        billingAddress {
          city
          country
          line1
          line2
          postal_code
          state
        }
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        interests
        currentRole
        currentScope
        personality
        orgName
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        isArchived
        primaryOrganization
        organizations {
          nextToken
        }
        owns {
          nextToken
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
        directMessages {
          nextToken
        }
        messageReplies {
          nextToken
        }
        coachingTriad {
          nextToken
        }
        userTriad {
          nextToken
        }
        courseInstructing {
          nextToken
        }
        courseBackOfficeStaff {
          nextToken
        }
        payments {
          nextToken
        }
        alertConfig {
          emailDirectMessage
          emailGroupMessage
          emailEventMessage
          emailOrgMessage
          emailResourceMessage
          emailCourseMessage
          emailPromotions
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const createCourseInfo = /* GraphQL */ `
  mutation CreateCourseInfo($input: CreateCourseInfoInput!) {
    createCourseInfo(input: $input) {
      id
      designedBy
      summary
      courseWeeks {
        items {
          id
          week
          date
          tz
          name
          title
          leader
          courseInfoID
          createdAt
          updatedAt
        }
        nextToken
      }
      subTitle
      instructors {
        items {
          id
          courseInfoID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      backOfficeStaff {
        items {
          id
          courseInfoID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      triads {
        items {
          id
          courseInfoID
          createdAt
          updatedAt
        }
        nextToken
      }
      introduction
      separatedTriads
      sylabusAttachment
      sylabusAttachmentName
      sylabusAttachmentOwner
      createdAt
      updatedAt
    }
  }
`
export const updateCourseInfo = /* GraphQL */ `
  mutation UpdateCourseInfo($input: UpdateCourseInfoInput!) {
    updateCourseInfo(input: $input) {
      id
      designedBy
      summary
      courseWeeks {
        items {
          id
          week
          date
          tz
          name
          title
          leader
          courseInfoID
          createdAt
          updatedAt
        }
        nextToken
      }
      subTitle
      instructors {
        items {
          id
          courseInfoID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      backOfficeStaff {
        items {
          id
          courseInfoID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      triads {
        items {
          id
          courseInfoID
          createdAt
          updatedAt
        }
        nextToken
      }
      introduction
      separatedTriads
      sylabusAttachment
      sylabusAttachmentName
      sylabusAttachmentOwner
      createdAt
      updatedAt
    }
  }
`
export const deleteCourseInfo = /* GraphQL */ `
  mutation DeleteCourseInfo($input: DeleteCourseInfoInput!) {
    deleteCourseInfo(input: $input) {
      id
      designedBy
      summary
      courseWeeks {
        items {
          id
          week
          date
          tz
          name
          title
          leader
          courseInfoID
          createdAt
          updatedAt
        }
        nextToken
      }
      subTitle
      instructors {
        items {
          id
          courseInfoID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      backOfficeStaff {
        items {
          id
          courseInfoID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      triads {
        items {
          id
          courseInfoID
          createdAt
          updatedAt
        }
        nextToken
      }
      introduction
      separatedTriads
      sylabusAttachment
      sylabusAttachmentName
      sylabusAttachmentOwner
      createdAt
      updatedAt
    }
  }
`
export const createCourseTriads = /* GraphQL */ `
  mutation CreateCourseTriads($input: CreateCourseTriadsInput!) {
    createCourseTriads(input: $input) {
      id
      courseInfoID
      courseInfo {
        id
        designedBy
        summary
        courseWeeks {
          nextToken
        }
        subTitle
        instructors {
          nextToken
        }
        backOfficeStaff {
          nextToken
        }
        triads {
          nextToken
        }
        introduction
        separatedTriads
        sylabusAttachment
        sylabusAttachmentName
        sylabusAttachmentOwner
        createdAt
        updatedAt
      }
      coaches {
        items {
          id
          triadID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      users {
        items {
          id
          triadID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`
export const updateCourseTriads = /* GraphQL */ `
  mutation UpdateCourseTriads($input: UpdateCourseTriadsInput!) {
    updateCourseTriads(input: $input) {
      id
      courseInfoID
      courseInfo {
        id
        designedBy
        summary
        courseWeeks {
          nextToken
        }
        subTitle
        instructors {
          nextToken
        }
        backOfficeStaff {
          nextToken
        }
        triads {
          nextToken
        }
        introduction
        separatedTriads
        sylabusAttachment
        sylabusAttachmentName
        sylabusAttachmentOwner
        createdAt
        updatedAt
      }
      coaches {
        items {
          id
          triadID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      users {
        items {
          id
          triadID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`
export const deleteCourseTriads = /* GraphQL */ `
  mutation DeleteCourseTriads($input: DeleteCourseTriadsInput!) {
    deleteCourseTriads(input: $input) {
      id
      courseInfoID
      courseInfo {
        id
        designedBy
        summary
        courseWeeks {
          nextToken
        }
        subTitle
        instructors {
          nextToken
        }
        backOfficeStaff {
          nextToken
        }
        triads {
          nextToken
        }
        introduction
        separatedTriads
        sylabusAttachment
        sylabusAttachmentName
        sylabusAttachmentOwner
        createdAt
        updatedAt
      }
      coaches {
        items {
          id
          triadID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      users {
        items {
          id
          triadID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`
export const createCourseBackOfficeStaff = /* GraphQL */ `
  mutation CreateCourseBackOfficeStaff($input: CreateCourseBackOfficeStaffInput!) {
    createCourseBackOfficeStaff(input: $input) {
      id
      courseInfoID
      courseInfo {
        id
        designedBy
        summary
        courseWeeks {
          nextToken
        }
        subTitle
        instructors {
          nextToken
        }
        backOfficeStaff {
          nextToken
        }
        triads {
          nextToken
        }
        introduction
        separatedTriads
        sylabusAttachment
        sylabusAttachmentName
        sylabusAttachmentOwner
        createdAt
        updatedAt
      }
      userID
      createdAt
      updatedAt
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
        stripeCustomerID
        stripeSubscriptionID
        hasPaidState
        profileState
        billingAddress {
          city
          country
          line1
          line2
          postal_code
          state
        }
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        interests
        currentRole
        currentScope
        personality
        orgName
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        isArchived
        primaryOrganization
        organizations {
          nextToken
        }
        owns {
          nextToken
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
        directMessages {
          nextToken
        }
        messageReplies {
          nextToken
        }
        coachingTriad {
          nextToken
        }
        userTriad {
          nextToken
        }
        courseInstructing {
          nextToken
        }
        courseBackOfficeStaff {
          nextToken
        }
        payments {
          nextToken
        }
        alertConfig {
          emailDirectMessage
          emailGroupMessage
          emailEventMessage
          emailOrgMessage
          emailResourceMessage
          emailCourseMessage
          emailPromotions
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const updateCourseBackOfficeStaff = /* GraphQL */ `
  mutation UpdateCourseBackOfficeStaff($input: UpdateCourseBackOfficeStaffInput!) {
    updateCourseBackOfficeStaff(input: $input) {
      id
      courseInfoID
      courseInfo {
        id
        designedBy
        summary
        courseWeeks {
          nextToken
        }
        subTitle
        instructors {
          nextToken
        }
        backOfficeStaff {
          nextToken
        }
        triads {
          nextToken
        }
        introduction
        separatedTriads
        sylabusAttachment
        sylabusAttachmentName
        sylabusAttachmentOwner
        createdAt
        updatedAt
      }
      userID
      createdAt
      updatedAt
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
        stripeCustomerID
        stripeSubscriptionID
        hasPaidState
        profileState
        billingAddress {
          city
          country
          line1
          line2
          postal_code
          state
        }
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        interests
        currentRole
        currentScope
        personality
        orgName
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        isArchived
        primaryOrganization
        organizations {
          nextToken
        }
        owns {
          nextToken
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
        directMessages {
          nextToken
        }
        messageReplies {
          nextToken
        }
        coachingTriad {
          nextToken
        }
        userTriad {
          nextToken
        }
        courseInstructing {
          nextToken
        }
        courseBackOfficeStaff {
          nextToken
        }
        payments {
          nextToken
        }
        alertConfig {
          emailDirectMessage
          emailGroupMessage
          emailEventMessage
          emailOrgMessage
          emailResourceMessage
          emailCourseMessage
          emailPromotions
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const deleteCourseBackOfficeStaff = /* GraphQL */ `
  mutation DeleteCourseBackOfficeStaff($input: DeleteCourseBackOfficeStaffInput!) {
    deleteCourseBackOfficeStaff(input: $input) {
      id
      courseInfoID
      courseInfo {
        id
        designedBy
        summary
        courseWeeks {
          nextToken
        }
        subTitle
        instructors {
          nextToken
        }
        backOfficeStaff {
          nextToken
        }
        triads {
          nextToken
        }
        introduction
        separatedTriads
        sylabusAttachment
        sylabusAttachmentName
        sylabusAttachmentOwner
        createdAt
        updatedAt
      }
      userID
      createdAt
      updatedAt
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
        stripeCustomerID
        stripeSubscriptionID
        hasPaidState
        profileState
        billingAddress {
          city
          country
          line1
          line2
          postal_code
          state
        }
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        interests
        currentRole
        currentScope
        personality
        orgName
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        isArchived
        primaryOrganization
        organizations {
          nextToken
        }
        owns {
          nextToken
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
        directMessages {
          nextToken
        }
        messageReplies {
          nextToken
        }
        coachingTriad {
          nextToken
        }
        userTriad {
          nextToken
        }
        courseInstructing {
          nextToken
        }
        courseBackOfficeStaff {
          nextToken
        }
        payments {
          nextToken
        }
        alertConfig {
          emailDirectMessage
          emailGroupMessage
          emailEventMessage
          emailOrgMessage
          emailResourceMessage
          emailCourseMessage
          emailPromotions
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const createCourseInstructors = /* GraphQL */ `
  mutation CreateCourseInstructors($input: CreateCourseInstructorsInput!) {
    createCourseInstructors(input: $input) {
      id
      courseInfoID
      courseInfo {
        id
        designedBy
        summary
        courseWeeks {
          nextToken
        }
        subTitle
        instructors {
          nextToken
        }
        backOfficeStaff {
          nextToken
        }
        triads {
          nextToken
        }
        introduction
        separatedTriads
        sylabusAttachment
        sylabusAttachmentName
        sylabusAttachmentOwner
        createdAt
        updatedAt
      }
      userID
      createdAt
      updatedAt
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
        stripeCustomerID
        stripeSubscriptionID
        hasPaidState
        profileState
        billingAddress {
          city
          country
          line1
          line2
          postal_code
          state
        }
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        interests
        currentRole
        currentScope
        personality
        orgName
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        isArchived
        primaryOrganization
        organizations {
          nextToken
        }
        owns {
          nextToken
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
        directMessages {
          nextToken
        }
        messageReplies {
          nextToken
        }
        coachingTriad {
          nextToken
        }
        userTriad {
          nextToken
        }
        courseInstructing {
          nextToken
        }
        courseBackOfficeStaff {
          nextToken
        }
        payments {
          nextToken
        }
        alertConfig {
          emailDirectMessage
          emailGroupMessage
          emailEventMessage
          emailOrgMessage
          emailResourceMessage
          emailCourseMessage
          emailPromotions
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const updateCourseInstructors = /* GraphQL */ `
  mutation UpdateCourseInstructors($input: UpdateCourseInstructorsInput!) {
    updateCourseInstructors(input: $input) {
      id
      courseInfoID
      courseInfo {
        id
        designedBy
        summary
        courseWeeks {
          nextToken
        }
        subTitle
        instructors {
          nextToken
        }
        backOfficeStaff {
          nextToken
        }
        triads {
          nextToken
        }
        introduction
        separatedTriads
        sylabusAttachment
        sylabusAttachmentName
        sylabusAttachmentOwner
        createdAt
        updatedAt
      }
      userID
      createdAt
      updatedAt
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
        stripeCustomerID
        stripeSubscriptionID
        hasPaidState
        profileState
        billingAddress {
          city
          country
          line1
          line2
          postal_code
          state
        }
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        interests
        currentRole
        currentScope
        personality
        orgName
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        isArchived
        primaryOrganization
        organizations {
          nextToken
        }
        owns {
          nextToken
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
        directMessages {
          nextToken
        }
        messageReplies {
          nextToken
        }
        coachingTriad {
          nextToken
        }
        userTriad {
          nextToken
        }
        courseInstructing {
          nextToken
        }
        courseBackOfficeStaff {
          nextToken
        }
        payments {
          nextToken
        }
        alertConfig {
          emailDirectMessage
          emailGroupMessage
          emailEventMessage
          emailOrgMessage
          emailResourceMessage
          emailCourseMessage
          emailPromotions
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const deleteCourseInstructors = /* GraphQL */ `
  mutation DeleteCourseInstructors($input: DeleteCourseInstructorsInput!) {
    deleteCourseInstructors(input: $input) {
      id
      courseInfoID
      courseInfo {
        id
        designedBy
        summary
        courseWeeks {
          nextToken
        }
        subTitle
        instructors {
          nextToken
        }
        backOfficeStaff {
          nextToken
        }
        triads {
          nextToken
        }
        introduction
        separatedTriads
        sylabusAttachment
        sylabusAttachmentName
        sylabusAttachmentOwner
        createdAt
        updatedAt
      }
      userID
      createdAt
      updatedAt
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
        stripeCustomerID
        stripeSubscriptionID
        hasPaidState
        profileState
        billingAddress {
          city
          country
          line1
          line2
          postal_code
          state
        }
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        interests
        currentRole
        currentScope
        personality
        orgName
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        isArchived
        primaryOrganization
        organizations {
          nextToken
        }
        owns {
          nextToken
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
        directMessages {
          nextToken
        }
        messageReplies {
          nextToken
        }
        coachingTriad {
          nextToken
        }
        userTriad {
          nextToken
        }
        courseInstructing {
          nextToken
        }
        courseBackOfficeStaff {
          nextToken
        }
        payments {
          nextToken
        }
        alertConfig {
          emailDirectMessage
          emailGroupMessage
          emailEventMessage
          emailOrgMessage
          emailResourceMessage
          emailCourseMessage
          emailPromotions
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const createCourseTriadCoaches = /* GraphQL */ `
  mutation CreateCourseTriadCoaches($input: CreateCourseTriadCoachesInput!) {
    createCourseTriadCoaches(input: $input) {
      id
      triadID
      triad {
        id
        courseInfoID
        courseInfo {
          id
          designedBy
          summary
          subTitle
          introduction
          separatedTriads
          sylabusAttachment
          sylabusAttachmentName
          sylabusAttachmentOwner
          createdAt
          updatedAt
        }
        coaches {
          nextToken
        }
        users {
          nextToken
        }
        createdAt
        updatedAt
      }
      userID
      createdAt
      updatedAt
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
        stripeCustomerID
        stripeSubscriptionID
        hasPaidState
        profileState
        billingAddress {
          city
          country
          line1
          line2
          postal_code
          state
        }
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        interests
        currentRole
        currentScope
        personality
        orgName
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        isArchived
        primaryOrganization
        organizations {
          nextToken
        }
        owns {
          nextToken
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
        directMessages {
          nextToken
        }
        messageReplies {
          nextToken
        }
        coachingTriad {
          nextToken
        }
        userTriad {
          nextToken
        }
        courseInstructing {
          nextToken
        }
        courseBackOfficeStaff {
          nextToken
        }
        payments {
          nextToken
        }
        alertConfig {
          emailDirectMessage
          emailGroupMessage
          emailEventMessage
          emailOrgMessage
          emailResourceMessage
          emailCourseMessage
          emailPromotions
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const updateCourseTriadCoaches = /* GraphQL */ `
  mutation UpdateCourseTriadCoaches($input: UpdateCourseTriadCoachesInput!) {
    updateCourseTriadCoaches(input: $input) {
      id
      triadID
      triad {
        id
        courseInfoID
        courseInfo {
          id
          designedBy
          summary
          subTitle
          introduction
          separatedTriads
          sylabusAttachment
          sylabusAttachmentName
          sylabusAttachmentOwner
          createdAt
          updatedAt
        }
        coaches {
          nextToken
        }
        users {
          nextToken
        }
        createdAt
        updatedAt
      }
      userID
      createdAt
      updatedAt
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
        stripeCustomerID
        stripeSubscriptionID
        hasPaidState
        profileState
        billingAddress {
          city
          country
          line1
          line2
          postal_code
          state
        }
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        interests
        currentRole
        currentScope
        personality
        orgName
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        isArchived
        primaryOrganization
        organizations {
          nextToken
        }
        owns {
          nextToken
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
        directMessages {
          nextToken
        }
        messageReplies {
          nextToken
        }
        coachingTriad {
          nextToken
        }
        userTriad {
          nextToken
        }
        courseInstructing {
          nextToken
        }
        courseBackOfficeStaff {
          nextToken
        }
        payments {
          nextToken
        }
        alertConfig {
          emailDirectMessage
          emailGroupMessage
          emailEventMessage
          emailOrgMessage
          emailResourceMessage
          emailCourseMessage
          emailPromotions
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const deleteCourseTriadCoaches = /* GraphQL */ `
  mutation DeleteCourseTriadCoaches($input: DeleteCourseTriadCoachesInput!) {
    deleteCourseTriadCoaches(input: $input) {
      id
      triadID
      triad {
        id
        courseInfoID
        courseInfo {
          id
          designedBy
          summary
          subTitle
          introduction
          separatedTriads
          sylabusAttachment
          sylabusAttachmentName
          sylabusAttachmentOwner
          createdAt
          updatedAt
        }
        coaches {
          nextToken
        }
        users {
          nextToken
        }
        createdAt
        updatedAt
      }
      userID
      createdAt
      updatedAt
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
        stripeCustomerID
        stripeSubscriptionID
        hasPaidState
        profileState
        billingAddress {
          city
          country
          line1
          line2
          postal_code
          state
        }
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        interests
        currentRole
        currentScope
        personality
        orgName
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        isArchived
        primaryOrganization
        organizations {
          nextToken
        }
        owns {
          nextToken
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
        directMessages {
          nextToken
        }
        messageReplies {
          nextToken
        }
        coachingTriad {
          nextToken
        }
        userTriad {
          nextToken
        }
        courseInstructing {
          nextToken
        }
        courseBackOfficeStaff {
          nextToken
        }
        payments {
          nextToken
        }
        alertConfig {
          emailDirectMessage
          emailGroupMessage
          emailEventMessage
          emailOrgMessage
          emailResourceMessage
          emailCourseMessage
          emailPromotions
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const createCourseTriadUsers = /* GraphQL */ `
  mutation CreateCourseTriadUsers($input: CreateCourseTriadUsersInput!) {
    createCourseTriadUsers(input: $input) {
      id
      triadID
      triad {
        id
        courseInfoID
        courseInfo {
          id
          designedBy
          summary
          subTitle
          introduction
          separatedTriads
          sylabusAttachment
          sylabusAttachmentName
          sylabusAttachmentOwner
          createdAt
          updatedAt
        }
        coaches {
          nextToken
        }
        users {
          nextToken
        }
        createdAt
        updatedAt
      }
      userID
      createdAt
      updatedAt
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
        stripeCustomerID
        stripeSubscriptionID
        hasPaidState
        profileState
        billingAddress {
          city
          country
          line1
          line2
          postal_code
          state
        }
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        interests
        currentRole
        currentScope
        personality
        orgName
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        isArchived
        primaryOrganization
        organizations {
          nextToken
        }
        owns {
          nextToken
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
        directMessages {
          nextToken
        }
        messageReplies {
          nextToken
        }
        coachingTriad {
          nextToken
        }
        userTriad {
          nextToken
        }
        courseInstructing {
          nextToken
        }
        courseBackOfficeStaff {
          nextToken
        }
        payments {
          nextToken
        }
        alertConfig {
          emailDirectMessage
          emailGroupMessage
          emailEventMessage
          emailOrgMessage
          emailResourceMessage
          emailCourseMessage
          emailPromotions
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const updateCourseTriadUsers = /* GraphQL */ `
  mutation UpdateCourseTriadUsers($input: UpdateCourseTriadUsersInput!) {
    updateCourseTriadUsers(input: $input) {
      id
      triadID
      triad {
        id
        courseInfoID
        courseInfo {
          id
          designedBy
          summary
          subTitle
          introduction
          separatedTriads
          sylabusAttachment
          sylabusAttachmentName
          sylabusAttachmentOwner
          createdAt
          updatedAt
        }
        coaches {
          nextToken
        }
        users {
          nextToken
        }
        createdAt
        updatedAt
      }
      userID
      createdAt
      updatedAt
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
        stripeCustomerID
        stripeSubscriptionID
        hasPaidState
        profileState
        billingAddress {
          city
          country
          line1
          line2
          postal_code
          state
        }
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        interests
        currentRole
        currentScope
        personality
        orgName
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        isArchived
        primaryOrganization
        organizations {
          nextToken
        }
        owns {
          nextToken
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
        directMessages {
          nextToken
        }
        messageReplies {
          nextToken
        }
        coachingTriad {
          nextToken
        }
        userTriad {
          nextToken
        }
        courseInstructing {
          nextToken
        }
        courseBackOfficeStaff {
          nextToken
        }
        payments {
          nextToken
        }
        alertConfig {
          emailDirectMessage
          emailGroupMessage
          emailEventMessage
          emailOrgMessage
          emailResourceMessage
          emailCourseMessage
          emailPromotions
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const deleteCourseTriadUsers = /* GraphQL */ `
  mutation DeleteCourseTriadUsers($input: DeleteCourseTriadUsersInput!) {
    deleteCourseTriadUsers(input: $input) {
      id
      triadID
      triad {
        id
        courseInfoID
        courseInfo {
          id
          designedBy
          summary
          subTitle
          introduction
          separatedTriads
          sylabusAttachment
          sylabusAttachmentName
          sylabusAttachmentOwner
          createdAt
          updatedAt
        }
        coaches {
          nextToken
        }
        users {
          nextToken
        }
        createdAt
        updatedAt
      }
      userID
      createdAt
      updatedAt
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
        stripeCustomerID
        stripeSubscriptionID
        hasPaidState
        profileState
        billingAddress {
          city
          country
          line1
          line2
          postal_code
          state
        }
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        interests
        currentRole
        currentScope
        personality
        orgName
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        isArchived
        primaryOrganization
        organizations {
          nextToken
        }
        owns {
          nextToken
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
        directMessages {
          nextToken
        }
        messageReplies {
          nextToken
        }
        coachingTriad {
          nextToken
        }
        userTriad {
          nextToken
        }
        courseInstructing {
          nextToken
        }
        courseBackOfficeStaff {
          nextToken
        }
        payments {
          nextToken
        }
        alertConfig {
          emailDirectMessage
          emailGroupMessage
          emailEventMessage
          emailOrgMessage
          emailResourceMessage
          emailCourseMessage
          emailPromotions
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const createCourseWeek = /* GraphQL */ `
  mutation CreateCourseWeek($input: CreateCourseWeekInput!) {
    createCourseWeek(input: $input) {
      id
      week
      date
      tz
      name
      title
      leader
      courseInfoID
      courseInfo {
        id
        designedBy
        summary
        courseWeeks {
          nextToken
        }
        subTitle
        instructors {
          nextToken
        }
        backOfficeStaff {
          nextToken
        }
        triads {
          nextToken
        }
        introduction
        separatedTriads
        sylabusAttachment
        sylabusAttachmentName
        sylabusAttachmentOwner
        createdAt
        updatedAt
      }
      lessons {
        items {
          id
          lesson
          lessonType
          name
          time
          tz
          duration
          zoomUrl
          zoomRecording
          courseLessonResponseId
          wordCount
          description
          courseWeekID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`
export const updateCourseWeek = /* GraphQL */ `
  mutation UpdateCourseWeek($input: UpdateCourseWeekInput!) {
    updateCourseWeek(input: $input) {
      id
      week
      date
      tz
      name
      title
      leader
      courseInfoID
      courseInfo {
        id
        designedBy
        summary
        courseWeeks {
          nextToken
        }
        subTitle
        instructors {
          nextToken
        }
        backOfficeStaff {
          nextToken
        }
        triads {
          nextToken
        }
        introduction
        separatedTriads
        sylabusAttachment
        sylabusAttachmentName
        sylabusAttachmentOwner
        createdAt
        updatedAt
      }
      lessons {
        items {
          id
          lesson
          lessonType
          name
          time
          tz
          duration
          zoomUrl
          zoomRecording
          courseLessonResponseId
          wordCount
          description
          courseWeekID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`
export const deleteCourseWeek = /* GraphQL */ `
  mutation DeleteCourseWeek($input: DeleteCourseWeekInput!) {
    deleteCourseWeek(input: $input) {
      id
      week
      date
      tz
      name
      title
      leader
      courseInfoID
      courseInfo {
        id
        designedBy
        summary
        courseWeeks {
          nextToken
        }
        subTitle
        instructors {
          nextToken
        }
        backOfficeStaff {
          nextToken
        }
        triads {
          nextToken
        }
        introduction
        separatedTriads
        sylabusAttachment
        sylabusAttachmentName
        sylabusAttachmentOwner
        createdAt
        updatedAt
      }
      lessons {
        items {
          id
          lesson
          lessonType
          name
          time
          tz
          duration
          zoomUrl
          zoomRecording
          courseLessonResponseId
          wordCount
          description
          courseWeekID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`
export const createCourseLesson = /* GraphQL */ `
  mutation CreateCourseLesson($input: CreateCourseLessonInput!) {
    createCourseLesson(input: $input) {
      id
      lesson
      lessonType
      name
      time
      tz
      duration
      zoomUrl
      zoomRecording
      courseLessonResponseId
      wordCount
      description
      courseWeekID
      courseWeek {
        id
        week
        date
        tz
        name
        title
        leader
        courseInfoID
        courseInfo {
          id
          designedBy
          summary
          subTitle
          introduction
          separatedTriads
          sylabusAttachment
          sylabusAttachmentName
          sylabusAttachmentOwner
          createdAt
          updatedAt
        }
        lessons {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const updateCourseLesson = /* GraphQL */ `
  mutation UpdateCourseLesson($input: UpdateCourseLessonInput!) {
    updateCourseLesson(input: $input) {
      id
      lesson
      lessonType
      name
      time
      tz
      duration
      zoomUrl
      zoomRecording
      courseLessonResponseId
      wordCount
      description
      courseWeekID
      courseWeek {
        id
        week
        date
        tz
        name
        title
        leader
        courseInfoID
        courseInfo {
          id
          designedBy
          summary
          subTitle
          introduction
          separatedTriads
          sylabusAttachment
          sylabusAttachmentName
          sylabusAttachmentOwner
          createdAt
          updatedAt
        }
        lessons {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const deleteCourseLesson = /* GraphQL */ `
  mutation DeleteCourseLesson($input: DeleteCourseLessonInput!) {
    deleteCourseLesson(input: $input) {
      id
      lesson
      lessonType
      name
      time
      tz
      duration
      zoomUrl
      zoomRecording
      courseLessonResponseId
      wordCount
      description
      courseWeekID
      courseWeek {
        id
        week
        date
        tz
        name
        title
        leader
        courseInfoID
        courseInfo {
          id
          designedBy
          summary
          subTitle
          introduction
          separatedTriads
          sylabusAttachment
          sylabusAttachmentName
          sylabusAttachmentOwner
          createdAt
          updatedAt
        }
        lessons {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const createDirectMessageUser = /* GraphQL */ `
  mutation CreateDirectMessageUser($input: CreateDirectMessageUserInput!) {
    createDirectMessageUser(input: $input) {
      id
      userName
      userID
      roomID
      room {
        id
        name
        messageUsers {
          nextToken
        }
        directMessage {
          nextToken
        }
        roomType
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
        stripeCustomerID
        stripeSubscriptionID
        hasPaidState
        profileState
        billingAddress {
          city
          country
          line1
          line2
          postal_code
          state
        }
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        interests
        currentRole
        currentScope
        personality
        orgName
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        isArchived
        primaryOrganization
        organizations {
          nextToken
        }
        owns {
          nextToken
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
        directMessages {
          nextToken
        }
        messageReplies {
          nextToken
        }
        coachingTriad {
          nextToken
        }
        userTriad {
          nextToken
        }
        courseInstructing {
          nextToken
        }
        courseBackOfficeStaff {
          nextToken
        }
        payments {
          nextToken
        }
        alertConfig {
          emailDirectMessage
          emailGroupMessage
          emailEventMessage
          emailOrgMessage
          emailResourceMessage
          emailCourseMessage
          emailPromotions
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const updateDirectMessageUser = /* GraphQL */ `
  mutation UpdateDirectMessageUser($input: UpdateDirectMessageUserInput!) {
    updateDirectMessageUser(input: $input) {
      id
      userName
      userID
      roomID
      room {
        id
        name
        messageUsers {
          nextToken
        }
        directMessage {
          nextToken
        }
        roomType
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
        stripeCustomerID
        stripeSubscriptionID
        hasPaidState
        profileState
        billingAddress {
          city
          country
          line1
          line2
          postal_code
          state
        }
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        interests
        currentRole
        currentScope
        personality
        orgName
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        isArchived
        primaryOrganization
        organizations {
          nextToken
        }
        owns {
          nextToken
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
        directMessages {
          nextToken
        }
        messageReplies {
          nextToken
        }
        coachingTriad {
          nextToken
        }
        userTriad {
          nextToken
        }
        courseInstructing {
          nextToken
        }
        courseBackOfficeStaff {
          nextToken
        }
        payments {
          nextToken
        }
        alertConfig {
          emailDirectMessage
          emailGroupMessage
          emailEventMessage
          emailOrgMessage
          emailResourceMessage
          emailCourseMessage
          emailPromotions
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const deleteDirectMessageUser = /* GraphQL */ `
  mutation DeleteDirectMessageUser($input: DeleteDirectMessageUserInput!) {
    deleteDirectMessageUser(input: $input) {
      id
      userName
      userID
      roomID
      room {
        id
        name
        messageUsers {
          nextToken
        }
        directMessage {
          nextToken
        }
        roomType
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
        stripeCustomerID
        stripeSubscriptionID
        hasPaidState
        profileState
        billingAddress {
          city
          country
          line1
          line2
          postal_code
          state
        }
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        interests
        currentRole
        currentScope
        personality
        orgName
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        isArchived
        primaryOrganization
        organizations {
          nextToken
        }
        owns {
          nextToken
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
        directMessages {
          nextToken
        }
        messageReplies {
          nextToken
        }
        coachingTriad {
          nextToken
        }
        userTriad {
          nextToken
        }
        courseInstructing {
          nextToken
        }
        courseBackOfficeStaff {
          nextToken
        }
        payments {
          nextToken
        }
        alertConfig {
          emailDirectMessage
          emailGroupMessage
          emailEventMessage
          emailOrgMessage
          emailResourceMessage
          emailCourseMessage
          emailPromotions
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const createDirectMessageRoom = /* GraphQL */ `
  mutation CreateDirectMessageRoom($input: CreateDirectMessageRoomInput!) {
    createDirectMessageRoom(input: $input) {
      id
      name
      messageUsers {
        items {
          id
          userName
          userID
          roomID
          createdAt
          updatedAt
        }
        nextToken
      }
      directMessage {
        items {
          id
          content
          attachment
          attachmentName
          attachmentOwner
          when
          recipients
          userId
          messageRoomID
          createdAt
          updatedAt
        }
        nextToken
      }
      roomType
      createdAt
      updatedAt
    }
  }
`
export const updateDirectMessageRoom = /* GraphQL */ `
  mutation UpdateDirectMessageRoom($input: UpdateDirectMessageRoomInput!) {
    updateDirectMessageRoom(input: $input) {
      id
      name
      messageUsers {
        items {
          id
          userName
          userID
          roomID
          createdAt
          updatedAt
        }
        nextToken
      }
      directMessage {
        items {
          id
          content
          attachment
          attachmentName
          attachmentOwner
          when
          recipients
          userId
          messageRoomID
          createdAt
          updatedAt
        }
        nextToken
      }
      roomType
      createdAt
      updatedAt
    }
  }
`
export const deleteDirectMessageRoom = /* GraphQL */ `
  mutation DeleteDirectMessageRoom($input: DeleteDirectMessageRoomInput!) {
    deleteDirectMessageRoom(input: $input) {
      id
      name
      messageUsers {
        items {
          id
          userName
          userID
          roomID
          createdAt
          updatedAt
        }
        nextToken
      }
      directMessage {
        items {
          id
          content
          attachment
          attachmentName
          attachmentOwner
          when
          recipients
          userId
          messageRoomID
          createdAt
          updatedAt
        }
        nextToken
      }
      roomType
      createdAt
      updatedAt
    }
  }
`
export const createDirectMessage = /* GraphQL */ `
  mutation CreateDirectMessage($input: CreateDirectMessageInput!) {
    createDirectMessage(input: $input) {
      id
      content
      attachment
      attachmentName
      attachmentOwner
      when
      recipients
      userId
      replies {
        items {
          id
          content
          when
          attachment
          attachmentName
          attachmentOwner
          recipients
          userId
          messageId
          messageRoomID
          parentReplyId
          createdAt
          updatedAt
        }
        nextToken
      }
      messageRoomID
      messageRoom {
        id
        name
        messageUsers {
          nextToken
        }
        directMessage {
          nextToken
        }
        roomType
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      author {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
        stripeCustomerID
        stripeSubscriptionID
        hasPaidState
        profileState
        billingAddress {
          city
          country
          line1
          line2
          postal_code
          state
        }
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        interests
        currentRole
        currentScope
        personality
        orgName
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        isArchived
        primaryOrganization
        organizations {
          nextToken
        }
        owns {
          nextToken
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
        directMessages {
          nextToken
        }
        messageReplies {
          nextToken
        }
        coachingTriad {
          nextToken
        }
        userTriad {
          nextToken
        }
        courseInstructing {
          nextToken
        }
        courseBackOfficeStaff {
          nextToken
        }
        payments {
          nextToken
        }
        alertConfig {
          emailDirectMessage
          emailGroupMessage
          emailEventMessage
          emailOrgMessage
          emailResourceMessage
          emailCourseMessage
          emailPromotions
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const updateDirectMessage = /* GraphQL */ `
  mutation UpdateDirectMessage($input: UpdateDirectMessageInput!) {
    updateDirectMessage(input: $input) {
      id
      content
      attachment
      attachmentName
      attachmentOwner
      when
      recipients
      userId
      replies {
        items {
          id
          content
          when
          attachment
          attachmentName
          attachmentOwner
          recipients
          userId
          messageId
          messageRoomID
          parentReplyId
          createdAt
          updatedAt
        }
        nextToken
      }
      messageRoomID
      messageRoom {
        id
        name
        messageUsers {
          nextToken
        }
        directMessage {
          nextToken
        }
        roomType
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      author {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
        stripeCustomerID
        stripeSubscriptionID
        hasPaidState
        profileState
        billingAddress {
          city
          country
          line1
          line2
          postal_code
          state
        }
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        interests
        currentRole
        currentScope
        personality
        orgName
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        isArchived
        primaryOrganization
        organizations {
          nextToken
        }
        owns {
          nextToken
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
        directMessages {
          nextToken
        }
        messageReplies {
          nextToken
        }
        coachingTriad {
          nextToken
        }
        userTriad {
          nextToken
        }
        courseInstructing {
          nextToken
        }
        courseBackOfficeStaff {
          nextToken
        }
        payments {
          nextToken
        }
        alertConfig {
          emailDirectMessage
          emailGroupMessage
          emailEventMessage
          emailOrgMessage
          emailResourceMessage
          emailCourseMessage
          emailPromotions
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const deleteDirectMessage = /* GraphQL */ `
  mutation DeleteDirectMessage($input: DeleteDirectMessageInput!) {
    deleteDirectMessage(input: $input) {
      id
      content
      attachment
      attachmentName
      attachmentOwner
      when
      recipients
      userId
      replies {
        items {
          id
          content
          when
          attachment
          attachmentName
          attachmentOwner
          recipients
          userId
          messageId
          messageRoomID
          parentReplyId
          createdAt
          updatedAt
        }
        nextToken
      }
      messageRoomID
      messageRoom {
        id
        name
        messageUsers {
          nextToken
        }
        directMessage {
          nextToken
        }
        roomType
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      author {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
        stripeCustomerID
        stripeSubscriptionID
        hasPaidState
        profileState
        billingAddress {
          city
          country
          line1
          line2
          postal_code
          state
        }
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        interests
        currentRole
        currentScope
        personality
        orgName
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        isArchived
        primaryOrganization
        organizations {
          nextToken
        }
        owns {
          nextToken
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
        directMessages {
          nextToken
        }
        messageReplies {
          nextToken
        }
        coachingTriad {
          nextToken
        }
        userTriad {
          nextToken
        }
        courseInstructing {
          nextToken
        }
        courseBackOfficeStaff {
          nextToken
        }
        payments {
          nextToken
        }
        alertConfig {
          emailDirectMessage
          emailGroupMessage
          emailEventMessage
          emailOrgMessage
          emailResourceMessage
          emailCourseMessage
          emailPromotions
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const createDirectMessageReply = /* GraphQL */ `
  mutation CreateDirectMessageReply($input: CreateDirectMessageReplyInput!) {
    createDirectMessageReply(input: $input) {
      id
      content
      when
      attachment
      attachmentName
      attachmentOwner
      recipients
      userId
      messageId
      parentMessage {
        id
        content
        attachment
        attachmentName
        attachmentOwner
        when
        recipients
        userId
        replies {
          nextToken
        }
        messageRoomID
        messageRoom {
          id
          name
          roomType
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        author {
          id
          given_name
          family_name
          email
          phone
          owner
          mainUserGroup
          stripeCustomerID
          stripeSubscriptionID
          hasPaidState
          profileState
          aboutMeShort
          aboutMeLong
          interests
          currentRole
          currentScope
          personality
          orgName
          orgType
          orgSize
          denomination
          pplServed
          sundayAttendance
          numberVolunteers
          orgDescription
          joined
          isArchived
          primaryOrganization
          createdAt
          updatedAt
        }
      }
      messageRoomID
      parentReplyId
      parentReply {
        id
        content
        when
        attachment
        attachmentName
        attachmentOwner
        recipients
        userId
        messageId
        parentMessage {
          id
          content
          attachment
          attachmentName
          attachmentOwner
          when
          recipients
          userId
          messageRoomID
          createdAt
          updatedAt
        }
        messageRoomID
        parentReplyId
        parentReply {
          id
          content
          when
          attachment
          attachmentName
          attachmentOwner
          recipients
          userId
          messageId
          messageRoomID
          parentReplyId
          createdAt
          updatedAt
        }
        subReplies {
          nextToken
        }
        createdAt
        updatedAt
        author {
          id
          given_name
          family_name
          email
          phone
          owner
          mainUserGroup
          stripeCustomerID
          stripeSubscriptionID
          hasPaidState
          profileState
          aboutMeShort
          aboutMeLong
          interests
          currentRole
          currentScope
          personality
          orgName
          orgType
          orgSize
          denomination
          pplServed
          sundayAttendance
          numberVolunteers
          orgDescription
          joined
          isArchived
          primaryOrganization
          createdAt
          updatedAt
        }
      }
      subReplies {
        items {
          id
          content
          when
          attachment
          attachmentName
          attachmentOwner
          recipients
          userId
          messageId
          messageRoomID
          parentReplyId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      author {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
        stripeCustomerID
        stripeSubscriptionID
        hasPaidState
        profileState
        billingAddress {
          city
          country
          line1
          line2
          postal_code
          state
        }
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        interests
        currentRole
        currentScope
        personality
        orgName
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        isArchived
        primaryOrganization
        organizations {
          nextToken
        }
        owns {
          nextToken
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
        directMessages {
          nextToken
        }
        messageReplies {
          nextToken
        }
        coachingTriad {
          nextToken
        }
        userTriad {
          nextToken
        }
        courseInstructing {
          nextToken
        }
        courseBackOfficeStaff {
          nextToken
        }
        payments {
          nextToken
        }
        alertConfig {
          emailDirectMessage
          emailGroupMessage
          emailEventMessage
          emailOrgMessage
          emailResourceMessage
          emailCourseMessage
          emailPromotions
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const updateDirectMessageReply = /* GraphQL */ `
  mutation UpdateDirectMessageReply($input: UpdateDirectMessageReplyInput!) {
    updateDirectMessageReply(input: $input) {
      id
      content
      when
      attachment
      attachmentName
      attachmentOwner
      recipients
      userId
      messageId
      parentMessage {
        id
        content
        attachment
        attachmentName
        attachmentOwner
        when
        recipients
        userId
        replies {
          nextToken
        }
        messageRoomID
        messageRoom {
          id
          name
          roomType
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        author {
          id
          given_name
          family_name
          email
          phone
          owner
          mainUserGroup
          stripeCustomerID
          stripeSubscriptionID
          hasPaidState
          profileState
          aboutMeShort
          aboutMeLong
          interests
          currentRole
          currentScope
          personality
          orgName
          orgType
          orgSize
          denomination
          pplServed
          sundayAttendance
          numberVolunteers
          orgDescription
          joined
          isArchived
          primaryOrganization
          createdAt
          updatedAt
        }
      }
      messageRoomID
      parentReplyId
      parentReply {
        id
        content
        when
        attachment
        attachmentName
        attachmentOwner
        recipients
        userId
        messageId
        parentMessage {
          id
          content
          attachment
          attachmentName
          attachmentOwner
          when
          recipients
          userId
          messageRoomID
          createdAt
          updatedAt
        }
        messageRoomID
        parentReplyId
        parentReply {
          id
          content
          when
          attachment
          attachmentName
          attachmentOwner
          recipients
          userId
          messageId
          messageRoomID
          parentReplyId
          createdAt
          updatedAt
        }
        subReplies {
          nextToken
        }
        createdAt
        updatedAt
        author {
          id
          given_name
          family_name
          email
          phone
          owner
          mainUserGroup
          stripeCustomerID
          stripeSubscriptionID
          hasPaidState
          profileState
          aboutMeShort
          aboutMeLong
          interests
          currentRole
          currentScope
          personality
          orgName
          orgType
          orgSize
          denomination
          pplServed
          sundayAttendance
          numberVolunteers
          orgDescription
          joined
          isArchived
          primaryOrganization
          createdAt
          updatedAt
        }
      }
      subReplies {
        items {
          id
          content
          when
          attachment
          attachmentName
          attachmentOwner
          recipients
          userId
          messageId
          messageRoomID
          parentReplyId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      author {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
        stripeCustomerID
        stripeSubscriptionID
        hasPaidState
        profileState
        billingAddress {
          city
          country
          line1
          line2
          postal_code
          state
        }
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        interests
        currentRole
        currentScope
        personality
        orgName
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        isArchived
        primaryOrganization
        organizations {
          nextToken
        }
        owns {
          nextToken
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
        directMessages {
          nextToken
        }
        messageReplies {
          nextToken
        }
        coachingTriad {
          nextToken
        }
        userTriad {
          nextToken
        }
        courseInstructing {
          nextToken
        }
        courseBackOfficeStaff {
          nextToken
        }
        payments {
          nextToken
        }
        alertConfig {
          emailDirectMessage
          emailGroupMessage
          emailEventMessage
          emailOrgMessage
          emailResourceMessage
          emailCourseMessage
          emailPromotions
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const deleteDirectMessageReply = /* GraphQL */ `
  mutation DeleteDirectMessageReply($input: DeleteDirectMessageReplyInput!) {
    deleteDirectMessageReply(input: $input) {
      id
      content
      when
      attachment
      attachmentName
      attachmentOwner
      recipients
      userId
      messageId
      parentMessage {
        id
        content
        attachment
        attachmentName
        attachmentOwner
        when
        recipients
        userId
        replies {
          nextToken
        }
        messageRoomID
        messageRoom {
          id
          name
          roomType
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        author {
          id
          given_name
          family_name
          email
          phone
          owner
          mainUserGroup
          stripeCustomerID
          stripeSubscriptionID
          hasPaidState
          profileState
          aboutMeShort
          aboutMeLong
          interests
          currentRole
          currentScope
          personality
          orgName
          orgType
          orgSize
          denomination
          pplServed
          sundayAttendance
          numberVolunteers
          orgDescription
          joined
          isArchived
          primaryOrganization
          createdAt
          updatedAt
        }
      }
      messageRoomID
      parentReplyId
      parentReply {
        id
        content
        when
        attachment
        attachmentName
        attachmentOwner
        recipients
        userId
        messageId
        parentMessage {
          id
          content
          attachment
          attachmentName
          attachmentOwner
          when
          recipients
          userId
          messageRoomID
          createdAt
          updatedAt
        }
        messageRoomID
        parentReplyId
        parentReply {
          id
          content
          when
          attachment
          attachmentName
          attachmentOwner
          recipients
          userId
          messageId
          messageRoomID
          parentReplyId
          createdAt
          updatedAt
        }
        subReplies {
          nextToken
        }
        createdAt
        updatedAt
        author {
          id
          given_name
          family_name
          email
          phone
          owner
          mainUserGroup
          stripeCustomerID
          stripeSubscriptionID
          hasPaidState
          profileState
          aboutMeShort
          aboutMeLong
          interests
          currentRole
          currentScope
          personality
          orgName
          orgType
          orgSize
          denomination
          pplServed
          sundayAttendance
          numberVolunteers
          orgDescription
          joined
          isArchived
          primaryOrganization
          createdAt
          updatedAt
        }
      }
      subReplies {
        items {
          id
          content
          when
          attachment
          attachmentName
          attachmentOwner
          recipients
          userId
          messageId
          messageRoomID
          parentReplyId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      author {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
        stripeCustomerID
        stripeSubscriptionID
        hasPaidState
        profileState
        billingAddress {
          city
          country
          line1
          line2
          postal_code
          state
        }
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        interests
        currentRole
        currentScope
        personality
        orgName
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        isArchived
        primaryOrganization
        organizations {
          nextToken
        }
        owns {
          nextToken
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
        directMessages {
          nextToken
        }
        messageReplies {
          nextToken
        }
        coachingTriad {
          nextToken
        }
        userTriad {
          nextToken
        }
        courseInstructing {
          nextToken
        }
        courseBackOfficeStaff {
          nextToken
        }
        payments {
          nextToken
        }
        alertConfig {
          emailDirectMessage
          emailGroupMessage
          emailEventMessage
          emailOrgMessage
          emailResourceMessage
          emailCourseMessage
          emailPromotions
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const createCRMRoot = /* GraphQL */ `
  mutation CreateCRMRoot($input: CreateCRMRootInput!) {
    createCRMRoot(input: $input) {
      id
      messages {
        items {
          id
          rootId
          content
          when
          authorName
          authorId
          attachment
          attachmentOwner
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`
export const updateCRMRoot = /* GraphQL */ `
  mutation UpdateCRMRoot($input: UpdateCRMRootInput!) {
    updateCRMRoot(input: $input) {
      id
      messages {
        items {
          id
          rootId
          content
          when
          authorName
          authorId
          attachment
          attachmentOwner
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`
export const deleteCRMRoot = /* GraphQL */ `
  mutation DeleteCRMRoot($input: DeleteCRMRootInput!) {
    deleteCRMRoot(input: $input) {
      id
      messages {
        items {
          id
          rootId
          content
          when
          authorName
          authorId
          attachment
          attachmentOwner
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`
export const createCRMMessage = /* GraphQL */ `
  mutation CreateCRMMessage($input: CreateCRMMessageInput!) {
    createCRMMessage(input: $input) {
      id
      rootId
      crmRoot {
        id
        messages {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      when
      authorName
      authorId
      attachment
      attachmentOwner
      thread {
        items {
          id
          rootId
          content
          when
          authorName
          authorId
          attachment
          attachmentOwner
          parentId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`
export const updateCRMMessage = /* GraphQL */ `
  mutation UpdateCRMMessage($input: UpdateCRMMessageInput!) {
    updateCRMMessage(input: $input) {
      id
      rootId
      crmRoot {
        id
        messages {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      when
      authorName
      authorId
      attachment
      attachmentOwner
      thread {
        items {
          id
          rootId
          content
          when
          authorName
          authorId
          attachment
          attachmentOwner
          parentId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`
export const deleteCRMMessage = /* GraphQL */ `
  mutation DeleteCRMMessage($input: DeleteCRMMessageInput!) {
    deleteCRMMessage(input: $input) {
      id
      rootId
      crmRoot {
        id
        messages {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      when
      authorName
      authorId
      attachment
      attachmentOwner
      thread {
        items {
          id
          rootId
          content
          when
          authorName
          authorId
          attachment
          attachmentOwner
          parentId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`
export const createCRMReply = /* GraphQL */ `
  mutation CreateCRMReply($input: CreateCRMReplyInput!) {
    createCRMReply(input: $input) {
      id
      rootId
      content
      when
      authorName
      authorId
      attachment
      attachmentOwner
      parentId
      parent {
        id
        rootId
        crmRoot {
          id
          createdAt
          updatedAt
        }
        content
        when
        authorName
        authorId
        attachment
        attachmentOwner
        thread {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const updateCRMReply = /* GraphQL */ `
  mutation UpdateCRMReply($input: UpdateCRMReplyInput!) {
    updateCRMReply(input: $input) {
      id
      rootId
      content
      when
      authorName
      authorId
      attachment
      attachmentOwner
      parentId
      parent {
        id
        rootId
        crmRoot {
          id
          createdAt
          updatedAt
        }
        content
        when
        authorName
        authorId
        attachment
        attachmentOwner
        thread {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const deleteCRMReply = /* GraphQL */ `
  mutation DeleteCRMReply($input: DeleteCRMReplyInput!) {
    deleteCRMReply(input: $input) {
      id
      rootId
      content
      when
      authorName
      authorId
      attachment
      attachmentOwner
      parentId
      parent {
        id
        rootId
        crmRoot {
          id
          createdAt
          updatedAt
        }
        content
        when
        authorName
        authorId
        attachment
        attachmentOwner
        thread {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const createMessage = /* GraphQL */ `
  mutation CreateMessage($input: CreateMessageInput!) {
    createMessage(input: $input) {
      id
      content
      when
      attachment
      attachmentName
      attachmentOwner
      roomId
      userId
      postingAs
      owner
      room {
        id
        owner
        readGroups
        ownerOrgID
        ownerOrg {
          id
          orgName
          adminEmail
          phone
          admins
          superAdmin
          hasPaidState
          profileState
          address
          city
          province
          postalCode
          country
          aboutMeShort
          aboutMeLong
          orgType
          orgSize
          denomination
          pplServed
          sundayAttendance
          numberVolunteers
          orgDescription
          joined
          parentOrganizationId
          createdAt
          updatedAt
        }
        type
        name
        description
        memberCount
        members {
          nextToken
        }
        image
        time
        lastUpdated
        location
        locationLatLong {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        length
        effort
        cost
        promotionalText
        messages {
          nextToken
        }
        eventType
        eventUrl
        tz
        isSponsored
        createdAt
        updatedAt
        ownerUser {
          id
          given_name
          family_name
          email
          phone
          owner
          mainUserGroup
          stripeCustomerID
          stripeSubscriptionID
          hasPaidState
          profileState
          aboutMeShort
          aboutMeLong
          interests
          currentRole
          currentScope
          personality
          orgName
          orgType
          orgSize
          denomination
          pplServed
          sundayAttendance
          numberVolunteers
          orgDescription
          joined
          isArchived
          primaryOrganization
          createdAt
          updatedAt
        }
      }
      replies {
        items {
          id
          content
          when
          attachment
          attachmentName
          attachmentOwner
          userId
          messageId
          roomId
          parentReplyId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      author {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
        stripeCustomerID
        stripeSubscriptionID
        hasPaidState
        profileState
        billingAddress {
          city
          country
          line1
          line2
          postal_code
          state
        }
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        interests
        currentRole
        currentScope
        personality
        orgName
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        isArchived
        primaryOrganization
        organizations {
          nextToken
        }
        owns {
          nextToken
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
        directMessages {
          nextToken
        }
        messageReplies {
          nextToken
        }
        coachingTriad {
          nextToken
        }
        userTriad {
          nextToken
        }
        courseInstructing {
          nextToken
        }
        courseBackOfficeStaff {
          nextToken
        }
        payments {
          nextToken
        }
        alertConfig {
          emailDirectMessage
          emailGroupMessage
          emailEventMessage
          emailOrgMessage
          emailResourceMessage
          emailCourseMessage
          emailPromotions
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage($input: UpdateMessageInput!) {
    updateMessage(input: $input) {
      id
      content
      when
      attachment
      attachmentName
      attachmentOwner
      roomId
      userId
      postingAs
      owner
      room {
        id
        owner
        readGroups
        ownerOrgID
        ownerOrg {
          id
          orgName
          adminEmail
          phone
          admins
          superAdmin
          hasPaidState
          profileState
          address
          city
          province
          postalCode
          country
          aboutMeShort
          aboutMeLong
          orgType
          orgSize
          denomination
          pplServed
          sundayAttendance
          numberVolunteers
          orgDescription
          joined
          parentOrganizationId
          createdAt
          updatedAt
        }
        type
        name
        description
        memberCount
        members {
          nextToken
        }
        image
        time
        lastUpdated
        location
        locationLatLong {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        length
        effort
        cost
        promotionalText
        messages {
          nextToken
        }
        eventType
        eventUrl
        tz
        isSponsored
        createdAt
        updatedAt
        ownerUser {
          id
          given_name
          family_name
          email
          phone
          owner
          mainUserGroup
          stripeCustomerID
          stripeSubscriptionID
          hasPaidState
          profileState
          aboutMeShort
          aboutMeLong
          interests
          currentRole
          currentScope
          personality
          orgName
          orgType
          orgSize
          denomination
          pplServed
          sundayAttendance
          numberVolunteers
          orgDescription
          joined
          isArchived
          primaryOrganization
          createdAt
          updatedAt
        }
      }
      replies {
        items {
          id
          content
          when
          attachment
          attachmentName
          attachmentOwner
          userId
          messageId
          roomId
          parentReplyId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      author {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
        stripeCustomerID
        stripeSubscriptionID
        hasPaidState
        profileState
        billingAddress {
          city
          country
          line1
          line2
          postal_code
          state
        }
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        interests
        currentRole
        currentScope
        personality
        orgName
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        isArchived
        primaryOrganization
        organizations {
          nextToken
        }
        owns {
          nextToken
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
        directMessages {
          nextToken
        }
        messageReplies {
          nextToken
        }
        coachingTriad {
          nextToken
        }
        userTriad {
          nextToken
        }
        courseInstructing {
          nextToken
        }
        courseBackOfficeStaff {
          nextToken
        }
        payments {
          nextToken
        }
        alertConfig {
          emailDirectMessage
          emailGroupMessage
          emailEventMessage
          emailOrgMessage
          emailResourceMessage
          emailCourseMessage
          emailPromotions
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage($input: DeleteMessageInput!) {
    deleteMessage(input: $input) {
      id
      content
      when
      attachment
      attachmentName
      attachmentOwner
      roomId
      userId
      postingAs
      owner
      room {
        id
        owner
        readGroups
        ownerOrgID
        ownerOrg {
          id
          orgName
          adminEmail
          phone
          admins
          superAdmin
          hasPaidState
          profileState
          address
          city
          province
          postalCode
          country
          aboutMeShort
          aboutMeLong
          orgType
          orgSize
          denomination
          pplServed
          sundayAttendance
          numberVolunteers
          orgDescription
          joined
          parentOrganizationId
          createdAt
          updatedAt
        }
        type
        name
        description
        memberCount
        members {
          nextToken
        }
        image
        time
        lastUpdated
        location
        locationLatLong {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        length
        effort
        cost
        promotionalText
        messages {
          nextToken
        }
        eventType
        eventUrl
        tz
        isSponsored
        createdAt
        updatedAt
        ownerUser {
          id
          given_name
          family_name
          email
          phone
          owner
          mainUserGroup
          stripeCustomerID
          stripeSubscriptionID
          hasPaidState
          profileState
          aboutMeShort
          aboutMeLong
          interests
          currentRole
          currentScope
          personality
          orgName
          orgType
          orgSize
          denomination
          pplServed
          sundayAttendance
          numberVolunteers
          orgDescription
          joined
          isArchived
          primaryOrganization
          createdAt
          updatedAt
        }
      }
      replies {
        items {
          id
          content
          when
          attachment
          attachmentName
          attachmentOwner
          userId
          messageId
          roomId
          parentReplyId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      author {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
        stripeCustomerID
        stripeSubscriptionID
        hasPaidState
        profileState
        billingAddress {
          city
          country
          line1
          line2
          postal_code
          state
        }
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        interests
        currentRole
        currentScope
        personality
        orgName
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        isArchived
        primaryOrganization
        organizations {
          nextToken
        }
        owns {
          nextToken
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
        directMessages {
          nextToken
        }
        messageReplies {
          nextToken
        }
        coachingTriad {
          nextToken
        }
        userTriad {
          nextToken
        }
        courseInstructing {
          nextToken
        }
        courseBackOfficeStaff {
          nextToken
        }
        payments {
          nextToken
        }
        alertConfig {
          emailDirectMessage
          emailGroupMessage
          emailEventMessage
          emailOrgMessage
          emailResourceMessage
          emailCourseMessage
          emailPromotions
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const createReply = /* GraphQL */ `
  mutation CreateReply($input: CreateReplyInput!) {
    createReply(input: $input) {
      id
      content
      when
      attachment
      attachmentName
      attachmentOwner
      userId
      messageId
      parentMessage {
        id
        content
        when
        attachment
        attachmentName
        attachmentOwner
        roomId
        userId
        postingAs
        owner
        room {
          id
          owner
          readGroups
          ownerOrgID
          type
          name
          description
          memberCount
          image
          time
          lastUpdated
          location
          length
          effort
          cost
          promotionalText
          eventType
          eventUrl
          tz
          isSponsored
          createdAt
          updatedAt
        }
        replies {
          nextToken
        }
        createdAt
        updatedAt
        author {
          id
          given_name
          family_name
          email
          phone
          owner
          mainUserGroup
          stripeCustomerID
          stripeSubscriptionID
          hasPaidState
          profileState
          aboutMeShort
          aboutMeLong
          interests
          currentRole
          currentScope
          personality
          orgName
          orgType
          orgSize
          denomination
          pplServed
          sundayAttendance
          numberVolunteers
          orgDescription
          joined
          isArchived
          primaryOrganization
          createdAt
          updatedAt
        }
      }
      roomId
      parentReplyId
      parentReply {
        id
        content
        when
        attachment
        attachmentName
        attachmentOwner
        userId
        messageId
        parentMessage {
          id
          content
          when
          attachment
          attachmentName
          attachmentOwner
          roomId
          userId
          postingAs
          owner
          createdAt
          updatedAt
        }
        roomId
        parentReplyId
        parentReply {
          id
          content
          when
          attachment
          attachmentName
          attachmentOwner
          userId
          messageId
          roomId
          parentReplyId
          createdAt
          updatedAt
        }
        subReplies {
          nextToken
        }
        createdAt
        updatedAt
        author {
          id
          given_name
          family_name
          email
          phone
          owner
          mainUserGroup
          stripeCustomerID
          stripeSubscriptionID
          hasPaidState
          profileState
          aboutMeShort
          aboutMeLong
          interests
          currentRole
          currentScope
          personality
          orgName
          orgType
          orgSize
          denomination
          pplServed
          sundayAttendance
          numberVolunteers
          orgDescription
          joined
          isArchived
          primaryOrganization
          createdAt
          updatedAt
        }
      }
      subReplies {
        items {
          id
          content
          when
          attachment
          attachmentName
          attachmentOwner
          userId
          messageId
          roomId
          parentReplyId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      author {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
        stripeCustomerID
        stripeSubscriptionID
        hasPaidState
        profileState
        billingAddress {
          city
          country
          line1
          line2
          postal_code
          state
        }
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        interests
        currentRole
        currentScope
        personality
        orgName
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        isArchived
        primaryOrganization
        organizations {
          nextToken
        }
        owns {
          nextToken
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
        directMessages {
          nextToken
        }
        messageReplies {
          nextToken
        }
        coachingTriad {
          nextToken
        }
        userTriad {
          nextToken
        }
        courseInstructing {
          nextToken
        }
        courseBackOfficeStaff {
          nextToken
        }
        payments {
          nextToken
        }
        alertConfig {
          emailDirectMessage
          emailGroupMessage
          emailEventMessage
          emailOrgMessage
          emailResourceMessage
          emailCourseMessage
          emailPromotions
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const updateReply = /* GraphQL */ `
  mutation UpdateReply($input: UpdateReplyInput!) {
    updateReply(input: $input) {
      id
      content
      when
      attachment
      attachmentName
      attachmentOwner
      userId
      messageId
      parentMessage {
        id
        content
        when
        attachment
        attachmentName
        attachmentOwner
        roomId
        userId
        postingAs
        owner
        room {
          id
          owner
          readGroups
          ownerOrgID
          type
          name
          description
          memberCount
          image
          time
          lastUpdated
          location
          length
          effort
          cost
          promotionalText
          eventType
          eventUrl
          tz
          isSponsored
          createdAt
          updatedAt
        }
        replies {
          nextToken
        }
        createdAt
        updatedAt
        author {
          id
          given_name
          family_name
          email
          phone
          owner
          mainUserGroup
          stripeCustomerID
          stripeSubscriptionID
          hasPaidState
          profileState
          aboutMeShort
          aboutMeLong
          interests
          currentRole
          currentScope
          personality
          orgName
          orgType
          orgSize
          denomination
          pplServed
          sundayAttendance
          numberVolunteers
          orgDescription
          joined
          isArchived
          primaryOrganization
          createdAt
          updatedAt
        }
      }
      roomId
      parentReplyId
      parentReply {
        id
        content
        when
        attachment
        attachmentName
        attachmentOwner
        userId
        messageId
        parentMessage {
          id
          content
          when
          attachment
          attachmentName
          attachmentOwner
          roomId
          userId
          postingAs
          owner
          createdAt
          updatedAt
        }
        roomId
        parentReplyId
        parentReply {
          id
          content
          when
          attachment
          attachmentName
          attachmentOwner
          userId
          messageId
          roomId
          parentReplyId
          createdAt
          updatedAt
        }
        subReplies {
          nextToken
        }
        createdAt
        updatedAt
        author {
          id
          given_name
          family_name
          email
          phone
          owner
          mainUserGroup
          stripeCustomerID
          stripeSubscriptionID
          hasPaidState
          profileState
          aboutMeShort
          aboutMeLong
          interests
          currentRole
          currentScope
          personality
          orgName
          orgType
          orgSize
          denomination
          pplServed
          sundayAttendance
          numberVolunteers
          orgDescription
          joined
          isArchived
          primaryOrganization
          createdAt
          updatedAt
        }
      }
      subReplies {
        items {
          id
          content
          when
          attachment
          attachmentName
          attachmentOwner
          userId
          messageId
          roomId
          parentReplyId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      author {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
        stripeCustomerID
        stripeSubscriptionID
        hasPaidState
        profileState
        billingAddress {
          city
          country
          line1
          line2
          postal_code
          state
        }
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        interests
        currentRole
        currentScope
        personality
        orgName
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        isArchived
        primaryOrganization
        organizations {
          nextToken
        }
        owns {
          nextToken
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
        directMessages {
          nextToken
        }
        messageReplies {
          nextToken
        }
        coachingTriad {
          nextToken
        }
        userTriad {
          nextToken
        }
        courseInstructing {
          nextToken
        }
        courseBackOfficeStaff {
          nextToken
        }
        payments {
          nextToken
        }
        alertConfig {
          emailDirectMessage
          emailGroupMessage
          emailEventMessage
          emailOrgMessage
          emailResourceMessage
          emailCourseMessage
          emailPromotions
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const deleteReply = /* GraphQL */ `
  mutation DeleteReply($input: DeleteReplyInput!) {
    deleteReply(input: $input) {
      id
      content
      when
      attachment
      attachmentName
      attachmentOwner
      userId
      messageId
      parentMessage {
        id
        content
        when
        attachment
        attachmentName
        attachmentOwner
        roomId
        userId
        postingAs
        owner
        room {
          id
          owner
          readGroups
          ownerOrgID
          type
          name
          description
          memberCount
          image
          time
          lastUpdated
          location
          length
          effort
          cost
          promotionalText
          eventType
          eventUrl
          tz
          isSponsored
          createdAt
          updatedAt
        }
        replies {
          nextToken
        }
        createdAt
        updatedAt
        author {
          id
          given_name
          family_name
          email
          phone
          owner
          mainUserGroup
          stripeCustomerID
          stripeSubscriptionID
          hasPaidState
          profileState
          aboutMeShort
          aboutMeLong
          interests
          currentRole
          currentScope
          personality
          orgName
          orgType
          orgSize
          denomination
          pplServed
          sundayAttendance
          numberVolunteers
          orgDescription
          joined
          isArchived
          primaryOrganization
          createdAt
          updatedAt
        }
      }
      roomId
      parentReplyId
      parentReply {
        id
        content
        when
        attachment
        attachmentName
        attachmentOwner
        userId
        messageId
        parentMessage {
          id
          content
          when
          attachment
          attachmentName
          attachmentOwner
          roomId
          userId
          postingAs
          owner
          createdAt
          updatedAt
        }
        roomId
        parentReplyId
        parentReply {
          id
          content
          when
          attachment
          attachmentName
          attachmentOwner
          userId
          messageId
          roomId
          parentReplyId
          createdAt
          updatedAt
        }
        subReplies {
          nextToken
        }
        createdAt
        updatedAt
        author {
          id
          given_name
          family_name
          email
          phone
          owner
          mainUserGroup
          stripeCustomerID
          stripeSubscriptionID
          hasPaidState
          profileState
          aboutMeShort
          aboutMeLong
          interests
          currentRole
          currentScope
          personality
          orgName
          orgType
          orgSize
          denomination
          pplServed
          sundayAttendance
          numberVolunteers
          orgDescription
          joined
          isArchived
          primaryOrganization
          createdAt
          updatedAt
        }
      }
      subReplies {
        items {
          id
          content
          when
          attachment
          attachmentName
          attachmentOwner
          userId
          messageId
          roomId
          parentReplyId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      author {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
        stripeCustomerID
        stripeSubscriptionID
        hasPaidState
        profileState
        billingAddress {
          city
          country
          line1
          line2
          postal_code
          state
        }
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        interests
        currentRole
        currentScope
        personality
        orgName
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        isArchived
        primaryOrganization
        organizations {
          nextToken
        }
        owns {
          nextToken
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
        directMessages {
          nextToken
        }
        messageReplies {
          nextToken
        }
        coachingTriad {
          nextToken
        }
        userTriad {
          nextToken
        }
        courseInstructing {
          nextToken
        }
        courseBackOfficeStaff {
          nextToken
        }
        payments {
          nextToken
        }
        alertConfig {
          emailDirectMessage
          emailGroupMessage
          emailEventMessage
          emailOrgMessage
          emailResourceMessage
          emailCourseMessage
          emailPromotions
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const createResourceRoot = /* GraphQL */ `
  mutation CreateResourceRoot($input: CreateResourceRootInput!) {
    createResourceRoot(input: $input) {
      id
      type
      groupId
      organizationId
      owner
      resources {
        items {
          id
          owner
          type
          order
          title
          subtitle
          description
          whoIsThisFor
          extendedDescription
          readGroups
          resourceID
          createdAt
          updatedAt
        }
        nextToken
      }
      organization {
        id
        orgName
        adminEmail
        phone
        admins
        superAdmin
        hasPaidState
        profileState
        address
        city
        province
        postalCode
        country
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        parentOrganizationId
        parentOrganization {
          id
          orgName
          adminEmail
          phone
          admins
          superAdmin
          hasPaidState
          profileState
          address
          city
          province
          postalCode
          country
          aboutMeShort
          aboutMeLong
          orgType
          orgSize
          denomination
          pplServed
          sundayAttendance
          numberVolunteers
          orgDescription
          joined
          parentOrganizationId
          createdAt
          updatedAt
        }
        subOrganizations {
          nextToken
        }
        members {
          nextToken
        }
        ownsGroups {
          nextToken
        }
        resource {
          nextToken
        }
        createdAt
        updatedAt
      }
      menuItems {
        items {
          id
          owner
          readGroups
          type
          menuTitle
          order
          depth
          resourceRootID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`
export const updateResourceRoot = /* GraphQL */ `
  mutation UpdateResourceRoot($input: UpdateResourceRootInput!) {
    updateResourceRoot(input: $input) {
      id
      type
      groupId
      organizationId
      owner
      resources {
        items {
          id
          owner
          type
          order
          title
          subtitle
          description
          whoIsThisFor
          extendedDescription
          readGroups
          resourceID
          createdAt
          updatedAt
        }
        nextToken
      }
      organization {
        id
        orgName
        adminEmail
        phone
        admins
        superAdmin
        hasPaidState
        profileState
        address
        city
        province
        postalCode
        country
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        parentOrganizationId
        parentOrganization {
          id
          orgName
          adminEmail
          phone
          admins
          superAdmin
          hasPaidState
          profileState
          address
          city
          province
          postalCode
          country
          aboutMeShort
          aboutMeLong
          orgType
          orgSize
          denomination
          pplServed
          sundayAttendance
          numberVolunteers
          orgDescription
          joined
          parentOrganizationId
          createdAt
          updatedAt
        }
        subOrganizations {
          nextToken
        }
        members {
          nextToken
        }
        ownsGroups {
          nextToken
        }
        resource {
          nextToken
        }
        createdAt
        updatedAt
      }
      menuItems {
        items {
          id
          owner
          readGroups
          type
          menuTitle
          order
          depth
          resourceRootID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`
export const deleteResourceRoot = /* GraphQL */ `
  mutation DeleteResourceRoot($input: DeleteResourceRootInput!) {
    deleteResourceRoot(input: $input) {
      id
      type
      groupId
      organizationId
      owner
      resources {
        items {
          id
          owner
          type
          order
          title
          subtitle
          description
          whoIsThisFor
          extendedDescription
          readGroups
          resourceID
          createdAt
          updatedAt
        }
        nextToken
      }
      organization {
        id
        orgName
        adminEmail
        phone
        admins
        superAdmin
        hasPaidState
        profileState
        address
        city
        province
        postalCode
        country
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        profileImage {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        aboutMeShort
        aboutMeLong
        orgType
        orgSize
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
        orgDescription
        joined
        parentOrganizationId
        parentOrganization {
          id
          orgName
          adminEmail
          phone
          admins
          superAdmin
          hasPaidState
          profileState
          address
          city
          province
          postalCode
          country
          aboutMeShort
          aboutMeLong
          orgType
          orgSize
          denomination
          pplServed
          sundayAttendance
          numberVolunteers
          orgDescription
          joined
          parentOrganizationId
          createdAt
          updatedAt
        }
        subOrganizations {
          nextToken
        }
        members {
          nextToken
        }
        ownsGroups {
          nextToken
        }
        resource {
          nextToken
        }
        createdAt
        updatedAt
      }
      menuItems {
        items {
          id
          owner
          readGroups
          type
          menuTitle
          order
          depth
          resourceRootID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`
export const createResourceMenuItem = /* GraphQL */ `
  mutation CreateResourceMenuItem($input: CreateResourceMenuItemInput!) {
    createResourceMenuItem(input: $input) {
      id
      owner
      readGroups
      type
      menuTitle
      order
      depth
      pageItems {
        id
        type
        style
        size
        title1
        title2
        description1
        description2
        resourceID
        seriesID
        episodeID
        color
        image {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        url
        order
        pageItemsLeft {
          id
          type
          style
          size
          title1
          title2
          description1
          description2
          resourceID
          seriesID
          episodeID
          color
          url
          order
        }
        pageItemsRight {
          id
          type
          style
          size
          title1
          title2
          description1
          description2
          resourceID
          seriesID
          episodeID
          color
          url
          order
        }
      }
      resourceRootID
      resourceRoot {
        id
        type
        groupId
        organizationId
        owner
        resources {
          nextToken
        }
        organization {
          id
          orgName
          adminEmail
          phone
          admins
          superAdmin
          hasPaidState
          profileState
          address
          city
          province
          postalCode
          country
          aboutMeShort
          aboutMeLong
          orgType
          orgSize
          denomination
          pplServed
          sundayAttendance
          numberVolunteers
          orgDescription
          joined
          parentOrganizationId
          createdAt
          updatedAt
        }
        menuItems {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const updateResourceMenuItem = /* GraphQL */ `
  mutation UpdateResourceMenuItem($input: UpdateResourceMenuItemInput!) {
    updateResourceMenuItem(input: $input) {
      id
      owner
      readGroups
      type
      menuTitle
      order
      depth
      pageItems {
        id
        type
        style
        size
        title1
        title2
        description1
        description2
        resourceID
        seriesID
        episodeID
        color
        image {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        url
        order
        pageItemsLeft {
          id
          type
          style
          size
          title1
          title2
          description1
          description2
          resourceID
          seriesID
          episodeID
          color
          url
          order
        }
        pageItemsRight {
          id
          type
          style
          size
          title1
          title2
          description1
          description2
          resourceID
          seriesID
          episodeID
          color
          url
          order
        }
      }
      resourceRootID
      resourceRoot {
        id
        type
        groupId
        organizationId
        owner
        resources {
          nextToken
        }
        organization {
          id
          orgName
          adminEmail
          phone
          admins
          superAdmin
          hasPaidState
          profileState
          address
          city
          province
          postalCode
          country
          aboutMeShort
          aboutMeLong
          orgType
          orgSize
          denomination
          pplServed
          sundayAttendance
          numberVolunteers
          orgDescription
          joined
          parentOrganizationId
          createdAt
          updatedAt
        }
        menuItems {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const deleteResourceMenuItem = /* GraphQL */ `
  mutation DeleteResourceMenuItem($input: DeleteResourceMenuItemInput!) {
    deleteResourceMenuItem(input: $input) {
      id
      owner
      readGroups
      type
      menuTitle
      order
      depth
      pageItems {
        id
        type
        style
        size
        title1
        title2
        description1
        description2
        resourceID
        seriesID
        episodeID
        color
        image {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        url
        order
        pageItemsLeft {
          id
          type
          style
          size
          title1
          title2
          description1
          description2
          resourceID
          seriesID
          episodeID
          color
          url
          order
        }
        pageItemsRight {
          id
          type
          style
          size
          title1
          title2
          description1
          description2
          resourceID
          seriesID
          episodeID
          color
          url
          order
        }
      }
      resourceRootID
      resourceRoot {
        id
        type
        groupId
        organizationId
        owner
        resources {
          nextToken
        }
        organization {
          id
          orgName
          adminEmail
          phone
          admins
          superAdmin
          hasPaidState
          profileState
          address
          city
          province
          postalCode
          country
          aboutMeShort
          aboutMeLong
          orgType
          orgSize
          denomination
          pplServed
          sundayAttendance
          numberVolunteers
          orgDescription
          joined
          parentOrganizationId
          createdAt
          updatedAt
        }
        menuItems {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const createResource = /* GraphQL */ `
  mutation CreateResource($input: CreateResourceInput!) {
    createResource(input: $input) {
      id
      owner
      type
      order
      title
      subtitle
      image {
        userId
        filenameSmall
        filenameMedium
        filenameLarge
        filenameUpload
      }
      description
      whoIsThisFor
      extendedDescription
      readGroups
      details {
        type
        name
        text
        value
        image {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
      }
      series {
        items {
          id
          owner
          type
          title
          order
          description
          whoIsThisFor
          category
          status
          seriesID
          createdAt
          updatedAt
        }
        nextToken
      }
      resourceID
      resourceRoot {
        id
        type
        groupId
        organizationId
        owner
        resources {
          nextToken
        }
        organization {
          id
          orgName
          adminEmail
          phone
          admins
          superAdmin
          hasPaidState
          profileState
          address
          city
          province
          postalCode
          country
          aboutMeShort
          aboutMeLong
          orgType
          orgSize
          denomination
          pplServed
          sundayAttendance
          numberVolunteers
          orgDescription
          joined
          parentOrganizationId
          createdAt
          updatedAt
        }
        menuItems {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const updateResource = /* GraphQL */ `
  mutation UpdateResource($input: UpdateResourceInput!) {
    updateResource(input: $input) {
      id
      owner
      type
      order
      title
      subtitle
      image {
        userId
        filenameSmall
        filenameMedium
        filenameLarge
        filenameUpload
      }
      description
      whoIsThisFor
      extendedDescription
      readGroups
      details {
        type
        name
        text
        value
        image {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
      }
      series {
        items {
          id
          owner
          type
          title
          order
          description
          whoIsThisFor
          category
          status
          seriesID
          createdAt
          updatedAt
        }
        nextToken
      }
      resourceID
      resourceRoot {
        id
        type
        groupId
        organizationId
        owner
        resources {
          nextToken
        }
        organization {
          id
          orgName
          adminEmail
          phone
          admins
          superAdmin
          hasPaidState
          profileState
          address
          city
          province
          postalCode
          country
          aboutMeShort
          aboutMeLong
          orgType
          orgSize
          denomination
          pplServed
          sundayAttendance
          numberVolunteers
          orgDescription
          joined
          parentOrganizationId
          createdAt
          updatedAt
        }
        menuItems {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const deleteResource = /* GraphQL */ `
  mutation DeleteResource($input: DeleteResourceInput!) {
    deleteResource(input: $input) {
      id
      owner
      type
      order
      title
      subtitle
      image {
        userId
        filenameSmall
        filenameMedium
        filenameLarge
        filenameUpload
      }
      description
      whoIsThisFor
      extendedDescription
      readGroups
      details {
        type
        name
        text
        value
        image {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
      }
      series {
        items {
          id
          owner
          type
          title
          order
          description
          whoIsThisFor
          category
          status
          seriesID
          createdAt
          updatedAt
        }
        nextToken
      }
      resourceID
      resourceRoot {
        id
        type
        groupId
        organizationId
        owner
        resources {
          nextToken
        }
        organization {
          id
          orgName
          adminEmail
          phone
          admins
          superAdmin
          hasPaidState
          profileState
          address
          city
          province
          postalCode
          country
          aboutMeShort
          aboutMeLong
          orgType
          orgSize
          denomination
          pplServed
          sundayAttendance
          numberVolunteers
          orgDescription
          joined
          parentOrganizationId
          createdAt
          updatedAt
        }
        menuItems {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const createResourceSeries = /* GraphQL */ `
  mutation CreateResourceSeries($input: CreateResourceSeriesInput!) {
    createResourceSeries(input: $input) {
      id
      owner
      type
      title
      order
      description
      whoIsThisFor
      imageFile {
        userId
        filenameSmall
        filenameMedium
        filenameLarge
        filenameUpload
      }
      category
      status
      details {
        type
        name
        text
        value
        image {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
      }
      episodes {
        items {
          id
          owner
          episodeNumber
          type
          title
          description
          whoIsThisFor
          episodeID
          createdAt
          updatedAt
        }
        nextToken
      }
      seriesID
      parentResource {
        id
        owner
        type
        order
        title
        subtitle
        image {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        description
        whoIsThisFor
        extendedDescription
        readGroups
        details {
          type
          name
          text
          value
        }
        series {
          nextToken
        }
        resourceID
        resourceRoot {
          id
          type
          groupId
          organizationId
          owner
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const updateResourceSeries = /* GraphQL */ `
  mutation UpdateResourceSeries($input: UpdateResourceSeriesInput!) {
    updateResourceSeries(input: $input) {
      id
      owner
      type
      title
      order
      description
      whoIsThisFor
      imageFile {
        userId
        filenameSmall
        filenameMedium
        filenameLarge
        filenameUpload
      }
      category
      status
      details {
        type
        name
        text
        value
        image {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
      }
      episodes {
        items {
          id
          owner
          episodeNumber
          type
          title
          description
          whoIsThisFor
          episodeID
          createdAt
          updatedAt
        }
        nextToken
      }
      seriesID
      parentResource {
        id
        owner
        type
        order
        title
        subtitle
        image {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        description
        whoIsThisFor
        extendedDescription
        readGroups
        details {
          type
          name
          text
          value
        }
        series {
          nextToken
        }
        resourceID
        resourceRoot {
          id
          type
          groupId
          organizationId
          owner
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const deleteResourceSeries = /* GraphQL */ `
  mutation DeleteResourceSeries($input: DeleteResourceSeriesInput!) {
    deleteResourceSeries(input: $input) {
      id
      owner
      type
      title
      order
      description
      whoIsThisFor
      imageFile {
        userId
        filenameSmall
        filenameMedium
        filenameLarge
        filenameUpload
      }
      category
      status
      details {
        type
        name
        text
        value
        image {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
      }
      episodes {
        items {
          id
          owner
          episodeNumber
          type
          title
          description
          whoIsThisFor
          episodeID
          createdAt
          updatedAt
        }
        nextToken
      }
      seriesID
      parentResource {
        id
        owner
        type
        order
        title
        subtitle
        image {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        description
        whoIsThisFor
        extendedDescription
        readGroups
        details {
          type
          name
          text
          value
        }
        series {
          nextToken
        }
        resourceID
        resourceRoot {
          id
          type
          groupId
          organizationId
          owner
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const createResourceEpisode = /* GraphQL */ `
  mutation CreateResourceEpisode($input: CreateResourceEpisodeInput!) {
    createResourceEpisode(input: $input) {
      id
      owner
      episodeNumber
      type
      title
      description
      imageFile {
        userId
        filenameSmall
        filenameMedium
        filenameLarge
        filenameUpload
      }
      whoIsThisFor
      details {
        type
        name
        text
        value
        image {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
      }
      episodeID
      parentSeries {
        id
        owner
        type
        title
        order
        description
        whoIsThisFor
        imageFile {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        category
        status
        details {
          type
          name
          text
          value
        }
        episodes {
          nextToken
        }
        seriesID
        parentResource {
          id
          owner
          type
          order
          title
          subtitle
          description
          whoIsThisFor
          extendedDescription
          readGroups
          resourceID
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const updateResourceEpisode = /* GraphQL */ `
  mutation UpdateResourceEpisode($input: UpdateResourceEpisodeInput!) {
    updateResourceEpisode(input: $input) {
      id
      owner
      episodeNumber
      type
      title
      description
      imageFile {
        userId
        filenameSmall
        filenameMedium
        filenameLarge
        filenameUpload
      }
      whoIsThisFor
      details {
        type
        name
        text
        value
        image {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
      }
      episodeID
      parentSeries {
        id
        owner
        type
        title
        order
        description
        whoIsThisFor
        imageFile {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        category
        status
        details {
          type
          name
          text
          value
        }
        episodes {
          nextToken
        }
        seriesID
        parentResource {
          id
          owner
          type
          order
          title
          subtitle
          description
          whoIsThisFor
          extendedDescription
          readGroups
          resourceID
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const deleteResourceEpisode = /* GraphQL */ `
  mutation DeleteResourceEpisode($input: DeleteResourceEpisodeInput!) {
    deleteResourceEpisode(input: $input) {
      id
      owner
      episodeNumber
      type
      title
      description
      imageFile {
        userId
        filenameSmall
        filenameMedium
        filenameLarge
        filenameUpload
      }
      whoIsThisFor
      details {
        type
        name
        text
        value
        image {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
      }
      episodeID
      parentSeries {
        id
        owner
        type
        title
        order
        description
        whoIsThisFor
        imageFile {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        category
        status
        details {
          type
          name
          text
          value
        }
        episodes {
          nextToken
        }
        seriesID
        parentResource {
          id
          owner
          type
          order
          title
          subtitle
          description
          whoIsThisFor
          extendedDescription
          readGroups
          resourceID
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const createProduct = /* GraphQL */ `
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      price
      pricePer
      isDefault
      name
      confirmationMsg
      payments {
        items {
          id
          productID
          userID
          dateCompleted
          paymentType
          paymentInfo
          createdAt
          updatedAt
        }
        nextToken
      }
      isOrgTier
      isIndividualTier
      isLogin
      eula
      enabled
      isStripe
      isPaypal
      tiered {
        name
        stripePaymentID
        defaultAmount
        amountIsEditable
        isSubscription
      }
      submitButtonText
      createdAt
      updatedAt
    }
  }
`
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct($input: UpdateProductInput!) {
    updateProduct(input: $input) {
      id
      price
      pricePer
      isDefault
      name
      confirmationMsg
      payments {
        items {
          id
          productID
          userID
          dateCompleted
          paymentType
          paymentInfo
          createdAt
          updatedAt
        }
        nextToken
      }
      isOrgTier
      isIndividualTier
      isLogin
      eula
      enabled
      isStripe
      isPaypal
      tiered {
        name
        stripePaymentID
        defaultAmount
        amountIsEditable
        isSubscription
      }
      submitButtonText
      createdAt
      updatedAt
    }
  }
`
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct($input: DeleteProductInput!) {
    deleteProduct(input: $input) {
      id
      price
      pricePer
      isDefault
      name
      confirmationMsg
      payments {
        items {
          id
          productID
          userID
          dateCompleted
          paymentType
          paymentInfo
          createdAt
          updatedAt
        }
        nextToken
      }
      isOrgTier
      isIndividualTier
      isLogin
      eula
      enabled
      isStripe
      isPaypal
      tiered {
        name
        stripePaymentID
        defaultAmount
        amountIsEditable
        isSubscription
      }
      submitButtonText
      createdAt
      updatedAt
    }
  }
`
export const createVodAsset = /* GraphQL */ `
  mutation CreateVodAsset($input: CreateVodAssetInput!) {
    createVodAsset(input: $input) {
      id
      title
      description
      video {
        id
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const updateVodAsset = /* GraphQL */ `
  mutation UpdateVodAsset($input: UpdateVodAssetInput!) {
    updateVodAsset(input: $input) {
      id
      title
      description
      video {
        id
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const deleteVodAsset = /* GraphQL */ `
  mutation DeleteVodAsset($input: DeleteVodAssetInput!) {
    deleteVodAsset(input: $input) {
      id
      title
      description
      video {
        id
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const createVideoObject = /* GraphQL */ `
  mutation CreateVideoObject($input: CreateVideoObjectInput!) {
    createVideoObject(input: $input) {
      id
      createdAt
      updatedAt
    }
  }
`
export const updateVideoObject = /* GraphQL */ `
  mutation UpdateVideoObject($input: UpdateVideoObjectInput!) {
    updateVideoObject(input: $input) {
      id
      createdAt
      updatedAt
    }
  }
`
export const deleteVideoObject = /* GraphQL */ `
  mutation DeleteVideoObject($input: DeleteVideoObjectInput!) {
    deleteVideoObject(input: $input) {
      id
      createdAt
      updatedAt
    }
  }
`
export const createStartup = /* GraphQL */ `
  mutation CreateStartup($input: CreateStartupInput!) {
    createStartup(input: $input) {
      id
      order
      action
      params
      readGroups
      createdAt
      updatedAt
    }
  }
`
export const updateStartup = /* GraphQL */ `
  mutation UpdateStartup($input: UpdateStartupInput!) {
    updateStartup(input: $input) {
      id
      order
      action
      params
      readGroups
      createdAt
      updatedAt
    }
  }
`
export const deleteStartup = /* GraphQL */ `
  mutation DeleteStartup($input: DeleteStartupInput!) {
    deleteStartup(input: $input) {
      id
      order
      action
      params
      readGroups
      createdAt
      updatedAt
    }
  }
`
export const createMenu = /* GraphQL */ `
  mutation CreateMenu($input: CreateMenuInput!) {
    createMenu(input: $input) {
      id
      order
      name
      action
      params
      readGroups
      subItems {
        items {
          id
          menuID
          order
          name
          action
          params
          readGroups
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`
export const updateMenu = /* GraphQL */ `
  mutation UpdateMenu($input: UpdateMenuInput!) {
    updateMenu(input: $input) {
      id
      order
      name
      action
      params
      readGroups
      subItems {
        items {
          id
          menuID
          order
          name
          action
          params
          readGroups
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`
export const deleteMenu = /* GraphQL */ `
  mutation DeleteMenu($input: DeleteMenuInput!) {
    deleteMenu(input: $input) {
      id
      order
      name
      action
      params
      readGroups
      subItems {
        items {
          id
          menuID
          order
          name
          action
          params
          readGroups
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`
export const createSubMenu = /* GraphQL */ `
  mutation CreateSubMenu($input: CreateSubMenuInput!) {
    createSubMenu(input: $input) {
      id
      menuID
      order
      menu {
        id
        order
        name
        action
        params
        readGroups
        subItems {
          nextToken
        }
        createdAt
        updatedAt
      }
      name
      action
      params
      readGroups
      createdAt
      updatedAt
    }
  }
`
export const updateSubMenu = /* GraphQL */ `
  mutation UpdateSubMenu($input: UpdateSubMenuInput!) {
    updateSubMenu(input: $input) {
      id
      menuID
      order
      menu {
        id
        order
        name
        action
        params
        readGroups
        subItems {
          nextToken
        }
        createdAt
        updatedAt
      }
      name
      action
      params
      readGroups
      createdAt
      updatedAt
    }
  }
`
export const deleteSubMenu = /* GraphQL */ `
  mutation DeleteSubMenu($input: DeleteSubMenuInput!) {
    deleteSubMenu(input: $input) {
      id
      menuID
      order
      menu {
        id
        order
        name
        action
        params
        readGroups
        subItems {
          nextToken
        }
        createdAt
        updatedAt
      }
      name
      action
      params
      readGroups
      createdAt
      updatedAt
    }
  }
`
export const createCustomProfile = /* GraphQL */ `
  mutation CreateCustomProfile($input: CreateCustomProfileInput!) {
    createCustomProfile(input: $input) {
      id
      order
      type
      readGroups
      createdAt
      updatedAt
    }
  }
`
export const updateCustomProfile = /* GraphQL */ `
  mutation UpdateCustomProfile($input: UpdateCustomProfileInput!) {
    updateCustomProfile(input: $input) {
      id
      order
      type
      readGroups
      createdAt
      updatedAt
    }
  }
`
export const deleteCustomProfile = /* GraphQL */ `
  mutation DeleteCustomProfile($input: DeleteCustomProfileInput!) {
    deleteCustomProfile(input: $input) {
      id
      order
      type
      readGroups
      createdAt
      updatedAt
    }
  }
`
export const createCustomPricing = /* GraphQL */ `
  mutation CreateCustomPricing($input: CreateCustomPricingInput!) {
    createCustomPricing(input: $input) {
      id
      emailAddress
      type
      lineItems {
        itemId
        count
        amount
        description
      }
      createdAt
      updatedAt
    }
  }
`
export const updateCustomPricing = /* GraphQL */ `
  mutation UpdateCustomPricing($input: UpdateCustomPricingInput!) {
    updateCustomPricing(input: $input) {
      id
      emailAddress
      type
      lineItems {
        itemId
        count
        amount
        description
      }
      createdAt
      updatedAt
    }
  }
`
export const deleteCustomPricing = /* GraphQL */ `
  mutation DeleteCustomPricing($input: DeleteCustomPricingInput!) {
    deleteCustomPricing(input: $input) {
      id
      emailAddress
      type
      lineItems {
        itemId
        count
        amount
        description
      }
      createdAt
      updatedAt
    }
  }
`
