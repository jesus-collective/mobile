/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export enum PaidState {
  Unknown = "Unknown",
  InProgress = "InProgress",
  NeedsPayment = "NeedsPayment",
  Success = "Success",
}

export type GetCourseInfoQueryVariables = {
  id: string
}

export type GetCourseInfoQuery = {
  getCourseInfo: {
    __typename: "CourseInfo"
    id: string
    designedBy: string | null
    summary: string | null
    sylabusAttachmentName: string | null
    sylabusAttachment: string | null
    backOfficeStaff: {
      __typename: "ModelCourseBackOfficeStaffConnection"
      items: Array<{
        __typename: "CourseBackOfficeStaff"
        id: string
        courseInfoID: string | null
        userID: string | null
        user: {
          __typename: "User"
          id: string
          given_name: string
          family_name: string
          email: string | null
          phone: string | null
          owner: string | null
          mainUserGroup: string | null
          hasPaidState: PaidState | null
          profileState: string | null
          billingAddress: {
            __typename: "Address"
            city: string | null
            country: string | null
            line1: string | null
            line2: string | null
            postal_code: string | null
            state: string | null
          } | null
          location: {
            __typename: "LatLong"
            latitude: string | null
            longitude: string | null
            geocodeFull: string | null
            geocodeCity: string | null
            geocodeRegion: string | null
            randomLatitude: string | null
            randomLongitude: string | null
          } | null
          profileImage: {
            __typename: "Image"
            userId: string | null
            filenameSmall: string | null
            filenameMedium: string | null
            filenameLarge: string | null
            filenameUpload: string | null
          } | null
          aboutMeShort: string | null
          aboutMeLong: string | null
          interests: Array<string | null> | null
          currentRole: string | null
          currentScope: string | null
          personality: string | null
          orgName: string | null
          orgType: string | null
          orgSize: string | null
          denomination: string | null
          pplServed: string | null
          sundayAttendance: string | null
          numberVolunteers: string | null
          orgDescription: string | null
          joined: string | null
          primaryOrganization: string | null
          organizations: {
            __typename: "ModelOrganizationMemberConnection"
            nextToken: string | null
          } | null
          owns: {
            __typename: "ModelGroupConnection"
            nextToken: string | null
          } | null
          groups: {
            __typename: "ModelGroupMemberConnection"
            nextToken: string | null
          } | null
          messages: {
            __typename: "ModelMessageConnection"
            nextToken: string | null
          } | null
          directMessages: {
            __typename: "ModelDirectMessageConnection"
            nextToken: string | null
          } | null
          alertConfig: {
            __typename: "AlertConfig"
            emailDirectMessage: string | null
            emailGroupMessage: string | null
            emailEventMessage: string | null
            emailOrgMessage: string | null
            emailResourceMessage: string | null
            emailCourseMessage: string | null
            emailPromotions: string | null
          } | null
          createdAt: string
          updatedAt: string
        } | null
        createdAt: string
        updatedAt: string
      } | null> | null
    } | null
    instructors: {
      __typename: "ModelCourseInstructorsConnection"
      items: Array<{
        __typename: "CourseInstructors"
        id: string
        courseInfoID: string | null
        userID: string | null
        user: {
          __typename: "User"
          id: string
          given_name: string
          family_name: string
          email: string | null
          phone: string | null
          owner: string | null
          mainUserGroup: string | null
          hasPaidState: PaidState | null
          profileState: string | null
          billingAddress: {
            __typename: "Address"
            city: string | null
            country: string | null
            line1: string | null
            line2: string | null
            postal_code: string | null
            state: string | null
          } | null
          location: {
            __typename: "LatLong"
            latitude: string | null
            longitude: string | null
            geocodeFull: string | null
            geocodeCity: string | null
            geocodeRegion: string | null
            randomLatitude: string | null
            randomLongitude: string | null
          } | null
          profileImage: {
            __typename: "Image"
            userId: string | null
            filenameSmall: string | null
            filenameMedium: string | null
            filenameLarge: string | null
            filenameUpload: string | null
          } | null
          aboutMeShort: string | null
          aboutMeLong: string | null
          interests: Array<string | null> | null
          currentRole: string | null
          currentScope: string | null
          personality: string | null
          orgName: string | null
          orgType: string | null
          orgSize: string | null
          denomination: string | null
          pplServed: string | null
          sundayAttendance: string | null
          numberVolunteers: string | null
          orgDescription: string | null
          joined: string | null
          primaryOrganization: string | null
          organizations: {
            __typename: "ModelOrganizationMemberConnection"
            nextToken: string | null
          } | null
          owns: {
            __typename: "ModelGroupConnection"
            nextToken: string | null
          } | null
          groups: {
            __typename: "ModelGroupMemberConnection"
            nextToken: string | null
          } | null
          messages: {
            __typename: "ModelMessageConnection"
            nextToken: string | null
          } | null
          directMessages: {
            __typename: "ModelDirectMessageConnection"
            nextToken: string | null
          } | null
          alertConfig: {
            __typename: "AlertConfig"
            emailDirectMessage: string | null
            emailGroupMessage: string | null
            emailEventMessage: string | null
            emailOrgMessage: string | null
            emailResourceMessage: string | null
            emailCourseMessage: string | null
            emailPromotions: string | null
          } | null
          createdAt: string
          updatedAt: string
        } | null
        createdAt: string
        updatedAt: string
      } | null> | null
    } | null
    courseWeeks: {
      __typename: "ModelCourseWeekConnection"
      items: Array<{
        __typename: "CourseWeek"
        id: string
        week: string | null
        date: string | null
        tz: string | null
        name: string | null
        title: string | null
        leader: string | null
        lessons: {
          __typename: "ModelCourseLessonConnection"
          items: Array<{
            __typename: "CourseLesson"
            id: string
            lesson: string | null
            lessonType: string | null
            wordCount: string | null
            courseLessonResponseId: string | null
            zoomUrl: string | null
            zoomRecording: string | null
            name: string | null
            time: string | null
            tz: string | null
            duration: string | null
            description: string | null
            createdAt: string
            updatedAt: string
          } | null> | null
          nextToken: string | null
        } | null
        createdAt: string
        updatedAt: string
      } | null> | null
      nextToken: string | null
    } | null
    subTitle: string | null
    introduction: string | null
    triads: {
      __typename: "ModelCourseTriadsConnection"
      items: Array<{
        __typename: "CourseTriads"
        id: string
        courseInfoID: string | null
        coaches: {
          __typename: "ModelCourseTriadCoachesConnection"
          items: Array<{
            __typename: "CourseTriadCoaches"
            id: string
            triadID: string | null
            userID: string | null
            user: {
              __typename: "User"
              id: string
              given_name: string
              family_name: string
              email: string | null
              phone: string | null
              owner: string | null
              profileImage: {
                __typename: "Image"
                userId: string | null
                filenameSmall: string | null
                filenameMedium: string | null
                filenameLarge: string | null
                filenameUpload: string | null
              } | null
            } | null
            createdAt: string
            updatedAt: string
          } | null> | null
          nextToken: string | null
        } | null
        users: {
          __typename: "ModelCourseTriadUsersConnection"
          items: Array<{
            __typename: "CourseTriadUsers"
            id: string
            triadID: string | null
            userID: string | null
            user: {
              __typename: "User"
              id: string
              given_name: string
              family_name: string
              email: string | null
              phone: string | null
              owner: string | null
              profileImage: {
                __typename: "Image"
                userId: string | null
                filenameSmall: string | null
                filenameMedium: string | null
                filenameLarge: string | null
                filenameUpload: string | null
              } | null
            } | null
            createdAt: string
            updatedAt: string
          } | null> | null
          nextToken: string | null
        } | null
        createdAt: string
        updatedAt: string
      } | null> | null
      nextToken: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}
