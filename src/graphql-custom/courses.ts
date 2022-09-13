export const getCourseInfo = /* GraphQL */ `
  query GetCourseInfo($id: ID!) {
    getCourseInfo(id: $id) {
      id
      designedBy
      summary
      sylabusAttachmentName
      sylabusAttachmentOwner
      separatedTriads
      sylabusAttachment
      backOfficeStaff {
        items {
          id
          courseInfoID
          userID
          user {
            id
            given_name
            family_name
            isArchived
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
      instructors {
        items {
          id
          courseInfoID
          userID
          user {
            id
            given_name
            family_name
            isArchived
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
                isArchived
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
                isArchived
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
