// tslint:disable
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($id: ID!) {
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
    profileImage
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
export const listUsers = `query ListUsers(
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
      profileImage
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
export const getGroup = `query GetGroup($id: ID!) {
  getGroup(id: $id) {
    id
    owner
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
    organizerGroup {
      id
      owner
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
      organizerGroup {
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
      }
      organizerUser {
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
        profileImage
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
      }
      instructors {
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
        profileImage
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
      }
      messages {
        nextToken
      }
    }
    organizerUser {
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
      profileImage
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
      groups {
        nextToken
      }
      messages {
        nextToken
      }
    }
    instructors {
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
      profileImage
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
      groups {
        nextToken
      }
      messages {
        nextToken
      }
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
export const listGroups = `query ListGroups(
  $filter: ModelGroupFilterInput
  $limit: Int
  $nextToken: String
) {
  listGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      owner
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
      organizerGroup {
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
      }
      organizerUser {
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
        profileImage
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
      }
      instructors {
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
        profileImage
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
      }
      messages {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getCourseInfo = `query GetCourseInfo($id: ID!) {
  getCourseInfo(id: $id) {
    id
    designedBy
    summary
    courseDetails {
      week
      date
      name
      leader
      lessons {
        name
        time
        description
      }
    }
    subTitle
    instructor {
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
      profileImage
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
      groups {
        nextToken
      }
      messages {
        nextToken
      }
    }
    introduction
  }
}
`;
export const listCourseInfos = `query ListCourseInfos(
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
        week
        date
        name
        leader
      }
      subTitle
      instructor {
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
        profileImage
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
      }
      introduction
    }
    nextToken
  }
}
`;
export const getMessage = `query GetMessage($id: ID!) {
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
      profileImage
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
      organizerGroup {
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
      }
      organizerUser {
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
        profileImage
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
      }
      instructors {
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
        profileImage
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
      }
      messages {
        nextToken
      }
    }
  }
}
`;
export const listMessages = `query ListMessages(
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
        profileImage
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
      }
    }
    nextToken
  }
}
`;
export const messagesByRoom = `query MessagesByRoom(
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
        profileImage
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
      }
    }
    nextToken
  }
}
`;
export const searchGroups = `query SearchGroups(
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
      organizerGroup {
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
      }
      organizerUser {
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
        profileImage
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
      }
      instructors {
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
        profileImage
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
      }
      messages {
        nextToken
      }
    }
    nextToken
    total
  }
}
`;
