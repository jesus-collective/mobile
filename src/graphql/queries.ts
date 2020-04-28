// tslint:disable
// eslint-disable
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
      hasPaidState
      address
      city
      province
      postalCode
      country
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
        }
        nextToken
      }
      groups {
        items {
          id
          groupID
          userID
        }
        nextToken
      }
      messages {
        items {
          id
          content
          when
          roomId
          userId
          owner
        }
        nextToken
      }
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
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
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
        hasPaidState
        address
        city
        province
        postalCode
        country
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
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
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
        }
        nextToken
      }
      image
      time
      lastUpdated
      location
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
        }
        nextToken
      }
      eventType
      eventUrl
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
        length
        effort
        cost
        messages {
          nextToken
        }
        eventType
        eventUrl
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
      courseDetails {
        items {
          id
          week
          date
          name
          leader
        }
        nextToken
      }
      subTitle
      introduction
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
        courseDetails {
          nextToken
        }
        subTitle
        introduction
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
      name
      leader
      lessons {
        items {
          id
          name
          time
          description
        }
        nextToken
      }
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
        lessons {
          nextToken
        }
      }
      nextToken
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
      assignment {
        items {
          id
          due
          description
        }
        nextToken
      }
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
        assignment {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getCourseAssignment = /* GraphQL */ `
  query GetCourseAssignment($id: ID!) {
    getCourseAssignment(id: $id) {
      id
      due
      description
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
        }
        groups {
          nextToken
        }
        messages {
          nextToken
        }
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
        length
        effort
        cost
        messages {
          nextToken
        }
        eventType
        eventUrl
      }
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
        }
      }
      nextToken
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
        resources {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
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
      resources {
        items {
          id
          type
          menuTitle
          title
          description
          extendedDescription
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
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
        resources {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
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
        root {
          id
          type
          _version
          _deleted
          _lastChangedAt
        }
        _version
        _deleted
        _lastChangedAt
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
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      root {
        id
        type
        resources {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      _version
      _deleted
      _lastChangedAt
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
        root {
          id
          type
          _version
          _deleted
          _lastChangedAt
        }
        _version
        _deleted
        _lastChangedAt
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
        resource {
          id
          type
          menuTitle
          title
          description
          extendedDescription
          _version
          _deleted
          _lastChangedAt
        }
        _version
        _deleted
        _lastChangedAt
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
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      resource {
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
        root {
          id
          type
          _version
          _deleted
          _lastChangedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      _version
      _deleted
      _lastChangedAt
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
        resource {
          id
          type
          menuTitle
          title
          description
          extendedDescription
          _version
          _deleted
          _lastChangedAt
        }
        _version
        _deleted
        _lastChangedAt
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
        series {
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
          _version
          _deleted
          _lastChangedAt
        }
        _version
        _deleted
        _lastChangedAt
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
      series {
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
        resource {
          id
          type
          menuTitle
          title
          description
          extendedDescription
          _version
          _deleted
          _lastChangedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      _version
      _deleted
      _lastChangedAt
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
        series {
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
          _version
          _deleted
          _lastChangedAt
        }
        _version
        _deleted
        _lastChangedAt
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
        length
        effort
        cost
        messages {
          nextToken
        }
        eventType
        eventUrl
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
        }
      }
      nextToken
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
        length
        effort
        cost
        messages {
          nextToken
        }
        eventType
        eventUrl
      }
      nextToken
      total
    }
  }
`;
