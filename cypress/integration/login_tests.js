import TestHelper from '../../components/TestHelpers/TestHelpers'
const sizes = ['iphone-6', 'ipad-2', [1024, 768]]
describe('Login Page Test', () => {
    sizes.forEach((size) => {
        it('Visits the Login Page - ' + size, () => {
            if (Cypress._.isArray(size)) {
                cy.viewport(size[0], size[1])
            } else {
                cy.viewport(size)
            }
            cy.visit('/')
                .then(() => {
                    TestHelper.DeleteUser("george.bell@jesuscollective.com", "TestTest#1")
                })

                .contains('SIGN IN').click()
            cy.contains('Username cannot be empty')
                .get('input[placeholder="Enter your email"]').type('george.bell@jesuscollective.com')
            cy.contains('SIGN IN').click()
            cy.contains('Custom auth lambda trigger is not configured for the user pool.')
                .get('input[placeholder="Enter your password"]').type('TestTest#1')
            cy.contains('SIGN IN').click()
            cy.contains('User does not exist')
            cy.contains('Create an Account').click()

            cy.get('input[data-testid="aws-amplify__auth--email-input"]').type("george.bell@jesuscollective.com")
            cy.get('input[data-testid="aws-amplify__auth--password-input"]').type("TestTest#1")
            cy.get('input[data-testid="aws-amplify__auth--phone-input"]').type("555-555-5555")
            cy.get('input[label="First Name"]').type("Test")
            cy.get('input[label="Last Name"]').type("555-555-5555")
            cy.get('[data-testid="aws-amplify__auth--sign-up-button"]').click({ force: true })

            cy.get('[data-testid=aws-amplify__auth--back-to-sign-in-button]').click()

            //cy.get('input[placeholder="Enter your email"]').type('george.bell@jesuscollective.com')
            cy.contains('SIGN IN').click()
            // cy.contains('Custom auth lambda trigger is not configured for the user pool.')
            //     .get('input[placeholder="Enter your password"]').type('TestTest#1')
            // cy.contains('SIGN IN').click()
            //        cy.contains('User does not exist')
            //        cy.contains('Create an Account').click()

            cy.get('input[data-testId="profile-Address"]').type('123 Sesame Street', { force: true })
                .get('input[data-testId="profile-City"]').type('Toronto', { force: true })
                .get('input[data-testId="profile-Province"]').type('Ontario', { force: true })
                .get('input[data-testId="profile-PostalCode"]').type('M4W2Z7', { force: true })
                .get('input[data-testId="profile-Country"]').type('Canada', { force: true })
                .get('[data-testId="profile-aboutMeShort"]').type('I test', { force: true })
                .get('[data-testId="profile-aboutMeLong"]').type('I test a lot', { force: true })
                .get('[data-testId="profile-currentRole"]').type('Tester', { force: true })
                .get('[data-testId="profile-currentScope"]').type('Testing', { force: true })
                .get('[data-testId="profile-personality"]').type('Detailed', { force: true })
                .get('[data-testId="profile-orgName"]').type('TMH', { force: true })
                .get('[data-testId="profile-orgType"]').type('Software', { force: true })
                .get('[data-testId="profile-orgSize"]').type('123', { force: true })
                .get('[data-testId="profile-orgDescription"]').type('We make things', { force: true })
                .get('[data-testId="profile-setmap"]').click({ position: "topLeft", force: true })
                .get('[data-testId="mapselector-save"]').click({ position: "topLeft", force: true })
                .get('[data-testId="profile-save"]').click({ position: "topLeft", force: true })


        })
    })
})