export const getResourceRoot = /* GraphQL */ `
  query GetResourceRoot($id: ID!) {
    getResourceRoot(id: $id) {
      id
      type
      groupId
      resources {
        items {
          id
          type
          menuTitle
          image {
            userId
            filenameSmall
            filenameMedium
            filenameLarge
            filenameUpload
          }
          title
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
                createdAt
                updatedAt
                }
                nextToken
            }
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