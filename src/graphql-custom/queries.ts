export const listDirectMessageRooms = /* GraphQL */ `
  query ListDirectMessageRooms(
    $filter: ModelDirectMessageRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDirectMessageRooms(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
`;
export const getUserForGroupOrEvent = /* GraphQL */ `
  query GetUser($id: ID!) {
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
      billingAddress{
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
`;
export const getCourseInfoForOverview = /* GraphQL */ `
query GetCourseInfo($id: ID!) {
  getCourseInfo(id: $id) {
    id
    designedBy
    summary
    sylabusAttachmentName
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
export const getCourseInfo = /* GraphQL */ `
query GetCourseInfo($id: ID!) {
  getCourseInfo(id: $id) {
    id
    designedBy
    summary
    sylabusAttachmentName
    sylabusAttachment
    backOfficeStaff 
    {
      items {
          id
          courseInfoID
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
        billingAddress{
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
    instructors 
    {
      items {
          id
          courseInfoID
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
        billingAddress{
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
            wordCount
            courseLessonResponseId
            zoomUrl
            zoomRecording
            name
            time
            tz
            duration 
            description
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
    triads {
        items {
          id
          courseInfoID
          coaches {
            items {
              id
              triadID
              userID
              user {
                id
                given_name
                family_name
                email
                phone
                owner
                profileImage {
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
            nextToken
          }
          users {
            items {
              id
              triadID
              userID
              user {
                id
                given_name
                family_name
                email
                phone
                owner
                profileImage {
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
            nextToken
          }
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
         billingAddress{
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
 `;
export const getGroupForOwner = /* GraphQL */ `
  query GetGroup($id: ID!) {
    getGroup(id: $id) {
      id
      owner
    }
  }
`;
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
`;

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
`;

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
`;
export const listDirectMessageUsers = /* GraphQL */ `
  query ListDirectMessageUsers(
    $filter: ModelDirectMessageUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDirectMessageUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
          billingAddress{
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
`;

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
          resourceRootID
          pageItems {
            type
            style
            size
            title1
            title2
            description1
            description2
            color
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
        
          image {
            userId
            filenameSmall
            filenameMedium
            filenameLarge
            filenameUpload
          }
          title
          description
          extendedDescription
          series {
            items {
                id
                type
                title
                description
                image
                category
                status
                allFiles
                playlist
                playlistImage
                episodes {
                    items {
                    id
                    episodeNumber
                    type
                    title
                    description
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
`;