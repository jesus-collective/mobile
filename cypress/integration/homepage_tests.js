//const sizes = ["iphone-6", "ipad-2", [1024, 768]]
const sizes = ["ipad-2", [1024, 768]]
const login = (userType) => {
  cy.fixture("users").then(function (users) {
    this.users = users
    cy.visit("/").get('input[placeholder="Email"]').type(this.users[userType])
    cy.get('input[placeholder="Password"]').type("TestTest#1")
    cy.contains("Sign In").click()
  })
}
const menu = (menuItem, size) => {
  if (size == "iphone-6") {
    cy.get('[data-testId="header-hamburger"]')
      .last()
      .click({ force: true })
      .get('[data-testId="' + menuItem + '"]', { timeout: 10000 })
      .last()
      .click({ force: true })
  } else {
    cy.get('[data-testId="' + menuItem + '"]')
      .last()
      .click()
  }
}
const menuResourceAll = (size) => {
  if (size == "iphone-6") {
    cy.get('[data-testId="header-hamburger"]').click({ force: true })
    cy.get('[data-testId="header-resources"]').last().click({ force: true })
    cy.get('[data-testId="header-resources-all"]').last().click({ force: true })
  } else {
    cy.get('[data-testId="header-resources"]').last().click({ force: true })
    cy.get('[data-testId="header-resources-all"]').last().click({ force: true })
  }
}
describe("Check Homepage Admin Test", () => {
  sizes.forEach((size) => {
    it("Visits the Login Page - " + size, () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1])
      } else {
        cy.viewport(size)
      }
      login("adminUser")

      cy.get('[data-testid="homepage"]').should("be.visible")
      menu("header-events", size)

      cy.get('[data-testid="events"]').should("be.visible", { timeout: 10000 })
      cy.get('[data-testId="header-logo"]', { timeout: 10000 }).last().click({ force: true })

      cy.get('[data-testid="homepage"]').should("be.visible")
      menu("header-groups", size)
      cy.get('[data-testid="groups"]').should("be.visible", { timeout: 10000 })
      cy.get('[data-testId="header-logo"]').last().click({ force: true })

      cy.get('[data-testid="homepage"]').should("be.visible")
      menuResourceAll(size)
      cy.get('[data-testid="resources"]').should("be.visible", { timeout: 10000 })
      cy.get('[data-testId="header-logo"]').last().click({ force: true })

      // cy.get('[data-testid="homepage"]').should('be.visible')
      // cy.get('[data-testId="header-search"]').last().click()
      // cy.get('[data-testid="search"]').should('be.visible')
      // cy.get('[data-testId="header-logo"]').last().click()

      cy.get('[data-testid="homepage"]').should("be.visible")
      cy.get('[data-testId="header-profile"]').last().click()
      cy.get('[data-testid="profile"]').should("be.visible")
      cy.get('[data-testId="header-logo"]').last().click()

      //            cy.get('[data-testId="header-courses"]').click()
      cy.get('[data-testid="homepage"]').should("be.visible")
      cy.get('[data-testId="header-map"]').last().click()
      cy.get('[data-testId="header-logo"]').last().click()
      /*
      cy.get('[data-testid="homepage"]').should("be.visible")
      cy.get('[data-testId="mygroup-showall-Events"]').last().click()
      cy.get('[data-testId="header-logo"]').last().click()

      cy.get('[data-testid="homepage"]').should("be.visible")
      cy.get('[data-testId="mygroup-showall-Groups"]').last().click()
      cy.get('[data-testId="header-logo"]').last().click()

      cy.get('[data-testid="homepage"]').should("be.visible")
      cy.get('[data-testId="mygroup-showall-Resources"]').last().click()
      cy.get('[data-testId="header-logo"]').last().click()

      cy.get('[data-testid="homepage"]').should("be.visible")
      cy.get('[data-testId="mygroup-create-Events"]').last().click()
      cy.contains("No Members Yet")
      cy.get('[data-testId="header-logo"]').last().click()

      cy.get('[data-testid="homepage"]').should("be.visible")
      cy.get('[data-testId="mygroup-create-Groups"]').last().click()
      cy.contains("No Members Yet")
      cy.get('[data-testId="header-logo"]').last().click()

      cy.get('[data-testid="homepage"]').should("be.visible")
      cy.get('[data-testId="mygroup-create-Resources"]').last().click()
      cy.contains("No Members Yet")
      cy.get('[data-testId="header-logo"]').last().click()
      */
    })
  })
})

describe("Check Homepage Partner Test", () => {
  sizes.forEach((size) => {
    it("Visits the Login Page - " + size, () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1])
      } else {
        cy.viewport(size)
      }
      login("partnerUser")
      cy.get('[data-testid="header-logo"]').should("be.visible")

      cy.get('[data-testid="homepage"]').should("be.visible")
      cy.get('[data-testId="header-events"]').click()
      cy.get('[data-testid="events"]').should("be.visible")
      cy.get('[data-testId="header-logo"]').last().click()

      cy.get('[data-testid="homepage"]').should("be.visible")
      cy.get('[data-testId="header-groups"]').last().click()
      cy.get('[data-testid="groups"]').should("be.visible")
      cy.get('[data-testId="header-logo"]').last().click()

      cy.get('[data-testid="homepage"]').should("be.visible")
      cy.get('[data-testId="header-resources"]').last().click({ force: true })
      cy.get('[data-testId="header-resources-all"]').last().click({ force: true })
      cy.get('[data-testid="resources"]').should("be.visible")
      cy.get('[data-testId="header-logo"]').last().click()

      // cy.get('[data-testid="homepage"]').should('be.visible')
      // cy.get('[data-testId="header-search"]').last().click()
      // cy.get('[data-testid="search"]').should('be.visible')
      // cy.get('[data-testId="header-logo"]').last().click()

      cy.get('[data-testid="homepage"]').should("be.visible")
      cy.get('[data-testId="header-profile"]').last().click()
      cy.get('[data-testid="profile"]').should("be.visible")
      cy.get('[data-testId="header-logo"]').last().click()

      //            cy.get('[data-testId="header-courses"]').click()
      cy.get('[data-testid="homepage"]').should("be.visible")
      cy.get('[data-testId="header-map"]').last().click()
      cy.get('[data-testId="header-logo"]').last().click()
      /*
      cy.get('[data-testid="homepage"]').should("be.visible")
      cy.get('[data-testId="mygroup-showall-Events"]').last().click()
      cy.get('[data-testId="header-logo"]').last().click()

      cy.get('[data-testid="homepage"]').should("be.visible")
      cy.get('[data-testId="mygroup-showall-Groups"]').last().click()
      cy.get('[data-testId="header-logo"]').last().click()

      cy.get('[data-testid="homepage"]').should("be.visible")
      cy.get('[data-testId="mygroup-showall-Resources"]').last().click()
      cy.get('[data-testId="header-logo"]').last().click()

      cy.get('[data-testid="homepage"]').should("be.visible")
      cy.get('[data-testId="mygroup-create-Events"]').last().click()
      cy.contains("No Members Yet")
      cy.get('[data-testId="header-logo"]').last().click()

      cy.get('[data-testid="homepage"]').should("be.visible")
      cy.get('[data-testId="mygroup-create-Groups"]').last().click()
      cy.contains("No Members Yet")
      cy.get('[data-testId="header-logo"]').last().click()

      cy.get('[data-testid="homepage"]').should("be.visible")
      cy.get('[data-testId="mygroup-create-Resources"]').last().click()
      cy.contains("No Members Yet")
      cy.get('[data-testId="header-logo"]').last().click()
      */
    })
  })
})
