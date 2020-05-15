describe('Login Page Test', () => {
    it('Visits the Login Page', () => {
        cy.visit('/')
        cy.contains('SIGN IN').click()
        cy.contains('Username cannot be empty')
        cy.get('input[placeholder="Enter your email"]').type('george.bell@jesuscollective.com')
        cy.contains('SIGN IN').click()
        cy.contains('Custom auth lambda trigger is not configured for the user pool.')
        cy.get('input[placeholder="Enter your password"]').type('TestTest#1')
        cy.contains('SIGN IN').click()
        cy.get('input[data-testId="profile-Address"]').type('123 Sesame Street', { force: true })
        cy.get('input[data-testId="profile-City"]').type('Toronto', { force: true })
        cy.get('input[data-testId="profile-Province"]').type('Ontario', { force: true })
        cy.get('input[data-testId="profile-PostalCode"]').type('M4W2Z7', { force: true })
        cy.get('input[data-testId="profile-Country"]').type('Canada', { force: true })

        cy.get('[data-testId="profile-aboutMeShort"]').type('I test', { force: true })
        cy.get('[data-testId="profile-aboutMeLong"]').type('I test a lot', { force: true })
        cy.get('[data-testId="profile-currentRole"]').type('Tester', { force: true })
        cy.get('[data-testId="profile-currentScope"]').type('Testing', { force: true })
        cy.get('[data-testId="profile-personality"]').type('Detailed', { force: true })
        cy.get('[data-testId="profile-orgName"]').type('TMH', { force: true })
        cy.get('[data-testId="profile-orgType"]').type('Software', { force: true })
        cy.get('[data-testId="profile-orgSize"]').type('123', { force: true })
        cy.get('[data-testId="profile-orgDescription"]').type('We make things', { force: true })
        cy.get('[data-testId="profile-setmap"]').click({ position: "topLeft", force: true })
        cy.get('[data-testId="mapselector-save"]').click({ position: "topLeft", force: true })


        cy.get('[data-testId="profile-save"]').click({ position: "topLeft", force: true })

    })

})