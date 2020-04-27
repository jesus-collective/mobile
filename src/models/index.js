// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Message, User, Group, GroupMember, CourseInfo, CourseWeek, CourseLesson, CourseAssignment, ResourceRoot, Resource, ResourceSeries, ResourceEpisode, Image } = initSchema(schema);

export {
  Message,
  User,
  Group,
  GroupMember,
  CourseInfo,
  CourseWeek,
  CourseLesson,
  CourseAssignment,
  ResourceRoot,
  Resource,
  ResourceSeries,
  ResourceEpisode,
  Image
};