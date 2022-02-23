import { AmplifyAuthCognitoStackTemplate } from "@aws-amplify/cli-extensibility-helper"

export function override(resources: AmplifyAuthCognitoStackTemplate) {
  resources.userPool.schema = resources.userPool.schema = [
    { name: "phone_number", required: true, mutable: true },
  ]
}
