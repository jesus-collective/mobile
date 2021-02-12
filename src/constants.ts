let env
if (window.location === undefined) env = "mobile"
else if (window.location.hostname === "localhost") env = "dev"
else if (window.location.hostname.includes("beta")) env = "beta"
else if (window.location.hostname.includes("dev")) env = "dev"
else env = "prod"
export const constants = {
  SETTING_ISVISIBLE_course: true,
  SETTING_ISVISIBLE_organization: true,
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

  SETTING_ISVISIBLE_SHOWRECOMMENDED: false,
  SETTING_ISVISIBLE_SHOWMY: false,
  SETTING_ISVISIBLE_SEARCH: false,
  SETTING_ISVISIBLE_MAP: true,
  SETTING_ISVISIBLE_PROFILE_MESSAGES: true,
  SETTING_ISVISIBLE_PROFILE_ACCOUNTSETTINGS: true,
  SETTING_ISVISIBLE_PROFILE_BILLING: true,
  SETTING_ISVISIBLE_RESOURCE_IMPORT: false,
  SETTING_ISVISIBLE_SHOWMYFILTER: true,
  SETTING_ISVISIBLE_SHOWEVENTFILTER: true,
  SETTING_ISVISIBLE_ADMIN: true,
  SETTING_ISVISIBLE_MEMBER_COUNT: false,
  SETTING_ISVISIBLE_NEED_HELP: false,

  SETTING_KY_GROUP_ID: env == "beta" ? "resource-1611326161952" : "resource-1608148143731",
}
