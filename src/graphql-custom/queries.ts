export const listMenus = /* GraphQL */ `
  query ListMenus($filter: ModelMenuFilterInput, $limit: Int, $nextToken: String) {
    listMenus(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        action
        order
        readGroups
        params
        subItems {
          items {
            id
            menuID
            order
            params
            name
            action
            readGroups
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`

export const listOrganizations = /* GraphQL */ `
  query ListOrganizations($filter: ModelOrganizationFilterInput, $limit: Int, $nextToken: String) {
    listOrganizations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        orgName
        location {
          geocodeFull
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
        orgDescription
        createdAt
        updatedAt
      }
      nextToken
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
        roomType
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
            author {
              id
              given_name
              family_name
              currentRole
            }
            attachmentName
            attachmentOwner
            replies {
              items {
                id
                author {
                  id
                  given_name
                  family_name
                  currentRole
                }
                content
                createdAt
                updatedAt
              }
            }
            when
            recipients
            userId
            messageRoomID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
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
      }
    }
  }
`

export const getUserForGroupOrEvent = /* GraphQL */ `
  query GetUser2($id: ID!) {
    getUser(id: $id) {
      id
      given_name
      family_name
      email
      phone
      owner
      mainUserGroup
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

export const getCourseInfoForOverview = /* GraphQL */ `
  query GetCourseInfo($id: ID!) {
    getCourseInfo(id: $id) {
      id
      designedBy
      summary
      sylabusAttachmentName
      sylabusAttachmentOwner
      sylabusAttachment
      courseWeeks {
        items {
          id
          week
          date
          tz
          name
          title
          leader
          lessons {
            items {
              id
              lesson
              lessonType
              name
              time
              tz
              duration
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      subTitle
      introduction
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
      createdAt
      updatedAt
      author {
        id
        given_name
        family_name
        currentRole
      }
    }
  }
`

export const getDirectMessageUser = /* GraphQL */ `
  query GetDirectMessageUser($id: ID!) {
    getDirectMessageUser(id: $id) {
      id
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
        orgDescription
        joined
        primaryOrganization
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
        createdAt
        updatedAt
      }
      roomID
      room {
        id
        name
        roomType
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
            when
            messageRoomID
            createdAt
            updatedAt
          }
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

export const getGroupForProfile = /* GraphQL */ `
  query GetGroupForProfile($id: ID!) {
    getGroup(id: $id) {
      id
      owner
      readGroups
      type
      name
      description
      ownerUser {
        id
        given_name
        family_name
      }
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
    }
  }
`

export const getGroupForOwner = /* GraphQL */ `
  query GetGroup($id: ID!) {
    getGroup(id: $id) {
      id
      owner
    }
  }
`

export const groupByTypeByTime = /* GraphQL */ `
  query GroupByTypeByTime(
    $type: String
    $time: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    groupByTypeByTime(
      type: $type
      time: $time
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        ownerUser {
          id
          given_name
          family_name
        }
        type
        name
        readGroups
        description
        memberCount
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
        }
        members {
          items {
            id
            userID
            createdAt
          }
        }
        length
        effort
        cost
        eventType
        eventUrl
        tz
        isSponsored
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`

export const groupsJoinedByUser = /* GraphQL */ `
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
        groupID
      }
      nextToken
    }
  }
`

export const resourcesForDirectory = /* GraphQL */ `
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
        ownerUser {
          id
          given_name
          family_name
        }
        ownerOrg {
          id
          orgName
        }
        name
        readGroups
        description
        image
        isSponsored
      }
      nextToken
    }
  }
`

export const groupByTypeForMyGroups = /* GraphQL */ `
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
        ownerUser {
          id
          given_name
          family_name
        }
        ownerOrg {
          id
          orgName
        }
        type
        name
        readGroups
        description
        memberCount
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
        }
        length
        effort
        cost
        eventType
        eventUrl
        tz
        isSponsored
        createdAt
        updatedAt
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
      admins
      superAdmin
      profileState
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

export const getOrgForImage = /* GraphQL */ `
  query getOrganization($id: ID!) {
    getOrganization(id: $id) {
      id
      profileImage {
        userId
        filenameSmall
        filenameMedium
        filenameLarge
        filenameUpload
      }
    }
  }
`

export const listUsersForProfiles = /* GraphQL */ `
  query ListUsers($filter: ModelUserFilterInput, $limit: Int, $nextToken: String) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        given_name
        family_name
        owner
        profileState
        location {
          latitude
          longitude
          geocodeFull
          geocodeCity
          geocodeRegion
          randomLatitude
          randomLongitude
        }
        aboutMeShort
        aboutMeLong
        currentRole
        currentScope
      }
      nextToken
    }
  }
`

export const getUserForProfile = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      given_name
      family_name
      owner
      mainUserGroup
      hasPaidState
      currentScope
      interests
      personality
      profileState
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
      currentRole
      orgName
      createdAt
      updatedAt
    }
  }
`
export const listDirectMessagesForDms = /* GraphQL */ `
  query ListDirectMessages(
    $filter: ModelDirectMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDirectMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        content
        createdAt
      }
      nextToken
    }
  }
`

export const listDirectMessageUsersForDMS = /* GraphQL */ `
  query ListDirectMessageUsersForDMS(
    $filter: ModelDirectMessageUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDirectMessageUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        user {
          id
          given_name
          family_name
        }
        roomID
        room {
          id
          name
          roomType
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
              when
              messageRoomID
              createdAt
              updatedAt
            }
            nextToken
          }
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

export const listDirectMessageUsers = /* GraphQL */ `
  query ListDirectMessageUsers(
    $filter: ModelDirectMessageUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDirectMessageUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        user {
          id
          given_name
          family_name
          email
          phone
          owner
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
          aboutMeShort
          aboutMeLong
          interests
          currentRole
          currentScope
          personality
          orgName
          orgType
          orgSize
          orgDescription
          joined
          createdAt
          updatedAt
        }
        roomID
        room {
          id
          name
          roomType
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
              when
              messageRoomID
              createdAt
              updatedAt
            }
            nextToken
          }
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

export const getResourceRoot = /* GraphQL */ `
  query GetResourceRoot($id: ID!) {
    getResourceRoot(id: $id) {
      id
      type
      groupId
      menuItems {
        items {
          id
          owner
          type
          menuTitle
          order
          depth
          readGroups
          resourceRootID
          pageItems {
            id
            type
            style
            size
            title1
            title2
            description1
            description2
            color
            resourceID
            seriesID
            episodeID
            url
            pageItemsLeft {
              id
              type
              style
              size
              title1
              title2
              description1
              description2
              color
              resourceID
              seriesID
              episodeID
              url
              pageItemsLeft {
                id
                type
                style
                size
                title1
                title2
                description1
                description2
                color
                resourceID
                seriesID
                episodeID
                url
                image {
                  userId
                  filenameSmall
                  filenameMedium
                  filenameLarge
                  filenameUpload
                }
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
                color
                resourceID
                seriesID
                episodeID
                url
                image {
                  userId
                  filenameSmall
                  filenameMedium
                  filenameLarge
                  filenameUpload
                }
              }
              image {
                userId
                filenameSmall
                filenameMedium
                filenameLarge
                filenameUpload
              }
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
              color
              resourceID
              seriesID
              episodeID
              url
              pageItemsLeft {
                id
                type
                style
                size
                title1
                title2
                description1
                description2
                color
                resourceID
                seriesID
                episodeID
                url
                image {
                  userId
                  filenameSmall
                  filenameMedium
                  filenameLarge
                  filenameUpload
                }
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
                color
                resourceID
                seriesID
                episodeID
                url
                image {
                  userId
                  filenameSmall
                  filenameMedium
                  filenameLarge
                  filenameUpload
                }
              }
              image {
                userId
                filenameSmall
                filenameMedium
                filenameLarge
                filenameUpload
              }
            }
            image {
              userId
              filenameSmall
              filenameMedium
              filenameLarge
              filenameUpload
            }
          }
          createdAt
          updatedAt
        }
      }
      resources {
        items {
          id
          type
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
          image {
            userId
            filenameSmall
            filenameMedium
            filenameLarge
            filenameUpload
          }
          title
          subtitle
          description
          extendedDescription
          readGroups
          series {
            items {
              id
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
              category
              status
              episodes {
                items {
                  id
                  episodeNumber
                  type
                  title
                  description
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
                  createdAt
                  updatedAt
                }
                nextToken
              }
              seriesID
              createdAt
              updatedAt
            }
            nextToken
          }
          resourceID
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
