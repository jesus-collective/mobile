type ValidationResult = {
    result: boolean,
    validationError: String
}
export default class Validate {
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
  
    static Group(data: any):ValidationResult {
        if (data.name == "")
            return { result: false, validationError: "Group must have a name" }
        if (data.description == "")
            return { result: false, validationError: "Group must have a description" }
        return { result: true, validationError: "" }

    }

    static Resource(data: any):ValidationResult {
        if (data.name == "")
            return { result: false, validationError: "Resource must have a name" }
        if (data.description == "")
            return { result: false, validationError: "Resource must have a description" }
        return { result: true, validationError: "" }

    }

    static Organization(data: any):ValidationResult {
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
        if (data.time == "")
            return { result: false, validationError: "Event must have a time" }
        if (data.location == "")
            return { result: false, validationError: "Event must have a location" }
        return { result: true, validationError: "" }

    }
} 