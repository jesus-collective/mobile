export const getCourseInfo = /* GraphQL */ `
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
        name
        leader
         lessons {
          items {
            id
            name
            time
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
          orgDescription
          joined
          createdAt
          updatedAt
        }
        roomID
        room {
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
      resources {
        items {
          id
          type
          menuTitle
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