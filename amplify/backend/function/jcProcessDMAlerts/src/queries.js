const graphql = require("graphql")
const { print } = graphql
const gql = require("graphql-tag")

const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      given_name
      family_name
      email
      owner
      mainUserGroup
      profileImage {
        userId
        filenameSmall
        filenameMedium
        filenameLarge
        filenameUpload
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

const getCourseInfo = /* GraphQL */ `
  query GetCourseInfo($id: ID!) {
    getCourseInfo(id: $id) {
      id
      separatedTriads
      instructors {
        items {
          userID
        }
      }
      backOfficeStaff {
        items {
          userID
        }
      }
      triads {
        items {
          users {
            items {
              userID
            }
          }
          coaches {
            items {
              userID
            }
          }
        }
      }
    }
  }
`

const getCourseWeek = /* GraphQL */ `
  query GetCourseWeek($id: ID!) {
    getCourseWeek(id: $id) {
      courseInfoID
    }
  }
`

const getCourseLesson = /* GraphQL */ `
  query GetCourseLesson($id: ID!) {
    getCourseLesson(id: $id) {
      courseWeekID
    }
  }
`

module.exports = {
  getUser,
  getCourseWeek,
  getCourseLesson,
  getCourseInfo,
}
