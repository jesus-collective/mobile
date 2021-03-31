/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getApplicationProcess = /* GraphQL */ `
  query GetApplicationProcess($id: ID!) {
    getApplicationProcess(id: $id) {
      id
      createdAt
      updatedAt
    }
  }
`
export const listApplicationProcesss = /* GraphQL */ `
  query ListApplicationProcesss(
    $filter: ModelApplicationProcessFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listApplicationProcesss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const getGroup = /* GraphQL */ `
  query GetGroup($id: ID!) {
    getGroup(id: $id) {
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
export const listGroups = /* GraphQL */ `
  query ListGroups($filter: ModelGroupFilterInput, $limit: Int, $nextToken: String) {
    listGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          primaryOrganization
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`
export const getOrganization = /* GraphQL */ `
  query GetOrganization($id: ID!) {
    getOrganization(id: $id) {
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
export const listOrganizations = /* GraphQL */ `
  query ListOrganizations($filter: ModelOrganizationFilterInput, $limit: Int, $nextToken: String) {
    listOrganizations(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
      nextToken
    }
  }
`
export const getActivity = /* GraphQL */ `
  query GetActivity($id: ID!) {
    getActivity(id: $id) {
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
export const listActivitys = /* GraphQL */ `
  query ListActivitys($filter: ModelActivityFilterInput, $limit: Int, $nextToken: String) {
    listActivitys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          primaryOrganization
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`
export const getPayment = /* GraphQL */ `
  query GetPayment($id: ID!) {
    getPayment(id: $id) {
      id
      productID
      product {
        id
        price
        pricePer
        name
        description
        confirmationMsg
        payments {
          nextToken
        }
        isOrgTier
        isIndividualTier
        isLogin
        marketingDescription
        groupsIncluded
        enabled
        isStripe
        isPaypal
        tiered {
          name
          stripePaymentID
          stripeIsTiered
        }
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
export const listPayments = /* GraphQL */ `
  query ListPayments(
    $id: ID
    $filter: ModelPaymentFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listPayments(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        productID
        product {
          id
          price
          pricePer
          name
          description
          confirmationMsg
          isOrgTier
          isIndividualTier
          isLogin
          marketingDescription
          groupsIncluded
          enabled
          isStripe
          isPaypal
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
          primaryOrganization
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`
export const getCourseInfo = /* GraphQL */ `
  query GetCourseInfo($id: ID!) {
    getCourseInfo(id: $id) {
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
      sylabusAttachment
      sylabusAttachmentName
      createdAt
      updatedAt
    }
  }
`
export const listCourseInfos = /* GraphQL */ `
  query ListCourseInfos($filter: ModelCourseInfoFilterInput, $limit: Int, $nextToken: String) {
    listCourseInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        sylabusAttachment
        sylabusAttachmentName
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const getCourseTriads = /* GraphQL */ `
  query GetCourseTriads($id: ID!) {
    getCourseTriads(id: $id) {
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
        sylabusAttachment
        sylabusAttachmentName
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
export const listCourseTriadss = /* GraphQL */ `
  query ListCourseTriadss($filter: ModelCourseTriadsFilterInput, $limit: Int, $nextToken: String) {
    listCourseTriadss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        courseInfoID
        courseInfo {
          id
          designedBy
          summary
          subTitle
          introduction
          sylabusAttachment
          sylabusAttachmentName
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
      nextToken
    }
  }
`
export const getCourseBackOfficeStaff = /* GraphQL */ `
  query GetCourseBackOfficeStaff($id: ID!) {
    getCourseBackOfficeStaff(id: $id) {
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
        sylabusAttachment
        sylabusAttachmentName
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
export const listCourseBackOfficeStaffs = /* GraphQL */ `
  query ListCourseBackOfficeStaffs(
    $filter: ModelCourseBackOfficeStaffFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCourseBackOfficeStaffs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        courseInfoID
        courseInfo {
          id
          designedBy
          summary
          subTitle
          introduction
          sylabusAttachment
          sylabusAttachmentName
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
          primaryOrganization
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`
export const getCourseInstructors = /* GraphQL */ `
  query GetCourseInstructors($id: ID!) {
    getCourseInstructors(id: $id) {
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
        sylabusAttachment
        sylabusAttachmentName
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
export const listCourseInstructorss = /* GraphQL */ `
  query ListCourseInstructorss(
    $filter: ModelCourseInstructorsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCourseInstructorss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        courseInfoID
        courseInfo {
          id
          designedBy
          summary
          subTitle
          introduction
          sylabusAttachment
          sylabusAttachmentName
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
          primaryOrganization
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`
export const getCourseTriadCoaches = /* GraphQL */ `
  query GetCourseTriadCoaches($id: ID!) {
    getCourseTriadCoaches(id: $id) {
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
          sylabusAttachment
          sylabusAttachmentName
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
export const listCourseTriadCoachess = /* GraphQL */ `
  query ListCourseTriadCoachess(
    $filter: ModelCourseTriadCoachesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCourseTriadCoachess(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        triadID
        triad {
          id
          courseInfoID
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
          primaryOrganization
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`
export const getCourseTriadUsers = /* GraphQL */ `
  query GetCourseTriadUsers($id: ID!) {
    getCourseTriadUsers(id: $id) {
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
          sylabusAttachment
          sylabusAttachmentName
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
export const listCourseTriadUserss = /* GraphQL */ `
  query ListCourseTriadUserss(
    $id: ID
    $filter: ModelCourseTriadUsersFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCourseTriadUserss(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        triadID
        triad {
          id
          courseInfoID
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
          primaryOrganization
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`
export const getCourseWeek = /* GraphQL */ `
  query GetCourseWeek($id: ID!) {
    getCourseWeek(id: $id) {
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
        sylabusAttachment
        sylabusAttachmentName
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
export const listCourseWeeks = /* GraphQL */ `
  query ListCourseWeeks($filter: ModelCourseWeekFilterInput, $limit: Int, $nextToken: String) {
    listCourseWeeks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          sylabusAttachment
          sylabusAttachmentName
          createdAt
          updatedAt
        }
        lessons {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const getCourseLesson = /* GraphQL */ `
  query GetCourseLesson($id: ID!) {
    getCourseLesson(id: $id) {
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
          sylabusAttachment
          sylabusAttachmentName
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
export const listCourseLessons = /* GraphQL */ `
  query ListCourseLessons($filter: ModelCourseLessonFilterInput, $limit: Int, $nextToken: String) {
    listCourseLessons(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        courseWeek {
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const getDirectMessageUser = /* GraphQL */ `
  query GetDirectMessageUser($id: ID!) {
    getDirectMessageUser(id: $id) {
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
export const listDirectMessageUsers = /* GraphQL */ `
  query ListDirectMessageUsers(
    $filter: ModelDirectMessageUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDirectMessageUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userName
        userID
        roomID
        room {
          id
          name
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
          primaryOrganization
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`
export const getDirectMessageRoom = /* GraphQL */ `
  query GetDirectMessageRoom($id: ID!) {
    getDirectMessageRoom(id: $id) {
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
export const listDirectMessageRooms = /* GraphQL */ `
  query ListDirectMessageRooms(
    $filter: ModelDirectMessageRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDirectMessageRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`
export const getDirectMessage = /* GraphQL */ `
  query GetDirectMessage($id: ID!) {
    getDirectMessage(id: $id) {
      id
      content
      attachment
      attachmentName
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
export const listDirectMessages = /* GraphQL */ `
  query ListDirectMessages(
    $filter: ModelDirectMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDirectMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        content
        attachment
        attachmentName
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
          primaryOrganization
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`
export const getCrmRoot = /* GraphQL */ `
  query GetCrmRoot($id: ID!) {
    getCRMRoot(id: $id) {
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
export const listCrmRoots = /* GraphQL */ `
  query ListCrmRoots($filter: ModelCRMRootFilterInput, $limit: Int, $nextToken: String) {
    listCRMRoots(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        messages {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const getCrmMessage = /* GraphQL */ `
  query GetCrmMessage($id: ID!) {
    getCRMMessage(id: $id) {
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
      thread {
        items {
          id
          rootId
          content
          when
          authorName
          authorId
          attachment
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
export const listCrmMessages = /* GraphQL */ `
  query ListCrmMessages($filter: ModelCRMMessageFilterInput, $limit: Int, $nextToken: String) {
    listCRMMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        thread {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const getCrmReply = /* GraphQL */ `
  query GetCrmReply($id: ID!) {
    getCRMReply(id: $id) {
      id
      rootId
      content
      when
      authorName
      authorId
      attachment
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
export const listCrmReplys = /* GraphQL */ `
  query ListCrmReplys($filter: ModelCRMReplyFilterInput, $limit: Int, $nextToken: String) {
    listCRMReplys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        rootId
        content
        when
        authorName
        authorId
        attachment
        parentId
        parent {
          id
          rootId
          content
          when
          authorName
          authorId
          attachment
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
      id
      content
      when
      attachment
      attachmentName
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
export const listMessages = /* GraphQL */ `
  query ListMessages($filter: ModelMessageFilterInput, $limit: Int, $nextToken: String) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        content
        when
        attachment
        attachmentName
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
          primaryOrganization
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`
export const getResourceRoot = /* GraphQL */ `
  query GetResourceRoot($id: ID!) {
    getResourceRoot(id: $id) {
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
export const listResourceRoots = /* GraphQL */ `
  query ListResourceRoots($filter: ModelResourceRootFilterInput, $limit: Int, $nextToken: String) {
    listResourceRoots(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`
export const getResourceMenuItem = /* GraphQL */ `
  query GetResourceMenuItem($id: ID!) {
    getResourceMenuItem(id: $id) {
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
export const listResourceMenuItems = /* GraphQL */ `
  query ListResourceMenuItems(
    $filter: ModelResourceMenuItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listResourceMenuItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          url
          order
        }
        resourceRootID
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
      nextToken
    }
  }
`
export const getResource = /* GraphQL */ `
  query GetResource($id: ID!) {
    getResource(id: $id) {
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
export const listResources = /* GraphQL */ `
  query ListResources($filter: ModelResourceFilterInput, $limit: Int, $nextToken: String) {
    listResources(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`
export const getResourceSeries = /* GraphQL */ `
  query GetResourceSeries($id: ID!) {
    getResourceSeries(id: $id) {
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
export const listResourceSeriess = /* GraphQL */ `
  query ListResourceSeriess(
    $filter: ModelResourceSeriesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listResourceSeriess(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`
export const getResourceEpisode = /* GraphQL */ `
  query GetResourceEpisode($id: ID!) {
    getResourceEpisode(id: $id) {
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
export const listResourceEpisodes = /* GraphQL */ `
  query ListResourceEpisodes(
    $filter: ModelResourceEpisodeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listResourceEpisodes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          category
          status
          seriesID
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      price
      pricePer
      name
      description
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
      marketingDescription
      groupsIncluded
      enabled
      isStripe
      isPaypal
      tiered {
        name
        stripePaymentID
        stripeIsTiered
      }
      createdAt
      updatedAt
    }
  }
`
export const listProducts = /* GraphQL */ `
  query ListProducts($filter: ModelProductFilterInput, $limit: Int, $nextToken: String) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        price
        pricePer
        name
        description
        confirmationMsg
        payments {
          nextToken
        }
        isOrgTier
        isIndividualTier
        isLogin
        marketingDescription
        groupsIncluded
        enabled
        isStripe
        isPaypal
        tiered {
          name
          stripePaymentID
          stripeIsTiered
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const getVodAsset = /* GraphQL */ `
  query GetVodAsset($id: ID!) {
    getVodAsset(id: $id) {
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
export const listVodAssets = /* GraphQL */ `
  query ListVodAssets($filter: ModelvodAssetFilterInput, $limit: Int, $nextToken: String) {
    listVodAssets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`
export const getVideoObject = /* GraphQL */ `
  query GetVideoObject($id: ID!) {
    getVideoObject(id: $id) {
      id
      createdAt
      updatedAt
    }
  }
`
export const listVideoObjects = /* GraphQL */ `
  query ListVideoObjects($filter: ModelvideoObjectFilterInput, $limit: Int, $nextToken: String) {
    listVideoObjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const groupMemberByGroup = /* GraphQL */ `
  query GroupMemberByGroup(
    $groupID: ID
    $userID: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelGroupMemberFilterInput
    $limit: Int
    $nextToken: String
  ) {
    groupMemberByGroup(
      groupID: $groupID
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        groupID
        userID
        group {
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
          primaryOrganization
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`
export const groupMemberByUser = /* GraphQL */ `
  query GroupMemberByUser(
    $userID: ID
    $groupID: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelGroupMemberFilterInput
    $limit: Int
    $nextToken: String
  ) {
    groupMemberByUser(
      userID: $userID
      groupID: $groupID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        groupID
        userID
        group {
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
          primaryOrganization
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`
export const groupByType = /* GraphQL */ `
  query GroupByType(
    $type: String
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    groupByType(
      type: $type
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          primaryOrganization
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`
export const activityByGroup = /* GraphQL */ `
  query ActivityByGroup(
    $readUser: ID
    $time: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelActivityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    activityByGroup(
      readUser: $readUser
      time: $time
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          primaryOrganization
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`
export const paymentByUser = /* GraphQL */ `
  query PaymentByUser(
    $userID: String
    $sortDirection: ModelSortDirection
    $filter: ModelPaymentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    paymentByUser(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        productID
        product {
          id
          price
          pricePer
          name
          description
          confirmationMsg
          isOrgTier
          isIndividualTier
          isLogin
          marketingDescription
          groupsIncluded
          enabled
          isStripe
          isPaypal
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
          primaryOrganization
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`
export const courseTriadUserByUser = /* GraphQL */ `
  query CourseTriadUserByUser(
    $userID: String
    $sortDirection: ModelSortDirection
    $filter: ModelCourseTriadUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    courseTriadUserByUser(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        triadID
        triad {
          id
          courseInfoID
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
          primaryOrganization
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`
export const dmUsersByUser = /* GraphQL */ `
  query DmUsersByUser(
    $roomID: ID
    $userID: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelDirectMessageUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    dmUsersByUser(
      roomID: $roomID
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userName
        userID
        roomID
        room {
          id
          name
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
          primaryOrganization
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`
export const directMessagesByRoom = /* GraphQL */ `
  query DirectMessagesByRoom(
    $messageRoomID: ID
    $when: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelDirectMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    directMessagesByRoom(
      messageRoomID: $messageRoomID
      when: $when
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        content
        attachment
        attachmentName
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
          primaryOrganization
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`
export const messagesByRoom = /* GraphQL */ `
  query MessagesByRoom(
    $roomId: ID
    $when: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesByRoom(
      roomId: $roomId
      when: $when
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        content
        when
        attachment
        attachmentName
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
          primaryOrganization
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`
export const searchGroups = /* GraphQL */ `
  query SearchGroups(
    $filter: SearchableGroupFilterInput
    $sort: SearchableGroupSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchGroups(filter: $filter, sort: $sort, limit: $limit, nextToken: $nextToken, from: $from) {
      items {
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
          primaryOrganization
          createdAt
          updatedAt
        }
      }
      nextToken
      total
    }
  }
`
export const listUsers = /* GraphQL */ `
  query ListUsers($filter: ModelUserFilterInput, $limit: Int, $nextToken: String) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const searchUsers = /* GraphQL */ `
  query SearchUsers(
    $filter: SearchableUserFilterInput
    $sort: SearchableUserSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchUsers(filter: $filter, sort: $sort, limit: $limit, nextToken: $nextToken, from: $from) {
      items {
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
      nextToken
      total
    }
  }
`
