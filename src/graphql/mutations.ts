// tslint:disable
// this is an auto generated file. This will be overwritten

export const createUser = `mutation CreateUser($input: CreateUserInput!) {
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
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
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
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
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
export const createGroupMember = `mutation CreateGroupMember($input: CreateGroupMemberInput!) {
  createGroupMember(input: $input) {
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
  }
}
`;
export const updateGroupMember = `mutation UpdateGroupMember($input: UpdateGroupMemberInput!) {
  updateGroupMember(input: $input) {
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
  }
}
`;
export const deleteGroupMember = `mutation DeleteGroupMember($input: DeleteGroupMemberInput!) {
  deleteGroupMember(input: $input) {
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
  }
}
`;
export const createGroup = `mutation CreateGroup($input: CreateGroupInput!) {
  createGroup(input: $input) {
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
export const updateGroup = `mutation UpdateGroup($input: UpdateGroupInput!) {
  updateGroup(input: $input) {
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
export const deleteGroup = `mutation DeleteGroup($input: DeleteGroupInput!) {
  deleteGroup(input: $input) {
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
export const createCourseInfo = `mutation CreateCourseInfo($input: CreateCourseInfoInput!) {
  createCourseInfo(input: $input) {
    id
    summary
    course {
      week
      name
      sections {
        section
        name
      }
    }
  }
}
`;
export const updateCourseInfo = `mutation UpdateCourseInfo($input: UpdateCourseInfoInput!) {
  updateCourseInfo(input: $input) {
    id
    summary
    course {
      week
      name
      sections {
        section
        name
      }
    }
  }
}
`;
export const deleteCourseInfo = `mutation DeleteCourseInfo($input: DeleteCourseInfoInput!) {
  deleteCourseInfo(input: $input) {
    id
    summary
    course {
      week
      name
      sections {
        section
        name
      }
    }
  }
}
`;
export const createMessage = `mutation CreateMessage($input: CreateMessageInput!) {
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
export const updateMessage = `mutation UpdateMessage($input: UpdateMessageInput!) {
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
export const deleteMessage = `mutation DeleteMessage($input: DeleteMessageInput!) {
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
