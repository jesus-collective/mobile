/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMessageByRoomId = /* GraphQL */ `
  subscription OnCreateMessageByRoomId($roomId: ID!) {
    onCreateMessageByRoomId(roomId: $roomId) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($owner: String!) {
    onCreateUser(owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($owner: String!) {
    onUpdateUser(owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($owner: String!) {
    onDeleteUser(owner: $owner) {
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
export const onCreateGroupMember = /* GraphQL */ `
  subscription OnCreateGroupMember {
    onCreateGroupMember {
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateGroupMember = /* GraphQL */ `
  subscription OnUpdateGroupMember {
    onUpdateGroupMember {
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteGroupMember = /* GraphQL */ `
  subscription OnDeleteGroupMember {
    onDeleteGroupMember {
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onCreateGroup = /* GraphQL */ `
  subscription OnCreateGroup($owner: String!) {
    onCreateGroup(owner: $owner) {
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
export const onUpdateGroup = /* GraphQL */ `
  subscription OnUpdateGroup($owner: String!) {
    onUpdateGroup(owner: $owner) {
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
export const onDeleteGroup = /* GraphQL */ `
  subscription OnDeleteGroup($owner: String!) {
    onDeleteGroup(owner: $owner) {
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
export const onCreateCourseInfo = /* GraphQL */ `
  subscription OnCreateCourseInfo($owner: String!) {
    onCreateCourseInfo(owner: $owner) {
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
export const onUpdateCourseInfo = /* GraphQL */ `
  subscription OnUpdateCourseInfo($owner: String!) {
    onUpdateCourseInfo(owner: $owner) {
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
export const onDeleteCourseInfo = /* GraphQL */ `
  subscription OnDeleteCourseInfo($owner: String!) {
    onDeleteCourseInfo(owner: $owner) {
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
export const onCreateCourseWeek = /* GraphQL */ `
  subscription OnCreateCourseWeek {
    onCreateCourseWeek {
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
export const onUpdateCourseWeek = /* GraphQL */ `
  subscription OnUpdateCourseWeek {
    onUpdateCourseWeek {
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
export const onDeleteCourseWeek = /* GraphQL */ `
  subscription OnDeleteCourseWeek {
    onDeleteCourseWeek {
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
export const onCreateCourseLesson = /* GraphQL */ `
  subscription OnCreateCourseLesson {
    onCreateCourseLesson {
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
export const onUpdateCourseLesson = /* GraphQL */ `
  subscription OnUpdateCourseLesson {
    onUpdateCourseLesson {
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
export const onDeleteCourseLesson = /* GraphQL */ `
  subscription OnDeleteCourseLesson {
    onDeleteCourseLesson {
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
export const onCreateCourseAssignment = /* GraphQL */ `
  subscription OnCreateCourseAssignment {
    onCreateCourseAssignment {
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
export const onUpdateCourseAssignment = /* GraphQL */ `
  subscription OnUpdateCourseAssignment {
    onUpdateCourseAssignment {
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
export const onDeleteCourseAssignment = /* GraphQL */ `
  subscription OnDeleteCourseAssignment {
    onDeleteCourseAssignment {
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
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($owner: String!) {
    onCreateMessage(owner: $owner) {
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
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage($owner: String!) {
    onUpdateMessage(owner: $owner) {
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
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage($owner: String!) {
    onDeleteMessage(owner: $owner) {
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
export const onCreateResourceRoot = /* GraphQL */ `
  subscription OnCreateResourceRoot {
    onCreateResourceRoot {
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
export const onUpdateResourceRoot = /* GraphQL */ `
  subscription OnUpdateResourceRoot {
    onUpdateResourceRoot {
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
export const onDeleteResourceRoot = /* GraphQL */ `
  subscription OnDeleteResourceRoot {
    onDeleteResourceRoot {
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
export const onCreateResource = /* GraphQL */ `
  subscription OnCreateResource {
    onCreateResource {
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
export const onUpdateResource = /* GraphQL */ `
  subscription OnUpdateResource {
    onUpdateResource {
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
export const onDeleteResource = /* GraphQL */ `
  subscription OnDeleteResource {
    onDeleteResource {
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
export const onCreateResourceSeries = /* GraphQL */ `
  subscription OnCreateResourceSeries {
    onCreateResourceSeries {
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
export const onUpdateResourceSeries = /* GraphQL */ `
  subscription OnUpdateResourceSeries {
    onUpdateResourceSeries {
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
export const onDeleteResourceSeries = /* GraphQL */ `
  subscription OnDeleteResourceSeries {
    onDeleteResourceSeries {
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
export const onCreateResourceEpisode = /* GraphQL */ `
  subscription OnCreateResourceEpisode {
    onCreateResourceEpisode {
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
export const onUpdateResourceEpisode = /* GraphQL */ `
  subscription OnUpdateResourceEpisode {
    onUpdateResourceEpisode {
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
export const onDeleteResourceEpisode = /* GraphQL */ `
  subscription OnDeleteResourceEpisode {
    onDeleteResourceEpisode {
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
