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

export const getUserForProfile = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      given_name
      family_name
      owner
      mainUserGroup
      hasPaidState
      profileState
      profileImage {
        userId
        filenameSmall
        filenameMedium
        filenameLarge
        filenameUpload
      }
      aboutMeShort
      currentRole
      orgName
      createdAt
      updatedAt
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
