/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMessageByRoomId = /* GraphQL */ `
  subscription OnCreateMessageByRoomId($roomId: ID!) {
    onCreateMessageByRoomId(roomId: $roomId) {
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
export const onCreateCrmMessageByRootId = /* GraphQL */ `
  subscription OnCreateCrmMessageByRootId($rootId: ID!) {
    onCreateCrmMessageByRootId(rootId: $rootId) {
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
export const onCreateCrmReplyByRootId = /* GraphQL */ `
  subscription OnCreateCrmReplyByRootId($rootId: ID!) {
    onCreateCrmReplyByRootId(rootId: $rootId) {
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
export const onCreateApplicationProcess = /* GraphQL */ `
  subscription OnCreateApplicationProcess {
    onCreateApplicationProcess {
      id
      createdAt
      updatedAt
    }
  }
`
export const onUpdateApplicationProcess = /* GraphQL */ `
  subscription OnUpdateApplicationProcess {
    onUpdateApplicationProcess {
      id
      createdAt
      updatedAt
    }
  }
`
export const onDeleteApplicationProcess = /* GraphQL */ `
  subscription OnDeleteApplicationProcess {
    onDeleteApplicationProcess {
      id
      createdAt
      updatedAt
    }
  }
`
export const onCreateGroupMember = /* GraphQL */ `
  subscription OnCreateGroupMember {
    onCreateGroupMember {
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
export const onUpdateGroupMember = /* GraphQL */ `
  subscription OnUpdateGroupMember {
    onUpdateGroupMember {
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
export const onDeleteGroupMember = /* GraphQL */ `
  subscription OnDeleteGroupMember {
    onDeleteGroupMember {
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
export const onCreateGroup = /* GraphQL */ `
  subscription OnCreateGroup($owner: String, $ownerOrgID: String) {
    onCreateGroup(owner: $owner, ownerOrgID: $ownerOrgID) {
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
export const onUpdateGroup = /* GraphQL */ `
  subscription OnUpdateGroup($owner: String, $ownerOrgID: String) {
    onUpdateGroup(owner: $owner, ownerOrgID: $ownerOrgID) {
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
export const onDeleteGroup = /* GraphQL */ `
  subscription OnDeleteGroup($owner: String, $ownerOrgID: String) {
    onDeleteGroup(owner: $owner, ownerOrgID: $ownerOrgID) {
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
export const onCreateOrganizationMember = /* GraphQL */ `
  subscription OnCreateOrganizationMember {
    onCreateOrganizationMember {
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
export const onUpdateOrganizationMember = /* GraphQL */ `
  subscription OnUpdateOrganizationMember {
    onUpdateOrganizationMember {
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
export const onDeleteOrganizationMember = /* GraphQL */ `
  subscription OnDeleteOrganizationMember {
    onDeleteOrganizationMember {
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
export const onCreateOrganization = /* GraphQL */ `
  subscription OnCreateOrganization {
    onCreateOrganization {
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
export const onUpdateOrganization = /* GraphQL */ `
  subscription OnUpdateOrganization {
    onUpdateOrganization {
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
export const onDeleteOrganization = /* GraphQL */ `
  subscription OnDeleteOrganization {
    onDeleteOrganization {
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
export const onCreateActivity = /* GraphQL */ `
  subscription OnCreateActivity($readUser: String!) {
    onCreateActivity(readUser: $readUser) {
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
export const onUpdateActivity = /* GraphQL */ `
  subscription OnUpdateActivity($readUser: String!) {
    onUpdateActivity(readUser: $readUser) {
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
export const onDeleteActivity = /* GraphQL */ `
  subscription OnDeleteActivity($readUser: String!) {
    onDeleteActivity(readUser: $readUser) {
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
export const onCreatePayment = /* GraphQL */ `
  subscription OnCreatePayment {
    onCreatePayment {
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
export const onUpdatePayment = /* GraphQL */ `
  subscription OnUpdatePayment {
    onUpdatePayment {
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
export const onDeletePayment = /* GraphQL */ `
  subscription OnDeletePayment {
    onDeletePayment {
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
export const onCreateCourseInfo = /* GraphQL */ `
  subscription OnCreateCourseInfo($owner: String) {
    onCreateCourseInfo(owner: $owner) {
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
export const onUpdateCourseInfo = /* GraphQL */ `
  subscription OnUpdateCourseInfo($owner: String) {
    onUpdateCourseInfo(owner: $owner) {
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
export const onDeleteCourseInfo = /* GraphQL */ `
  subscription OnDeleteCourseInfo($owner: String) {
    onDeleteCourseInfo(owner: $owner) {
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
export const onCreateCourseTriads = /* GraphQL */ `
  subscription OnCreateCourseTriads {
    onCreateCourseTriads {
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
export const onUpdateCourseTriads = /* GraphQL */ `
  subscription OnUpdateCourseTriads {
    onUpdateCourseTriads {
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
export const onDeleteCourseTriads = /* GraphQL */ `
  subscription OnDeleteCourseTriads {
    onDeleteCourseTriads {
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
export const onCreateCourseBackOfficeStaff = /* GraphQL */ `
  subscription OnCreateCourseBackOfficeStaff {
    onCreateCourseBackOfficeStaff {
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
export const onUpdateCourseBackOfficeStaff = /* GraphQL */ `
  subscription OnUpdateCourseBackOfficeStaff {
    onUpdateCourseBackOfficeStaff {
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
export const onDeleteCourseBackOfficeStaff = /* GraphQL */ `
  subscription OnDeleteCourseBackOfficeStaff {
    onDeleteCourseBackOfficeStaff {
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
export const onCreateCourseInstructors = /* GraphQL */ `
  subscription OnCreateCourseInstructors {
    onCreateCourseInstructors {
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
export const onUpdateCourseInstructors = /* GraphQL */ `
  subscription OnUpdateCourseInstructors {
    onUpdateCourseInstructors {
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
export const onDeleteCourseInstructors = /* GraphQL */ `
  subscription OnDeleteCourseInstructors {
    onDeleteCourseInstructors {
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
export const onCreateCourseTriadCoaches = /* GraphQL */ `
  subscription OnCreateCourseTriadCoaches {
    onCreateCourseTriadCoaches {
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
export const onUpdateCourseTriadCoaches = /* GraphQL */ `
  subscription OnUpdateCourseTriadCoaches {
    onUpdateCourseTriadCoaches {
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
export const onDeleteCourseTriadCoaches = /* GraphQL */ `
  subscription OnDeleteCourseTriadCoaches {
    onDeleteCourseTriadCoaches {
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
export const onCreateCourseTriadUsers = /* GraphQL */ `
  subscription OnCreateCourseTriadUsers {
    onCreateCourseTriadUsers {
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
export const onUpdateCourseTriadUsers = /* GraphQL */ `
  subscription OnUpdateCourseTriadUsers {
    onUpdateCourseTriadUsers {
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
export const onDeleteCourseTriadUsers = /* GraphQL */ `
  subscription OnDeleteCourseTriadUsers {
    onDeleteCourseTriadUsers {
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
export const onCreateCourseWeek = /* GraphQL */ `
  subscription OnCreateCourseWeek($owner: String) {
    onCreateCourseWeek(owner: $owner) {
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
export const onUpdateCourseWeek = /* GraphQL */ `
  subscription OnUpdateCourseWeek($owner: String) {
    onUpdateCourseWeek(owner: $owner) {
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
export const onDeleteCourseWeek = /* GraphQL */ `
  subscription OnDeleteCourseWeek($owner: String) {
    onDeleteCourseWeek(owner: $owner) {
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
export const onCreateCourseLesson = /* GraphQL */ `
  subscription OnCreateCourseLesson($owner: String) {
    onCreateCourseLesson(owner: $owner) {
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
export const onUpdateCourseLesson = /* GraphQL */ `
  subscription OnUpdateCourseLesson($owner: String) {
    onUpdateCourseLesson(owner: $owner) {
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
export const onDeleteCourseLesson = /* GraphQL */ `
  subscription OnDeleteCourseLesson($owner: String) {
    onDeleteCourseLesson(owner: $owner) {
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
export const onCreateDirectMessageUser = /* GraphQL */ `
  subscription OnCreateDirectMessageUser {
    onCreateDirectMessageUser {
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
export const onUpdateDirectMessageUser = /* GraphQL */ `
  subscription OnUpdateDirectMessageUser {
    onUpdateDirectMessageUser {
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
export const onDeleteDirectMessageUser = /* GraphQL */ `
  subscription OnDeleteDirectMessageUser {
    onDeleteDirectMessageUser {
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
export const onCreateDirectMessageRoom = /* GraphQL */ `
  subscription OnCreateDirectMessageRoom {
    onCreateDirectMessageRoom {
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
export const onUpdateDirectMessageRoom = /* GraphQL */ `
  subscription OnUpdateDirectMessageRoom {
    onUpdateDirectMessageRoom {
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
export const onDeleteDirectMessageRoom = /* GraphQL */ `
  subscription OnDeleteDirectMessageRoom {
    onDeleteDirectMessageRoom {
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
export const onCreateDirectMessage = /* GraphQL */ `
  subscription OnCreateDirectMessage {
    onCreateDirectMessage {
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
export const onUpdateDirectMessage = /* GraphQL */ `
  subscription OnUpdateDirectMessage {
    onUpdateDirectMessage {
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
export const onDeleteDirectMessage = /* GraphQL */ `
  subscription OnDeleteDirectMessage {
    onDeleteDirectMessage {
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
export const onCreateDirectMessageReply = /* GraphQL */ `
  subscription OnCreateDirectMessageReply {
    onCreateDirectMessageReply {
      id
      content
      when
      attachment
      attachmentName
      recipients
      userId
      messageId
      parentMessage {
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
      messageRoomID
      parentReplyId
      parentReply {
        id
        content
        when
        attachment
        attachmentName
        recipients
        userId
        messageId
        parentMessage {
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
        messageRoomID
        parentReplyId
        parentReply {
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
export const onUpdateDirectMessageReply = /* GraphQL */ `
  subscription OnUpdateDirectMessageReply {
    onUpdateDirectMessageReply {
      id
      content
      when
      attachment
      attachmentName
      recipients
      userId
      messageId
      parentMessage {
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
      messageRoomID
      parentReplyId
      parentReply {
        id
        content
        when
        attachment
        attachmentName
        recipients
        userId
        messageId
        parentMessage {
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
        messageRoomID
        parentReplyId
        parentReply {
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
export const onDeleteDirectMessageReply = /* GraphQL */ `
  subscription OnDeleteDirectMessageReply {
    onDeleteDirectMessageReply {
      id
      content
      when
      attachment
      attachmentName
      recipients
      userId
      messageId
      parentMessage {
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
      messageRoomID
      parentReplyId
      parentReply {
        id
        content
        when
        attachment
        attachmentName
        recipients
        userId
        messageId
        parentMessage {
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
        messageRoomID
        parentReplyId
        parentReply {
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
export const onCreateCrmRoot = /* GraphQL */ `
  subscription OnCreateCrmRoot {
    onCreateCRMRoot {
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
export const onUpdateCrmRoot = /* GraphQL */ `
  subscription OnUpdateCrmRoot {
    onUpdateCRMRoot {
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
export const onDeleteCrmRoot = /* GraphQL */ `
  subscription OnDeleteCrmRoot {
    onDeleteCRMRoot {
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
export const onCreateCrmMessage = /* GraphQL */ `
  subscription OnCreateCrmMessage {
    onCreateCRMMessage {
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
export const onUpdateCrmMessage = /* GraphQL */ `
  subscription OnUpdateCrmMessage {
    onUpdateCRMMessage {
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
export const onDeleteCrmMessage = /* GraphQL */ `
  subscription OnDeleteCrmMessage {
    onDeleteCRMMessage {
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
export const onCreateCrmReply = /* GraphQL */ `
  subscription OnCreateCrmReply {
    onCreateCRMReply {
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
export const onUpdateCrmReply = /* GraphQL */ `
  subscription OnUpdateCrmReply {
    onUpdateCRMReply {
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
export const onDeleteCrmReply = /* GraphQL */ `
  subscription OnDeleteCrmReply {
    onDeleteCRMReply {
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
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage {
    onCreateMessage {
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
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage {
    onUpdateMessage {
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
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage {
    onDeleteMessage {
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
export const onCreateReply = /* GraphQL */ `
  subscription OnCreateReply {
    onCreateReply {
      id
      content
      when
      attachment
      attachmentName
      userId
      messageId
      parentMessage {
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
      roomId
      parentReplyId
      parentReply {
        id
        content
        when
        attachment
        attachmentName
        userId
        messageId
        parentMessage {
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
        roomId
        parentReplyId
        parentReply {
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
export const onUpdateReply = /* GraphQL */ `
  subscription OnUpdateReply {
    onUpdateReply {
      id
      content
      when
      attachment
      attachmentName
      userId
      messageId
      parentMessage {
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
      roomId
      parentReplyId
      parentReply {
        id
        content
        when
        attachment
        attachmentName
        userId
        messageId
        parentMessage {
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
        roomId
        parentReplyId
        parentReply {
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
export const onDeleteReply = /* GraphQL */ `
  subscription OnDeleteReply {
    onDeleteReply {
      id
      content
      when
      attachment
      attachmentName
      userId
      messageId
      parentMessage {
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
      roomId
      parentReplyId
      parentReply {
        id
        content
        when
        attachment
        attachmentName
        userId
        messageId
        parentMessage {
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
        roomId
        parentReplyId
        parentReply {
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
export const onCreateResourceRoot = /* GraphQL */ `
  subscription OnCreateResourceRoot {
    onCreateResourceRoot {
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
export const onUpdateResourceRoot = /* GraphQL */ `
  subscription OnUpdateResourceRoot {
    onUpdateResourceRoot {
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
export const onDeleteResourceRoot = /* GraphQL */ `
  subscription OnDeleteResourceRoot {
    onDeleteResourceRoot {
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
export const onCreateResourceMenuItem = /* GraphQL */ `
  subscription OnCreateResourceMenuItem($owner: String) {
    onCreateResourceMenuItem(owner: $owner) {
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
export const onUpdateResourceMenuItem = /* GraphQL */ `
  subscription OnUpdateResourceMenuItem($owner: String) {
    onUpdateResourceMenuItem(owner: $owner) {
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
export const onDeleteResourceMenuItem = /* GraphQL */ `
  subscription OnDeleteResourceMenuItem($owner: String) {
    onDeleteResourceMenuItem(owner: $owner) {
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
export const onCreateResource = /* GraphQL */ `
  subscription OnCreateResource($owner: String) {
    onCreateResource(owner: $owner) {
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
export const onUpdateResource = /* GraphQL */ `
  subscription OnUpdateResource($owner: String) {
    onUpdateResource(owner: $owner) {
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
export const onDeleteResource = /* GraphQL */ `
  subscription OnDeleteResource($owner: String) {
    onDeleteResource(owner: $owner) {
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
export const onCreateResourceSeries = /* GraphQL */ `
  subscription OnCreateResourceSeries($owner: String) {
    onCreateResourceSeries(owner: $owner) {
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
export const onUpdateResourceSeries = /* GraphQL */ `
  subscription OnUpdateResourceSeries($owner: String) {
    onUpdateResourceSeries(owner: $owner) {
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
export const onDeleteResourceSeries = /* GraphQL */ `
  subscription OnDeleteResourceSeries($owner: String) {
    onDeleteResourceSeries(owner: $owner) {
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
export const onCreateResourceEpisode = /* GraphQL */ `
  subscription OnCreateResourceEpisode($owner: String) {
    onCreateResourceEpisode(owner: $owner) {
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
export const onUpdateResourceEpisode = /* GraphQL */ `
  subscription OnUpdateResourceEpisode($owner: String) {
    onUpdateResourceEpisode(owner: $owner) {
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
export const onDeleteResourceEpisode = /* GraphQL */ `
  subscription OnDeleteResourceEpisode($owner: String) {
    onDeleteResourceEpisode(owner: $owner) {
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
export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct {
    onCreateProduct {
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
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct {
    onUpdateProduct {
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
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct {
    onDeleteProduct {
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
export const onCreateVodAsset = /* GraphQL */ `
  subscription OnCreateVodAsset {
    onCreateVodAsset {
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
export const onUpdateVodAsset = /* GraphQL */ `
  subscription OnUpdateVodAsset {
    onUpdateVodAsset {
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
export const onDeleteVodAsset = /* GraphQL */ `
  subscription OnDeleteVodAsset {
    onDeleteVodAsset {
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
export const onCreateVideoObject = /* GraphQL */ `
  subscription OnCreateVideoObject {
    onCreateVideoObject {
      id
      createdAt
      updatedAt
    }
  }
`
export const onUpdateVideoObject = /* GraphQL */ `
  subscription OnUpdateVideoObject {
    onUpdateVideoObject {
      id
      createdAt
      updatedAt
    }
  }
`
export const onDeleteVideoObject = /* GraphQL */ `
  subscription OnDeleteVideoObject {
    onDeleteVideoObject {
      id
      createdAt
      updatedAt
    }
  }
`
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
