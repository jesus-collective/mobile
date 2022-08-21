import { GraphQLResult } from "@aws-amplify/api/lib/types"
import { API } from "aws-amplify"
import GRAPHQL_AUTH_MODE from "aws-amplify-react-native"
import { GetCourseInfoQuery } from "src/API-courses"
import {
  GetResourceRootQuery,
  GetUser2Query,
  ListDirectMessageRoomsQuery,
  ListDirectMessageRoomsQueryVariables,
  ListDirectMessageUsersQuery,
  ListDirectMessageUsersQueryVariables,
  ListMenusQuery,
  ModelGroupFilterInput,
} from "src/API-customqueries"
import { InviteType } from "src/types"
import {
  CourseTriadUserByUserQuery,
  CreateCourseBackOfficeStaffInput,
  CreateCourseBackOfficeStaffMutation,
  CreateCourseInfoInput,
  CreateCourseInfoMutation,
  CreateCourseInstructorsInput,
  CreateCourseInstructorsMutation,
  CreateCourseLessonInput,
  CreateCourseLessonMutation,
  CreateCourseTriadCoachesInput,
  CreateCourseTriadCoachesMutation,
  CreateCourseTriadsInput,
  CreateCourseTriadsMutation,
  CreateCourseTriadUsersInput,
  CreateCourseTriadUsersMutation,
  CreateCourseWeekInput,
  CreateCourseWeekMutation,
  CreateCRMMessageInput,
  CreateCrmMessageMutation,
  CreateCRMReplyInput,
  CreateCrmReplyMutation,
  CreateCRMRootInput,
  CreateCrmRootMutation,
  CreateCustomPricingInput,
  CreateCustomPricingMutation,
  CreateCustomProfileInput,
  CreateCustomProfileMutation,
  CreateDirectMessageInput,
  CreateDirectMessageMutation,
  CreateDirectMessageReplyInput,
  CreateDirectMessageReplyMutation,
  CreateDirectMessageRoomInput,
  CreateDirectMessageRoomMutation,
  CreateDirectMessageUserInput,
  CreateDirectMessageUserMutation,
  CreateGroupInput,
  CreateGroupMemberInput,
  CreateGroupMemberMutation,
  CreateGroupMutation,
  CreateMenuInput,
  CreateMenuMutation,
  CreateMessageInput,
  CreateMessageMutation,
  CreateOrganizationInput,
  CreateOrganizationMemberInput,
  CreateOrganizationMemberMutation,
  CreateOrganizationMutation,
  CreatePaymentInput,
  CreatePaymentMutation,
  CreateProductInput,
  CreateProductMutation,
  CreateReplyInput,
  CreateReplyMutation,
  CreateResourceEpisodeInput,
  CreateResourceEpisodeMutation,
  CreateResourceInput,
  CreateResourceMenuItemInput,
  CreateResourceMenuItemMutation,
  CreateResourceMutation,
  CreateResourceRootInput,
  CreateResourceRootMutation,
  CreateResourceSeriesInput,
  CreateResourceSeriesMutation,
  CreateStartupInput,
  CreateStartupMutation,
  CreateStripeCustomerAdminMutation,
  CreateStripeCustomerAdminMutationVariables,
  CreateStripeCustomerMutation,
  CreateStripeCustomerMutationVariables,
  CreateSubMenuInput,
  CreateSubMenuMutation,
  CreateSubscriptionMutation,
  CreateSubscriptionMutationVariables,
  CreateUserInput,
  CreateUserMutation,
  DeleteCourseBackOfficeStaffMutation,
  DeleteCourseInstructorsMutation,
  DeleteCourseLessonMutation,
  DeleteCourseTriadCoachesMutation,
  DeleteCourseTriadsMutation,
  DeleteCourseTriadUsersMutation,
  DeleteCourseWeekMutation,
  DeleteCustomPricingMutation,
  DeleteCustomProfileMutation,
  DeleteDirectMessageRoomMutation,
  DeleteGroupMemberMutation,
  DeleteGroupMutation,
  DeleteMenuMutation,
  DeleteOrganizationMutation,
  DeletePaymentMutation,
  DeleteProductMutation,
  DeleteResourceEpisodeMutation,
  DeleteResourceMenuItemMutation,
  DeleteResourceMutation,
  DeleteResourceSeriesMutation,
  DeleteStartupMutation,
  DeleteUserMutation,
  EventBriteListEventsQuery,
  EventBriteListTicketClassesQuery,
  EventBriteListTicketClassesQueryVariables,
  GetDirectMessageQuery,
  GetDirectMessageRoomQuery,
  GetDirectMessageUserQuery,
  GetGroupQuery,
  GetOrganizationQuery,
  GetPaymentQuery,
  GetProductQuery,
  GetUserQuery,
  Group,
  GroupByTypeByTimeQuery,
  GroupByTypeQuery,
  GroupMemberByUserQuery,
  ListCustomPricingsQuery,
  ListCustomProfilesQuery,
  ListCustomProfilesQueryVariables,
  ListDirectMessagesQuery,
  ListDirectMessagesQueryVariables,
  ListGroupsQuery,
  ListOrganizationsQuery,
  ListPaymentsQuery,
  ListProductsQuery,
  ListResourceRootsQuery,
  ListStartupsQuery,
  ListUsersQuery,
  ListUsersQueryVariables,
  MessagesByRoomQuery,
  MessagesByRoomQueryVariables,
  ModelCustomPricingFilterInput,
  ModelMenuFilterInput,
  ModelPaymentFilterInput,
  ModelProductFilterInput,
  ModelResourceRootFilterInput,
  ModelSortDirection,
  ModelStartupFilterInput,
  ModelStringFilterInput,
  PaymentByUserQuery,
  PreviewInvoiceMutation,
  PreviewInvoiceMutationVariables,
  SearchableGroupFilterInput,
  SearchableUserFilterInput,
  SearchGroupsQuery,
  SearchUsersQuery,
  UpdateCourseInfoInput,
  UpdateCourseInfoMutation,
  UpdateCourseLessonInput,
  UpdateCourseLessonMutation,
  UpdateCourseTriadsInput,
  UpdateCourseTriadsMutation,
  UpdateCourseWeekInput,
  UpdateCourseWeekMutation,
  UpdateCustomPricingInput,
  UpdateCustomPricingMutation,
  UpdateCustomProfileInput,
  UpdateCustomProfileMutation,
  UpdateDirectMessageInput,
  UpdateDirectMessageMutation,
  UpdateGroupInput,
  UpdateGroupMutation,
  UpdateMenuInput,
  UpdateMenuMutation,
  UpdateOrganizationInput,
  UpdateOrganizationMutation,
  UpdateProductInput,
  UpdateProductMutation,
  UpdateResourceEpisodeInput,
  UpdateResourceEpisodeMutation,
  UpdateResourceInput,
  UpdateResourceMenuItemInput,
  UpdateResourceMenuItemMutation,
  UpdateResourceMutation,
  UpdateResourceSeriesInput,
  UpdateResourceSeriesMutation,
  UpdateStartupInput,
  UpdateStartupMutation,
  UpdateSubMenuInput,
  UpdateSubMenuMutation,
  UpdateUserInput,
  UpdateUserMutation,
} from "../../src/API"
import * as courseQueries from "../../src/graphql-custom/courses"
import * as customMutations from "../../src/graphql-custom/mutations"
import * as customQueries from "../../src/graphql-custom/queries"
import * as mutations from "../../src/graphql/mutations"
import * as queries from "../../src/graphql/queries"

export enum UserGroupType {
  All = "All",
  Partners = "Partners",
  Friends = "Friends",
  OneStory = "OneStory",
}
export class Data {
  static updateDirectMessage(input: UpdateDirectMessageInput) {
    return API.graphql({
      query: customMutations.updateDirectMessage,
      variables: { input: input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<UpdateDirectMessageMutation>>
  }
  static updateOrganization(input: UpdateOrganizationInput) {
    return API.graphql({
      query: mutations.updateOrganization,
      variables: { input: input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<UpdateOrganizationMutation>>
  }
  static updateGroup(input: UpdateGroupInput) {
    return API.graphql({
      query: mutations.updateGroup,
      variables: { input: input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<UpdateGroupMutation>>
  }
  static updateResourceMenuItem(input: UpdateResourceMenuItemInput) {
    return API.graphql({
      query: mutations.updateResourceMenuItem,
      variables: {
        input: input,
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<UpdateResourceMenuItemMutation>>
  }
  static updateResource(input: UpdateResourceInput) {
    return API.graphql({
      query: mutations.updateResource,
      variables: {
        input: input,
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<UpdateResourceMutation>>
  }
  static updateResourceSeries(input: UpdateResourceSeriesInput) {
    return API.graphql({
      query: mutations.updateResourceSeries,
      variables: {
        input: input,
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<UpdateResourceSeriesMutation>>
  }
  static updateResourceEpisode(input: UpdateResourceEpisodeInput) {
    return API.graphql({
      query: mutations.updateResourceEpisode,
      variables: {
        input: input,
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<UpdateResourceEpisodeMutation>>
  }
  static updateProduct(input: UpdateProductInput) {
    return API.graphql({
      query: mutations.updateProduct,
      variables: { input: input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<UpdateProductMutation>>
  }
  static updateCourseTriads(input: UpdateCourseTriadsInput) {
    return API.graphql({
      query: mutations.updateCourseTriads,
      variables: input,

      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<UpdateCourseTriadsMutation>>
  }
  static updateCourseLesson(input: UpdateCourseLessonInput) {
    return API.graphql({
      query: mutations.updateCourseLesson,
      variables: {
        input: input,
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<UpdateCourseLessonMutation>>
  }
  static updateCourseInfo(input: UpdateCourseInfoInput) {
    return API.graphql({
      query: mutations.updateCourseInfo,
      variables: {
        input: input,
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<UpdateCourseInfoMutation>>
  }
  static updateCourseWeek(input: UpdateCourseWeekInput) {
    return API.graphql({
      query: mutations.updateCourseWeek,
      variables: {
        input: input,
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<UpdateCourseWeekMutation>>
  }
  static deleteDirectMessageRoom(id: string) {
    return API.graphql({
      query: mutations.deleteDirectMessageRoom,
      variables: { input: { id: id } },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<DeleteDirectMessageRoomMutation>>
  }
  static deleteDirectMessageUser(id: string) {
    return API.graphql({
      query: mutations.deleteDirectMessageUser,
      variables: { input: { id: id } },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<DeleteDirectMessageRoomMutation>>
  }

  static deleteMenu(id: string) {
    return API.graphql({
      query: mutations.deleteMenu,
      variables: { input: { id: id } },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<DeleteMenuMutation>>
  }
  static deleteCustomPricing(id: string) {
    return API.graphql({
      query: mutations.deleteCustomPricing,
      variables: { input: { id: id } },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<DeleteCustomPricingMutation>>
  }
  static deleteCustomProfile(id: string) {
    return API.graphql({
      query: mutations.deleteCustomProfile,
      variables: { input: { id: id } },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<DeleteCustomProfileMutation>>
  }
  static deleteStartup(id: string) {
    return API.graphql({
      query: mutations.deleteStartup,
      variables: { input: { id: id } },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<DeleteStartupMutation>>
  }
  static deleteSubMenu(id: string) {
    return API.graphql({
      query: mutations.deleteSubMenu,
      variables: { input: { id: id } },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<DeleteGroupMemberMutation>>
  }
  static deleteGroupMember(id: string) {
    return API.graphql({
      query: mutations.deleteGroupMember,
      variables: { input: { id: id } },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<DeleteGroupMemberMutation>>
  }
  static deleteUser(id: string) {
    return API.graphql({
      query: mutations.deleteUser,
      variables: {
        input: { id: id },
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<DeleteUserMutation>>
  }
  static deleteOrganization(id: string) {
    return API.graphql({
      query: mutations.deleteOrganization,
      variables: {
        input: { id: id },
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<DeleteOrganizationMutation>>
  }

  static deleteGroup(id: string) {
    return API.graphql({
      query: mutations.deleteGroup,
      variables: { input: { id: id } },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<DeleteGroupMutation>>
  }
  static deleteResourceMenuItem(id: string) {
    return API.graphql({
      query: mutations.deleteResourceMenuItem,
      variables: { input: { id: id } },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<DeleteResourceMenuItemMutation>>
  }
  static deleteResource(id: string) {
    return API.graphql({
      query: mutations.deleteResource,
      variables: { input: { id: id } },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<DeleteResourceMutation>>
  }
  static deleteResourceSeries(id: string) {
    return API.graphql({
      query: mutations.deleteResourceSeries,
      variables: {
        input: {
          id: id,
        },
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<DeleteResourceSeriesMutation>>
  }
  static deleteResourceEpisode(id: string) {
    return API.graphql({
      query: mutations.deleteResourceEpisode,
      variables: {
        input: {
          id: id,
        },
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<DeleteResourceEpisodeMutation>>
  }
  static deleteProduct(id: string) {
    return API.graphql({
      query: mutations.deleteProduct,
      variables: { input: { id: id } },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<DeleteProductMutation>>
  }
  static deletePayment(id: string) {
    return API.graphql({
      query: customMutations.deletePayment,
      variables: { input: { id: id } },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<DeletePaymentMutation>>
  }
  static deleteCourseBackOfficeStaff(id: string) {
    return API.graphql({
      query: mutations.deleteCourseBackOfficeStaff,
      variables: {
        input: {
          id: id,
        },
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<DeleteCourseBackOfficeStaffMutation>>
  }
  static deleteCourseInstructors(id: string) {
    return API.graphql({
      query: mutations.deleteCourseInstructors,
      variables: {
        input: {
          id: id,
        },
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<DeleteCourseInstructorsMutation>>
  }
  static deleteCourseTriadUsers(id: string) {
    return API.graphql({
      query: mutations.deleteCourseTriadUsers,
      variables: {
        input: {
          id: id,
        },
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<DeleteCourseTriadUsersMutation>>
  }
  static deleteCourseTriadCoaches(id: string) {
    return API.graphql({
      query: mutations.deleteCourseTriadCoaches,
      variables: {
        input: {
          id: id,
        },
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<DeleteCourseTriadCoachesMutation>>
  }
  static deleteCourseTriads(id: string) {
    return API.graphql({
      query: mutations.deleteCourseTriads,
      variables: {
        input: { id: id },
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<DeleteCourseTriadsMutation>>
  }
  static deleteCourseWeek(id: string) {
    return API.graphql({
      query: mutations.deleteCourseWeek,
      variables: {
        input: { id: id },
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<DeleteCourseWeekMutation>>
  }
  static deleteCourseLesson(id: string) {
    return API.graphql({
      query: mutations.deleteCourseLesson,
      variables: {
        input: {
          id: id,
        },
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<DeleteCourseLessonMutation>>
  }
  static createMenu(input: CreateMenuInput) {
    return API.graphql({
      query: mutations.createMenu,
      variables: { input: input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<CreateMenuMutation>>
  }
  static createCustomPricing(input: CreateCustomPricingInput) {
    return API.graphql({
      query: mutations.createCustomPricing,
      variables: { input: input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<CreateCustomPricingMutation>>
  }
  static createCustomProfile(input: CreateCustomProfileInput) {
    return API.graphql({
      query: mutations.createCustomProfile,
      variables: { input: input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<CreateCustomProfileMutation>>
  }
  static createStartup(input: CreateStartupInput) {
    return API.graphql({
      query: mutations.createStartup,
      variables: { input: input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<CreateStartupMutation>>
  }
  static createSubMenu(input: CreateSubMenuInput) {
    return API.graphql({
      query: mutations.createSubMenu,
      variables: { input: input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<CreateSubMenuMutation>>
  }
  static createCrmRoot(input: CreateCRMRootInput) {
    return API.graphql({
      query: mutations.createCrmRoot,
      variables: { input: input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<CreateCrmRootMutation>>
  }
  static createCrmReply(input: CreateCRMReplyInput) {
    return API.graphql({
      query: mutations.createCrmReply,
      variables: { input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<CreateCrmReplyMutation>>
  }
  static createCrmMessage(input: CreateCRMMessageInput) {
    return API.graphql({
      query: mutations.createCrmMessage,
      variables: { input: input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<CreateCrmMessageMutation>>
  }
  static createCourseInfo(input: CreateCourseInfoInput) {
    return API.graphql({
      query: mutations.createCourseInfo,
      variables: { input: input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<CreateCourseInfoMutation>>
  }
  static createCourseLesson(input: CreateCourseLessonInput) {
    return API.graphql({
      query: mutations.createCourseLesson,
      variables: { input: input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<CreateCourseLessonMutation>>
  }
  static createCourseWeek(input: CreateCourseWeekInput) {
    return API.graphql({
      query: mutations.createCourseWeek,
      variables: { input: input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<CreateCourseWeekMutation>>
  }
  static createCourseTriads(input: CreateCourseTriadsInput) {
    return API.graphql({
      query: mutations.createCourseTriads,
      variables: { input: input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<CreateCourseTriadsMutation>>
  }
  static createCourseTriadCoaches(input: CreateCourseTriadCoachesInput) {
    return API.graphql({
      query: mutations.createCourseTriadCoaches,
      variables: {
        input: input,
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<CreateCourseTriadCoachesMutation>>
  }
  static createCourseTriadUsers(input: CreateCourseTriadUsersInput) {
    return API.graphql({
      query: mutations.createCourseTriadUsers,
      variables: {
        input: input,
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<CreateCourseTriadUsersMutation>>
  }
  static createCourseInstructors(input: CreateCourseInstructorsInput) {
    return API.graphql({
      query: mutations.createCourseInstructors,
      variables: {
        input: input,
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<CreateCourseInstructorsMutation>>
  }
  static createCourseBackOfficeStaff(input: CreateCourseBackOfficeStaffInput) {
    return API.graphql({
      query: mutations.createCourseBackOfficeStaff,
      variables: {
        input: input,
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<CreateCourseBackOfficeStaffMutation>>
  }
  static createProduct(input: CreateProductInput) {
    return API.graphql({
      query: mutations.createProduct,
      variables: { input: input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<CreateProductMutation>>
  }
  static createOrganizationMember(input: CreateOrganizationMemberInput) {
    return API.graphql({
      query: mutations.createOrganizationMember,
      variables: {
        input: input,
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<CreateOrganizationMemberMutation>>
  }
  static createOrganization(input: CreateOrganizationInput) {
    return API.graphql({
      query: mutations.createOrganization,
      variables: {
        input: input,
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<CreateOrganizationMutation>>
  }
  static createGroup(input: CreateGroupInput) {
    return API.graphql({
      query: mutations.createGroup,
      variables: { input: input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<CreateGroupMutation>>
  }
  static createGroupMember(input: CreateGroupMemberInput) {
    return API.graphql({
      query: mutations.createGroupMember,
      variables: {
        input: input,
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<CreateGroupMemberMutation>>
  }
  static createDirectMessageUserCustom(input: CreateDirectMessageUserInput) {
    return API.graphql({
      query: customMutations.createDirectMessageUser,
      variables: {
        input: input,
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<CreateDirectMessageUserMutation>>
  }
  static createDirectMessageUser(input: CreateDirectMessageUserInput) {
    return API.graphql({
      query: mutations.createDirectMessageUser,
      variables: {
        input: input,
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<CreateDirectMessageUserMutation>>
  }
  static createDirectMessageRoom(input: CreateDirectMessageRoomInput) {
    return API.graphql({
      query: mutations.createDirectMessageRoom,
      variables: {
        input: input,
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<CreateDirectMessageRoomMutation>>
  }
  static createDirectMessageReply(input: CreateDirectMessageReplyInput) {
    return API.graphql({
      query: mutations.createDirectMessageReply,
      variables: { input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<CreateDirectMessageReplyMutation>>
  }
  static createReply(input: CreateReplyInput) {
    return API.graphql({
      query: mutations.createReply,
      variables: { input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<CreateReplyMutation>>
  }
  static createDirectMessage(input: CreateDirectMessageInput) {
    return API.graphql({
      query: mutations.createDirectMessage,
      variables: { input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<CreateDirectMessageMutation>>
  }
  static createPayment(input: CreatePaymentInput) {
    return API.graphql({
      query: customMutations.createPayment,
      variables: {
        input: input,
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<CreatePaymentMutation>>
  }
  static createSubscription(variables: CreateSubscriptionMutationVariables) {
    return API.graphql({
      query: mutations.createSubscription,
      variables: variables,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<CreateSubscriptionMutation>>
  }
  static previewInvoice(variables: PreviewInvoiceMutationVariables) {
    return API.graphql({
      query: customMutations.previewInvoice,
      variables: variables,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<PreviewInvoiceMutation>>
  }
  static createResourceEpisode(input: CreateResourceEpisodeInput) {
    return API.graphql({
      query: mutations.createResourceEpisode,
      variables: { input: input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<CreateResourceEpisodeMutation>>
  }
  static createResourceSeries(input: CreateResourceSeriesInput) {
    return API.graphql({
      query: mutations.createResourceSeries,
      variables: { input: input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<CreateResourceSeriesMutation>>
  }
  static createResourceMenuItem(input: CreateResourceMenuItemInput) {
    return API.graphql({
      query: mutations.createResourceMenuItem,
      variables: { input: input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<CreateResourceMenuItemMutation>>
  }
  static createResourceRoot(input: CreateResourceRootInput) {
    return API.graphql({
      query: mutations.createResourceRoot,
      variables: { input: input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<CreateResourceRootMutation>>
  }
  static createResource(input: CreateResourceInput) {
    return API.graphql({
      query: mutations.createResource,
      variables: { input: input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<CreateResourceMutation>>
  }
  static createUser(inputData: CreateUserInput) {
    return API.graphql({
      query: mutations.createUser,
      variables: {
        input: inputData,
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<CreateUserMutation>>
  }
  static createMessage(input: CreateMessageInput) {
    return API.graphql({
      query: mutations.createMessage,
      variables: { input },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<CreateMessageMutation>>
  }
  static getCourseInfoForOverview(id: string) {
    return API.graphql({
      query: customQueries.getCourseInfoForOverview,
      variables: { id: id },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<GetCourseInfoQuery>>
  }
  static getCourseInfo(id: string) {
    return API.graphql({
      query: courseQueries.getCourseInfo,
      variables: { id: id },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<GetCourseInfoQuery>>
  }
  static listDirectMessages(query: ListDirectMessagesQueryVariables) {
    return API.graphql({
      query: customQueries.listDirectMessagesForDms,
      variables: query,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<ListDirectMessagesQuery>>
  }
  static listDirectMessageUsers(query: ListDirectMessageUsersQueryVariables) {
    return API.graphql({
      query: customQueries.listDirectMessageUsers,
      variables: query,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<ListDirectMessageUsersQuery>>
  }
  static listCustomProfiles(query: ListCustomProfilesQueryVariables) {
    return API.graphql({
      query: queries.listCustomProfiles,
      variables: query,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<ListCustomProfilesQuery>>
  }
  static listDirectMessageUsersForDMs(query: ListDirectMessageUsersQueryVariables) {
    return API.graphql({
      query: customQueries.listDirectMessageUsersForDMS,
      variables: query,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<ListDirectMessageUsersQuery>>
  }
  static listCustomPricings(filter: ModelCustomPricingFilterInput | null) {
    return API.graphql({
      query: queries.listCustomPricings,
      variables: {
        limit: 100,
        filter: filter,
        nextToken: null,
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<ListCustomPricingsQuery>>
  }
  static paymentByUser(id: string) {
    return API.graphql({
      query: queries.paymentByUser,
      variables: { userID: id },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<PaymentByUserQuery>>
  }
  static searchGroups(filter: SearchableGroupFilterInput) {
    return API.graphql({
      query: queries.searchGroups,
      variables: { filter: filter },
    }) as Promise<GraphQLResult<SearchGroupsQuery>>
  }
  static getResourceRoot(id: string) {
    return API.graphql({
      query: customQueries.getResourceRoot,
      variables: { id: id },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<GetResourceRootQuery>>
  }
  static getOrgForImage(id: string) {
    return API.graphql({ query: customQueries.getOrgForImage, variables: { id: id } }) as Promise<
      GraphQLResult<GetOrganizationQuery>
    >
  }
  static getUserForProfile(id: string) {
    return API.graphql({
      query: customQueries.getUserForProfile,
      variables: { id: id },
    }) as Promise<GraphQLResult<GetUser2Query>>
  }
  static getOrganization(id: string) {
    return API.graphql({ query: queries.getOrganization, variables: { id: id } }) as Promise<
      GraphQLResult<GetOrganizationQuery>
    >
  }
  static getOrganizationCustom(id: string) {
    return API.graphql({ query: customQueries.getOrganization, variables: { id: id } }) as Promise<
      GraphQLResult<GetOrganizationQuery>
    >
  }
  static messagesByRoom(variables: MessagesByRoomQueryVariables) {
    return API.graphql({
      query: queries.messagesByRoom,
      variables: variables,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<MessagesByRoomQuery>>
  }
  static searchUsers(filter: SearchableUserFilterInput) {
    return API.graphql({
      query: queries.searchUsers,
      variables: {
        filter: filter,
        limit: 10,
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<SearchUsersQuery>>
  }
  static listDirectMessageRooms(variables: ListDirectMessageRoomsQueryVariables) {
    return API.graphql({
      query: customQueries.listDirectMessageRooms,
      variables: variables,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<ListDirectMessageRoomsQuery>>
  }
  static getProduct(id: string) {
    return API.graphql({
      query: queries.getProduct,
      variables: { id: id },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<GetProductQuery>>
  }
  static getPayment(id: string) {
    return API.graphql({
      query: queries.getPayment,
      variables: { id: id },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<GetPaymentQuery>>
  }
  static listResourceRoots(filter: ModelResourceRootFilterInput) {
    return API.graphql({
      query: queries.listResourceRoots,
      variables: {
        limit: 100,
        filter: filter,
        nextToken: null,
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<ListResourceRootsQuery>>
  }
  static listMenu(filter: ModelMenuFilterInput | null) {
    return API.graphql({
      query: customQueries.listMenus,
      variables: {
        limit: 100,
        filter: filter,
        nextToken: null,
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<ListMenusQuery>>
  }
  static listStartup(filter: ModelStartupFilterInput | null) {
    return API.graphql({
      query: queries.listStartups,
      variables: {
        limit: 100,
        filter: filter,
        nextToken: null,
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<ListStartupsQuery>>
  }
  static getDirectMessageUser(id: string) {
    return API.graphql({
      query: customQueries.getDirectMessageUser,
      variables: { id: id },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<GetDirectMessageUserQuery>>
  }
  static getDirectMessageRoom(id: string) {
    return API.graphql({
      query: queries.getDirectMessageRoom,
      variables: { id: id },
    }) as Promise<GraphQLResult<GetDirectMessageRoomQuery>>
  }
  static listPayments(filter: ModelPaymentFilterInput) {
    return API.graphql({
      query: queries.listPayments,
      variables: { filter: filter },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<ListPaymentsQuery>>
  }
  static getDirectMessage(id: string) {
    return API.graphql({
      query: queries.getDirectMessage,
      variables: {
        id: id,
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<GetDirectMessageQuery>>
  }
  static listProducts(filter: ModelProductFilterInput | null) {
    return API.graphql({
      query: queries.listProducts,
      variables: { filter: filter, limit: 50 },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<ListProductsQuery>>
  }
  static createStripeCustomer(input: CreateStripeCustomerMutationVariables) {
    return API.graphql({
      query: mutations.createStripeCustomer,
      variables: input,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<CreateStripeCustomerMutation>>
  }
  static createStripeCustomerAdmin(input: CreateStripeCustomerAdminMutationVariables) {
    return API.graphql({
      query: mutations.createStripeCustomerAdmin,
      variables: input,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<CreateStripeCustomerAdminMutation>>
  }

  static updateUser(input: UpdateUserInput) {
    return API.graphql({
      query: mutations.updateUser,
      variables: {
        input: input,
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<UpdateUserMutation>>
  }
  static updateUserNoData(input: UpdateUserInput) {
    return API.graphql({
      query: customMutations.updateUser,
      variables: {
        input: input,
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<UpdateUserMutation>>
  }
  static getGroupForItemPage(groupId: Group["id"]) {
    return API.graphql({
      query: customQueries.getGroupForProfile,
      variables: { id: groupId, messages: { sortDirection: "ASC" } },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<GetGroupQuery>>
  }

  static updateCustomPricing(input: UpdateCustomPricingInput) {
    return API.graphql({
      query: mutations.updateCustomPricing,
      variables: {
        input: input,
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<UpdateCustomPricingMutation>>
  }
  static updateCustomProfile(input: UpdateCustomProfileInput) {
    return API.graphql({
      query: mutations.updateCustomProfile,
      variables: {
        input: input,
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<UpdateCustomProfileMutation>>
  }
  static updateMenu(input: UpdateMenuInput) {
    return API.graphql({
      query: mutations.updateMenu,
      variables: {
        input: input,
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<UpdateMenuMutation>>
  }
  static updateStartup(input: UpdateStartupInput) {
    return API.graphql({
      query: mutations.updateStartup,
      variables: {
        input: input,
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<UpdateStartupMutation>>
  }
  static updateSubMenu(input: UpdateSubMenuInput) {
    return API.graphql({
      query: mutations.updateSubMenu,
      variables: {
        input: input,
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<UpdateSubMenuMutation>>
  }
  static getGroup(groupId: string) {
    return API.graphql({
      query: queries.getGroup,
      variables: { id: groupId, messages: { sortDirection: "ASC" } },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<GetGroupQuery>>
  }
  static getUser(userId: string) {
    return API.graphql({
      query: queries.getUser,
      variables: { id: userId },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<GetUserQuery>>
  }
  static listEvents(nextToken: string | null | undefined) {
    const z: ModelGroupFilterInput = {
      type: { eq: "event" },
    }
    return API.graphql({
      query: queries.listGroups,
      variables: {
        limit: 100,
        filter: z,
        nextToken: nextToken,
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<ListGroupsQuery>>
  }
  static listOrgs(nextToken: string | null | undefined) {
    return API.graphql({
      query: customQueries.listOrganizations,
      variables: {
        limit: 20,
        filter: { profileState: { eq: "Complete" } },
        nextToken: nextToken,
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<ListOrganizationsQuery>>
  }
  static courseTriadUserByUser(currentUser: string | null) {
    return API.graphql({
      query: queries.courseTriadUserByUser,
      variables: { userID: currentUser },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<CourseTriadUserByUserQuery>>
  }
  static getGroupForOwner(id: string) {
    return API.graphql({
      query: customQueries.getGroupForOwner,
      variables: { id: id },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<GetGroupQuery>>
  }
  static groupMemberByUser(currentUser: string | null, groupId: string | null | undefined) {
    return API.graphql({
      query: queries.groupMemberByUser,
      variables: { userID: currentUser, groupID: { eq: groupId } },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<GroupMemberByUserQuery>>
  }
  static getUserProfileGroups(
    user: string | null,
    nextToken: string | null | undefined,
    type = "group"
  ) {
    return API.graphql({
      query: customQueries.groupsJoinedByUser,
      variables: { userID: user, groupID: { beginsWith: `${type}-` }, nextToken },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<GroupMemberByUserQuery>>
  }
  static groupByTypeForMyGroups(
    type: string | InviteType | undefined,
    order: ModelSortDirection,
    nextToken: string | null | undefined
  ) {
    return API.graphql({
      query: customQueries.groupByTypeForMyGroups,
      variables: {
        limit: 20,
        sortDirection: order,
        type: type,
        nextToken: nextToken,
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<GroupByTypeQuery>>
  }
  static loadResources(nextToken: string | null | undefined) {
    return API.graphql({
      query: customQueries.resourcesForDirectory,
      variables: {
        limit: 10,
        type: "resource",
        nextToken: nextToken,
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<GroupByTypeQuery>>
  }
  static groupByTypeForProfile(
    type: string | InviteType | undefined,
    nextToken: string | null | undefined
  ) {
    return API.graphql({
      query: customQueries.groupByTypeForMyGroups,
      variables: {
        limit: 200,
        type: type,
        nextToken: nextToken,
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<GroupByTypeQuery>>
  }
  static eventBriteListEvents(params: object | undefined) {
    return API.graphql({
      query: queries.eventBriteListEvents,
      variables: params,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<EventBriteListEventsQuery>>
  }
  static eventBriteListTicketClasses(
    params: EventBriteListTicketClassesQueryVariables | undefined
  ) {
    return API.graphql({
      query: queries.eventBriteListTicketClasses,
      variables: params,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<EventBriteListTicketClassesQuery>>
  }
  static groupByTypeByTime(params: object | undefined) {
    return API.graphql({
      query: customQueries.groupByTypeByTime,
      variables: params,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<GroupByTypeByTimeQuery>>
  }
  static listUsersForProfile(
    userGroupType: UserGroupType,
    nextToken: string | null | undefined
  ): Promise<GraphQLResult<ListUsersQuery>> {
    let mainUserGroups
    if (userGroupType == UserGroupType.All)
      mainUserGroups = ["Inactive", "Partner", "Admin", "Friend", "OneStory", "Verified"]
    else if (userGroupType == UserGroupType.Friends)
      mainUserGroups = ["Admin", "Friend", "Verified"]
    else if (userGroupType == UserGroupType.OneStory)
      mainUserGroups = ["Admin", "OneStory", "Verified"]
    else mainUserGroups = ["Partner", "Admin"]
    const userGroupList = mainUserGroups?.map((i) => {
      return {
        mainUserGroup: {
          eq: i,
        } as ModelStringFilterInput | null | undefined,
      }
    })
    const query: ListUsersQueryVariables = {
      limit: 100,
      filter: { profileState: { eq: "Complete" }, or: userGroupList },
      nextToken: nextToken,
    }
    return API.graphql({
      query: customQueries.listUsersForProfiles,
      variables: query,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<ListUsersQuery>>
  }
  static listUsers(
    userGroupType: UserGroupType,
    nextToken: string | null | undefined
  ): Promise<GraphQLResult<ListUsersQuery>> {
    let mainUserGroups
    if (userGroupType == UserGroupType.All)
      mainUserGroups = ["Inactive", "Partner", "Admin", "Friend", "OneStory", "Verified"]
    else if (userGroupType == UserGroupType.Friends)
      mainUserGroups = ["Admin", "Friend", "Verified"]
    else if (userGroupType == UserGroupType.OneStory)
      mainUserGroups = ["Admin", "OneStory", "Verified"]
    else mainUserGroups = ["Partner", "Admin"]
    const userGroupList = mainUserGroups?.map((i) => {
      return {
        mainUserGroup: {
          eq: i,
        } as ModelStringFilterInput | null | undefined,
      }
    })
    const query: ListUsersQueryVariables = {
      limit: 100,
      filter: { profileState: { eq: "Complete" }, or: userGroupList },
      nextToken: nextToken,
    }
    return API.graphql({
      query: queries.listUsers,
      variables: query,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<ListUsersQuery>>
  }
}
