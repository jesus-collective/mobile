/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type batchCreateDirectMessageUsersInput = {
  userId: string
  userName: string
  roomId: string
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

export type StripePaymentIntent = {
  __typename: "StripePaymentIntent"
  id?: string | null
  client_secret?: string | null
  status?: string | null
}

export type StripeAddressInput = {
  city?: string | null
  country?: string | null
  line1?: string | null
  line2?: string | null
  postal_code?: string | null
  state?: string | null
}

export type StripeCustomerData = {
  __typename: "StripeCustomerData"
  customer?: StripeCustomer
}

export type StripeCustomer = {
  __typename: "StripeCustomer"
  id?: string | null
  object?: string | null
  address?: string | null
  balance?: string | null
  created?: string | null
  currency?: string | null
  default_source?: string | null
  delinquent?: string | null
  description?: string | null
  discount?: string | null
  email?: string | null
  invoice_prefix?: string | null
  invoice_settings?: StripeInvoiceSettings
  livemode?: string | null
  metadata?: string | null
  name?: string | null
  next_invoice_sequence?: string | null
  phone?: string | null
  preferred_locales?: string | null
  shipping?: string | null
  tax_exempt?: string | null
}

export type StripeInvoiceSettings = {
  __typename: "StripeInvoiceSettings"
  custom_fields?: string | null
  default_payment_method?: string | null
  footer?: string | null
}

export type StripePriceInput = {
  prices?: Array<StripePriceDetail | null> | null
  coupon?: string | null
}

export type StripePriceDetail = {
  price?: string | null
  quantity?: number | null
}

export type StripeSubscriptionData = {
  __typename: "StripeSubscriptionData"
  subscription?: StripeSubscription
}

export type StripeSubscription = {
  __typename: "StripeSubscription"
  id?: string | null
  object?: string | null
  application_fee_percent?: string | null
  billing_cycle_anchor?: string | null
  billing_thresholds?: string | null
  cancel_at?: string | null
  cancel_at_period_end?: string | null
  canceled_at?: string | null
  collection_method?: string | null
  created?: string | null
  current_period_end?: string | null
  current_period_start?: string | null
  customer?: string | null
  days_until_due?: string | null
  default_payment_method?: string | null
  default_source?: string | null
  default_tax_rates?: Array<string | null> | null
  discount?: string | null
  ended_at?: string | null
  items?: StripeSubscriptionItems
  latest_invoice?: StripeInvoice
  livemode?: string | null
  metadata?: string | null
  next_pending_invoice_item_invoice?: string | null
  pause_collection?: string | null
  pending_invoice_item_interval?: string | null
  pending_setup_intent?: string | null
  pending_update?: string | null
  schedule?: string | null
  start_date?: string | null
  status?: string | null
  transfer_data?: string | null
  trial_end?: string | null
  trial_start?: string | null
}

export type StripeSubscriptionItems = {
  __typename: "StripeSubscriptionItems"
  object?: string | null
  data?: Array<StripeSubscriptionItemData | null> | null
  has_more?: string | null
  url?: string | null
}

export type StripeSubscriptionItemData = {
  __typename: "StripeSubscriptionItemData"
  id?: string | null
  object?: string | null
  billing_thresholds?: string | null
  created?: string | null
  metadata?: string | null
  price?: StripePrice
  quantity?: string | null
  subscription?: string | null
  tax_rates?: string | null
}

export type StripePrice = {
  __typename: "StripePrice"
  id?: string | null
  object?: string | null
  active?: string | null
  billing_scheme?: string | null
  created?: string | null
  currency?: string | null
  livemode?: string | null
  lookup_key?: string | null
  metadata?: string | null
  nickname?: string | null
  product?: string | null
  recurring?: StripeRecurring
  tiers_mode?: string | null
  transform_quantity?: string | null
  type?: string | null
  unit_amount?: string | null
  unit_amount_decimal?: string | null
}

export type StripeRecurring = {
  __typename: "StripeRecurring"
  aggregate_usage?: string | null
  interval?: string | null
  interval_count?: string | null
  usage_type?: string | null
}

export type StripeInvoice = {
  __typename: "StripeInvoice"
  id?: string | null
  object?: string | null
  account_country?: string | null
  account_name?: string | null
  account_tax_ids?: string | null
  amount_due?: string | null
  amount_paid?: string | null
  amount_remaining?: string | null
  application_fee_amount?: string | null
  attempt_count?: string | null
  attempted?: string | null
  auto_advance?: string | null
  billing_reason?: string | null
  charge?: string | null
  collection_method?: string | null
  created?: string | null
  currency?: string | null
  custom_fields?: string | null
  customer?: string | null
  customer_address?: StripeAddress
  customer_email?: string | null
  customer_name?: string | null
  customer_phone?: string | null
  customer_shipping?: string | null
  customer_tax_exempt?: string | null
  customer_tax_ids?: Array<string | null> | null
  default_payment_method?: string | null
  default_source?: string | null
  default_tax_rates?: Array<string | null> | null
  description?: string | null
  discount?: string | null
  discounts?: Array<string | null> | null
  due_date?: string | null
  ending_balance?: string | null
  footer?: string | null
  hosted_invoice_url?: string | null
  invoice_pdf?: string | null
  last_finalization_error?: string | null
  lines?: StripeLines
  livemode?: string | null
  metadata?: string | null
  next_payment_attempt?: string | null
  number?: string | null
  paid?: string | null
  payment_intent?: string | null
  period_end?: string | null
  period_start?: string | null
  post_payment_credit_notes_amount?: string | null
  pre_payment_credit_notes_amount?: string | null
  receipt_number?: string | null
  starting_balance?: string | null
  statement_descriptor?: string | null
  status?: string | null
  status_transitions?: StripeTransition
  subscription?: string | null
  subtotal?: string | null
  tax?: string | null
  total?: string | null
  total_discount_amounts?: Array<string | null> | null
  total_tax_amounts?: Array<string | null> | null
  transfer_data?: string | null
  webhooks_delivered_at?: string | null
}

export type StripeAddress = {
  __typename: "StripeAddress"
  city?: string | null
  country?: string | null
  line1?: string | null
  line2?: string | null
  postal_code?: string | null
  state?: string | null
}

export type StripeLines = {
  __typename: "StripeLines"
  data?: Array<StripeLineData | null> | null
  has_more?: string | null
  object?: string | null
  url?: string | null
}

export type StripeLineData = {
  __typename: "StripeLineData"
  id?: string | null
  object?: string | null
  amount?: string | null
  currency?: string | null
  description?: string | null
  discount_amounts?: Array<string | null> | null
  discountable?: string | null
  discounts?: Array<string | null> | null
  livemode?: string | null
  metadata?: string | null
  period?: StripePeriod
  price?: StripePrice
  proration?: string | null
  quantity?: string | null
  subscription?: string | null
  subscription_item?: string | null
  tax_amounts?: Array<string | null> | null
  tax_rates?: Array<string | null> | null
  type?: string | null
}

export type StripePeriod = {
  __typename: "StripePeriod"
  end?: string | null
  start?: string | null
}

export type StripeTransition = {
  __typename: "StripeTransition"
  finalized_at?: string | null
  marked_uncollectible_at?: string | null
  paid_at?: string | null
  voided_at?: string | null
}

export type StripeInvoiceData = {
  __typename: "StripeInvoiceData"
  invoice?: StripeInvoice
}

export type StripeInvoicesListData = {
  __typename: "StripeInvoicesListData"
  data?: Array<StripeInvoice | null> | null
}

export type sendHelpResponse = {
  __typename: "sendHelpResponse"
  err?: string | null
  data?: string | null
}

export type CreateApplicationProcessInput = {
  id?: string | null
}

export type ApplicationProcess = {
  __typename: "ApplicationProcess"
  id?: string
  createdAt?: string
  updatedAt?: string
}

export type UpdateApplicationProcessInput = {
  id: string
}

export type DeleteApplicationProcessInput = {
  id: string
}

export type CreateUserInput = {
  id?: string | null
  given_name: string
  family_name: string
  email?: string | null
  phone?: string | null
  owner?: string | null
  mainUserGroup?: string | null
  stripeCustomerID?: string | null
  stripeSubscriptionID?: string | null
  hasPaidState?: PaidState | null
  profileState?: string | null
  billingAddress?: AddressInput | null
  location?: LatLongInput | null
  profileImage?: ImageInput | null
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
  alertConfig?: AlertConfigInput | null
}

export type AddressInput = {
  city?: string | null
  country?: string | null
  line1?: string | null
  line2?: string | null
  postal_code?: string | null
  state?: string | null
}

export type LatLongInput = {
  latitude?: string | null
  longitude?: string | null
  geocodeFull?: string | null
  geocodeCity?: string | null
  geocodeRegion?: string | null
  randomLatitude?: string | null
  randomLongitude?: string | null
}

export type ImageInput = {
  userId?: string | null
  filenameSmall?: string | null
  filenameMedium?: string | null
  filenameLarge?: string | null
  filenameUpload?: string | null
}

export type AlertConfigInput = {
  emailDirectMessage?: string | null
  emailGroupMessage?: string | null
  emailEventMessage?: string | null
  emailOrgMessage?: string | null
  emailResourceMessage?: string | null
  emailCourseMessage?: string | null
  emailPromotions?: string | null
}

export type UpdateUserInput = {
  id: string
  given_name?: string | null
  family_name?: string | null
  email?: string | null
  phone?: string | null
  owner?: string | null
  mainUserGroup?: string | null
  stripeCustomerID?: string | null
  stripeSubscriptionID?: string | null
  hasPaidState?: PaidState | null
  profileState?: string | null
  billingAddress?: AddressInput | null
  location?: LatLongInput | null
  profileImage?: ImageInput | null
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
  alertConfig?: AlertConfigInput | null
}

export type DeleteUserInput = {
  id: string
}

export type CreateGroupMemberInput = {
  id?: string | null
  groupID?: string | null
  userID?: string | null
}

export type UpdateGroupMemberInput = {
  id: string
  groupID?: string | null
  userID?: string | null
}

export type DeleteGroupMemberInput = {
  id: string
}

export type CreateGroupInput = {
  id?: string | null
  owner: string
  readGroups?: Array<UserGroupType | null> | null
  ownerOrgID: string
  type: string
  name: string
  description: string
  memberCount?: number | null
  image: string
  time?: string | null
  lastUpdated?: string | null
  location?: string | null
  locationLatLong?: LatLongInput | null
  length?: string | null
  effort?: string | null
  cost?: string | null
  promotionalText?: string | null
  eventType?: string | null
  eventUrl?: string | null
  tz?: string | null
  isSponsored?: string | null
}

export type UpdateGroupInput = {
  id: string
  owner?: string | null
  readGroups?: Array<UserGroupType | null> | null
  ownerOrgID?: string | null
  type?: string | null
  name?: string | null
  description?: string | null
  memberCount?: number | null
  image?: string | null
  time?: string | null
  lastUpdated?: string | null
  location?: string | null
  locationLatLong?: LatLongInput | null
  length?: string | null
  effort?: string | null
  cost?: string | null
  promotionalText?: string | null
  eventType?: string | null
  eventUrl?: string | null
  tz?: string | null
  isSponsored?: string | null
}

export type DeleteGroupInput = {
  id: string
}

export type CreateOrganizationMemberInput = {
  id?: string | null
  userRole: string
  userId: string
  organizationId: string
  organizationName?: string | null
}

export type UpdateOrganizationMemberInput = {
  id: string
  userRole?: string | null
  userId?: string | null
  organizationId?: string | null
  organizationName?: string | null
}

export type DeleteOrganizationMemberInput = {
  id: string
}

export type CreateOrganizationInput = {
  id?: string | null
  orgName: string
  adminEmail?: string | null
  phone?: string | null
  admins: Array<string>
  superAdmin: string
  hasPaidState?: string | null
  profileState?: string | null
  address?: string | null
  city?: string | null
  province?: string | null
  postalCode?: string | null
  country?: string | null
  location?: LatLongInput | null
  profileImage?: ImageInput | null
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
  parentOrganizationId: string
}

export type UpdateOrganizationInput = {
  id: string
  orgName?: string | null
  adminEmail?: string | null
  phone?: string | null
  admins?: Array<string> | null
  superAdmin?: string | null
  hasPaidState?: string | null
  profileState?: string | null
  address?: string | null
  city?: string | null
  province?: string | null
  postalCode?: string | null
  country?: string | null
  location?: LatLongInput | null
  profileImage?: ImageInput | null
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
  parentOrganizationId?: string | null
}

export type DeleteOrganizationInput = {
  id: string
}

export type CreateActivityInput = {
  id?: string | null
  readUser: string
  ownerName: string
  ownerID: string
  activityGroupId: string
  activityGroupType: ActivityGroupType
  activityActionType: ActivityActionType
  time: string
  date: string
  expirationDate: number
}

export enum ActivityGroupType {
  courses = "courses",
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

export type UpdateActivityInput = {
  id: string
  readUser?: string | null
  ownerName?: string | null
  ownerID?: string | null
  activityGroupId?: string | null
  activityGroupType?: ActivityGroupType | null
  activityActionType?: ActivityActionType | null
  time?: string | null
  date?: string | null
  expirationDate?: number | null
}

export type DeleteActivityInput = {
  id: string
}

export type CreatePaymentInput = {
  id?: string | null
  productID?: string | null
  userID?: string | null
  dateCompleted?: string | null
  paymentType?: string | null
  paymentInfo?: string | null
}

export type UpdatePaymentInput = {
  id: string
  productID?: string | null
  userID?: string | null
  dateCompleted?: string | null
  paymentType?: string | null
  paymentInfo?: string | null
}

export type DeletePaymentInput = {
  id: string
}

export type CreateCourseInfoInput = {
  id?: string | null
  designedBy?: string | null
  summary?: string | null
  subTitle?: string | null
  introduction?: string | null
  sylabusAttachment?: string | null
  sylabusAttachmentName?: string | null
  sylabusAttachmentOwner?: string | null
}

export type UpdateCourseInfoInput = {
  id: string
  designedBy?: string | null
  summary?: string | null
  subTitle?: string | null
  introduction?: string | null
  sylabusAttachment?: string | null
  sylabusAttachmentName?: string | null
  sylabusAttachmentOwner?: string | null
}

export type DeleteCourseInfoInput = {
  id: string
}

export type CreateCourseTriadsInput = {
  id?: string | null
  courseInfoID?: string | null
}

export type UpdateCourseTriadsInput = {
  id: string
  courseInfoID?: string | null
}

export type DeleteCourseTriadsInput = {
  id: string
}

export type CreateCourseBackOfficeStaffInput = {
  id?: string | null
  courseInfoID?: string | null
  userID?: string | null
}

export type UpdateCourseBackOfficeStaffInput = {
  id: string
  courseInfoID?: string | null
  userID?: string | null
}

export type DeleteCourseBackOfficeStaffInput = {
  id: string
}

export type CreateCourseInstructorsInput = {
  id?: string | null
  courseInfoID?: string | null
  userID?: string | null
}

export type UpdateCourseInstructorsInput = {
  id: string
  courseInfoID?: string | null
  userID?: string | null
}

export type DeleteCourseInstructorsInput = {
  id: string
}

export type CreateCourseTriadCoachesInput = {
  id?: string | null
  triadID?: string | null
  userID?: string | null
}

export type UpdateCourseTriadCoachesInput = {
  id: string
  triadID?: string | null
  userID?: string | null
}

export type DeleteCourseTriadCoachesInput = {
  id: string
}

export type CreateCourseTriadUsersInput = {
  id?: string | null
  triadID?: string | null
  userID?: string | null
}

export type UpdateCourseTriadUsersInput = {
  id: string
  triadID?: string | null
  userID?: string | null
}

export type DeleteCourseTriadUsersInput = {
  id: string
}

export type CreateCourseWeekInput = {
  id?: string | null
  week?: string | null
  date?: string | null
  tz?: string | null
  name?: string | null
  title?: string | null
  leader?: string | null
  courseInfoID?: string | null
}

export type UpdateCourseWeekInput = {
  id: string
  week?: string | null
  date?: string | null
  tz?: string | null
  name?: string | null
  title?: string | null
  leader?: string | null
  courseInfoID?: string | null
}

export type DeleteCourseWeekInput = {
  id: string
}

export type CreateCourseLessonInput = {
  id?: string | null
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
}

export type UpdateCourseLessonInput = {
  id: string
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
}

export type DeleteCourseLessonInput = {
  id: string
}

export type CreateDirectMessageUserInput = {
  id?: string | null
  userName?: string | null
  userID: string
  roomID: string
}

export type UpdateDirectMessageUserInput = {
  id: string
  userName?: string | null
  userID?: string | null
  roomID?: string | null
}

export type DeleteDirectMessageUserInput = {
  id: string
}

export type CreateDirectMessageRoomInput = {
  id?: string | null
  name?: string | null
  roomType?: string | null
}

export type UpdateDirectMessageRoomInput = {
  id: string
  name?: string | null
  roomType?: string | null
}

export type DeleteDirectMessageRoomInput = {
  id: string
}

export type CreateDirectMessageInput = {
  id?: string | null
  content?: string | null
  attachment?: string | null
  attachmentName?: string | null
  attachmentOwner?: string | null
  when: string
  recipients: Array<string | null>
  userId: string
  messageRoomID: string
}

export type UpdateDirectMessageInput = {
  id: string
  content?: string | null
  attachment?: string | null
  attachmentName?: string | null
  attachmentOwner?: string | null
  when?: string | null
  recipients?: Array<string | null> | null
  userId?: string | null
  messageRoomID?: string | null
}

export type DeleteDirectMessageInput = {
  id: string
}

export type CreateDirectMessageReplyInput = {
  id?: string | null
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
}

export type UpdateDirectMessageReplyInput = {
  id: string
  content?: string | null
  when?: string | null
  attachment?: string | null
  attachmentName?: string | null
  attachmentOwner?: string | null
  recipients?: Array<string | null> | null
  userId?: string | null
  messageId?: string | null
  messageRoomID?: string | null
  parentReplyId?: string | null
}

export type DeleteDirectMessageReplyInput = {
  id: string
}

export type CreateCRMRootInput = {
  id?: string | null
}

export type CRMRoot = {
  __typename: "CRMRoot"
  id?: string
  messages?: ModelCRMMessageConnection
  createdAt?: string
  updatedAt?: string
}

export type ModelCRMMessageConnection = {
  __typename: "ModelCRMMessageConnection"
  items?: Array<CRMMessage | null>
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
  attachmentOwner?: string | null
  thread?: ModelCRMReplyConnection
  createdAt?: string
  updatedAt?: string
}

export type ModelCRMReplyConnection = {
  __typename: "ModelCRMReplyConnection"
  items?: Array<CRMReply | null>
  nextToken?: string | null
}

export type CRMReply = {
  __typename: "CRMReply"
  id?: string
  rootId?: string
  content?: string
  when?: string
  authorName?: string
  authorId?: string
  attachment?: string | null
  attachmentOwner?: string | null
  parentId?: string
  parent?: CRMMessage
  createdAt?: string
  updatedAt?: string
}

export type UpdateCRMRootInput = {
  id: string
}

export type DeleteCRMRootInput = {
  id: string
}

export type CreateCRMMessageInput = {
  id?: string | null
  rootId: string
  content: string
  when: string
  authorName: string
  authorId: string
  attachment?: string | null
  attachmentOwner?: string | null
}

export type UpdateCRMMessageInput = {
  id: string
  rootId?: string | null
  content?: string | null
  when?: string | null
  authorName?: string | null
  authorId?: string | null
  attachment?: string | null
  attachmentOwner?: string | null
}

export type DeleteCRMMessageInput = {
  id: string
}

export type CreateCRMReplyInput = {
  id?: string | null
  rootId: string
  content: string
  when: string
  authorName: string
  authorId: string
  attachment?: string | null
  attachmentOwner?: string | null
  parentId: string
}

export type UpdateCRMReplyInput = {
  id: string
  rootId?: string | null
  content?: string | null
  when?: string | null
  authorName?: string | null
  authorId?: string | null
  attachment?: string | null
  attachmentOwner?: string | null
  parentId?: string | null
}

export type DeleteCRMReplyInput = {
  id: string
}

export type CreateMessageInput = {
  id?: string | null
  content: string
  when: string
  attachment?: string | null
  attachmentName?: string | null
  attachmentOwner?: string | null
  roomId?: string | null
  userId?: string | null
  postingAs?: string | null
  owner?: string | null
}

export type UpdateMessageInput = {
  id: string
  content?: string | null
  when?: string | null
  attachment?: string | null
  attachmentName?: string | null
  attachmentOwner?: string | null
  roomId?: string | null
  userId?: string | null
  postingAs?: string | null
  owner?: string | null
}

export type DeleteMessageInput = {
  id: string
}

export type CreateReplyInput = {
  id?: string | null
  content: string
  when: string
  attachment?: string | null
  attachmentName?: string | null
  attachmentOwner?: string | null
  userId: string
  messageId: string
  roomId?: string | null
  parentReplyId: string
}

export type UpdateReplyInput = {
  id: string
  content?: string | null
  when?: string | null
  attachment?: string | null
  attachmentName?: string | null
  attachmentOwner?: string | null
  userId?: string | null
  messageId?: string | null
  roomId?: string | null
  parentReplyId?: string | null
}

export type DeleteReplyInput = {
  id: string
}

export type CreateResourceRootInput = {
  id?: string | null
  type?: string | null
  groupId?: string | null
  organizationId: string
  owner?: string | null
}

export type UpdateResourceRootInput = {
  id: string
  type?: string | null
  groupId?: string | null
  organizationId?: string | null
  owner?: string | null
}

export type DeleteResourceRootInput = {
  id: string
}

export type CreateResourceMenuItemInput = {
  id?: string | null
  owner?: string | null
  readGroups?: Array<UserGroupType | null> | null
  type?: ResourceMenuItemType | null
  menuTitle?: string | null
  order?: string | null
  depth?: string | null
  pageItems?: Array<ResourcePageItemInput | null> | null
  resourceRootID: string
}

export type ResourcePageItemInput = {
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
  image?: ImageInput | null
  url?: string | null
  order?: number | null
  pageItemsLeft?: Array<ResourcePageItemInput | null> | null
  pageItemsRight?: Array<ResourcePageItemInput | null> | null
}

export type UpdateResourceMenuItemInput = {
  id: string
  owner?: string | null
  readGroups?: Array<UserGroupType | null> | null
  type?: ResourceMenuItemType | null
  menuTitle?: string | null
  order?: string | null
  depth?: string | null
  pageItems?: Array<ResourcePageItemInput | null> | null
  resourceRootID?: string | null
}

export type DeleteResourceMenuItemInput = {
  id: string
}

export type CreateResourceInput = {
  id?: string | null
  owner?: string | null
  type?: string | null
  order?: string | null
  title?: string | null
  subtitle?: string | null
  image?: ImageInput | null
  description?: string | null
  whoIsThisFor?: string | null
  extendedDescription?: string | null
  readGroups?: Array<UserGroupType | null> | null
  details?: Array<ResourceDetailInput | null> | null
  resourceID: string
}

export type ResourceDetailInput = {
  type?: ResourceDetailType | null
  name?: string | null
  text?: string | null
  value?: string | null
  image?: ImageInput | null
}

export type UpdateResourceInput = {
  id: string
  owner?: string | null
  type?: string | null
  order?: string | null
  title?: string | null
  subtitle?: string | null
  image?: ImageInput | null
  description?: string | null
  whoIsThisFor?: string | null
  extendedDescription?: string | null
  readGroups?: Array<UserGroupType | null> | null
  details?: Array<ResourceDetailInput | null> | null
  resourceID?: string | null
}

export type DeleteResourceInput = {
  id: string
}

export type CreateResourceSeriesInput = {
  id?: string | null
  owner?: string | null
  type?: string | null
  title?: string | null
  order?: number | null
  description?: string | null
  whoIsThisFor?: string | null
  imageFile?: ImageInput | null
  category?: Array<string | null> | null
  status?: string | null
  details?: Array<ResourceDetailInput | null> | null
  seriesID: string
}

export type UpdateResourceSeriesInput = {
  id: string
  owner?: string | null
  type?: string | null
  title?: string | null
  order?: number | null
  description?: string | null
  whoIsThisFor?: string | null
  imageFile?: ImageInput | null
  category?: Array<string | null> | null
  status?: string | null
  details?: Array<ResourceDetailInput | null> | null
  seriesID?: string | null
}

export type DeleteResourceSeriesInput = {
  id: string
}

export type CreateResourceEpisodeInput = {
  id?: string | null
  owner?: string | null
  episodeNumber?: number | null
  type?: string | null
  title?: string | null
  description?: string | null
  imageFile?: ImageInput | null
  whoIsThisFor?: string | null
  details?: Array<ResourceDetailInput | null> | null
  episodeID: string
}

export type UpdateResourceEpisodeInput = {
  id: string
  owner?: string | null
  episodeNumber?: number | null
  type?: string | null
  title?: string | null
  description?: string | null
  imageFile?: ImageInput | null
  whoIsThisFor?: string | null
  details?: Array<ResourceDetailInput | null> | null
  episodeID?: string | null
}

export type DeleteResourceEpisodeInput = {
  id: string
}

export type CreateProductInput = {
  id?: string | null
  price?: number | null
  pricePer?: string | null
  name?: string | null
  description?: string | null
  confirmationMsg?: string | null
  isOrgTier?: string | null
  isIndividualTier?: string | null
  isLogin?: string | null
  marketingDescription?: string | null
  groupsIncluded?: Array<string | null> | null
  enabled?: string | null
  isStripe?: string | null
  isPaypal?: string | null
  tiered?: Array<TieredProductInput | null> | null
}

export type TieredProductInput = {
  name?: string | null
  stripePaymentID?: string | null
  stripeIsTiered?: string | null
}

export type UpdateProductInput = {
  id: string
  price?: number | null
  pricePer?: string | null
  name?: string | null
  description?: string | null
  confirmationMsg?: string | null
  isOrgTier?: string | null
  isIndividualTier?: string | null
  isLogin?: string | null
  marketingDescription?: string | null
  groupsIncluded?: Array<string | null> | null
  enabled?: string | null
  isStripe?: string | null
  isPaypal?: string | null
  tiered?: Array<TieredProductInput | null> | null
}

export type DeleteProductInput = {
  id: string
}

export type CreateVodAssetInput = {
  id?: string | null
  title: string
  description: string
  vodAssetVideoId?: string | null
}

export type vodAsset = {
  __typename: "vodAsset"
  id?: string
  title?: string
  description?: string
  video?: videoObject
  createdAt?: string
  updatedAt?: string
}

export type videoObject = {
  __typename: "videoObject"
  id?: string
  createdAt?: string
  updatedAt?: string
}

export type UpdateVodAssetInput = {
  id: string
  title?: string | null
  description?: string | null
  vodAssetVideoId?: string | null
}

export type DeleteVodAssetInput = {
  id: string
}

export type CreateVideoObjectInput = {
  id?: string | null
}

export type UpdateVideoObjectInput = {
  id: string
}

export type DeleteVideoObjectInput = {
  id: string
}

export type CreateStartupInput = {
  id?: string | null
  order?: number | null
  action?: string | null
  params?: string | null
  readGroups?: Array<UserGroupType | null> | null
}

export type Startup = {
  __typename: "Startup"
  id?: string
  order?: number | null
  action?: string | null
  params?: string | null
  readGroups?: Array<UserGroupType | null> | null
  createdAt?: string
  updatedAt?: string
}

export type UpdateStartupInput = {
  id: string
  order?: number | null
  action?: string | null
  params?: string | null
  readGroups?: Array<UserGroupType | null> | null
}

export type DeleteStartupInput = {
  id: string
}

export type CreateMenuInput = {
  id?: string | null
  order?: number | null
  name?: string | null
  action?: string | null
  params?: string | null
  readGroups?: Array<UserGroupType | null> | null
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

export type UpdateMenuInput = {
  id: string
  order?: number | null
  name?: string | null
  action?: string | null
  params?: string | null
  readGroups?: Array<UserGroupType | null> | null
}

export type DeleteMenuInput = {
  id: string
}

export type CreateSubMenuInput = {
  id?: string | null
  menuID?: string | null
  order?: number | null
  name?: string | null
  action?: string | null
  params?: string | null
  readGroups?: Array<UserGroupType | null> | null
}

export type UpdateSubMenuInput = {
  id: string
  menuID?: string | null
  order?: number | null
  name?: string | null
  action?: string | null
  params?: string | null
  readGroups?: Array<UserGroupType | null> | null
}

export type DeleteSubMenuInput = {
  id: string
}

export type CreateCustomPricingInput = {
  id?: string | null
  emailAddress?: string | null
  type?: CustomPricingType | null
  lineItems?: Array<LineItemInput | null> | null
}

export enum CustomPricingType {
  monthly = "monthly",
  weekly = "weekly",
  yearly = "yearly",
  oneTime = "oneTime",
}

export type LineItemInput = {
  itemId?: string | null
  count?: string | null
  amount?: string | null
  description?: string | null
}

export type CustomPricing = {
  __typename: "CustomPricing"
  id?: string
  emailAddress?: string | null
  type?: CustomPricingType | null
  lineItems?: Array<LineItem | null> | null
  createdAt?: string
  updatedAt?: string
}

export type LineItem = {
  __typename: "LineItem"
  itemId?: string | null
  count?: string | null
  amount?: string | null
  description?: string | null
}

export type UpdateCustomPricingInput = {
  id: string
  emailAddress?: string | null
  type?: CustomPricingType | null
  lineItems?: Array<LineItemInput | null> | null
}

export type DeleteCustomPricingInput = {
  id: string
}

export type EventBriteEventList = {
  __typename: "EventBriteEventList"
  pagination?: EventBritePagination
  events?: Array<EventBriteEvent | null> | null
}

export type EventBritePagination = {
  __typename: "EventBritePagination"
  object_count?: number | null
  page_number?: number | null
  page_size?: number | null
  page_count?: number | null
  has_more_items?: boolean | null
}

export type EventBriteEvent = {
  __typename: "EventBriteEvent"
  name?: EventBriteText
  description?: EventBriteText
  url?: string | null
  start?: EventBriteTime
  end?: EventBriteTime
  organization_id?: string | null
  created?: string | null
  changed?: string | null
  published?: string | null
  capacity?: number | null
  capacity_is_custom?: boolean | null
  status?: string | null
  currency?: string | null
  listed?: boolean | null
  shareable?: boolean | null
  invite_only?: boolean | null
  online_event?: boolean | null
  show_remaining?: boolean | null
  tx_time_limit?: number | null
  hide_start_date?: boolean | null
  hide_end_date?: boolean | null
  locale?: string | null
  is_locked?: boolean | null
  privacy_setting?: string | null
  is_series?: boolean | null
  is_series_parent?: boolean | null
  inventory_type?: string | null
  is_reserved_seating?: boolean | null
  show_pick_a_seat?: boolean | null
  show_seatmap_thumbnail?: boolean | null
  show_colors_in_seatmap_thumbnail?: boolean | null
  source?: string | null
  is_free?: boolean | null
  version?: string | null
  summary?: string | null
  facebook_event_id?: string | null
  logo_id?: string | null
  organizer_id?: string | null
  venue_id?: string | null
  category_id?: string | null
  subcategory_id?: string | null
  format_id?: string | null
  id?: string | null
  resource_uri?: string | null
  is_externally_ticketed?: boolean | null
  series_id?: string | null
}

export type EventBriteText = {
  __typename: "EventBriteText"
  text?: string | null
  html?: string | null
}

export type EventBriteTime = {
  __typename: "EventBriteTime"
  timezone?: string | null
  local?: string | null
  utc?: string | null
}

export type EventBriteEventTicketClasses = {
  __typename: "EventBriteEventTicketClasses"
  pagination?: EventBritePagination
  ticket_classes?: Array<EventBriteTicketClass | null> | null
}

export type EventBriteTicketClass = {
  __typename: "EventBriteTicketClass"
  resource_uri?: string | null
  display_name?: string | null
  name?: string | null
  description?: string | null
  donation?: boolean | null
  free?: boolean | null
  secondary_assignment_enabled?: boolean | null
  include_fee?: boolean | null
  minimum_quantity?: number | null
  maximum_quantity?: number | null
  maximum_quantity_per_order?: number | null
  maximum_quantity_per_order_without_pending?: number | null
  on_sale_status?: string | null
  category?: string | null
  event_id?: string | null
  id?: string | null
  sales_start?: string | null
  sales_end?: string | null
  variant_id?: string | null
  variant_input_type?: string | null
  sorting?: string | null
  has_pdf_ticket?: string | null
  image_id?: string | null
  delivery_methods?: Array<string | null> | null
  sales_channels?: Array<string | null> | null
  variants?: Array<EventBriteVariants | null> | null
}

export type EventBriteVariants = {
  __typename: "EventBriteVariants"
  category?: string | null
  display_name?: string | null
  name?: string | null
  currency?: string | null
  checkout_group_id?: string | null
  on_sale_status?: string | null
  hide_sale_dates?: boolean | null
  free?: boolean | null
  include_fee?: boolean | null
}

export type ModelApplicationProcessFilterInput = {
  id?: ModelIDFilterInput | null
  and?: Array<ModelApplicationProcessFilterInput | null> | null
  or?: Array<ModelApplicationProcessFilterInput | null> | null
  not?: ModelApplicationProcessFilterInput | null
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

export type ModelApplicationProcessConnection = {
  __typename: "ModelApplicationProcessConnection"
  items?: Array<ApplicationProcess | null>
  nextToken?: string | null
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

export type ModelIntFilterInput = {
  ne?: number | null
  eq?: number | null
  le?: number | null
  lt?: number | null
  ge?: number | null
  gt?: number | null
  between?: Array<number | null> | null
}

export type ModelOrganizationFilterInput = {
  id?: ModelIDFilterInput | null
  orgName?: ModelStringFilterInput | null
  adminEmail?: ModelStringFilterInput | null
  phone?: ModelStringFilterInput | null
  admins?: ModelStringFilterInput | null
  superAdmin?: ModelStringFilterInput | null
  hasPaidState?: ModelStringFilterInput | null
  profileState?: ModelStringFilterInput | null
  address?: ModelStringFilterInput | null
  city?: ModelStringFilterInput | null
  province?: ModelStringFilterInput | null
  postalCode?: ModelStringFilterInput | null
  country?: ModelStringFilterInput | null
  aboutMeShort?: ModelStringFilterInput | null
  aboutMeLong?: ModelStringFilterInput | null
  orgType?: ModelStringFilterInput | null
  orgSize?: ModelStringFilterInput | null
  denomination?: ModelStringFilterInput | null
  pplServed?: ModelStringFilterInput | null
  sundayAttendance?: ModelStringFilterInput | null
  numberVolunteers?: ModelStringFilterInput | null
  orgDescription?: ModelStringFilterInput | null
  joined?: ModelStringFilterInput | null
  parentOrganizationId?: ModelIDFilterInput | null
  and?: Array<ModelOrganizationFilterInput | null> | null
  or?: Array<ModelOrganizationFilterInput | null> | null
  not?: ModelOrganizationFilterInput | null
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

export type ModelActivityActionTypeFilterInput = {
  eq?: ActivityActionType | null
  ne?: ActivityActionType | null
}

export type ModelActivityConnection = {
  __typename: "ModelActivityConnection"
  items?: Array<Activity | null>
  nextToken?: string | null
}

export type ModelPaymentFilterInput = {
  id?: ModelIDFilterInput | null
  productID?: ModelStringFilterInput | null
  userID?: ModelStringFilterInput | null
  dateCompleted?: ModelStringFilterInput | null
  paymentType?: ModelStringFilterInput | null
  paymentInfo?: ModelStringFilterInput | null
  and?: Array<ModelPaymentFilterInput | null> | null
  or?: Array<ModelPaymentFilterInput | null> | null
  not?: ModelPaymentFilterInput | null
}

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export type ModelCourseInfoFilterInput = {
  id?: ModelIDFilterInput | null
  designedBy?: ModelStringFilterInput | null
  summary?: ModelStringFilterInput | null
  subTitle?: ModelStringFilterInput | null
  introduction?: ModelStringFilterInput | null
  sylabusAttachment?: ModelStringFilterInput | null
  sylabusAttachmentName?: ModelStringFilterInput | null
  sylabusAttachmentOwner?: ModelStringFilterInput | null
  and?: Array<ModelCourseInfoFilterInput | null> | null
  or?: Array<ModelCourseInfoFilterInput | null> | null
  not?: ModelCourseInfoFilterInput | null
}

export type ModelCourseInfoConnection = {
  __typename: "ModelCourseInfoConnection"
  items?: Array<CourseInfo | null>
  nextToken?: string | null
}

export type ModelCourseTriadsFilterInput = {
  id?: ModelIDFilterInput | null
  courseInfoID?: ModelStringFilterInput | null
  and?: Array<ModelCourseTriadsFilterInput | null> | null
  or?: Array<ModelCourseTriadsFilterInput | null> | null
  not?: ModelCourseTriadsFilterInput | null
}

export type ModelCourseBackOfficeStaffFilterInput = {
  id?: ModelIDFilterInput | null
  courseInfoID?: ModelStringFilterInput | null
  userID?: ModelStringFilterInput | null
  and?: Array<ModelCourseBackOfficeStaffFilterInput | null> | null
  or?: Array<ModelCourseBackOfficeStaffFilterInput | null> | null
  not?: ModelCourseBackOfficeStaffFilterInput | null
}

export type ModelCourseInstructorsFilterInput = {
  id?: ModelIDFilterInput | null
  courseInfoID?: ModelStringFilterInput | null
  userID?: ModelStringFilterInput | null
  and?: Array<ModelCourseInstructorsFilterInput | null> | null
  or?: Array<ModelCourseInstructorsFilterInput | null> | null
  not?: ModelCourseInstructorsFilterInput | null
}

export type ModelCourseTriadCoachesFilterInput = {
  id?: ModelIDFilterInput | null
  triadID?: ModelStringFilterInput | null
  userID?: ModelStringFilterInput | null
  and?: Array<ModelCourseTriadCoachesFilterInput | null> | null
  or?: Array<ModelCourseTriadCoachesFilterInput | null> | null
  not?: ModelCourseTriadCoachesFilterInput | null
}

export type ModelCourseTriadUsersFilterInput = {
  id?: ModelIDFilterInput | null
  triadID?: ModelStringFilterInput | null
  userID?: ModelStringFilterInput | null
  and?: Array<ModelCourseTriadUsersFilterInput | null> | null
  or?: Array<ModelCourseTriadUsersFilterInput | null> | null
  not?: ModelCourseTriadUsersFilterInput | null
}

export type ModelCourseWeekFilterInput = {
  id?: ModelIDFilterInput | null
  week?: ModelStringFilterInput | null
  date?: ModelStringFilterInput | null
  tz?: ModelStringFilterInput | null
  name?: ModelStringFilterInput | null
  title?: ModelStringFilterInput | null
  leader?: ModelStringFilterInput | null
  courseInfoID?: ModelStringFilterInput | null
  and?: Array<ModelCourseWeekFilterInput | null> | null
  or?: Array<ModelCourseWeekFilterInput | null> | null
  not?: ModelCourseWeekFilterInput | null
}

export type ModelCourseLessonFilterInput = {
  id?: ModelIDFilterInput | null
  lesson?: ModelStringFilterInput | null
  lessonType?: ModelStringFilterInput | null
  name?: ModelStringFilterInput | null
  time?: ModelStringFilterInput | null
  tz?: ModelStringFilterInput | null
  duration?: ModelStringFilterInput | null
  zoomUrl?: ModelStringFilterInput | null
  zoomRecording?: ModelStringFilterInput | null
  courseLessonResponseId?: ModelStringFilterInput | null
  wordCount?: ModelStringFilterInput | null
  description?: ModelStringFilterInput | null
  courseWeekID?: ModelStringFilterInput | null
  and?: Array<ModelCourseLessonFilterInput | null> | null
  or?: Array<ModelCourseLessonFilterInput | null> | null
  not?: ModelCourseLessonFilterInput | null
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

export type ModelDirectMessageFilterInput = {
  id?: ModelIDFilterInput | null
  content?: ModelStringFilterInput | null
  attachment?: ModelStringFilterInput | null
  attachmentName?: ModelStringFilterInput | null
  attachmentOwner?: ModelStringFilterInput | null
  when?: ModelStringFilterInput | null
  recipients?: ModelStringFilterInput | null
  userId?: ModelIDFilterInput | null
  messageRoomID?: ModelIDFilterInput | null
  and?: Array<ModelDirectMessageFilterInput | null> | null
  or?: Array<ModelDirectMessageFilterInput | null> | null
  not?: ModelDirectMessageFilterInput | null
}

export type ModelCRMRootFilterInput = {
  id?: ModelIDFilterInput | null
  and?: Array<ModelCRMRootFilterInput | null> | null
  or?: Array<ModelCRMRootFilterInput | null> | null
  not?: ModelCRMRootFilterInput | null
}

export type ModelCRMRootConnection = {
  __typename: "ModelCRMRootConnection"
  items?: Array<CRMRoot | null>
  nextToken?: string | null
}

export type ModelCRMMessageFilterInput = {
  id?: ModelIDFilterInput | null
  rootId?: ModelIDFilterInput | null
  content?: ModelStringFilterInput | null
  when?: ModelStringFilterInput | null
  authorName?: ModelStringFilterInput | null
  authorId?: ModelIDFilterInput | null
  attachment?: ModelStringFilterInput | null
  attachmentOwner?: ModelStringFilterInput | null
  and?: Array<ModelCRMMessageFilterInput | null> | null
  or?: Array<ModelCRMMessageFilterInput | null> | null
  not?: ModelCRMMessageFilterInput | null
}

export type ModelCRMReplyFilterInput = {
  id?: ModelIDFilterInput | null
  rootId?: ModelIDFilterInput | null
  content?: ModelStringFilterInput | null
  when?: ModelStringFilterInput | null
  authorName?: ModelStringFilterInput | null
  authorId?: ModelIDFilterInput | null
  attachment?: ModelStringFilterInput | null
  attachmentOwner?: ModelStringFilterInput | null
  parentId?: ModelIDFilterInput | null
  and?: Array<ModelCRMReplyFilterInput | null> | null
  or?: Array<ModelCRMReplyFilterInput | null> | null
  not?: ModelCRMReplyFilterInput | null
}

export type ModelMessageFilterInput = {
  id?: ModelIDFilterInput | null
  content?: ModelStringFilterInput | null
  when?: ModelStringFilterInput | null
  attachment?: ModelStringFilterInput | null
  attachmentName?: ModelStringFilterInput | null
  attachmentOwner?: ModelStringFilterInput | null
  roomId?: ModelIDFilterInput | null
  userId?: ModelIDFilterInput | null
  postingAs?: ModelStringFilterInput | null
  owner?: ModelStringFilterInput | null
  and?: Array<ModelMessageFilterInput | null> | null
  or?: Array<ModelMessageFilterInput | null> | null
  not?: ModelMessageFilterInput | null
}

export type ModelResourceRootFilterInput = {
  id?: ModelIDFilterInput | null
  type?: ModelStringFilterInput | null
  groupId?: ModelStringFilterInput | null
  organizationId?: ModelIDFilterInput | null
  owner?: ModelStringFilterInput | null
  and?: Array<ModelResourceRootFilterInput | null> | null
  or?: Array<ModelResourceRootFilterInput | null> | null
  not?: ModelResourceRootFilterInput | null
}

export type ModelResourceMenuItemFilterInput = {
  id?: ModelIDFilterInput | null
  owner?: ModelStringFilterInput | null
  readGroups?: ModelUserGroupTypeListFilterInput | null
  type?: ModelResourceMenuItemTypeFilterInput | null
  menuTitle?: ModelStringFilterInput | null
  order?: ModelStringFilterInput | null
  depth?: ModelStringFilterInput | null
  resourceRootID?: ModelIDFilterInput | null
  and?: Array<ModelResourceMenuItemFilterInput | null> | null
  or?: Array<ModelResourceMenuItemFilterInput | null> | null
  not?: ModelResourceMenuItemFilterInput | null
}

export type ModelResourceMenuItemTypeFilterInput = {
  eq?: ResourceMenuItemType | null
  ne?: ResourceMenuItemType | null
}

export type ModelResourceFilterInput = {
  id?: ModelIDFilterInput | null
  owner?: ModelStringFilterInput | null
  type?: ModelStringFilterInput | null
  order?: ModelStringFilterInput | null
  title?: ModelStringFilterInput | null
  subtitle?: ModelStringFilterInput | null
  description?: ModelStringFilterInput | null
  whoIsThisFor?: ModelStringFilterInput | null
  extendedDescription?: ModelStringFilterInput | null
  readGroups?: ModelUserGroupTypeListFilterInput | null
  resourceID?: ModelIDFilterInput | null
  and?: Array<ModelResourceFilterInput | null> | null
  or?: Array<ModelResourceFilterInput | null> | null
  not?: ModelResourceFilterInput | null
}

export type ModelResourceSeriesFilterInput = {
  id?: ModelIDFilterInput | null
  owner?: ModelStringFilterInput | null
  type?: ModelStringFilterInput | null
  title?: ModelStringFilterInput | null
  order?: ModelIntFilterInput | null
  description?: ModelStringFilterInput | null
  whoIsThisFor?: ModelStringFilterInput | null
  category?: ModelStringFilterInput | null
  status?: ModelStringFilterInput | null
  seriesID?: ModelIDFilterInput | null
  and?: Array<ModelResourceSeriesFilterInput | null> | null
  or?: Array<ModelResourceSeriesFilterInput | null> | null
  not?: ModelResourceSeriesFilterInput | null
}

export type ModelResourceEpisodeFilterInput = {
  id?: ModelIDFilterInput | null
  owner?: ModelStringFilterInput | null
  episodeNumber?: ModelIntFilterInput | null
  type?: ModelStringFilterInput | null
  title?: ModelStringFilterInput | null
  description?: ModelStringFilterInput | null
  whoIsThisFor?: ModelStringFilterInput | null
  episodeID?: ModelIDFilterInput | null
  and?: Array<ModelResourceEpisodeFilterInput | null> | null
  or?: Array<ModelResourceEpisodeFilterInput | null> | null
  not?: ModelResourceEpisodeFilterInput | null
}

export type ModelProductFilterInput = {
  id?: ModelIDFilterInput | null
  price?: ModelFloatFilterInput | null
  pricePer?: ModelStringFilterInput | null
  name?: ModelStringFilterInput | null
  description?: ModelStringFilterInput | null
  confirmationMsg?: ModelStringFilterInput | null
  isOrgTier?: ModelStringFilterInput | null
  isIndividualTier?: ModelStringFilterInput | null
  isLogin?: ModelStringFilterInput | null
  marketingDescription?: ModelStringFilterInput | null
  groupsIncluded?: ModelStringFilterInput | null
  enabled?: ModelStringFilterInput | null
  isStripe?: ModelStringFilterInput | null
  isPaypal?: ModelStringFilterInput | null
  and?: Array<ModelProductFilterInput | null> | null
  or?: Array<ModelProductFilterInput | null> | null
  not?: ModelProductFilterInput | null
}

export type ModelFloatFilterInput = {
  ne?: number | null
  eq?: number | null
  le?: number | null
  lt?: number | null
  ge?: number | null
  gt?: number | null
  between?: Array<number | null> | null
}

export type ModelProductConnection = {
  __typename: "ModelProductConnection"
  items?: Array<Product | null>
  nextToken?: string | null
}

export type ModelvodAssetFilterInput = {
  id?: ModelIDFilterInput | null
  title?: ModelStringFilterInput | null
  description?: ModelStringFilterInput | null
  and?: Array<ModelvodAssetFilterInput | null> | null
  or?: Array<ModelvodAssetFilterInput | null> | null
  not?: ModelvodAssetFilterInput | null
}

export type ModelvodAssetConnection = {
  __typename: "ModelvodAssetConnection"
  items?: Array<vodAsset | null>
  nextToken?: string | null
}

export type ModelvideoObjectFilterInput = {
  id?: ModelIDFilterInput | null
  and?: Array<ModelvideoObjectFilterInput | null> | null
  or?: Array<ModelvideoObjectFilterInput | null> | null
  not?: ModelvideoObjectFilterInput | null
}

export type ModelvideoObjectConnection = {
  __typename: "ModelvideoObjectConnection"
  items?: Array<videoObject | null>
  nextToken?: string | null
}

export type ModelStartupFilterInput = {
  id?: ModelIDFilterInput | null
  order?: ModelIntFilterInput | null
  action?: ModelStringFilterInput | null
  params?: ModelStringFilterInput | null
  readGroups?: ModelUserGroupTypeListFilterInput | null
  and?: Array<ModelStartupFilterInput | null> | null
  or?: Array<ModelStartupFilterInput | null> | null
  not?: ModelStartupFilterInput | null
}

export type ModelStartupConnection = {
  __typename: "ModelStartupConnection"
  items?: Array<Startup | null>
  nextToken?: string | null
}

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

export type ModelMenuConnection = {
  __typename: "ModelMenuConnection"
  items?: Array<Menu | null>
  nextToken?: string | null
}

export type ModelSubMenuFilterInput = {
  id?: ModelIDFilterInput | null
  menuID?: ModelStringFilterInput | null
  order?: ModelIntFilterInput | null
  name?: ModelStringFilterInput | null
  action?: ModelStringFilterInput | null
  params?: ModelStringFilterInput | null
  readGroups?: ModelUserGroupTypeListFilterInput | null
  and?: Array<ModelSubMenuFilterInput | null> | null
  or?: Array<ModelSubMenuFilterInput | null> | null
  not?: ModelSubMenuFilterInput | null
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

export type ModelGroupMemberFilterInput = {
  id?: ModelIDFilterInput | null
  groupID?: ModelIDFilterInput | null
  userID?: ModelIDFilterInput | null
  and?: Array<ModelGroupMemberFilterInput | null> | null
  or?: Array<ModelGroupMemberFilterInput | null> | null
  not?: ModelGroupMemberFilterInput | null
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

export type SearchableGroupFilterInput = {
  id?: SearchableIDFilterInput | null
  owner?: SearchableStringFilterInput | null
  ownerOrgID?: SearchableIDFilterInput | null
  type?: SearchableStringFilterInput | null
  name?: SearchableStringFilterInput | null
  description?: SearchableStringFilterInput | null
  memberCount?: SearchableIntFilterInput | null
  image?: SearchableStringFilterInput | null
  time?: SearchableStringFilterInput | null
  lastUpdated?: SearchableStringFilterInput | null
  location?: SearchableStringFilterInput | null
  length?: SearchableStringFilterInput | null
  effort?: SearchableStringFilterInput | null
  cost?: SearchableStringFilterInput | null
  promotionalText?: SearchableStringFilterInput | null
  eventType?: SearchableStringFilterInput | null
  eventUrl?: SearchableStringFilterInput | null
  tz?: SearchableStringFilterInput | null
  isSponsored?: SearchableStringFilterInput | null
  and?: Array<SearchableGroupFilterInput | null> | null
  or?: Array<SearchableGroupFilterInput | null> | null
  not?: SearchableGroupFilterInput | null
}

export type SearchableIDFilterInput = {
  ne?: string | null
  gt?: string | null
  lt?: string | null
  gte?: string | null
  lte?: string | null
  eq?: string | null
  match?: string | null
  matchPhrase?: string | null
  matchPhrasePrefix?: string | null
  multiMatch?: string | null
  exists?: boolean | null
  wildcard?: string | null
  regexp?: string | null
  range?: Array<string | null> | null
}

export type SearchableStringFilterInput = {
  ne?: string | null
  gt?: string | null
  lt?: string | null
  gte?: string | null
  lte?: string | null
  eq?: string | null
  match?: string | null
  matchPhrase?: string | null
  matchPhrasePrefix?: string | null
  multiMatch?: string | null
  exists?: boolean | null
  wildcard?: string | null
  regexp?: string | null
  range?: Array<string | null> | null
}

export type SearchableIntFilterInput = {
  ne?: number | null
  gt?: number | null
  lt?: number | null
  gte?: number | null
  lte?: number | null
  eq?: number | null
  range?: Array<number | null> | null
}

export type SearchableGroupSortInput = {
  field?: SearchableGroupSortableFields | null
  direction?: SearchableSortDirection | null
}

export enum SearchableGroupSortableFields {
  id = "id",
  owner = "owner",
  ownerOrgID = "ownerOrgID",
  type = "type",
  name = "name",
  description = "description",
  memberCount = "memberCount",
  image = "image",
  time = "time",
  lastUpdated = "lastUpdated",
  location = "location",
  length = "length",
  effort = "effort",
  cost = "cost",
  promotionalText = "promotionalText",
  eventType = "eventType",
  eventUrl = "eventUrl",
  tz = "tz",
  isSponsored = "isSponsored",
}

export enum SearchableSortDirection {
  asc = "asc",
  desc = "desc",
}

export type SearchableGroupConnection = {
  __typename: "SearchableGroupConnection"
  items?: Array<Group | null>
  nextToken?: string | null
  total?: number | null
}

export type ModelUserFilterInput = {
  id?: ModelIDFilterInput | null
  given_name?: ModelStringFilterInput | null
  family_name?: ModelStringFilterInput | null
  email?: ModelStringFilterInput | null
  phone?: ModelStringFilterInput | null
  owner?: ModelStringFilterInput | null
  mainUserGroup?: ModelStringFilterInput | null
  stripeCustomerID?: ModelStringFilterInput | null
  stripeSubscriptionID?: ModelStringFilterInput | null
  hasPaidState?: ModelPaidStateFilterInput | null
  profileState?: ModelStringFilterInput | null
  aboutMeShort?: ModelStringFilterInput | null
  aboutMeLong?: ModelStringFilterInput | null
  interests?: ModelStringFilterInput | null
  currentRole?: ModelStringFilterInput | null
  currentScope?: ModelStringFilterInput | null
  personality?: ModelStringFilterInput | null
  orgName?: ModelStringFilterInput | null
  orgType?: ModelStringFilterInput | null
  orgSize?: ModelStringFilterInput | null
  denomination?: ModelStringFilterInput | null
  pplServed?: ModelStringFilterInput | null
  sundayAttendance?: ModelStringFilterInput | null
  numberVolunteers?: ModelStringFilterInput | null
  orgDescription?: ModelStringFilterInput | null
  joined?: ModelStringFilterInput | null
  primaryOrganization?: ModelStringFilterInput | null
  and?: Array<ModelUserFilterInput | null> | null
  or?: Array<ModelUserFilterInput | null> | null
  not?: ModelUserFilterInput | null
}

export type ModelPaidStateFilterInput = {
  eq?: PaidState | null
  ne?: PaidState | null
}

export type ModelUserConnection = {
  __typename: "ModelUserConnection"
  items?: Array<User | null>
  nextToken?: string | null
}

export type SearchableUserFilterInput = {
  id?: SearchableIDFilterInput | null
  given_name?: SearchableStringFilterInput | null
  family_name?: SearchableStringFilterInput | null
  email?: SearchableStringFilterInput | null
  phone?: SearchableStringFilterInput | null
  owner?: SearchableStringFilterInput | null
  mainUserGroup?: SearchableStringFilterInput | null
  stripeCustomerID?: SearchableStringFilterInput | null
  stripeSubscriptionID?: SearchableStringFilterInput | null
  profileState?: SearchableStringFilterInput | null
  aboutMeShort?: SearchableStringFilterInput | null
  aboutMeLong?: SearchableStringFilterInput | null
  interests?: SearchableStringFilterInput | null
  currentRole?: SearchableStringFilterInput | null
  currentScope?: SearchableStringFilterInput | null
  personality?: SearchableStringFilterInput | null
  orgName?: SearchableStringFilterInput | null
  orgType?: SearchableStringFilterInput | null
  orgSize?: SearchableStringFilterInput | null
  denomination?: SearchableStringFilterInput | null
  pplServed?: SearchableStringFilterInput | null
  sundayAttendance?: SearchableStringFilterInput | null
  numberVolunteers?: SearchableStringFilterInput | null
  orgDescription?: SearchableStringFilterInput | null
  joined?: SearchableStringFilterInput | null
  primaryOrganization?: SearchableStringFilterInput | null
  and?: Array<SearchableUserFilterInput | null> | null
  or?: Array<SearchableUserFilterInput | null> | null
  not?: SearchableUserFilterInput | null
}

export type SearchableUserSortInput = {
  field?: SearchableUserSortableFields | null
  direction?: SearchableSortDirection | null
}

export enum SearchableUserSortableFields {
  id = "id",
  given_name = "given_name",
  family_name = "family_name",
  email = "email",
  phone = "phone",
  owner = "owner",
  mainUserGroup = "mainUserGroup",
  stripeCustomerID = "stripeCustomerID",
  stripeSubscriptionID = "stripeSubscriptionID",
  profileState = "profileState",
  aboutMeShort = "aboutMeShort",
  aboutMeLong = "aboutMeLong",
  interests = "interests",
  currentRole = "currentRole",
  currentScope = "currentScope",
  personality = "personality",
  orgName = "orgName",
  orgType = "orgType",
  orgSize = "orgSize",
  denomination = "denomination",
  pplServed = "pplServed",
  sundayAttendance = "sundayAttendance",
  numberVolunteers = "numberVolunteers",
  orgDescription = "orgDescription",
  joined = "joined",
  primaryOrganization = "primaryOrganization",
}

export type SearchableUserConnection = {
  __typename: "SearchableUserConnection"
  items?: Array<User | null>
  nextToken?: string | null
  total?: number | null
}

export type ModelCustomPricingFilterInput = {
  id?: ModelIDFilterInput | null
  emailAddress?: ModelStringFilterInput | null
  type?: ModelCustomPricingTypeFilterInput | null
  and?: Array<ModelCustomPricingFilterInput | null> | null
  or?: Array<ModelCustomPricingFilterInput | null> | null
  not?: ModelCustomPricingFilterInput | null
}

export type ModelCustomPricingTypeFilterInput = {
  eq?: CustomPricingType | null
  ne?: CustomPricingType | null
}

export type ModelCustomPricingConnection = {
  __typename: "ModelCustomPricingConnection"
  items?: Array<CustomPricing | null>
  nextToken?: string | null
}

export type BatchCreateDirectMessageUsersMutationVariables = {
  dmusers?: Array<batchCreateDirectMessageUsersInput | null> | null
}

export type BatchCreateDirectMessageUsersMutation = {
  batchCreateDirectMessageUsers?: Array<{
    __typename: "DirectMessageUser"
    id: string
    userName?: string | null
    userID: string
    roomID: string
    room?: {
      __typename: "DirectMessageRoom"
      id: string
      name?: string | null
      messageUsers?: {
        __typename: "ModelDirectMessageUserConnection"
        nextToken?: string | null
      } | null
      directMessage?: {
        __typename: "ModelDirectMessageConnection"
        nextToken?: string | null
      } | null
      roomType?: string | null
      createdAt: string
      updatedAt: string
    } | null
    createdAt: string
    updatedAt: string
    user?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null> | null
}

export type CreatePaymentIntentMutationVariables = {
  msg?: string | null
}

export type CreatePaymentIntentMutation = {
  createPaymentIntent?: {
    __typename: "StripePaymentIntent"
    id?: string | null
    client_secret?: string | null
    status?: string | null
  } | null
}

export type CreateStripeCustomerMutationVariables = {
  idempotency?: string | null
  phone?: string | null
  email?: string | null
  firstName?: string | null
  lastName?: string | null
  orgName?: string | null
  billingAddress?: StripeAddressInput | null
}

export type CreateStripeCustomerMutation = {
  createStripeCustomer?: {
    __typename: "StripeCustomerData"
    customer?: {
      __typename: "StripeCustomer"
      id?: string | null
      object?: string | null
      address?: string | null
      balance?: string | null
      created?: string | null
      currency?: string | null
      default_source?: string | null
      delinquent?: string | null
      description?: string | null
      discount?: string | null
      email?: string | null
      invoice_prefix?: string | null
      invoice_settings?: {
        __typename: "StripeInvoiceSettings"
        custom_fields?: string | null
        default_payment_method?: string | null
        footer?: string | null
      } | null
      livemode?: string | null
      metadata?: string | null
      name?: string | null
      next_invoice_sequence?: string | null
      phone?: string | null
      preferred_locales?: string | null
      shipping?: string | null
      tax_exempt?: string | null
    } | null
  } | null
}

export type CreateStripeCustomerAdminMutationVariables = {
  idempotency?: string | null
  phone?: string | null
  email?: string | null
  firstName?: string | null
  lastName?: string | null
  orgName?: string | null
  billingAddress?: StripeAddressInput | null
  userId?: string | null
}

export type CreateStripeCustomerAdminMutation = {
  createStripeCustomerAdmin?: {
    __typename: "StripeCustomerData"
    customer?: {
      __typename: "StripeCustomer"
      id?: string | null
      object?: string | null
      address?: string | null
      balance?: string | null
      created?: string | null
      currency?: string | null
      default_source?: string | null
      delinquent?: string | null
      description?: string | null
      discount?: string | null
      email?: string | null
      invoice_prefix?: string | null
      invoice_settings?: {
        __typename: "StripeInvoiceSettings"
        custom_fields?: string | null
        default_payment_method?: string | null
        footer?: string | null
      } | null
      livemode?: string | null
      metadata?: string | null
      name?: string | null
      next_invoice_sequence?: string | null
      phone?: string | null
      preferred_locales?: string | null
      shipping?: string | null
      tax_exempt?: string | null
    } | null
  } | null
}

export type CreateSubscriptionMutationVariables = {
  stripeCustomerID?: string | null
  stripeSubscriptionID?: string | null
  idempotency?: string | null
  paymentMethodId?: string | null
  priceInfo?: StripePriceInput | null
  freeDays?: number | null
}

export type CreateSubscriptionMutation = {
  createSubscription?: {
    __typename: "StripeSubscriptionData"
    subscription?: {
      __typename: "StripeSubscription"
      id?: string | null
      object?: string | null
      application_fee_percent?: string | null
      billing_cycle_anchor?: string | null
      billing_thresholds?: string | null
      cancel_at?: string | null
      cancel_at_period_end?: string | null
      canceled_at?: string | null
      collection_method?: string | null
      created?: string | null
      current_period_end?: string | null
      current_period_start?: string | null
      customer?: string | null
      days_until_due?: string | null
      default_payment_method?: string | null
      default_source?: string | null
      default_tax_rates?: Array<string | null> | null
      discount?: string | null
      ended_at?: string | null
      items?: {
        __typename: "StripeSubscriptionItems"
        object?: string | null
        has_more?: string | null
        url?: string | null
      } | null
      latest_invoice?: {
        __typename: "StripeInvoice"
        id?: string | null
        object?: string | null
        account_country?: string | null
        account_name?: string | null
        account_tax_ids?: string | null
        amount_due?: string | null
        amount_paid?: string | null
        amount_remaining?: string | null
        application_fee_amount?: string | null
        attempt_count?: string | null
        attempted?: string | null
        auto_advance?: string | null
        billing_reason?: string | null
        charge?: string | null
        collection_method?: string | null
        created?: string | null
        currency?: string | null
        custom_fields?: string | null
        customer?: string | null
        customer_email?: string | null
        customer_name?: string | null
        customer_phone?: string | null
        customer_shipping?: string | null
        customer_tax_exempt?: string | null
        customer_tax_ids?: Array<string | null> | null
        default_payment_method?: string | null
        default_source?: string | null
        default_tax_rates?: Array<string | null> | null
        description?: string | null
        discount?: string | null
        discounts?: Array<string | null> | null
        due_date?: string | null
        ending_balance?: string | null
        footer?: string | null
        hosted_invoice_url?: string | null
        invoice_pdf?: string | null
        last_finalization_error?: string | null
        livemode?: string | null
        metadata?: string | null
        next_payment_attempt?: string | null
        number?: string | null
        paid?: string | null
        payment_intent?: string | null
        period_end?: string | null
        period_start?: string | null
        post_payment_credit_notes_amount?: string | null
        pre_payment_credit_notes_amount?: string | null
        receipt_number?: string | null
        starting_balance?: string | null
        statement_descriptor?: string | null
        status?: string | null
        subscription?: string | null
        subtotal?: string | null
        tax?: string | null
        total?: string | null
        total_discount_amounts?: Array<string | null> | null
        total_tax_amounts?: Array<string | null> | null
        transfer_data?: string | null
        webhooks_delivered_at?: string | null
      } | null
      livemode?: string | null
      metadata?: string | null
      next_pending_invoice_item_invoice?: string | null
      pause_collection?: string | null
      pending_invoice_item_interval?: string | null
      pending_setup_intent?: string | null
      pending_update?: string | null
      schedule?: string | null
      start_date?: string | null
      status?: string | null
      transfer_data?: string | null
      trial_end?: string | null
      trial_start?: string | null
    } | null
  } | null
}

export type PreviewInvoiceMutationVariables = {
  stripeCustomerID?: string | null
  idempotency?: string | null
  priceInfo?: StripePriceInput | null
}

export type PreviewInvoiceMutation = {
  previewInvoice?: {
    __typename: "StripeInvoiceData"
    invoice?: {
      __typename: "StripeInvoice"
      id?: string | null
      object?: string | null
      account_country?: string | null
      account_name?: string | null
      account_tax_ids?: string | null
      amount_due?: string | null
      amount_paid?: string | null
      amount_remaining?: string | null
      application_fee_amount?: string | null
      attempt_count?: string | null
      attempted?: string | null
      auto_advance?: string | null
      billing_reason?: string | null
      charge?: string | null
      collection_method?: string | null
      created?: string | null
      currency?: string | null
      custom_fields?: string | null
      customer?: string | null
      customer_address?: {
        __typename: "StripeAddress"
        city?: string | null
        country?: string | null
        line1?: string | null
        line2?: string | null
        postal_code?: string | null
        state?: string | null
      } | null
      customer_email?: string | null
      customer_name?: string | null
      customer_phone?: string | null
      customer_shipping?: string | null
      customer_tax_exempt?: string | null
      customer_tax_ids?: Array<string | null> | null
      default_payment_method?: string | null
      default_source?: string | null
      default_tax_rates?: Array<string | null> | null
      description?: string | null
      discount?: string | null
      discounts?: Array<string | null> | null
      due_date?: string | null
      ending_balance?: string | null
      footer?: string | null
      hosted_invoice_url?: string | null
      invoice_pdf?: string | null
      last_finalization_error?: string | null
      lines?: {
        __typename: "StripeLines"
        has_more?: string | null
        object?: string | null
        url?: string | null
      } | null
      livemode?: string | null
      metadata?: string | null
      next_payment_attempt?: string | null
      number?: string | null
      paid?: string | null
      payment_intent?: string | null
      period_end?: string | null
      period_start?: string | null
      post_payment_credit_notes_amount?: string | null
      pre_payment_credit_notes_amount?: string | null
      receipt_number?: string | null
      starting_balance?: string | null
      statement_descriptor?: string | null
      status?: string | null
      status_transitions?: {
        __typename: "StripeTransition"
        finalized_at?: string | null
        marked_uncollectible_at?: string | null
        paid_at?: string | null
        voided_at?: string | null
      } | null
      subscription?: string | null
      subtotal?: string | null
      tax?: string | null
      total?: string | null
      total_discount_amounts?: Array<string | null> | null
      total_tax_amounts?: Array<string | null> | null
      transfer_data?: string | null
      webhooks_delivered_at?: string | null
    } | null
  } | null
}

export type ListInvoicesMutationVariables = {
  idempotency?: string | null
}

export type ListInvoicesMutation = {
  listInvoices?: {
    __typename: "StripeInvoicesListData"
    data?: Array<{
      __typename: "StripeInvoice"
      id?: string | null
      object?: string | null
      account_country?: string | null
      account_name?: string | null
      account_tax_ids?: string | null
      amount_due?: string | null
      amount_paid?: string | null
      amount_remaining?: string | null
      application_fee_amount?: string | null
      attempt_count?: string | null
      attempted?: string | null
      auto_advance?: string | null
      billing_reason?: string | null
      charge?: string | null
      collection_method?: string | null
      created?: string | null
      currency?: string | null
      custom_fields?: string | null
      customer?: string | null
      customer_address?: {
        __typename: "StripeAddress"
        city?: string | null
        country?: string | null
        line1?: string | null
        line2?: string | null
        postal_code?: string | null
        state?: string | null
      } | null
      customer_email?: string | null
      customer_name?: string | null
      customer_phone?: string | null
      customer_shipping?: string | null
      customer_tax_exempt?: string | null
      customer_tax_ids?: Array<string | null> | null
      default_payment_method?: string | null
      default_source?: string | null
      default_tax_rates?: Array<string | null> | null
      description?: string | null
      discount?: string | null
      discounts?: Array<string | null> | null
      due_date?: string | null
      ending_balance?: string | null
      footer?: string | null
      hosted_invoice_url?: string | null
      invoice_pdf?: string | null
      last_finalization_error?: string | null
      lines?: {
        __typename: "StripeLines"
        has_more?: string | null
        object?: string | null
        url?: string | null
      } | null
      livemode?: string | null
      metadata?: string | null
      next_payment_attempt?: string | null
      number?: string | null
      paid?: string | null
      payment_intent?: string | null
      period_end?: string | null
      period_start?: string | null
      post_payment_credit_notes_amount?: string | null
      pre_payment_credit_notes_amount?: string | null
      receipt_number?: string | null
      starting_balance?: string | null
      statement_descriptor?: string | null
      status?: string | null
      status_transitions?: {
        __typename: "StripeTransition"
        finalized_at?: string | null
        marked_uncollectible_at?: string | null
        paid_at?: string | null
        voided_at?: string | null
      } | null
      subscription?: string | null
      subtotal?: string | null
      tax?: string | null
      total?: string | null
      total_discount_amounts?: Array<string | null> | null
      total_tax_amounts?: Array<string | null> | null
      transfer_data?: string | null
      webhooks_delivered_at?: string | null
    } | null> | null
  } | null
}

export type CancelSubscriptionMutationVariables = {
  idempotency?: string | null
}

export type CancelSubscriptionMutation = {
  cancelSubscription?: {
    __typename: "StripeSubscriptionData"
    subscription?: {
      __typename: "StripeSubscription"
      id?: string | null
      object?: string | null
      application_fee_percent?: string | null
      billing_cycle_anchor?: string | null
      billing_thresholds?: string | null
      cancel_at?: string | null
      cancel_at_period_end?: string | null
      canceled_at?: string | null
      collection_method?: string | null
      created?: string | null
      current_period_end?: string | null
      current_period_start?: string | null
      customer?: string | null
      days_until_due?: string | null
      default_payment_method?: string | null
      default_source?: string | null
      default_tax_rates?: Array<string | null> | null
      discount?: string | null
      ended_at?: string | null
      items?: {
        __typename: "StripeSubscriptionItems"
        object?: string | null
        has_more?: string | null
        url?: string | null
      } | null
      latest_invoice?: {
        __typename: "StripeInvoice"
        id?: string | null
        object?: string | null
        account_country?: string | null
        account_name?: string | null
        account_tax_ids?: string | null
        amount_due?: string | null
        amount_paid?: string | null
        amount_remaining?: string | null
        application_fee_amount?: string | null
        attempt_count?: string | null
        attempted?: string | null
        auto_advance?: string | null
        billing_reason?: string | null
        charge?: string | null
        collection_method?: string | null
        created?: string | null
        currency?: string | null
        custom_fields?: string | null
        customer?: string | null
        customer_email?: string | null
        customer_name?: string | null
        customer_phone?: string | null
        customer_shipping?: string | null
        customer_tax_exempt?: string | null
        customer_tax_ids?: Array<string | null> | null
        default_payment_method?: string | null
        default_source?: string | null
        default_tax_rates?: Array<string | null> | null
        description?: string | null
        discount?: string | null
        discounts?: Array<string | null> | null
        due_date?: string | null
        ending_balance?: string | null
        footer?: string | null
        hosted_invoice_url?: string | null
        invoice_pdf?: string | null
        last_finalization_error?: string | null
        livemode?: string | null
        metadata?: string | null
        next_payment_attempt?: string | null
        number?: string | null
        paid?: string | null
        payment_intent?: string | null
        period_end?: string | null
        period_start?: string | null
        post_payment_credit_notes_amount?: string | null
        pre_payment_credit_notes_amount?: string | null
        receipt_number?: string | null
        starting_balance?: string | null
        statement_descriptor?: string | null
        status?: string | null
        subscription?: string | null
        subtotal?: string | null
        tax?: string | null
        total?: string | null
        total_discount_amounts?: Array<string | null> | null
        total_tax_amounts?: Array<string | null> | null
        transfer_data?: string | null
        webhooks_delivered_at?: string | null
      } | null
      livemode?: string | null
      metadata?: string | null
      next_pending_invoice_item_invoice?: string | null
      pause_collection?: string | null
      pending_invoice_item_interval?: string | null
      pending_setup_intent?: string | null
      pending_update?: string | null
      schedule?: string | null
      start_date?: string | null
      status?: string | null
      transfer_data?: string | null
      trial_end?: string | null
      trial_start?: string | null
    } | null
  } | null
}

export type SendHelpRequestMutationVariables = {
  email?: string | null
  body?: string | null
}

export type SendHelpRequestMutation = {
  sendHelpRequest?: {
    __typename: "sendHelpResponse"
    err?: string | null
    data?: string | null
  } | null
}

export type CreateApplicationProcessMutationVariables = {
  input?: CreateApplicationProcessInput
}

export type CreateApplicationProcessMutation = {
  createApplicationProcess?: {
    __typename: "ApplicationProcess"
    id: string
    createdAt: string
    updatedAt: string
  } | null
}

export type UpdateApplicationProcessMutationVariables = {
  input?: UpdateApplicationProcessInput
}

export type UpdateApplicationProcessMutation = {
  updateApplicationProcess?: {
    __typename: "ApplicationProcess"
    id: string
    createdAt: string
    updatedAt: string
  } | null
}

export type DeleteApplicationProcessMutationVariables = {
  input?: DeleteApplicationProcessInput
}

export type DeleteApplicationProcessMutation = {
  deleteApplicationProcess?: {
    __typename: "ApplicationProcess"
    id: string
    createdAt: string
    updatedAt: string
  } | null
}

export type CreateUserMutationVariables = {
  input?: CreateUserInput
}

export type CreateUserMutation = {
  createUser?: {
    __typename: "User"
    id: string
    given_name: string
    family_name: string
    email?: string | null
    phone?: string | null
    owner?: string | null
    mainUserGroup?: string | null
    stripeCustomerID?: string | null
    stripeSubscriptionID?: string | null
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
        readGroups?: Array<UserGroupType | null> | null
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
    messages?: {
      __typename: "ModelMessageConnection"
      items: Array<{
        __typename: "Message"
        id: string
        content: string
        when: string
        attachment?: string | null
        attachmentName?: string | null
        attachmentOwner?: string | null
        roomId?: string | null
        userId?: string | null
        postingAs?: string | null
        owner?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    directMessages?: {
      __typename: "ModelDirectMessageConnection"
      items: Array<{
        __typename: "DirectMessage"
        id: string
        content?: string | null
        attachment?: string | null
        attachmentName?: string | null
        attachmentOwner?: string | null
        when: string
        recipients: Array<string | null>
        userId: string
        messageRoomID: string
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    messageReplies?: {
      __typename: "ModelReplyConnection"
      items: Array<{
        __typename: "Reply"
        id: string
        content: string
        when: string
        attachment?: string | null
        attachmentName?: string | null
        attachmentOwner?: string | null
        userId: string
        messageId: string
        roomId?: string | null
        parentReplyId: string
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    coachingTriad?: {
      __typename: "ModelCourseTriadCoachesConnection"
      items: Array<{
        __typename: "CourseTriadCoaches"
        id: string
        triadID?: string | null
        userID?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    userTriad?: {
      __typename: "ModelCourseTriadUsersConnection"
      items: Array<{
        __typename: "CourseTriadUsers"
        id: string
        triadID?: string | null
        userID?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    courseInstructing?: {
      __typename: "ModelCourseInstructorsConnection"
      items: Array<{
        __typename: "CourseInstructors"
        id: string
        courseInfoID?: string | null
        userID?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    courseBackOfficeStaff?: {
      __typename: "ModelCourseBackOfficeStaffConnection"
      items: Array<{
        __typename: "CourseBackOfficeStaff"
        id: string
        courseInfoID?: string | null
        userID?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    payments?: {
      __typename: "ModelPaymentConnection"
      items: Array<{
        __typename: "Payment"
        id: string
        productID?: string | null
        userID?: string | null
        dateCompleted?: string | null
        paymentType?: string | null
        paymentInfo?: string | null
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

export type UpdateUserMutationVariables = {
  input?: UpdateUserInput
}

export type UpdateUserMutation = {
  updateUser?: {
    __typename: "User"
    id: string
    given_name: string
    family_name: string
    email?: string | null
    phone?: string | null
    owner?: string | null
    mainUserGroup?: string | null
    stripeCustomerID?: string | null
    stripeSubscriptionID?: string | null
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
        readGroups?: Array<UserGroupType | null> | null
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
    messages?: {
      __typename: "ModelMessageConnection"
      items: Array<{
        __typename: "Message"
        id: string
        content: string
        when: string
        attachment?: string | null
        attachmentName?: string | null
        attachmentOwner?: string | null
        roomId?: string | null
        userId?: string | null
        postingAs?: string | null
        owner?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    directMessages?: {
      __typename: "ModelDirectMessageConnection"
      items: Array<{
        __typename: "DirectMessage"
        id: string
        content?: string | null
        attachment?: string | null
        attachmentName?: string | null
        attachmentOwner?: string | null
        when: string
        recipients: Array<string | null>
        userId: string
        messageRoomID: string
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    messageReplies?: {
      __typename: "ModelReplyConnection"
      items: Array<{
        __typename: "Reply"
        id: string
        content: string
        when: string
        attachment?: string | null
        attachmentName?: string | null
        attachmentOwner?: string | null
        userId: string
        messageId: string
        roomId?: string | null
        parentReplyId: string
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    coachingTriad?: {
      __typename: "ModelCourseTriadCoachesConnection"
      items: Array<{
        __typename: "CourseTriadCoaches"
        id: string
        triadID?: string | null
        userID?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    userTriad?: {
      __typename: "ModelCourseTriadUsersConnection"
      items: Array<{
        __typename: "CourseTriadUsers"
        id: string
        triadID?: string | null
        userID?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    courseInstructing?: {
      __typename: "ModelCourseInstructorsConnection"
      items: Array<{
        __typename: "CourseInstructors"
        id: string
        courseInfoID?: string | null
        userID?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    courseBackOfficeStaff?: {
      __typename: "ModelCourseBackOfficeStaffConnection"
      items: Array<{
        __typename: "CourseBackOfficeStaff"
        id: string
        courseInfoID?: string | null
        userID?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    payments?: {
      __typename: "ModelPaymentConnection"
      items: Array<{
        __typename: "Payment"
        id: string
        productID?: string | null
        userID?: string | null
        dateCompleted?: string | null
        paymentType?: string | null
        paymentInfo?: string | null
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

export type DeleteUserMutationVariables = {
  input?: DeleteUserInput
}

export type DeleteUserMutation = {
  deleteUser?: {
    __typename: "User"
    id: string
    given_name: string
    family_name: string
    email?: string | null
    phone?: string | null
    owner?: string | null
    mainUserGroup?: string | null
    stripeCustomerID?: string | null
    stripeSubscriptionID?: string | null
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
        readGroups?: Array<UserGroupType | null> | null
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
    messages?: {
      __typename: "ModelMessageConnection"
      items: Array<{
        __typename: "Message"
        id: string
        content: string
        when: string
        attachment?: string | null
        attachmentName?: string | null
        attachmentOwner?: string | null
        roomId?: string | null
        userId?: string | null
        postingAs?: string | null
        owner?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    directMessages?: {
      __typename: "ModelDirectMessageConnection"
      items: Array<{
        __typename: "DirectMessage"
        id: string
        content?: string | null
        attachment?: string | null
        attachmentName?: string | null
        attachmentOwner?: string | null
        when: string
        recipients: Array<string | null>
        userId: string
        messageRoomID: string
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    messageReplies?: {
      __typename: "ModelReplyConnection"
      items: Array<{
        __typename: "Reply"
        id: string
        content: string
        when: string
        attachment?: string | null
        attachmentName?: string | null
        attachmentOwner?: string | null
        userId: string
        messageId: string
        roomId?: string | null
        parentReplyId: string
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    coachingTriad?: {
      __typename: "ModelCourseTriadCoachesConnection"
      items: Array<{
        __typename: "CourseTriadCoaches"
        id: string
        triadID?: string | null
        userID?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    userTriad?: {
      __typename: "ModelCourseTriadUsersConnection"
      items: Array<{
        __typename: "CourseTriadUsers"
        id: string
        triadID?: string | null
        userID?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    courseInstructing?: {
      __typename: "ModelCourseInstructorsConnection"
      items: Array<{
        __typename: "CourseInstructors"
        id: string
        courseInfoID?: string | null
        userID?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    courseBackOfficeStaff?: {
      __typename: "ModelCourseBackOfficeStaffConnection"
      items: Array<{
        __typename: "CourseBackOfficeStaff"
        id: string
        courseInfoID?: string | null
        userID?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    payments?: {
      __typename: "ModelPaymentConnection"
      items: Array<{
        __typename: "Payment"
        id: string
        productID?: string | null
        userID?: string | null
        dateCompleted?: string | null
        paymentType?: string | null
        paymentInfo?: string | null
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

export type CreateGroupMemberMutationVariables = {
  input?: CreateGroupMemberInput
}

export type CreateGroupMemberMutation = {
  createGroupMember?: {
    __typename: "GroupMember"
    id: string
    groupID?: string | null
    userID?: string | null
    group?: {
      __typename: "Group"
      id: string
      owner: string
      readGroups?: Array<UserGroupType | null> | null
      ownerOrgID: string
      ownerOrg?: {
        __typename: "Organization"
        id: string
        orgName: string
        adminEmail?: string | null
        phone?: string | null
        admins: Array<string>
        superAdmin: string
        hasPaidState?: string | null
        profileState?: string | null
        address?: string | null
        city?: string | null
        province?: string | null
        postalCode?: string | null
        country?: string | null
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
        parentOrganizationId: string
        createdAt: string
        updatedAt: string
      } | null
      type: string
      name: string
      description: string
      memberCount?: number | null
      members?: {
        __typename: "ModelGroupMemberConnection"
        nextToken?: string | null
      } | null
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
        randomLatitude?: string | null
        randomLongitude?: string | null
      } | null
      length?: string | null
      effort?: string | null
      cost?: string | null
      promotionalText?: string | null
      messages?: {
        __typename: "ModelMessageConnection"
        nextToken?: string | null
      } | null
      eventType?: string | null
      eventUrl?: string | null
      tz?: string | null
      isSponsored?: string | null
      createdAt: string
      updatedAt: string
      ownerUser?: {
        __typename: "User"
        id: string
        given_name: string
        family_name: string
        email?: string | null
        phone?: string | null
        owner?: string | null
        mainUserGroup?: string | null
        stripeCustomerID?: string | null
        stripeSubscriptionID?: string | null
        hasPaidState?: PaidState | null
        profileState?: string | null
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
        createdAt: string
        updatedAt: string
      } | null
    } | null
    createdAt: string
    updatedAt: string
    user?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type UpdateGroupMemberMutationVariables = {
  input?: UpdateGroupMemberInput
}

export type UpdateGroupMemberMutation = {
  updateGroupMember?: {
    __typename: "GroupMember"
    id: string
    groupID?: string | null
    userID?: string | null
    group?: {
      __typename: "Group"
      id: string
      owner: string
      readGroups?: Array<UserGroupType | null> | null
      ownerOrgID: string
      ownerOrg?: {
        __typename: "Organization"
        id: string
        orgName: string
        adminEmail?: string | null
        phone?: string | null
        admins: Array<string>
        superAdmin: string
        hasPaidState?: string | null
        profileState?: string | null
        address?: string | null
        city?: string | null
        province?: string | null
        postalCode?: string | null
        country?: string | null
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
        parentOrganizationId: string
        createdAt: string
        updatedAt: string
      } | null
      type: string
      name: string
      description: string
      memberCount?: number | null
      members?: {
        __typename: "ModelGroupMemberConnection"
        nextToken?: string | null
      } | null
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
        randomLatitude?: string | null
        randomLongitude?: string | null
      } | null
      length?: string | null
      effort?: string | null
      cost?: string | null
      promotionalText?: string | null
      messages?: {
        __typename: "ModelMessageConnection"
        nextToken?: string | null
      } | null
      eventType?: string | null
      eventUrl?: string | null
      tz?: string | null
      isSponsored?: string | null
      createdAt: string
      updatedAt: string
      ownerUser?: {
        __typename: "User"
        id: string
        given_name: string
        family_name: string
        email?: string | null
        phone?: string | null
        owner?: string | null
        mainUserGroup?: string | null
        stripeCustomerID?: string | null
        stripeSubscriptionID?: string | null
        hasPaidState?: PaidState | null
        profileState?: string | null
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
        createdAt: string
        updatedAt: string
      } | null
    } | null
    createdAt: string
    updatedAt: string
    user?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type DeleteGroupMemberMutationVariables = {
  input?: DeleteGroupMemberInput
}

export type DeleteGroupMemberMutation = {
  deleteGroupMember?: {
    __typename: "GroupMember"
    id: string
    groupID?: string | null
    userID?: string | null
    group?: {
      __typename: "Group"
      id: string
      owner: string
      readGroups?: Array<UserGroupType | null> | null
      ownerOrgID: string
      ownerOrg?: {
        __typename: "Organization"
        id: string
        orgName: string
        adminEmail?: string | null
        phone?: string | null
        admins: Array<string>
        superAdmin: string
        hasPaidState?: string | null
        profileState?: string | null
        address?: string | null
        city?: string | null
        province?: string | null
        postalCode?: string | null
        country?: string | null
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
        parentOrganizationId: string
        createdAt: string
        updatedAt: string
      } | null
      type: string
      name: string
      description: string
      memberCount?: number | null
      members?: {
        __typename: "ModelGroupMemberConnection"
        nextToken?: string | null
      } | null
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
        randomLatitude?: string | null
        randomLongitude?: string | null
      } | null
      length?: string | null
      effort?: string | null
      cost?: string | null
      promotionalText?: string | null
      messages?: {
        __typename: "ModelMessageConnection"
        nextToken?: string | null
      } | null
      eventType?: string | null
      eventUrl?: string | null
      tz?: string | null
      isSponsored?: string | null
      createdAt: string
      updatedAt: string
      ownerUser?: {
        __typename: "User"
        id: string
        given_name: string
        family_name: string
        email?: string | null
        phone?: string | null
        owner?: string | null
        mainUserGroup?: string | null
        stripeCustomerID?: string | null
        stripeSubscriptionID?: string | null
        hasPaidState?: PaidState | null
        profileState?: string | null
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
        createdAt: string
        updatedAt: string
      } | null
    } | null
    createdAt: string
    updatedAt: string
    user?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type CreateGroupMutationVariables = {
  input?: CreateGroupInput
}

export type CreateGroupMutation = {
  createGroup?: {
    __typename: "Group"
    id: string
    owner: string
    readGroups?: Array<UserGroupType | null> | null
    ownerOrgID: string
    ownerOrg?: {
      __typename: "Organization"
      id: string
      orgName: string
      adminEmail?: string | null
      phone?: string | null
      admins: Array<string>
      superAdmin: string
      hasPaidState?: string | null
      profileState?: string | null
      address?: string | null
      city?: string | null
      province?: string | null
      postalCode?: string | null
      country?: string | null
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
      orgType?: string | null
      orgSize?: string | null
      denomination?: string | null
      pplServed?: string | null
      sundayAttendance?: string | null
      numberVolunteers?: string | null
      orgDescription?: string | null
      joined?: string | null
      parentOrganizationId: string
      parentOrganization?: {
        __typename: "Organization"
        id: string
        orgName: string
        adminEmail?: string | null
        phone?: string | null
        admins: Array<string>
        superAdmin: string
        hasPaidState?: string | null
        profileState?: string | null
        address?: string | null
        city?: string | null
        province?: string | null
        postalCode?: string | null
        country?: string | null
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
        parentOrganizationId: string
        createdAt: string
        updatedAt: string
      } | null
      subOrganizations?: {
        __typename: "ModelOrganizationConnection"
        nextToken?: string | null
      } | null
      members?: {
        __typename: "ModelOrganizationMemberConnection"
        nextToken?: string | null
      } | null
      ownsGroups?: {
        __typename: "ModelGroupConnection"
        nextToken?: string | null
      } | null
      resource?: {
        __typename: "ModelResourceRootConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    type: string
    name: string
    description: string
    memberCount?: number | null
    members?: {
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
      randomLatitude?: string | null
      randomLongitude?: string | null
    } | null
    length?: string | null
    effort?: string | null
    cost?: string | null
    promotionalText?: string | null
    messages?: {
      __typename: "ModelMessageConnection"
      items: Array<{
        __typename: "Message"
        id: string
        content: string
        when: string
        attachment?: string | null
        attachmentName?: string | null
        attachmentOwner?: string | null
        roomId?: string | null
        userId?: string | null
        postingAs?: string | null
        owner?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    eventType?: string | null
    eventUrl?: string | null
    tz?: string | null
    isSponsored?: string | null
    createdAt: string
    updatedAt: string
    ownerUser?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type UpdateGroupMutationVariables = {
  input?: UpdateGroupInput
}

export type UpdateGroupMutation = {
  updateGroup?: {
    __typename: "Group"
    id: string
    owner: string
    readGroups?: Array<UserGroupType | null> | null
    ownerOrgID: string
    ownerOrg?: {
      __typename: "Organization"
      id: string
      orgName: string
      adminEmail?: string | null
      phone?: string | null
      admins: Array<string>
      superAdmin: string
      hasPaidState?: string | null
      profileState?: string | null
      address?: string | null
      city?: string | null
      province?: string | null
      postalCode?: string | null
      country?: string | null
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
      orgType?: string | null
      orgSize?: string | null
      denomination?: string | null
      pplServed?: string | null
      sundayAttendance?: string | null
      numberVolunteers?: string | null
      orgDescription?: string | null
      joined?: string | null
      parentOrganizationId: string
      parentOrganization?: {
        __typename: "Organization"
        id: string
        orgName: string
        adminEmail?: string | null
        phone?: string | null
        admins: Array<string>
        superAdmin: string
        hasPaidState?: string | null
        profileState?: string | null
        address?: string | null
        city?: string | null
        province?: string | null
        postalCode?: string | null
        country?: string | null
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
        parentOrganizationId: string
        createdAt: string
        updatedAt: string
      } | null
      subOrganizations?: {
        __typename: "ModelOrganizationConnection"
        nextToken?: string | null
      } | null
      members?: {
        __typename: "ModelOrganizationMemberConnection"
        nextToken?: string | null
      } | null
      ownsGroups?: {
        __typename: "ModelGroupConnection"
        nextToken?: string | null
      } | null
      resource?: {
        __typename: "ModelResourceRootConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    type: string
    name: string
    description: string
    memberCount?: number | null
    members?: {
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
      randomLatitude?: string | null
      randomLongitude?: string | null
    } | null
    length?: string | null
    effort?: string | null
    cost?: string | null
    promotionalText?: string | null
    messages?: {
      __typename: "ModelMessageConnection"
      items: Array<{
        __typename: "Message"
        id: string
        content: string
        when: string
        attachment?: string | null
        attachmentName?: string | null
        attachmentOwner?: string | null
        roomId?: string | null
        userId?: string | null
        postingAs?: string | null
        owner?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    eventType?: string | null
    eventUrl?: string | null
    tz?: string | null
    isSponsored?: string | null
    createdAt: string
    updatedAt: string
    ownerUser?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type DeleteGroupMutationVariables = {
  input?: DeleteGroupInput
}

export type DeleteGroupMutation = {
  deleteGroup?: {
    __typename: "Group"
    id: string
    owner: string
    readGroups?: Array<UserGroupType | null> | null
    ownerOrgID: string
    ownerOrg?: {
      __typename: "Organization"
      id: string
      orgName: string
      adminEmail?: string | null
      phone?: string | null
      admins: Array<string>
      superAdmin: string
      hasPaidState?: string | null
      profileState?: string | null
      address?: string | null
      city?: string | null
      province?: string | null
      postalCode?: string | null
      country?: string | null
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
      orgType?: string | null
      orgSize?: string | null
      denomination?: string | null
      pplServed?: string | null
      sundayAttendance?: string | null
      numberVolunteers?: string | null
      orgDescription?: string | null
      joined?: string | null
      parentOrganizationId: string
      parentOrganization?: {
        __typename: "Organization"
        id: string
        orgName: string
        adminEmail?: string | null
        phone?: string | null
        admins: Array<string>
        superAdmin: string
        hasPaidState?: string | null
        profileState?: string | null
        address?: string | null
        city?: string | null
        province?: string | null
        postalCode?: string | null
        country?: string | null
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
        parentOrganizationId: string
        createdAt: string
        updatedAt: string
      } | null
      subOrganizations?: {
        __typename: "ModelOrganizationConnection"
        nextToken?: string | null
      } | null
      members?: {
        __typename: "ModelOrganizationMemberConnection"
        nextToken?: string | null
      } | null
      ownsGroups?: {
        __typename: "ModelGroupConnection"
        nextToken?: string | null
      } | null
      resource?: {
        __typename: "ModelResourceRootConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    type: string
    name: string
    description: string
    memberCount?: number | null
    members?: {
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
      randomLatitude?: string | null
      randomLongitude?: string | null
    } | null
    length?: string | null
    effort?: string | null
    cost?: string | null
    promotionalText?: string | null
    messages?: {
      __typename: "ModelMessageConnection"
      items: Array<{
        __typename: "Message"
        id: string
        content: string
        when: string
        attachment?: string | null
        attachmentName?: string | null
        attachmentOwner?: string | null
        roomId?: string | null
        userId?: string | null
        postingAs?: string | null
        owner?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    eventType?: string | null
    eventUrl?: string | null
    tz?: string | null
    isSponsored?: string | null
    createdAt: string
    updatedAt: string
    ownerUser?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type CreateOrganizationMemberMutationVariables = {
  input?: CreateOrganizationMemberInput
}

export type CreateOrganizationMemberMutation = {
  createOrganizationMember?: {
    __typename: "OrganizationMember"
    id: string
    userRole: string
    userId: string
    organizationId: string
    organizationName?: string | null
    organization: {
      __typename: "Organization"
      id: string
      orgName: string
      adminEmail?: string | null
      phone?: string | null
      admins: Array<string>
      superAdmin: string
      hasPaidState?: string | null
      profileState?: string | null
      address?: string | null
      city?: string | null
      province?: string | null
      postalCode?: string | null
      country?: string | null
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
      orgType?: string | null
      orgSize?: string | null
      denomination?: string | null
      pplServed?: string | null
      sundayAttendance?: string | null
      numberVolunteers?: string | null
      orgDescription?: string | null
      joined?: string | null
      parentOrganizationId: string
      parentOrganization?: {
        __typename: "Organization"
        id: string
        orgName: string
        adminEmail?: string | null
        phone?: string | null
        admins: Array<string>
        superAdmin: string
        hasPaidState?: string | null
        profileState?: string | null
        address?: string | null
        city?: string | null
        province?: string | null
        postalCode?: string | null
        country?: string | null
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
        parentOrganizationId: string
        createdAt: string
        updatedAt: string
      } | null
      subOrganizations?: {
        __typename: "ModelOrganizationConnection"
        nextToken?: string | null
      } | null
      members?: {
        __typename: "ModelOrganizationMemberConnection"
        nextToken?: string | null
      } | null
      ownsGroups?: {
        __typename: "ModelGroupConnection"
        nextToken?: string | null
      } | null
      resource?: {
        __typename: "ModelResourceRootConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    }
    createdAt: string
    updatedAt: string
    user: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
    }
  } | null
}

export type UpdateOrganizationMemberMutationVariables = {
  input?: UpdateOrganizationMemberInput
}

export type UpdateOrganizationMemberMutation = {
  updateOrganizationMember?: {
    __typename: "OrganizationMember"
    id: string
    userRole: string
    userId: string
    organizationId: string
    organizationName?: string | null
    organization: {
      __typename: "Organization"
      id: string
      orgName: string
      adminEmail?: string | null
      phone?: string | null
      admins: Array<string>
      superAdmin: string
      hasPaidState?: string | null
      profileState?: string | null
      address?: string | null
      city?: string | null
      province?: string | null
      postalCode?: string | null
      country?: string | null
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
      orgType?: string | null
      orgSize?: string | null
      denomination?: string | null
      pplServed?: string | null
      sundayAttendance?: string | null
      numberVolunteers?: string | null
      orgDescription?: string | null
      joined?: string | null
      parentOrganizationId: string
      parentOrganization?: {
        __typename: "Organization"
        id: string
        orgName: string
        adminEmail?: string | null
        phone?: string | null
        admins: Array<string>
        superAdmin: string
        hasPaidState?: string | null
        profileState?: string | null
        address?: string | null
        city?: string | null
        province?: string | null
        postalCode?: string | null
        country?: string | null
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
        parentOrganizationId: string
        createdAt: string
        updatedAt: string
      } | null
      subOrganizations?: {
        __typename: "ModelOrganizationConnection"
        nextToken?: string | null
      } | null
      members?: {
        __typename: "ModelOrganizationMemberConnection"
        nextToken?: string | null
      } | null
      ownsGroups?: {
        __typename: "ModelGroupConnection"
        nextToken?: string | null
      } | null
      resource?: {
        __typename: "ModelResourceRootConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    }
    createdAt: string
    updatedAt: string
    user: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
    }
  } | null
}

export type DeleteOrganizationMemberMutationVariables = {
  input?: DeleteOrganizationMemberInput
}

export type DeleteOrganizationMemberMutation = {
  deleteOrganizationMember?: {
    __typename: "OrganizationMember"
    id: string
    userRole: string
    userId: string
    organizationId: string
    organizationName?: string | null
    organization: {
      __typename: "Organization"
      id: string
      orgName: string
      adminEmail?: string | null
      phone?: string | null
      admins: Array<string>
      superAdmin: string
      hasPaidState?: string | null
      profileState?: string | null
      address?: string | null
      city?: string | null
      province?: string | null
      postalCode?: string | null
      country?: string | null
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
      orgType?: string | null
      orgSize?: string | null
      denomination?: string | null
      pplServed?: string | null
      sundayAttendance?: string | null
      numberVolunteers?: string | null
      orgDescription?: string | null
      joined?: string | null
      parentOrganizationId: string
      parentOrganization?: {
        __typename: "Organization"
        id: string
        orgName: string
        adminEmail?: string | null
        phone?: string | null
        admins: Array<string>
        superAdmin: string
        hasPaidState?: string | null
        profileState?: string | null
        address?: string | null
        city?: string | null
        province?: string | null
        postalCode?: string | null
        country?: string | null
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
        parentOrganizationId: string
        createdAt: string
        updatedAt: string
      } | null
      subOrganizations?: {
        __typename: "ModelOrganizationConnection"
        nextToken?: string | null
      } | null
      members?: {
        __typename: "ModelOrganizationMemberConnection"
        nextToken?: string | null
      } | null
      ownsGroups?: {
        __typename: "ModelGroupConnection"
        nextToken?: string | null
      } | null
      resource?: {
        __typename: "ModelResourceRootConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    }
    createdAt: string
    updatedAt: string
    user: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
    }
  } | null
}

export type CreateOrganizationMutationVariables = {
  input?: CreateOrganizationInput
}

export type CreateOrganizationMutation = {
  createOrganization?: {
    __typename: "Organization"
    id: string
    orgName: string
    adminEmail?: string | null
    phone?: string | null
    admins: Array<string>
    superAdmin: string
    hasPaidState?: string | null
    profileState?: string | null
    address?: string | null
    city?: string | null
    province?: string | null
    postalCode?: string | null
    country?: string | null
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
    orgType?: string | null
    orgSize?: string | null
    denomination?: string | null
    pplServed?: string | null
    sundayAttendance?: string | null
    numberVolunteers?: string | null
    orgDescription?: string | null
    joined?: string | null
    parentOrganizationId: string
    parentOrganization?: {
      __typename: "Organization"
      id: string
      orgName: string
      adminEmail?: string | null
      phone?: string | null
      admins: Array<string>
      superAdmin: string
      hasPaidState?: string | null
      profileState?: string | null
      address?: string | null
      city?: string | null
      province?: string | null
      postalCode?: string | null
      country?: string | null
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
      orgType?: string | null
      orgSize?: string | null
      denomination?: string | null
      pplServed?: string | null
      sundayAttendance?: string | null
      numberVolunteers?: string | null
      orgDescription?: string | null
      joined?: string | null
      parentOrganizationId: string
      parentOrganization?: {
        __typename: "Organization"
        id: string
        orgName: string
        adminEmail?: string | null
        phone?: string | null
        admins: Array<string>
        superAdmin: string
        hasPaidState?: string | null
        profileState?: string | null
        address?: string | null
        city?: string | null
        province?: string | null
        postalCode?: string | null
        country?: string | null
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
        parentOrganizationId: string
        createdAt: string
        updatedAt: string
      } | null
      subOrganizations?: {
        __typename: "ModelOrganizationConnection"
        nextToken?: string | null
      } | null
      members?: {
        __typename: "ModelOrganizationMemberConnection"
        nextToken?: string | null
      } | null
      ownsGroups?: {
        __typename: "ModelGroupConnection"
        nextToken?: string | null
      } | null
      resource?: {
        __typename: "ModelResourceRootConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    subOrganizations?: {
      __typename: "ModelOrganizationConnection"
      items: Array<{
        __typename: "Organization"
        id: string
        orgName: string
        adminEmail?: string | null
        phone?: string | null
        admins: Array<string>
        superAdmin: string
        hasPaidState?: string | null
        profileState?: string | null
        address?: string | null
        city?: string | null
        province?: string | null
        postalCode?: string | null
        country?: string | null
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
        parentOrganizationId: string
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    members?: {
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
    ownsGroups?: {
      __typename: "ModelGroupConnection"
      items: Array<{
        __typename: "Group"
        id: string
        owner: string
        readGroups?: Array<UserGroupType | null> | null
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
    resource?: {
      __typename: "ModelResourceRootConnection"
      items: Array<{
        __typename: "ResourceRoot"
        id: string
        type?: string | null
        groupId?: string | null
        organizationId: string
        owner?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type UpdateOrganizationMutationVariables = {
  input?: UpdateOrganizationInput
}

export type UpdateOrganizationMutation = {
  updateOrganization?: {
    __typename: "Organization"
    id: string
    orgName: string
    adminEmail?: string | null
    phone?: string | null
    admins: Array<string>
    superAdmin: string
    hasPaidState?: string | null
    profileState?: string | null
    address?: string | null
    city?: string | null
    province?: string | null
    postalCode?: string | null
    country?: string | null
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
    orgType?: string | null
    orgSize?: string | null
    denomination?: string | null
    pplServed?: string | null
    sundayAttendance?: string | null
    numberVolunteers?: string | null
    orgDescription?: string | null
    joined?: string | null
    parentOrganizationId: string
    parentOrganization?: {
      __typename: "Organization"
      id: string
      orgName: string
      adminEmail?: string | null
      phone?: string | null
      admins: Array<string>
      superAdmin: string
      hasPaidState?: string | null
      profileState?: string | null
      address?: string | null
      city?: string | null
      province?: string | null
      postalCode?: string | null
      country?: string | null
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
      orgType?: string | null
      orgSize?: string | null
      denomination?: string | null
      pplServed?: string | null
      sundayAttendance?: string | null
      numberVolunteers?: string | null
      orgDescription?: string | null
      joined?: string | null
      parentOrganizationId: string
      parentOrganization?: {
        __typename: "Organization"
        id: string
        orgName: string
        adminEmail?: string | null
        phone?: string | null
        admins: Array<string>
        superAdmin: string
        hasPaidState?: string | null
        profileState?: string | null
        address?: string | null
        city?: string | null
        province?: string | null
        postalCode?: string | null
        country?: string | null
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
        parentOrganizationId: string
        createdAt: string
        updatedAt: string
      } | null
      subOrganizations?: {
        __typename: "ModelOrganizationConnection"
        nextToken?: string | null
      } | null
      members?: {
        __typename: "ModelOrganizationMemberConnection"
        nextToken?: string | null
      } | null
      ownsGroups?: {
        __typename: "ModelGroupConnection"
        nextToken?: string | null
      } | null
      resource?: {
        __typename: "ModelResourceRootConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    subOrganizations?: {
      __typename: "ModelOrganizationConnection"
      items: Array<{
        __typename: "Organization"
        id: string
        orgName: string
        adminEmail?: string | null
        phone?: string | null
        admins: Array<string>
        superAdmin: string
        hasPaidState?: string | null
        profileState?: string | null
        address?: string | null
        city?: string | null
        province?: string | null
        postalCode?: string | null
        country?: string | null
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
        parentOrganizationId: string
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    members?: {
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
    ownsGroups?: {
      __typename: "ModelGroupConnection"
      items: Array<{
        __typename: "Group"
        id: string
        owner: string
        readGroups?: Array<UserGroupType | null> | null
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
    resource?: {
      __typename: "ModelResourceRootConnection"
      items: Array<{
        __typename: "ResourceRoot"
        id: string
        type?: string | null
        groupId?: string | null
        organizationId: string
        owner?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type DeleteOrganizationMutationVariables = {
  input?: DeleteOrganizationInput
}

export type DeleteOrganizationMutation = {
  deleteOrganization?: {
    __typename: "Organization"
    id: string
    orgName: string
    adminEmail?: string | null
    phone?: string | null
    admins: Array<string>
    superAdmin: string
    hasPaidState?: string | null
    profileState?: string | null
    address?: string | null
    city?: string | null
    province?: string | null
    postalCode?: string | null
    country?: string | null
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
    orgType?: string | null
    orgSize?: string | null
    denomination?: string | null
    pplServed?: string | null
    sundayAttendance?: string | null
    numberVolunteers?: string | null
    orgDescription?: string | null
    joined?: string | null
    parentOrganizationId: string
    parentOrganization?: {
      __typename: "Organization"
      id: string
      orgName: string
      adminEmail?: string | null
      phone?: string | null
      admins: Array<string>
      superAdmin: string
      hasPaidState?: string | null
      profileState?: string | null
      address?: string | null
      city?: string | null
      province?: string | null
      postalCode?: string | null
      country?: string | null
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
      orgType?: string | null
      orgSize?: string | null
      denomination?: string | null
      pplServed?: string | null
      sundayAttendance?: string | null
      numberVolunteers?: string | null
      orgDescription?: string | null
      joined?: string | null
      parentOrganizationId: string
      parentOrganization?: {
        __typename: "Organization"
        id: string
        orgName: string
        adminEmail?: string | null
        phone?: string | null
        admins: Array<string>
        superAdmin: string
        hasPaidState?: string | null
        profileState?: string | null
        address?: string | null
        city?: string | null
        province?: string | null
        postalCode?: string | null
        country?: string | null
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
        parentOrganizationId: string
        createdAt: string
        updatedAt: string
      } | null
      subOrganizations?: {
        __typename: "ModelOrganizationConnection"
        nextToken?: string | null
      } | null
      members?: {
        __typename: "ModelOrganizationMemberConnection"
        nextToken?: string | null
      } | null
      ownsGroups?: {
        __typename: "ModelGroupConnection"
        nextToken?: string | null
      } | null
      resource?: {
        __typename: "ModelResourceRootConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    subOrganizations?: {
      __typename: "ModelOrganizationConnection"
      items: Array<{
        __typename: "Organization"
        id: string
        orgName: string
        adminEmail?: string | null
        phone?: string | null
        admins: Array<string>
        superAdmin: string
        hasPaidState?: string | null
        profileState?: string | null
        address?: string | null
        city?: string | null
        province?: string | null
        postalCode?: string | null
        country?: string | null
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
        parentOrganizationId: string
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    members?: {
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
    ownsGroups?: {
      __typename: "ModelGroupConnection"
      items: Array<{
        __typename: "Group"
        id: string
        owner: string
        readGroups?: Array<UserGroupType | null> | null
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
    resource?: {
      __typename: "ModelResourceRootConnection"
      items: Array<{
        __typename: "ResourceRoot"
        id: string
        type?: string | null
        groupId?: string | null
        organizationId: string
        owner?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type CreateActivityMutationVariables = {
  input?: CreateActivityInput
}

export type CreateActivityMutation = {
  createActivity?: {
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
    owner?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type UpdateActivityMutationVariables = {
  input?: UpdateActivityInput
}

export type UpdateActivityMutation = {
  updateActivity?: {
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
    owner?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type DeleteActivityMutationVariables = {
  input?: DeleteActivityInput
}

export type DeleteActivityMutation = {
  deleteActivity?: {
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
    owner?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type CreatePaymentMutationVariables = {
  input?: CreatePaymentInput
}

export type CreatePaymentMutation = {
  createPayment?: {
    __typename: "Payment"
    id: string
    productID?: string | null
    product?: {
      __typename: "Product"
      id: string
      price?: number | null
      pricePer?: string | null
      name?: string | null
      description?: string | null
      confirmationMsg?: string | null
      payments?: {
        __typename: "ModelPaymentConnection"
        nextToken?: string | null
      } | null
      isOrgTier?: string | null
      isIndividualTier?: string | null
      isLogin?: string | null
      marketingDescription?: string | null
      groupsIncluded?: Array<string | null> | null
      enabled?: string | null
      isStripe?: string | null
      isPaypal?: string | null
      tiered?: Array<{
        __typename: "TieredProduct"
        name?: string | null
        stripePaymentID?: string | null
        stripeIsTiered?: string | null
      } | null> | null
      createdAt: string
      updatedAt: string
    } | null
    userID?: string | null
    dateCompleted?: string | null
    paymentType?: string | null
    paymentInfo?: string | null
    createdAt: string
    updatedAt: string
    user?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type UpdatePaymentMutationVariables = {
  input?: UpdatePaymentInput
}

export type UpdatePaymentMutation = {
  updatePayment?: {
    __typename: "Payment"
    id: string
    productID?: string | null
    product?: {
      __typename: "Product"
      id: string
      price?: number | null
      pricePer?: string | null
      name?: string | null
      description?: string | null
      confirmationMsg?: string | null
      payments?: {
        __typename: "ModelPaymentConnection"
        nextToken?: string | null
      } | null
      isOrgTier?: string | null
      isIndividualTier?: string | null
      isLogin?: string | null
      marketingDescription?: string | null
      groupsIncluded?: Array<string | null> | null
      enabled?: string | null
      isStripe?: string | null
      isPaypal?: string | null
      tiered?: Array<{
        __typename: "TieredProduct"
        name?: string | null
        stripePaymentID?: string | null
        stripeIsTiered?: string | null
      } | null> | null
      createdAt: string
      updatedAt: string
    } | null
    userID?: string | null
    dateCompleted?: string | null
    paymentType?: string | null
    paymentInfo?: string | null
    createdAt: string
    updatedAt: string
    user?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type DeletePaymentMutationVariables = {
  input?: DeletePaymentInput
}

export type DeletePaymentMutation = {
  deletePayment?: {
    __typename: "Payment"
    id: string
    productID?: string | null
    product?: {
      __typename: "Product"
      id: string
      price?: number | null
      pricePer?: string | null
      name?: string | null
      description?: string | null
      confirmationMsg?: string | null
      payments?: {
        __typename: "ModelPaymentConnection"
        nextToken?: string | null
      } | null
      isOrgTier?: string | null
      isIndividualTier?: string | null
      isLogin?: string | null
      marketingDescription?: string | null
      groupsIncluded?: Array<string | null> | null
      enabled?: string | null
      isStripe?: string | null
      isPaypal?: string | null
      tiered?: Array<{
        __typename: "TieredProduct"
        name?: string | null
        stripePaymentID?: string | null
        stripeIsTiered?: string | null
      } | null> | null
      createdAt: string
      updatedAt: string
    } | null
    userID?: string | null
    dateCompleted?: string | null
    paymentType?: string | null
    paymentInfo?: string | null
    createdAt: string
    updatedAt: string
    user?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type CreateCourseInfoMutationVariables = {
  input?: CreateCourseInfoInput
}

export type CreateCourseInfoMutation = {
  createCourseInfo?: {
    __typename: "CourseInfo"
    id: string
    designedBy?: string | null
    summary?: string | null
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
        courseInfoID?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    subTitle?: string | null
    instructors?: {
      __typename: "ModelCourseInstructorsConnection"
      items: Array<{
        __typename: "CourseInstructors"
        id: string
        courseInfoID?: string | null
        userID?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    backOfficeStaff?: {
      __typename: "ModelCourseBackOfficeStaffConnection"
      items: Array<{
        __typename: "CourseBackOfficeStaff"
        id: string
        courseInfoID?: string | null
        userID?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    triads?: {
      __typename: "ModelCourseTriadsConnection"
      items: Array<{
        __typename: "CourseTriads"
        id: string
        courseInfoID?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    introduction?: string | null
    sylabusAttachment?: string | null
    sylabusAttachmentName?: string | null
    sylabusAttachmentOwner?: string | null
    createdAt: string
    updatedAt: string
  } | null
}

export type UpdateCourseInfoMutationVariables = {
  input?: UpdateCourseInfoInput
}

export type UpdateCourseInfoMutation = {
  updateCourseInfo?: {
    __typename: "CourseInfo"
    id: string
    designedBy?: string | null
    summary?: string | null
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
        courseInfoID?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    subTitle?: string | null
    instructors?: {
      __typename: "ModelCourseInstructorsConnection"
      items: Array<{
        __typename: "CourseInstructors"
        id: string
        courseInfoID?: string | null
        userID?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    backOfficeStaff?: {
      __typename: "ModelCourseBackOfficeStaffConnection"
      items: Array<{
        __typename: "CourseBackOfficeStaff"
        id: string
        courseInfoID?: string | null
        userID?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    triads?: {
      __typename: "ModelCourseTriadsConnection"
      items: Array<{
        __typename: "CourseTriads"
        id: string
        courseInfoID?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    introduction?: string | null
    sylabusAttachment?: string | null
    sylabusAttachmentName?: string | null
    sylabusAttachmentOwner?: string | null
    createdAt: string
    updatedAt: string
  } | null
}

export type DeleteCourseInfoMutationVariables = {
  input?: DeleteCourseInfoInput
}

export type DeleteCourseInfoMutation = {
  deleteCourseInfo?: {
    __typename: "CourseInfo"
    id: string
    designedBy?: string | null
    summary?: string | null
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
        courseInfoID?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    subTitle?: string | null
    instructors?: {
      __typename: "ModelCourseInstructorsConnection"
      items: Array<{
        __typename: "CourseInstructors"
        id: string
        courseInfoID?: string | null
        userID?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    backOfficeStaff?: {
      __typename: "ModelCourseBackOfficeStaffConnection"
      items: Array<{
        __typename: "CourseBackOfficeStaff"
        id: string
        courseInfoID?: string | null
        userID?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    triads?: {
      __typename: "ModelCourseTriadsConnection"
      items: Array<{
        __typename: "CourseTriads"
        id: string
        courseInfoID?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    introduction?: string | null
    sylabusAttachment?: string | null
    sylabusAttachmentName?: string | null
    sylabusAttachmentOwner?: string | null
    createdAt: string
    updatedAt: string
  } | null
}

export type CreateCourseTriadsMutationVariables = {
  input?: CreateCourseTriadsInput
}

export type CreateCourseTriadsMutation = {
  createCourseTriads?: {
    __typename: "CourseTriads"
    id: string
    courseInfoID?: string | null
    courseInfo?: {
      __typename: "CourseInfo"
      id: string
      designedBy?: string | null
      summary?: string | null
      courseWeeks?: {
        __typename: "ModelCourseWeekConnection"
        nextToken?: string | null
      } | null
      subTitle?: string | null
      instructors?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      backOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      triads?: {
        __typename: "ModelCourseTriadsConnection"
        nextToken?: string | null
      } | null
      introduction?: string | null
      sylabusAttachment?: string | null
      sylabusAttachmentName?: string | null
      sylabusAttachmentOwner?: string | null
      createdAt: string
      updatedAt: string
    } | null
    coaches?: {
      __typename: "ModelCourseTriadCoachesConnection"
      items: Array<{
        __typename: "CourseTriadCoaches"
        id: string
        triadID?: string | null
        userID?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    users?: {
      __typename: "ModelCourseTriadUsersConnection"
      items: Array<{
        __typename: "CourseTriadUsers"
        id: string
        triadID?: string | null
        userID?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type UpdateCourseTriadsMutationVariables = {
  input?: UpdateCourseTriadsInput
}

export type UpdateCourseTriadsMutation = {
  updateCourseTriads?: {
    __typename: "CourseTriads"
    id: string
    courseInfoID?: string | null
    courseInfo?: {
      __typename: "CourseInfo"
      id: string
      designedBy?: string | null
      summary?: string | null
      courseWeeks?: {
        __typename: "ModelCourseWeekConnection"
        nextToken?: string | null
      } | null
      subTitle?: string | null
      instructors?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      backOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      triads?: {
        __typename: "ModelCourseTriadsConnection"
        nextToken?: string | null
      } | null
      introduction?: string | null
      sylabusAttachment?: string | null
      sylabusAttachmentName?: string | null
      sylabusAttachmentOwner?: string | null
      createdAt: string
      updatedAt: string
    } | null
    coaches?: {
      __typename: "ModelCourseTriadCoachesConnection"
      items: Array<{
        __typename: "CourseTriadCoaches"
        id: string
        triadID?: string | null
        userID?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    users?: {
      __typename: "ModelCourseTriadUsersConnection"
      items: Array<{
        __typename: "CourseTriadUsers"
        id: string
        triadID?: string | null
        userID?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type DeleteCourseTriadsMutationVariables = {
  input?: DeleteCourseTriadsInput
}

export type DeleteCourseTriadsMutation = {
  deleteCourseTriads?: {
    __typename: "CourseTriads"
    id: string
    courseInfoID?: string | null
    courseInfo?: {
      __typename: "CourseInfo"
      id: string
      designedBy?: string | null
      summary?: string | null
      courseWeeks?: {
        __typename: "ModelCourseWeekConnection"
        nextToken?: string | null
      } | null
      subTitle?: string | null
      instructors?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      backOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      triads?: {
        __typename: "ModelCourseTriadsConnection"
        nextToken?: string | null
      } | null
      introduction?: string | null
      sylabusAttachment?: string | null
      sylabusAttachmentName?: string | null
      sylabusAttachmentOwner?: string | null
      createdAt: string
      updatedAt: string
    } | null
    coaches?: {
      __typename: "ModelCourseTriadCoachesConnection"
      items: Array<{
        __typename: "CourseTriadCoaches"
        id: string
        triadID?: string | null
        userID?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    users?: {
      __typename: "ModelCourseTriadUsersConnection"
      items: Array<{
        __typename: "CourseTriadUsers"
        id: string
        triadID?: string | null
        userID?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type CreateCourseBackOfficeStaffMutationVariables = {
  input?: CreateCourseBackOfficeStaffInput
}

export type CreateCourseBackOfficeStaffMutation = {
  createCourseBackOfficeStaff?: {
    __typename: "CourseBackOfficeStaff"
    id: string
    courseInfoID?: string | null
    courseInfo?: {
      __typename: "CourseInfo"
      id: string
      designedBy?: string | null
      summary?: string | null
      courseWeeks?: {
        __typename: "ModelCourseWeekConnection"
        nextToken?: string | null
      } | null
      subTitle?: string | null
      instructors?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      backOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      triads?: {
        __typename: "ModelCourseTriadsConnection"
        nextToken?: string | null
      } | null
      introduction?: string | null
      sylabusAttachment?: string | null
      sylabusAttachmentName?: string | null
      sylabusAttachmentOwner?: string | null
      createdAt: string
      updatedAt: string
    } | null
    userID?: string | null
    createdAt: string
    updatedAt: string
    user?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type UpdateCourseBackOfficeStaffMutationVariables = {
  input?: UpdateCourseBackOfficeStaffInput
}

export type UpdateCourseBackOfficeStaffMutation = {
  updateCourseBackOfficeStaff?: {
    __typename: "CourseBackOfficeStaff"
    id: string
    courseInfoID?: string | null
    courseInfo?: {
      __typename: "CourseInfo"
      id: string
      designedBy?: string | null
      summary?: string | null
      courseWeeks?: {
        __typename: "ModelCourseWeekConnection"
        nextToken?: string | null
      } | null
      subTitle?: string | null
      instructors?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      backOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      triads?: {
        __typename: "ModelCourseTriadsConnection"
        nextToken?: string | null
      } | null
      introduction?: string | null
      sylabusAttachment?: string | null
      sylabusAttachmentName?: string | null
      sylabusAttachmentOwner?: string | null
      createdAt: string
      updatedAt: string
    } | null
    userID?: string | null
    createdAt: string
    updatedAt: string
    user?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type DeleteCourseBackOfficeStaffMutationVariables = {
  input?: DeleteCourseBackOfficeStaffInput
}

export type DeleteCourseBackOfficeStaffMutation = {
  deleteCourseBackOfficeStaff?: {
    __typename: "CourseBackOfficeStaff"
    id: string
    courseInfoID?: string | null
    courseInfo?: {
      __typename: "CourseInfo"
      id: string
      designedBy?: string | null
      summary?: string | null
      courseWeeks?: {
        __typename: "ModelCourseWeekConnection"
        nextToken?: string | null
      } | null
      subTitle?: string | null
      instructors?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      backOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      triads?: {
        __typename: "ModelCourseTriadsConnection"
        nextToken?: string | null
      } | null
      introduction?: string | null
      sylabusAttachment?: string | null
      sylabusAttachmentName?: string | null
      sylabusAttachmentOwner?: string | null
      createdAt: string
      updatedAt: string
    } | null
    userID?: string | null
    createdAt: string
    updatedAt: string
    user?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type CreateCourseInstructorsMutationVariables = {
  input?: CreateCourseInstructorsInput
}

export type CreateCourseInstructorsMutation = {
  createCourseInstructors?: {
    __typename: "CourseInstructors"
    id: string
    courseInfoID?: string | null
    courseInfo?: {
      __typename: "CourseInfo"
      id: string
      designedBy?: string | null
      summary?: string | null
      courseWeeks?: {
        __typename: "ModelCourseWeekConnection"
        nextToken?: string | null
      } | null
      subTitle?: string | null
      instructors?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      backOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      triads?: {
        __typename: "ModelCourseTriadsConnection"
        nextToken?: string | null
      } | null
      introduction?: string | null
      sylabusAttachment?: string | null
      sylabusAttachmentName?: string | null
      sylabusAttachmentOwner?: string | null
      createdAt: string
      updatedAt: string
    } | null
    userID?: string | null
    createdAt: string
    updatedAt: string
    user?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type UpdateCourseInstructorsMutationVariables = {
  input?: UpdateCourseInstructorsInput
}

export type UpdateCourseInstructorsMutation = {
  updateCourseInstructors?: {
    __typename: "CourseInstructors"
    id: string
    courseInfoID?: string | null
    courseInfo?: {
      __typename: "CourseInfo"
      id: string
      designedBy?: string | null
      summary?: string | null
      courseWeeks?: {
        __typename: "ModelCourseWeekConnection"
        nextToken?: string | null
      } | null
      subTitle?: string | null
      instructors?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      backOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      triads?: {
        __typename: "ModelCourseTriadsConnection"
        nextToken?: string | null
      } | null
      introduction?: string | null
      sylabusAttachment?: string | null
      sylabusAttachmentName?: string | null
      sylabusAttachmentOwner?: string | null
      createdAt: string
      updatedAt: string
    } | null
    userID?: string | null
    createdAt: string
    updatedAt: string
    user?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type DeleteCourseInstructorsMutationVariables = {
  input?: DeleteCourseInstructorsInput
}

export type DeleteCourseInstructorsMutation = {
  deleteCourseInstructors?: {
    __typename: "CourseInstructors"
    id: string
    courseInfoID?: string | null
    courseInfo?: {
      __typename: "CourseInfo"
      id: string
      designedBy?: string | null
      summary?: string | null
      courseWeeks?: {
        __typename: "ModelCourseWeekConnection"
        nextToken?: string | null
      } | null
      subTitle?: string | null
      instructors?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      backOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      triads?: {
        __typename: "ModelCourseTriadsConnection"
        nextToken?: string | null
      } | null
      introduction?: string | null
      sylabusAttachment?: string | null
      sylabusAttachmentName?: string | null
      sylabusAttachmentOwner?: string | null
      createdAt: string
      updatedAt: string
    } | null
    userID?: string | null
    createdAt: string
    updatedAt: string
    user?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type CreateCourseTriadCoachesMutationVariables = {
  input?: CreateCourseTriadCoachesInput
}

export type CreateCourseTriadCoachesMutation = {
  createCourseTriadCoaches?: {
    __typename: "CourseTriadCoaches"
    id: string
    triadID?: string | null
    triad?: {
      __typename: "CourseTriads"
      id: string
      courseInfoID?: string | null
      courseInfo?: {
        __typename: "CourseInfo"
        id: string
        designedBy?: string | null
        summary?: string | null
        subTitle?: string | null
        introduction?: string | null
        sylabusAttachment?: string | null
        sylabusAttachmentName?: string | null
        sylabusAttachmentOwner?: string | null
        createdAt: string
        updatedAt: string
      } | null
      coaches?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      users?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    userID?: string | null
    createdAt: string
    updatedAt: string
    user?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type UpdateCourseTriadCoachesMutationVariables = {
  input?: UpdateCourseTriadCoachesInput
}

export type UpdateCourseTriadCoachesMutation = {
  updateCourseTriadCoaches?: {
    __typename: "CourseTriadCoaches"
    id: string
    triadID?: string | null
    triad?: {
      __typename: "CourseTriads"
      id: string
      courseInfoID?: string | null
      courseInfo?: {
        __typename: "CourseInfo"
        id: string
        designedBy?: string | null
        summary?: string | null
        subTitle?: string | null
        introduction?: string | null
        sylabusAttachment?: string | null
        sylabusAttachmentName?: string | null
        sylabusAttachmentOwner?: string | null
        createdAt: string
        updatedAt: string
      } | null
      coaches?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      users?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    userID?: string | null
    createdAt: string
    updatedAt: string
    user?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type DeleteCourseTriadCoachesMutationVariables = {
  input?: DeleteCourseTriadCoachesInput
}

export type DeleteCourseTriadCoachesMutation = {
  deleteCourseTriadCoaches?: {
    __typename: "CourseTriadCoaches"
    id: string
    triadID?: string | null
    triad?: {
      __typename: "CourseTriads"
      id: string
      courseInfoID?: string | null
      courseInfo?: {
        __typename: "CourseInfo"
        id: string
        designedBy?: string | null
        summary?: string | null
        subTitle?: string | null
        introduction?: string | null
        sylabusAttachment?: string | null
        sylabusAttachmentName?: string | null
        sylabusAttachmentOwner?: string | null
        createdAt: string
        updatedAt: string
      } | null
      coaches?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      users?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    userID?: string | null
    createdAt: string
    updatedAt: string
    user?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type CreateCourseTriadUsersMutationVariables = {
  input?: CreateCourseTriadUsersInput
}

export type CreateCourseTriadUsersMutation = {
  createCourseTriadUsers?: {
    __typename: "CourseTriadUsers"
    id: string
    triadID?: string | null
    triad?: {
      __typename: "CourseTriads"
      id: string
      courseInfoID?: string | null
      courseInfo?: {
        __typename: "CourseInfo"
        id: string
        designedBy?: string | null
        summary?: string | null
        subTitle?: string | null
        introduction?: string | null
        sylabusAttachment?: string | null
        sylabusAttachmentName?: string | null
        sylabusAttachmentOwner?: string | null
        createdAt: string
        updatedAt: string
      } | null
      coaches?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      users?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    userID?: string | null
    createdAt: string
    updatedAt: string
    user?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type UpdateCourseTriadUsersMutationVariables = {
  input?: UpdateCourseTriadUsersInput
}

export type UpdateCourseTriadUsersMutation = {
  updateCourseTriadUsers?: {
    __typename: "CourseTriadUsers"
    id: string
    triadID?: string | null
    triad?: {
      __typename: "CourseTriads"
      id: string
      courseInfoID?: string | null
      courseInfo?: {
        __typename: "CourseInfo"
        id: string
        designedBy?: string | null
        summary?: string | null
        subTitle?: string | null
        introduction?: string | null
        sylabusAttachment?: string | null
        sylabusAttachmentName?: string | null
        sylabusAttachmentOwner?: string | null
        createdAt: string
        updatedAt: string
      } | null
      coaches?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      users?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    userID?: string | null
    createdAt: string
    updatedAt: string
    user?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type DeleteCourseTriadUsersMutationVariables = {
  input?: DeleteCourseTriadUsersInput
}

export type DeleteCourseTriadUsersMutation = {
  deleteCourseTriadUsers?: {
    __typename: "CourseTriadUsers"
    id: string
    triadID?: string | null
    triad?: {
      __typename: "CourseTriads"
      id: string
      courseInfoID?: string | null
      courseInfo?: {
        __typename: "CourseInfo"
        id: string
        designedBy?: string | null
        summary?: string | null
        subTitle?: string | null
        introduction?: string | null
        sylabusAttachment?: string | null
        sylabusAttachmentName?: string | null
        sylabusAttachmentOwner?: string | null
        createdAt: string
        updatedAt: string
      } | null
      coaches?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      users?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    userID?: string | null
    createdAt: string
    updatedAt: string
    user?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type CreateCourseWeekMutationVariables = {
  input?: CreateCourseWeekInput
}

export type CreateCourseWeekMutation = {
  createCourseWeek?: {
    __typename: "CourseWeek"
    id: string
    week?: string | null
    date?: string | null
    tz?: string | null
    name?: string | null
    title?: string | null
    leader?: string | null
    courseInfoID?: string | null
    courseInfo?: {
      __typename: "CourseInfo"
      id: string
      designedBy?: string | null
      summary?: string | null
      courseWeeks?: {
        __typename: "ModelCourseWeekConnection"
        nextToken?: string | null
      } | null
      subTitle?: string | null
      instructors?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      backOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      triads?: {
        __typename: "ModelCourseTriadsConnection"
        nextToken?: string | null
      } | null
      introduction?: string | null
      sylabusAttachment?: string | null
      sylabusAttachmentName?: string | null
      sylabusAttachmentOwner?: string | null
      createdAt: string
      updatedAt: string
    } | null
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
        zoomUrl?: string | null
        zoomRecording?: string | null
        courseLessonResponseId?: string | null
        wordCount?: string | null
        description?: string | null
        courseWeekID?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type UpdateCourseWeekMutationVariables = {
  input?: UpdateCourseWeekInput
}

export type UpdateCourseWeekMutation = {
  updateCourseWeek?: {
    __typename: "CourseWeek"
    id: string
    week?: string | null
    date?: string | null
    tz?: string | null
    name?: string | null
    title?: string | null
    leader?: string | null
    courseInfoID?: string | null
    courseInfo?: {
      __typename: "CourseInfo"
      id: string
      designedBy?: string | null
      summary?: string | null
      courseWeeks?: {
        __typename: "ModelCourseWeekConnection"
        nextToken?: string | null
      } | null
      subTitle?: string | null
      instructors?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      backOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      triads?: {
        __typename: "ModelCourseTriadsConnection"
        nextToken?: string | null
      } | null
      introduction?: string | null
      sylabusAttachment?: string | null
      sylabusAttachmentName?: string | null
      sylabusAttachmentOwner?: string | null
      createdAt: string
      updatedAt: string
    } | null
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
        zoomUrl?: string | null
        zoomRecording?: string | null
        courseLessonResponseId?: string | null
        wordCount?: string | null
        description?: string | null
        courseWeekID?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type DeleteCourseWeekMutationVariables = {
  input?: DeleteCourseWeekInput
}

export type DeleteCourseWeekMutation = {
  deleteCourseWeek?: {
    __typename: "CourseWeek"
    id: string
    week?: string | null
    date?: string | null
    tz?: string | null
    name?: string | null
    title?: string | null
    leader?: string | null
    courseInfoID?: string | null
    courseInfo?: {
      __typename: "CourseInfo"
      id: string
      designedBy?: string | null
      summary?: string | null
      courseWeeks?: {
        __typename: "ModelCourseWeekConnection"
        nextToken?: string | null
      } | null
      subTitle?: string | null
      instructors?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      backOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      triads?: {
        __typename: "ModelCourseTriadsConnection"
        nextToken?: string | null
      } | null
      introduction?: string | null
      sylabusAttachment?: string | null
      sylabusAttachmentName?: string | null
      sylabusAttachmentOwner?: string | null
      createdAt: string
      updatedAt: string
    } | null
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
        zoomUrl?: string | null
        zoomRecording?: string | null
        courseLessonResponseId?: string | null
        wordCount?: string | null
        description?: string | null
        courseWeekID?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type CreateCourseLessonMutationVariables = {
  input?: CreateCourseLessonInput
}

export type CreateCourseLessonMutation = {
  createCourseLesson?: {
    __typename: "CourseLesson"
    id: string
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
    courseWeek?: {
      __typename: "CourseWeek"
      id: string
      week?: string | null
      date?: string | null
      tz?: string | null
      name?: string | null
      title?: string | null
      leader?: string | null
      courseInfoID?: string | null
      courseInfo?: {
        __typename: "CourseInfo"
        id: string
        designedBy?: string | null
        summary?: string | null
        subTitle?: string | null
        introduction?: string | null
        sylabusAttachment?: string | null
        sylabusAttachmentName?: string | null
        sylabusAttachmentOwner?: string | null
        createdAt: string
        updatedAt: string
      } | null
      lessons?: {
        __typename: "ModelCourseLessonConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type UpdateCourseLessonMutationVariables = {
  input?: UpdateCourseLessonInput
}

export type UpdateCourseLessonMutation = {
  updateCourseLesson?: {
    __typename: "CourseLesson"
    id: string
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
    courseWeek?: {
      __typename: "CourseWeek"
      id: string
      week?: string | null
      date?: string | null
      tz?: string | null
      name?: string | null
      title?: string | null
      leader?: string | null
      courseInfoID?: string | null
      courseInfo?: {
        __typename: "CourseInfo"
        id: string
        designedBy?: string | null
        summary?: string | null
        subTitle?: string | null
        introduction?: string | null
        sylabusAttachment?: string | null
        sylabusAttachmentName?: string | null
        sylabusAttachmentOwner?: string | null
        createdAt: string
        updatedAt: string
      } | null
      lessons?: {
        __typename: "ModelCourseLessonConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type DeleteCourseLessonMutationVariables = {
  input?: DeleteCourseLessonInput
}

export type DeleteCourseLessonMutation = {
  deleteCourseLesson?: {
    __typename: "CourseLesson"
    id: string
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
    courseWeek?: {
      __typename: "CourseWeek"
      id: string
      week?: string | null
      date?: string | null
      tz?: string | null
      name?: string | null
      title?: string | null
      leader?: string | null
      courseInfoID?: string | null
      courseInfo?: {
        __typename: "CourseInfo"
        id: string
        designedBy?: string | null
        summary?: string | null
        subTitle?: string | null
        introduction?: string | null
        sylabusAttachment?: string | null
        sylabusAttachmentName?: string | null
        sylabusAttachmentOwner?: string | null
        createdAt: string
        updatedAt: string
      } | null
      lessons?: {
        __typename: "ModelCourseLessonConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type CreateDirectMessageUserMutationVariables = {
  input?: CreateDirectMessageUserInput
}

export type CreateDirectMessageUserMutation = {
  createDirectMessageUser?: {
    __typename: "DirectMessageUser"
    id: string
    userName?: string | null
    userID: string
    roomID: string
    room?: {
      __typename: "DirectMessageRoom"
      id: string
      name?: string | null
      messageUsers?: {
        __typename: "ModelDirectMessageUserConnection"
        nextToken?: string | null
      } | null
      directMessage?: {
        __typename: "ModelDirectMessageConnection"
        nextToken?: string | null
      } | null
      roomType?: string | null
      createdAt: string
      updatedAt: string
    } | null
    createdAt: string
    updatedAt: string
    user?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type UpdateDirectMessageUserMutationVariables = {
  input?: UpdateDirectMessageUserInput
}

export type UpdateDirectMessageUserMutation = {
  updateDirectMessageUser?: {
    __typename: "DirectMessageUser"
    id: string
    userName?: string | null
    userID: string
    roomID: string
    room?: {
      __typename: "DirectMessageRoom"
      id: string
      name?: string | null
      messageUsers?: {
        __typename: "ModelDirectMessageUserConnection"
        nextToken?: string | null
      } | null
      directMessage?: {
        __typename: "ModelDirectMessageConnection"
        nextToken?: string | null
      } | null
      roomType?: string | null
      createdAt: string
      updatedAt: string
    } | null
    createdAt: string
    updatedAt: string
    user?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type DeleteDirectMessageUserMutationVariables = {
  input?: DeleteDirectMessageUserInput
}

export type DeleteDirectMessageUserMutation = {
  deleteDirectMessageUser?: {
    __typename: "DirectMessageUser"
    id: string
    userName?: string | null
    userID: string
    roomID: string
    room?: {
      __typename: "DirectMessageRoom"
      id: string
      name?: string | null
      messageUsers?: {
        __typename: "ModelDirectMessageUserConnection"
        nextToken?: string | null
      } | null
      directMessage?: {
        __typename: "ModelDirectMessageConnection"
        nextToken?: string | null
      } | null
      roomType?: string | null
      createdAt: string
      updatedAt: string
    } | null
    createdAt: string
    updatedAt: string
    user?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type CreateDirectMessageRoomMutationVariables = {
  input?: CreateDirectMessageRoomInput
}

export type CreateDirectMessageRoomMutation = {
  createDirectMessageRoom?: {
    __typename: "DirectMessageRoom"
    id: string
    name?: string | null
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
        attachmentName?: string | null
        attachmentOwner?: string | null
        when: string
        recipients: Array<string | null>
        userId: string
        messageRoomID: string
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    roomType?: string | null
    createdAt: string
    updatedAt: string
  } | null
}

export type UpdateDirectMessageRoomMutationVariables = {
  input?: UpdateDirectMessageRoomInput
}

export type UpdateDirectMessageRoomMutation = {
  updateDirectMessageRoom?: {
    __typename: "DirectMessageRoom"
    id: string
    name?: string | null
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
        attachmentName?: string | null
        attachmentOwner?: string | null
        when: string
        recipients: Array<string | null>
        userId: string
        messageRoomID: string
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    roomType?: string | null
    createdAt: string
    updatedAt: string
  } | null
}

export type DeleteDirectMessageRoomMutationVariables = {
  input?: DeleteDirectMessageRoomInput
}

export type DeleteDirectMessageRoomMutation = {
  deleteDirectMessageRoom?: {
    __typename: "DirectMessageRoom"
    id: string
    name?: string | null
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
        attachmentName?: string | null
        attachmentOwner?: string | null
        when: string
        recipients: Array<string | null>
        userId: string
        messageRoomID: string
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    roomType?: string | null
    createdAt: string
    updatedAt: string
  } | null
}

export type CreateDirectMessageMutationVariables = {
  input?: CreateDirectMessageInput
}

export type CreateDirectMessageMutation = {
  createDirectMessage?: {
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
    messageRoom?: {
      __typename: "DirectMessageRoom"
      id: string
      name?: string | null
      messageUsers?: {
        __typename: "ModelDirectMessageUserConnection"
        nextToken?: string | null
      } | null
      directMessage?: {
        __typename: "ModelDirectMessageConnection"
        nextToken?: string | null
      } | null
      roomType?: string | null
      createdAt: string
      updatedAt: string
    } | null
    createdAt: string
    updatedAt: string
    author?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type UpdateDirectMessageMutationVariables = {
  input?: UpdateDirectMessageInput
}

export type UpdateDirectMessageMutation = {
  updateDirectMessage?: {
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
    messageRoom?: {
      __typename: "DirectMessageRoom"
      id: string
      name?: string | null
      messageUsers?: {
        __typename: "ModelDirectMessageUserConnection"
        nextToken?: string | null
      } | null
      directMessage?: {
        __typename: "ModelDirectMessageConnection"
        nextToken?: string | null
      } | null
      roomType?: string | null
      createdAt: string
      updatedAt: string
    } | null
    createdAt: string
    updatedAt: string
    author?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type DeleteDirectMessageMutationVariables = {
  input?: DeleteDirectMessageInput
}

export type DeleteDirectMessageMutation = {
  deleteDirectMessage?: {
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
    messageRoom?: {
      __typename: "DirectMessageRoom"
      id: string
      name?: string | null
      messageUsers?: {
        __typename: "ModelDirectMessageUserConnection"
        nextToken?: string | null
      } | null
      directMessage?: {
        __typename: "ModelDirectMessageConnection"
        nextToken?: string | null
      } | null
      roomType?: string | null
      createdAt: string
      updatedAt: string
    } | null
    createdAt: string
    updatedAt: string
    author?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type CreateDirectMessageReplyMutationVariables = {
  input?: CreateDirectMessageReplyInput
}

export type CreateDirectMessageReplyMutation = {
  createDirectMessageReply?: {
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
    parentMessage?: {
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
        nextToken?: string | null
      } | null
      messageRoomID: string
      messageRoom?: {
        __typename: "DirectMessageRoom"
        id: string
        name?: string | null
        roomType?: string | null
        createdAt: string
        updatedAt: string
      } | null
      createdAt: string
      updatedAt: string
      author?: {
        __typename: "User"
        id: string
        given_name: string
        family_name: string
        email?: string | null
        phone?: string | null
        owner?: string | null
        mainUserGroup?: string | null
        stripeCustomerID?: string | null
        stripeSubscriptionID?: string | null
        hasPaidState?: PaidState | null
        profileState?: string | null
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
        createdAt: string
        updatedAt: string
      } | null
    } | null
    messageRoomID?: string | null
    parentReplyId: string
    parentReply?: {
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
      parentMessage?: {
        __typename: "DirectMessage"
        id: string
        content?: string | null
        attachment?: string | null
        attachmentName?: string | null
        attachmentOwner?: string | null
        when: string
        recipients: Array<string | null>
        userId: string
        messageRoomID: string
        createdAt: string
        updatedAt: string
      } | null
      messageRoomID?: string | null
      parentReplyId: string
      parentReply?: {
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
      } | null
      subReplies?: {
        __typename: "ModelDirectMessageReplyConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
      author?: {
        __typename: "User"
        id: string
        given_name: string
        family_name: string
        email?: string | null
        phone?: string | null
        owner?: string | null
        mainUserGroup?: string | null
        stripeCustomerID?: string | null
        stripeSubscriptionID?: string | null
        hasPaidState?: PaidState | null
        profileState?: string | null
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
        createdAt: string
        updatedAt: string
      } | null
    } | null
    subReplies?: {
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
    createdAt: string
    updatedAt: string
    author?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type UpdateDirectMessageReplyMutationVariables = {
  input?: UpdateDirectMessageReplyInput
}

export type UpdateDirectMessageReplyMutation = {
  updateDirectMessageReply?: {
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
    parentMessage?: {
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
        nextToken?: string | null
      } | null
      messageRoomID: string
      messageRoom?: {
        __typename: "DirectMessageRoom"
        id: string
        name?: string | null
        roomType?: string | null
        createdAt: string
        updatedAt: string
      } | null
      createdAt: string
      updatedAt: string
      author?: {
        __typename: "User"
        id: string
        given_name: string
        family_name: string
        email?: string | null
        phone?: string | null
        owner?: string | null
        mainUserGroup?: string | null
        stripeCustomerID?: string | null
        stripeSubscriptionID?: string | null
        hasPaidState?: PaidState | null
        profileState?: string | null
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
        createdAt: string
        updatedAt: string
      } | null
    } | null
    messageRoomID?: string | null
    parentReplyId: string
    parentReply?: {
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
      parentMessage?: {
        __typename: "DirectMessage"
        id: string
        content?: string | null
        attachment?: string | null
        attachmentName?: string | null
        attachmentOwner?: string | null
        when: string
        recipients: Array<string | null>
        userId: string
        messageRoomID: string
        createdAt: string
        updatedAt: string
      } | null
      messageRoomID?: string | null
      parentReplyId: string
      parentReply?: {
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
      } | null
      subReplies?: {
        __typename: "ModelDirectMessageReplyConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
      author?: {
        __typename: "User"
        id: string
        given_name: string
        family_name: string
        email?: string | null
        phone?: string | null
        owner?: string | null
        mainUserGroup?: string | null
        stripeCustomerID?: string | null
        stripeSubscriptionID?: string | null
        hasPaidState?: PaidState | null
        profileState?: string | null
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
        createdAt: string
        updatedAt: string
      } | null
    } | null
    subReplies?: {
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
    createdAt: string
    updatedAt: string
    author?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type DeleteDirectMessageReplyMutationVariables = {
  input?: DeleteDirectMessageReplyInput
}

export type DeleteDirectMessageReplyMutation = {
  deleteDirectMessageReply?: {
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
    parentMessage?: {
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
        nextToken?: string | null
      } | null
      messageRoomID: string
      messageRoom?: {
        __typename: "DirectMessageRoom"
        id: string
        name?: string | null
        roomType?: string | null
        createdAt: string
        updatedAt: string
      } | null
      createdAt: string
      updatedAt: string
      author?: {
        __typename: "User"
        id: string
        given_name: string
        family_name: string
        email?: string | null
        phone?: string | null
        owner?: string | null
        mainUserGroup?: string | null
        stripeCustomerID?: string | null
        stripeSubscriptionID?: string | null
        hasPaidState?: PaidState | null
        profileState?: string | null
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
        createdAt: string
        updatedAt: string
      } | null
    } | null
    messageRoomID?: string | null
    parentReplyId: string
    parentReply?: {
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
      parentMessage?: {
        __typename: "DirectMessage"
        id: string
        content?: string | null
        attachment?: string | null
        attachmentName?: string | null
        attachmentOwner?: string | null
        when: string
        recipients: Array<string | null>
        userId: string
        messageRoomID: string
        createdAt: string
        updatedAt: string
      } | null
      messageRoomID?: string | null
      parentReplyId: string
      parentReply?: {
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
      } | null
      subReplies?: {
        __typename: "ModelDirectMessageReplyConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
      author?: {
        __typename: "User"
        id: string
        given_name: string
        family_name: string
        email?: string | null
        phone?: string | null
        owner?: string | null
        mainUserGroup?: string | null
        stripeCustomerID?: string | null
        stripeSubscriptionID?: string | null
        hasPaidState?: PaidState | null
        profileState?: string | null
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
        createdAt: string
        updatedAt: string
      } | null
    } | null
    subReplies?: {
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
    createdAt: string
    updatedAt: string
    author?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type CreateCrmRootMutationVariables = {
  input?: CreateCRMRootInput
}

export type CreateCrmRootMutation = {
  createCRMRoot?: {
    __typename: "CRMRoot"
    id: string
    messages?: {
      __typename: "ModelCRMMessageConnection"
      items: Array<{
        __typename: "CRMMessage"
        id: string
        rootId: string
        content: string
        when: string
        authorName: string
        authorId: string
        attachment?: string | null
        attachmentOwner?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type UpdateCrmRootMutationVariables = {
  input?: UpdateCRMRootInput
}

export type UpdateCrmRootMutation = {
  updateCRMRoot?: {
    __typename: "CRMRoot"
    id: string
    messages?: {
      __typename: "ModelCRMMessageConnection"
      items: Array<{
        __typename: "CRMMessage"
        id: string
        rootId: string
        content: string
        when: string
        authorName: string
        authorId: string
        attachment?: string | null
        attachmentOwner?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type DeleteCrmRootMutationVariables = {
  input?: DeleteCRMRootInput
}

export type DeleteCrmRootMutation = {
  deleteCRMRoot?: {
    __typename: "CRMRoot"
    id: string
    messages?: {
      __typename: "ModelCRMMessageConnection"
      items: Array<{
        __typename: "CRMMessage"
        id: string
        rootId: string
        content: string
        when: string
        authorName: string
        authorId: string
        attachment?: string | null
        attachmentOwner?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type CreateCrmMessageMutationVariables = {
  input?: CreateCRMMessageInput
}

export type CreateCrmMessageMutation = {
  createCRMMessage?: {
    __typename: "CRMMessage"
    id: string
    rootId: string
    crmRoot?: {
      __typename: "CRMRoot"
      id: string
      messages?: {
        __typename: "ModelCRMMessageConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    content: string
    when: string
    authorName: string
    authorId: string
    attachment?: string | null
    attachmentOwner?: string | null
    thread?: {
      __typename: "ModelCRMReplyConnection"
      items: Array<{
        __typename: "CRMReply"
        id: string
        rootId: string
        content: string
        when: string
        authorName: string
        authorId: string
        attachment?: string | null
        attachmentOwner?: string | null
        parentId: string
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type UpdateCrmMessageMutationVariables = {
  input?: UpdateCRMMessageInput
}

export type UpdateCrmMessageMutation = {
  updateCRMMessage?: {
    __typename: "CRMMessage"
    id: string
    rootId: string
    crmRoot?: {
      __typename: "CRMRoot"
      id: string
      messages?: {
        __typename: "ModelCRMMessageConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    content: string
    when: string
    authorName: string
    authorId: string
    attachment?: string | null
    attachmentOwner?: string | null
    thread?: {
      __typename: "ModelCRMReplyConnection"
      items: Array<{
        __typename: "CRMReply"
        id: string
        rootId: string
        content: string
        when: string
        authorName: string
        authorId: string
        attachment?: string | null
        attachmentOwner?: string | null
        parentId: string
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type DeleteCrmMessageMutationVariables = {
  input?: DeleteCRMMessageInput
}

export type DeleteCrmMessageMutation = {
  deleteCRMMessage?: {
    __typename: "CRMMessage"
    id: string
    rootId: string
    crmRoot?: {
      __typename: "CRMRoot"
      id: string
      messages?: {
        __typename: "ModelCRMMessageConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    content: string
    when: string
    authorName: string
    authorId: string
    attachment?: string | null
    attachmentOwner?: string | null
    thread?: {
      __typename: "ModelCRMReplyConnection"
      items: Array<{
        __typename: "CRMReply"
        id: string
        rootId: string
        content: string
        when: string
        authorName: string
        authorId: string
        attachment?: string | null
        attachmentOwner?: string | null
        parentId: string
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type CreateCrmReplyMutationVariables = {
  input?: CreateCRMReplyInput
}

export type CreateCrmReplyMutation = {
  createCRMReply?: {
    __typename: "CRMReply"
    id: string
    rootId: string
    content: string
    when: string
    authorName: string
    authorId: string
    attachment?: string | null
    attachmentOwner?: string | null
    parentId: string
    parent?: {
      __typename: "CRMMessage"
      id: string
      rootId: string
      crmRoot?: {
        __typename: "CRMRoot"
        id: string
        createdAt: string
        updatedAt: string
      } | null
      content: string
      when: string
      authorName: string
      authorId: string
      attachment?: string | null
      attachmentOwner?: string | null
      thread?: {
        __typename: "ModelCRMReplyConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type UpdateCrmReplyMutationVariables = {
  input?: UpdateCRMReplyInput
}

export type UpdateCrmReplyMutation = {
  updateCRMReply?: {
    __typename: "CRMReply"
    id: string
    rootId: string
    content: string
    when: string
    authorName: string
    authorId: string
    attachment?: string | null
    attachmentOwner?: string | null
    parentId: string
    parent?: {
      __typename: "CRMMessage"
      id: string
      rootId: string
      crmRoot?: {
        __typename: "CRMRoot"
        id: string
        createdAt: string
        updatedAt: string
      } | null
      content: string
      when: string
      authorName: string
      authorId: string
      attachment?: string | null
      attachmentOwner?: string | null
      thread?: {
        __typename: "ModelCRMReplyConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type DeleteCrmReplyMutationVariables = {
  input?: DeleteCRMReplyInput
}

export type DeleteCrmReplyMutation = {
  deleteCRMReply?: {
    __typename: "CRMReply"
    id: string
    rootId: string
    content: string
    when: string
    authorName: string
    authorId: string
    attachment?: string | null
    attachmentOwner?: string | null
    parentId: string
    parent?: {
      __typename: "CRMMessage"
      id: string
      rootId: string
      crmRoot?: {
        __typename: "CRMRoot"
        id: string
        createdAt: string
        updatedAt: string
      } | null
      content: string
      when: string
      authorName: string
      authorId: string
      attachment?: string | null
      attachmentOwner?: string | null
      thread?: {
        __typename: "ModelCRMReplyConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type CreateMessageMutationVariables = {
  input?: CreateMessageInput
}

export type CreateMessageMutation = {
  createMessage?: {
    __typename: "Message"
    id: string
    content: string
    when: string
    attachment?: string | null
    attachmentName?: string | null
    attachmentOwner?: string | null
    roomId?: string | null
    userId?: string | null
    postingAs?: string | null
    owner?: string | null
    room?: {
      __typename: "Group"
      id: string
      owner: string
      readGroups?: Array<UserGroupType | null> | null
      ownerOrgID: string
      ownerOrg?: {
        __typename: "Organization"
        id: string
        orgName: string
        adminEmail?: string | null
        phone?: string | null
        admins: Array<string>
        superAdmin: string
        hasPaidState?: string | null
        profileState?: string | null
        address?: string | null
        city?: string | null
        province?: string | null
        postalCode?: string | null
        country?: string | null
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
        parentOrganizationId: string
        createdAt: string
        updatedAt: string
      } | null
      type: string
      name: string
      description: string
      memberCount?: number | null
      members?: {
        __typename: "ModelGroupMemberConnection"
        nextToken?: string | null
      } | null
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
        randomLatitude?: string | null
        randomLongitude?: string | null
      } | null
      length?: string | null
      effort?: string | null
      cost?: string | null
      promotionalText?: string | null
      messages?: {
        __typename: "ModelMessageConnection"
        nextToken?: string | null
      } | null
      eventType?: string | null
      eventUrl?: string | null
      tz?: string | null
      isSponsored?: string | null
      createdAt: string
      updatedAt: string
      ownerUser?: {
        __typename: "User"
        id: string
        given_name: string
        family_name: string
        email?: string | null
        phone?: string | null
        owner?: string | null
        mainUserGroup?: string | null
        stripeCustomerID?: string | null
        stripeSubscriptionID?: string | null
        hasPaidState?: PaidState | null
        profileState?: string | null
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
        createdAt: string
        updatedAt: string
      } | null
    } | null
    replies?: {
      __typename: "ModelReplyConnection"
      items: Array<{
        __typename: "Reply"
        id: string
        content: string
        when: string
        attachment?: string | null
        attachmentName?: string | null
        attachmentOwner?: string | null
        userId: string
        messageId: string
        roomId?: string | null
        parentReplyId: string
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
    author?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type UpdateMessageMutationVariables = {
  input?: UpdateMessageInput
}

export type UpdateMessageMutation = {
  updateMessage?: {
    __typename: "Message"
    id: string
    content: string
    when: string
    attachment?: string | null
    attachmentName?: string | null
    attachmentOwner?: string | null
    roomId?: string | null
    userId?: string | null
    postingAs?: string | null
    owner?: string | null
    room?: {
      __typename: "Group"
      id: string
      owner: string
      readGroups?: Array<UserGroupType | null> | null
      ownerOrgID: string
      ownerOrg?: {
        __typename: "Organization"
        id: string
        orgName: string
        adminEmail?: string | null
        phone?: string | null
        admins: Array<string>
        superAdmin: string
        hasPaidState?: string | null
        profileState?: string | null
        address?: string | null
        city?: string | null
        province?: string | null
        postalCode?: string | null
        country?: string | null
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
        parentOrganizationId: string
        createdAt: string
        updatedAt: string
      } | null
      type: string
      name: string
      description: string
      memberCount?: number | null
      members?: {
        __typename: "ModelGroupMemberConnection"
        nextToken?: string | null
      } | null
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
        randomLatitude?: string | null
        randomLongitude?: string | null
      } | null
      length?: string | null
      effort?: string | null
      cost?: string | null
      promotionalText?: string | null
      messages?: {
        __typename: "ModelMessageConnection"
        nextToken?: string | null
      } | null
      eventType?: string | null
      eventUrl?: string | null
      tz?: string | null
      isSponsored?: string | null
      createdAt: string
      updatedAt: string
      ownerUser?: {
        __typename: "User"
        id: string
        given_name: string
        family_name: string
        email?: string | null
        phone?: string | null
        owner?: string | null
        mainUserGroup?: string | null
        stripeCustomerID?: string | null
        stripeSubscriptionID?: string | null
        hasPaidState?: PaidState | null
        profileState?: string | null
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
        createdAt: string
        updatedAt: string
      } | null
    } | null
    replies?: {
      __typename: "ModelReplyConnection"
      items: Array<{
        __typename: "Reply"
        id: string
        content: string
        when: string
        attachment?: string | null
        attachmentName?: string | null
        attachmentOwner?: string | null
        userId: string
        messageId: string
        roomId?: string | null
        parentReplyId: string
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
    author?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type DeleteMessageMutationVariables = {
  input?: DeleteMessageInput
}

export type DeleteMessageMutation = {
  deleteMessage?: {
    __typename: "Message"
    id: string
    content: string
    when: string
    attachment?: string | null
    attachmentName?: string | null
    attachmentOwner?: string | null
    roomId?: string | null
    userId?: string | null
    postingAs?: string | null
    owner?: string | null
    room?: {
      __typename: "Group"
      id: string
      owner: string
      readGroups?: Array<UserGroupType | null> | null
      ownerOrgID: string
      ownerOrg?: {
        __typename: "Organization"
        id: string
        orgName: string
        adminEmail?: string | null
        phone?: string | null
        admins: Array<string>
        superAdmin: string
        hasPaidState?: string | null
        profileState?: string | null
        address?: string | null
        city?: string | null
        province?: string | null
        postalCode?: string | null
        country?: string | null
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
        parentOrganizationId: string
        createdAt: string
        updatedAt: string
      } | null
      type: string
      name: string
      description: string
      memberCount?: number | null
      members?: {
        __typename: "ModelGroupMemberConnection"
        nextToken?: string | null
      } | null
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
        randomLatitude?: string | null
        randomLongitude?: string | null
      } | null
      length?: string | null
      effort?: string | null
      cost?: string | null
      promotionalText?: string | null
      messages?: {
        __typename: "ModelMessageConnection"
        nextToken?: string | null
      } | null
      eventType?: string | null
      eventUrl?: string | null
      tz?: string | null
      isSponsored?: string | null
      createdAt: string
      updatedAt: string
      ownerUser?: {
        __typename: "User"
        id: string
        given_name: string
        family_name: string
        email?: string | null
        phone?: string | null
        owner?: string | null
        mainUserGroup?: string | null
        stripeCustomerID?: string | null
        stripeSubscriptionID?: string | null
        hasPaidState?: PaidState | null
        profileState?: string | null
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
        createdAt: string
        updatedAt: string
      } | null
    } | null
    replies?: {
      __typename: "ModelReplyConnection"
      items: Array<{
        __typename: "Reply"
        id: string
        content: string
        when: string
        attachment?: string | null
        attachmentName?: string | null
        attachmentOwner?: string | null
        userId: string
        messageId: string
        roomId?: string | null
        parentReplyId: string
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
    author?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type CreateReplyMutationVariables = {
  input?: CreateReplyInput
}

export type CreateReplyMutation = {
  createReply?: {
    __typename: "Reply"
    id: string
    content: string
    when: string
    attachment?: string | null
    attachmentName?: string | null
    attachmentOwner?: string | null
    userId: string
    messageId: string
    parentMessage?: {
      __typename: "Message"
      id: string
      content: string
      when: string
      attachment?: string | null
      attachmentName?: string | null
      attachmentOwner?: string | null
      roomId?: string | null
      userId?: string | null
      postingAs?: string | null
      owner?: string | null
      room?: {
        __typename: "Group"
        id: string
        owner: string
        readGroups?: Array<UserGroupType | null> | null
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
      } | null
      replies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
      author?: {
        __typename: "User"
        id: string
        given_name: string
        family_name: string
        email?: string | null
        phone?: string | null
        owner?: string | null
        mainUserGroup?: string | null
        stripeCustomerID?: string | null
        stripeSubscriptionID?: string | null
        hasPaidState?: PaidState | null
        profileState?: string | null
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
        createdAt: string
        updatedAt: string
      } | null
    } | null
    roomId?: string | null
    parentReplyId: string
    parentReply?: {
      __typename: "Reply"
      id: string
      content: string
      when: string
      attachment?: string | null
      attachmentName?: string | null
      attachmentOwner?: string | null
      userId: string
      messageId: string
      parentMessage?: {
        __typename: "Message"
        id: string
        content: string
        when: string
        attachment?: string | null
        attachmentName?: string | null
        attachmentOwner?: string | null
        roomId?: string | null
        userId?: string | null
        postingAs?: string | null
        owner?: string | null
        createdAt: string
        updatedAt: string
      } | null
      roomId?: string | null
      parentReplyId: string
      parentReply?: {
        __typename: "Reply"
        id: string
        content: string
        when: string
        attachment?: string | null
        attachmentName?: string | null
        attachmentOwner?: string | null
        userId: string
        messageId: string
        roomId?: string | null
        parentReplyId: string
        createdAt: string
        updatedAt: string
      } | null
      subReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
      author?: {
        __typename: "User"
        id: string
        given_name: string
        family_name: string
        email?: string | null
        phone?: string | null
        owner?: string | null
        mainUserGroup?: string | null
        stripeCustomerID?: string | null
        stripeSubscriptionID?: string | null
        hasPaidState?: PaidState | null
        profileState?: string | null
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
        createdAt: string
        updatedAt: string
      } | null
    } | null
    subReplies?: {
      __typename: "ModelReplyConnection"
      items: Array<{
        __typename: "Reply"
        id: string
        content: string
        when: string
        attachment?: string | null
        attachmentName?: string | null
        attachmentOwner?: string | null
        userId: string
        messageId: string
        roomId?: string | null
        parentReplyId: string
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
    author?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type UpdateReplyMutationVariables = {
  input?: UpdateReplyInput
}

export type UpdateReplyMutation = {
  updateReply?: {
    __typename: "Reply"
    id: string
    content: string
    when: string
    attachment?: string | null
    attachmentName?: string | null
    attachmentOwner?: string | null
    userId: string
    messageId: string
    parentMessage?: {
      __typename: "Message"
      id: string
      content: string
      when: string
      attachment?: string | null
      attachmentName?: string | null
      attachmentOwner?: string | null
      roomId?: string | null
      userId?: string | null
      postingAs?: string | null
      owner?: string | null
      room?: {
        __typename: "Group"
        id: string
        owner: string
        readGroups?: Array<UserGroupType | null> | null
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
      } | null
      replies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
      author?: {
        __typename: "User"
        id: string
        given_name: string
        family_name: string
        email?: string | null
        phone?: string | null
        owner?: string | null
        mainUserGroup?: string | null
        stripeCustomerID?: string | null
        stripeSubscriptionID?: string | null
        hasPaidState?: PaidState | null
        profileState?: string | null
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
        createdAt: string
        updatedAt: string
      } | null
    } | null
    roomId?: string | null
    parentReplyId: string
    parentReply?: {
      __typename: "Reply"
      id: string
      content: string
      when: string
      attachment?: string | null
      attachmentName?: string | null
      attachmentOwner?: string | null
      userId: string
      messageId: string
      parentMessage?: {
        __typename: "Message"
        id: string
        content: string
        when: string
        attachment?: string | null
        attachmentName?: string | null
        attachmentOwner?: string | null
        roomId?: string | null
        userId?: string | null
        postingAs?: string | null
        owner?: string | null
        createdAt: string
        updatedAt: string
      } | null
      roomId?: string | null
      parentReplyId: string
      parentReply?: {
        __typename: "Reply"
        id: string
        content: string
        when: string
        attachment?: string | null
        attachmentName?: string | null
        attachmentOwner?: string | null
        userId: string
        messageId: string
        roomId?: string | null
        parentReplyId: string
        createdAt: string
        updatedAt: string
      } | null
      subReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
      author?: {
        __typename: "User"
        id: string
        given_name: string
        family_name: string
        email?: string | null
        phone?: string | null
        owner?: string | null
        mainUserGroup?: string | null
        stripeCustomerID?: string | null
        stripeSubscriptionID?: string | null
        hasPaidState?: PaidState | null
        profileState?: string | null
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
        createdAt: string
        updatedAt: string
      } | null
    } | null
    subReplies?: {
      __typename: "ModelReplyConnection"
      items: Array<{
        __typename: "Reply"
        id: string
        content: string
        when: string
        attachment?: string | null
        attachmentName?: string | null
        attachmentOwner?: string | null
        userId: string
        messageId: string
        roomId?: string | null
        parentReplyId: string
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
    author?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type DeleteReplyMutationVariables = {
  input?: DeleteReplyInput
}

export type DeleteReplyMutation = {
  deleteReply?: {
    __typename: "Reply"
    id: string
    content: string
    when: string
    attachment?: string | null
    attachmentName?: string | null
    attachmentOwner?: string | null
    userId: string
    messageId: string
    parentMessage?: {
      __typename: "Message"
      id: string
      content: string
      when: string
      attachment?: string | null
      attachmentName?: string | null
      attachmentOwner?: string | null
      roomId?: string | null
      userId?: string | null
      postingAs?: string | null
      owner?: string | null
      room?: {
        __typename: "Group"
        id: string
        owner: string
        readGroups?: Array<UserGroupType | null> | null
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
      } | null
      replies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
      author?: {
        __typename: "User"
        id: string
        given_name: string
        family_name: string
        email?: string | null
        phone?: string | null
        owner?: string | null
        mainUserGroup?: string | null
        stripeCustomerID?: string | null
        stripeSubscriptionID?: string | null
        hasPaidState?: PaidState | null
        profileState?: string | null
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
        createdAt: string
        updatedAt: string
      } | null
    } | null
    roomId?: string | null
    parentReplyId: string
    parentReply?: {
      __typename: "Reply"
      id: string
      content: string
      when: string
      attachment?: string | null
      attachmentName?: string | null
      attachmentOwner?: string | null
      userId: string
      messageId: string
      parentMessage?: {
        __typename: "Message"
        id: string
        content: string
        when: string
        attachment?: string | null
        attachmentName?: string | null
        attachmentOwner?: string | null
        roomId?: string | null
        userId?: string | null
        postingAs?: string | null
        owner?: string | null
        createdAt: string
        updatedAt: string
      } | null
      roomId?: string | null
      parentReplyId: string
      parentReply?: {
        __typename: "Reply"
        id: string
        content: string
        when: string
        attachment?: string | null
        attachmentName?: string | null
        attachmentOwner?: string | null
        userId: string
        messageId: string
        roomId?: string | null
        parentReplyId: string
        createdAt: string
        updatedAt: string
      } | null
      subReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
      author?: {
        __typename: "User"
        id: string
        given_name: string
        family_name: string
        email?: string | null
        phone?: string | null
        owner?: string | null
        mainUserGroup?: string | null
        stripeCustomerID?: string | null
        stripeSubscriptionID?: string | null
        hasPaidState?: PaidState | null
        profileState?: string | null
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
        createdAt: string
        updatedAt: string
      } | null
    } | null
    subReplies?: {
      __typename: "ModelReplyConnection"
      items: Array<{
        __typename: "Reply"
        id: string
        content: string
        when: string
        attachment?: string | null
        attachmentName?: string | null
        attachmentOwner?: string | null
        userId: string
        messageId: string
        roomId?: string | null
        parentReplyId: string
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
    author?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type CreateResourceRootMutationVariables = {
  input?: CreateResourceRootInput
}

export type CreateResourceRootMutation = {
  createResourceRoot?: {
    __typename: "ResourceRoot"
    id: string
    type?: string | null
    groupId?: string | null
    organizationId: string
    owner?: string | null
    resources?: {
      __typename: "ModelResourceConnection"
      items: Array<{
        __typename: "Resource"
        id: string
        owner?: string | null
        type?: string | null
        order?: string | null
        title?: string | null
        subtitle?: string | null
        description?: string | null
        whoIsThisFor?: string | null
        extendedDescription?: string | null
        readGroups?: Array<UserGroupType | null> | null
        resourceID: string
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    organization?: {
      __typename: "Organization"
      id: string
      orgName: string
      adminEmail?: string | null
      phone?: string | null
      admins: Array<string>
      superAdmin: string
      hasPaidState?: string | null
      profileState?: string | null
      address?: string | null
      city?: string | null
      province?: string | null
      postalCode?: string | null
      country?: string | null
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
      orgType?: string | null
      orgSize?: string | null
      denomination?: string | null
      pplServed?: string | null
      sundayAttendance?: string | null
      numberVolunteers?: string | null
      orgDescription?: string | null
      joined?: string | null
      parentOrganizationId: string
      parentOrganization?: {
        __typename: "Organization"
        id: string
        orgName: string
        adminEmail?: string | null
        phone?: string | null
        admins: Array<string>
        superAdmin: string
        hasPaidState?: string | null
        profileState?: string | null
        address?: string | null
        city?: string | null
        province?: string | null
        postalCode?: string | null
        country?: string | null
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
        parentOrganizationId: string
        createdAt: string
        updatedAt: string
      } | null
      subOrganizations?: {
        __typename: "ModelOrganizationConnection"
        nextToken?: string | null
      } | null
      members?: {
        __typename: "ModelOrganizationMemberConnection"
        nextToken?: string | null
      } | null
      ownsGroups?: {
        __typename: "ModelGroupConnection"
        nextToken?: string | null
      } | null
      resource?: {
        __typename: "ModelResourceRootConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    menuItems?: {
      __typename: "ModelResourceMenuItemConnection"
      items: Array<{
        __typename: "ResourceMenuItem"
        id: string
        owner?: string | null
        readGroups?: Array<UserGroupType | null> | null
        type?: ResourceMenuItemType | null
        menuTitle?: string | null
        order?: string | null
        depth?: string | null
        resourceRootID: string
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type UpdateResourceRootMutationVariables = {
  input?: UpdateResourceRootInput
}

export type UpdateResourceRootMutation = {
  updateResourceRoot?: {
    __typename: "ResourceRoot"
    id: string
    type?: string | null
    groupId?: string | null
    organizationId: string
    owner?: string | null
    resources?: {
      __typename: "ModelResourceConnection"
      items: Array<{
        __typename: "Resource"
        id: string
        owner?: string | null
        type?: string | null
        order?: string | null
        title?: string | null
        subtitle?: string | null
        description?: string | null
        whoIsThisFor?: string | null
        extendedDescription?: string | null
        readGroups?: Array<UserGroupType | null> | null
        resourceID: string
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    organization?: {
      __typename: "Organization"
      id: string
      orgName: string
      adminEmail?: string | null
      phone?: string | null
      admins: Array<string>
      superAdmin: string
      hasPaidState?: string | null
      profileState?: string | null
      address?: string | null
      city?: string | null
      province?: string | null
      postalCode?: string | null
      country?: string | null
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
      orgType?: string | null
      orgSize?: string | null
      denomination?: string | null
      pplServed?: string | null
      sundayAttendance?: string | null
      numberVolunteers?: string | null
      orgDescription?: string | null
      joined?: string | null
      parentOrganizationId: string
      parentOrganization?: {
        __typename: "Organization"
        id: string
        orgName: string
        adminEmail?: string | null
        phone?: string | null
        admins: Array<string>
        superAdmin: string
        hasPaidState?: string | null
        profileState?: string | null
        address?: string | null
        city?: string | null
        province?: string | null
        postalCode?: string | null
        country?: string | null
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
        parentOrganizationId: string
        createdAt: string
        updatedAt: string
      } | null
      subOrganizations?: {
        __typename: "ModelOrganizationConnection"
        nextToken?: string | null
      } | null
      members?: {
        __typename: "ModelOrganizationMemberConnection"
        nextToken?: string | null
      } | null
      ownsGroups?: {
        __typename: "ModelGroupConnection"
        nextToken?: string | null
      } | null
      resource?: {
        __typename: "ModelResourceRootConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    menuItems?: {
      __typename: "ModelResourceMenuItemConnection"
      items: Array<{
        __typename: "ResourceMenuItem"
        id: string
        owner?: string | null
        readGroups?: Array<UserGroupType | null> | null
        type?: ResourceMenuItemType | null
        menuTitle?: string | null
        order?: string | null
        depth?: string | null
        resourceRootID: string
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type DeleteResourceRootMutationVariables = {
  input?: DeleteResourceRootInput
}

export type DeleteResourceRootMutation = {
  deleteResourceRoot?: {
    __typename: "ResourceRoot"
    id: string
    type?: string | null
    groupId?: string | null
    organizationId: string
    owner?: string | null
    resources?: {
      __typename: "ModelResourceConnection"
      items: Array<{
        __typename: "Resource"
        id: string
        owner?: string | null
        type?: string | null
        order?: string | null
        title?: string | null
        subtitle?: string | null
        description?: string | null
        whoIsThisFor?: string | null
        extendedDescription?: string | null
        readGroups?: Array<UserGroupType | null> | null
        resourceID: string
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    organization?: {
      __typename: "Organization"
      id: string
      orgName: string
      adminEmail?: string | null
      phone?: string | null
      admins: Array<string>
      superAdmin: string
      hasPaidState?: string | null
      profileState?: string | null
      address?: string | null
      city?: string | null
      province?: string | null
      postalCode?: string | null
      country?: string | null
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
      orgType?: string | null
      orgSize?: string | null
      denomination?: string | null
      pplServed?: string | null
      sundayAttendance?: string | null
      numberVolunteers?: string | null
      orgDescription?: string | null
      joined?: string | null
      parentOrganizationId: string
      parentOrganization?: {
        __typename: "Organization"
        id: string
        orgName: string
        adminEmail?: string | null
        phone?: string | null
        admins: Array<string>
        superAdmin: string
        hasPaidState?: string | null
        profileState?: string | null
        address?: string | null
        city?: string | null
        province?: string | null
        postalCode?: string | null
        country?: string | null
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
        parentOrganizationId: string
        createdAt: string
        updatedAt: string
      } | null
      subOrganizations?: {
        __typename: "ModelOrganizationConnection"
        nextToken?: string | null
      } | null
      members?: {
        __typename: "ModelOrganizationMemberConnection"
        nextToken?: string | null
      } | null
      ownsGroups?: {
        __typename: "ModelGroupConnection"
        nextToken?: string | null
      } | null
      resource?: {
        __typename: "ModelResourceRootConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    menuItems?: {
      __typename: "ModelResourceMenuItemConnection"
      items: Array<{
        __typename: "ResourceMenuItem"
        id: string
        owner?: string | null
        readGroups?: Array<UserGroupType | null> | null
        type?: ResourceMenuItemType | null
        menuTitle?: string | null
        order?: string | null
        depth?: string | null
        resourceRootID: string
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type CreateResourceMenuItemMutationVariables = {
  input?: CreateResourceMenuItemInput
}

export type CreateResourceMenuItemMutation = {
  createResourceMenuItem?: {
    __typename: "ResourceMenuItem"
    id: string
    owner?: string | null
    readGroups?: Array<UserGroupType | null> | null
    type?: ResourceMenuItemType | null
    menuTitle?: string | null
    order?: string | null
    depth?: string | null
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
      resourceID?: string | null
      seriesID?: string | null
      episodeID?: string | null
      color?: string | null
      image?: {
        __typename: "Image"
        userId?: string | null
        filenameSmall?: string | null
        filenameMedium?: string | null
        filenameLarge?: string | null
        filenameUpload?: string | null
      } | null
      url?: string | null
      order?: number | null
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
        resourceID?: string | null
        seriesID?: string | null
        episodeID?: string | null
        color?: string | null
        url?: string | null
        order?: number | null
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
        resourceID?: string | null
        seriesID?: string | null
        episodeID?: string | null
        color?: string | null
        url?: string | null
        order?: number | null
      } | null> | null
    } | null> | null
    resourceRootID: string
    resourceRoot: {
      __typename: "ResourceRoot"
      id: string
      type?: string | null
      groupId?: string | null
      organizationId: string
      owner?: string | null
      resources?: {
        __typename: "ModelResourceConnection"
        nextToken?: string | null
      } | null
      organization?: {
        __typename: "Organization"
        id: string
        orgName: string
        adminEmail?: string | null
        phone?: string | null
        admins: Array<string>
        superAdmin: string
        hasPaidState?: string | null
        profileState?: string | null
        address?: string | null
        city?: string | null
        province?: string | null
        postalCode?: string | null
        country?: string | null
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
        parentOrganizationId: string
        createdAt: string
        updatedAt: string
      } | null
      menuItems?: {
        __typename: "ModelResourceMenuItemConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    }
    createdAt: string
    updatedAt: string
  } | null
}

export type UpdateResourceMenuItemMutationVariables = {
  input?: UpdateResourceMenuItemInput
}

export type UpdateResourceMenuItemMutation = {
  updateResourceMenuItem?: {
    __typename: "ResourceMenuItem"
    id: string
    owner?: string | null
    readGroups?: Array<UserGroupType | null> | null
    type?: ResourceMenuItemType | null
    menuTitle?: string | null
    order?: string | null
    depth?: string | null
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
      resourceID?: string | null
      seriesID?: string | null
      episodeID?: string | null
      color?: string | null
      image?: {
        __typename: "Image"
        userId?: string | null
        filenameSmall?: string | null
        filenameMedium?: string | null
        filenameLarge?: string | null
        filenameUpload?: string | null
      } | null
      url?: string | null
      order?: number | null
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
        resourceID?: string | null
        seriesID?: string | null
        episodeID?: string | null
        color?: string | null
        url?: string | null
        order?: number | null
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
        resourceID?: string | null
        seriesID?: string | null
        episodeID?: string | null
        color?: string | null
        url?: string | null
        order?: number | null
      } | null> | null
    } | null> | null
    resourceRootID: string
    resourceRoot: {
      __typename: "ResourceRoot"
      id: string
      type?: string | null
      groupId?: string | null
      organizationId: string
      owner?: string | null
      resources?: {
        __typename: "ModelResourceConnection"
        nextToken?: string | null
      } | null
      organization?: {
        __typename: "Organization"
        id: string
        orgName: string
        adminEmail?: string | null
        phone?: string | null
        admins: Array<string>
        superAdmin: string
        hasPaidState?: string | null
        profileState?: string | null
        address?: string | null
        city?: string | null
        province?: string | null
        postalCode?: string | null
        country?: string | null
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
        parentOrganizationId: string
        createdAt: string
        updatedAt: string
      } | null
      menuItems?: {
        __typename: "ModelResourceMenuItemConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    }
    createdAt: string
    updatedAt: string
  } | null
}

export type DeleteResourceMenuItemMutationVariables = {
  input?: DeleteResourceMenuItemInput
}

export type DeleteResourceMenuItemMutation = {
  deleteResourceMenuItem?: {
    __typename: "ResourceMenuItem"
    id: string
    owner?: string | null
    readGroups?: Array<UserGroupType | null> | null
    type?: ResourceMenuItemType | null
    menuTitle?: string | null
    order?: string | null
    depth?: string | null
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
      resourceID?: string | null
      seriesID?: string | null
      episodeID?: string | null
      color?: string | null
      image?: {
        __typename: "Image"
        userId?: string | null
        filenameSmall?: string | null
        filenameMedium?: string | null
        filenameLarge?: string | null
        filenameUpload?: string | null
      } | null
      url?: string | null
      order?: number | null
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
        resourceID?: string | null
        seriesID?: string | null
        episodeID?: string | null
        color?: string | null
        url?: string | null
        order?: number | null
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
        resourceID?: string | null
        seriesID?: string | null
        episodeID?: string | null
        color?: string | null
        url?: string | null
        order?: number | null
      } | null> | null
    } | null> | null
    resourceRootID: string
    resourceRoot: {
      __typename: "ResourceRoot"
      id: string
      type?: string | null
      groupId?: string | null
      organizationId: string
      owner?: string | null
      resources?: {
        __typename: "ModelResourceConnection"
        nextToken?: string | null
      } | null
      organization?: {
        __typename: "Organization"
        id: string
        orgName: string
        adminEmail?: string | null
        phone?: string | null
        admins: Array<string>
        superAdmin: string
        hasPaidState?: string | null
        profileState?: string | null
        address?: string | null
        city?: string | null
        province?: string | null
        postalCode?: string | null
        country?: string | null
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
        parentOrganizationId: string
        createdAt: string
        updatedAt: string
      } | null
      menuItems?: {
        __typename: "ModelResourceMenuItemConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    }
    createdAt: string
    updatedAt: string
  } | null
}

export type CreateResourceMutationVariables = {
  input?: CreateResourceInput
}

export type CreateResourceMutation = {
  createResource?: {
    __typename: "Resource"
    id: string
    owner?: string | null
    type?: string | null
    order?: string | null
    title?: string | null
    subtitle?: string | null
    image?: {
      __typename: "Image"
      userId?: string | null
      filenameSmall?: string | null
      filenameMedium?: string | null
      filenameLarge?: string | null
      filenameUpload?: string | null
    } | null
    description?: string | null
    whoIsThisFor?: string | null
    extendedDescription?: string | null
    readGroups?: Array<UserGroupType | null> | null
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
    series?: {
      __typename: "ModelResourceSeriesConnection"
      items: Array<{
        __typename: "ResourceSeries"
        id: string
        owner?: string | null
        type?: string | null
        title?: string | null
        order?: number | null
        description?: string | null
        whoIsThisFor?: string | null
        category?: Array<string | null> | null
        status?: string | null
        seriesID: string
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    resourceID: string
    resourceRoot: {
      __typename: "ResourceRoot"
      id: string
      type?: string | null
      groupId?: string | null
      organizationId: string
      owner?: string | null
      resources?: {
        __typename: "ModelResourceConnection"
        nextToken?: string | null
      } | null
      organization?: {
        __typename: "Organization"
        id: string
        orgName: string
        adminEmail?: string | null
        phone?: string | null
        admins: Array<string>
        superAdmin: string
        hasPaidState?: string | null
        profileState?: string | null
        address?: string | null
        city?: string | null
        province?: string | null
        postalCode?: string | null
        country?: string | null
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
        parentOrganizationId: string
        createdAt: string
        updatedAt: string
      } | null
      menuItems?: {
        __typename: "ModelResourceMenuItemConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    }
    createdAt: string
    updatedAt: string
  } | null
}

export type UpdateResourceMutationVariables = {
  input?: UpdateResourceInput
}

export type UpdateResourceMutation = {
  updateResource?: {
    __typename: "Resource"
    id: string
    owner?: string | null
    type?: string | null
    order?: string | null
    title?: string | null
    subtitle?: string | null
    image?: {
      __typename: "Image"
      userId?: string | null
      filenameSmall?: string | null
      filenameMedium?: string | null
      filenameLarge?: string | null
      filenameUpload?: string | null
    } | null
    description?: string | null
    whoIsThisFor?: string | null
    extendedDescription?: string | null
    readGroups?: Array<UserGroupType | null> | null
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
    series?: {
      __typename: "ModelResourceSeriesConnection"
      items: Array<{
        __typename: "ResourceSeries"
        id: string
        owner?: string | null
        type?: string | null
        title?: string | null
        order?: number | null
        description?: string | null
        whoIsThisFor?: string | null
        category?: Array<string | null> | null
        status?: string | null
        seriesID: string
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    resourceID: string
    resourceRoot: {
      __typename: "ResourceRoot"
      id: string
      type?: string | null
      groupId?: string | null
      organizationId: string
      owner?: string | null
      resources?: {
        __typename: "ModelResourceConnection"
        nextToken?: string | null
      } | null
      organization?: {
        __typename: "Organization"
        id: string
        orgName: string
        adminEmail?: string | null
        phone?: string | null
        admins: Array<string>
        superAdmin: string
        hasPaidState?: string | null
        profileState?: string | null
        address?: string | null
        city?: string | null
        province?: string | null
        postalCode?: string | null
        country?: string | null
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
        parentOrganizationId: string
        createdAt: string
        updatedAt: string
      } | null
      menuItems?: {
        __typename: "ModelResourceMenuItemConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    }
    createdAt: string
    updatedAt: string
  } | null
}

export type DeleteResourceMutationVariables = {
  input?: DeleteResourceInput
}

export type DeleteResourceMutation = {
  deleteResource?: {
    __typename: "Resource"
    id: string
    owner?: string | null
    type?: string | null
    order?: string | null
    title?: string | null
    subtitle?: string | null
    image?: {
      __typename: "Image"
      userId?: string | null
      filenameSmall?: string | null
      filenameMedium?: string | null
      filenameLarge?: string | null
      filenameUpload?: string | null
    } | null
    description?: string | null
    whoIsThisFor?: string | null
    extendedDescription?: string | null
    readGroups?: Array<UserGroupType | null> | null
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
    series?: {
      __typename: "ModelResourceSeriesConnection"
      items: Array<{
        __typename: "ResourceSeries"
        id: string
        owner?: string | null
        type?: string | null
        title?: string | null
        order?: number | null
        description?: string | null
        whoIsThisFor?: string | null
        category?: Array<string | null> | null
        status?: string | null
        seriesID: string
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    resourceID: string
    resourceRoot: {
      __typename: "ResourceRoot"
      id: string
      type?: string | null
      groupId?: string | null
      organizationId: string
      owner?: string | null
      resources?: {
        __typename: "ModelResourceConnection"
        nextToken?: string | null
      } | null
      organization?: {
        __typename: "Organization"
        id: string
        orgName: string
        adminEmail?: string | null
        phone?: string | null
        admins: Array<string>
        superAdmin: string
        hasPaidState?: string | null
        profileState?: string | null
        address?: string | null
        city?: string | null
        province?: string | null
        postalCode?: string | null
        country?: string | null
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
        parentOrganizationId: string
        createdAt: string
        updatedAt: string
      } | null
      menuItems?: {
        __typename: "ModelResourceMenuItemConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    }
    createdAt: string
    updatedAt: string
  } | null
}

export type CreateResourceSeriesMutationVariables = {
  input?: CreateResourceSeriesInput
}

export type CreateResourceSeriesMutation = {
  createResourceSeries?: {
    __typename: "ResourceSeries"
    id: string
    owner?: string | null
    type?: string | null
    title?: string | null
    order?: number | null
    description?: string | null
    whoIsThisFor?: string | null
    imageFile?: {
      __typename: "Image"
      userId?: string | null
      filenameSmall?: string | null
      filenameMedium?: string | null
      filenameLarge?: string | null
      filenameUpload?: string | null
    } | null
    category?: Array<string | null> | null
    status?: string | null
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
    episodes?: {
      __typename: "ModelResourceEpisodeConnection"
      items: Array<{
        __typename: "ResourceEpisode"
        id: string
        owner?: string | null
        episodeNumber?: number | null
        type?: string | null
        title?: string | null
        description?: string | null
        whoIsThisFor?: string | null
        episodeID: string
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    seriesID: string
    parentResource: {
      __typename: "Resource"
      id: string
      owner?: string | null
      type?: string | null
      order?: string | null
      title?: string | null
      subtitle?: string | null
      image?: {
        __typename: "Image"
        userId?: string | null
        filenameSmall?: string | null
        filenameMedium?: string | null
        filenameLarge?: string | null
        filenameUpload?: string | null
      } | null
      description?: string | null
      whoIsThisFor?: string | null
      extendedDescription?: string | null
      readGroups?: Array<UserGroupType | null> | null
      details?: Array<{
        __typename: "ResourceDetail"
        type?: ResourceDetailType | null
        name?: string | null
        text?: string | null
        value?: string | null
      } | null> | null
      series?: {
        __typename: "ModelResourceSeriesConnection"
        nextToken?: string | null
      } | null
      resourceID: string
      resourceRoot: {
        __typename: "ResourceRoot"
        id: string
        type?: string | null
        groupId?: string | null
        organizationId: string
        owner?: string | null
        createdAt: string
        updatedAt: string
      }
      createdAt: string
      updatedAt: string
    }
    createdAt: string
    updatedAt: string
  } | null
}

export type UpdateResourceSeriesMutationVariables = {
  input?: UpdateResourceSeriesInput
}

export type UpdateResourceSeriesMutation = {
  updateResourceSeries?: {
    __typename: "ResourceSeries"
    id: string
    owner?: string | null
    type?: string | null
    title?: string | null
    order?: number | null
    description?: string | null
    whoIsThisFor?: string | null
    imageFile?: {
      __typename: "Image"
      userId?: string | null
      filenameSmall?: string | null
      filenameMedium?: string | null
      filenameLarge?: string | null
      filenameUpload?: string | null
    } | null
    category?: Array<string | null> | null
    status?: string | null
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
    episodes?: {
      __typename: "ModelResourceEpisodeConnection"
      items: Array<{
        __typename: "ResourceEpisode"
        id: string
        owner?: string | null
        episodeNumber?: number | null
        type?: string | null
        title?: string | null
        description?: string | null
        whoIsThisFor?: string | null
        episodeID: string
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    seriesID: string
    parentResource: {
      __typename: "Resource"
      id: string
      owner?: string | null
      type?: string | null
      order?: string | null
      title?: string | null
      subtitle?: string | null
      image?: {
        __typename: "Image"
        userId?: string | null
        filenameSmall?: string | null
        filenameMedium?: string | null
        filenameLarge?: string | null
        filenameUpload?: string | null
      } | null
      description?: string | null
      whoIsThisFor?: string | null
      extendedDescription?: string | null
      readGroups?: Array<UserGroupType | null> | null
      details?: Array<{
        __typename: "ResourceDetail"
        type?: ResourceDetailType | null
        name?: string | null
        text?: string | null
        value?: string | null
      } | null> | null
      series?: {
        __typename: "ModelResourceSeriesConnection"
        nextToken?: string | null
      } | null
      resourceID: string
      resourceRoot: {
        __typename: "ResourceRoot"
        id: string
        type?: string | null
        groupId?: string | null
        organizationId: string
        owner?: string | null
        createdAt: string
        updatedAt: string
      }
      createdAt: string
      updatedAt: string
    }
    createdAt: string
    updatedAt: string
  } | null
}

export type DeleteResourceSeriesMutationVariables = {
  input?: DeleteResourceSeriesInput
}

export type DeleteResourceSeriesMutation = {
  deleteResourceSeries?: {
    __typename: "ResourceSeries"
    id: string
    owner?: string | null
    type?: string | null
    title?: string | null
    order?: number | null
    description?: string | null
    whoIsThisFor?: string | null
    imageFile?: {
      __typename: "Image"
      userId?: string | null
      filenameSmall?: string | null
      filenameMedium?: string | null
      filenameLarge?: string | null
      filenameUpload?: string | null
    } | null
    category?: Array<string | null> | null
    status?: string | null
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
    episodes?: {
      __typename: "ModelResourceEpisodeConnection"
      items: Array<{
        __typename: "ResourceEpisode"
        id: string
        owner?: string | null
        episodeNumber?: number | null
        type?: string | null
        title?: string | null
        description?: string | null
        whoIsThisFor?: string | null
        episodeID: string
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    seriesID: string
    parentResource: {
      __typename: "Resource"
      id: string
      owner?: string | null
      type?: string | null
      order?: string | null
      title?: string | null
      subtitle?: string | null
      image?: {
        __typename: "Image"
        userId?: string | null
        filenameSmall?: string | null
        filenameMedium?: string | null
        filenameLarge?: string | null
        filenameUpload?: string | null
      } | null
      description?: string | null
      whoIsThisFor?: string | null
      extendedDescription?: string | null
      readGroups?: Array<UserGroupType | null> | null
      details?: Array<{
        __typename: "ResourceDetail"
        type?: ResourceDetailType | null
        name?: string | null
        text?: string | null
        value?: string | null
      } | null> | null
      series?: {
        __typename: "ModelResourceSeriesConnection"
        nextToken?: string | null
      } | null
      resourceID: string
      resourceRoot: {
        __typename: "ResourceRoot"
        id: string
        type?: string | null
        groupId?: string | null
        organizationId: string
        owner?: string | null
        createdAt: string
        updatedAt: string
      }
      createdAt: string
      updatedAt: string
    }
    createdAt: string
    updatedAt: string
  } | null
}

export type CreateResourceEpisodeMutationVariables = {
  input?: CreateResourceEpisodeInput
}

export type CreateResourceEpisodeMutation = {
  createResourceEpisode?: {
    __typename: "ResourceEpisode"
    id: string
    owner?: string | null
    episodeNumber?: number | null
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
    whoIsThisFor?: string | null
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
    parentSeries: {
      __typename: "ResourceSeries"
      id: string
      owner?: string | null
      type?: string | null
      title?: string | null
      order?: number | null
      description?: string | null
      whoIsThisFor?: string | null
      imageFile?: {
        __typename: "Image"
        userId?: string | null
        filenameSmall?: string | null
        filenameMedium?: string | null
        filenameLarge?: string | null
        filenameUpload?: string | null
      } | null
      category?: Array<string | null> | null
      status?: string | null
      details?: Array<{
        __typename: "ResourceDetail"
        type?: ResourceDetailType | null
        name?: string | null
        text?: string | null
        value?: string | null
      } | null> | null
      episodes?: {
        __typename: "ModelResourceEpisodeConnection"
        nextToken?: string | null
      } | null
      seriesID: string
      parentResource: {
        __typename: "Resource"
        id: string
        owner?: string | null
        type?: string | null
        order?: string | null
        title?: string | null
        subtitle?: string | null
        description?: string | null
        whoIsThisFor?: string | null
        extendedDescription?: string | null
        readGroups?: Array<UserGroupType | null> | null
        resourceID: string
        createdAt: string
        updatedAt: string
      }
      createdAt: string
      updatedAt: string
    }
    createdAt: string
    updatedAt: string
  } | null
}

export type UpdateResourceEpisodeMutationVariables = {
  input?: UpdateResourceEpisodeInput
}

export type UpdateResourceEpisodeMutation = {
  updateResourceEpisode?: {
    __typename: "ResourceEpisode"
    id: string
    owner?: string | null
    episodeNumber?: number | null
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
    whoIsThisFor?: string | null
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
    parentSeries: {
      __typename: "ResourceSeries"
      id: string
      owner?: string | null
      type?: string | null
      title?: string | null
      order?: number | null
      description?: string | null
      whoIsThisFor?: string | null
      imageFile?: {
        __typename: "Image"
        userId?: string | null
        filenameSmall?: string | null
        filenameMedium?: string | null
        filenameLarge?: string | null
        filenameUpload?: string | null
      } | null
      category?: Array<string | null> | null
      status?: string | null
      details?: Array<{
        __typename: "ResourceDetail"
        type?: ResourceDetailType | null
        name?: string | null
        text?: string | null
        value?: string | null
      } | null> | null
      episodes?: {
        __typename: "ModelResourceEpisodeConnection"
        nextToken?: string | null
      } | null
      seriesID: string
      parentResource: {
        __typename: "Resource"
        id: string
        owner?: string | null
        type?: string | null
        order?: string | null
        title?: string | null
        subtitle?: string | null
        description?: string | null
        whoIsThisFor?: string | null
        extendedDescription?: string | null
        readGroups?: Array<UserGroupType | null> | null
        resourceID: string
        createdAt: string
        updatedAt: string
      }
      createdAt: string
      updatedAt: string
    }
    createdAt: string
    updatedAt: string
  } | null
}

export type DeleteResourceEpisodeMutationVariables = {
  input?: DeleteResourceEpisodeInput
}

export type DeleteResourceEpisodeMutation = {
  deleteResourceEpisode?: {
    __typename: "ResourceEpisode"
    id: string
    owner?: string | null
    episodeNumber?: number | null
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
    whoIsThisFor?: string | null
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
    parentSeries: {
      __typename: "ResourceSeries"
      id: string
      owner?: string | null
      type?: string | null
      title?: string | null
      order?: number | null
      description?: string | null
      whoIsThisFor?: string | null
      imageFile?: {
        __typename: "Image"
        userId?: string | null
        filenameSmall?: string | null
        filenameMedium?: string | null
        filenameLarge?: string | null
        filenameUpload?: string | null
      } | null
      category?: Array<string | null> | null
      status?: string | null
      details?: Array<{
        __typename: "ResourceDetail"
        type?: ResourceDetailType | null
        name?: string | null
        text?: string | null
        value?: string | null
      } | null> | null
      episodes?: {
        __typename: "ModelResourceEpisodeConnection"
        nextToken?: string | null
      } | null
      seriesID: string
      parentResource: {
        __typename: "Resource"
        id: string
        owner?: string | null
        type?: string | null
        order?: string | null
        title?: string | null
        subtitle?: string | null
        description?: string | null
        whoIsThisFor?: string | null
        extendedDescription?: string | null
        readGroups?: Array<UserGroupType | null> | null
        resourceID: string
        createdAt: string
        updatedAt: string
      }
      createdAt: string
      updatedAt: string
    }
    createdAt: string
    updatedAt: string
  } | null
}

export type CreateProductMutationVariables = {
  input?: CreateProductInput
}

export type CreateProductMutation = {
  createProduct?: {
    __typename: "Product"
    id: string
    price?: number | null
    pricePer?: string | null
    name?: string | null
    description?: string | null
    confirmationMsg?: string | null
    payments?: {
      __typename: "ModelPaymentConnection"
      items: Array<{
        __typename: "Payment"
        id: string
        productID?: string | null
        userID?: string | null
        dateCompleted?: string | null
        paymentType?: string | null
        paymentInfo?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    isOrgTier?: string | null
    isIndividualTier?: string | null
    isLogin?: string | null
    marketingDescription?: string | null
    groupsIncluded?: Array<string | null> | null
    enabled?: string | null
    isStripe?: string | null
    isPaypal?: string | null
    tiered?: Array<{
      __typename: "TieredProduct"
      name?: string | null
      stripePaymentID?: string | null
      stripeIsTiered?: string | null
    } | null> | null
    createdAt: string
    updatedAt: string
  } | null
}

export type UpdateProductMutationVariables = {
  input?: UpdateProductInput
}

export type UpdateProductMutation = {
  updateProduct?: {
    __typename: "Product"
    id: string
    price?: number | null
    pricePer?: string | null
    name?: string | null
    description?: string | null
    confirmationMsg?: string | null
    payments?: {
      __typename: "ModelPaymentConnection"
      items: Array<{
        __typename: "Payment"
        id: string
        productID?: string | null
        userID?: string | null
        dateCompleted?: string | null
        paymentType?: string | null
        paymentInfo?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    isOrgTier?: string | null
    isIndividualTier?: string | null
    isLogin?: string | null
    marketingDescription?: string | null
    groupsIncluded?: Array<string | null> | null
    enabled?: string | null
    isStripe?: string | null
    isPaypal?: string | null
    tiered?: Array<{
      __typename: "TieredProduct"
      name?: string | null
      stripePaymentID?: string | null
      stripeIsTiered?: string | null
    } | null> | null
    createdAt: string
    updatedAt: string
  } | null
}

export type DeleteProductMutationVariables = {
  input?: DeleteProductInput
}

export type DeleteProductMutation = {
  deleteProduct?: {
    __typename: "Product"
    id: string
    price?: number | null
    pricePer?: string | null
    name?: string | null
    description?: string | null
    confirmationMsg?: string | null
    payments?: {
      __typename: "ModelPaymentConnection"
      items: Array<{
        __typename: "Payment"
        id: string
        productID?: string | null
        userID?: string | null
        dateCompleted?: string | null
        paymentType?: string | null
        paymentInfo?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    isOrgTier?: string | null
    isIndividualTier?: string | null
    isLogin?: string | null
    marketingDescription?: string | null
    groupsIncluded?: Array<string | null> | null
    enabled?: string | null
    isStripe?: string | null
    isPaypal?: string | null
    tiered?: Array<{
      __typename: "TieredProduct"
      name?: string | null
      stripePaymentID?: string | null
      stripeIsTiered?: string | null
    } | null> | null
    createdAt: string
    updatedAt: string
  } | null
}

export type CreateVodAssetMutationVariables = {
  input?: CreateVodAssetInput
}

export type CreateVodAssetMutation = {
  createVodAsset?: {
    __typename: "vodAsset"
    id: string
    title: string
    description: string
    video?: {
      __typename: "videoObject"
      id: string
      createdAt: string
      updatedAt: string
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type UpdateVodAssetMutationVariables = {
  input?: UpdateVodAssetInput
}

export type UpdateVodAssetMutation = {
  updateVodAsset?: {
    __typename: "vodAsset"
    id: string
    title: string
    description: string
    video?: {
      __typename: "videoObject"
      id: string
      createdAt: string
      updatedAt: string
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type DeleteVodAssetMutationVariables = {
  input?: DeleteVodAssetInput
}

export type DeleteVodAssetMutation = {
  deleteVodAsset?: {
    __typename: "vodAsset"
    id: string
    title: string
    description: string
    video?: {
      __typename: "videoObject"
      id: string
      createdAt: string
      updatedAt: string
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type CreateVideoObjectMutationVariables = {
  input?: CreateVideoObjectInput
}

export type CreateVideoObjectMutation = {
  createVideoObject?: {
    __typename: "videoObject"
    id: string
    createdAt: string
    updatedAt: string
  } | null
}

export type UpdateVideoObjectMutationVariables = {
  input?: UpdateVideoObjectInput
}

export type UpdateVideoObjectMutation = {
  updateVideoObject?: {
    __typename: "videoObject"
    id: string
    createdAt: string
    updatedAt: string
  } | null
}

export type DeleteVideoObjectMutationVariables = {
  input?: DeleteVideoObjectInput
}

export type DeleteVideoObjectMutation = {
  deleteVideoObject?: {
    __typename: "videoObject"
    id: string
    createdAt: string
    updatedAt: string
  } | null
}

export type CreateStartupMutationVariables = {
  input?: CreateStartupInput
}

export type CreateStartupMutation = {
  createStartup?: {
    __typename: "Startup"
    id: string
    order?: number | null
    action?: string | null
    params?: string | null
    readGroups?: Array<UserGroupType | null> | null
    createdAt: string
    updatedAt: string
  } | null
}

export type UpdateStartupMutationVariables = {
  input?: UpdateStartupInput
}

export type UpdateStartupMutation = {
  updateStartup?: {
    __typename: "Startup"
    id: string
    order?: number | null
    action?: string | null
    params?: string | null
    readGroups?: Array<UserGroupType | null> | null
    createdAt: string
    updatedAt: string
  } | null
}

export type DeleteStartupMutationVariables = {
  input?: DeleteStartupInput
}

export type DeleteStartupMutation = {
  deleteStartup?: {
    __typename: "Startup"
    id: string
    order?: number | null
    action?: string | null
    params?: string | null
    readGroups?: Array<UserGroupType | null> | null
    createdAt: string
    updatedAt: string
  } | null
}

export type CreateMenuMutationVariables = {
  input?: CreateMenuInput
}

export type CreateMenuMutation = {
  createMenu?: {
    __typename: "Menu"
    id: string
    order?: number | null
    name?: string | null
    action?: string | null
    params?: string | null
    readGroups?: Array<UserGroupType | null> | null
    subItems?: {
      __typename: "ModelSubMenuConnection"
      items: Array<{
        __typename: "SubMenu"
        id: string
        menuID?: string | null
        order?: number | null
        name?: string | null
        action?: string | null
        params?: string | null
        readGroups?: Array<UserGroupType | null> | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type UpdateMenuMutationVariables = {
  input?: UpdateMenuInput
}

export type UpdateMenuMutation = {
  updateMenu?: {
    __typename: "Menu"
    id: string
    order?: number | null
    name?: string | null
    action?: string | null
    params?: string | null
    readGroups?: Array<UserGroupType | null> | null
    subItems?: {
      __typename: "ModelSubMenuConnection"
      items: Array<{
        __typename: "SubMenu"
        id: string
        menuID?: string | null
        order?: number | null
        name?: string | null
        action?: string | null
        params?: string | null
        readGroups?: Array<UserGroupType | null> | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type DeleteMenuMutationVariables = {
  input?: DeleteMenuInput
}

export type DeleteMenuMutation = {
  deleteMenu?: {
    __typename: "Menu"
    id: string
    order?: number | null
    name?: string | null
    action?: string | null
    params?: string | null
    readGroups?: Array<UserGroupType | null> | null
    subItems?: {
      __typename: "ModelSubMenuConnection"
      items: Array<{
        __typename: "SubMenu"
        id: string
        menuID?: string | null
        order?: number | null
        name?: string | null
        action?: string | null
        params?: string | null
        readGroups?: Array<UserGroupType | null> | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type CreateSubMenuMutationVariables = {
  input?: CreateSubMenuInput
}

export type CreateSubMenuMutation = {
  createSubMenu?: {
    __typename: "SubMenu"
    id: string
    menuID?: string | null
    order?: number | null
    menu?: {
      __typename: "Menu"
      id: string
      order?: number | null
      name?: string | null
      action?: string | null
      params?: string | null
      readGroups?: Array<UserGroupType | null> | null
      subItems?: {
        __typename: "ModelSubMenuConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    name?: string | null
    action?: string | null
    params?: string | null
    readGroups?: Array<UserGroupType | null> | null
    createdAt: string
    updatedAt: string
  } | null
}

export type UpdateSubMenuMutationVariables = {
  input?: UpdateSubMenuInput
}

export type UpdateSubMenuMutation = {
  updateSubMenu?: {
    __typename: "SubMenu"
    id: string
    menuID?: string | null
    order?: number | null
    menu?: {
      __typename: "Menu"
      id: string
      order?: number | null
      name?: string | null
      action?: string | null
      params?: string | null
      readGroups?: Array<UserGroupType | null> | null
      subItems?: {
        __typename: "ModelSubMenuConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    name?: string | null
    action?: string | null
    params?: string | null
    readGroups?: Array<UserGroupType | null> | null
    createdAt: string
    updatedAt: string
  } | null
}

export type DeleteSubMenuMutationVariables = {
  input?: DeleteSubMenuInput
}

export type DeleteSubMenuMutation = {
  deleteSubMenu?: {
    __typename: "SubMenu"
    id: string
    menuID?: string | null
    order?: number | null
    menu?: {
      __typename: "Menu"
      id: string
      order?: number | null
      name?: string | null
      action?: string | null
      params?: string | null
      readGroups?: Array<UserGroupType | null> | null
      subItems?: {
        __typename: "ModelSubMenuConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    name?: string | null
    action?: string | null
    params?: string | null
    readGroups?: Array<UserGroupType | null> | null
    createdAt: string
    updatedAt: string
  } | null
}

export type CreateCustomPricingMutationVariables = {
  input?: CreateCustomPricingInput
}

export type CreateCustomPricingMutation = {
  createCustomPricing?: {
    __typename: "CustomPricing"
    id: string
    emailAddress?: string | null
    type?: CustomPricingType | null
    lineItems?: Array<{
      __typename: "LineItem"
      itemId?: string | null
      count?: string | null
      amount?: string | null
      description?: string | null
    } | null> | null
    createdAt: string
    updatedAt: string
  } | null
}

export type UpdateCustomPricingMutationVariables = {
  input?: UpdateCustomPricingInput
}

export type UpdateCustomPricingMutation = {
  updateCustomPricing?: {
    __typename: "CustomPricing"
    id: string
    emailAddress?: string | null
    type?: CustomPricingType | null
    lineItems?: Array<{
      __typename: "LineItem"
      itemId?: string | null
      count?: string | null
      amount?: string | null
      description?: string | null
    } | null> | null
    createdAt: string
    updatedAt: string
  } | null
}

export type DeleteCustomPricingMutationVariables = {
  input?: DeleteCustomPricingInput
}

export type DeleteCustomPricingMutation = {
  deleteCustomPricing?: {
    __typename: "CustomPricing"
    id: string
    emailAddress?: string | null
    type?: CustomPricingType | null
    lineItems?: Array<{
      __typename: "LineItem"
      itemId?: string | null
      count?: string | null
      amount?: string | null
      description?: string | null
    } | null> | null
    createdAt: string
    updatedAt: string
  } | null
}

export type EventBriteListEventsQueryVariables = {
  page?: string | null
}

export type EventBriteListEventsQuery = {
  eventBriteListEvents?: {
    __typename: "EventBriteEventList"
    pagination?: {
      __typename: "EventBritePagination"
      object_count?: number | null
      page_number?: number | null
      page_size?: number | null
      page_count?: number | null
      has_more_items?: boolean | null
    } | null
    events?: Array<{
      __typename: "EventBriteEvent"
      name?: {
        __typename: "EventBriteText"
        text?: string | null
        html?: string | null
      } | null
      description?: {
        __typename: "EventBriteText"
        text?: string | null
        html?: string | null
      } | null
      url?: string | null
      start?: {
        __typename: "EventBriteTime"
        timezone?: string | null
        local?: string | null
        utc?: string | null
      } | null
      end?: {
        __typename: "EventBriteTime"
        timezone?: string | null
        local?: string | null
        utc?: string | null
      } | null
      organization_id?: string | null
      created?: string | null
      changed?: string | null
      published?: string | null
      capacity?: number | null
      capacity_is_custom?: boolean | null
      status?: string | null
      currency?: string | null
      listed?: boolean | null
      shareable?: boolean | null
      invite_only?: boolean | null
      online_event?: boolean | null
      show_remaining?: boolean | null
      tx_time_limit?: number | null
      hide_start_date?: boolean | null
      hide_end_date?: boolean | null
      locale?: string | null
      is_locked?: boolean | null
      privacy_setting?: string | null
      is_series?: boolean | null
      is_series_parent?: boolean | null
      inventory_type?: string | null
      is_reserved_seating?: boolean | null
      show_pick_a_seat?: boolean | null
      show_seatmap_thumbnail?: boolean | null
      show_colors_in_seatmap_thumbnail?: boolean | null
      source?: string | null
      is_free?: boolean | null
      version?: string | null
      summary?: string | null
      facebook_event_id?: string | null
      logo_id?: string | null
      organizer_id?: string | null
      venue_id?: string | null
      category_id?: string | null
      subcategory_id?: string | null
      format_id?: string | null
      id?: string | null
      resource_uri?: string | null
      is_externally_ticketed?: boolean | null
      series_id?: string | null
    } | null> | null
  } | null
}

export type EventBriteListTicketClassesQueryVariables = {
  eventId?: string | null
  page?: string | null
}

export type EventBriteListTicketClassesQuery = {
  eventBriteListTicketClasses?: {
    __typename: "EventBriteEventTicketClasses"
    pagination?: {
      __typename: "EventBritePagination"
      object_count?: number | null
      page_number?: number | null
      page_size?: number | null
      page_count?: number | null
      has_more_items?: boolean | null
    } | null
    ticket_classes?: Array<{
      __typename: "EventBriteTicketClass"
      resource_uri?: string | null
      display_name?: string | null
      name?: string | null
      description?: string | null
      donation?: boolean | null
      free?: boolean | null
      secondary_assignment_enabled?: boolean | null
      include_fee?: boolean | null
      minimum_quantity?: number | null
      maximum_quantity?: number | null
      maximum_quantity_per_order?: number | null
      maximum_quantity_per_order_without_pending?: number | null
      on_sale_status?: string | null
      category?: string | null
      event_id?: string | null
      id?: string | null
      sales_start?: string | null
      sales_end?: string | null
      variant_id?: string | null
      variant_input_type?: string | null
      sorting?: string | null
      has_pdf_ticket?: string | null
      image_id?: string | null
      delivery_methods?: Array<string | null> | null
      sales_channels?: Array<string | null> | null
      variants?: Array<{
        __typename: "EventBriteVariants"
        category?: string | null
        display_name?: string | null
        name?: string | null
        currency?: string | null
        checkout_group_id?: string | null
        on_sale_status?: string | null
        hide_sale_dates?: boolean | null
        free?: boolean | null
        include_fee?: boolean | null
      } | null> | null
    } | null> | null
  } | null
}

export type GetApplicationProcessQueryVariables = {
  id?: string
}

export type GetApplicationProcessQuery = {
  getApplicationProcess?: {
    __typename: "ApplicationProcess"
    id: string
    createdAt: string
    updatedAt: string
  } | null
}

export type ListApplicationProcesssQueryVariables = {
  filter?: ModelApplicationProcessFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListApplicationProcesssQuery = {
  listApplicationProcesss?: {
    __typename: "ModelApplicationProcessConnection"
    items: Array<{
      __typename: "ApplicationProcess"
      id: string
      createdAt: string
      updatedAt: string
    } | null>
    nextToken?: string | null
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
    readGroups?: Array<UserGroupType | null> | null
    ownerOrgID: string
    ownerOrg?: {
      __typename: "Organization"
      id: string
      orgName: string
      adminEmail?: string | null
      phone?: string | null
      admins: Array<string>
      superAdmin: string
      hasPaidState?: string | null
      profileState?: string | null
      address?: string | null
      city?: string | null
      province?: string | null
      postalCode?: string | null
      country?: string | null
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
      orgType?: string | null
      orgSize?: string | null
      denomination?: string | null
      pplServed?: string | null
      sundayAttendance?: string | null
      numberVolunteers?: string | null
      orgDescription?: string | null
      joined?: string | null
      parentOrganizationId: string
      parentOrganization?: {
        __typename: "Organization"
        id: string
        orgName: string
        adminEmail?: string | null
        phone?: string | null
        admins: Array<string>
        superAdmin: string
        hasPaidState?: string | null
        profileState?: string | null
        address?: string | null
        city?: string | null
        province?: string | null
        postalCode?: string | null
        country?: string | null
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
        parentOrganizationId: string
        createdAt: string
        updatedAt: string
      } | null
      subOrganizations?: {
        __typename: "ModelOrganizationConnection"
        nextToken?: string | null
      } | null
      members?: {
        __typename: "ModelOrganizationMemberConnection"
        nextToken?: string | null
      } | null
      ownsGroups?: {
        __typename: "ModelGroupConnection"
        nextToken?: string | null
      } | null
      resource?: {
        __typename: "ModelResourceRootConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    type: string
    name: string
    description: string
    memberCount?: number | null
    members?: {
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
      randomLatitude?: string | null
      randomLongitude?: string | null
    } | null
    length?: string | null
    effort?: string | null
    cost?: string | null
    promotionalText?: string | null
    messages?: {
      __typename: "ModelMessageConnection"
      items: Array<{
        __typename: "Message"
        id: string
        content: string
        when: string
        attachment?: string | null
        attachmentName?: string | null
        attachmentOwner?: string | null
        roomId?: string | null
        userId?: string | null
        postingAs?: string | null
        owner?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    eventType?: string | null
    eventUrl?: string | null
    tz?: string | null
    isSponsored?: string | null
    createdAt: string
    updatedAt: string
    ownerUser?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type ListGroupsQueryVariables = {
  filter?: ModelGroupFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListGroupsQuery = {
  listGroups?: {
    __typename: "ModelGroupConnection"
    items: Array<{
      __typename: "Group"
      id: string
      owner: string
      readGroups?: Array<UserGroupType | null> | null
      ownerOrgID: string
      ownerOrg?: {
        __typename: "Organization"
        id: string
        orgName: string
        adminEmail?: string | null
        phone?: string | null
        admins: Array<string>
        superAdmin: string
        hasPaidState?: string | null
        profileState?: string | null
        address?: string | null
        city?: string | null
        province?: string | null
        postalCode?: string | null
        country?: string | null
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
        parentOrganizationId: string
        createdAt: string
        updatedAt: string
      } | null
      type: string
      name: string
      description: string
      memberCount?: number | null
      members?: {
        __typename: "ModelGroupMemberConnection"
        nextToken?: string | null
      } | null
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
        randomLatitude?: string | null
        randomLongitude?: string | null
      } | null
      length?: string | null
      effort?: string | null
      cost?: string | null
      promotionalText?: string | null
      messages?: {
        __typename: "ModelMessageConnection"
        nextToken?: string | null
      } | null
      eventType?: string | null
      eventUrl?: string | null
      tz?: string | null
      isSponsored?: string | null
      createdAt: string
      updatedAt: string
      ownerUser?: {
        __typename: "User"
        id: string
        given_name: string
        family_name: string
        email?: string | null
        phone?: string | null
        owner?: string | null
        mainUserGroup?: string | null
        stripeCustomerID?: string | null
        stripeSubscriptionID?: string | null
        hasPaidState?: PaidState | null
        profileState?: string | null
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
        createdAt: string
        updatedAt: string
      } | null
    } | null>
    nextToken?: string | null
  } | null
}

export type GetOrganizationQueryVariables = {
  id?: string
}

export type GetOrganizationQuery = {
  getOrganization?: {
    __typename: "Organization"
    id: string
    orgName: string
    adminEmail?: string | null
    phone?: string | null
    admins: Array<string>
    superAdmin: string
    hasPaidState?: string | null
    profileState?: string | null
    address?: string | null
    city?: string | null
    province?: string | null
    postalCode?: string | null
    country?: string | null
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
    orgType?: string | null
    orgSize?: string | null
    denomination?: string | null
    pplServed?: string | null
    sundayAttendance?: string | null
    numberVolunteers?: string | null
    orgDescription?: string | null
    joined?: string | null
    parentOrganizationId: string
    parentOrganization?: {
      __typename: "Organization"
      id: string
      orgName: string
      adminEmail?: string | null
      phone?: string | null
      admins: Array<string>
      superAdmin: string
      hasPaidState?: string | null
      profileState?: string | null
      address?: string | null
      city?: string | null
      province?: string | null
      postalCode?: string | null
      country?: string | null
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
      orgType?: string | null
      orgSize?: string | null
      denomination?: string | null
      pplServed?: string | null
      sundayAttendance?: string | null
      numberVolunteers?: string | null
      orgDescription?: string | null
      joined?: string | null
      parentOrganizationId: string
      parentOrganization?: {
        __typename: "Organization"
        id: string
        orgName: string
        adminEmail?: string | null
        phone?: string | null
        admins: Array<string>
        superAdmin: string
        hasPaidState?: string | null
        profileState?: string | null
        address?: string | null
        city?: string | null
        province?: string | null
        postalCode?: string | null
        country?: string | null
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
        parentOrganizationId: string
        createdAt: string
        updatedAt: string
      } | null
      subOrganizations?: {
        __typename: "ModelOrganizationConnection"
        nextToken?: string | null
      } | null
      members?: {
        __typename: "ModelOrganizationMemberConnection"
        nextToken?: string | null
      } | null
      ownsGroups?: {
        __typename: "ModelGroupConnection"
        nextToken?: string | null
      } | null
      resource?: {
        __typename: "ModelResourceRootConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    subOrganizations?: {
      __typename: "ModelOrganizationConnection"
      items: Array<{
        __typename: "Organization"
        id: string
        orgName: string
        adminEmail?: string | null
        phone?: string | null
        admins: Array<string>
        superAdmin: string
        hasPaidState?: string | null
        profileState?: string | null
        address?: string | null
        city?: string | null
        province?: string | null
        postalCode?: string | null
        country?: string | null
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
        parentOrganizationId: string
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    members?: {
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
    ownsGroups?: {
      __typename: "ModelGroupConnection"
      items: Array<{
        __typename: "Group"
        id: string
        owner: string
        readGroups?: Array<UserGroupType | null> | null
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
    resource?: {
      __typename: "ModelResourceRootConnection"
      items: Array<{
        __typename: "ResourceRoot"
        id: string
        type?: string | null
        groupId?: string | null
        organizationId: string
        owner?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type ListOrganizationsQueryVariables = {
  filter?: ModelOrganizationFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListOrganizationsQuery = {
  listOrganizations?: {
    __typename: "ModelOrganizationConnection"
    items: Array<{
      __typename: "Organization"
      id: string
      orgName: string
      adminEmail?: string | null
      phone?: string | null
      admins: Array<string>
      superAdmin: string
      hasPaidState?: string | null
      profileState?: string | null
      address?: string | null
      city?: string | null
      province?: string | null
      postalCode?: string | null
      country?: string | null
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
      orgType?: string | null
      orgSize?: string | null
      denomination?: string | null
      pplServed?: string | null
      sundayAttendance?: string | null
      numberVolunteers?: string | null
      orgDescription?: string | null
      joined?: string | null
      parentOrganizationId: string
      parentOrganization?: {
        __typename: "Organization"
        id: string
        orgName: string
        adminEmail?: string | null
        phone?: string | null
        admins: Array<string>
        superAdmin: string
        hasPaidState?: string | null
        profileState?: string | null
        address?: string | null
        city?: string | null
        province?: string | null
        postalCode?: string | null
        country?: string | null
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
        parentOrganizationId: string
        createdAt: string
        updatedAt: string
      } | null
      subOrganizations?: {
        __typename: "ModelOrganizationConnection"
        nextToken?: string | null
      } | null
      members?: {
        __typename: "ModelOrganizationMemberConnection"
        nextToken?: string | null
      } | null
      ownsGroups?: {
        __typename: "ModelGroupConnection"
        nextToken?: string | null
      } | null
      resource?: {
        __typename: "ModelResourceRootConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null>
    nextToken?: string | null
  } | null
}

export type GetActivityQueryVariables = {
  id?: string
}

export type GetActivityQuery = {
  getActivity?: {
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
    owner?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type ListActivitysQueryVariables = {
  filter?: ModelActivityFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListActivitysQuery = {
  listActivitys?: {
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
      owner?: {
        __typename: "User"
        id: string
        given_name: string
        family_name: string
        email?: string | null
        phone?: string | null
        owner?: string | null
        mainUserGroup?: string | null
        stripeCustomerID?: string | null
        stripeSubscriptionID?: string | null
        hasPaidState?: PaidState | null
        profileState?: string | null
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
        createdAt: string
        updatedAt: string
      } | null
    } | null>
    nextToken?: string | null
  } | null
}

export type GetPaymentQueryVariables = {
  id?: string
}

export type GetPaymentQuery = {
  getPayment?: {
    __typename: "Payment"
    id: string
    productID?: string | null
    product?: {
      __typename: "Product"
      id: string
      price?: number | null
      pricePer?: string | null
      name?: string | null
      description?: string | null
      confirmationMsg?: string | null
      payments?: {
        __typename: "ModelPaymentConnection"
        nextToken?: string | null
      } | null
      isOrgTier?: string | null
      isIndividualTier?: string | null
      isLogin?: string | null
      marketingDescription?: string | null
      groupsIncluded?: Array<string | null> | null
      enabled?: string | null
      isStripe?: string | null
      isPaypal?: string | null
      tiered?: Array<{
        __typename: "TieredProduct"
        name?: string | null
        stripePaymentID?: string | null
        stripeIsTiered?: string | null
      } | null> | null
      createdAt: string
      updatedAt: string
    } | null
    userID?: string | null
    dateCompleted?: string | null
    paymentType?: string | null
    paymentInfo?: string | null
    createdAt: string
    updatedAt: string
    user?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type ListPaymentsQueryVariables = {
  id?: string | null
  filter?: ModelPaymentFilterInput | null
  limit?: number | null
  nextToken?: string | null
  sortDirection?: ModelSortDirection | null
}

export type ListPaymentsQuery = {
  listPayments?: {
    __typename: "ModelPaymentConnection"
    items: Array<{
      __typename: "Payment"
      id: string
      productID?: string | null
      product?: {
        __typename: "Product"
        id: string
        price?: number | null
        pricePer?: string | null
        name?: string | null
        description?: string | null
        confirmationMsg?: string | null
        isOrgTier?: string | null
        isIndividualTier?: string | null
        isLogin?: string | null
        marketingDescription?: string | null
        groupsIncluded?: Array<string | null> | null
        enabled?: string | null
        isStripe?: string | null
        isPaypal?: string | null
        createdAt: string
        updatedAt: string
      } | null
      userID?: string | null
      dateCompleted?: string | null
      paymentType?: string | null
      paymentInfo?: string | null
      createdAt: string
      updatedAt: string
      user?: {
        __typename: "User"
        id: string
        given_name: string
        family_name: string
        email?: string | null
        phone?: string | null
        owner?: string | null
        mainUserGroup?: string | null
        stripeCustomerID?: string | null
        stripeSubscriptionID?: string | null
        hasPaidState?: PaidState | null
        profileState?: string | null
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
        createdAt: string
        updatedAt: string
      } | null
    } | null>
    nextToken?: string | null
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
        courseInfoID?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    subTitle?: string | null
    instructors?: {
      __typename: "ModelCourseInstructorsConnection"
      items: Array<{
        __typename: "CourseInstructors"
        id: string
        courseInfoID?: string | null
        userID?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    backOfficeStaff?: {
      __typename: "ModelCourseBackOfficeStaffConnection"
      items: Array<{
        __typename: "CourseBackOfficeStaff"
        id: string
        courseInfoID?: string | null
        userID?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    triads?: {
      __typename: "ModelCourseTriadsConnection"
      items: Array<{
        __typename: "CourseTriads"
        id: string
        courseInfoID?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    introduction?: string | null
    sylabusAttachment?: string | null
    sylabusAttachmentName?: string | null
    sylabusAttachmentOwner?: string | null
    createdAt: string
    updatedAt: string
  } | null
}

export type ListCourseInfosQueryVariables = {
  filter?: ModelCourseInfoFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListCourseInfosQuery = {
  listCourseInfos?: {
    __typename: "ModelCourseInfoConnection"
    items: Array<{
      __typename: "CourseInfo"
      id: string
      designedBy?: string | null
      summary?: string | null
      courseWeeks?: {
        __typename: "ModelCourseWeekConnection"
        nextToken?: string | null
      } | null
      subTitle?: string | null
      instructors?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      backOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      triads?: {
        __typename: "ModelCourseTriadsConnection"
        nextToken?: string | null
      } | null
      introduction?: string | null
      sylabusAttachment?: string | null
      sylabusAttachmentName?: string | null
      sylabusAttachmentOwner?: string | null
      createdAt: string
      updatedAt: string
    } | null>
    nextToken?: string | null
  } | null
}

export type GetCourseTriadsQueryVariables = {
  id?: string
}

export type GetCourseTriadsQuery = {
  getCourseTriads?: {
    __typename: "CourseTriads"
    id: string
    courseInfoID?: string | null
    courseInfo?: {
      __typename: "CourseInfo"
      id: string
      designedBy?: string | null
      summary?: string | null
      courseWeeks?: {
        __typename: "ModelCourseWeekConnection"
        nextToken?: string | null
      } | null
      subTitle?: string | null
      instructors?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      backOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      triads?: {
        __typename: "ModelCourseTriadsConnection"
        nextToken?: string | null
      } | null
      introduction?: string | null
      sylabusAttachment?: string | null
      sylabusAttachmentName?: string | null
      sylabusAttachmentOwner?: string | null
      createdAt: string
      updatedAt: string
    } | null
    coaches?: {
      __typename: "ModelCourseTriadCoachesConnection"
      items: Array<{
        __typename: "CourseTriadCoaches"
        id: string
        triadID?: string | null
        userID?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    users?: {
      __typename: "ModelCourseTriadUsersConnection"
      items: Array<{
        __typename: "CourseTriadUsers"
        id: string
        triadID?: string | null
        userID?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type ListCourseTriadssQueryVariables = {
  filter?: ModelCourseTriadsFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListCourseTriadssQuery = {
  listCourseTriadss?: {
    __typename: "ModelCourseTriadsConnection"
    items: Array<{
      __typename: "CourseTriads"
      id: string
      courseInfoID?: string | null
      courseInfo?: {
        __typename: "CourseInfo"
        id: string
        designedBy?: string | null
        summary?: string | null
        subTitle?: string | null
        introduction?: string | null
        sylabusAttachment?: string | null
        sylabusAttachmentName?: string | null
        sylabusAttachmentOwner?: string | null
        createdAt: string
        updatedAt: string
      } | null
      coaches?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      users?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null>
    nextToken?: string | null
  } | null
}

export type GetCourseBackOfficeStaffQueryVariables = {
  id?: string
}

export type GetCourseBackOfficeStaffQuery = {
  getCourseBackOfficeStaff?: {
    __typename: "CourseBackOfficeStaff"
    id: string
    courseInfoID?: string | null
    courseInfo?: {
      __typename: "CourseInfo"
      id: string
      designedBy?: string | null
      summary?: string | null
      courseWeeks?: {
        __typename: "ModelCourseWeekConnection"
        nextToken?: string | null
      } | null
      subTitle?: string | null
      instructors?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      backOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      triads?: {
        __typename: "ModelCourseTriadsConnection"
        nextToken?: string | null
      } | null
      introduction?: string | null
      sylabusAttachment?: string | null
      sylabusAttachmentName?: string | null
      sylabusAttachmentOwner?: string | null
      createdAt: string
      updatedAt: string
    } | null
    userID?: string | null
    createdAt: string
    updatedAt: string
    user?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type ListCourseBackOfficeStaffsQueryVariables = {
  filter?: ModelCourseBackOfficeStaffFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListCourseBackOfficeStaffsQuery = {
  listCourseBackOfficeStaffs?: {
    __typename: "ModelCourseBackOfficeStaffConnection"
    items: Array<{
      __typename: "CourseBackOfficeStaff"
      id: string
      courseInfoID?: string | null
      courseInfo?: {
        __typename: "CourseInfo"
        id: string
        designedBy?: string | null
        summary?: string | null
        subTitle?: string | null
        introduction?: string | null
        sylabusAttachment?: string | null
        sylabusAttachmentName?: string | null
        sylabusAttachmentOwner?: string | null
        createdAt: string
        updatedAt: string
      } | null
      userID?: string | null
      createdAt: string
      updatedAt: string
      user?: {
        __typename: "User"
        id: string
        given_name: string
        family_name: string
        email?: string | null
        phone?: string | null
        owner?: string | null
        mainUserGroup?: string | null
        stripeCustomerID?: string | null
        stripeSubscriptionID?: string | null
        hasPaidState?: PaidState | null
        profileState?: string | null
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
        createdAt: string
        updatedAt: string
      } | null
    } | null>
    nextToken?: string | null
  } | null
}

export type GetCourseInstructorsQueryVariables = {
  id?: string
}

export type GetCourseInstructorsQuery = {
  getCourseInstructors?: {
    __typename: "CourseInstructors"
    id: string
    courseInfoID?: string | null
    courseInfo?: {
      __typename: "CourseInfo"
      id: string
      designedBy?: string | null
      summary?: string | null
      courseWeeks?: {
        __typename: "ModelCourseWeekConnection"
        nextToken?: string | null
      } | null
      subTitle?: string | null
      instructors?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      backOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      triads?: {
        __typename: "ModelCourseTriadsConnection"
        nextToken?: string | null
      } | null
      introduction?: string | null
      sylabusAttachment?: string | null
      sylabusAttachmentName?: string | null
      sylabusAttachmentOwner?: string | null
      createdAt: string
      updatedAt: string
    } | null
    userID?: string | null
    createdAt: string
    updatedAt: string
    user?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type ListCourseInstructorssQueryVariables = {
  filter?: ModelCourseInstructorsFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListCourseInstructorssQuery = {
  listCourseInstructorss?: {
    __typename: "ModelCourseInstructorsConnection"
    items: Array<{
      __typename: "CourseInstructors"
      id: string
      courseInfoID?: string | null
      courseInfo?: {
        __typename: "CourseInfo"
        id: string
        designedBy?: string | null
        summary?: string | null
        subTitle?: string | null
        introduction?: string | null
        sylabusAttachment?: string | null
        sylabusAttachmentName?: string | null
        sylabusAttachmentOwner?: string | null
        createdAt: string
        updatedAt: string
      } | null
      userID?: string | null
      createdAt: string
      updatedAt: string
      user?: {
        __typename: "User"
        id: string
        given_name: string
        family_name: string
        email?: string | null
        phone?: string | null
        owner?: string | null
        mainUserGroup?: string | null
        stripeCustomerID?: string | null
        stripeSubscriptionID?: string | null
        hasPaidState?: PaidState | null
        profileState?: string | null
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
        createdAt: string
        updatedAt: string
      } | null
    } | null>
    nextToken?: string | null
  } | null
}

export type GetCourseTriadCoachesQueryVariables = {
  id?: string
}

export type GetCourseTriadCoachesQuery = {
  getCourseTriadCoaches?: {
    __typename: "CourseTriadCoaches"
    id: string
    triadID?: string | null
    triad?: {
      __typename: "CourseTriads"
      id: string
      courseInfoID?: string | null
      courseInfo?: {
        __typename: "CourseInfo"
        id: string
        designedBy?: string | null
        summary?: string | null
        subTitle?: string | null
        introduction?: string | null
        sylabusAttachment?: string | null
        sylabusAttachmentName?: string | null
        sylabusAttachmentOwner?: string | null
        createdAt: string
        updatedAt: string
      } | null
      coaches?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      users?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    userID?: string | null
    createdAt: string
    updatedAt: string
    user?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type ListCourseTriadCoachessQueryVariables = {
  filter?: ModelCourseTriadCoachesFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListCourseTriadCoachessQuery = {
  listCourseTriadCoachess?: {
    __typename: "ModelCourseTriadCoachesConnection"
    items: Array<{
      __typename: "CourseTriadCoaches"
      id: string
      triadID?: string | null
      triad?: {
        __typename: "CourseTriads"
        id: string
        courseInfoID?: string | null
        createdAt: string
        updatedAt: string
      } | null
      userID?: string | null
      createdAt: string
      updatedAt: string
      user?: {
        __typename: "User"
        id: string
        given_name: string
        family_name: string
        email?: string | null
        phone?: string | null
        owner?: string | null
        mainUserGroup?: string | null
        stripeCustomerID?: string | null
        stripeSubscriptionID?: string | null
        hasPaidState?: PaidState | null
        profileState?: string | null
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
        createdAt: string
        updatedAt: string
      } | null
    } | null>
    nextToken?: string | null
  } | null
}

export type GetCourseTriadUsersQueryVariables = {
  id?: string
}

export type GetCourseTriadUsersQuery = {
  getCourseTriadUsers?: {
    __typename: "CourseTriadUsers"
    id: string
    triadID?: string | null
    triad?: {
      __typename: "CourseTriads"
      id: string
      courseInfoID?: string | null
      courseInfo?: {
        __typename: "CourseInfo"
        id: string
        designedBy?: string | null
        summary?: string | null
        subTitle?: string | null
        introduction?: string | null
        sylabusAttachment?: string | null
        sylabusAttachmentName?: string | null
        sylabusAttachmentOwner?: string | null
        createdAt: string
        updatedAt: string
      } | null
      coaches?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      users?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    userID?: string | null
    createdAt: string
    updatedAt: string
    user?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type ListCourseTriadUserssQueryVariables = {
  id?: string | null
  filter?: ModelCourseTriadUsersFilterInput | null
  limit?: number | null
  nextToken?: string | null
  sortDirection?: ModelSortDirection | null
}

export type ListCourseTriadUserssQuery = {
  listCourseTriadUserss?: {
    __typename: "ModelCourseTriadUsersConnection"
    items: Array<{
      __typename: "CourseTriadUsers"
      id: string
      triadID?: string | null
      triad?: {
        __typename: "CourseTriads"
        id: string
        courseInfoID?: string | null
        createdAt: string
        updatedAt: string
      } | null
      userID?: string | null
      createdAt: string
      updatedAt: string
      user?: {
        __typename: "User"
        id: string
        given_name: string
        family_name: string
        email?: string | null
        phone?: string | null
        owner?: string | null
        mainUserGroup?: string | null
        stripeCustomerID?: string | null
        stripeSubscriptionID?: string | null
        hasPaidState?: PaidState | null
        profileState?: string | null
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
        createdAt: string
        updatedAt: string
      } | null
    } | null>
    nextToken?: string | null
  } | null
}

export type GetCourseWeekQueryVariables = {
  id?: string
}

export type GetCourseWeekQuery = {
  getCourseWeek?: {
    __typename: "CourseWeek"
    id: string
    week?: string | null
    date?: string | null
    tz?: string | null
    name?: string | null
    title?: string | null
    leader?: string | null
    courseInfoID?: string | null
    courseInfo?: {
      __typename: "CourseInfo"
      id: string
      designedBy?: string | null
      summary?: string | null
      courseWeeks?: {
        __typename: "ModelCourseWeekConnection"
        nextToken?: string | null
      } | null
      subTitle?: string | null
      instructors?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      backOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      triads?: {
        __typename: "ModelCourseTriadsConnection"
        nextToken?: string | null
      } | null
      introduction?: string | null
      sylabusAttachment?: string | null
      sylabusAttachmentName?: string | null
      sylabusAttachmentOwner?: string | null
      createdAt: string
      updatedAt: string
    } | null
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
        zoomUrl?: string | null
        zoomRecording?: string | null
        courseLessonResponseId?: string | null
        wordCount?: string | null
        description?: string | null
        courseWeekID?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type ListCourseWeeksQueryVariables = {
  filter?: ModelCourseWeekFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListCourseWeeksQuery = {
  listCourseWeeks?: {
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
      courseInfoID?: string | null
      courseInfo?: {
        __typename: "CourseInfo"
        id: string
        designedBy?: string | null
        summary?: string | null
        subTitle?: string | null
        introduction?: string | null
        sylabusAttachment?: string | null
        sylabusAttachmentName?: string | null
        sylabusAttachmentOwner?: string | null
        createdAt: string
        updatedAt: string
      } | null
      lessons?: {
        __typename: "ModelCourseLessonConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null>
    nextToken?: string | null
  } | null
}

export type GetCourseLessonQueryVariables = {
  id?: string
}

export type GetCourseLessonQuery = {
  getCourseLesson?: {
    __typename: "CourseLesson"
    id: string
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
    courseWeek?: {
      __typename: "CourseWeek"
      id: string
      week?: string | null
      date?: string | null
      tz?: string | null
      name?: string | null
      title?: string | null
      leader?: string | null
      courseInfoID?: string | null
      courseInfo?: {
        __typename: "CourseInfo"
        id: string
        designedBy?: string | null
        summary?: string | null
        subTitle?: string | null
        introduction?: string | null
        sylabusAttachment?: string | null
        sylabusAttachmentName?: string | null
        sylabusAttachmentOwner?: string | null
        createdAt: string
        updatedAt: string
      } | null
      lessons?: {
        __typename: "ModelCourseLessonConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type ListCourseLessonsQueryVariables = {
  filter?: ModelCourseLessonFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListCourseLessonsQuery = {
  listCourseLessons?: {
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
      zoomUrl?: string | null
      zoomRecording?: string | null
      courseLessonResponseId?: string | null
      wordCount?: string | null
      description?: string | null
      courseWeekID?: string | null
      courseWeek?: {
        __typename: "CourseWeek"
        id: string
        week?: string | null
        date?: string | null
        tz?: string | null
        name?: string | null
        title?: string | null
        leader?: string | null
        courseInfoID?: string | null
        createdAt: string
        updatedAt: string
      } | null
      createdAt: string
      updatedAt: string
    } | null>
    nextToken?: string | null
  } | null
}

export type GetDirectMessageUserQueryVariables = {
  id?: string
}

export type GetDirectMessageUserQuery = {
  getDirectMessageUser?: {
    __typename: "DirectMessageUser"
    id: string
    userName?: string | null
    userID: string
    roomID: string
    room?: {
      __typename: "DirectMessageRoom"
      id: string
      name?: string | null
      messageUsers?: {
        __typename: "ModelDirectMessageUserConnection"
        nextToken?: string | null
      } | null
      directMessage?: {
        __typename: "ModelDirectMessageConnection"
        nextToken?: string | null
      } | null
      roomType?: string | null
      createdAt: string
      updatedAt: string
    } | null
    createdAt: string
    updatedAt: string
    user?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
      userName?: string | null
      userID: string
      roomID: string
      room?: {
        __typename: "DirectMessageRoom"
        id: string
        name?: string | null
        roomType?: string | null
        createdAt: string
        updatedAt: string
      } | null
      createdAt: string
      updatedAt: string
      user?: {
        __typename: "User"
        id: string
        given_name: string
        family_name: string
        email?: string | null
        phone?: string | null
        owner?: string | null
        mainUserGroup?: string | null
        stripeCustomerID?: string | null
        stripeSubscriptionID?: string | null
        hasPaidState?: PaidState | null
        profileState?: string | null
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
        createdAt: string
        updatedAt: string
      } | null
    } | null>
    nextToken?: string | null
  } | null
}

export type GetDirectMessageRoomQueryVariables = {
  id?: string
}

export type GetDirectMessageRoomQuery = {
  getDirectMessageRoom?: {
    __typename: "DirectMessageRoom"
    id: string
    name?: string | null
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
        attachmentName?: string | null
        attachmentOwner?: string | null
        when: string
        recipients: Array<string | null>
        userId: string
        messageRoomID: string
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    roomType?: string | null
    createdAt: string
    updatedAt: string
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
      messageUsers?: {
        __typename: "ModelDirectMessageUserConnection"
        nextToken?: string | null
      } | null
      directMessage?: {
        __typename: "ModelDirectMessageConnection"
        nextToken?: string | null
      } | null
      roomType?: string | null
      createdAt: string
      updatedAt: string
    } | null>
    nextToken?: string | null
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
    messageRoom?: {
      __typename: "DirectMessageRoom"
      id: string
      name?: string | null
      messageUsers?: {
        __typename: "ModelDirectMessageUserConnection"
        nextToken?: string | null
      } | null
      directMessage?: {
        __typename: "ModelDirectMessageConnection"
        nextToken?: string | null
      } | null
      roomType?: string | null
      createdAt: string
      updatedAt: string
    } | null
    createdAt: string
    updatedAt: string
    author?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type ListDirectMessagesQueryVariables = {
  filter?: ModelDirectMessageFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListDirectMessagesQuery = {
  listDirectMessages?: {
    __typename: "ModelDirectMessageConnection"
    items: Array<{
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
        nextToken?: string | null
      } | null
      messageRoomID: string
      messageRoom?: {
        __typename: "DirectMessageRoom"
        id: string
        name?: string | null
        roomType?: string | null
        createdAt: string
        updatedAt: string
      } | null
      createdAt: string
      updatedAt: string
      author?: {
        __typename: "User"
        id: string
        given_name: string
        family_name: string
        email?: string | null
        phone?: string | null
        owner?: string | null
        mainUserGroup?: string | null
        stripeCustomerID?: string | null
        stripeSubscriptionID?: string | null
        hasPaidState?: PaidState | null
        profileState?: string | null
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
        createdAt: string
        updatedAt: string
      } | null
    } | null>
    nextToken?: string | null
  } | null
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
      items: Array<{
        __typename: "CRMMessage"
        id: string
        rootId: string
        content: string
        when: string
        authorName: string
        authorId: string
        attachment?: string | null
        attachmentOwner?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type ListCrmRootsQueryVariables = {
  filter?: ModelCRMRootFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListCrmRootsQuery = {
  listCRMRoots?: {
    __typename: "ModelCRMRootConnection"
    items: Array<{
      __typename: "CRMRoot"
      id: string
      messages?: {
        __typename: "ModelCRMMessageConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null>
    nextToken?: string | null
  } | null
}

export type GetCrmMessageQueryVariables = {
  id?: string
}

export type GetCrmMessageQuery = {
  getCRMMessage?: {
    __typename: "CRMMessage"
    id: string
    rootId: string
    crmRoot?: {
      __typename: "CRMRoot"
      id: string
      messages?: {
        __typename: "ModelCRMMessageConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    content: string
    when: string
    authorName: string
    authorId: string
    attachment?: string | null
    attachmentOwner?: string | null
    thread?: {
      __typename: "ModelCRMReplyConnection"
      items: Array<{
        __typename: "CRMReply"
        id: string
        rootId: string
        content: string
        when: string
        authorName: string
        authorId: string
        attachment?: string | null
        attachmentOwner?: string | null
        parentId: string
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type ListCrmMessagesQueryVariables = {
  filter?: ModelCRMMessageFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListCrmMessagesQuery = {
  listCRMMessages?: {
    __typename: "ModelCRMMessageConnection"
    items: Array<{
      __typename: "CRMMessage"
      id: string
      rootId: string
      crmRoot?: {
        __typename: "CRMRoot"
        id: string
        createdAt: string
        updatedAt: string
      } | null
      content: string
      when: string
      authorName: string
      authorId: string
      attachment?: string | null
      attachmentOwner?: string | null
      thread?: {
        __typename: "ModelCRMReplyConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null>
    nextToken?: string | null
  } | null
}

export type GetCrmReplyQueryVariables = {
  id?: string
}

export type GetCrmReplyQuery = {
  getCRMReply?: {
    __typename: "CRMReply"
    id: string
    rootId: string
    content: string
    when: string
    authorName: string
    authorId: string
    attachment?: string | null
    attachmentOwner?: string | null
    parentId: string
    parent?: {
      __typename: "CRMMessage"
      id: string
      rootId: string
      crmRoot?: {
        __typename: "CRMRoot"
        id: string
        createdAt: string
        updatedAt: string
      } | null
      content: string
      when: string
      authorName: string
      authorId: string
      attachment?: string | null
      attachmentOwner?: string | null
      thread?: {
        __typename: "ModelCRMReplyConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type ListCrmReplysQueryVariables = {
  filter?: ModelCRMReplyFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListCrmReplysQuery = {
  listCRMReplys?: {
    __typename: "ModelCRMReplyConnection"
    items: Array<{
      __typename: "CRMReply"
      id: string
      rootId: string
      content: string
      when: string
      authorName: string
      authorId: string
      attachment?: string | null
      attachmentOwner?: string | null
      parentId: string
      parent?: {
        __typename: "CRMMessage"
        id: string
        rootId: string
        content: string
        when: string
        authorName: string
        authorId: string
        attachment?: string | null
        attachmentOwner?: string | null
        createdAt: string
        updatedAt: string
      } | null
      createdAt: string
      updatedAt: string
    } | null>
    nextToken?: string | null
  } | null
}

export type GetMessageQueryVariables = {
  id?: string
}

export type GetMessageQuery = {
  getMessage?: {
    __typename: "Message"
    id: string
    content: string
    when: string
    attachment?: string | null
    attachmentName?: string | null
    attachmentOwner?: string | null
    roomId?: string | null
    userId?: string | null
    postingAs?: string | null
    owner?: string | null
    room?: {
      __typename: "Group"
      id: string
      owner: string
      readGroups?: Array<UserGroupType | null> | null
      ownerOrgID: string
      ownerOrg?: {
        __typename: "Organization"
        id: string
        orgName: string
        adminEmail?: string | null
        phone?: string | null
        admins: Array<string>
        superAdmin: string
        hasPaidState?: string | null
        profileState?: string | null
        address?: string | null
        city?: string | null
        province?: string | null
        postalCode?: string | null
        country?: string | null
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
        parentOrganizationId: string
        createdAt: string
        updatedAt: string
      } | null
      type: string
      name: string
      description: string
      memberCount?: number | null
      members?: {
        __typename: "ModelGroupMemberConnection"
        nextToken?: string | null
      } | null
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
        randomLatitude?: string | null
        randomLongitude?: string | null
      } | null
      length?: string | null
      effort?: string | null
      cost?: string | null
      promotionalText?: string | null
      messages?: {
        __typename: "ModelMessageConnection"
        nextToken?: string | null
      } | null
      eventType?: string | null
      eventUrl?: string | null
      tz?: string | null
      isSponsored?: string | null
      createdAt: string
      updatedAt: string
      ownerUser?: {
        __typename: "User"
        id: string
        given_name: string
        family_name: string
        email?: string | null
        phone?: string | null
        owner?: string | null
        mainUserGroup?: string | null
        stripeCustomerID?: string | null
        stripeSubscriptionID?: string | null
        hasPaidState?: PaidState | null
        profileState?: string | null
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
        createdAt: string
        updatedAt: string
      } | null
    } | null
    replies?: {
      __typename: "ModelReplyConnection"
      items: Array<{
        __typename: "Reply"
        id: string
        content: string
        when: string
        attachment?: string | null
        attachmentName?: string | null
        attachmentOwner?: string | null
        userId: string
        messageId: string
        roomId?: string | null
        parentReplyId: string
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
    author?: {
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
  } | null
}

export type ListMessagesQueryVariables = {
  filter?: ModelMessageFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListMessagesQuery = {
  listMessages?: {
    __typename: "ModelMessageConnection"
    items: Array<{
      __typename: "Message"
      id: string
      content: string
      when: string
      attachment?: string | null
      attachmentName?: string | null
      attachmentOwner?: string | null
      roomId?: string | null
      userId?: string | null
      postingAs?: string | null
      owner?: string | null
      room?: {
        __typename: "Group"
        id: string
        owner: string
        readGroups?: Array<UserGroupType | null> | null
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
      } | null
      replies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
      author?: {
        __typename: "User"
        id: string
        given_name: string
        family_name: string
        email?: string | null
        phone?: string | null
        owner?: string | null
        mainUserGroup?: string | null
        stripeCustomerID?: string | null
        stripeSubscriptionID?: string | null
        hasPaidState?: PaidState | null
        profileState?: string | null
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
        createdAt: string
        updatedAt: string
      } | null
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
    organizationId: string
    owner?: string | null
    resources?: {
      __typename: "ModelResourceConnection"
      items: Array<{
        __typename: "Resource"
        id: string
        owner?: string | null
        type?: string | null
        order?: string | null
        title?: string | null
        subtitle?: string | null
        description?: string | null
        whoIsThisFor?: string | null
        extendedDescription?: string | null
        readGroups?: Array<UserGroupType | null> | null
        resourceID: string
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    organization?: {
      __typename: "Organization"
      id: string
      orgName: string
      adminEmail?: string | null
      phone?: string | null
      admins: Array<string>
      superAdmin: string
      hasPaidState?: string | null
      profileState?: string | null
      address?: string | null
      city?: string | null
      province?: string | null
      postalCode?: string | null
      country?: string | null
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
      orgType?: string | null
      orgSize?: string | null
      denomination?: string | null
      pplServed?: string | null
      sundayAttendance?: string | null
      numberVolunteers?: string | null
      orgDescription?: string | null
      joined?: string | null
      parentOrganizationId: string
      parentOrganization?: {
        __typename: "Organization"
        id: string
        orgName: string
        adminEmail?: string | null
        phone?: string | null
        admins: Array<string>
        superAdmin: string
        hasPaidState?: string | null
        profileState?: string | null
        address?: string | null
        city?: string | null
        province?: string | null
        postalCode?: string | null
        country?: string | null
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
        parentOrganizationId: string
        createdAt: string
        updatedAt: string
      } | null
      subOrganizations?: {
        __typename: "ModelOrganizationConnection"
        nextToken?: string | null
      } | null
      members?: {
        __typename: "ModelOrganizationMemberConnection"
        nextToken?: string | null
      } | null
      ownsGroups?: {
        __typename: "ModelGroupConnection"
        nextToken?: string | null
      } | null
      resource?: {
        __typename: "ModelResourceRootConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    menuItems?: {
      __typename: "ModelResourceMenuItemConnection"
      items: Array<{
        __typename: "ResourceMenuItem"
        id: string
        owner?: string | null
        readGroups?: Array<UserGroupType | null> | null
        type?: ResourceMenuItemType | null
        menuTitle?: string | null
        order?: string | null
        depth?: string | null
        resourceRootID: string
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type ListResourceRootsQueryVariables = {
  filter?: ModelResourceRootFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListResourceRootsQuery = {
  listResourceRoots?: {
    __typename: "ModelResourceRootConnection"
    items: Array<{
      __typename: "ResourceRoot"
      id: string
      type?: string | null
      groupId?: string | null
      organizationId: string
      owner?: string | null
      resources?: {
        __typename: "ModelResourceConnection"
        nextToken?: string | null
      } | null
      organization?: {
        __typename: "Organization"
        id: string
        orgName: string
        adminEmail?: string | null
        phone?: string | null
        admins: Array<string>
        superAdmin: string
        hasPaidState?: string | null
        profileState?: string | null
        address?: string | null
        city?: string | null
        province?: string | null
        postalCode?: string | null
        country?: string | null
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
        parentOrganizationId: string
        createdAt: string
        updatedAt: string
      } | null
      menuItems?: {
        __typename: "ModelResourceMenuItemConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null>
    nextToken?: string | null
  } | null
}

export type GetResourceMenuItemQueryVariables = {
  id?: string
}

export type GetResourceMenuItemQuery = {
  getResourceMenuItem?: {
    __typename: "ResourceMenuItem"
    id: string
    owner?: string | null
    readGroups?: Array<UserGroupType | null> | null
    type?: ResourceMenuItemType | null
    menuTitle?: string | null
    order?: string | null
    depth?: string | null
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
      resourceID?: string | null
      seriesID?: string | null
      episodeID?: string | null
      color?: string | null
      image?: {
        __typename: "Image"
        userId?: string | null
        filenameSmall?: string | null
        filenameMedium?: string | null
        filenameLarge?: string | null
        filenameUpload?: string | null
      } | null
      url?: string | null
      order?: number | null
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
        resourceID?: string | null
        seriesID?: string | null
        episodeID?: string | null
        color?: string | null
        url?: string | null
        order?: number | null
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
        resourceID?: string | null
        seriesID?: string | null
        episodeID?: string | null
        color?: string | null
        url?: string | null
        order?: number | null
      } | null> | null
    } | null> | null
    resourceRootID: string
    resourceRoot: {
      __typename: "ResourceRoot"
      id: string
      type?: string | null
      groupId?: string | null
      organizationId: string
      owner?: string | null
      resources?: {
        __typename: "ModelResourceConnection"
        nextToken?: string | null
      } | null
      organization?: {
        __typename: "Organization"
        id: string
        orgName: string
        adminEmail?: string | null
        phone?: string | null
        admins: Array<string>
        superAdmin: string
        hasPaidState?: string | null
        profileState?: string | null
        address?: string | null
        city?: string | null
        province?: string | null
        postalCode?: string | null
        country?: string | null
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
        parentOrganizationId: string
        createdAt: string
        updatedAt: string
      } | null
      menuItems?: {
        __typename: "ModelResourceMenuItemConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    }
    createdAt: string
    updatedAt: string
  } | null
}

export type ListResourceMenuItemsQueryVariables = {
  filter?: ModelResourceMenuItemFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListResourceMenuItemsQuery = {
  listResourceMenuItems?: {
    __typename: "ModelResourceMenuItemConnection"
    items: Array<{
      __typename: "ResourceMenuItem"
      id: string
      owner?: string | null
      readGroups?: Array<UserGroupType | null> | null
      type?: ResourceMenuItemType | null
      menuTitle?: string | null
      order?: string | null
      depth?: string | null
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
        resourceID?: string | null
        seriesID?: string | null
        episodeID?: string | null
        color?: string | null
        url?: string | null
        order?: number | null
      } | null> | null
      resourceRootID: string
      resourceRoot: {
        __typename: "ResourceRoot"
        id: string
        type?: string | null
        groupId?: string | null
        organizationId: string
        owner?: string | null
        createdAt: string
        updatedAt: string
      }
      createdAt: string
      updatedAt: string
    } | null>
    nextToken?: string | null
  } | null
}

export type GetResourceQueryVariables = {
  id?: string
}

export type GetResourceQuery = {
  getResource?: {
    __typename: "Resource"
    id: string
    owner?: string | null
    type?: string | null
    order?: string | null
    title?: string | null
    subtitle?: string | null
    image?: {
      __typename: "Image"
      userId?: string | null
      filenameSmall?: string | null
      filenameMedium?: string | null
      filenameLarge?: string | null
      filenameUpload?: string | null
    } | null
    description?: string | null
    whoIsThisFor?: string | null
    extendedDescription?: string | null
    readGroups?: Array<UserGroupType | null> | null
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
    series?: {
      __typename: "ModelResourceSeriesConnection"
      items: Array<{
        __typename: "ResourceSeries"
        id: string
        owner?: string | null
        type?: string | null
        title?: string | null
        order?: number | null
        description?: string | null
        whoIsThisFor?: string | null
        category?: Array<string | null> | null
        status?: string | null
        seriesID: string
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    resourceID: string
    resourceRoot: {
      __typename: "ResourceRoot"
      id: string
      type?: string | null
      groupId?: string | null
      organizationId: string
      owner?: string | null
      resources?: {
        __typename: "ModelResourceConnection"
        nextToken?: string | null
      } | null
      organization?: {
        __typename: "Organization"
        id: string
        orgName: string
        adminEmail?: string | null
        phone?: string | null
        admins: Array<string>
        superAdmin: string
        hasPaidState?: string | null
        profileState?: string | null
        address?: string | null
        city?: string | null
        province?: string | null
        postalCode?: string | null
        country?: string | null
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
        parentOrganizationId: string
        createdAt: string
        updatedAt: string
      } | null
      menuItems?: {
        __typename: "ModelResourceMenuItemConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    }
    createdAt: string
    updatedAt: string
  } | null
}

export type ListResourcesQueryVariables = {
  filter?: ModelResourceFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListResourcesQuery = {
  listResources?: {
    __typename: "ModelResourceConnection"
    items: Array<{
      __typename: "Resource"
      id: string
      owner?: string | null
      type?: string | null
      order?: string | null
      title?: string | null
      subtitle?: string | null
      image?: {
        __typename: "Image"
        userId?: string | null
        filenameSmall?: string | null
        filenameMedium?: string | null
        filenameLarge?: string | null
        filenameUpload?: string | null
      } | null
      description?: string | null
      whoIsThisFor?: string | null
      extendedDescription?: string | null
      readGroups?: Array<UserGroupType | null> | null
      details?: Array<{
        __typename: "ResourceDetail"
        type?: ResourceDetailType | null
        name?: string | null
        text?: string | null
        value?: string | null
      } | null> | null
      series?: {
        __typename: "ModelResourceSeriesConnection"
        nextToken?: string | null
      } | null
      resourceID: string
      resourceRoot: {
        __typename: "ResourceRoot"
        id: string
        type?: string | null
        groupId?: string | null
        organizationId: string
        owner?: string | null
        createdAt: string
        updatedAt: string
      }
      createdAt: string
      updatedAt: string
    } | null>
    nextToken?: string | null
  } | null
}

export type GetResourceSeriesQueryVariables = {
  id?: string
}

export type GetResourceSeriesQuery = {
  getResourceSeries?: {
    __typename: "ResourceSeries"
    id: string
    owner?: string | null
    type?: string | null
    title?: string | null
    order?: number | null
    description?: string | null
    whoIsThisFor?: string | null
    imageFile?: {
      __typename: "Image"
      userId?: string | null
      filenameSmall?: string | null
      filenameMedium?: string | null
      filenameLarge?: string | null
      filenameUpload?: string | null
    } | null
    category?: Array<string | null> | null
    status?: string | null
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
    episodes?: {
      __typename: "ModelResourceEpisodeConnection"
      items: Array<{
        __typename: "ResourceEpisode"
        id: string
        owner?: string | null
        episodeNumber?: number | null
        type?: string | null
        title?: string | null
        description?: string | null
        whoIsThisFor?: string | null
        episodeID: string
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    seriesID: string
    parentResource: {
      __typename: "Resource"
      id: string
      owner?: string | null
      type?: string | null
      order?: string | null
      title?: string | null
      subtitle?: string | null
      image?: {
        __typename: "Image"
        userId?: string | null
        filenameSmall?: string | null
        filenameMedium?: string | null
        filenameLarge?: string | null
        filenameUpload?: string | null
      } | null
      description?: string | null
      whoIsThisFor?: string | null
      extendedDescription?: string | null
      readGroups?: Array<UserGroupType | null> | null
      details?: Array<{
        __typename: "ResourceDetail"
        type?: ResourceDetailType | null
        name?: string | null
        text?: string | null
        value?: string | null
      } | null> | null
      series?: {
        __typename: "ModelResourceSeriesConnection"
        nextToken?: string | null
      } | null
      resourceID: string
      resourceRoot: {
        __typename: "ResourceRoot"
        id: string
        type?: string | null
        groupId?: string | null
        organizationId: string
        owner?: string | null
        createdAt: string
        updatedAt: string
      }
      createdAt: string
      updatedAt: string
    }
    createdAt: string
    updatedAt: string
  } | null
}

export type ListResourceSeriessQueryVariables = {
  filter?: ModelResourceSeriesFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListResourceSeriessQuery = {
  listResourceSeriess?: {
    __typename: "ModelResourceSeriesConnection"
    items: Array<{
      __typename: "ResourceSeries"
      id: string
      owner?: string | null
      type?: string | null
      title?: string | null
      order?: number | null
      description?: string | null
      whoIsThisFor?: string | null
      imageFile?: {
        __typename: "Image"
        userId?: string | null
        filenameSmall?: string | null
        filenameMedium?: string | null
        filenameLarge?: string | null
        filenameUpload?: string | null
      } | null
      category?: Array<string | null> | null
      status?: string | null
      details?: Array<{
        __typename: "ResourceDetail"
        type?: ResourceDetailType | null
        name?: string | null
        text?: string | null
        value?: string | null
      } | null> | null
      episodes?: {
        __typename: "ModelResourceEpisodeConnection"
        nextToken?: string | null
      } | null
      seriesID: string
      parentResource: {
        __typename: "Resource"
        id: string
        owner?: string | null
        type?: string | null
        order?: string | null
        title?: string | null
        subtitle?: string | null
        description?: string | null
        whoIsThisFor?: string | null
        extendedDescription?: string | null
        readGroups?: Array<UserGroupType | null> | null
        resourceID: string
        createdAt: string
        updatedAt: string
      }
      createdAt: string
      updatedAt: string
    } | null>
    nextToken?: string | null
  } | null
}

export type GetResourceEpisodeQueryVariables = {
  id?: string
}

export type GetResourceEpisodeQuery = {
  getResourceEpisode?: {
    __typename: "ResourceEpisode"
    id: string
    owner?: string | null
    episodeNumber?: number | null
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
    whoIsThisFor?: string | null
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
    parentSeries: {
      __typename: "ResourceSeries"
      id: string
      owner?: string | null
      type?: string | null
      title?: string | null
      order?: number | null
      description?: string | null
      whoIsThisFor?: string | null
      imageFile?: {
        __typename: "Image"
        userId?: string | null
        filenameSmall?: string | null
        filenameMedium?: string | null
        filenameLarge?: string | null
        filenameUpload?: string | null
      } | null
      category?: Array<string | null> | null
      status?: string | null
      details?: Array<{
        __typename: "ResourceDetail"
        type?: ResourceDetailType | null
        name?: string | null
        text?: string | null
        value?: string | null
      } | null> | null
      episodes?: {
        __typename: "ModelResourceEpisodeConnection"
        nextToken?: string | null
      } | null
      seriesID: string
      parentResource: {
        __typename: "Resource"
        id: string
        owner?: string | null
        type?: string | null
        order?: string | null
        title?: string | null
        subtitle?: string | null
        description?: string | null
        whoIsThisFor?: string | null
        extendedDescription?: string | null
        readGroups?: Array<UserGroupType | null> | null
        resourceID: string
        createdAt: string
        updatedAt: string
      }
      createdAt: string
      updatedAt: string
    }
    createdAt: string
    updatedAt: string
  } | null
}

export type ListResourceEpisodesQueryVariables = {
  filter?: ModelResourceEpisodeFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListResourceEpisodesQuery = {
  listResourceEpisodes?: {
    __typename: "ModelResourceEpisodeConnection"
    items: Array<{
      __typename: "ResourceEpisode"
      id: string
      owner?: string | null
      episodeNumber?: number | null
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
      whoIsThisFor?: string | null
      details?: Array<{
        __typename: "ResourceDetail"
        type?: ResourceDetailType | null
        name?: string | null
        text?: string | null
        value?: string | null
      } | null> | null
      episodeID: string
      parentSeries: {
        __typename: "ResourceSeries"
        id: string
        owner?: string | null
        type?: string | null
        title?: string | null
        order?: number | null
        description?: string | null
        whoIsThisFor?: string | null
        category?: Array<string | null> | null
        status?: string | null
        seriesID: string
        createdAt: string
        updatedAt: string
      }
      createdAt: string
      updatedAt: string
    } | null>
    nextToken?: string | null
  } | null
}

export type GetProductQueryVariables = {
  id?: string
}

export type GetProductQuery = {
  getProduct?: {
    __typename: "Product"
    id: string
    price?: number | null
    pricePer?: string | null
    name?: string | null
    description?: string | null
    confirmationMsg?: string | null
    payments?: {
      __typename: "ModelPaymentConnection"
      items: Array<{
        __typename: "Payment"
        id: string
        productID?: string | null
        userID?: string | null
        dateCompleted?: string | null
        paymentType?: string | null
        paymentInfo?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    isOrgTier?: string | null
    isIndividualTier?: string | null
    isLogin?: string | null
    marketingDescription?: string | null
    groupsIncluded?: Array<string | null> | null
    enabled?: string | null
    isStripe?: string | null
    isPaypal?: string | null
    tiered?: Array<{
      __typename: "TieredProduct"
      name?: string | null
      stripePaymentID?: string | null
      stripeIsTiered?: string | null
    } | null> | null
    createdAt: string
    updatedAt: string
  } | null
}

export type ListProductsQueryVariables = {
  filter?: ModelProductFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListProductsQuery = {
  listProducts?: {
    __typename: "ModelProductConnection"
    items: Array<{
      __typename: "Product"
      id: string
      price?: number | null
      pricePer?: string | null
      name?: string | null
      description?: string | null
      confirmationMsg?: string | null
      payments?: {
        __typename: "ModelPaymentConnection"
        nextToken?: string | null
      } | null
      isOrgTier?: string | null
      isIndividualTier?: string | null
      isLogin?: string | null
      marketingDescription?: string | null
      groupsIncluded?: Array<string | null> | null
      enabled?: string | null
      isStripe?: string | null
      isPaypal?: string | null
      tiered?: Array<{
        __typename: "TieredProduct"
        name?: string | null
        stripePaymentID?: string | null
        stripeIsTiered?: string | null
      } | null> | null
      createdAt: string
      updatedAt: string
    } | null>
    nextToken?: string | null
  } | null
}

export type GetVodAssetQueryVariables = {
  id?: string
}

export type GetVodAssetQuery = {
  getVodAsset?: {
    __typename: "vodAsset"
    id: string
    title: string
    description: string
    video?: {
      __typename: "videoObject"
      id: string
      createdAt: string
      updatedAt: string
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type ListVodAssetsQueryVariables = {
  filter?: ModelvodAssetFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListVodAssetsQuery = {
  listVodAssets?: {
    __typename: "ModelvodAssetConnection"
    items: Array<{
      __typename: "vodAsset"
      id: string
      title: string
      description: string
      video?: {
        __typename: "videoObject"
        id: string
        createdAt: string
        updatedAt: string
      } | null
      createdAt: string
      updatedAt: string
    } | null>
    nextToken?: string | null
  } | null
}

export type GetVideoObjectQueryVariables = {
  id?: string
}

export type GetVideoObjectQuery = {
  getVideoObject?: {
    __typename: "videoObject"
    id: string
    createdAt: string
    updatedAt: string
  } | null
}

export type ListVideoObjectsQueryVariables = {
  filter?: ModelvideoObjectFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListVideoObjectsQuery = {
  listVideoObjects?: {
    __typename: "ModelvideoObjectConnection"
    items: Array<{
      __typename: "videoObject"
      id: string
      createdAt: string
      updatedAt: string
    } | null>
    nextToken?: string | null
  } | null
}

export type GetStartupQueryVariables = {
  id?: string
}

export type GetStartupQuery = {
  getStartup?: {
    __typename: "Startup"
    id: string
    order?: number | null
    action?: string | null
    params?: string | null
    readGroups?: Array<UserGroupType | null> | null
    createdAt: string
    updatedAt: string
  } | null
}

export type ListStartupsQueryVariables = {
  filter?: ModelStartupFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListStartupsQuery = {
  listStartups?: {
    __typename: "ModelStartupConnection"
    items: Array<{
      __typename: "Startup"
      id: string
      order?: number | null
      action?: string | null
      params?: string | null
      readGroups?: Array<UserGroupType | null> | null
      createdAt: string
      updatedAt: string
    } | null>
    nextToken?: string | null
  } | null
}

export type GetMenuQueryVariables = {
  id?: string
}

export type GetMenuQuery = {
  getMenu?: {
    __typename: "Menu"
    id: string
    order?: number | null
    name?: string | null
    action?: string | null
    params?: string | null
    readGroups?: Array<UserGroupType | null> | null
    subItems?: {
      __typename: "ModelSubMenuConnection"
      items: Array<{
        __typename: "SubMenu"
        id: string
        menuID?: string | null
        order?: number | null
        name?: string | null
        action?: string | null
        params?: string | null
        readGroups?: Array<UserGroupType | null> | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
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
      order?: number | null
      name?: string | null
      action?: string | null
      params?: string | null
      readGroups?: Array<UserGroupType | null> | null
      subItems?: {
        __typename: "ModelSubMenuConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null>
    nextToken?: string | null
  } | null
}

export type GetSubMenuQueryVariables = {
  id?: string
}

export type GetSubMenuQuery = {
  getSubMenu?: {
    __typename: "SubMenu"
    id: string
    menuID?: string | null
    order?: number | null
    menu?: {
      __typename: "Menu"
      id: string
      order?: number | null
      name?: string | null
      action?: string | null
      params?: string | null
      readGroups?: Array<UserGroupType | null> | null
      subItems?: {
        __typename: "ModelSubMenuConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    name?: string | null
    action?: string | null
    params?: string | null
    readGroups?: Array<UserGroupType | null> | null
    createdAt: string
    updatedAt: string
  } | null
}

export type ListSubMenusQueryVariables = {
  filter?: ModelSubMenuFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListSubMenusQuery = {
  listSubMenus?: {
    __typename: "ModelSubMenuConnection"
    items: Array<{
      __typename: "SubMenu"
      id: string
      menuID?: string | null
      order?: number | null
      menu?: {
        __typename: "Menu"
        id: string
        order?: number | null
        name?: string | null
        action?: string | null
        params?: string | null
        readGroups?: Array<UserGroupType | null> | null
        createdAt: string
        updatedAt: string
      } | null
      name?: string | null
      action?: string | null
      params?: string | null
      readGroups?: Array<UserGroupType | null> | null
      createdAt: string
      updatedAt: string
    } | null>
    nextToken?: string | null
  } | null
}

export type GroupMemberByGroupQueryVariables = {
  groupID?: string | null
  userID?: ModelIDKeyConditionInput | null
  sortDirection?: ModelSortDirection | null
  filter?: ModelGroupMemberFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type GroupMemberByGroupQuery = {
  groupMemberByGroup?: {
    __typename: "ModelGroupMemberConnection"
    items: Array<{
      __typename: "GroupMember"
      id: string
      groupID?: string | null
      userID?: string | null
      group?: {
        __typename: "Group"
        id: string
        owner: string
        readGroups?: Array<UserGroupType | null> | null
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
      } | null
      createdAt: string
      updatedAt: string
      user?: {
        __typename: "User"
        id: string
        given_name: string
        family_name: string
        email?: string | null
        phone?: string | null
        owner?: string | null
        mainUserGroup?: string | null
        stripeCustomerID?: string | null
        stripeSubscriptionID?: string | null
        hasPaidState?: PaidState | null
        profileState?: string | null
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
        createdAt: string
        updatedAt: string
      } | null
    } | null>
    nextToken?: string | null
  } | null
}

export type GroupMemberByUserQueryVariables = {
  userID?: string | null
  groupID?: ModelIDKeyConditionInput | null
  sortDirection?: ModelSortDirection | null
  filter?: ModelGroupMemberFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type GroupMemberByUserQuery = {
  groupMemberByUser?: {
    __typename: "ModelGroupMemberConnection"
    items: Array<{
      __typename: "GroupMember"
      id: string
      groupID?: string | null
      userID?: string | null
      group?: {
        __typename: "Group"
        id: string
        owner: string
        readGroups?: Array<UserGroupType | null> | null
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
      } | null
      createdAt: string
      updatedAt: string
      user?: {
        __typename: "User"
        id: string
        given_name: string
        family_name: string
        email?: string | null
        phone?: string | null
        owner?: string | null
        mainUserGroup?: string | null
        stripeCustomerID?: string | null
        stripeSubscriptionID?: string | null
        hasPaidState?: PaidState | null
        profileState?: string | null
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
        createdAt: string
        updatedAt: string
      } | null
    } | null>
    nextToken?: string | null
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
      readGroups?: Array<UserGroupType | null> | null
      ownerOrgID: string
      ownerOrg?: {
        __typename: "Organization"
        id: string
        orgName: string
        adminEmail?: string | null
        phone?: string | null
        admins: Array<string>
        superAdmin: string
        hasPaidState?: string | null
        profileState?: string | null
        address?: string | null
        city?: string | null
        province?: string | null
        postalCode?: string | null
        country?: string | null
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
        parentOrganizationId: string
        createdAt: string
        updatedAt: string
      } | null
      type: string
      name: string
      description: string
      memberCount?: number | null
      members?: {
        __typename: "ModelGroupMemberConnection"
        nextToken?: string | null
      } | null
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
        randomLatitude?: string | null
        randomLongitude?: string | null
      } | null
      length?: string | null
      effort?: string | null
      cost?: string | null
      promotionalText?: string | null
      messages?: {
        __typename: "ModelMessageConnection"
        nextToken?: string | null
      } | null
      eventType?: string | null
      eventUrl?: string | null
      tz?: string | null
      isSponsored?: string | null
      createdAt: string
      updatedAt: string
      ownerUser?: {
        __typename: "User"
        id: string
        given_name: string
        family_name: string
        email?: string | null
        phone?: string | null
        owner?: string | null
        mainUserGroup?: string | null
        stripeCustomerID?: string | null
        stripeSubscriptionID?: string | null
        hasPaidState?: PaidState | null
        profileState?: string | null
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
        createdAt: string
        updatedAt: string
      } | null
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
      readGroups?: Array<UserGroupType | null> | null
      ownerOrgID: string
      ownerOrg?: {
        __typename: "Organization"
        id: string
        orgName: string
        adminEmail?: string | null
        phone?: string | null
        admins: Array<string>
        superAdmin: string
        hasPaidState?: string | null
        profileState?: string | null
        address?: string | null
        city?: string | null
        province?: string | null
        postalCode?: string | null
        country?: string | null
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
        parentOrganizationId: string
        createdAt: string
        updatedAt: string
      } | null
      type: string
      name: string
      description: string
      memberCount?: number | null
      members?: {
        __typename: "ModelGroupMemberConnection"
        nextToken?: string | null
      } | null
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
        randomLatitude?: string | null
        randomLongitude?: string | null
      } | null
      length?: string | null
      effort?: string | null
      cost?: string | null
      promotionalText?: string | null
      messages?: {
        __typename: "ModelMessageConnection"
        nextToken?: string | null
      } | null
      eventType?: string | null
      eventUrl?: string | null
      tz?: string | null
      isSponsored?: string | null
      createdAt: string
      updatedAt: string
      ownerUser?: {
        __typename: "User"
        id: string
        given_name: string
        family_name: string
        email?: string | null
        phone?: string | null
        owner?: string | null
        mainUserGroup?: string | null
        stripeCustomerID?: string | null
        stripeSubscriptionID?: string | null
        hasPaidState?: PaidState | null
        profileState?: string | null
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
        createdAt: string
        updatedAt: string
      } | null
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
      owner?: {
        __typename: "User"
        id: string
        given_name: string
        family_name: string
        email?: string | null
        phone?: string | null
        owner?: string | null
        mainUserGroup?: string | null
        stripeCustomerID?: string | null
        stripeSubscriptionID?: string | null
        hasPaidState?: PaidState | null
        profileState?: string | null
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
        createdAt: string
        updatedAt: string
      } | null
    } | null>
    nextToken?: string | null
  } | null
}

export type PaymentByUserQueryVariables = {
  userID?: string | null
  sortDirection?: ModelSortDirection | null
  filter?: ModelPaymentFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type PaymentByUserQuery = {
  paymentByUser?: {
    __typename: "ModelPaymentConnection"
    items: Array<{
      __typename: "Payment"
      id: string
      productID?: string | null
      product?: {
        __typename: "Product"
        id: string
        price?: number | null
        pricePer?: string | null
        name?: string | null
        description?: string | null
        confirmationMsg?: string | null
        isOrgTier?: string | null
        isIndividualTier?: string | null
        isLogin?: string | null
        marketingDescription?: string | null
        groupsIncluded?: Array<string | null> | null
        enabled?: string | null
        isStripe?: string | null
        isPaypal?: string | null
        createdAt: string
        updatedAt: string
      } | null
      userID?: string | null
      dateCompleted?: string | null
      paymentType?: string | null
      paymentInfo?: string | null
      createdAt: string
      updatedAt: string
      user?: {
        __typename: "User"
        id: string
        given_name: string
        family_name: string
        email?: string | null
        phone?: string | null
        owner?: string | null
        mainUserGroup?: string | null
        stripeCustomerID?: string | null
        stripeSubscriptionID?: string | null
        hasPaidState?: PaidState | null
        profileState?: string | null
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
        createdAt: string
        updatedAt: string
      } | null
    } | null>
    nextToken?: string | null
  } | null
}

export type CourseTriadUserByUserQueryVariables = {
  userID?: string | null
  sortDirection?: ModelSortDirection | null
  filter?: ModelCourseTriadUsersFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type CourseTriadUserByUserQuery = {
  courseTriadUserByUser?: {
    __typename: "ModelCourseTriadUsersConnection"
    items: Array<{
      __typename: "CourseTriadUsers"
      id: string
      triadID?: string | null
      triad?: {
        __typename: "CourseTriads"
        id: string
        courseInfoID?: string | null
        createdAt: string
        updatedAt: string
      } | null
      userID?: string | null
      createdAt: string
      updatedAt: string
      user?: {
        __typename: "User"
        id: string
        given_name: string
        family_name: string
        email?: string | null
        phone?: string | null
        owner?: string | null
        mainUserGroup?: string | null
        stripeCustomerID?: string | null
        stripeSubscriptionID?: string | null
        hasPaidState?: PaidState | null
        profileState?: string | null
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
        createdAt: string
        updatedAt: string
      } | null
    } | null>
    nextToken?: string | null
  } | null
}

export type DmUsersByUserQueryVariables = {
  roomID?: string | null
  userID?: ModelIDKeyConditionInput | null
  sortDirection?: ModelSortDirection | null
  filter?: ModelDirectMessageUserFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type DmUsersByUserQuery = {
  dmUsersByUser?: {
    __typename: "ModelDirectMessageUserConnection"
    items: Array<{
      __typename: "DirectMessageUser"
      id: string
      userName?: string | null
      userID: string
      roomID: string
      room?: {
        __typename: "DirectMessageRoom"
        id: string
        name?: string | null
        roomType?: string | null
        createdAt: string
        updatedAt: string
      } | null
      createdAt: string
      updatedAt: string
      user?: {
        __typename: "User"
        id: string
        given_name: string
        family_name: string
        email?: string | null
        phone?: string | null
        owner?: string | null
        mainUserGroup?: string | null
        stripeCustomerID?: string | null
        stripeSubscriptionID?: string | null
        hasPaidState?: PaidState | null
        profileState?: string | null
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
        createdAt: string
        updatedAt: string
      } | null
    } | null>
    nextToken?: string | null
  } | null
}

export type DirectMessagesByRoomQueryVariables = {
  messageRoomID?: string | null
  when?: ModelStringKeyConditionInput | null
  sortDirection?: ModelSortDirection | null
  filter?: ModelDirectMessageFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type DirectMessagesByRoomQuery = {
  directMessagesByRoom?: {
    __typename: "ModelDirectMessageConnection"
    items: Array<{
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
        nextToken?: string | null
      } | null
      messageRoomID: string
      messageRoom?: {
        __typename: "DirectMessageRoom"
        id: string
        name?: string | null
        roomType?: string | null
        createdAt: string
        updatedAt: string
      } | null
      createdAt: string
      updatedAt: string
      author?: {
        __typename: "User"
        id: string
        given_name: string
        family_name: string
        email?: string | null
        phone?: string | null
        owner?: string | null
        mainUserGroup?: string | null
        stripeCustomerID?: string | null
        stripeSubscriptionID?: string | null
        hasPaidState?: PaidState | null
        profileState?: string | null
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
        createdAt: string
        updatedAt: string
      } | null
    } | null>
    nextToken?: string | null
  } | null
}

export type MessagesByRoomQueryVariables = {
  roomId?: string | null
  when?: ModelStringKeyConditionInput | null
  sortDirection?: ModelSortDirection | null
  filter?: ModelMessageFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type MessagesByRoomQuery = {
  messagesByRoom?: {
    __typename: "ModelMessageConnection"
    items: Array<{
      __typename: "Message"
      id: string
      content: string
      when: string
      attachment?: string | null
      attachmentName?: string | null
      attachmentOwner?: string | null
      roomId?: string | null
      userId?: string | null
      postingAs?: string | null
      owner?: string | null
      room?: {
        __typename: "Group"
        id: string
        owner: string
        readGroups?: Array<UserGroupType | null> | null
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
      } | null
      replies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
      author?: {
        __typename: "User"
        id: string
        given_name: string
        family_name: string
        email?: string | null
        phone?: string | null
        owner?: string | null
        mainUserGroup?: string | null
        stripeCustomerID?: string | null
        stripeSubscriptionID?: string | null
        hasPaidState?: PaidState | null
        profileState?: string | null
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
        createdAt: string
        updatedAt: string
      } | null
    } | null>
    nextToken?: string | null
  } | null
}

export type SearchGroupsQueryVariables = {
  filter?: SearchableGroupFilterInput | null
  sort?: SearchableGroupSortInput | null
  limit?: number | null
  nextToken?: string | null
  from?: number | null
}

export type SearchGroupsQuery = {
  searchGroups?: {
    __typename: "SearchableGroupConnection"
    items: Array<{
      __typename: "Group"
      id: string
      owner: string
      readGroups?: Array<UserGroupType | null> | null
      ownerOrgID: string
      ownerOrg?: {
        __typename: "Organization"
        id: string
        orgName: string
        adminEmail?: string | null
        phone?: string | null
        admins: Array<string>
        superAdmin: string
        hasPaidState?: string | null
        profileState?: string | null
        address?: string | null
        city?: string | null
        province?: string | null
        postalCode?: string | null
        country?: string | null
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
        parentOrganizationId: string
        createdAt: string
        updatedAt: string
      } | null
      type: string
      name: string
      description: string
      memberCount?: number | null
      members?: {
        __typename: "ModelGroupMemberConnection"
        nextToken?: string | null
      } | null
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
        randomLatitude?: string | null
        randomLongitude?: string | null
      } | null
      length?: string | null
      effort?: string | null
      cost?: string | null
      promotionalText?: string | null
      messages?: {
        __typename: "ModelMessageConnection"
        nextToken?: string | null
      } | null
      eventType?: string | null
      eventUrl?: string | null
      tz?: string | null
      isSponsored?: string | null
      createdAt: string
      updatedAt: string
      ownerUser?: {
        __typename: "User"
        id: string
        given_name: string
        family_name: string
        email?: string | null
        phone?: string | null
        owner?: string | null
        mainUserGroup?: string | null
        stripeCustomerID?: string | null
        stripeSubscriptionID?: string | null
        hasPaidState?: PaidState | null
        profileState?: string | null
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
        createdAt: string
        updatedAt: string
      } | null
    } | null>
    nextToken?: string | null
    total?: number | null
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
    email?: string | null
    phone?: string | null
    owner?: string | null
    mainUserGroup?: string | null
    stripeCustomerID?: string | null
    stripeSubscriptionID?: string | null
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
        readGroups?: Array<UserGroupType | null> | null
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
    messages?: {
      __typename: "ModelMessageConnection"
      items: Array<{
        __typename: "Message"
        id: string
        content: string
        when: string
        attachment?: string | null
        attachmentName?: string | null
        attachmentOwner?: string | null
        roomId?: string | null
        userId?: string | null
        postingAs?: string | null
        owner?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    directMessages?: {
      __typename: "ModelDirectMessageConnection"
      items: Array<{
        __typename: "DirectMessage"
        id: string
        content?: string | null
        attachment?: string | null
        attachmentName?: string | null
        attachmentOwner?: string | null
        when: string
        recipients: Array<string | null>
        userId: string
        messageRoomID: string
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    messageReplies?: {
      __typename: "ModelReplyConnection"
      items: Array<{
        __typename: "Reply"
        id: string
        content: string
        when: string
        attachment?: string | null
        attachmentName?: string | null
        attachmentOwner?: string | null
        userId: string
        messageId: string
        roomId?: string | null
        parentReplyId: string
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    coachingTriad?: {
      __typename: "ModelCourseTriadCoachesConnection"
      items: Array<{
        __typename: "CourseTriadCoaches"
        id: string
        triadID?: string | null
        userID?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    userTriad?: {
      __typename: "ModelCourseTriadUsersConnection"
      items: Array<{
        __typename: "CourseTriadUsers"
        id: string
        triadID?: string | null
        userID?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    courseInstructing?: {
      __typename: "ModelCourseInstructorsConnection"
      items: Array<{
        __typename: "CourseInstructors"
        id: string
        courseInfoID?: string | null
        userID?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    courseBackOfficeStaff?: {
      __typename: "ModelCourseBackOfficeStaffConnection"
      items: Array<{
        __typename: "CourseBackOfficeStaff"
        id: string
        courseInfoID?: string | null
        userID?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    payments?: {
      __typename: "ModelPaymentConnection"
      items: Array<{
        __typename: "Payment"
        id: string
        productID?: string | null
        userID?: string | null
        dateCompleted?: string | null
        paymentType?: string | null
        paymentInfo?: string | null
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

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListUsersQuery = {
  listUsers?: {
    __typename: "ModelUserConnection"
    items: Array<{
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
    } | null>
    nextToken?: string | null
  } | null
}

export type SearchUsersQueryVariables = {
  filter?: SearchableUserFilterInput | null
  sort?: SearchableUserSortInput | null
  limit?: number | null
  nextToken?: string | null
  from?: number | null
}

export type SearchUsersQuery = {
  searchUsers?: {
    __typename: "SearchableUserConnection"
    items: Array<{
      __typename: "User"
      id: string
      given_name: string
      family_name: string
      email?: string | null
      phone?: string | null
      owner?: string | null
      mainUserGroup?: string | null
      stripeCustomerID?: string | null
      stripeSubscriptionID?: string | null
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
        nextToken?: string | null
      } | null
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
      messageReplies?: {
        __typename: "ModelReplyConnection"
        nextToken?: string | null
      } | null
      coachingTriad?: {
        __typename: "ModelCourseTriadCoachesConnection"
        nextToken?: string | null
      } | null
      userTriad?: {
        __typename: "ModelCourseTriadUsersConnection"
        nextToken?: string | null
      } | null
      courseInstructing?: {
        __typename: "ModelCourseInstructorsConnection"
        nextToken?: string | null
      } | null
      courseBackOfficeStaff?: {
        __typename: "ModelCourseBackOfficeStaffConnection"
        nextToken?: string | null
      } | null
      payments?: {
        __typename: "ModelPaymentConnection"
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
    } | null>
    nextToken?: string | null
    total?: number | null
  } | null
}

export type GetCustomPricingQueryVariables = {
  id?: string
}

export type GetCustomPricingQuery = {
  getCustomPricing?: {
    __typename: "CustomPricing"
    id: string
    emailAddress?: string | null
    type?: CustomPricingType | null
    lineItems?: Array<{
      __typename: "LineItem"
      itemId?: string | null
      count?: string | null
      amount?: string | null
      description?: string | null
    } | null> | null
    createdAt: string
    updatedAt: string
  } | null
}

export type ListCustomPricingsQueryVariables = {
  filter?: ModelCustomPricingFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListCustomPricingsQuery = {
  listCustomPricings?: {
    __typename: "ModelCustomPricingConnection"
    items: Array<{
      __typename: "CustomPricing"
      id: string
      emailAddress?: string | null
      type?: CustomPricingType | null
      lineItems?: Array<{
        __typename: "LineItem"
        itemId?: string | null
        count?: string | null
        amount?: string | null
        description?: string | null
      } | null> | null
      createdAt: string
      updatedAt: string
    } | null>
    nextToken?: string | null
  } | null
}
