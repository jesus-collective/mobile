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
const getCourseUsers = `
query GetCourseInfo($id: ID!) {
  getCourseInfo(id: $id) {
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
  }
}
`

module.exports = {
  getCourseUsers,
  getUser,
  getCourseWeek,
  getDirectMessageRoom,
  getCourseInfoIdFromLesson,
}
