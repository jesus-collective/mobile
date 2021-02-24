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
const createCourse = (courseName) => {
  cy.get('[data-testid="homepage"]', { timeout: 30000 }).should("be.visible", {
    timeout: 30000,
  })
  cy.get('[data-testId="mygroup-create-Courses-true"]', { timeout: 30000 }).last().click()
  cy.contains("No Members Yet", { timeout: 15000 })
  cy.get('[data-testId="course-name"]', { timeout: 30000 }).last().type(courseName)
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
}

const editCourse = (courseName, newCourseName) => {
  cy.get('[data-testId="header-logo"]', { timeout: 10000 }).last().click({ force: true })
  cy.contains(courseName, { timeout: 15000 }).click({ force: true })
  cy.get('[data-testId="course-name"]', { timeout: 15000 })
    .last()
    .type(newCourseName, { timeout: 15000, force: true })
  cy.get('[data-testId="course-save-true"]').last().click()
}
const deleteCourse = (courseName) => {
  cy.get('[data-testId="header-logo"]', { timeout: 10000 }).last().click({ force: true })
  cy.get('[data-testId="group-course-title"]').each((item) => {
    if (item.text == courseName)
      item
        .click({ force: true })
        .get('[data-testId="course-delete-true"]', { timeout: 10000 })
        .last()
        .click()
  })
}
const gotoCourse = (courseName) => {
  cy.get('[data-testId="header-logo"]', { timeout: 10000 }).last().click({ force: true })
  cy.contains(courseName, { timeout: 15000 }).click({ force: true })
  cy.get('[data-testId="course-goto-true"]', { timeout: 15000 }).last().click()
}
const richTextEdit = (id, value) => {
  cy.get('[data-testId="' + id + '-holdToEdit"]').click()
  cy.get('[data-testId="' + id + '-editor"]').type(value)
}
const addMenuItem = (value) => {
  cy.get('[data-testId="course-menu-createWeek"]').click()
  cy.get('[data-testId="menu-item-0-button"]').trigger("mousedown")
  cy.wait(2000)
  cy.get('[data-testId="menu-item-0-button"]').trigger("mouseleave")
  cy.get('[data-testId="menu-item-0-button"]').trigger("mousedown")
  cy.wait(2000)
  cy.get('[data-testId="menu-item-0-button"]').trigger("mouseleave")
  cy.get('[data-testId="menu-item-0-editor"]').type(value)
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

      //   deleteCourse("Test Course 1")
      //   deleteCourse("Test Course 1-edit")
      //   createCourse("Test Course 1")
      //   editCourse("Test Course 1", "-edit")

      gotoCourse("Test Course 1")

      cy.get('[data-testId="course-edit-true"]', { timeout: 15000 }).last().click()

      richTextEdit("course-introduction", "Test123")

      cy.get('[data-testId="course-menu-details-true"]', { timeout: 15000 })
        .last()
        .click({ force: true })
      addMenuItem("Week 1")
      //cy.get('[data-testId="course-menu-home-true"]', { timeout: 15000 }).last().click()
      //TODO UPLOAD FILE
      //TODO EDIT Course Description
      //TODO ADD USERS

      //TODO SETUP COURSE

      //      cy.get('[data-testId="course-delete"]').last()
      //      cy.get('[data-testId="course-purchase"]').last()

      cy.get('[data-testId="header-logo"]').last().click()
    })
  })
})
