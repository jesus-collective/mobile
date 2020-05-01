import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class Image {
  readonly userId?: string;
  readonly filenameSmall?: string;
  readonly filenameMedium?: string;
  readonly filenameLarge?: string;
  readonly filenameUpload?: string;
  constructor(init: ModelInit<Image>);
}

export declare class Message {
  readonly id: string;
  readonly content: string;
  readonly when: string;
  readonly roomId?: string;
  readonly userId?: string;
  readonly owner?: string;
  readonly author?: User;
  readonly room?: Group;
  constructor(init: ModelInit<Message>);
  static copyOf(source: Message, mutator: (draft: MutableModel<Message>) => MutableModel<Message> | void): Message;
}

export declare class User {
  readonly id: string;
  readonly given_name: string;
  readonly family_name: string;
  readonly email?: string;
  readonly phone?: string;
  readonly owner?: string;
  readonly hasPaidState?: string;
  readonly address?: string;
  readonly city?: string;
  readonly province?: string;
  readonly postalCode?: string;
  readonly country?: string;
  readonly profileImage?: Image;
  readonly aboutMeShort?: string;
  readonly aboutMeLong?: string;
  readonly interests?: string;
  readonly currentRole?: string;
  readonly currentScope?: string;
  readonly personality?: string;
  readonly orgName?: string;
  readonly orgType?: string;
  readonly orgSize?: string;
  readonly orgDescription?: string;
  readonly joined?: string;
  readonly owns?: Group[];
  readonly groups?: GroupMember[];
  readonly messages?: Message[];
  constructor(init: ModelInit<User>);
  static copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

export declare class Group {
  readonly id: string;
  readonly owner: string;
  readonly ownerUser?: User;
  readonly type: string;
  readonly name: string;
  readonly description: string;
  readonly memberCount?: number;
  readonly members?: GroupMember[];
  readonly image: string;
  readonly time?: string;
  readonly lastUpdated?: string;
  readonly location?: string;
  readonly length?: string;
  readonly effort?: string;
  readonly cost?: string;
  readonly messages?: Message[];
  readonly eventType?: string;
  readonly eventUrl?: string;
  constructor(init: ModelInit<Group>);
  static copyOf(source: Group, mutator: (draft: MutableModel<Group>) => MutableModel<Group> | void): Group;
}

export declare class GroupMember {
  readonly id: string;
  readonly groupID?: string;
  readonly userID?: string;
  readonly group?: Group;
  readonly user?: User;
  constructor(init: ModelInit<GroupMember>);
  static copyOf(source: GroupMember, mutator: (draft: MutableModel<GroupMember>) => MutableModel<GroupMember> | void): GroupMember;
}

export declare class CourseInfo {
  readonly id: string;
  readonly designedBy?: string;
  readonly summary?: string[];
  readonly courseWeeks?: CourseWeek[];
  readonly subTitle?: string;
  readonly introduction?: string[];
  constructor(init: ModelInit<CourseInfo>);
  static copyOf(source: CourseInfo, mutator: (draft: MutableModel<CourseInfo>) => MutableModel<CourseInfo> | void): CourseInfo;
}

export declare class CourseWeek {
  readonly id: string;
  readonly week?: string;
  readonly date?: string;
  readonly name?: string;
  readonly leader?: string;
  readonly courseInfo?: CourseInfo;
  readonly lessons?: CourseLesson[];
  constructor(init: ModelInit<CourseWeek>);
  static copyOf(source: CourseWeek, mutator: (draft: MutableModel<CourseWeek>) => MutableModel<CourseWeek> | void): CourseWeek;
}

export declare class CourseLesson {
  readonly id: string;
  readonly name?: string;
  readonly time?: string;
  readonly description?: string[];
  readonly courseWeek?: CourseWeek;
  readonly assignments?: CourseAssignment[];
  constructor(init: ModelInit<CourseLesson>);
  static copyOf(source: CourseLesson, mutator: (draft: MutableModel<CourseLesson>) => MutableModel<CourseLesson> | void): CourseLesson;
}

export declare class CourseAssignment {
  readonly id: string;
  readonly due?: string;
  readonly description?: string;
  readonly courseLesson?: CourseLesson;
  constructor(init: ModelInit<CourseAssignment>);
  static copyOf(source: CourseAssignment, mutator: (draft: MutableModel<CourseAssignment>) => MutableModel<CourseAssignment> | void): CourseAssignment;
}

export declare class ResourceRoot {
  readonly id: string;
  readonly type?: string;
  readonly groupId?: string;
  readonly resources?: Resource[];
  constructor(init: ModelInit<ResourceRoot>);
  static copyOf(source: ResourceRoot, mutator: (draft: MutableModel<ResourceRoot>) => MutableModel<ResourceRoot> | void): ResourceRoot;
}

export declare class Resource {
  readonly id: string;
  readonly type?: string;
  readonly menuTitle?: string;
  readonly title?: string;
  readonly image?: Image;
  readonly description?: string;
  readonly extendedDescription?: string;
  readonly series?: ResourceSeries[];
  readonly root?: ResourceRoot;
  constructor(init: ModelInit<Resource>);
  static copyOf(source: Resource, mutator: (draft: MutableModel<Resource>) => MutableModel<Resource> | void): Resource;
}

export declare class ResourceSeries {
  readonly id: string;
  readonly type?: string;
  readonly title?: string;
  readonly description?: string;
  readonly image?: string;
  readonly category?: string[];
  readonly status?: string;
  readonly allFiles?: string;
  readonly playlist?: string;
  readonly playlistImage?: string;
  readonly episodes?: ResourceEpisode[];
  readonly resource?: Resource;
  constructor(init: ModelInit<ResourceSeries>);
  static copyOf(source: ResourceSeries, mutator: (draft: MutableModel<ResourceSeries>) => MutableModel<ResourceSeries> | void): ResourceSeries;
}

export declare class ResourceEpisode {
  readonly id: string;
  readonly episodeNumber?: number;
  readonly type?: string;
  readonly title?: string;
  readonly description?: string;
  readonly videoPreview?: string;
  readonly videoLowRes?: string;
  readonly videoHiRes?: string;
  readonly lessonPlan?: string;
  readonly activityPage?: string;
  readonly series?: ResourceSeries;
  constructor(init: ModelInit<ResourceEpisode>);
  static copyOf(source: ResourceEpisode, mutator: (draft: MutableModel<ResourceEpisode>) => MutableModel<ResourceEpisode> | void): ResourceEpisode;
}