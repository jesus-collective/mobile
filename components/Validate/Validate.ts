
import isAbsoluteUrl from 'is-absolute-url'
type ValidationResult = {
    result: boolean,
    validationError: String
}
export default class Validate {
    static Profile(data: any): ValidationResult {
        if (data.aboutMeShort == null || data.aboutMeShort == "")
            return { result: false, validationError: "Profile must have - short about me" }
        if (data.aboutMeLong == null || data.aboutMeLong == "")
            return { result: false, validationError: "Profile must have - long about me" }
        if (data.given_name == null || data.given_name == "")
            return { result: false, validationError: "Profile must have - given name" }
        if (data.family_name == null || data.family_name == "")
            return { result: false, validationError: "Profile must have - family name" }
        if (data.email == null || data.email == "")
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
        //   if (data.interests == null || data.interests == "")
        //       return { result: false, validationError: "Profile must have - interests" }
        if (data.currentRole == null || data.currentRole == "")
            return { result: false, validationError: "Profile must have - current role" }
        if (data.currentScope == null || data.currentScope == "")
            return { result: false, validationError: "Profile must have - current scope" }
        if (data.personality == null || data.personality == "")
            return { result: false, validationError: "Profile must have - personality" }
        if (data.orgName == null || data.orgName == "")
            return { result: false, validationError: "Profile must have - organization name" }
        if (data.orgType == null || data.orgType == "")
            return { result: false, validationError: "Profile must have - organization type" }
        if (data.orgSize == null || data.orgSize == "")
            return { result: false, validationError: "Profile must have - organization size" }
        if (data.orgDescription == null || data.orgDescription == "")
            return { result: false, validationError: "Profile must have - organization description" }
        if (data.profileImage == null || data.profileImage == "")
            return { result: false, validationError: "Profile must have - profile image" }
        if (data.location == null)
            return { result: false, validationError: "Profile must have - public location" }

        return { result: true, validationError: "" }
    }
    static Course(data: any): ValidationResult {
        if (data.name == "")
            return { result: false, validationError: "Course must have a name" }
        if (data.description == "")
            return { result: false, validationError: "Course must have a description" }
        if (data.time == "")
            return { result: false, validationError: "Course must have a time" }
        if (data.length == "")
            return { result: false, validationError: "Course must have a length" }
        if (data.effort == "")
            return { result: false, validationError: "Course must have an effort" }
        if (data.cost == "")
            return { result: false, validationError: "Course must have a cost" }
        return { result: true, validationError: "" }

    }

    static Group(data: any): ValidationResult {
        if (data.name == "")
            return { result: false, validationError: "Group must have a name" }
        if (data.description == "")
            return { result: false, validationError: "Group must have a description" }
        return { result: true, validationError: "" }

    }

    static Resource(data: any): ValidationResult {
        if (data.name == "")
            return { result: false, validationError: "Resource must have a name" }
        if (data.description == "")
            return { result: false, validationError: "Resource must have a description" }
        return { result: true, validationError: "" }

    }

    static Organization(data: any): ValidationResult {
        if (data.name == "")
            return { result: false, validationError: "Organization must have a name" }
        if (data.description == "")
            return { result: false, validationError: "Organization must have a description" }
        return { result: true, validationError: "" }

    }
    static Event(data: any): ValidationResult {
        if (data.name == "")
            return { result: false, validationError: "Event must have a name" }
        if (data.description == "")
            return { result: false, validationError: "Event must have a description" }
        if (data.time == "" || data.time == null)
            return { result: false, validationError: "Event must have a time" }
        if (data.eventType == "zoom" && !isAbsoluteUrl(data.eventUrl))
            return { result: false, validationError: "Zoom Event must have a valid URL set" }
        if (data.eventType == "eventbrite" && !isAbsoluteUrl(data.eventUrl))
            return { result: false, validationError: "Eventbrite Event must have a valid URL set" }
        if (data.eventType == "location" && data.location == "")
            return { result: false, validationError: "Location Event must have a location" }


        return { result: true, validationError: "" }

    }
} 