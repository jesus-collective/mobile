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
      profileState
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
          ownerOrgID
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
      organizations {
        items {
          id
          role
          organizationId
          userId
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
          roomId
          userId
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
      profileState
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
          ownerOrgID
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
      organizations {
        items {
          id
          role
          organizationId
          userId
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
          roomId
          userId
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
      profileState
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
          ownerOrgID
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
      organizations {
        items {
          id
          role
          organizationId
          userId
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
          roomId
          userId
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
export const createGroupMember = /* GraphQL */ `
  mutation CreateGroupMember($input: CreateGroupMemberInput!) {
    createGroupMember(input: $input) {
      id
      groupID
      userID
      group {
        id
        owner
        ownerOrgID
        ownerUser {
          id
          given_name
          family_name
          email
          phone
          owner
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
          orgDescription
          joined
          createdAt
          updatedAt
        }
        ownerOrg {
          id
          orgName
          adminEmail
          phone
          owner
          hasPaidState
          profileState
          address
          city
          province
          postalCode
          country
          aboutMeShort
          aboutMeLong
          orgType
          orgSize
          orgDescription
          joined
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
        }
        length
        effort
        cost
        messages {
          nextToken
        }
        eventType
        eventUrl
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
        profileState
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
        }
        groups {
          nextToken
        }
        organizations {
          nextToken
        }
        messages {
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
export const updateGroupMember = /* GraphQL */ `
  mutation UpdateGroupMember($input: UpdateGroupMemberInput!) {
    updateGroupMember(input: $input) {
      id
      groupID
      userID
      group {
        id
        owner
        ownerOrgID
        ownerUser {
          id
          given_name
          family_name
          email
          phone
          owner
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
          orgDescription
          joined
          createdAt
          updatedAt
        }
        ownerOrg {
          id
          orgName
          adminEmail
          phone
          owner
          hasPaidState
          profileState
          address
          city
          province
          postalCode
          country
          aboutMeShort
          aboutMeLong
          orgType
          orgSize
          orgDescription
          joined
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
        }
        length
        effort
        cost
        messages {
          nextToken
        }
        eventType
        eventUrl
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
        profileState
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
        }
        groups {
          nextToken
        }
        organizations {
          nextToken
        }
        messages {
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
export const deleteGroupMember = /* GraphQL */ `
  mutation DeleteGroupMember($input: DeleteGroupMemberInput!) {
    deleteGroupMember(input: $input) {
      id
      groupID
      userID
      group {
        id
        owner
        ownerOrgID
        ownerUser {
          id
          given_name
          family_name
          email
          phone
          owner
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
          orgDescription
          joined
          createdAt
          updatedAt
        }
        ownerOrg {
          id
          orgName
          adminEmail
          phone
          owner
          hasPaidState
          profileState
          address
          city
          province
          postalCode
          country
          aboutMeShort
          aboutMeLong
          orgType
          orgSize
          orgDescription
          joined
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
        }
        length
        effort
        cost
        messages {
          nextToken
        }
        eventType
        eventUrl
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
        profileState
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
        }
        groups {
          nextToken
        }
        organizations {
          nextToken
        }
        messages {
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
export const createGroup = /* GraphQL */ `
  mutation CreateGroup($input: CreateGroupInput!) {
    createGroup(input: $input) {
      id
      owner
      ownerOrgID
      ownerUser {
        id
        given_name
        family_name
        email
        phone
        owner
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
        }
        groups {
          nextToken
        }
        organizations {
          nextToken
        }
        messages {
          nextToken
        }
        createdAt
        updatedAt
      }
      ownerOrg {
        id
        orgName
        adminEmail
        phone
        owner
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
        members {
          nextToken
        }
        ownerOrg {
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
          createdAt
          updatedAt
        }
        nextToken
      }
      eventType
      eventUrl
      createdAt
      updatedAt
    }
  }
`;
export const updateGroup = /* GraphQL */ `
  mutation UpdateGroup($input: UpdateGroupInput!) {
    updateGroup(input: $input) {
      id
      owner
      ownerOrgID
      ownerUser {
        id
        given_name
        family_name
        email
        phone
        owner
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
        }
        groups {
          nextToken
        }
        organizations {
          nextToken
        }
        messages {
          nextToken
        }
        createdAt
        updatedAt
      }
      ownerOrg {
        id
        orgName
        adminEmail
        phone
        owner
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
        members {
          nextToken
        }
        ownerOrg {
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
          createdAt
          updatedAt
        }
        nextToken
      }
      eventType
      eventUrl
      createdAt
      updatedAt
    }
  }
`;
export const deleteGroup = /* GraphQL */ `
  mutation DeleteGroup($input: DeleteGroupInput!) {
    deleteGroup(input: $input) {
      id
      owner
      ownerOrgID
      ownerUser {
        id
        given_name
        family_name
        email
        phone
        owner
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
        }
        groups {
          nextToken
        }
        organizations {
          nextToken
        }
        messages {
          nextToken
        }
        createdAt
        updatedAt
      }
      ownerOrg {
        id
        orgName
        adminEmail
        phone
        owner
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
        members {
          nextToken
        }
        ownerOrg {
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
          createdAt
          updatedAt
        }
        nextToken
      }
      eventType
      eventUrl
      createdAt
      updatedAt
    }
  }
`;
export const createOrganizationMember = /* GraphQL */ `
  mutation CreateOrganizationMember($input: CreateOrganizationMemberInput!) {
    createOrganizationMember(input: $input) {
      id
      role
      organizationId
      userId
      organization {
        id
        orgName
        adminEmail
        phone
        owner
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
        members {
          nextToken
        }
        ownerOrg {
          nextToken
        }
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
        profileState
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
        }
        groups {
          nextToken
        }
        organizations {
          nextToken
        }
        messages {
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
export const updateOrganizationMember = /* GraphQL */ `
  mutation UpdateOrganizationMember($input: UpdateOrganizationMemberInput!) {
    updateOrganizationMember(input: $input) {
      id
      role
      organizationId
      userId
      organization {
        id
        orgName
        adminEmail
        phone
        owner
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
        members {
          nextToken
        }
        ownerOrg {
          nextToken
        }
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
        profileState
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
        }
        groups {
          nextToken
        }
        organizations {
          nextToken
        }
        messages {
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
export const deleteOrganizationMember = /* GraphQL */ `
  mutation DeleteOrganizationMember($input: DeleteOrganizationMemberInput!) {
    deleteOrganizationMember(input: $input) {
      id
      role
      organizationId
      userId
      organization {
        id
        orgName
        adminEmail
        phone
        owner
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
        members {
          nextToken
        }
        ownerOrg {
          nextToken
        }
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
        profileState
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
        }
        groups {
          nextToken
        }
        organizations {
          nextToken
        }
        messages {
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
export const createOrganization = /* GraphQL */ `
  mutation CreateOrganization($input: CreateOrganizationInput!) {
    createOrganization(input: $input) {
      id
      orgName
      adminEmail
      phone
      owner
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
      members {
        items {
          id
          role
          organizationId
          userId
          createdAt
          updatedAt
        }
        nextToken
      }
      ownerOrg {
        items {
          id
          owner
          ownerOrgID
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
export const updateOrganization = /* GraphQL */ `
  mutation UpdateOrganization($input: UpdateOrganizationInput!) {
    updateOrganization(input: $input) {
      id
      orgName
      adminEmail
      phone
      owner
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
      members {
        items {
          id
          role
          organizationId
          userId
          createdAt
          updatedAt
        }
        nextToken
      }
      ownerOrg {
        items {
          id
          owner
          ownerOrgID
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
export const deleteOrganization = /* GraphQL */ `
  mutation DeleteOrganization($input: DeleteOrganizationInput!) {
    deleteOrganization(input: $input) {
      id
      orgName
      adminEmail
      phone
      owner
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
      members {
        items {
          id
          role
          organizationId
          userId
          createdAt
          updatedAt
        }
        nextToken
      }
      ownerOrg {
        items {
          id
          owner
          ownerOrgID
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
          createdAt
          updatedAt
        }
        nextToken
      }
      subTitle
      introduction
      createdAt
      updatedAt
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
          createdAt
          updatedAt
        }
        nextToken
      }
      subTitle
      introduction
      createdAt
      updatedAt
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
          createdAt
          updatedAt
        }
        nextToken
      }
      subTitle
      introduction
      createdAt
      updatedAt
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
        }
        subTitle
        introduction
        createdAt
        updatedAt
      }
      lessons {
        items {
          id
          name
          time
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
        }
        subTitle
        introduction
        createdAt
        updatedAt
      }
      lessons {
        items {
          id
          name
          time
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
        }
        subTitle
        introduction
        createdAt
        updatedAt
      }
      lessons {
        items {
          id
          name
          time
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
export const createDirectMessageUser = /* GraphQL */ `
  mutation CreateDirectMessageUser($input: CreateDirectMessageUserInput!) {
    createDirectMessageUser(input: $input) {
      id
      userID
      user {
        id
        given_name
        family_name
        email
        phone
        owner
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
        }
        groups {
          nextToken
        }
        organizations {
          nextToken
        }
        messages {
          nextToken
        }
        createdAt
        updatedAt
      }
      roomID
      room {
        id
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
export const updateDirectMessageUser = /* GraphQL */ `
  mutation UpdateDirectMessageUser($input: UpdateDirectMessageUserInput!) {
    updateDirectMessageUser(input: $input) {
      id
      userID
      user {
        id
        given_name
        family_name
        email
        phone
        owner
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
        }
        groups {
          nextToken
        }
        organizations {
          nextToken
        }
        messages {
          nextToken
        }
        createdAt
        updatedAt
      }
      roomID
      room {
        id
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
export const deleteDirectMessageUser = /* GraphQL */ `
  mutation DeleteDirectMessageUser($input: DeleteDirectMessageUserInput!) {
    deleteDirectMessageUser(input: $input) {
      id
      userID
      user {
        id
        given_name
        family_name
        email
        phone
        owner
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
        }
        groups {
          nextToken
        }
        organizations {
          nextToken
        }
        messages {
          nextToken
        }
        createdAt
        updatedAt
      }
      roomID
      room {
        id
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
export const createDirectMessageRoom = /* GraphQL */ `
  mutation CreateDirectMessageRoom($input: CreateDirectMessageRoomInput!) {
    createDirectMessageRoom(input: $input) {
      id
      messageUsers {
        items {
          id
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
          when
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
export const updateDirectMessageRoom = /* GraphQL */ `
  mutation UpdateDirectMessageRoom($input: UpdateDirectMessageRoomInput!) {
    updateDirectMessageRoom(input: $input) {
      id
      messageUsers {
        items {
          id
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
          when
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
export const deleteDirectMessageRoom = /* GraphQL */ `
  mutation DeleteDirectMessageRoom($input: DeleteDirectMessageRoomInput!) {
    deleteDirectMessageRoom(input: $input) {
      id
      messageUsers {
        items {
          id
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
          when
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
export const createDirectMessage = /* GraphQL */ `
  mutation CreateDirectMessage($input: CreateDirectMessageInput!) {
    createDirectMessage(input: $input) {
      id
      content
      when
      messageRoomID
      messageRoom {
        id
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
export const updateDirectMessage = /* GraphQL */ `
  mutation UpdateDirectMessage($input: UpdateDirectMessageInput!) {
    updateDirectMessage(input: $input) {
      id
      content
      when
      messageRoomID
      messageRoom {
        id
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
export const deleteDirectMessage = /* GraphQL */ `
  mutation DeleteDirectMessage($input: DeleteDirectMessageInput!) {
    deleteDirectMessage(input: $input) {
      id
      content
      when
      messageRoomID
      messageRoom {
        id
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
        profileState
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
        }
        groups {
          nextToken
        }
        organizations {
          nextToken
        }
        messages {
          nextToken
        }
        createdAt
        updatedAt
      }
      room {
        id
        owner
        ownerOrgID
        ownerUser {
          id
          given_name
          family_name
          email
          phone
          owner
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
          orgDescription
          joined
          createdAt
          updatedAt
        }
        ownerOrg {
          id
          orgName
          adminEmail
          phone
          owner
          hasPaidState
          profileState
          address
          city
          province
          postalCode
          country
          aboutMeShort
          aboutMeLong
          orgType
          orgSize
          orgDescription
          joined
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
        }
        length
        effort
        cost
        messages {
          nextToken
        }
        eventType
        eventUrl
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
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
        profileState
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
        }
        groups {
          nextToken
        }
        organizations {
          nextToken
        }
        messages {
          nextToken
        }
        createdAt
        updatedAt
      }
      room {
        id
        owner
        ownerOrgID
        ownerUser {
          id
          given_name
          family_name
          email
          phone
          owner
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
          orgDescription
          joined
          createdAt
          updatedAt
        }
        ownerOrg {
          id
          orgName
          adminEmail
          phone
          owner
          hasPaidState
          profileState
          address
          city
          province
          postalCode
          country
          aboutMeShort
          aboutMeLong
          orgType
          orgSize
          orgDescription
          joined
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
        }
        length
        effort
        cost
        messages {
          nextToken
        }
        eventType
        eventUrl
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
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
        profileState
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
        }
        groups {
          nextToken
        }
        organizations {
          nextToken
        }
        messages {
          nextToken
        }
        createdAt
        updatedAt
      }
      room {
        id
        owner
        ownerOrgID
        ownerUser {
          id
          given_name
          family_name
          email
          phone
          owner
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
          orgDescription
          joined
          createdAt
          updatedAt
        }
        ownerOrg {
          id
          orgName
          adminEmail
          phone
          owner
          hasPaidState
          profileState
          address
          city
          province
          postalCode
          country
          aboutMeShort
          aboutMeLong
          orgType
          orgSize
          orgDescription
          joined
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
        }
        length
        effort
        cost
        messages {
          nextToken
        }
        eventType
        eventUrl
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
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
          resourceID
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
          resourceID
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
          resourceID
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
        resources {
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
        resources {
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
        resources {
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
          episodeID
          createdAt
          updatedAt
        }
        nextToken
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
        }
        resourceID
        resourceRoot {
          id
          type
          groupId
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
          episodeID
          createdAt
          updatedAt
        }
        nextToken
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
        }
        resourceID
        resourceRoot {
          id
          type
          groupId
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
          episodeID
          createdAt
          updatedAt
        }
        nextToken
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
        }
        resourceID
        resourceRoot {
          id
          type
          groupId
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
