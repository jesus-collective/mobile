// tslint:disable
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
          eventType
          eventUrl
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
          joined
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
          joined
        }
        messages {
          nextToken
        }
        eventType
        eventUrl
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
          eventType
          eventUrl
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
          joined
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
          joined
        }
        messages {
          nextToken
        }
        eventType
        eventUrl
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
          eventType
          eventUrl
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
          joined
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
          joined
        }
        messages {
          nextToken
        }
        eventType
        eventUrl
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
      organizerGroup {
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
          eventType
          eventUrl
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
          joined
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
          joined
        }
        messages {
          nextToken
        }
        eventType
        eventUrl
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
      organizerGroup {
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
          eventType
          eventUrl
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
          joined
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
          joined
        }
        messages {
          nextToken
        }
        eventType
        eventUrl
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
      organizerGroup {
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
          eventType
          eventUrl
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
          joined
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
          joined
        }
        messages {
          nextToken
        }
        eventType
        eventUrl
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
export const createCourseInfo = /* GraphQL */ `
  mutation CreateCourseInfo($input: CreateCourseInfoInput!) {
    createCourseInfo(input: $input) {
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
      introduction
    }
  }
`;
export const updateCourseInfo = /* GraphQL */ `
  mutation UpdateCourseInfo($input: UpdateCourseInfoInput!) {
    updateCourseInfo(input: $input) {
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
      introduction
    }
  }
`;
export const deleteCourseInfo = /* GraphQL */ `
  mutation DeleteCourseInfo($input: DeleteCourseInfoInput!) {
    deleteCourseInfo(input: $input) {
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
      introduction
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
          eventType
          eventUrl
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
          joined
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
          joined
        }
        messages {
          nextToken
        }
        eventType
        eventUrl
      }
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
          eventType
          eventUrl
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
          joined
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
          joined
        }
        messages {
          nextToken
        }
        eventType
        eventUrl
      }
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
          eventType
          eventUrl
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
          joined
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
          joined
        }
        messages {
          nextToken
        }
        eventType
        eventUrl
      }
    }
  }
`;
