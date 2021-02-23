//const sizes = ["iphone-6", "ipad-2", [1024, 768]]
const sizes = [[1024, 768]]
const login = (userType) => {
  cy.fixture("users").then(function (users) {
    this.users = users
    cy.visit("/").get('input[placeholder="Email"]').type(this.users[userType])
    cy.get('input[placeholder="Password"]').type("TestTest#1")
    cy.contains("Sign In").click()
  })
}

describe("Course Admin", () => {
  sizes.forEach((size) => {
    it("Size - " + size, () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1])
      } else {
        cy.viewport(size)
      }
      login("adminUser")

      cy.get('[data-testid="homepage"]', { timeout: 30000 }).should("be.visible", {
        timeout: 30000,
      })
      cy.get('[data-testId="mygroup-create-Courses-true"]', { timeout: 30000 }).last().click()
      cy.contains("No Members Yet", { timeout: 15000 })
      cy.get('[data-testId="course-name"]', { timeout: 30000 }).last().type("Test Course 1")
      cy.get('[data-testId="course-description"]').last().type("Test Course")
      cy.get('[data-testId="course-duration"]').last().type("1 hour")
      cy.get('[data-testId="course-effort"]').last().type("3 days")
      cy.on("uncaught:exception", (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
      })
      cy.get('input[placeholder="Enter Course Start Date"]').type("20300202")
      cy.get('[data-testId="course-amount"]').type("100")

      cy.get('[data-testId="course-createNew-true"]').last().click()

      cy.get('[data-testId="course-name"]').last().type("-edit")
      cy.get('[data-testId="course-save-true"]').last().click()
      cy.get('[data-testId="course-goto-true"]').last().click()

      cy.get('[data-testId="course-edit-true"]').last().click()

      cy.get('[data-testId="course-menu-home-true"]').last().click()

      //TODO UPLOAD FILE
      //TODO EDIT Course Description
      //TODO ADD USERS

      cy.get('[data-testId="course-menu-details-true"]').last().click()
      //TODO SETUP COURSE

      //      cy.get('[data-testId="course-delete"]').last()
      //      cy.get('[data-testId="course-purchase"]').last()

      cy.get('[data-testId="header-logo"]').last().click()
    })
  })
})
