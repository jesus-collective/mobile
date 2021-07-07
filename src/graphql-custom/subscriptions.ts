export const onCreateDirectMessageReply = /* GraphQL */ `
  subscription OnCreateDirectMessageReply {
    onCreateDirectMessageReply {
      id
      messageId
      messageRoomID
      createdAt
      updatedAt
      author {
        id
        given_name
        family_name
        currentRole
      }
    }
  }
`

export const onCreateDirectMessage = /* GraphQL */ `
  subscription OnCreateDirectMessage {
    onCreateDirectMessage {
      id
      content
      attachment
      attachmentName
      attachmentOwner
      replies {
        items {
          id
          content
          when
          attachment
          attachmentName
          attachmentOwner
          recipients
          userId
          messageId
          messageRoomID
          parentReplyId
          createdAt
          updatedAt
        }
        nextToken
      }
      messageRoomID
      createdAt
      updatedAt
      author {
        id
        given_name
        family_name
        currentRole
      }
    }
  }
`
