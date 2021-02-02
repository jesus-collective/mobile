import TestHelper from "../../components/TestHelpers/TestHelpers"
const sizes = ["iphone-6", "ipad-2", [1024, 768]]
const user = "george.bell@jesuscollective.com" //George
//const user = "test1@jesuscollective.com" //Lucas
//const user = "test2@jesuscollective.com" //Mateus
//const user = "test3@jesuscollective.com" //Igor

const submitNewUserScreen = () => {
  cy.get('input[placeholder="Email address"]').type(user)
  cy.get('input[placeholder="Create Password"]').type("TestTest#1")
  cy.get('input[placeholder="Confirm Password"]').type("TestTest#1")
  cy.get('input[placeholder="Phone number"]').type("1234567890")
  cy.get('input[placeholder="First Name"]').type("Test")
  cy.get('input[placeholder="Last Name"]').type("User 1")
  cy.contains("Continue").click({ force: true })
}
const completeBillingScreen = () => {
  cy.contains("One Story Curriculum", { timeout: 30000 })
  cy.contains("Total:", { timeout: 30000 })

  cy.get('input[data-testId="billing-line1"]')
    .type("123 Sesame Street", { force: true })
    .get('input[data-testId="billing-city"]')
    .type("Toronto", { force: true })
    .get('input[data-testId="billing-state"]')
    .type("Ontario", { force: true })
    .get('input[data-testId="billing-postalcode"]')
    .type("M4W2Z7", { force: true })
  cy.get('input[data-testId="billing-country"]').type("Canada", { force: true })

  cy.getWithinIframe(0, '[name="cardnumber"]').type("4242424242424242")
  cy.getWithinIframe(1, '[name="exp-date"]').type("424")
  cy.getWithinIframe(2, '[name="cvc"]').type("242")
  cy.get('[data-testId="billing-accept-eula"]')
    .click()
    .get('[data-testId="billing-processPayment-button-true"]', { timeout: 30000 })
    .click()
  cy.contains("Processing Payment")
  cy.get('[data-testId="billing-continueToProfile-button-true"]', { timeout: 30000 }).click()
}
const completeProfileScreen = () => {
  cy.get('[data-testId="profile-aboutMeShort"]', { timeout: 30000 })
    .type("I test", { force: true })
    .get('[data-testId="profile-aboutMeLong"]')
    .type("I test a lot", { force: true })

  cy.get('input[placeholder="Search Places ..."]').type("Toronto")
  cy.get('[data-testId="profile-location-0"]').click()

  cy.get('[data-testId="profile-interest-picker"]').select("Equipping")
  cy.get('[data-testId="profile-interest-button-true"]').click()
  const fileName = "test.jpeg"
  cy.fixture(fileName).then((fileContent) => {
    cy.get('[data-testid="profile-image"]').upload({
      fileContent,
      fileName,
      mimeType: "image/jpeg",
    })
  })
  cy.get('[data-testId="profile-currentRole"]')
    .type("Tester", { force: true })
    .get('[data-testId="profile-currentScope"]')
    .type("Testing", { force: true })
    .get('[data-testId="profile-personality"]')
    .type("Detailed", { force: true })
    .get('[data-testId="profile-orgName"]')
    .type("TMH", { force: true })
    .get('[data-testId="profile-orgType"]')
    .select("Church", { force: true })
    .get('[data-testId="profile-orgSize"]')
    .select("1-25", { force: true })
    .get('[data-testId="profile-orgDescription"]')
    .type("We make things", { force: true })

  cy.get('[data-testId="profile-save-true"]').click("topLeft", { force: true })
}
describe("Create User Flow Test", () => {
  sizes.forEach((size) => {
    it("Visits the Login Page - " + size, () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1])
      } else {
        cy.viewport(size)
      }

      cy.visit("/")
        .then(() => {
          TestHelper.DeleteUser(user, "TestTest#1")
        })
        .contains("Sign In")
        .click()
      cy.contains("Username cannot be empty").get('input[placeholder="Email"]').type(user)
      cy.contains("Sign In").click()
      cy.contains("Password cannot be empty")
        .get('input[placeholder="Password"]')
        .type("TestTest#1")
      cy.contains("Sign In").click()
      cy.contains("User does not exist")
      cy.contains("Create an Account").click()
      cy.contains("Individual").click()

      submitNewUserScreen()

      cy.get('input[placeholder="One-time security code"]', { timeout: 30000 })
        .get('div[data-testId="myConfirmSignup-back"]')
        .click()

      cy.get('input[placeholder="Email"]').type(user)
      cy.get('input[placeholder="Password"]').type("TestTest#1")
      cy.contains("Sign In").click()

      completeBillingScreen()
      completeProfileScreen()

      cy.get('[data-testid="header-logo"]').should("be.visible")
    })
  })
})
