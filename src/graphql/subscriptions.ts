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
      author {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
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
      room {
        id
        owner
        ownerOrgID
        ownerUser {
          id
          given_name
          family_name
          email
          phone
          owner
          mainUserGroup
          hasPaidState
          profileState
          address
          city
          province
          postalCode
          country
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
      }
      createdAt
      updatedAt
    }
  }
`;
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
`;
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
`;
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
`;
export const onCreateGroupMember = /* GraphQL */ `
  subscription OnCreateGroupMember {
    onCreateGroupMember {
      id
      groupID
      userID
      group {
        id
        owner
        ownerOrgID
        ownerUser {
          id
          given_name
          family_name
          email
          phone
          owner
          mainUserGroup
          hasPaidState
          profileState
          address
          city
          province
          postalCode
          country
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
      }
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
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
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateGroupMember = /* GraphQL */ `
  subscription OnUpdateGroupMember {
    onUpdateGroupMember {
      id
      groupID
      userID
      group {
        id
        owner
        ownerOrgID
        ownerUser {
          id
          given_name
          family_name
          email
          phone
          owner
          mainUserGroup
          hasPaidState
          profileState
          address
          city
          province
          postalCode
          country
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
      }
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
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
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteGroupMember = /* GraphQL */ `
  subscription OnDeleteGroupMember {
    onDeleteGroupMember {
      id
      groupID
      userID
      group {
        id
        owner
        ownerOrgID
        ownerUser {
          id
          given_name
          family_name
          email
          phone
          owner
          mainUserGroup
          hasPaidState
          profileState
          address
          city
          province
          postalCode
          country
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
      }
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
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
      createdAt
      updatedAt
    }
  }
`;
export const onCreateGroup = /* GraphQL */ `
  subscription OnCreateGroup {
    onCreateGroup {
      id
      owner
      ownerOrgID
      ownerUser {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
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
    }
  }
`;
export const onUpdateGroup = /* GraphQL */ `
  subscription OnUpdateGroup {
    onUpdateGroup {
      id
      owner
      ownerOrgID
      ownerUser {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
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
    }
  }
`;
export const onDeleteGroup = /* GraphQL */ `
  subscription OnDeleteGroup {
    onDeleteGroup {
      id
      owner
      ownerOrgID
      ownerUser {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
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
    }
  }
`;
export const onCreateOrganizationMember = /* GraphQL */ `
  subscription OnCreateOrganizationMember {
    onCreateOrganizationMember {
      id
      userRole
      userId
      organizationId
      organizationName
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
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
    }
  }
`;
export const onUpdateOrganizationMember = /* GraphQL */ `
  subscription OnUpdateOrganizationMember {
    onUpdateOrganizationMember {
      id
      userRole
      userId
      organizationId
      organizationName
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
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
    }
  }
`;
export const onDeleteOrganizationMember = /* GraphQL */ `
  subscription OnDeleteOrganizationMember {
    onDeleteOrganizationMember {
      id
      userRole
      userId
      organizationId
      organizationName
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
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
    }
  }
`;
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
`;
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
`;
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
`;
export const onCreatePayment = /* GraphQL */ `
  subscription OnCreatePayment {
    onCreatePayment {
      id
      productID
      product {
        id
        price
        name
        description
        confirmationMsg
        payments {
          nextToken
        }
        createdAt
        updatedAt
      }
      userID
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
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
      dateCompleted
      paymentType
      paymentInfo
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePayment = /* GraphQL */ `
  subscription OnUpdatePayment {
    onUpdatePayment {
      id
      productID
      product {
        id
        price
        name
        description
        confirmationMsg
        payments {
          nextToken
        }
        createdAt
        updatedAt
      }
      userID
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
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
      dateCompleted
      paymentType
      paymentInfo
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePayment = /* GraphQL */ `
  subscription OnDeletePayment {
    onDeletePayment {
      id
      productID
      product {
        id
        price
        name
        description
        confirmationMsg
        payments {
          nextToken
        }
        createdAt
        updatedAt
      }
      userID
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
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
      dateCompleted
      paymentType
      paymentInfo
      createdAt
      updatedAt
    }
  }
`;
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
`;
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
`;
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
`;
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
`;
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
`;
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
`;
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
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
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
      createdAt
      updatedAt
    }
  }
`;
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
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
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
      createdAt
      updatedAt
    }
  }
`;
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
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
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
      createdAt
      updatedAt
    }
  }
`;
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
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
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
      createdAt
      updatedAt
    }
  }
`;
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
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
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
      createdAt
      updatedAt
    }
  }
`;
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
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
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
      createdAt
      updatedAt
    }
  }
`;
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
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
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
      createdAt
      updatedAt
    }
  }
`;
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
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
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
      createdAt
      updatedAt
    }
  }
`;
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
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
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
      createdAt
      updatedAt
    }
  }
`;
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
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
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
      createdAt
      updatedAt
    }
  }
`;
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
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
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
      createdAt
      updatedAt
    }
  }
`;
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
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
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
      createdAt
      updatedAt
    }
  }
`;
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
`;
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
`;
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
`;
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
`;
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
`;
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
`;
export const onCreateDirectMessageUser = /* GraphQL */ `
  subscription OnCreateDirectMessageUser {
    onCreateDirectMessageUser {
      id
      userName
      userID
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
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
    }
  }
`;
export const onUpdateDirectMessageUser = /* GraphQL */ `
  subscription OnUpdateDirectMessageUser {
    onUpdateDirectMessageUser {
      id
      userName
      userID
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
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
    }
  }
`;
export const onDeleteDirectMessageUser = /* GraphQL */ `
  subscription OnDeleteDirectMessageUser {
    onDeleteDirectMessageUser {
      id
      userName
      userID
      user {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
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
    }
  }
`;
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
`;
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
`;
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
`;
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
      author {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
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
    }
  }
`;
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
      author {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
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
    }
  }
`;
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
      author {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
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
    }
  }
`;
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
      author {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
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
      room {
        id
        owner
        ownerOrgID
        ownerUser {
          id
          given_name
          family_name
          email
          phone
          owner
          mainUserGroup
          hasPaidState
          profileState
          address
          city
          province
          postalCode
          country
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
      }
      createdAt
      updatedAt
    }
  }
`;
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
      author {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
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
      room {
        id
        owner
        ownerOrgID
        ownerUser {
          id
          given_name
          family_name
          email
          phone
          owner
          mainUserGroup
          hasPaidState
          profileState
          address
          city
          province
          postalCode
          country
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
      }
      createdAt
      updatedAt
    }
  }
`;
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
      author {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
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
      room {
        id
        owner
        ownerOrgID
        ownerUser {
          id
          given_name
          family_name
          email
          phone
          owner
          mainUserGroup
          hasPaidState
          profileState
          address
          city
          province
          postalCode
          country
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
      }
      createdAt
      updatedAt
    }
  }
`;
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
          menuTitle
          order
          title
          subtitle
          description
          whoIsThisFor
          extendedDescription
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
      createdAt
      updatedAt
    }
  }
`;
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
          menuTitle
          order
          title
          subtitle
          description
          whoIsThisFor
          extendedDescription
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
      createdAt
      updatedAt
    }
  }
`;
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
          menuTitle
          order
          title
          subtitle
          description
          whoIsThisFor
          extendedDescription
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
      createdAt
      updatedAt
    }
  }
`;
export const onCreateResource = /* GraphQL */ `
  subscription OnCreateResource($owner: String) {
    onCreateResource(owner: $owner) {
      id
      owner
      type
      menuTitle
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
      series {
        items {
          id
          owner
          type
          title
          description
          whoIsThisFor
          image
          category
          status
          allFiles
          playlist
          playlistImage
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateResource = /* GraphQL */ `
  subscription OnUpdateResource($owner: String) {
    onUpdateResource(owner: $owner) {
      id
      owner
      type
      menuTitle
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
      series {
        items {
          id
          owner
          type
          title
          description
          whoIsThisFor
          image
          category
          status
          allFiles
          playlist
          playlistImage
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteResource = /* GraphQL */ `
  subscription OnDeleteResource($owner: String) {
    onDeleteResource(owner: $owner) {
      id
      owner
      type
      menuTitle
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
      series {
        items {
          id
          owner
          type
          title
          description
          whoIsThisFor
          image
          category
          status
          allFiles
          playlist
          playlistImage
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateResourceSeries = /* GraphQL */ `
  subscription OnCreateResourceSeries($owner: String) {
    onCreateResourceSeries(owner: $owner) {
      id
      owner
      type
      title
      description
      whoIsThisFor
      image
      category
      status
      allFiles
      playlist
      playlistImage
      episodes {
        items {
          id
          owner
          episodeNumber
          type
          title
          description
          whoIsThisFor
          videoPreview
          videoLowRes
          videoHiRes
          lessonPlan
          activityPage
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
        menuTitle
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
`;
export const onUpdateResourceSeries = /* GraphQL */ `
  subscription OnUpdateResourceSeries($owner: String) {
    onUpdateResourceSeries(owner: $owner) {
      id
      owner
      type
      title
      description
      whoIsThisFor
      image
      category
      status
      allFiles
      playlist
      playlistImage
      episodes {
        items {
          id
          owner
          episodeNumber
          type
          title
          description
          whoIsThisFor
          videoPreview
          videoLowRes
          videoHiRes
          lessonPlan
          activityPage
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
        menuTitle
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
`;
export const onDeleteResourceSeries = /* GraphQL */ `
  subscription OnDeleteResourceSeries($owner: String) {
    onDeleteResourceSeries(owner: $owner) {
      id
      owner
      type
      title
      description
      whoIsThisFor
      image
      category
      status
      allFiles
      playlist
      playlistImage
      episodes {
        items {
          id
          owner
          episodeNumber
          type
          title
          description
          whoIsThisFor
          videoPreview
          videoLowRes
          videoHiRes
          lessonPlan
          activityPage
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
        menuTitle
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
`;
export const onCreateResourceEpisode = /* GraphQL */ `
  subscription OnCreateResourceEpisode($owner: String) {
    onCreateResourceEpisode(owner: $owner) {
      id
      owner
      episodeNumber
      type
      title
      description
      whoIsThisFor
      videoPreview
      videoLowRes
      videoHiRes
      lessonPlan
      activityPage
      episodeID
      parentSeries {
        id
        owner
        type
        title
        description
        whoIsThisFor
        image
        category
        status
        allFiles
        playlist
        playlistImage
        episodes {
          nextToken
        }
        seriesID
        parentResource {
          id
          owner
          type
          menuTitle
          order
          title
          subtitle
          description
          whoIsThisFor
          extendedDescription
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
`;
export const onUpdateResourceEpisode = /* GraphQL */ `
  subscription OnUpdateResourceEpisode($owner: String) {
    onUpdateResourceEpisode(owner: $owner) {
      id
      owner
      episodeNumber
      type
      title
      description
      whoIsThisFor
      videoPreview
      videoLowRes
      videoHiRes
      lessonPlan
      activityPage
      episodeID
      parentSeries {
        id
        owner
        type
        title
        description
        whoIsThisFor
        image
        category
        status
        allFiles
        playlist
        playlistImage
        episodes {
          nextToken
        }
        seriesID
        parentResource {
          id
          owner
          type
          menuTitle
          order
          title
          subtitle
          description
          whoIsThisFor
          extendedDescription
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
`;
export const onDeleteResourceEpisode = /* GraphQL */ `
  subscription OnDeleteResourceEpisode($owner: String) {
    onDeleteResourceEpisode(owner: $owner) {
      id
      owner
      episodeNumber
      type
      title
      description
      whoIsThisFor
      videoPreview
      videoLowRes
      videoHiRes
      lessonPlan
      activityPage
      episodeID
      parentSeries {
        id
        owner
        type
        title
        description
        whoIsThisFor
        image
        category
        status
        allFiles
        playlist
        playlistImage
        episodes {
          nextToken
        }
        seriesID
        parentResource {
          id
          owner
          type
          menuTitle
          order
          title
          subtitle
          description
          whoIsThisFor
          extendedDescription
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
`;
export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct {
    onCreateProduct {
      id
      price
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
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct {
    onUpdateProduct {
      id
      price
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
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct {
    onDeleteProduct {
      id
      price
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
      createdAt
      updatedAt
    }
  }
`;
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
`;
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
`;
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
`;
export const onCreateVideoObject = /* GraphQL */ `
  subscription OnCreateVideoObject {
    onCreateVideoObject {
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateVideoObject = /* GraphQL */ `
  subscription OnUpdateVideoObject {
    onUpdateVideoObject {
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteVideoObject = /* GraphQL */ `
  subscription OnDeleteVideoObject {
    onDeleteVideoObject {
      id
      createdAt
      updatedAt
    }
  }
`;
