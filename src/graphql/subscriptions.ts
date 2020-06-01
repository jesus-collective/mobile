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
export const onCreateGroupMember = /* GraphQL */ `
  subscription OnCreateGroupMember {
    onCreateGroupMember {
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
export const onUpdateGroupMember = /* GraphQL */ `
  subscription OnUpdateGroupMember {
    onUpdateGroupMember {
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
export const onDeleteGroupMember = /* GraphQL */ `
  subscription OnDeleteGroupMember {
    onDeleteGroupMember {
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
export const onCreateGroup = /* GraphQL */ `
  subscription OnCreateGroup($owner: String!) {
    onCreateGroup(owner: $owner) {
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
export const onUpdateGroup = /* GraphQL */ `
  subscription OnUpdateGroup($owner: String!) {
    onUpdateGroup(owner: $owner) {
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
export const onDeleteGroup = /* GraphQL */ `
  subscription OnDeleteGroup($owner: String!) {
    onDeleteGroup(owner: $owner) {
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
export const onCreateOrganizationMember = /* GraphQL */ `
  subscription OnCreateOrganizationMember {
    onCreateOrganizationMember {
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
export const onUpdateOrganizationMember = /* GraphQL */ `
  subscription OnUpdateOrganizationMember {
    onUpdateOrganizationMember {
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
export const onDeleteOrganizationMember = /* GraphQL */ `
  subscription OnDeleteOrganizationMember {
    onDeleteOrganizationMember {
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
export const onCreateOrganization = /* GraphQL */ `
  subscription OnCreateOrganization($owner: String!) {
    onCreateOrganization(owner: $owner) {
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
export const onUpdateOrganization = /* GraphQL */ `
  subscription OnUpdateOrganization($owner: String!) {
    onUpdateOrganization(owner: $owner) {
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
export const onDeleteOrganization = /* GraphQL */ `
  subscription OnDeleteOrganization($owner: String!) {
    onDeleteOrganization(owner: $owner) {
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
export const onCreateDirectMessageUser = /* GraphQL */ `
  subscription OnCreateDirectMessageUser {
    onCreateDirectMessageUser {
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
export const onUpdateDirectMessageUser = /* GraphQL */ `
  subscription OnUpdateDirectMessageUser {
    onUpdateDirectMessageUser {
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
export const onDeleteDirectMessageUser = /* GraphQL */ `
  subscription OnDeleteDirectMessageUser {
    onDeleteDirectMessageUser {
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
export const onCreateDirectMessageRoom = /* GraphQL */ `
  subscription OnCreateDirectMessageRoom {
    onCreateDirectMessageRoom {
      id
      name
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
export const onUpdateDirectMessageRoom = /* GraphQL */ `
  subscription OnUpdateDirectMessageRoom {
    onUpdateDirectMessageRoom {
      id
      name
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
export const onDeleteDirectMessageRoom = /* GraphQL */ `
  subscription OnDeleteDirectMessageRoom {
    onDeleteDirectMessageRoom {
      id
      name
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
export const onCreateDirectMessage = /* GraphQL */ `
  subscription OnCreateDirectMessage {
    onCreateDirectMessage {
      id
      content
      when
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
export const onUpdateDirectMessage = /* GraphQL */ `
  subscription OnUpdateDirectMessage {
    onUpdateDirectMessage {
      id
      content
      when
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
export const onDeleteDirectMessage = /* GraphQL */ `
  subscription OnDeleteDirectMessage {
    onDeleteDirectMessage {
      id
      content
      when
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
          order
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
          order
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
          order
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
export const onCreateResource = /* GraphQL */ `
  subscription OnCreateResource {
    onCreateResource {
      id
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
export const onUpdateResource = /* GraphQL */ `
  subscription OnUpdateResource {
    onUpdateResource {
      id
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
export const onDeleteResource = /* GraphQL */ `
  subscription OnDeleteResource {
    onDeleteResource {
      id
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
        }
        seriesID
        parentResource {
          id
          type
          menuTitle
          order
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
        }
        seriesID
        parentResource {
          id
          type
          menuTitle
          order
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
        }
        seriesID
        parentResource {
          id
          type
          menuTitle
          order
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
