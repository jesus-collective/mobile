import isAbsoluteUrl from "is-absolute-url"
import { orgTypesChurches, orgTypesNonChurch } from "../MyProfile/DropdownOptions"
import { OrganizationData } from "../OrganizationViewer/OrganizationViewer"

type ValidationResult = {
  result: boolean
  validationError: string
}
export default class Validate {
  static Profile(data: any, profileConfig: any): ValidationResult {
    if (!profileConfig) return { result: false, validationError: "No Config" }
    if (profileConfig["aboutMeShort"].isRequired)
      if (data.aboutMeShort == null || data.aboutMeShort == "")
        return { result: false, validationError: "Profile must have - short about me" }
    if (profileConfig["aboutMeLong"].isRequired)
      if (data.aboutMeLong == null || data.aboutMeLong == "")
        return { result: false, validationError: "Profile must have - long about me" }
    if (profileConfig["fullName"].isRequired) {
      if (data.given_name == null || data.given_name == "")
        return { result: false, validationError: "Profile must have - given name" }
      if (data.family_name == null || data.family_name == "")
        return { result: false, validationError: "Profile must have - family name" }
    }
    /*
    if (data.email == null || data.email == "")
      return { result: false, validationError: "Profile must have - email" }
    if (data.phone == null || data.phone == "")
      return { result: false, validationError: "Profile must have - phone" }
  
    if (data.billingAddress.line1 == null || data.billingAddress.line1 == "")
      return { result: false, validationError: "Profile must have - line 1" }
    if (data.billingAddress.city == null || data.billingAddress.city == "")
      return { result: false, validationError: "Profile must have - city" }
    if (data.billingAddress.state == null || data.billingAddress.state == "")
      return { result: false, validationError: "Profile must have - province" }
    if (data.billingAddress.postal_code == null || data.billingAddress.postal_code == "")
      return { result: false, validationError: "Profile must have - postalcode" }
    if (data.billingAddress.country == null || data.billingAddress.country == "")
      return { result: false, validationError: "Profile must have - country" }
*/
    if (profileConfig["interests"].isRequired)
      if (data.interests == null)
        return { result: false, validationError: "Profile must have - interests" }
    if (profileConfig["currentRole"].isRequired)
      if (data.currentRole == null || data.currentRole == "")
        return { result: false, validationError: "Profile must have - current role" }
    if (profileConfig["currentScope"].isRequired)
      if (data.currentScope == null || data.currentScope == "")
        return { result: false, validationError: "Profile must have - current scope" }
    if (profileConfig["personality"].isRequired)
      if (data.personality == null || data.personality == "")
        return { result: false, validationError: "Profile must have - personality" }
    if (profileConfig["orgName"].isRequired)
      if (data.orgName == null || data.orgName == "")
        return { result: false, validationError: "Profile must have - organization name" }
    if (profileConfig["orgType"].isRequired)
      if (data.orgType == null || data.orgType == "" || data.orgType == "None")
        return { result: false, validationError: "Profile must have - organization type" }
    if (profileConfig["orgSize"].isRequired)
      if (data.orgSize == null || data.orgSize == "")
        return { result: false, validationError: "Profile must have - organization size" }
    if (profileConfig["orgDescription"].isRequired)
      if (data.orgDescription == null || data.orgDescription == "")
        return { result: false, validationError: "Profile must have - organization description" }

    if (profileConfig["sundayAttendance"].isRequired)
      if (data.sundayAttendance == null || data.sundayAttendance == "")
        return { result: false, validationError: "Profile must have - sunday attendance" }
    if (profileConfig["numberVolunteers"].isRequired)
      if (data.numberVolunteers == null || data.numberVolunteers == "")
        return { result: false, validationError: "Profile must have - number of volunteers" }
    if (profileConfig["denomination"].isRequired)
      if (data.denomination == null || data.denomination == "")
        return { result: false, validationError: "Profile must have - denomination" }
    if (profileConfig["pplServed"].isRequired)
      if (data.pplServed == null || data.pplServed == "")
        return { result: false, validationError: "Profile must have - people served" }

    if (profileConfig["profileImage"].isRequired)
      if (data.profileImage == null || data.profileImage == "")
        return { result: false, validationError: "Profile must have - profile image" }
    if (profileConfig["location"].isRequired)
      if (data.location == null)
        return { result: false, validationError: "Profile must have - public location" }

    return { result: true, validationError: "" }
  }
  static Course(data: any): ValidationResult {
    if (data.name == "") return { result: false, validationError: "Course must have a name" }
    if (data.description == "")
      return { result: false, validationError: "Course must have a description" }
    if (data.time == "") return { result: false, validationError: "Course must have a time" }
    if (data.length == "") return { result: false, validationError: "Course must have a length" }
    if (data.effort == "") return { result: false, validationError: "Course must have an effort" }
    if (data.cost == "") return { result: false, validationError: "Course must have a cost" }
    return { result: true, validationError: "" }
  }

  static Group(data: any): ValidationResult {
    if (data.name == "") return { result: false, validationError: "Group must have a name" }
    if (data.description == "")
      return { result: false, validationError: "Group must have a description" }
    return { result: true, validationError: "" }
  }

  static Resource(data: any): ValidationResult {
    if (data.name == "") return { result: false, validationError: "Resource must have a name" }
    if (data.description == "")
      return { result: false, validationError: "Resource must have a description" }
    return { result: true, validationError: "" }
  }

  static Organization(data: OrganizationData): ValidationResult {
    if (data.adminEmail == null || data.adminEmail == "")
      return { result: false, validationError: "Profile must have - email" }
    if (data.phone == null || data.phone == "")
      return { result: false, validationError: "Profile must have - phone" }
    if (data.address == null || data.address == "")
      return { result: false, validationError: "Profile must have - address" }
    if (data.city == null || data.city == "")
      return { result: false, validationError: "Profile must have - city" }
    if (data.province == null || data.province == "")
      return { result: false, validationError: "Profile must have - province" }
    if (data.postalCode == null || data.postalCode == "")
      return { result: false, validationError: "Profile must have - postalcode" }
    if (data.country == null || data.country == "")
      return { result: false, validationError: "Profile must have - country" }
    if (data.orgName == "" || data.orgName == null)
      return { result: false, validationError: "Organization must have a name" }
    if (data.orgDescription == "" || data.orgDescription == null)
      return { result: false, validationError: "Organization must have a description" }
    if (data.orgType == "" || data.orgType == null || data.orgType == "None")
      return { result: false, validationError: "Organization must have a type" }
    if (data.location == null)
      return { result: false, validationError: "Organization must have - public location" }
    if (data.profileImage == null)
      return { result: false, validationError: "Organization must have - profile image" }

    if (orgTypesChurches.includes(data.orgType)) {
      if (!data.orgSize)
        return { result: false, validationError: "Organization must have number of employees" }
      if (!data.numberVolunteers)
        return { result: false, validationError: "Organization must have a number of volunteers" }
      if (!data.sundayAttendance)
        return { result: false, validationError: "Missing average Sunday morning attendance" }
      if (!data.denomination)
        return { result: false, validationError: "Organization must have a denomination" }
    }

    if (orgTypesNonChurch.includes(data.orgType)) {
      if (!data.orgSize)
        return { result: false, validationError: "Organization must have number of employees" }
      if (!data.numberVolunteers)
        return { result: false, validationError: "Organization must have a number of volunteers" }
      if (!data.pplServed)
        return { result: false, validationError: "Missing number of people served" }
    }
    return { result: true, validationError: "" }
  }
  static Event(data: any): ValidationResult {
    if (data.name == "") return { result: false, validationError: "Event must have a name" }
    if (data.description == "")
      return { result: false, validationError: "Event must have a description" }
    if (data.time == "" || data.time == null)
      return { result: false, validationError: "Event must have a time" }
    if (data.eventType == "zoom" && (!data.eventUrl || !isAbsoluteUrl(data.eventUrl)))
      return { result: false, validationError: "Zoom Event must have a valid URL set" }
    if (data.eventType == "eventbrite" && (!data.eventUrl || !isAbsoluteUrl(data.eventUrl)))
      return { result: false, validationError: "Eventbrite Event must have a valid URL set" }
    if (data.eventType == "location" && data.location == "")
      return { result: false, validationError: "Location Event must have a location" }

    return { result: true, validationError: "" }
  }
}
