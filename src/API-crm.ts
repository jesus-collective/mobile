/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type GetCrmRootQueryVariables = {
  id: string
}

export type GetCrmRootQuery = {
  getCRMRoot: {
    __typename: "CRMRoot"
    id: string
    messages: {
      __typename: "ModelCRMMessageConnection"
      items: Array<{
        __typename: "CRMMessage"
        id: string
        rootId: string
        content: string
        when: string
        authorName: string
        authorId: string
        attachment: string | null
        thread: {
          __typename: "ModelCRMReplyConnection"
          items: Array<{
            __typename: "CRMReply"
            id: string
            rootId: string
            content: string
            when: string
            authorName: string
            authorId: string
            attachment: string | null
            parentId: string
            createdAt: string
            updatedAt: string
          } | null> | null
          nextToken: string | null
        } | null
        createdAt: string
        updatedAt: string
      } | null> | null
      nextToken: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}
