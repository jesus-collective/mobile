const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      given_name
      family_name
    }
  }
`
const getCourseWeek = `
  query GetCourseWeek($id: ID!) {
    getCourseWeek(id: $id) {
      courseInfoID
    }
  }
`
const getDirectMessageRoom = `
  query GetDirectMessageRoom($id: ID!) {
    getDirectMessageRoom(id: $id) {
      roomType
    }
  }
`

const getCourseInfoIdFromLesson = `
  query GetCourseLesson($id: ID!) {
    getCourseLesson(id: $id) {
      id
      courseWeek {
        courseInfoID
      }
    }
  }
`

module.exports = { getUser, getCourseWeek, getDirectMessageRoom, getCourseInfoIdFromLesson }
