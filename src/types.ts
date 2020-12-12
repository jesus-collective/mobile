import { GraphQLResult } from "@aws-amplify/api/lib/types"
import { ResourceActions, ResourceState } from "components/ResourceViewer/ResourceContext";
import { CreateResourceMenuItemMutation, CreateResourceRootMutation, DeleteResourceMenuItemMutation, GetGroupQuery, GetResourceRootQuery, GetUserQuery, GroupMemberByUserQuery, ListResourceRootsQuery, ResourcePageItemInput, UpdateResourceMenuItemMutation } from "./API";

type WithoutKeys<T> = Omit<T, keyof T>;

export type EmptyProps = WithoutKeys<Record<string, never>>; 
export type AuthStateData = {
    fromVerified?: boolean;
    email?: string;
    joinedProduct?: string;
  }|null;

export type GetUserQueryResult = GraphQLResult<GetUserQuery>
export type GetUserQueryResultPromise = Promise< GraphQLResult<GetUserQuery>>
export type UserData= NonNullable<GetUserQuery>["getUser"]

export type GetGroupQueryResult = GraphQLResult<GetGroupQuery>
export type GetGroupQueryResultPromise = Promise< GraphQLResult<GetGroupQuery>>
export type GroupData= NonNullable<GetGroupQuery>["getGroup"]

export type GroupMemberByUserQueryResult = GraphQLResult<GroupMemberByUserQuery>
export type GroupMemberByUserQueryResultPromise = Promise< GraphQLResult<GroupMemberByUserQuery>>
export type GroupMemberByUserData= NonNullable<NonNullable<GroupMemberByUserQuery>["groupMemberByUser"]>["items"]

export type ListResourceRootsQueryResult = GraphQLResult<ListResourceRootsQuery>
export type ListResourceRootsQueryResultPromise = Promise< GraphQLResult<ListResourceRootsQuery>>
export type ListResourceRootsData= NonNullable<NonNullable<ListResourceRootsQuery>["listResourceRoots"]>["items"]

export type GetResourceRootQueryResult = GraphQLResult<GetResourceRootQuery>
export type GetResourceRootQueryResultPromise = Promise< GraphQLResult<GetResourceRootQuery>>
export type GetResourceRootData= NonNullable<GetResourceRootQuery>["getResourceRoot"]

export type CreateResourceRootMutationResult=GraphQLResult<CreateResourceRootMutation>
export type CreateResourceMenuItemMutationResult=GraphQLResult<CreateResourceMenuItemMutation>
export type UpdateResourceMenuItemMutationResult=GraphQLResult<UpdateResourceMenuItemMutation>
export type DeleteResourceMenuItemMutationResult=GraphQLResult<DeleteResourceMenuItemMutation>
export interface ResourceSetupProp {
  resourceActions: ResourceActions
  resourceState: ResourceState
  pageItemIndex: number
  pageItem: ResourcePageItemInput
  save(
    resourceActions: ResourceActions,
    resourceState: ResourceState,
    index: number,
    value: ResourcePageItemInput
  ): void
  delete(resourceActions: ResourceActions, resourceState: ResourceState, index: number): void
}