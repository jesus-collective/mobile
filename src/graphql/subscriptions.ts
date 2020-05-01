// tslint:disable
// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($roomId: ID!) {
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
export const onCreateCourseInfo = /* GraphQL */ `
  subscription OnCreateCourseInfo($owner: String!) {
    onCreateCourseInfo(owner: $owner) {
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
export const onUpdateCourseInfo = /* GraphQL */ `
  subscription OnUpdateCourseInfo($owner: String!) {
    onUpdateCourseInfo(owner: $owner) {
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
export const onDeleteCourseInfo = /* GraphQL */ `
  subscription OnDeleteCourseInfo($owner: String!) {
    onDeleteCourseInfo(owner: $owner) {
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
export const onCreateCourseWeek = /* GraphQL */ `
  subscription OnCreateCourseWeek {
    onCreateCourseWeek {
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
export const onUpdateCourseWeek = /* GraphQL */ `
  subscription OnUpdateCourseWeek {
    onUpdateCourseWeek {
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
export const onDeleteCourseWeek = /* GraphQL */ `
  subscription OnDeleteCourseWeek {
    onDeleteCourseWeek {
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
export const onCreateCourseLesson = /* GraphQL */ `
  subscription OnCreateCourseLesson {
    onCreateCourseLesson {
      id
      name
      time
      description
      assignment {
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
export const onUpdateCourseLesson = /* GraphQL */ `
  subscription OnUpdateCourseLesson {
    onUpdateCourseLesson {
      id
      name
      time
      description
      assignment {
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
export const onDeleteCourseLesson = /* GraphQL */ `
  subscription OnDeleteCourseLesson {
    onDeleteCourseLesson {
      id
      name
      time
      description
      assignment {
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
export const onCreateCourseAssignment = /* GraphQL */ `
  subscription OnCreateCourseAssignment {
    onCreateCourseAssignment {
      id
      due
      description
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateCourseAssignment = /* GraphQL */ `
  subscription OnUpdateCourseAssignment {
    onUpdateCourseAssignment {
      id
      due
      description
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteCourseAssignment = /* GraphQL */ `
  subscription OnDeleteCourseAssignment {
    onDeleteCourseAssignment {
      id
      due
      description
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateResourceRoot = /* GraphQL */ `
  subscription OnCreateResourceRoot {
    onCreateResourceRoot {
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
export const onUpdateResourceRoot = /* GraphQL */ `
  subscription OnUpdateResourceRoot {
    onUpdateResourceRoot {
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
export const onDeleteResourceRoot = /* GraphQL */ `
  subscription OnDeleteResourceRoot {
    onDeleteResourceRoot {
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
