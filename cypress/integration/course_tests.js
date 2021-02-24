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
  cy.get('[data-testId="' + id + '-editor"]')
    .clear()
    .type(value)
}
const addMenuItem = () => {
  cy.get('[data-testId="course-menu-createWeek"]').click({ force: true })
}
const gotoMenuItem = (id) => {
  cy.get('[data-testId="menu-item-' + id + '-button"]')
    .first()
    .click({ force: true })
}
const editMenuItem = (id, value) => {
  cy.get('[data-testId="menu-item-' + id + '-button"]')
    .first()
    .click({ force: true })

  cy.get('[data-testId="menu-item-' + id + '-button"]')
    .first()
    .trigger("touchstart", { force: true })
    .wait(3000)
  cy.get('[data-testId="menu-item-' + id + '-editor"]').trigger("touchleave")
  cy.get('[data-testId="menu-item-' + id + '-editor"]')
    .clear()
    .type(value)
}
const deleteMenuItem = (id) => {
  cy.get('[data-testId="menu-item-' + id + '-button"]')
    .first()
    .click({ force: true })

  cy.get('[data-testId="menu-item-' + id + '-button"]')
    .first()
    .trigger("touchstart", { force: true })
    .wait(3000)
  cy.get('[data-testId="menu-item-' + id + '-editor"]').trigger("touchleave")
  cy.get('[data-testId="menu-item-' + id + '-editor"]').clear()
  cy.get('[data-testId="course-menu-createWeek"]').focus()
}
const addLesson = () => {
  cy.get('[data-testId="course-createLesson"]').click()
}
const editLesson = (lesson, type) => {
  cy.get('[data-testId="course-lessonTitle-' + lesson + '"]')
    .clear()
    .type("Lesson 1")
  cy.get('[data-testId="course-lessonDuration-' + lesson + '"]')
    .clear()
    .type("2 hours")
  if (type == "zoom") {
    cy.get('[data-testId="course-eventType-' + lesson + '"]').select("zoom") //"assignment"|"respond"|"youtube"
    cy.get('[data-testId="course-lessonConfig-zoomDate-' + lesson + '"]')
      .clear()
      .type("2 hours")
    cy.get('[data-testId="course-lessonConfig-zoomUrl-' + lesson + '"]')
      .clear()
      .type("https://google.com")
    cy.get('[data-testId="course-lessonConfig-zoomRecordingUrl-' + lesson + '"]')
      .clear()
      .type("https://google.com")
  }
  if (type == "assignment") {
    cy.get('[data-testId="course-eventType-' + lesson + '"]').select("assignment") //"assignment"|"respond"|"youtube"
    cy.get('[data-testId="course-lessonConfig-zoomDate-' + lesson + '"]')
      .clear()
      .type("2 hours")
    cy.get('[data-testId="course-lessonConfig-zoomUrl-' + lesson + '"]')
      .clear()
      .type("https://google.com")
    cy.get('[data-testId="course-lessonConfig-zoomRecordingUrl-' + lesson + '"]')
      .clear()
      .type("https://google.com")
    cy.get('[data-testId="course-lessonConfig-wordCount-' + lesson + '"]')
      .clear()
      .type("100")
  }
  if (type == "respond") {
    cy.get('[data-testId="course-eventType-' + lesson + '"]').select("respond") //"assignment"|"respond"|"youtube"
    cy.get('[data-testId="course-lessonConfig-zoomDate-' + lesson + '"]')
      .clear()
      .type("2 hours")
    cy.get('[data-testId="course-lessonConfig-zoomUrl-' + lesson + '"]')
      .clear()
      .type("https://google.com")
    cy.get('[data-testId="course-lessonConfig-zoomRecordingUrl-' + lesson + '"]')
      .clear()
      .type("https://google.com")
    cy.get('[data-testId="course-lessonConfig-wordCount-' + lesson + '"]')
      .clear()
      .type("100")
  }
  if (type == "youtube") {
    cy.get('[data-testId="course-eventType-' + lesson + '"]').select("youtube") //"assignment"|"respond"|"youtube"
    cy.get('[data-testId="course-lessonConfig-zoomDate-' + lesson + '"]')
      .clear()
      .type("2 hours")
    cy.get('[data-testId="course-lessonConfig-zoomUrl-' + lesson + '"]')
      .clear()
      .type("https://google.com")
    cy.get('[data-testId="course-lessonConfig-zoomRecordingUrl-' + lesson + '"]')
      .clear()
      .type("https://google.com")
    cy.get('[data-testId="course-lessonConfig-wordCount-' + lesson + '"]')
      .clear()
      .type("100")
  }
}
const deleteLesson = (lesson) => {
  cy.get('[data-testId="course-deleteLesson-' + lesson + '"]').click()
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

      //   richTextEdit("course-introduction", "Test123")

      cy.get('[data-testId="course-menu-details-true"]', { timeout: 15000 })
        .last()
        .click({ force: true })
      //deleteMenuItem(3)
      //deleteMenuItem(2)
      //deleteMenuItem(1)
      //deleteMenuItem(0)
      //addMenuItem()
      //editMenuItem(0, "Week 1")
      gotoMenuItem(0)
      cy.get('[data-testId="course-edit-true"]', { timeout: 15000 }).last().click()

      cy.get('[data-testId="course-weekTitle"]', { timeout: 15000 })
        .last()
        .clear()
        .type("Science 101")
      richTextEdit("course-leader", "Test 123")
      deleteLesson(1)
      deleteLesson(0)
      addLesson()
      editLesson(0, "zoom")
      //cy.get('[data-testId="course-menu-home-true"]', { timeout: 15000 }).last().click()
      //TODO UPLOAD FILE
      //TODO EDIT Course Description
      //TODO ADD USERS

      //TODO SETUP COURSE

      //      cy.get('[data-testId="course-delete"]').last()
      //      cy.get('[data-testId="course-purchase"]').last()

      // cy.get('[data-testId="header-logo"]').last().click()
    })
  })
})
