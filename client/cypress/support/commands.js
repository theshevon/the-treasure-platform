// ***********************************************
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('login_primary_user', () => {

    // visit the log in page
    cy.visit("http://localhost:3000/login");

    // type in a valid email
    cy
        .get('input[name="email"]')
        .type('pu@test.com');

    // type in an invalid password
    cy
        .get('input[name="password"]')
        .type('password');

    // click on the log in button
    cy
        .contains('Log In')
        .click();

    // wait for the next page to load
    cy
        .wait(3000);

    // ensure that the page is now the items page
    cy
        .url()
        .should('eq', 'http://localhost:3000/items');

});


Cypress.Commands.add('login_secondary_user', () => {

    // visit the log in page
    cy.visit("http://localhost:3000/login");

    // type in a valid email
    cy
        .get('input[name="email"]')
        .type('su@test.com');

    // type in an invalid password
    cy
        .get('input[name="password"]')
        .type('password');

    // click on the log in button
    cy
        .contains('Log In')
        .click();

    // wait for the next page to load
    cy
        .wait(3000);

    // ensure that the page is now the items page
    cy
        .url()
        .should('eq', 'http://localhost:3000/items');

});

Cypress.Commands.add('go_to_dashboard', () => {

    cy.login_primary_user();

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

Cypress.Commands.add('do_stage_1', (validInviteeEmail) => {

    // visit the register page
    cy.visit('http://localhost:3000/register');

    // type in an invalid email address
    cy
        .get('input[name="email"]')
        .type(validInviteeEmail);

    // type in a code
    cy
        .get('input[name="code"]')
        .type('1bg2vxa4');

    // click on the next button
    cy
        .contains('Next')
        .click();

    // wait for validation
    cy
        .wait(5000);
});
