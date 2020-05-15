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

    })

})