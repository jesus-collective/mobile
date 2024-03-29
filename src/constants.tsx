let env
if (window.location === undefined) env = "mobile"
else if (window.location.hostname === "localhost") env = "dev"
else if (window.location.hostname.includes("beta")) env = "beta"
else if (window.location.hostname.includes("dev")) env = "dev"
else if (window.location.hostname.includes("d13j9gfr4f50wr")) env = "jcfacelift"
else env = "beta"

export const constants: { [index: string]: boolean | string } = {
  SETTING_ISVISIBLE_course: true,
  SETTING_ISVISIBLE_organization: true,
  SETTING_ISVISIBLE_SETTINGS: true,
  SETTING_ISVISIBLE_resource: true,
  SETTING_ISVISIBLE_group: true,
  SETTING_ISVISIBLE_event: true,
  SETTING_ISVISIBLE_profile: true,
  SETTING_ISVISIBLE_conversation: false,
  SETTING_ISVISIBLE_CREATE_course: true,
  SETTING_ISVISIBLE_CREATE_organization: true,
  SETTING_ISVISIBLE_CREATE_resource: true,
  SETTING_ISVISIBLE_CREATE_group: true,
  SETTING_ISVISIBLE_CREATE_event: true,
  SETTING_ISVISIBLE_CREATE_conversation: false,
  SETTING_ISVISIBLE_orgs: true,
  SETTING_ISVISIBLE_people: true,
  SETTING_ISVISIBLE_BELL: false,
  SETTING_MENU_custom: true,

  SETTING_ISVISIBLE_SHOWRECOMMENDED: false,
  SETTING_ISVISIBLE_SHOWMY: false,
  SETTING_ISVISIBLE_SEARCH: true,
  SETTING_ISVISIBLE_MESSAGES: true,
  SETTING_ISVISIBLE_MAP: false,
  SETTING_ISVISIBLE_PROFILE_MESSAGES: true,
  SETTING_ISVISIBLE_PROFILE_ACCOUNTSETTINGS: true,
  SETTING_ISVISIBLE_PROFILE_BILLING: true,
  SETTING_ISVISIBLE_RESOURCE_IMPORT: false,
  SETTING_ISVISIBLE_SHOWMYFILTER: true,
  SETTING_ISVISIBLE_SHOWEVENTFILTER: true,
  SETTING_ISVISIBLE_ADMIN: true,
  SETTING_ISVISIBLE_MEMBER_COUNT: false,
  SETTING_ISVISIBLE_NEED_HELP: false,
  SETTING_ISVISIBLE_COURSE_CALENDAR: true,
  SETTING_ISVISIBLE_COURSE_ACTIVITIES: false,
  SETTING_ISVISIBLE_EVENTS_SHOW_RECOMMENDED: false,
  SETTING_ISVISIBLE_COURSE_TODO: true,
  SETTING_KY_GROUP_ID: env == "beta" ? "resource-1611326161952" : "resource-1608148143731",
}
