/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type ModelMenuFilterInput = {
  id?: ModelIDFilterInput | null
  order?: ModelIntFilterInput | null
  name?: ModelStringFilterInput | null
  action?: ModelStringFilterInput | null
  params?: ModelStringFilterInput | null
  readGroups?: ModelUserGroupTypeListFilterInput | null
  and?: Array<ModelMenuFilterInput | null> | null
  or?: Array<ModelMenuFilterInput | null> | null
  not?: ModelMenuFilterInput | null
}

export type ModelIDFilterInput = {
  ne?: string | null
  eq?: string | null
  le?: string | null
  lt?: string | null
  ge?: string | null
  gt?: string | null
  contains?: string | null
  notContains?: string | null
  between?: Array<string | null> | null
  beginsWith?: string | null
}

export type ModelIntFilterInput = {
  ne?: number | null
  eq?: number | null
  le?: number | null
  lt?: number | null
  ge?: number | null
  gt?: number | null
  between?: Array<number | null> | null
}

export type ModelStringFilterInput = {
  ne?: string | null
  eq?: string | null
  le?: string | null
  lt?: string | null
  ge?: string | null
  gt?: string | null
  contains?: string | null
  notContains?: string | null
  between?: Array<string | null> | null
  beginsWith?: string | null
}

export type ModelUserGroupTypeListFilterInput = {
  eq?: Array<UserGroupType | null> | null
  ne?: Array<UserGroupType | null> | null
  contains?: UserGroupType | null
  notContains?: UserGroupType | null
}

export enum UserGroupType {
  verifiedUsers = "verifiedUsers",
  admin = "admin",
  courseAdmin = "courseAdmin",
  courseCoach = "courseCoach",
  courseUser = "courseUser",
  friends = "friends",
  partners = "partners",
  subscriptionPartners = "subscriptionPartners",
  subscriptionkyearlyyears = "subscriptionkyearlyyears",
  subscriptionkykids = "subscriptionkykids",
  subscriptionkyyouth = "subscriptionkyyouth",
  subscriptionValid = "subscriptionValid",
  userpool = "userpool",
  legacyUserGroup1 = "legacyUserGroup1",
}

export type ModelMenuConnection = {
  __typename: "ModelMenuConnection"
  items?: Array<Menu | null>
  nextToken?: string | null
}

export type Menu = {
  __typename: "Menu"
  id?: string
  order?: number | null
  name?: string | null
  action?: string | null
  params?: string | null
  readGroups?: Array<UserGroupType | null> | null
  subItems?: ModelSubMenuConnection
  createdAt?: string
  updatedAt?: string
}

export type ModelSubMenuConnection = {
  __typename: "ModelSubMenuConnection"
  items?: Array<SubMenu | null>
  nextToken?: string | null
}

export type SubMenu = {
  __typename: "SubMenu"
  id?: string
  menuID?: string | null
  order?: number | null
  menu?: Menu
  name?: string | null
  action?: string | null
  params?: string | null
  readGroups?: Array<UserGroupType | null> | null
  createdAt?: string
  updatedAt?: string
}

export type ModelDirectMessageRoomFilterInput = {
  id?: ModelIDFilterInput | null
  name?: ModelStringFilterInput | null
  roomType?: ModelStringFilterInput | null
  and?: Array<ModelDirectMessageRoomFilterInput | null> | null
  or?: Array<ModelDirectMessageRoomFilterInput | null> | null
  not?: ModelDirectMessageRoomFilterInput | null
}

export type ModelDirectMessageRoomConnection = {
  __typename: "ModelDirectMessageRoomConnection"
  items?: Array<DirectMessageRoom | null>
  nextToken?: string | null
}

export type DirectMessageRoom = {
  __typename: "DirectMessageRoom"
  id?: string
  name?: string | null
  messageUsers?: ModelDirectMessageUserConnection
  directMessage?: ModelDirectMessageConnection
  roomType?: string | null
  createdAt?: string
  updatedAt?: string
}

export type ModelDirectMessageUserConnection = {
  __typename: "ModelDirectMessageUserConnection"
  items?: Array<DirectMessageUser | null>
  nextToken?: string | null
}

export type DirectMessageUser = {
  __typename: "DirectMessageUser"
  id?: string
  userName?: string | null
  userID?: string
  roomID?: string
  room?: DirectMessageRoom
  createdAt?: string
  updatedAt?: string
  user?: User
}

export type User = {
  __typename: "User"
  id?: string
  given_name?: string
  family_name?: string
  email?: string | null
  phone?: string | null
  owner?: string | null
  mainUserGroup?: string | null
  stripeCustomerID?: string | null
  stripeSubscriptionID?: string | null
  hasPaidState?: PaidState | null
  profileState?: string | null
  billingAddress?: Address
  location?: LatLong
  profileImage?: Image
  aboutMeShort?: string | null
  aboutMeLong?: string | null
  interests?: Array<string | null> | null
  currentRole?: string | null
  currentScope?: string | null
  personality?: string | null
  orgName?: string | null
  orgType?: string | null
  orgSize?: string | null
  denomination?: string | null
  pplServed?: string | null
  sundayAttendance?: string | null
  numberVolunteers?: string | null
  orgDescription?: string | null
  joined?: string | null
  primaryOrganization?: string | null
  organizations?: ModelOrganizationMemberConnection
  owns?: ModelGroupConnection
  groups?: ModelGroupMemberConnection
  messages?: ModelMessageConnection
  directMessages?: ModelDirectMessageConnection
  messageReplies?: ModelReplyConnection
  coachingTriad?: ModelCourseTriadCoachesConnection
  userTriad?: ModelCourseTriadUsersConnection
  courseInstructing?: ModelCourseInstructorsConnection
  courseBackOfficeStaff?: ModelCourseBackOfficeStaffConnection
  payments?: ModelPaymentConnection
  alertConfig?: AlertConfig
  createdAt?: string
  updatedAt?: string
}

export enum PaidState {
  Unknown = "Unknown",
  InProgress = "InProgress",
  NeedsPayment = "NeedsPayment",
  Success = "Success",
}

export type Address = {
  __typename: "Address"
  city?: string | null
  country?: string | null
  line1?: string | null
  line2?: string | null
  postal_code?: string | null
  state?: string | null
}

export type LatLong = {
  __typename: "LatLong"
  latitude?: string | null
  longitude?: string | null
  geocodeFull?: string | null
  geocodeCity?: string | null
  geocodeRegion?: string | null
  randomLatitude?: string | null
  randomLongitude?: string | null
}

export type Image = {
  __typename: "Image"
  userId?: string | null
  filenameSmall?: string | null
  filenameMedium?: string | null
  filenameLarge?: string | null
  filenameUpload?: string | null
}

export type ModelOrganizationMemberConnection = {
  __typename: "ModelOrganizationMemberConnection"
  items?: Array<OrganizationMember | null>
  nextToken?: string | null
}

export type OrganizationMember = {
  __typename: "OrganizationMember"
  id?: string
  userRole?: string
  userId?: string
  organizationId?: string
  organizationName?: string | null
  organization?: Organization
  createdAt?: string
  updatedAt?: string
  user?: User
}

export type Organization = {
  __typename: "Organization"
  id?: string
  orgName?: string
  adminEmail?: string | null
  phone?: string | null
  admins?: Array<string>
  superAdmin?: string
  hasPaidState?: string | null
  profileState?: string | null
  address?: string | null
  city?: string | null
  province?: string | null
  postalCode?: string | null
  country?: string | null
  location?: LatLong
  profileImage?: Image
  aboutMeShort?: string | null
  aboutMeLong?: string | null
  orgType?: string | null
  orgSize?: string | null
  denomination?: string | null
  pplServed?: string | null
  sundayAttendance?: string | null
  numberVolunteers?: string | null
  orgDescription?: string | null
  joined?: string | null
  parentOrganizationId?: string
  parentOrganization?: Organization
  subOrganizations?: ModelOrganizationConnection
  members?: ModelOrganizationMemberConnection
  ownsGroups?: ModelGroupConnection
  resource?: ModelResourceRootConnection
  createdAt?: string
  updatedAt?: string
}

export type ModelOrganizationConnection = {
  __typename: "ModelOrganizationConnection"
  items?: Array<Organization | null>
  nextToken?: string | null
}

export type ModelGroupConnection = {
  __typename: "ModelGroupConnection"
  items?: Array<Group | null>
  nextToken?: string | null
}

export type Group = {
  __typename: "Group"
  id?: string
  owner?: string
  readGroups?: Array<UserGroupType | null> | null
  ownerOrgID?: string
  ownerOrg?: Organization
  type?: string
  name?: string
  description?: string
  memberCount?: number | null
  members?: ModelGroupMemberConnection
  image?: string
  time?: string | null
  lastUpdated?: string | null
  location?: string | null
  locationLatLong?: LatLong
  length?: string | null
  effort?: string | null
  cost?: string | null
  promotionalText?: string | null
  messages?: ModelMessageConnection
  eventType?: string | null
  eventUrl?: string | null
  tz?: string | null
  isSponsored?: string | null
  createdAt?: string
  updatedAt?: string
  ownerUser?: User
}

export type ModelGroupMemberConnection = {
  __typename: "ModelGroupMemberConnection"
  items?: Array<GroupMember | null>
  nextToken?: string | null
}

export type GroupMember = {
  __typename: "GroupMember"
  id?: string
  groupID?: string | null
  userID?: string | null
  group?: Group
  createdAt?: string
  updatedAt?: string
  user?: User
}

export type ModelMessageConnection = {
  __typename: "ModelMessageConnection"
  items?: Array<Message | null>
  nextToken?: string | null
}

export type Message = {
  __typename: "Message"
  id?: string
  content?: string
  when?: string
  attachment?: string | null
  attachmentName?: string | null
  attachmentOwner?: string | null
  roomId?: string | null
  userId?: string | null
  postingAs?: string | null
  owner?: string | null
  room?: Group
  replies?: ModelReplyConnection
  createdAt?: string
  updatedAt?: string
  author?: User
}

export type ModelReplyConnection = {
  __typename: "ModelReplyConnection"
  items?: Array<Reply | null>
  nextToken?: string | null
}

export type Reply = {
  __typename: "Reply"
  id?: string
  content?: string
  when?: string
  attachment?: string | null
  attachmentName?: string | null
  attachmentOwner?: string | null
  userId?: string
  messageId?: string
  parentMessage?: Message
  roomId?: string | null
  parentReplyId?: string
  parentReply?: Reply
  subReplies?: ModelReplyConnection
  createdAt?: string
  updatedAt?: string
  author?: User
}

export type ModelResourceRootConnection = {
  __typename: "ModelResourceRootConnection"
  items?: Array<ResourceRoot | null>
  nextToken?: string | null
}

export type ResourceRoot = {
  __typename: "ResourceRoot"
  id?: string
  type?: string | null
  groupId?: string | null
  organizationId?: string
  owner?: string | null
  resources?: ModelResourceConnection
  organization?: Organization
  menuItems?: ModelResourceMenuItemConnection
  createdAt?: string
  updatedAt?: string
}

export type ModelResourceConnection = {
  __typename: "ModelResourceConnection"
  items?: Array<Resource | null>
  nextToken?: string | null
}

export type Resource = {
  __typename: "Resource"
  id?: string
  owner?: string | null
  type?: string | null
  order?: string | null
  title?: string | null
  subtitle?: string | null
  image?: Image
  description?: string | null
  whoIsThisFor?: string | null
  extendedDescription?: string | null
  readGroups?: Array<UserGroupType | null> | null
  details?: Array<ResourceDetail | null> | null
  series?: ModelResourceSeriesConnection
  resourceID?: string
  resourceRoot?: ResourceRoot
  createdAt?: string
  updatedAt?: string
}

export type ResourceDetail = {
  __typename: "ResourceDetail"
  type?: ResourceDetailType | null
  name?: string | null
  text?: string | null
  value?: string | null
  image?: Image
}

export enum ResourceDetailType {
  DefaultYoutube = "DefaultYoutube",
  Image = "Image",
  Button = "Button",
  Link = "Link",
}

export type ModelResourceSeriesConnection = {
  __typename: "ModelResourceSeriesConnection"
  items?: Array<ResourceSeries | null>
  nextToken?: string | null
}

export type ResourceSeries = {
  __typename: "ResourceSeries"
  id?: string
  owner?: string | null
  type?: string | null
  title?: string | null
  order?: number | null
  description?: string | null
  whoIsThisFor?: string | null
  imageFile?: Image
  category?: Array<string | null> | null
  status?: string | null
  details?: Array<ResourceDetail | null> | null
  episodes?: ModelResourceEpisodeConnection
  seriesID?: string
  parentResource?: Resource
  createdAt?: string
  updatedAt?: string
}

export type ModelResourceEpisodeConnection = {
  __typename: "ModelResourceEpisodeConnection"
  items?: Array<ResourceEpisode | null>
  nextToken?: string | null
}

export type ResourceEpisode = {
  __typename: "ResourceEpisode"
  id?: string
  owner?: string | null
  episodeNumber?: number | null
  type?: string | null
  title?: string | null
  description?: string | null
  imageFile?: Image
  whoIsThisFor?: string | null
  details?: Array<ResourceDetail | null> | null
  episodeID?: string
  parentSeries?: ResourceSeries
  createdAt?: string
  updatedAt?: string
}

export type ModelResourceMenuItemConnection = {
  __typename: "ModelResourceMenuItemConnection"
  items?: Array<ResourceMenuItem | null>
  nextToken?: string | null
}

export type ResourceMenuItem = {
  __typename: "ResourceMenuItem"
  id?: string
  owner?: string | null
  readGroups?: Array<UserGroupType | null> | null
  type?: ResourceMenuItemType | null
  menuTitle?: string | null
  order?: string | null
  depth?: string | null
  pageItems?: Array<ResourcePageItem | null> | null
  resourceRootID?: string
  resourceRoot?: ResourceRoot
  createdAt?: string
  updatedAt?: string
}

export enum ResourceMenuItemType {
  resource = "resource",
  menuItem = "menuItem",
  break = "break",
  schedule = "schedule",
  curriculum = "curriculum",
}

export type ResourcePageItem = {
  __typename: "ResourcePageItem"
  id?: string | null
  type?: ResourcePageItemType | null
  style?: ResourcePageItemStyle | null
  size?: string | null
  title1?: string | null
  title2?: string | null
  description1?: string | null
  description2?: string | null
  resourceID?: string | null
  seriesID?: string | null
  episodeID?: string | null
  color?: string | null
  image?: Image
  url?: string | null
  order?: number | null
  pageItemsLeft?: Array<ResourcePageItem | null> | null
  pageItemsRight?: Array<ResourcePageItem | null> | null
}

export enum ResourcePageItemType {
  Menu = "Menu",
  Header = "Header",
  RichText = "RichText",
  List = "List",
  Grid = "Grid",
  Column = "Column",
  Card = "Card",
  DropDownPicker = "DropDownPicker",
}

export enum ResourcePageItemStyle {
  MenuTop = "MenuTop",
  MenuLeft = "MenuLeft",
  Column3070 = "Column3070",
  Column7030 = "Column7030",
  Column5050 = "Column5050",
  CardManual = "CardManual",
  CardAuto = "CardAuto",
  CardLarge = "CardLarge",
  RichTextH1 = "RichTextH1",
  RichTextH2 = "RichTextH2",
  RichTextH3 = "RichTextH3",
  RichTextH4 = "RichTextH4",
  RichTextH5 = "RichTextH5",
  RichTextH6 = "RichTextH6",
  RichTextH1Small = "RichTextH1Small",
  RichTextH2Small = "RichTextH2Small",
  RichTextH3Small = "RichTextH3Small",
  RichTextH4Small = "RichTextH4Small",
  RichTextH5Small = "RichTextH5Small",
  RichTextH6Small = "RichTextH6Small",
  RichTextBody1 = "RichTextBody1",
  RichTextBody2 = "RichTextBody2",
  RichTextBody3 = "RichTextBody3",
  RichTextBody4 = "RichTextBody4",
  GridManual = "GridManual",
  GridAuto = "GridAuto",
  ListManual = "ListManual",
  ListAuto = "ListAuto",
}

export type ModelDirectMessageConnection = {
  __typename: "ModelDirectMessageConnection"
  items?: Array<DirectMessage | null>
  nextToken?: string | null
}

export type DirectMessage = {
  __typename: "DirectMessage"
  id?: string
  content?: string | null
  attachment?: string | null
  attachmentName?: string | null
  attachmentOwner?: string | null
  when?: string
  recipients?: Array<string | null>
  userId?: string
  replies?: ModelDirectMessageReplyConnection
  messageRoomID?: string
  messageRoom?: DirectMessageRoom
  createdAt?: string
  updatedAt?: string
  author?: User
}

export type ModelDirectMessageReplyConnection = {
  __typename: "ModelDirectMessageReplyConnection"
  items?: Array<DirectMessageReply | null>
  nextToken?: string | null
}

export type DirectMessageReply = {
  __typename: "DirectMessageReply"
  id?: string
  content?: string | null
  when?: string
  attachment?: string | null
  attachmentName?: string | null
  attachmentOwner?: string | null
  recipients?: Array<string | null>
  userId?: string
  messageId?: string
  parentMessage?: DirectMessage
  messageRoomID?: string | null
  parentReplyId?: string
  parentReply?: DirectMessageReply
  subReplies?: ModelDirectMessageReplyConnection
  createdAt?: string
  updatedAt?: string
  author?: User
}

export type ModelCourseTriadCoachesConnection = {
  __typename: "ModelCourseTriadCoachesConnection"
  items?: Array<CourseTriadCoaches | null>
  nextToken?: string | null
}

export type CourseTriadCoaches = {
  __typename: "CourseTriadCoaches"
  id?: string
  triadID?: string | null
  triad?: CourseTriads
  userID?: string | null
  createdAt?: string
  updatedAt?: string
  user?: User
}

export type CourseTriads = {
  __typename: "CourseTriads"
  id?: string
  courseInfoID?: string | null
  courseInfo?: CourseInfo
  coaches?: ModelCourseTriadCoachesConnection
  users?: ModelCourseTriadUsersConnection
  createdAt?: string
  updatedAt?: string
}

export type CourseInfo = {
  __typename: "CourseInfo"
  id?: string
  designedBy?: string | null
  summary?: string | null
  courseWeeks?: ModelCourseWeekConnection
  subTitle?: string | null
  instructors?: ModelCourseInstructorsConnection
  backOfficeStaff?: ModelCourseBackOfficeStaffConnection
  triads?: ModelCourseTriadsConnection
  introduction?: string | null
  sylabusAttachment?: string | null
  sylabusAttachmentName?: string | null
  sylabusAttachmentOwner?: string | null
  createdAt?: string
  updatedAt?: string
}

export type ModelCourseWeekConnection = {
  __typename: "ModelCourseWeekConnection"
  items?: Array<CourseWeek | null>
  nextToken?: string | null
}

export type CourseWeek = {
  __typename: "CourseWeek"
  id?: string
  week?: string | null
  date?: string | null
  tz?: string | null
  name?: string | null
  title?: string | null
  leader?: string | null
  courseInfoID?: string | null
  courseInfo?: CourseInfo
  lessons?: ModelCourseLessonConnection
  createdAt?: string
  updatedAt?: string
}

export type ModelCourseLessonConnection = {
  __typename: "ModelCourseLessonConnection"
  items?: Array<CourseLesson | null>
  nextToken?: string | null
}

export type CourseLesson = {
  __typename: "CourseLesson"
  id?: string
  lesson?: string | null
  lessonType?: string | null
  name?: string | null
  time?: string | null
  tz?: string | null
  duration?: string | null
  zoomUrl?: string | null
  zoomRecording?: string | null
  courseLessonResponseId?: string | null
  wordCount?: string | null
  description?: string | null
  courseWeekID?: string | null
  courseWeek?: CourseWeek
  createdAt?: string
  updatedAt?: string
}

export type ModelCourseInstructorsConnection = {
  __typename: "ModelCourseInstructorsConnection"
  items?: Array<CourseInstructors | null>
  nextToken?: string | null
}

export type CourseInstructors = {
  __typename: "CourseInstructors"
  id?: string
  courseInfoID?: string | null
  courseInfo?: CourseInfo
  userID?: string | null
  createdAt?: string
  updatedAt?: string
  user?: User
}

export type ModelCourseBackOfficeStaffConnection = {
  __typename: "ModelCourseBackOfficeStaffConnection"
  items?: Array<CourseBackOfficeStaff | null>
  nextToken?: string | null
}

export type CourseBackOfficeStaff = {
  __typename: "CourseBackOfficeStaff"
  id?: string
  courseInfoID?: string | null
  courseInfo?: CourseInfo
  userID?: string | null
  createdAt?: string
  updatedAt?: string
  user?: User
}

export type ModelCourseTriadsConnection = {
  __typename: "ModelCourseTriadsConnection"
  items?: Array<CourseTriads | null>
  nextToken?: string | null
}

export type ModelCourseTriadUsersConnection = {
  __typename: "ModelCourseTriadUsersConnection"
  items?: Array<CourseTriadUsers | null>
  nextToken?: string | null
}

export type CourseTriadUsers = {
  __typename: "CourseTriadUsers"
  id?: string
  triadID?: string | null
  triad?: CourseTriads
  userID?: string | null
  createdAt?: string
  updatedAt?: string
  user?: User
}

export type ModelPaymentConnection = {
  __typename: "ModelPaymentConnection"
  items?: Array<Payment | null>
  nextToken?: string | null
}

export type Payment = {
  __typename: "Payment"
  id?: string
  productID?: string | null
  product?: Product
  userID?: string | null
  dateCompleted?: string | null
  paymentType?: string | null
  paymentInfo?: string | null
  createdAt?: string
  updatedAt?: string
  user?: User
}

export type Product = {
  __typename: "Product"
  id?: string
  price?: number | null
  pricePer?: string | null
  name?: string | null
  description?: string | null
  confirmationMsg?: string | null
  payments?: ModelPaymentConnection
  isOrgTier?: string | null
  isIndividualTier?: string | null
  isLogin?: string | null
  marketingDescription?: string | null
  groupsIncluded?: Array<string | null> | null
  enabled?: string | null
  isStripe?: string | null
  isPaypal?: string | null
  tiered?: Array<TieredProduct | null> | null
  createdAt?: string
  updatedAt?: string
}

export type TieredProduct = {
  __typename: "TieredProduct"
  name?: string | null
  stripePaymentID?: string | null
  stripeIsTiered?: string | null
}

export type AlertConfig = {
  __typename: "AlertConfig"
  emailDirectMessage?: string | null
  emailGroupMessage?: string | null
  emailEventMessage?: string | null
  emailOrgMessage?: string | null
  emailResourceMessage?: string | null
  emailCourseMessage?: string | null
  emailPromotions?: string | null
}

export type ModelStringKeyConditionInput = {
  eq?: string | null
  le?: string | null
  lt?: string | null
  ge?: string | null
  gt?: string | null
  between?: Array<string | null> | null
  beginsWith?: string | null
}

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export type ModelActivityFilterInput = {
  id?: ModelIDFilterInput | null
  readUser?: ModelIDFilterInput | null
  ownerName?: ModelStringFilterInput | null
  ownerID?: ModelIDFilterInput | null
  activityGroupId?: ModelIDFilterInput | null
  activityGroupType?: ModelActivityGroupTypeFilterInput | null
  activityActionType?: ModelActivityActionTypeFilterInput | null
  time?: ModelStringFilterInput | null
  date?: ModelStringFilterInput | null
  expirationDate?: ModelIntFilterInput | null
  and?: Array<ModelActivityFilterInput | null> | null
  or?: Array<ModelActivityFilterInput | null> | null
  not?: ModelActivityFilterInput | null
}

export type ModelActivityGroupTypeFilterInput = {
  eq?: ActivityGroupType | null
  ne?: ActivityGroupType | null
}

export enum ActivityGroupType {
  courses = "courses",
}

export type ModelActivityActionTypeFilterInput = {
  eq?: ActivityActionType | null
  ne?: ActivityActionType | null
}

export enum ActivityActionType {
  courses_assignment_create = "courses_assignment_create",
  courses_assignment_submit = "courses_assignment_submit",
  courses_assignment_respond = "courses_assignment_respond",
  courses_lesson_create = "courses_lesson_create",
  courses_zoom_create = "courses_zoom_create",
  courses_respond_create = "courses_respond_create",
  courses_youtube_create = "courses_youtube_create",
}

export type ModelActivityConnection = {
  __typename: "ModelActivityConnection"
  items?: Array<Activity | null>
  nextToken?: string | null
}

export type Activity = {
  __typename: "Activity"
  id?: string
  readUser?: string
  ownerName?: string
  ownerID?: string
  activityGroupId?: string
  activityGroupType?: ActivityGroupType
  activityActionType?: ActivityActionType
  time?: string
  date?: string
  expirationDate?: number
  createdAt?: string
  updatedAt?: string
  owner?: User
}

export type ModelGroupFilterInput = {
  id?: ModelIDFilterInput | null
  owner?: ModelStringFilterInput | null
  readGroups?: ModelUserGroupTypeListFilterInput | null
  ownerOrgID?: ModelIDFilterInput | null
  type?: ModelStringFilterInput | null
  name?: ModelStringFilterInput | null
  description?: ModelStringFilterInput | null
  memberCount?: ModelIntFilterInput | null
  image?: ModelStringFilterInput | null
  time?: ModelStringFilterInput | null
  lastUpdated?: ModelStringFilterInput | null
  location?: ModelStringFilterInput | null
  length?: ModelStringFilterInput | null
  effort?: ModelStringFilterInput | null
  cost?: ModelStringFilterInput | null
  promotionalText?: ModelStringFilterInput | null
  eventType?: ModelStringFilterInput | null
  eventUrl?: ModelStringFilterInput | null
  tz?: ModelStringFilterInput | null
  isSponsored?: ModelStringFilterInput | null
  and?: Array<ModelGroupFilterInput | null> | null
  or?: Array<ModelGroupFilterInput | null> | null
  not?: ModelGroupFilterInput | null
}

export type ModelIDKeyConditionInput = {
  eq?: string | null
  le?: string | null
  lt?: string | null
  ge?: string | null
  gt?: string | null
  between?: Array<string | null> | null
  beginsWith?: string | null
}

export type ModelDirectMessageUserFilterInput = {
  id?: ModelIDFilterInput | null
  userName?: ModelStringFilterInput | null
  userID?: ModelIDFilterInput | null
  roomID?: ModelIDFilterInput | null
  and?: Array<ModelDirectMessageUserFilterInput | null> | null
  or?: Array<ModelDirectMessageUserFilterInput | null> | null
  not?: ModelDirectMessageUserFilterInput | null
}

export type ListMenusQueryVariables = {
  filter?: ModelMenuFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListMenusQuery = {
  listMenus?: {
    __typename: "ModelMenuConnection"
    items: Array<{
      __typename: "Menu"
      id: string
      name?: string | null
      action?: string | null
      order?: number | null
      readGroups?: Array<UserGroupType | null> | null
      params?: string | null
      subItems?: {
        __typename: "ModelSubMenuConnection"
        items: Array<{
          __typename: "SubMenu"
          id: string
          menuID?: string | null
          order?: number | null
          params?: string | null
          name?: string | null
          action?: string | null
          readGroups?: Array<UserGroupType | null> | null
          createdAt: string
          updatedAt: string
        } | null>
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null>
    nextToken?: string | null
  } | null
}

export type ListDirectMessageRoomsQueryVariables = {
  filter?: ModelDirectMessageRoomFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListDirectMessageRoomsQuery = {
  listDirectMessageRooms?: {
    __typename: "ModelDirectMessageRoomConnection"
    items: Array<{
      __typename: "DirectMessageRoom"
      id: string
      name?: string | null
      roomType?: string | null
      messageUsers?: {
        __typename: "ModelDirectMessageUserConnection"
        items: Array<{
          __typename: "DirectMessageUser"
          id: string
          userName?: string | null
          userID: string
          roomID: string
          createdAt: string
          updatedAt: string
        } | null>
        nextToken?: string | null
      } | null
      directMessage?: {
        __typename: "ModelDirectMessageConnection"
        items: Array<{
          __typename: "DirectMessage"
          id: string
          content?: string | null
          attachment?: string | null
          author?: {
            __typename: "User"
            id: string
            given_name: string
            family_name: string
            currentRole?: string | null
          } | null
          attachmentName?: string | null
          attachmentOwner?: string | null
          replies?: {
            __typename: "ModelDirectMessageReplyConnection"
            items: Array<{
              __typename: "DirectMessageReply"
              id: string
              author?: {
                __typename: "User"
                id: string
                given_name: string
                family_name: string
                currentRole?: string | null
              } | null
              content?: string | null
              createdAt: string
              updatedAt: string
            } | null>
          } | null
          when: string
          recipients: Array<string | null>
          userId: string
          messageRoomID: string
          createdAt: string
          updatedAt: string
        } | null>
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null>
    nextToken?: string | null
  } | null
}

export type ActivityByGroupQueryVariables = {
  readUser?: string | null
  time?: ModelStringKeyConditionInput | null
  sortDirection?: ModelSortDirection | null
  filter?: ModelActivityFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ActivityByGroupQuery = {
  activityByGroup?: {
    __typename: "ModelActivityConnection"
    items: Array<{
      __typename: "Activity"
      id: string
      readUser: string
      ownerName: string
      ownerID: string
      activityGroupId: string
      activityGroupType: ActivityGroupType
      activityActionType: ActivityActionType
      time: string
      date: string
      expirationDate: number
      createdAt: string
      updatedAt: string
    } | null>
  } | null
}

export type GetUser2QueryVariables = {
  id?: string
}

export type GetUser2Query = {
  getUser?: {
    __typename: "User"
    id: string
    given_name: string
    family_name: string
    email?: string | null
    phone?: string | null
    owner?: string | null
    mainUserGroup?: string | null
    hasPaidState?: PaidState | null
    profileState?: string | null
    billingAddress?: {
      __typename: "Address"
      city?: string | null
      country?: string | null
      line1?: string | null
      line2?: string | null
      postal_code?: string | null
      state?: string | null
    } | null
    location?: {
      __typename: "LatLong"
      latitude?: string | null
      longitude?: string | null
      geocodeFull?: string | null
      geocodeCity?: string | null
      geocodeRegion?: string | null
      randomLatitude?: string | null
      randomLongitude?: string | null
    } | null
    profileImage?: {
      __typename: "Image"
      userId?: string | null
      filenameSmall?: string | null
      filenameMedium?: string | null
      filenameLarge?: string | null
      filenameUpload?: string | null
    } | null
    aboutMeShort?: string | null
    aboutMeLong?: string | null
    interests?: Array<string | null> | null
    currentRole?: string | null
    currentScope?: string | null
    personality?: string | null
    orgName?: string | null
    orgType?: string | null
    orgSize?: string | null
    denomination?: string | null
    pplServed?: string | null
    sundayAttendance?: string | null
    numberVolunteers?: string | null
    orgDescription?: string | null
    joined?: string | null
    primaryOrganization?: string | null
    organizations?: {
      __typename: "ModelOrganizationMemberConnection"
      items: Array<{
        __typename: "OrganizationMember"
        id: string
        userRole: string
        userId: string
        organizationId: string
        organizationName?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    owns?: {
      __typename: "ModelGroupConnection"
      items: Array<{
        __typename: "Group"
        id: string
        owner: string
        ownerOrgID: string
        type: string
        name: string
        description: string
        memberCount?: number | null
        image: string
        time?: string | null
        lastUpdated?: string | null
        location?: string | null
        length?: string | null
        effort?: string | null
        cost?: string | null
        promotionalText?: string | null
        eventType?: string | null
        eventUrl?: string | null
        tz?: string | null
        isSponsored?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    groups?: {
      __typename: "ModelGroupMemberConnection"
      items: Array<{
        __typename: "GroupMember"
        id: string
        groupID?: string | null
        userID?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    alertConfig?: {
      __typename: "AlertConfig"
      emailDirectMessage?: string | null
      emailGroupMessage?: string | null
      emailEventMessage?: string | null
      emailOrgMessage?: string | null
      emailResourceMessage?: string | null
      emailCourseMessage?: string | null
      emailPromotions?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type GetCourseInfoQueryVariables = {
  id?: string
}

export type GetCourseInfoQuery = {
  getCourseInfo?: {
    __typename: "CourseInfo"
    id: string
    designedBy?: string | null
    summary?: string | null
    sylabusAttachmentName?: string | null
    sylabusAttachmentOwner?: string | null
    sylabusAttachment?: string | null
    courseWeeks?: {
      __typename: "ModelCourseWeekConnection"
      items: Array<{
        __typename: "CourseWeek"
        id: string
        week?: string | null
        date?: string | null
        tz?: string | null
        name?: string | null
        title?: string | null
        leader?: string | null
        lessons?: {
          __typename: "ModelCourseLessonConnection"
          items: Array<{
            __typename: "CourseLesson"
            id: string
            lesson?: string | null
            lessonType?: string | null
            name?: string | null
            time?: string | null
            tz?: string | null
            duration?: string | null
            createdAt: string
            updatedAt: string
          } | null>
          nextToken?: string | null
        } | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    subTitle?: string | null
    introduction?: string | null
    createdAt: string
    updatedAt: string
  } | null
}

export type GetDirectMessageQueryVariables = {
  id?: string
}

export type GetDirectMessageQuery = {
  getDirectMessage?: {
    __typename: "DirectMessage"
    id: string
    content?: string | null
    attachment?: string | null
    attachmentName?: string | null
    attachmentOwner?: string | null
    when: string
    recipients: Array<string | null>
    userId: string
    replies?: {
      __typename: "ModelDirectMessageReplyConnection"
      items: Array<{
        __typename: "DirectMessageReply"
        id: string
        content?: string | null
        when: string
        attachment?: string | null
        attachmentName?: string | null
        attachmentOwner?: string | null
        recipients: Array<string | null>
        userId: string
        messageId: string
        messageRoomID?: string | null
        parentReplyId: string
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    messageRoomID: string
    createdAt: string
    updatedAt: string
    author?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      currentRole?: string | null
    } | null
  } | null
}

export type GetDirectMessageUserQueryVariables = {
  id?: string
}

export type GetDirectMessageUserQuery = {
  getDirectMessageUser?: {
    __typename: "DirectMessageUser"
    id: string
    userID: string
    user?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      hasPaidState?: PaidState | null
      profileState?: string | null
      billingAddress?: {
        __typename: "Address"
        city?: string | null
        country?: string | null
        line1?: string | null
        line2?: string | null
        postal_code?: string | null
        state?: string | null
      } | null
      location?: {
        __typename: "LatLong"
        latitude?: string | null
        longitude?: string | null
        geocodeFull?: string | null
        geocodeCity?: string | null
        geocodeRegion?: string | null
      } | null
      profileImage?: {
        __typename: "Image"
        userId?: string | null
        filenameSmall?: string | null
        filenameMedium?: string | null
        filenameLarge?: string | null
        filenameUpload?: string | null
      } | null
      aboutMeShort?: string | null
      aboutMeLong?: string | null
      interests?: Array<string | null> | null
      currentRole?: string | null
      currentScope?: string | null
      personality?: string | null
      orgName?: string | null
      orgType?: string | null
      orgSize?: string | null
      orgDescription?: string | null
      joined?: string | null
      primaryOrganization?: string | null
      owns?: {
        __typename: "ModelGroupConnection"
        nextToken?: string | null
      } | null
      groups?: {
        __typename: "ModelGroupMemberConnection"
        nextToken?: string | null
      } | null
      messages?: {
        __typename: "ModelMessageConnection"
        nextToken?: string | null
      } | null
      directMessages?: {
        __typename: "ModelDirectMessageConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    roomID: string
    room?: {
      __typename: "DirectMessageRoom"
      id: string
      name?: string | null
      roomType?: string | null
      messageUsers?: {
        __typename: "ModelDirectMessageUserConnection"
        items: Array<{
          __typename: "DirectMessageUser"
          id: string
          userName?: string | null
          userID: string
          roomID: string
          createdAt: string
          updatedAt: string
        } | null>
        nextToken?: string | null
      } | null
      directMessage?: {
        __typename: "ModelDirectMessageConnection"
        items: Array<{
          __typename: "DirectMessage"
          id: string
          content?: string | null
          when: string
          messageRoomID: string
          createdAt: string
          updatedAt: string
        } | null>
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type GetGroupQueryVariables = {
  id?: string
}

export type GetGroupQuery = {
  getGroup?: {
    __typename: "Group"
    id: string
    owner: string
  } | null
}

export type GroupByTypeByTimeQueryVariables = {
  type?: string | null
  time?: ModelStringKeyConditionInput | null
  sortDirection?: ModelSortDirection | null
  filter?: ModelGroupFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type GroupByTypeByTimeQuery = {
  groupByTypeByTime?: {
    __typename: "ModelGroupConnection"
    items: Array<{
      __typename: "Group"
      id: string
      owner: string
      ownerUser?: {
        __typename: "User"
        id: string
        given_name: string
        family_name: string
      } | null
      type: string
      name: string
      readGroups?: Array<UserGroupType | null> | null
      description: string
      memberCount?: number | null
      image: string
      time?: string | null
      lastUpdated?: string | null
      location?: string | null
      locationLatLong?: {
        __typename: "LatLong"
        latitude?: string | null
        longitude?: string | null
        geocodeFull?: string | null
        geocodeCity?: string | null
        geocodeRegion?: string | null
      } | null
      length?: string | null
      effort?: string | null
      cost?: string | null
      eventType?: string | null
      eventUrl?: string | null
      tz?: string | null
      isSponsored?: string | null
      createdAt: string
      updatedAt: string
    } | null>
    nextToken?: string | null
  } | null
}

export type GroupByTypeQueryVariables = {
  type?: string | null
  id?: ModelIDKeyConditionInput | null
  sortDirection?: ModelSortDirection | null
  filter?: ModelGroupFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type GroupByTypeQuery = {
  groupByType?: {
    __typename: "ModelGroupConnection"
    items: Array<{
      __typename: "Group"
      id: string
      owner: string
      ownerUser?: {
        __typename: "User"
        id: string
        given_name: string
        family_name: string
      } | null
      type: string
      name: string
      readGroups?: Array<UserGroupType | null> | null
      description: string
      memberCount?: number | null
      image: string
      time?: string | null
      lastUpdated?: string | null
      location?: string | null
      locationLatLong?: {
        __typename: "LatLong"
        latitude?: string | null
        longitude?: string | null
        geocodeFull?: string | null
        geocodeCity?: string | null
        geocodeRegion?: string | null
      } | null
      length?: string | null
      effort?: string | null
      cost?: string | null
      eventType?: string | null
      eventUrl?: string | null
      tz?: string | null
      isSponsored?: string | null
      createdAt: string
      updatedAt: string
    } | null>
    nextToken?: string | null
  } | null
}

export type getOrganizationQueryVariables = {
  id?: string
}

export type getOrganizationQuery = {
  getOrganization?: {
    __typename: "Organization"
    id: string
    profileImage?: {
      __typename: "Image"
      userId?: string | null
      filenameSmall?: string | null
      filenameMedium?: string | null
      filenameLarge?: string | null
      filenameUpload?: string | null
    } | null
  } | null
}

export type GetUserQueryVariables = {
  id?: string
}

export type GetUserQuery = {
  getUser?: {
    __typename: "User"
    id: string
    given_name: string
    family_name: string
    owner?: string | null
    mainUserGroup?: string | null
    hasPaidState?: PaidState | null
    profileState?: string | null
    profileImage?: {
      __typename: "Image"
      userId?: string | null
      filenameSmall?: string | null
      filenameMedium?: string | null
      filenameLarge?: string | null
      filenameUpload?: string | null
    } | null
    aboutMeShort?: string | null
    currentRole?: string | null
    orgName?: string | null
    createdAt: string
    updatedAt: string
  } | null
}

export type ListDirectMessageUsersQueryVariables = {
  filter?: ModelDirectMessageUserFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListDirectMessageUsersQuery = {
  listDirectMessageUsers?: {
    __typename: "ModelDirectMessageUserConnection"
    items: Array<{
      __typename: "DirectMessageUser"
      id: string
      userID: string
      user?: {
        __typename: "User"
        id: string
        given_name: string
        family_name: string
        email?: string | null
        phone?: string | null
        owner?: string | null
        hasPaidState?: PaidState | null
        profileState?: string | null
        billingAddress?: {
          __typename: "Address"
          city?: string | null
          country?: string | null
          line1?: string | null
          line2?: string | null
          postal_code?: string | null
          state?: string | null
        } | null
        aboutMeShort?: string | null
        aboutMeLong?: string | null
        interests?: Array<string | null> | null
        currentRole?: string | null
        currentScope?: string | null
        personality?: string | null
        orgName?: string | null
        orgType?: string | null
        orgSize?: string | null
        orgDescription?: string | null
        joined?: string | null
        createdAt: string
        updatedAt: string
      } | null
      roomID: string
      room?: {
        __typename: "DirectMessageRoom"
        id: string
        name?: string | null
        roomType?: string | null
        messageUsers?: {
          __typename: "ModelDirectMessageUserConnection"
          items: Array<{
            __typename: "DirectMessageUser"
            id: string
            userName?: string | null
            userID: string
            roomID: string
            createdAt: string
            updatedAt: string
          } | null>
          nextToken?: string | null
        } | null
        directMessage?: {
          __typename: "ModelDirectMessageConnection"
          items: Array<{
            __typename: "DirectMessage"
            id: string
            content?: string | null
            when: string
            messageRoomID: string
            createdAt: string
            updatedAt: string
          } | null>
          nextToken?: string | null
        } | null
        createdAt: string
        updatedAt: string
      } | null
      createdAt: string
      updatedAt: string
    } | null>
    nextToken?: string | null
  } | null
}

export type GetResourceRootQueryVariables = {
  id?: string
}

export type GetResourceRootQuery = {
  getResourceRoot?: {
    __typename: "ResourceRoot"
    id: string
    type?: string | null
    groupId?: string | null
    menuItems?: {
      __typename: "ModelResourceMenuItemConnection"
      items: Array<{
        __typename: "ResourceMenuItem"
        id: string
        owner?: string | null
        type?: ResourceMenuItemType | null
        menuTitle?: string | null
        order?: string | null
        depth?: string | null
        readGroups?: Array<UserGroupType | null> | null
        resourceRootID: string
        pageItems?: Array<{
          __typename: "ResourcePageItem"
          id?: string | null
          type?: ResourcePageItemType | null
          style?: ResourcePageItemStyle | null
          size?: string | null
          title1?: string | null
          title2?: string | null
          description1?: string | null
          description2?: string | null
          color?: string | null
          resourceID?: string | null
          seriesID?: string | null
          episodeID?: string | null
          url?: string | null
          pageItemsLeft?: Array<{
            __typename: "ResourcePageItem"
            id?: string | null
            type?: ResourcePageItemType | null
            style?: ResourcePageItemStyle | null
            size?: string | null
            title1?: string | null
            title2?: string | null
            description1?: string | null
            description2?: string | null
            color?: string | null
            resourceID?: string | null
            seriesID?: string | null
            episodeID?: string | null
            url?: string | null
            pageItemsLeft?: Array<{
              __typename: "ResourcePageItem"
              id?: string | null
              type?: ResourcePageItemType | null
              style?: ResourcePageItemStyle | null
              size?: string | null
              title1?: string | null
              title2?: string | null
              description1?: string | null
              description2?: string | null
              color?: string | null
              resourceID?: string | null
              seriesID?: string | null
              episodeID?: string | null
              url?: string | null
              image?: {
                __typename: "Image"
                userId?: string | null
                filenameSmall?: string | null
                filenameMedium?: string | null
                filenameLarge?: string | null
                filenameUpload?: string | null
              } | null
            } | null> | null
            pageItemsRight?: Array<{
              __typename: "ResourcePageItem"
              id?: string | null
              type?: ResourcePageItemType | null
              style?: ResourcePageItemStyle | null
              size?: string | null
              title1?: string | null
              title2?: string | null
              description1?: string | null
              description2?: string | null
              color?: string | null
              resourceID?: string | null
              seriesID?: string | null
              episodeID?: string | null
              url?: string | null
              image?: {
                __typename: "Image"
                userId?: string | null
                filenameSmall?: string | null
                filenameMedium?: string | null
                filenameLarge?: string | null
                filenameUpload?: string | null
              } | null
            } | null> | null
            image?: {
              __typename: "Image"
              userId?: string | null
              filenameSmall?: string | null
              filenameMedium?: string | null
              filenameLarge?: string | null
              filenameUpload?: string | null
            } | null
          } | null> | null
          pageItemsRight?: Array<{
            __typename: "ResourcePageItem"
            id?: string | null
            type?: ResourcePageItemType | null
            style?: ResourcePageItemStyle | null
            size?: string | null
            title1?: string | null
            title2?: string | null
            description1?: string | null
            description2?: string | null
            color?: string | null
            resourceID?: string | null
            seriesID?: string | null
            episodeID?: string | null
            url?: string | null
            pageItemsLeft?: Array<{
              __typename: "ResourcePageItem"
              id?: string | null
              type?: ResourcePageItemType | null
              style?: ResourcePageItemStyle | null
              size?: string | null
              title1?: string | null
              title2?: string | null
              description1?: string | null
              description2?: string | null
              color?: string | null
              resourceID?: string | null
              seriesID?: string | null
              episodeID?: string | null
              url?: string | null
              image?: {
                __typename: "Image"
                userId?: string | null
                filenameSmall?: string | null
                filenameMedium?: string | null
                filenameLarge?: string | null
                filenameUpload?: string | null
              } | null
            } | null> | null
            pageItemsRight?: Array<{
              __typename: "ResourcePageItem"
              id?: string | null
              type?: ResourcePageItemType | null
              style?: ResourcePageItemStyle | null
              size?: string | null
              title1?: string | null
              title2?: string | null
              description1?: string | null
              description2?: string | null
              color?: string | null
              resourceID?: string | null
              seriesID?: string | null
              episodeID?: string | null
              url?: string | null
              image?: {
                __typename: "Image"
                userId?: string | null
                filenameSmall?: string | null
                filenameMedium?: string | null
                filenameLarge?: string | null
                filenameUpload?: string | null
              } | null
            } | null> | null
            image?: {
              __typename: "Image"
              userId?: string | null
              filenameSmall?: string | null
              filenameMedium?: string | null
              filenameLarge?: string | null
              filenameUpload?: string | null
            } | null
          } | null> | null
          image?: {
            __typename: "Image"
            userId?: string | null
            filenameSmall?: string | null
            filenameMedium?: string | null
            filenameLarge?: string | null
            filenameUpload?: string | null
          } | null
        } | null> | null
        createdAt: string
        updatedAt: string
      } | null>
    } | null
    resources?: {
      __typename: "ModelResourceConnection"
      items: Array<{
        __typename: "Resource"
        id: string
        type?: string | null
        details?: Array<{
          __typename: "ResourceDetail"
          type?: ResourceDetailType | null
          name?: string | null
          text?: string | null
          value?: string | null
          image?: {
            __typename: "Image"
            userId?: string | null
            filenameSmall?: string | null
            filenameMedium?: string | null
            filenameLarge?: string | null
            filenameUpload?: string | null
          } | null
        } | null> | null
        image?: {
          __typename: "Image"
          userId?: string | null
          filenameSmall?: string | null
          filenameMedium?: string | null
          filenameLarge?: string | null
          filenameUpload?: string | null
        } | null
        title?: string | null
        subtitle?: string | null
        description?: string | null
        extendedDescription?: string | null
        readGroups?: Array<UserGroupType | null> | null
        series?: {
          __typename: "ModelResourceSeriesConnection"
          items: Array<{
            __typename: "ResourceSeries"
            id: string
            type?: string | null
            title?: string | null
            description?: string | null
            imageFile?: {
              __typename: "Image"
              userId?: string | null
              filenameSmall?: string | null
              filenameMedium?: string | null
              filenameLarge?: string | null
              filenameUpload?: string | null
            } | null
            details?: Array<{
              __typename: "ResourceDetail"
              type?: ResourceDetailType | null
              name?: string | null
              text?: string | null
              value?: string | null
              image?: {
                __typename: "Image"
                userId?: string | null
                filenameSmall?: string | null
                filenameMedium?: string | null
                filenameLarge?: string | null
                filenameUpload?: string | null
              } | null
            } | null> | null
            category?: Array<string | null> | null
            status?: string | null
            episodes?: {
              __typename: "ModelResourceEpisodeConnection"
              items: Array<{
                __typename: "ResourceEpisode"
                id: string
                episodeNumber?: number | null
                type?: string | null
                title?: string | null
                description?: string | null
                details?: Array<{
                  __typename: "ResourceDetail"
                  type?: ResourceDetailType | null
                  name?: string | null
                  text?: string | null
                  value?: string | null
                  image?: {
                    __typename: "Image"
                    userId?: string | null
                    filenameSmall?: string | null
                    filenameMedium?: string | null
                    filenameLarge?: string | null
                    filenameUpload?: string | null
                  } | null
                } | null> | null
                episodeID: string
                createdAt: string
                updatedAt: string
              } | null>
              nextToken?: string | null
            } | null
            seriesID: string
            createdAt: string
            updatedAt: string
          } | null>
          nextToken?: string | null
        } | null
        resourceID: string
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}
