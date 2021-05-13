//tests here

describe('User Onboarding App test', () => {
    const nameInput = () => cy.get('[name="first_name"]');
    const passInput = () => cy.get('[name="password"]');
    const emailInput = () => cy.get('[name="email"]');
    const serviceCheck = () => cy.get('[name="service"]')
    const signupButton = () => cy.get('#sign-up')
    
    beforeEach(() => {
        cy.visit("http://localhost:3000")
    })

    it('Renders Properly', () => {
        nameInput().should('exist')
        passInput().should('exist')
        emailInput().should('exist')
        serviceCheck().should('exist')
        signupButton().should('exist')
    })

    describe('Form functionality test', () => {
        it('sign up button is disables initially', () => {
            signupButton().should('be.disabled');
        })

        it('can type in and check terms of service box to enable signup button', () => {
            const name = 'John'
            const password = 'submittocrab'
            const email = 'genericemail@genericemail.com'

            nameInput().type(name).should('have.value', name);
            passInput().type(password).should('have.value', password);
            emailInput().type(email).should('have.value', email);
            serviceCheck().click();

            signupButton().should('not.be.disabled');
        })

        it('can submit a new account', () => {
            const name = 'John'
            const password = 'submittocrab'
            const email = 'genericemail@genericemail.com'

            nameInput().type(name).should('have.value', name);
            passInput().type(password).should('have.value', password);
            emailInput().type(email).should('have.value', email);
            serviceCheck().click();

            signupButton().click();

            const newAccount = () => cy.contains(name);
            newAccount().should('exist');
        })
    })
})