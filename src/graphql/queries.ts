/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        given_name
        family_name
        email
        phone
        owner
        hasPaidState
        address
        city
        province
        postalCode
        country
        location {
          latitude
          longitude
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
        owns {
          nextToken
          startedAt
        }
        groups {
          nextToken
          startedAt
        }
        messages {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      given_name
      family_name
      email
      phone
      owner
      hasPaidState
      address
      city
      province
      postalCode
      country
      location {
        latitude
        longitude
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      groups {
        items {
          id
          groupID
          userID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      messages {
        items {
          id
          content
          when
          roomId
          userId
          owner
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
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
        hasPaidState
        address
        city
        province
        postalCode
        country
        location {
          latitude
          longitude
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
        owns {
          nextToken
          startedAt
        }
        groups {
          nextToken
          startedAt
        }
        messages {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncGroupMembers = /* GraphQL */ `
  query SyncGroupMembers(
    $filter: ModelGroupMemberFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncGroupMembers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
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
          _version
          _deleted
          _lastChangedAt
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
          hasPaidState
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncGroups = /* GraphQL */ `
  query SyncGroups(
    $filter: ModelGroupFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncGroups(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
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
          hasPaidState
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        type
        name
        description
        memberCount
        members {
          nextToken
          startedAt
        }
        image
        time
        lastUpdated
        location
        locationLatLong {
          latitude
          longitude
        }
        length
        effort
        cost
        messages {
          nextToken
          startedAt
        }
        eventType
        eventUrl
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
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
        hasPaidState
        address
        city
        province
        postalCode
        country
        location {
          latitude
          longitude
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
        owns {
          nextToken
          startedAt
        }
        groups {
          nextToken
          startedAt
        }
        messages {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      image
      time
      lastUpdated
      location
      locationLatLong {
        latitude
        longitude
      }
      length
      effort
      cost
      messages {
        items {
          id
          content
          when
          roomId
          userId
          owner
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      eventType
      eventUrl
      _version
      _deleted
      _lastChangedAt
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
          hasPaidState
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        type
        name
        description
        memberCount
        members {
          nextToken
          startedAt
        }
        image
        time
        lastUpdated
        location
        locationLatLong {
          latitude
          longitude
        }
        length
        effort
        cost
        messages {
          nextToken
          startedAt
        }
        eventType
        eventUrl
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncCourseInfos = /* GraphQL */ `
  query SyncCourseInfos(
    $filter: ModelCourseInfoFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCourseInfos(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        designedBy
        summary
        courseWeeks {
          nextToken
          startedAt
        }
        subTitle
        introduction
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
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
          name
          leader
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      subTitle
      introduction
      _version
      _deleted
      _lastChangedAt
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
          startedAt
        }
        subTitle
        introduction
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncCourseWeeks = /* GraphQL */ `
  query SyncCourseWeeks(
    $filter: ModelCourseWeekFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCourseWeeks(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        week
        date
        name
        leader
        courseInfo {
          id
          designedBy
          summary
          subTitle
          introduction
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        lessons {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getCourseWeek = /* GraphQL */ `
  query GetCourseWeek($id: ID!) {
    getCourseWeek(id: $id) {
      id
      week
      date
      name
      leader
      courseInfo {
        id
        designedBy
        summary
        courseWeeks {
          nextToken
          startedAt
        }
        subTitle
        introduction
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      lessons {
        items {
          id
          name
          time
          description
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
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
        name
        leader
        courseInfo {
          id
          designedBy
          summary
          subTitle
          introduction
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        lessons {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncCourseLessons = /* GraphQL */ `
  query SyncCourseLessons(
    $filter: ModelCourseLessonFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCourseLessons(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        time
        description
        courseWeek {
          id
          week
          date
          name
          leader
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        assignments {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getCourseLesson = /* GraphQL */ `
  query GetCourseLesson($id: ID!) {
    getCourseLesson(id: $id) {
      id
      name
      time
      description
      courseWeek {
        id
        week
        date
        name
        leader
        courseInfo {
          id
          designedBy
          summary
          subTitle
          introduction
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        lessons {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      assignments {
        items {
          id
          due
          description
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
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
        name
        time
        description
        courseWeek {
          id
          week
          date
          name
          leader
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        assignments {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncCourseAssignments = /* GraphQL */ `
  query SyncCourseAssignments(
    $filter: ModelCourseAssignmentFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCourseAssignments(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        due
        description
        courseLesson {
          id
          name
          time
          description
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getCourseAssignment = /* GraphQL */ `
  query GetCourseAssignment($id: ID!) {
    getCourseAssignment(id: $id) {
      id
      due
      description
      courseLesson {
        id
        name
        time
        description
        courseWeek {
          id
          week
          date
          name
          leader
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        assignments {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      _version
      _deleted
      _lastChangedAt
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
        due
        description
        courseLesson {
          id
          name
          time
          description
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncMessages = /* GraphQL */ `
  query SyncMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncMessages(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        content
        when
        roomId
        userId
        owner
        author {
          id
          given_name
          family_name
          email
          phone
          owner
          hasPaidState
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
          _version
          _deleted
          _lastChangedAt
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
      id
      content
      when
      roomId
      userId
      owner
      author {
        id
        given_name
        family_name
        email
        phone
        owner
        hasPaidState
        address
        city
        province
        postalCode
        country
        location {
          latitude
          longitude
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
        owns {
          nextToken
          startedAt
        }
        groups {
          nextToken
          startedAt
        }
        messages {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
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
          hasPaidState
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        type
        name
        description
        memberCount
        members {
          nextToken
          startedAt
        }
        image
        time
        lastUpdated
        location
        locationLatLong {
          latitude
          longitude
        }
        length
        effort
        cost
        messages {
          nextToken
          startedAt
        }
        eventType
        eventUrl
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      _version
      _deleted
      _lastChangedAt
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
        roomId
        userId
        owner
        author {
          id
          given_name
          family_name
          email
          phone
          owner
          hasPaidState
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
          _version
          _deleted
          _lastChangedAt
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncResourceRoots = /* GraphQL */ `
  query SyncResourceRoots(
    $filter: ModelResourceRootFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncResourceRoots(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        type
        groupId
        resources {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
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
          title
          description
          extendedDescription
          resourceID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
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
        resources {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncResources = /* GraphQL */ `
  query SyncResources(
    $filter: ModelResourceFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncResources(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        type
        menuTitle
        title
        image {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        description
        extendedDescription
        series {
          nextToken
          startedAt
        }
        resourceID
        resourceRoot {
          id
          type
          groupId
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getResource = /* GraphQL */ `
  query GetResource($id: ID!) {
    getResource(id: $id) {
      id
      type
      menuTitle
      title
      image {
        userId
        filenameSmall
        filenameMedium
        filenameLarge
        filenameUpload
      }
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
          seriesID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      resourceID
      resourceRoot {
        id
        type
        groupId
        resources {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      _version
      _deleted
      _lastChangedAt
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
        type
        menuTitle
        title
        image {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        description
        extendedDescription
        series {
          nextToken
          startedAt
        }
        resourceID
        resourceRoot {
          id
          type
          groupId
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncResourceSeries = /* GraphQL */ `
  query SyncResourceSeries(
    $filter: ModelResourceSeriesFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncResourceSeries(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
          nextToken
          startedAt
        }
        seriesID
        parentResource {
          id
          type
          menuTitle
          title
          description
          extendedDescription
          resourceID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getResourceSeries = /* GraphQL */ `
  query GetResourceSeries($id: ID!) {
    getResourceSeries(id: $id) {
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      seriesID
      parentResource {
        id
        type
        menuTitle
        title
        image {
          userId
          filenameSmall
          filenameMedium
          filenameLarge
          filenameUpload
        }
        description
        extendedDescription
        series {
          nextToken
          startedAt
        }
        resourceID
        resourceRoot {
          id
          type
          groupId
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      _version
      _deleted
      _lastChangedAt
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
          nextToken
          startedAt
        }
        seriesID
        parentResource {
          id
          type
          menuTitle
          title
          description
          extendedDescription
          resourceID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncResourceEpisodes = /* GraphQL */ `
  query SyncResourceEpisodes(
    $filter: ModelResourceEpisodeFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncResourceEpisodes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
        parentSeries {
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
          seriesID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getResourceEpisode = /* GraphQL */ `
  query GetResourceEpisode($id: ID!) {
    getResourceEpisode(id: $id) {
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
      parentSeries {
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
          nextToken
          startedAt
        }
        seriesID
        parentResource {
          id
          type
          menuTitle
          title
          description
          extendedDescription
          resourceID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      _version
      _deleted
      _lastChangedAt
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
        parentSeries {
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
          seriesID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
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
          _version
          _deleted
          _lastChangedAt
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
          hasPaidState
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
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
          _version
          _deleted
          _lastChangedAt
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
          hasPaidState
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
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
          hasPaidState
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        type
        name
        description
        memberCount
        members {
          nextToken
          startedAt
        }
        image
        time
        lastUpdated
        location
        locationLatLong {
          latitude
          longitude
        }
        length
        effort
        cost
        messages {
          nextToken
          startedAt
        }
        eventType
        eventUrl
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
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
        roomId
        userId
        owner
        author {
          id
          given_name
          family_name
          email
          phone
          owner
          hasPaidState
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
          _version
          _deleted
          _lastChangedAt
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
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
          hasPaidState
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        type
        name
        description
        memberCount
        members {
          nextToken
          startedAt
        }
        image
        time
        lastUpdated
        location
        locationLatLong {
          latitude
          longitude
        }
        length
        effort
        cost
        messages {
          nextToken
          startedAt
        }
        eventType
        eventUrl
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
