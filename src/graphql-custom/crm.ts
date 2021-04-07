export const getCrmRoot = /* GraphQL */ `
  query GetCrmRoot($id: ID!) {
    getCRMRoot(id: $id) {
      id
      messages {
        items {
          id
          rootId
          content
          when
          authorName
          authorId
          attachment
          attachmentOwner
          thread {
            items {
              id
              rootId
              content
              when
              authorName
              authorId
              attachment
              attachmentOwner
              parentId
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`
