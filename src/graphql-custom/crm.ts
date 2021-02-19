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
          thread {
            items {
              id
              content
              when
              authorName
              authorId
              attachment
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
