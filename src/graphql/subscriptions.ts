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
        messages {
          nextToken
        }
        eventType
        eventUrl
      }
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
        }
        nextToken
      }
      subTitle
      introduction
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
        }
        nextToken
      }
      subTitle
      introduction
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
        }
        nextToken
      }
      subTitle
      introduction
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
        }
        nextToken
      }
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
        }
        nextToken
      }
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
        }
        nextToken
      }
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
        }
        nextToken
      }
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
        }
        nextToken
      }
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
        }
        nextToken
      }
    }
  }
`;
export const onCreateCourseAssignment = /* GraphQL */ `
  subscription OnCreateCourseAssignment {
    onCreateCourseAssignment {
      id
      due
      description
    }
  }
`;
export const onUpdateCourseAssignment = /* GraphQL */ `
  subscription OnUpdateCourseAssignment {
    onUpdateCourseAssignment {
      id
      due
      description
    }
  }
`;
export const onDeleteCourseAssignment = /* GraphQL */ `
  subscription OnDeleteCourseAssignment {
    onDeleteCourseAssignment {
      id
      due
      description
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
          image
          description
          extendedDescription
        }
        nextToken
      }
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
          image
          description
          extendedDescription
        }
        nextToken
      }
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
          image
          description
          extendedDescription
        }
        nextToken
      }
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
      image
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
        }
        nextToken
      }
      root {
        id
        type
        resources {
          nextToken
        }
      }
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
      image
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
        }
        nextToken
      }
      root {
        id
        type
        resources {
          nextToken
        }
      }
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
      image
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
        }
        nextToken
      }
      root {
        id
        type
        resources {
          nextToken
        }
      }
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
        }
        nextToken
      }
      resource {
        id
        type
        menuTitle
        title
        image
        description
        extendedDescription
        series {
          nextToken
        }
        root {
          id
          type
        }
      }
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
        }
        nextToken
      }
      resource {
        id
        type
        menuTitle
        title
        image
        description
        extendedDescription
        series {
          nextToken
        }
        root {
          id
          type
        }
      }
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
        }
        nextToken
      }
      resource {
        id
        type
        menuTitle
        title
        image
        description
        extendedDescription
        series {
          nextToken
        }
        root {
          id
          type
        }
      }
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
        }
        resource {
          id
          type
          menuTitle
          title
          image
          description
          extendedDescription
        }
      }
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
        }
        resource {
          id
          type
          menuTitle
          title
          image
          description
          extendedDescription
        }
      }
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
        }
        resource {
          id
          type
          menuTitle
          title
          image
          description
          extendedDescription
        }
      }
    }
  }
`;
