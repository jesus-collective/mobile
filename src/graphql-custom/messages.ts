export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
      attachment
      attachmentName
      attachmentOwner
      author {
        aboutMeLong
        aboutMeShort
        createdAt
        currentRole
        currentScope
        denomination
        email
        family_name
        given_name
        hasPaidState
        id
        interests
        joined
        mainUserGroup
        numberVolunteers
        orgDescription
        orgName
        orgSize
        orgType
        owner
        phone
        personality
        pplServed
        primaryOrganization
        profileState
        stripeCustomerID
        stripeSubscriptionID
        sundayAttendance
        updatedAt
      }
      content
      createdAt
      id
      owner
      postingAs
      roomId
      updatedAt
      userId
      when
      replies {
        items {
          attachment
          attachmentName
          attachmentOwner
          author {
            aboutMeLong
            aboutMeShort
            createdAt
            currentRole
            currentScope
            denomination
            email
            family_name
            given_name
            hasPaidState
            id
            interests
            joined
            mainUserGroup
            numberVolunteers
            orgDescription
            orgName
            orgSize
            orgType
            owner
            personality
            phone
            pplServed
            primaryOrganization
            updatedAt
            sundayAttendance
            stripeCustomerID
            stripeSubscriptionID
            profileState
          }
          content
          createdAt
          id
          messageId
          parentReplyId
          updatedAt
          userId
          when
          roomId
        }
      }
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
        attachmentOwner
        when
        recipients
        userId
        replies {
          items {
            attachment
            attachmentName
            attachmentOwner
            author {
              aboutMeLong
              aboutMeShort
              createdAt
              currentRole
              currentScope
              denomination
              family_name
              given_name
              hasPaidState
              id
              interests
              joined
              mainUserGroup
              numberVolunteers
              orgDescription
              orgName
              orgSize
              orgType
              owner
              personality
              pplServed
              primaryOrganization
              updatedAt
              sundayAttendance
              profileState
            }
            content
            createdAt
            id
            messageId
            parentReplyId
            updatedAt
            userId
            when
            messageRoomID
          }
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
          owner
          mainUserGroup
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
      nextToken
      items {
        attachment
        attachmentName
        attachmentOwner
        author {
          aboutMeLong
          aboutMeShort
          createdAt
          currentRole
          currentScope
          denomination
          family_name
          given_name
          hasPaidState
          id
          interests
          joined
          mainUserGroup
          numberVolunteers
          orgDescription
          orgName
          orgSize
          orgType
          owner
          personality
          pplServed
          primaryOrganization
          profileState
          sundayAttendance
          updatedAt
        }
        content
        createdAt
        id
        owner
        postingAs
        roomId
        updatedAt
        userId
        when
        replies {
          items {
            attachment
            attachmentName
            attachmentOwner
            author {
              aboutMeLong
              aboutMeShort
              createdAt
              currentRole
              currentScope
              denomination
              family_name
              given_name
              hasPaidState
              id
              interests
              joined
              mainUserGroup
              numberVolunteers
              orgDescription
              orgName
              orgSize
              orgType
              owner
              personality
              pplServed
              primaryOrganization
              updatedAt
              sundayAttendance
              profileState
            }
            content
            createdAt
            id
            messageId
            parentReplyId
            updatedAt
            userId
            when
            roomId
          }
        }
      }
    }
  }
`

export const onCreateMessageByRoomId = /* GraphQL */ `
  subscription OnCreateMessageByRoomId($roomId: ID!) {
    onCreateMessageByRoomId(roomId: $roomId) {
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
          attachmentOwner
          userId
          messageId
          parentReplyId
          createdAt
          updatedAt
          roomId
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
      attachmentOwner
      userId
      messageId
      roomId
      parentMessage {
        roomId
      }
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
      attachmentOwner
      userId
      messageId
      parentMessage {
        messageRoomID
      }
      messageRoomID
      parentReplyId
      createdAt
      updatedAt
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
      attachmentOwner
      when
      recipients
      userId
      replies {
        items {
          attachment
          attachmentName
          attachmentOwner
          author {
            aboutMeLong
            aboutMeShort
            createdAt
            currentRole
            currentScope
            denomination
            email
            family_name
            given_name
            hasPaidState
            id
            interests
            joined
            mainUserGroup
            numberVolunteers
            orgDescription
            orgName
            orgSize
            orgType
            owner
            personality
            phone
            pplServed
            primaryOrganization
            updatedAt
            sundayAttendance
            stripeCustomerID
            stripeSubscriptionID
            profileState
          }
          content
          createdAt
          id
          messageId
          parentReplyId
          updatedAt
          userId
          when
          messageRoomID
        }
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
  }
`
