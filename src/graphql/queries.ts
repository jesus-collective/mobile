/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
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
      owns {
        items {
          id
          owner
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
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
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
      nextToken
    }
  }
`;
export const getGroup = /* GraphQL */ `
  query GetGroup($id: ID!) {
    getGroup(id: $id) {
      id
      owner
      ownerUser {
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
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
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
      type
      name
      description
      memberCount
      members {
        items {
          id
          groupID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
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
      eventType
      eventUrl
      tz
      isSponsored
      createdAt
      updatedAt
    }
  }
`;
export const listGroups = /* GraphQL */ `
  query ListGroups(
    $filter: ModelGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        ownerUser {
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
          createdAt
          updatedAt
        }
        type
        name
        description
        memberCount
        members {
          nextToken
        }
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
        messages {
          nextToken
        }
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
export const getOrganization = /* GraphQL */ `
  query GetOrganization($id: ID!) {
    getOrganization(id: $id) {
      id
      orgName
      admins
      superAdmin
      hasPaidState
      profileState
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
      orgType
      orgSize
      orgDescription
      joined
      parentOrganizationId
      parentOrganization {
        id
        orgName
        admins
        superAdmin
        hasPaidState
        profileState
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
        orgType
        orgSize
        orgDescription
        joined
        parentOrganizationId
        parentOrganization {
          id
          orgName
          admins
          superAdmin
          hasPaidState
          profileState
          country
          aboutMeShort
          aboutMeLong
          orgType
          orgSize
          orgDescription
          joined
          parentOrganizationId
          createdAt
          updatedAt
        }
        subOrganizations {
          nextToken
        }
        members {
          nextToken
        }
        resource {
          nextToken
        }
        createdAt
        updatedAt
      }
      subOrganizations {
        items {
          id
          orgName
          admins
          superAdmin
          hasPaidState
          profileState
          country
          aboutMeShort
          aboutMeLong
          orgType
          orgSize
          orgDescription
          joined
          parentOrganizationId
          createdAt
          updatedAt
        }
        nextToken
      }
      members {
        items {
          id
          userRole
          userId
          organizationId
          createdAt
          updatedAt
        }
        nextToken
      }
      resource {
        items {
          id
          type
          groupId
          organizationId
          owner
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
export const listOrganizations = /* GraphQL */ `
  query ListOrganizations(
    $filter: ModelOrganizationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrganizations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        orgName
        admins
        superAdmin
        hasPaidState
        profileState
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
        orgType
        orgSize
        orgDescription
        joined
        parentOrganizationId
        parentOrganization {
          id
          orgName
          admins
          superAdmin
          hasPaidState
          profileState
          country
          aboutMeShort
          aboutMeLong
          orgType
          orgSize
          orgDescription
          joined
          parentOrganizationId
          createdAt
          updatedAt
        }
        subOrganizations {
          nextToken
        }
        members {
          nextToken
        }
        resource {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCourseInfo = /* GraphQL */ `
  query GetCourseInfo($id: ID!) {
    getCourseInfo(id: $id) {
      id
      designedBy
      summary
      courseWeeks {
        items {
          id
          week
          date
          tz
          name
          leader
          createdAt
          updatedAt
        }
        nextToken
      }
      subTitle
      instructor {
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
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
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
      triads {
        items {
          id
          createdAt
          updatedAt
        }
        nextToken
      }
      introduction
      createdAt
      updatedAt
    }
  }
`;
export const listCourseInfos = /* GraphQL */ `
  query ListCourseInfos(
    $filter: ModelCourseInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCourseInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        designedBy
        summary
        courseWeeks {
          nextToken
        }
        subTitle
        instructor {
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
          createdAt
          updatedAt
        }
        triads {
          nextToken
        }
        introduction
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCourseTriads = /* GraphQL */ `
  query GetCourseTriads($id: ID!) {
    getCourseTriads(id: $id) {
      id
      courseInfo {
        id
        designedBy
        summary
        courseWeeks {
          nextToken
        }
        subTitle
        instructor {
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
          createdAt
          updatedAt
        }
        triads {
          nextToken
        }
        introduction
        createdAt
        updatedAt
      }
      coach {
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
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
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
      triad {
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
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
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
      createdAt
      updatedAt
    }
  }
`;
export const listCourseTriadss = /* GraphQL */ `
  query ListCourseTriadss(
    $filter: ModelCourseTriadsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCourseTriadss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        courseInfo {
          id
          designedBy
          summary
          subTitle
          introduction
          createdAt
          updatedAt
        }
        coach {
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
          createdAt
          updatedAt
        }
        triad {
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
export const getCourseWeek = /* GraphQL */ `
  query GetCourseWeek($id: ID!) {
    getCourseWeek(id: $id) {
      id
      week
      date
      tz
      name
      leader
      courseInfo {
        id
        designedBy
        summary
        courseWeeks {
          nextToken
        }
        subTitle
        instructor {
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
          createdAt
          updatedAt
        }
        triads {
          nextToken
        }
        introduction
        createdAt
        updatedAt
      }
      lessons {
        items {
          id
          lesson
          name
          time
          tz
          description
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
export const listCourseWeeks = /* GraphQL */ `
  query ListCourseWeeks(
    $filter: ModelCourseWeekFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCourseWeeks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        week
        date
        tz
        name
        leader
        courseInfo {
          id
          designedBy
          summary
          subTitle
          introduction
          createdAt
          updatedAt
        }
        lessons {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCourseLesson = /* GraphQL */ `
  query GetCourseLesson($id: ID!) {
    getCourseLesson(id: $id) {
      id
      lesson
      name
      time
      tz
      description
      courseWeek {
        id
        week
        date
        tz
        name
        leader
        courseInfo {
          id
          designedBy
          summary
          subTitle
          introduction
          createdAt
          updatedAt
        }
        lessons {
          nextToken
        }
        createdAt
        updatedAt
      }
      assignments {
        items {
          id
          assignment
          due
          description
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
export const listCourseLessons = /* GraphQL */ `
  query ListCourseLessons(
    $filter: ModelCourseLessonFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCourseLessons(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        lesson
        name
        time
        tz
        description
        courseWeek {
          id
          week
          date
          tz
          name
          leader
          createdAt
          updatedAt
        }
        assignments {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCourseAssignment = /* GraphQL */ `
  query GetCourseAssignment($id: ID!) {
    getCourseAssignment(id: $id) {
      id
      assignment
      due
      description
      courseLesson {
        id
        lesson
        name
        time
        tz
        description
        courseWeek {
          id
          week
          date
          tz
          name
          leader
          createdAt
          updatedAt
        }
        assignments {
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
export const listCourseAssignments = /* GraphQL */ `
  query ListCourseAssignments(
    $filter: ModelCourseAssignmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCourseAssignments(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        assignment
        due
        description
        courseLesson {
          id
          lesson
          name
          time
          tz
          description
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
export const getDirectMessageUser = /* GraphQL */ `
  query GetDirectMessageUser($id: ID!) {
    getDirectMessageUser(id: $id) {
      id
      userName
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
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
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
          nextToken
        }
        directMessage {
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
        userName
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
          createdAt
          updatedAt
        }
        roomID
        room {
          id
          name
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
export const getDirectMessageRoom = /* GraphQL */ `
  query GetDirectMessageRoom($id: ID!) {
    getDirectMessageRoom(id: $id) {
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
          attachment
          attachmentName
          when
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
  }
`;
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
        messageUsers {
          nextToken
        }
        directMessage {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getDirectMessage = /* GraphQL */ `
  query GetDirectMessage($id: ID!) {
    getDirectMessage(id: $id) {
      id
      content
      attachment
      attachmentName
      when
      userId
      author {
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
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
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
      messageRoomID
      messageRoom {
        id
        name
        messageUsers {
          nextToken
        }
        directMessage {
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
export const listDirectMessages = /* GraphQL */ `
  query ListDirectMessages(
    $filter: ModelDirectMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDirectMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        content
        attachment
        attachmentName
        when
        userId
        author {
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
          createdAt
          updatedAt
        }
        messageRoomID
        messageRoom {
          id
          name
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
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
      id
      content
      when
      attachment
      attachmentName
      roomId
      userId
      postingAs
      owner
      author {
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
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
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
      room {
        id
        owner
        ownerUser {
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
          createdAt
          updatedAt
        }
        type
        name
        description
        memberCount
        members {
          nextToken
        }
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
        messages {
          nextToken
        }
        eventType
        eventUrl
        tz
        isSponsored
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        author {
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
          createdAt
          updatedAt
        }
        room {
          id
          owner
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
          eventType
          eventUrl
          tz
          isSponsored
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
      organizationId
      owner
      resources {
        items {
          id
          owner
          type
          menuTitle
          order
          title
          description
          whoIsThisFor
          extendedDescription
          resourceID
          createdAt
          updatedAt
        }
        nextToken
      }
      organization {
        id
        orgName
        admins
        superAdmin
        hasPaidState
        profileState
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
        orgType
        orgSize
        orgDescription
        joined
        parentOrganizationId
        parentOrganization {
          id
          orgName
          admins
          superAdmin
          hasPaidState
          profileState
          country
          aboutMeShort
          aboutMeLong
          orgType
          orgSize
          orgDescription
          joined
          parentOrganizationId
          createdAt
          updatedAt
        }
        subOrganizations {
          nextToken
        }
        members {
          nextToken
        }
        resource {
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
export const listResourceRoots = /* GraphQL */ `
  query ListResourceRoots(
    $filter: ModelResourceRootFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listResourceRoots(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        groupId
        organizationId
        owner
        resources {
          nextToken
        }
        organization {
          id
          orgName
          admins
          superAdmin
          hasPaidState
          profileState
          country
          aboutMeShort
          aboutMeLong
          orgType
          orgSize
          orgDescription
          joined
          parentOrganizationId
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
export const getResource = /* GraphQL */ `
  query GetResource($id: ID!) {
    getResource(id: $id) {
      id
      owner
      type
      menuTitle
      order
      title
      image {
        userId
        filenameSmall
        filenameMedium
        filenameLarge
        filenameUpload
      }
      description
      whoIsThisFor
      extendedDescription
      series {
        items {
          id
          owner
          type
          title
          description
          whoIsThisFor
          image
          category
          status
          allFiles
          playlist
          playlistImage
          seriesID
          createdAt
          updatedAt
        }
        nextToken
      }
      resourceID
      resourceRoot {
        id
        type
        groupId
        organizationId
        owner
        resources {
          nextToken
        }
        organization {
          id
          orgName
          admins
          superAdmin
          hasPaidState
          profileState
          country
          aboutMeShort
          aboutMeLong
          orgType
          orgSize
          orgDescription
          joined
          parentOrganizationId
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listResources = /* GraphQL */ `
  query ListResources(
    $filter: ModelResourceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listResources(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        type
        menuTitle
        order
        title
        image {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        description
        whoIsThisFor
        extendedDescription
        series {
          nextToken
        }
        resourceID
        resourceRoot {
          id
          type
          groupId
          organizationId
          owner
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
export const getResourceSeries = /* GraphQL */ `
  query GetResourceSeries($id: ID!) {
    getResourceSeries(id: $id) {
      id
      owner
      type
      title
      description
      whoIsThisFor
      image
      category
      status
      allFiles
      playlist
      playlistImage
      episodes {
        items {
          id
          owner
          episodeNumber
          type
          title
          description
          whoIsThisFor
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
      parentResource {
        id
        owner
        type
        menuTitle
        order
        title
        image {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        description
        whoIsThisFor
        extendedDescription
        series {
          nextToken
        }
        resourceID
        resourceRoot {
          id
          type
          groupId
          organizationId
          owner
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listResourceSeriess = /* GraphQL */ `
  query ListResourceSeriess(
    $filter: ModelResourceSeriesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listResourceSeriess(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        type
        title
        description
        whoIsThisFor
        image
        category
        status
        allFiles
        playlist
        playlistImage
        episodes {
          nextToken
        }
        seriesID
        parentResource {
          id
          owner
          type
          menuTitle
          order
          title
          description
          whoIsThisFor
          extendedDescription
          resourceID
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
export const getResourceEpisode = /* GraphQL */ `
  query GetResourceEpisode($id: ID!) {
    getResourceEpisode(id: $id) {
      id
      owner
      episodeNumber
      type
      title
      description
      whoIsThisFor
      videoPreview
      videoLowRes
      videoHiRes
      lessonPlan
      activityPage
      episodeID
      parentSeries {
        id
        owner
        type
        title
        description
        whoIsThisFor
        image
        category
        status
        allFiles
        playlist
        playlistImage
        episodes {
          nextToken
        }
        seriesID
        parentResource {
          id
          owner
          type
          menuTitle
          order
          title
          description
          whoIsThisFor
          extendedDescription
          resourceID
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listResourceEpisodes = /* GraphQL */ `
  query ListResourceEpisodes(
    $filter: ModelResourceEpisodeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listResourceEpisodes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        episodeNumber
        type
        title
        description
        whoIsThisFor
        videoPreview
        videoLowRes
        videoHiRes
        lessonPlan
        activityPage
        episodeID
        parentSeries {
          id
          owner
          type
          title
          description
          whoIsThisFor
          image
          category
          status
          allFiles
          playlist
          playlistImage
          seriesID
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
export const groupMemberByGroup = /* GraphQL */ `
  query GroupMemberByGroup(
    $groupID: ID
    $userID: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelGroupMemberFilterInput
    $limit: Int
    $nextToken: String
  ) {
    groupMemberByGroup(
      groupID: $groupID
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        groupID
        userID
        group {
          id
          owner
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
          eventType
          eventUrl
          tz
          isSponsored
          createdAt
          updatedAt
        }
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
export const groupMemberByUser = /* GraphQL */ `
  query GroupMemberByUser(
    $userID: ID
    $groupID: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelGroupMemberFilterInput
    $limit: Int
    $nextToken: String
  ) {
    groupMemberByUser(
      userID: $userID
      groupID: $groupID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        groupID
        userID
        group {
          id
          owner
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
          eventType
          eventUrl
          tz
          isSponsored
          createdAt
          updatedAt
        }
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
export const groupByType = /* GraphQL */ `
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
          createdAt
          updatedAt
        }
        type
        name
        description
        memberCount
        members {
          nextToken
        }
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
        messages {
          nextToken
        }
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
export const directMessagesByRoom = /* GraphQL */ `
  query DirectMessagesByRoom(
    $messageRoomID: ID
    $when: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelDirectMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    directMessagesByRoom(
      messageRoomID: $messageRoomID
      when: $when
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        content
        attachment
        attachmentName
        when
        userId
        author {
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
          createdAt
          updatedAt
        }
        messageRoomID
        messageRoom {
          id
          name
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
export const messagesByRoom = /* GraphQL */ `
  query MessagesByRoom(
    $roomId: ID
    $when: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesByRoom(
      roomId: $roomId
      when: $when
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        author {
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
          createdAt
          updatedAt
        }
        room {
          id
          owner
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
          eventType
          eventUrl
          tz
          isSponsored
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
export const searchUsers = /* GraphQL */ `
  query SearchUsers(
    $filter: SearchableUserFilterInput
    $sort: SearchableUserSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchUsers(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        denomination
        pplServed
        sundayAttendance
        numberVolunteers
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
      nextToken
      total
    }
  }
`;
export const searchGroups = /* GraphQL */ `
  query SearchGroups(
    $filter: SearchableGroupFilterInput
    $sort: SearchableGroupSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchGroups(
      filter: $filter
      sort: $sort
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
          createdAt
          updatedAt
        }
        type
        name
        description
        memberCount
        members {
          nextToken
        }
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
        messages {
          nextToken
        }
        eventType
        eventUrl
        tz
        isSponsored
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
