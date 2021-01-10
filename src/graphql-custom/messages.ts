export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
      attachment
      attachmentName
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
        }
      }
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
          userId
          messageId
          parentReplyId
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
      userId
      messageId
      parentMessage {
        roomId
      }
      createdAt
      updatedAt
    }
  }
`
