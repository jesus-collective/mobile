/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type ModelDirectMessageRoomFilterInput = {
  id?: ModelIDFilterInput | null
  name?: ModelStringFilterInput | null
  roomType?: ModelStringFilterInput | null
  and?: Array<ModelDirectMessageRoomFilterInput | null> | null
  or?: Array<ModelDirectMessageRoomFilterInput | null> | null
  not?: ModelDirectMessageRoomFilterInput | null
}

export type ModelIDFilterInput = {
  ne?: string | null
  eq?: string | null
  le?: string | null
  lt?: string | null
  ge?: string | null
  gt?: string | null
  contains?: string | null
  notContains?: string | null
  between?: Array<string | null> | null
  beginsWith?: string | null
}

export type ModelStringFilterInput = {
  ne?: string | null
  eq?: string | null
  le?: string | null
  lt?: string | null
  ge?: string | null
  gt?: string | null
  contains?: string | null
  notContains?: string | null
  between?: Array<string | null> | null
  beginsWith?: string | null
}

export enum PaidState {
  Unknown = "Unknown",
  InProgress = "InProgress",
  NeedsPayment = "NeedsPayment",
  Success = "Success",
}

export type ModelIDKeyConditionInput = {
  eq?: string | null
  le?: string | null
  lt?: string | null
  ge?: string | null
  gt?: string | null
  between?: Array<string | null> | null
  beginsWith?: string | null
}

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export type ModelGroupFilterInput = {
  id?: ModelIDFilterInput | null
  owner?: ModelStringFilterInput | null
  readGroups?: ModelUserGroupTypeListFilterInput | null
  ownerOrgID?: ModelIDFilterInput | null
  type?: ModelStringFilterInput | null
  name?: ModelStringFilterInput | null
  description?: ModelStringFilterInput | null
  memberCount?: ModelIntFilterInput | null
  image?: ModelStringFilterInput | null
  time?: ModelStringFilterInput | null
  lastUpdated?: ModelStringFilterInput | null
  location?: ModelStringFilterInput | null
  length?: ModelStringFilterInput | null
  effort?: ModelStringFilterInput | null
  cost?: ModelStringFilterInput | null
  promotionalText?: ModelStringFilterInput | null
  eventType?: ModelStringFilterInput | null
  eventUrl?: ModelStringFilterInput | null
  tz?: ModelStringFilterInput | null
  isSponsored?: ModelStringFilterInput | null
  and?: Array<ModelGroupFilterInput | null> | null
  or?: Array<ModelGroupFilterInput | null> | null
  not?: ModelGroupFilterInput | null
}

export type ModelUserGroupTypeListFilterInput = {
  eq?: Array<UserGroupType | null> | null
  ne?: Array<UserGroupType | null> | null
  contains?: UserGroupType | null
  notContains?: UserGroupType | null
}

export enum UserGroupType {
  verifiedUsers = "verifiedUsers",
  admin = "admin",
  courseAdmin = "courseAdmin",
  courseCoach = "courseCoach",
  courseUser = "courseUser",
  friends = "friends",
  partners = "partners",
  subscriptionPartners = "subscriptionPartners",
  subscriptionkyearlyyears = "subscriptionkyearlyyears",
  subscriptionkykids = "subscriptionkykids",
  subscriptionkyyouth = "subscriptionkyyouth",
  subscriptionValid = "subscriptionValid",
  userpool = "userpool",
  legacyUserGroup1 = "legacyUserGroup1",
}

export type ModelIntFilterInput = {
  ne?: number | null
  eq?: number | null
  le?: number | null
  lt?: number | null
  ge?: number | null
  gt?: number | null
  between?: Array<number | null> | null
}

export type ModelDirectMessageUserFilterInput = {
  id?: ModelIDFilterInput | null
  userName?: ModelStringFilterInput | null
  userID?: ModelIDFilterInput | null
  roomID?: ModelIDFilterInput | null
  and?: Array<ModelDirectMessageUserFilterInput | null> | null
  or?: Array<ModelDirectMessageUserFilterInput | null> | null
  not?: ModelDirectMessageUserFilterInput | null
}

export enum ResourceMenuItemType {
  resource = "resource",
  menuItem = "menuItem",
  break = "break",
  schedule = "schedule",
  curriculum = "curriculum",
}

export enum ResourcePageItemType {
  Menu = "Menu",
  Header = "Header",
  RichText = "RichText",
  List = "List",
  Grid = "Grid",
  Column = "Column",
  Card = "Card",
  DropDownPicker = "DropDownPicker",
}

export enum ResourcePageItemStyle {
  MenuTop = "MenuTop",
  MenuLeft = "MenuLeft",
  Column3070 = "Column3070",
  Column7030 = "Column7030",
  Column5050 = "Column5050",
  CardManual = "CardManual",
  CardAuto = "CardAuto",
  CardLarge = "CardLarge",
  RichTextH1 = "RichTextH1",
  RichTextH2 = "RichTextH2",
  RichTextH3 = "RichTextH3",
  RichTextH4 = "RichTextH4",
  RichTextH5 = "RichTextH5",
  RichTextH6 = "RichTextH6",
  RichTextH1Small = "RichTextH1Small",
  RichTextH2Small = "RichTextH2Small",
  RichTextH3Small = "RichTextH3Small",
  RichTextH4Small = "RichTextH4Small",
  RichTextH5Small = "RichTextH5Small",
  RichTextH6Small = "RichTextH6Small",
  RichTextBody1 = "RichTextBody1",
  RichTextBody2 = "RichTextBody2",
  RichTextBody3 = "RichTextBody3",
  RichTextBody4 = "RichTextBody4",
  GridManual = "GridManual",
  GridAuto = "GridAuto",
  ListManual = "ListManual",
  ListAuto = "ListAuto",
}

export enum ResourceDetailType {
  DefaultYoutube = "DefaultYoutube",
  Image = "Image",
  Button = "Button",
  Link = "Link",
}

export type ListDirectMessageRoomsQueryVariables = {
  filter?: ModelDirectMessageRoomFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListDirectMessageRoomsQuery = {
  listDirectMessageRooms: {
    __typename: "ModelDirectMessageRoomConnection"
    items: Array<{
      __typename: "DirectMessageRoom"
      id: string
      name: string | null
      roomType: string | null
      messageUsers: {
        __typename: "ModelDirectMessageUserConnection"
        items: Array<{
          __typename: "DirectMessageUser"
          id: string
          userName: string | null
          userID: string
          roomID: string
          createdAt: string
          updatedAt: string
        } | null> | null
        nextToken: string | null
      } | null
      directMessage: {
        __typename: "ModelDirectMessageConnection"
        items: Array<{
          __typename: "DirectMessage"
          id: string
          content: string | null
          attachment: string | null
          attachmentName: string | null
          when: string
          recipients: Array<string | null>
          userId: string
          messageRoomID: string
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
}

export type GetUser2QueryVariables = {
  id: string
}

export type GetUser2Query = {
  getUser: {
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
      items: Array<{
        __typename: "OrganizationMember"
        id: string
        userRole: string
        userId: string
        organizationId: string
        organizationName: string | null
        createdAt: string
        updatedAt: string
      } | null> | null
      nextToken: string | null
    } | null
    owns: {
      __typename: "ModelGroupConnection"
      items: Array<{
        __typename: "Group"
        id: string
        owner: string
        ownerOrgID: string
        type: string
        name: string
        description: string
        memberCount: number | null
        image: string
        time: string | null
        lastUpdated: string | null
        location: string | null
        length: string | null
        effort: string | null
        cost: string | null
        promotionalText: string | null
        eventType: string | null
        eventUrl: string | null
        tz: string | null
        isSponsored: string | null
        createdAt: string
        updatedAt: string
      } | null> | null
      nextToken: string | null
    } | null
    groups: {
      __typename: "ModelGroupMemberConnection"
      items: Array<{
        __typename: "GroupMember"
        id: string
        groupID: string | null
        userID: string | null
        createdAt: string
        updatedAt: string
      } | null> | null
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
            name: string | null
            time: string | null
            tz: string | null
            duration: string | null
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
    createdAt: string
    updatedAt: string
  } | null
}

export type GetDirectMessageUserQueryVariables = {
  id: string
}

export type GetDirectMessageUserQuery = {
  getDirectMessageUser: {
    __typename: "DirectMessageUser"
    id: string
    userID: string
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
      orgDescription: string | null
      joined: string | null
      primaryOrganization: string | null
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
      createdAt: string
      updatedAt: string
    } | null
    roomID: string
    room: {
      __typename: "DirectMessageRoom"
      id: string
      name: string | null
      roomType: string | null
      messageUsers: {
        __typename: "ModelDirectMessageUserConnection"
        items: Array<{
          __typename: "DirectMessageUser"
          id: string
          userName: string | null
          userID: string
          roomID: string
          createdAt: string
          updatedAt: string
        } | null> | null
        nextToken: string | null
      } | null
      directMessage: {
        __typename: "ModelDirectMessageConnection"
        items: Array<{
          __typename: "DirectMessage"
          id: string
          content: string | null
          when: string
          messageRoomID: string
          createdAt: string
          updatedAt: string
        } | null> | null
        nextToken: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type GetGroupQueryVariables = {
  id: string
}

export type GetGroupQuery = {
  getGroup: {
    __typename: "Group"
    id: string
    owner: string
  } | null
}

export type GroupByTypeQueryVariables = {
  type?: string | null
  id?: ModelIDKeyConditionInput | null
  sortDirection?: ModelSortDirection | null
  filter?: ModelGroupFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type GroupByTypeQuery = {
  groupByType: {
    __typename: "ModelGroupConnection"
    items: Array<{
      __typename: "Group"
      id: string
      owner: string
      ownerUser: {
        __typename: "User"
        id: string
        given_name: string
        family_name: string
      } | null
      type: string
      name: string
      readGroups: Array<UserGroupType | null> | null
      description: string
      memberCount: number | null
      image: string
      time: string | null
      lastUpdated: string | null
      location: string | null
      locationLatLong: {
        __typename: "LatLong"
        latitude: string | null
        longitude: string | null
        geocodeFull: string | null
        geocodeCity: string | null
        geocodeRegion: string | null
      } | null
      length: string | null
      effort: string | null
      cost: string | null
      eventType: string | null
      eventUrl: string | null
      tz: string | null
      isSponsored: string | null
      createdAt: string
      updatedAt: string
    } | null> | null
    nextToken: string | null
  } | null
}

export type getOrganizationQueryVariables = {
  id: string
}

export type getOrganizationQuery = {
  getOrganization: {
    __typename: "Organization"
    id: string
    profileImage: {
      __typename: "Image"
      userId: string | null
      filenameSmall: string | null
      filenameMedium: string | null
      filenameLarge: string | null
      filenameUpload: string | null
    } | null
  } | null
}

export type GetUserQueryVariables = {
  id: string
}

export type GetUserQuery = {
  getUser: {
    __typename: "User"
    id: string
    given_name: string
    family_name: string
    owner: string | null
    mainUserGroup: string | null
    hasPaidState: PaidState | null
    profileState: string | null
    profileImage: {
      __typename: "Image"
      userId: string | null
      filenameSmall: string | null
      filenameMedium: string | null
      filenameLarge: string | null
      filenameUpload: string | null
    } | null
    aboutMeShort: string | null
    currentRole: string | null
    orgName: string | null
    createdAt: string
    updatedAt: string
  } | null
}

export type ListDirectMessageUsersQueryVariables = {
  filter?: ModelDirectMessageUserFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListDirectMessageUsersQuery = {
  listDirectMessageUsers: {
    __typename: "ModelDirectMessageUserConnection"
    items: Array<{
      __typename: "DirectMessageUser"
      id: string
      userID: string
      user: {
        __typename: "User"
        id: string
        given_name: string
        family_name: string
        email: string | null
        phone: string | null
        owner: string | null
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
        aboutMeShort: string | null
        aboutMeLong: string | null
        interests: Array<string | null> | null
        currentRole: string | null
        currentScope: string | null
        personality: string | null
        orgName: string | null
        orgType: string | null
        orgSize: string | null
        orgDescription: string | null
        joined: string | null
        createdAt: string
        updatedAt: string
      } | null
      roomID: string
      room: {
        __typename: "DirectMessageRoom"
        id: string
        name: string | null
        roomType: string | null
        messageUsers: {
          __typename: "ModelDirectMessageUserConnection"
          items: Array<{
            __typename: "DirectMessageUser"
            id: string
            userName: string | null
            userID: string
            roomID: string
            createdAt: string
            updatedAt: string
          } | null> | null
          nextToken: string | null
        } | null
        directMessage: {
          __typename: "ModelDirectMessageConnection"
          items: Array<{
            __typename: "DirectMessage"
            id: string
            content: string | null
            when: string
            messageRoomID: string
            createdAt: string
            updatedAt: string
          } | null> | null
          nextToken: string | null
        } | null
        createdAt: string
        updatedAt: string
      } | null
      createdAt: string
      updatedAt: string
    } | null> | null
    nextToken: string | null
  } | null
}

export type GetResourceRootQueryVariables = {
  id: string
}

export type GetResourceRootQuery = {
  getResourceRoot: {
    __typename: "ResourceRoot"
    id: string
    type: string | null
    groupId: string | null
    menuItems: {
      __typename: "ModelResourceMenuItemConnection"
      items: Array<{
        __typename: "ResourceMenuItem"
        id: string
        owner: string | null
        type: ResourceMenuItemType | null
        menuTitle: string | null
        order: string | null
        depth: string | null
        readGroups: Array<UserGroupType | null> | null
        resourceRootID: string
        pageItems: Array<{
          __typename: "ResourcePageItem"
          id: string | null
          type: ResourcePageItemType | null
          style: ResourcePageItemStyle | null
          size: string | null
          title1: string | null
          title2: string | null
          description1: string | null
          description2: string | null
          color: string | null
          resourceID: string | null
          seriesID: string | null
          episodeID: string | null
          url: string | null
          pageItemsLeft: Array<{
            __typename: "ResourcePageItem"
            id: string | null
            type: ResourcePageItemType | null
            style: ResourcePageItemStyle | null
            size: string | null
            title1: string | null
            title2: string | null
            description1: string | null
            description2: string | null
            color: string | null
            resourceID: string | null
            seriesID: string | null
            episodeID: string | null
            url: string | null
            pageItemsLeft: Array<{
              __typename: "ResourcePageItem"
              id: string | null
              type: ResourcePageItemType | null
              style: ResourcePageItemStyle | null
              size: string | null
              title1: string | null
              title2: string | null
              description1: string | null
              description2: string | null
              color: string | null
              resourceID: string | null
              seriesID: string | null
              episodeID: string | null
              url: string | null
              image: {
                __typename: "Image"
                userId: string | null
                filenameSmall: string | null
                filenameMedium: string | null
                filenameLarge: string | null
                filenameUpload: string | null
              } | null
            } | null> | null
            pageItemsRight: Array<{
              __typename: "ResourcePageItem"
              id: string | null
              type: ResourcePageItemType | null
              style: ResourcePageItemStyle | null
              size: string | null
              title1: string | null
              title2: string | null
              description1: string | null
              description2: string | null
              color: string | null
              resourceID: string | null
              seriesID: string | null
              episodeID: string | null
              url: string | null
              image: {
                __typename: "Image"
                userId: string | null
                filenameSmall: string | null
                filenameMedium: string | null
                filenameLarge: string | null
                filenameUpload: string | null
              } | null
            } | null> | null
            image: {
              __typename: "Image"
              userId: string | null
              filenameSmall: string | null
              filenameMedium: string | null
              filenameLarge: string | null
              filenameUpload: string | null
            } | null
          } | null> | null
          pageItemsRight: Array<{
            __typename: "ResourcePageItem"
            id: string | null
            type: ResourcePageItemType | null
            style: ResourcePageItemStyle | null
            size: string | null
            title1: string | null
            title2: string | null
            description1: string | null
            description2: string | null
            color: string | null
            resourceID: string | null
            seriesID: string | null
            episodeID: string | null
            url: string | null
            pageItemsLeft: Array<{
              __typename: "ResourcePageItem"
              id: string | null
              type: ResourcePageItemType | null
              style: ResourcePageItemStyle | null
              size: string | null
              title1: string | null
              title2: string | null
              description1: string | null
              description2: string | null
              color: string | null
              resourceID: string | null
              seriesID: string | null
              episodeID: string | null
              url: string | null
              image: {
                __typename: "Image"
                userId: string | null
                filenameSmall: string | null
                filenameMedium: string | null
                filenameLarge: string | null
                filenameUpload: string | null
              } | null
            } | null> | null
            pageItemsRight: Array<{
              __typename: "ResourcePageItem"
              id: string | null
              type: ResourcePageItemType | null
              style: ResourcePageItemStyle | null
              size: string | null
              title1: string | null
              title2: string | null
              description1: string | null
              description2: string | null
              color: string | null
              resourceID: string | null
              seriesID: string | null
              episodeID: string | null
              url: string | null
              image: {
                __typename: "Image"
                userId: string | null
                filenameSmall: string | null
                filenameMedium: string | null
                filenameLarge: string | null
                filenameUpload: string | null
              } | null
            } | null> | null
            image: {
              __typename: "Image"
              userId: string | null
              filenameSmall: string | null
              filenameMedium: string | null
              filenameLarge: string | null
              filenameUpload: string | null
            } | null
          } | null> | null
          image: {
            __typename: "Image"
            userId: string | null
            filenameSmall: string | null
            filenameMedium: string | null
            filenameLarge: string | null
            filenameUpload: string | null
          } | null
        } | null> | null
        createdAt: string
        updatedAt: string
      } | null> | null
    } | null
    resources: {
      __typename: "ModelResourceConnection"
      items: Array<{
        __typename: "Resource"
        id: string
        type: string | null
        details: Array<{
          __typename: "ResourceDetail"
          type: ResourceDetailType | null
          name: string | null
          text: string | null
          value: string | null
          image: {
            __typename: "Image"
            userId: string | null
            filenameSmall: string | null
            filenameMedium: string | null
            filenameLarge: string | null
            filenameUpload: string | null
          } | null
        } | null> | null
        image: {
          __typename: "Image"
          userId: string | null
          filenameSmall: string | null
          filenameMedium: string | null
          filenameLarge: string | null
          filenameUpload: string | null
        } | null
        title: string | null
        subtitle: string | null
        description: string | null
        extendedDescription: string | null
        readGroups: Array<UserGroupType | null> | null
        series: {
          __typename: "ModelResourceSeriesConnection"
          items: Array<{
            __typename: "ResourceSeries"
            id: string
            type: string | null
            title: string | null
            description: string | null
            imageFile: {
              __typename: "Image"
              userId: string | null
              filenameSmall: string | null
              filenameMedium: string | null
              filenameLarge: string | null
              filenameUpload: string | null
            } | null
            details: Array<{
              __typename: "ResourceDetail"
              type: ResourceDetailType | null
              name: string | null
              text: string | null
              value: string | null
              image: {
                __typename: "Image"
                userId: string | null
                filenameSmall: string | null
                filenameMedium: string | null
                filenameLarge: string | null
                filenameUpload: string | null
              } | null
            } | null> | null
            category: Array<string | null> | null
            status: string | null
            episodes: {
              __typename: "ModelResourceEpisodeConnection"
              items: Array<{
                __typename: "ResourceEpisode"
                id: string
                episodeNumber: number | null
                type: string | null
                title: string | null
                description: string | null
                details: Array<{
                  __typename: "ResourceDetail"
                  type: ResourceDetailType | null
                  name: string | null
                  text: string | null
                  value: string | null
                  image: {
                    __typename: "Image"
                    userId: string | null
                    filenameSmall: string | null
                    filenameMedium: string | null
                    filenameLarge: string | null
                    filenameUpload: string | null
                  } | null
                } | null> | null
                episodeID: string
                createdAt: string
                updatedAt: string
              } | null> | null
              nextToken: string | null
            } | null
            seriesID: string
            createdAt: string
            updatedAt: string
          } | null> | null
          nextToken: string | null
        } | null
        resourceID: string
        createdAt: string
        updatedAt: string
      } | null> | null
      nextToken: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}
