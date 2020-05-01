/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
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
          _version
          _deleted
          _lastChangedAt
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
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
          _version
          _deleted
          _lastChangedAt
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input) {
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
          _version
          _deleted
          _lastChangedAt
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
export const createGroupMember = /* GraphQL */ `
  mutation CreateGroupMember($input: CreateGroupMemberInput!) {
    createGroupMember(input: $input) {
      id
      groupID
      userID
      group {
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
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateGroupMember = /* GraphQL */ `
  mutation UpdateGroupMember($input: UpdateGroupMemberInput!) {
    updateGroupMember(input: $input) {
      id
      groupID
      userID
      group {
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
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteGroupMember = /* GraphQL */ `
  mutation DeleteGroupMember($input: DeleteGroupMemberInput!) {
    deleteGroupMember(input: $input) {
      id
      groupID
      userID
      group {
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
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createGroup = /* GraphQL */ `
  mutation CreateGroup($input: CreateGroupInput!) {
    createGroup(input: $input) {
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
        }
        nextToken
        startedAt
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
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      eventType
      eventUrl
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateGroup = /* GraphQL */ `
  mutation UpdateGroup($input: UpdateGroupInput!) {
    updateGroup(input: $input) {
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
        }
        nextToken
        startedAt
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
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      eventType
      eventUrl
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteGroup = /* GraphQL */ `
  mutation DeleteGroup($input: DeleteGroupInput!) {
    deleteGroup(input: $input) {
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
        }
        nextToken
        startedAt
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
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      eventType
      eventUrl
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createCourseInfo = /* GraphQL */ `
  mutation CreateCourseInfo($input: CreateCourseInfoInput!) {
    createCourseInfo(input: $input) {
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
        }
        nextToken
        startedAt
      }
      subTitle
      introduction
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateCourseInfo = /* GraphQL */ `
  mutation UpdateCourseInfo($input: UpdateCourseInfoInput!) {
    updateCourseInfo(input: $input) {
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
        }
        nextToken
        startedAt
      }
      subTitle
      introduction
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteCourseInfo = /* GraphQL */ `
  mutation DeleteCourseInfo($input: DeleteCourseInfoInput!) {
    deleteCourseInfo(input: $input) {
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
        }
        nextToken
        startedAt
      }
      subTitle
      introduction
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createCourseWeek = /* GraphQL */ `
  mutation CreateCourseWeek($input: CreateCourseWeekInput!) {
    createCourseWeek(input: $input) {
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
export const updateCourseWeek = /* GraphQL */ `
  mutation UpdateCourseWeek($input: UpdateCourseWeekInput!) {
    updateCourseWeek(input: $input) {
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
export const deleteCourseWeek = /* GraphQL */ `
  mutation DeleteCourseWeek($input: DeleteCourseWeekInput!) {
    deleteCourseWeek(input: $input) {
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
export const createCourseLesson = /* GraphQL */ `
  mutation CreateCourseLesson($input: CreateCourseLessonInput!) {
    createCourseLesson(input: $input) {
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
        }
        lessons {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      assignments {
        items {
          id
          due
          description
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
export const updateCourseLesson = /* GraphQL */ `
  mutation UpdateCourseLesson($input: UpdateCourseLessonInput!) {
    updateCourseLesson(input: $input) {
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
        }
        lessons {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      assignments {
        items {
          id
          due
          description
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
export const deleteCourseLesson = /* GraphQL */ `
  mutation DeleteCourseLesson($input: DeleteCourseLessonInput!) {
    deleteCourseLesson(input: $input) {
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
        }
        lessons {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      assignments {
        items {
          id
          due
          description
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
export const createCourseAssignment = /* GraphQL */ `
  mutation CreateCourseAssignment($input: CreateCourseAssignmentInput!) {
    createCourseAssignment(input: $input) {
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
        }
        assignments {
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
export const updateCourseAssignment = /* GraphQL */ `
  mutation UpdateCourseAssignment($input: UpdateCourseAssignmentInput!) {
    updateCourseAssignment(input: $input) {
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
        }
        assignments {
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
export const deleteCourseAssignment = /* GraphQL */ `
  mutation DeleteCourseAssignment($input: DeleteCourseAssignmentInput!) {
    deleteCourseAssignment(input: $input) {
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
        }
        assignments {
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
export const createMessage = /* GraphQL */ `
  mutation CreateMessage($input: CreateMessageInput!) {
    createMessage(input: $input) {
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
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage($input: UpdateMessageInput!) {
    updateMessage(input: $input) {
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
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage($input: DeleteMessageInput!) {
    deleteMessage(input: $input) {
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
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createResourceRoot = /* GraphQL */ `
  mutation CreateResourceRoot($input: CreateResourceRootInput!) {
    createResourceRoot(input: $input) {
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
export const updateResourceRoot = /* GraphQL */ `
  mutation UpdateResourceRoot($input: UpdateResourceRootInput!) {
    updateResourceRoot(input: $input) {
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
export const deleteResourceRoot = /* GraphQL */ `
  mutation DeleteResourceRoot($input: DeleteResourceRootInput!) {
    deleteResourceRoot(input: $input) {
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
export const createResource = /* GraphQL */ `
  mutation CreateResource($input: CreateResourceInput!) {
    createResource(input: $input) {
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
        groupId
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
export const updateResource = /* GraphQL */ `
  mutation UpdateResource($input: UpdateResourceInput!) {
    updateResource(input: $input) {
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
        groupId
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
export const deleteResource = /* GraphQL */ `
  mutation DeleteResource($input: DeleteResourceInput!) {
    deleteResource(input: $input) {
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
        groupId
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
export const createResourceSeries = /* GraphQL */ `
  mutation CreateResourceSeries($input: CreateResourceSeriesInput!) {
    createResourceSeries(input: $input) {
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
          groupId
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
export const updateResourceSeries = /* GraphQL */ `
  mutation UpdateResourceSeries($input: UpdateResourceSeriesInput!) {
    updateResourceSeries(input: $input) {
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
          groupId
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
export const deleteResourceSeries = /* GraphQL */ `
  mutation DeleteResourceSeries($input: DeleteResourceSeriesInput!) {
    deleteResourceSeries(input: $input) {
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
          groupId
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
export const createResourceEpisode = /* GraphQL */ `
  mutation CreateResourceEpisode($input: CreateResourceEpisodeInput!) {
    createResourceEpisode(input: $input) {
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
export const updateResourceEpisode = /* GraphQL */ `
  mutation UpdateResourceEpisode($input: UpdateResourceEpisodeInput!) {
    updateResourceEpisode(input: $input) {
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
export const deleteResourceEpisode = /* GraphQL */ `
  mutation DeleteResourceEpisode($input: DeleteResourceEpisodeInput!) {
    deleteResourceEpisode(input: $input) {
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
