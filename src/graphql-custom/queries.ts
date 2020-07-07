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