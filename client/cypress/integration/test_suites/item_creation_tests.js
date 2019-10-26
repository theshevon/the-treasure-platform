Cypress.Commands.add('login_as_pu', () => {

    // visit the register page
    cy.visit('http://localhost:3000/login');

    // type in an invalid email address
    cy
        .get('input[name="email"]')
        .type('pu@test.com');

    // type in the password
    cy
        .get('input[name="password"]')
        .type('password');

    // click on the log in button
    cy
        .contains('Log In')
        .click();

    // wait for validation
    cy
        .wait(5000);
});

describe("Item Creation Tests", () => {

    beforeEach(() => {
        cy.login_as_pu();
    });

    it("All fields blank", () => {

        // navigate to dashboard
        cy
            .get('.nav-link')
            .eq(0)
            .click();

        // ensure that the current page is the dashboard
        cy
            .url()
            .should('eq', 'http://localhost:3000/dashboard');

        // click on the add item button
        cy
            .get('.btn')
            .eq(1)
            .click();

        // click 'Next'
        cy
            .contains('Next')
            .click();

        // ensure that invalid fields have red borders and appropriate error
        // messages

        cy
            .get('.invalid-feedback')
            .eq(0)
            .should('have.text', 'Please enter a name for the item.');

        cy
            .get('.invalid-feedback')
            .eq(1)
            .should('have.text', 'Please enter a description of the item.');

        cy
            .get('.invalid-feedback')
            .eq(2)
            .should('have.text', 'Please upload at least one photo.');

    });
});