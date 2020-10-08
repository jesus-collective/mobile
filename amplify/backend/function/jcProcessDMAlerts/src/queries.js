const graphql = require('graphql');
const { print } = graphql;
const gql = require('graphql-tag');


const getUser = /* GraphQL */ `
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
exports.getUser = getUser;