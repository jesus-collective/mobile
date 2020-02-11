// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateMessage = `subscription OnCreateMessage($roomId: ID!) {
  onCreateMessage(roomId: $roomId) {
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
export const onCreateUser = `subscription OnCreateUser($owner: String!) {
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
export const onUpdateUser = `subscription OnUpdateUser($owner: String!) {
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
export const onDeleteUser = `subscription OnDeleteUser($owner: String!) {
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
export const onCreateGroupMember = `subscription OnCreateGroupMember {
  onCreateGroupMember {
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
export const onUpdateGroupMember = `subscription OnUpdateGroupMember {
  onUpdateGroupMember {
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
export const onDeleteGroupMember = `subscription OnDeleteGroupMember {
  onDeleteGroupMember {
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
export const onCreateGroup = `subscription OnCreateGroup($owner: String!) {
  onCreateGroup(owner: $owner) {
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
export const onUpdateGroup = `subscription OnUpdateGroup($owner: String!) {
  onUpdateGroup(owner: $owner) {
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
export const onDeleteGroup = `subscription OnDeleteGroup($owner: String!) {
  onDeleteGroup(owner: $owner) {
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
export const onCreateCourseInfo = `subscription OnCreateCourseInfo($owner: String!) {
  onCreateCourseInfo(owner: $owner) {
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
export const onUpdateCourseInfo = `subscription OnUpdateCourseInfo($owner: String!) {
  onUpdateCourseInfo(owner: $owner) {
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
export const onDeleteCourseInfo = `subscription OnDeleteCourseInfo($owner: String!) {
  onDeleteCourseInfo(owner: $owner) {
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
