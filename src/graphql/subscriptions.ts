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
      authorOrgId
      owner
      author {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
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
          geocodeFull
          geocodeCity
          geocodeRegion
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
      authorOrg {
        id
        orgName
        adminEmail
        phone
        owner
        admins
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
          geocodeFull
          geocodeCity
          geocodeRegion
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
        messages {
          nextToken
        }
        resource {
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
          mainUserGroup
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
          admins
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
          geocodeFull
          geocodeCity
          geocodeRegion
        }
        length
        effort
        cost
        messages {
          nextToken
        }
        eventType
        eventUrl
        tz
        isSponsored
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($owner: String) {
    onCreateUser(owner: $owner) {
      id
      given_name
      family_name
      email
      phone
      owner
      mainUserGroup
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
        geocodeFull
        geocodeCity
        geocodeRegion
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
          tz
          isSponsored
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
          authorOrgId
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
  subscription OnUpdateUser($owner: String) {
    onUpdateUser(owner: $owner) {
      id
      given_name
      family_name
      email
      phone
      owner
      mainUserGroup
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
        geocodeFull
        geocodeCity
        geocodeRegion
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
          tz
          isSponsored
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
          authorOrgId
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
  subscription OnDeleteUser($owner: String) {
    onDeleteUser(owner: $owner) {
      id
      given_name
      family_name
      email
      phone
      owner
      mainUserGroup
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
        geocodeFull
        geocodeCity
        geocodeRegion
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
          tz
          isSponsored
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
          authorOrgId
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
          mainUserGroup
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
          admins
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
          geocodeFull
          geocodeCity
          geocodeRegion
        }
        length
        effort
        cost
        messages {
          nextToken
        }
        eventType
        eventUrl
        tz
        isSponsored
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
        mainUserGroup
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
          geocodeFull
          geocodeCity
          geocodeRegion
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
          mainUserGroup
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
          admins
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
          geocodeFull
          geocodeCity
          geocodeRegion
        }
        length
        effort
        cost
        messages {
          nextToken
        }
        eventType
        eventUrl
        tz
        isSponsored
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
        mainUserGroup
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
          geocodeFull
          geocodeCity
          geocodeRegion
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
          mainUserGroup
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
          admins
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
          geocodeFull
          geocodeCity
          geocodeRegion
        }
        length
        effort
        cost
        messages {
          nextToken
        }
        eventType
        eventUrl
        tz
        isSponsored
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
        mainUserGroup
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
          geocodeFull
          geocodeCity
          geocodeRegion
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
  subscription OnCreateGroup($owner: String) {
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
        mainUserGroup
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
          geocodeFull
          geocodeCity
          geocodeRegion
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
        admins
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
          geocodeFull
          geocodeCity
          geocodeRegion
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
        messages {
          nextToken
        }
        resource {
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
        geocodeFull
        geocodeCity
        geocodeRegion
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
          authorOrgId
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      eventType
      eventUrl
      tz
      isSponsored
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateGroup = /* GraphQL */ `
  subscription OnUpdateGroup($owner: String) {
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
        mainUserGroup
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
          geocodeFull
          geocodeCity
          geocodeRegion
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
        admins
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
          geocodeFull
          geocodeCity
          geocodeRegion
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
        messages {
          nextToken
        }
        resource {
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
        geocodeFull
        geocodeCity
        geocodeRegion
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
          authorOrgId
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      eventType
      eventUrl
      tz
      isSponsored
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteGroup = /* GraphQL */ `
  subscription OnDeleteGroup($owner: String) {
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
        mainUserGroup
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
          geocodeFull
          geocodeCity
          geocodeRegion
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
        admins
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
          geocodeFull
          geocodeCity
          geocodeRegion
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
        messages {
          nextToken
        }
        resource {
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
        geocodeFull
        geocodeCity
        geocodeRegion
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
          authorOrgId
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      eventType
      eventUrl
      tz
      isSponsored
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
        admins
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
          geocodeFull
          geocodeCity
          geocodeRegion
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
        messages {
          nextToken
        }
        resource {
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
        mainUserGroup
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
          geocodeFull
          geocodeCity
          geocodeRegion
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
        admins
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
          geocodeFull
          geocodeCity
          geocodeRegion
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
        messages {
          nextToken
        }
        resource {
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
        mainUserGroup
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
          geocodeFull
          geocodeCity
          geocodeRegion
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
        admins
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
          geocodeFull
          geocodeCity
          geocodeRegion
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
        messages {
          nextToken
        }
        resource {
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
        mainUserGroup
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
          geocodeFull
          geocodeCity
          geocodeRegion
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
  subscription OnCreateOrganization($owner: String, $admins: String) {
    onCreateOrganization(owner: $owner, admins: $admins) {
      id
      orgName
      adminEmail
      phone
      owner
      admins
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
        geocodeFull
        geocodeCity
        geocodeRegion
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
          tz
          isSponsored
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
          authorOrgId
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      resource {
        items {
          id
          type
          groupId
          organizationId
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
export const onUpdateOrganization = /* GraphQL */ `
  subscription OnUpdateOrganization($owner: String, $admins: String) {
    onUpdateOrganization(owner: $owner, admins: $admins) {
      id
      orgName
      adminEmail
      phone
      owner
      admins
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
        geocodeFull
        geocodeCity
        geocodeRegion
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
          tz
          isSponsored
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
          authorOrgId
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      resource {
        items {
          id
          type
          groupId
          organizationId
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
export const onDeleteOrganization = /* GraphQL */ `
  subscription OnDeleteOrganization($owner: String, $admins: String) {
    onDeleteOrganization(owner: $owner, admins: $admins) {
      id
      orgName
      adminEmail
      phone
      owner
      admins
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
        geocodeFull
        geocodeCity
        geocodeRegion
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
          tz
          isSponsored
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
          authorOrgId
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      resource {
        items {
          id
          type
          groupId
          organizationId
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
export const onCreateCourseInfo = /* GraphQL */ `
  subscription OnCreateCourseInfo($owner: String) {
    onCreateCourseInfo(owner: $owner) {
      id
      designedBy
      summary
      courseWeeks {
        items {
          id
          week
          date
          tz
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
  subscription OnUpdateCourseInfo($owner: String) {
    onUpdateCourseInfo(owner: $owner) {
      id
      designedBy
      summary
      courseWeeks {
        items {
          id
          week
          date
          tz
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
  subscription OnDeleteCourseInfo($owner: String) {
    onDeleteCourseInfo(owner: $owner) {
      id
      designedBy
      summary
      courseWeeks {
        items {
          id
          week
          date
          tz
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
  subscription OnCreateCourseWeek($owner: String) {
    onCreateCourseWeek(owner: $owner) {
      id
      week
      date
      tz
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
          lesson
          name
          time
          tz
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
  subscription OnUpdateCourseWeek($owner: String) {
    onUpdateCourseWeek(owner: $owner) {
      id
      week
      date
      tz
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
          lesson
          name
          time
          tz
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
  subscription OnDeleteCourseWeek($owner: String) {
    onDeleteCourseWeek(owner: $owner) {
      id
      week
      date
      tz
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
          lesson
          name
          time
          tz
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
  subscription OnCreateCourseLesson($owner: String) {
    onCreateCourseLesson(owner: $owner) {
      id
      lesson
      name
      time
      tz
      description
      courseWeek {
        id
        week
        date
        tz
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
          assignment
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
  subscription OnUpdateCourseLesson($owner: String) {
    onUpdateCourseLesson(owner: $owner) {
      id
      lesson
      name
      time
      tz
      description
      courseWeek {
        id
        week
        date
        tz
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
          assignment
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
  subscription OnDeleteCourseLesson($owner: String) {
    onDeleteCourseLesson(owner: $owner) {
      id
      lesson
      name
      time
      tz
      description
      courseWeek {
        id
        week
        date
        tz
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
          assignment
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
  subscription OnCreateCourseAssignment($owner: String) {
    onCreateCourseAssignment(owner: $owner) {
      id
      assignment
      due
      description
      courseLesson {
        id
        lesson
        name
        time
        tz
        description
        courseWeek {
          id
          week
          date
          tz
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
  subscription OnUpdateCourseAssignment($owner: String) {
    onUpdateCourseAssignment(owner: $owner) {
      id
      assignment
      due
      description
      courseLesson {
        id
        lesson
        name
        time
        tz
        description
        courseWeek {
          id
          week
          date
          tz
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
  subscription OnDeleteCourseAssignment($owner: String) {
    onDeleteCourseAssignment(owner: $owner) {
      id
      assignment
      due
      description
      courseLesson {
        id
        lesson
        name
        time
        tz
        description
        courseWeek {
          id
          week
          date
          tz
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
        mainUserGroup
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
          geocodeFull
          geocodeCity
          geocodeRegion
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
        mainUserGroup
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
          geocodeFull
          geocodeCity
          geocodeRegion
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
        mainUserGroup
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
          geocodeFull
          geocodeCity
          geocodeRegion
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
  subscription OnCreateMessage {
    onCreateMessage {
      id
      content
      when
      roomId
      userId
      authorOrgId
      owner
      author {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
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
          geocodeFull
          geocodeCity
          geocodeRegion
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
      authorOrg {
        id
        orgName
        adminEmail
        phone
        owner
        admins
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
          geocodeFull
          geocodeCity
          geocodeRegion
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
        messages {
          nextToken
        }
        resource {
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
          mainUserGroup
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
          admins
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
          geocodeFull
          geocodeCity
          geocodeRegion
        }
        length
        effort
        cost
        messages {
          nextToken
        }
        eventType
        eventUrl
        tz
        isSponsored
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage {
    onUpdateMessage {
      id
      content
      when
      roomId
      userId
      authorOrgId
      owner
      author {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
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
          geocodeFull
          geocodeCity
          geocodeRegion
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
      authorOrg {
        id
        orgName
        adminEmail
        phone
        owner
        admins
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
          geocodeFull
          geocodeCity
          geocodeRegion
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
        messages {
          nextToken
        }
        resource {
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
          mainUserGroup
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
          admins
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
          geocodeFull
          geocodeCity
          geocodeRegion
        }
        length
        effort
        cost
        messages {
          nextToken
        }
        eventType
        eventUrl
        tz
        isSponsored
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage {
    onDeleteMessage {
      id
      content
      when
      roomId
      userId
      authorOrgId
      owner
      author {
        id
        given_name
        family_name
        email
        phone
        owner
        mainUserGroup
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
          geocodeFull
          geocodeCity
          geocodeRegion
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
      authorOrg {
        id
        orgName
        adminEmail
        phone
        owner
        admins
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
          geocodeFull
          geocodeCity
          geocodeRegion
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
        messages {
          nextToken
        }
        resource {
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
          mainUserGroup
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
          admins
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
          geocodeFull
          geocodeCity
          geocodeRegion
        }
        length
        effort
        cost
        messages {
          nextToken
        }
        eventType
        eventUrl
        tz
        isSponsored
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
      organizationId
      owner
      resources {
        items {
          id
          owner
          type
          menuTitle
          order
          title
          description
          whoIsThisFor
          extendedDescription
          resourceID
          createdAt
          updatedAt
        }
        nextToken
      }
      organization {
        id
        orgName
        adminEmail
        phone
        owner
        admins
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
          geocodeFull
          geocodeCity
          geocodeRegion
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
        messages {
          nextToken
        }
        resource {
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
export const onUpdateResourceRoot = /* GraphQL */ `
  subscription OnUpdateResourceRoot {
    onUpdateResourceRoot {
      id
      type
      groupId
      organizationId
      owner
      resources {
        items {
          id
          owner
          type
          menuTitle
          order
          title
          description
          whoIsThisFor
          extendedDescription
          resourceID
          createdAt
          updatedAt
        }
        nextToken
      }
      organization {
        id
        orgName
        adminEmail
        phone
        owner
        admins
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
          geocodeFull
          geocodeCity
          geocodeRegion
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
        messages {
          nextToken
        }
        resource {
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
export const onDeleteResourceRoot = /* GraphQL */ `
  subscription OnDeleteResourceRoot {
    onDeleteResourceRoot {
      id
      type
      groupId
      organizationId
      owner
      resources {
        items {
          id
          owner
          type
          menuTitle
          order
          title
          description
          whoIsThisFor
          extendedDescription
          resourceID
          createdAt
          updatedAt
        }
        nextToken
      }
      organization {
        id
        orgName
        adminEmail
        phone
        owner
        admins
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
          geocodeFull
          geocodeCity
          geocodeRegion
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
        messages {
          nextToken
        }
        resource {
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
export const onCreateResource = /* GraphQL */ `
  subscription OnCreateResource($owner: String) {
    onCreateResource(owner: $owner) {
      id
      owner
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
      whoIsThisFor
      extendedDescription
      series {
        items {
          id
          owner
          type
          title
          description
          whoIsThisFor
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
        organizationId
        owner
        resources {
          nextToken
        }
        organization {
          id
          orgName
          adminEmail
          phone
          owner
          admins
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateResource = /* GraphQL */ `
  subscription OnUpdateResource($owner: String) {
    onUpdateResource(owner: $owner) {
      id
      owner
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
      whoIsThisFor
      extendedDescription
      series {
        items {
          id
          owner
          type
          title
          description
          whoIsThisFor
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
        organizationId
        owner
        resources {
          nextToken
        }
        organization {
          id
          orgName
          adminEmail
          phone
          owner
          admins
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteResource = /* GraphQL */ `
  subscription OnDeleteResource($owner: String) {
    onDeleteResource(owner: $owner) {
      id
      owner
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
      whoIsThisFor
      extendedDescription
      series {
        items {
          id
          owner
          type
          title
          description
          whoIsThisFor
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
        organizationId
        owner
        resources {
          nextToken
        }
        organization {
          id
          orgName
          adminEmail
          phone
          owner
          admins
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateResourceSeries = /* GraphQL */ `
  subscription OnCreateResourceSeries($owner: String) {
    onCreateResourceSeries(owner: $owner) {
      id
      owner
      type
      title
      description
      whoIsThisFor
      image
      category
      status
      allFiles
      playlist
      playlistImage
      episodes {
        items {
          id
          owner
          episodeNumber
          type
          title
          description
          whoIsThisFor
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
        owner
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
        whoIsThisFor
        extendedDescription
        series {
          nextToken
        }
        resourceID
        resourceRoot {
          id
          type
          groupId
          organizationId
          owner
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
  subscription OnUpdateResourceSeries($owner: String) {
    onUpdateResourceSeries(owner: $owner) {
      id
      owner
      type
      title
      description
      whoIsThisFor
      image
      category
      status
      allFiles
      playlist
      playlistImage
      episodes {
        items {
          id
          owner
          episodeNumber
          type
          title
          description
          whoIsThisFor
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
        owner
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
        whoIsThisFor
        extendedDescription
        series {
          nextToken
        }
        resourceID
        resourceRoot {
          id
          type
          groupId
          organizationId
          owner
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
  subscription OnDeleteResourceSeries($owner: String) {
    onDeleteResourceSeries(owner: $owner) {
      id
      owner
      type
      title
      description
      whoIsThisFor
      image
      category
      status
      allFiles
      playlist
      playlistImage
      episodes {
        items {
          id
          owner
          episodeNumber
          type
          title
          description
          whoIsThisFor
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
        owner
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
        whoIsThisFor
        extendedDescription
        series {
          nextToken
        }
        resourceID
        resourceRoot {
          id
          type
          groupId
          organizationId
          owner
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
  subscription OnCreateResourceEpisode($owner: String) {
    onCreateResourceEpisode(owner: $owner) {
      id
      owner
      episodeNumber
      type
      title
      description
      whoIsThisFor
      videoPreview
      videoLowRes
      videoHiRes
      lessonPlan
      activityPage
      episodeID
      parentSeries {
        id
        owner
        type
        title
        description
        whoIsThisFor
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
          owner
          type
          menuTitle
          order
          title
          description
          whoIsThisFor
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
  subscription OnUpdateResourceEpisode($owner: String) {
    onUpdateResourceEpisode(owner: $owner) {
      id
      owner
      episodeNumber
      type
      title
      description
      whoIsThisFor
      videoPreview
      videoLowRes
      videoHiRes
      lessonPlan
      activityPage
      episodeID
      parentSeries {
        id
        owner
        type
        title
        description
        whoIsThisFor
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
          owner
          type
          menuTitle
          order
          title
          description
          whoIsThisFor
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
  subscription OnDeleteResourceEpisode($owner: String) {
    onDeleteResourceEpisode(owner: $owner) {
      id
      owner
      episodeNumber
      type
      title
      description
      whoIsThisFor
      videoPreview
      videoLowRes
      videoHiRes
      lessonPlan
      activityPage
      episodeID
      parentSeries {
        id
        owner
        type
        title
        description
        whoIsThisFor
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
          owner
          type
          menuTitle
          order
          title
          description
          whoIsThisFor
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
