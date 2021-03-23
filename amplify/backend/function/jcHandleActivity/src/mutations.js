const createActivity = `
mutation CreateActivity($input: CreateActivityInput!) {
  createActivity(input: $input) {
    id
    createdAt
  }
}
`
exports.createActivity = createActivity
