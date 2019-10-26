Cypress.Commands.add('go_to_dashboard', () => {

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
});

describe("Stage 1", () => {

    beforeEach(() => {
        cy.go_to_dashboard();
    });

    it("All fields blank", () => {

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

    it.only("Toggle visibility", () => {

        // select a user from the visibility dropdown
        cy
            .get('#visibility_selector')
            .click()
            .get('#visibility_selector .item')
            .eq(0)
            .click();

        // toggle the visibility
        cy
            .get('#visibility_toggler')
            .click()
            .get('#visibility_toggler .item')
            .eq(1)
            .click();

        // check what the visibility toggling dropdown has selected
        cy
            .get('#visibility_toggler .text')
            .eq(0)
            .should('have.text', 'Hidden from');

        // check if the visibilty list has been cleared
        cy
            .get('#visibility_selector')
            .should('not.have.descendants', 'a.ui.label');

        // select a user from the visibility dropdown
        cy
            .get('#visibility_selector')
            .click()
            .get('#visibility_selector .item')
            .eq(0)
            .click();

        // toggle the visibility
        cy
            .get('#visibility_toggler')
            .click()
            .get('#visibility_toggler .item')
            .eq(0)
            .click();

        // check what the visibility toggling dropdown has selected
        cy
            .get('#visibility_toggler .text')
            .eq(0)
            .should('have.text', 'Visible to');

        // check if the visibilty list has been cleared
        cy
            .get('#visibility_selector')
            .should('not.have.descendants', 'a.ui.label');
    })

});