/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CRMRoot = {
  __typename: "CRMRoot"
  id?: string
  messages?: ModelCRMMessageConnection
  createdAt?: string
  updatedAt?: string
}

export type ModelCRMMessageConnection = {
  __typename: "ModelCRMMessageConnection"
  items?: Array<CRMMessage | null> | null
  nextToken?: string | null
}

export type CRMMessage = {
  __typename: "CRMMessage"
  id?: string
  rootId?: string
  crmRoot?: CRMRoot
  content?: string
  when?: string
  authorName?: string
  authorId?: string
  attachment?: string | null
  thread?: ModelCRMReplyConnection
  createdAt?: string
  updatedAt?: string
}

export type ModelCRMReplyConnection = {
  __typename: "ModelCRMReplyConnection"
  items?: Array<CRMReply | null> | null
  nextToken?: string | null
}

export type CRMReply = {
  __typename: "CRMReply"
  id?: string
  content?: string
  when?: string
  authorName?: string
  authorId?: string
  attachment?: string | null
  parentId?: string
  parent?: CRMMessage
  createdAt?: string
  updatedAt?: string
}

export type GetCrmRootQueryVariables = {
  id?: string
}

export type GetCrmRootQuery = {
  getCRMRoot?: {
    __typename: "CRMRoot"
    id: string
    messages?: {
      __typename: "ModelCRMMessageConnection"
      items?: Array<{
        __typename: "CRMMessage"
        id: string
        rootId: string
        content: string
        when: string
        authorName: string
        authorId: string
        attachment?: string | null
        thread?: {
          __typename: "ModelCRMReplyConnection"
          items?: Array<{
            __typename: "CRMReply"
            id: string
            content: string
            when: string
            authorName: string
            authorId: string
            attachment?: string | null
            parentId: string
            createdAt: string
            updatedAt: string
          } | null> | null
          nextToken?: string | null
        } | null
        createdAt: string
        updatedAt: string
      } | null> | null
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}
