describe("Stage 1 Tests", () => {

    it("Check if the necessary elements are present", () => {

        // visit the register page
        cy.visit('http://localhost:3000/register');

        // check if email field present
        cy
            .get('input[name="email"]')
            .should('exist');

        // check if code field present
        cy
            .get('input[name="code"]')
            .should('exist');

        // check if register button present
        cy
            .get('.btn')
            .should('exist')
            .should('have.text', 'Next');
    });

    it("Email field - blank, Code field - blank", () => {

        // visit the register page
        cy.visit('http://localhost:3000/register');

        // click on the next button
        cy
            .contains('Next')
            .click();

        // ensure that the page is still the same
        cy
            .url()
            .should('eq', 'http://localhost:3000/register');

        // ensure that the email field has a red border
        cy
            .get('input[name="email"]')
            .should('have.class', 'invalid-field');

        // ensure that the error feedback for a blank email address is present
        cy
            .get('.invalid-feedback-msg')
            .eq(0)
            .should('have.text', 'Please enter your email address!');

        // ensure that the code field has a red border
        cy
            .get('input[name="code"]')
            .should('have.class', 'invalid-field');

        // ensure that the error feedback for a blank code is present
        cy
            .get('.invalid-feedback-msg')
            .eq(1)
            .should('have.text', 'Please enter a code!');
    });

    it("Email field - blank, Code field - valid", () => {

        // visit the register page
        cy.visit('http://localhost:3000/register');

        // type in a code
        cy
            .get('input[name="code"]')
            .type(Math.random().toString(36).substring(2, 10));

        // click on the next button
        cy
            .contains('Next')
            .click();

        // ensure that the page is still the same
        cy
            .url()
            .should('eq', 'http://localhost:3000/register');

        // ensure that the email field has a red border
        cy
            .get('input[name="email"]')
            .should('have.class', 'invalid-field');

        // ensure that the error feedback for a blank email address is present
        cy
            .get('.invalid-feedback-msg')
            .eq(0)
            .should('have.text', 'Please enter your email address!');

        // ensure that the code field has a red border
        cy
            .get('input[name="code"]')
            .should('not.have.class', 'invalid-field');

        // ensure that there's no error feedback for the valid code
        cy
            .get('.invalid-feedback-msg')
            .eq(1)
            .should('not.exist');
    });

    it("Email field - invalid, Code field - blank", () => {

        // visit the register page
        cy.visit('http://localhost:3000/register');

        // type in an invalid email address
        cy
            .get('input[name="email"]')
            .type('xsq.com@l');

        // click on the next button
        cy
            .contains('Next')
            .click();

        // ensure that the page is still the same
        cy
            .url()
            .should('eq', 'http://localhost:3000/register');

        // ensure that the email field has a red border
        cy
            .get('input[name="email"]')
            .should('have.class', 'invalid-field');

        // ensure that the error feedback for an invalid email address is present
        cy
            .get('.invalid-feedback-msg')
            .eq(0)
            .should('have.text', 'Please enter a valid email address!');

        // ensure that the code field has a red border
        cy
            .get('input[name="code"]')
            .should('have.class', 'invalid-field');

        // ensure that the error feedback for a blank code is present
        cy
            .get('.invalid-feedback-msg')
            .eq(1)
            .should('have.text', 'Please enter a code!');
    });

    it("Email field - invalid, Code field - valid", () => {

        // visit the register page
        cy.visit('http://localhost:3000/register');

        // type in an invalid email address
        cy
            .get('input[name="email"]')
            .type('xsq.com@l');

        // type in a code
        cy
            .get('input[name="code"]')
            .type(Math.random().toString(36).substring(2, 10));

        // click on the next button
        cy
            .contains('Next')
            .click();

        // ensure that the page is still the same
        cy
            .url()
            .should('eq', 'http://localhost:3000/register');

        // ensure that the email field has a red border
        cy
            .get('input[name="email"]')
            .should('have.class', 'invalid-field');

        // ensure that the error feedback for an invalid email address is present
        cy
            .get('.invalid-feedback-msg')
            .eq(0)
            .should('have.text', 'Please enter a valid email address!');

        // ensure that the code field doesn't have a red border
        cy
            .get('input[name="code"]')
            .should('not.have.class', 'invalid-field');

        // ensure that the error feedback for a blank code is present
        cy
            .get('.invalid-feedback-msg')
            .eq(1)
            .should('not.exist');
    });

    it("Email field - valid, Code field - invalid", () => {

        // visit the register page
        cy.visit('http://localhost:3000/register');

        // type in an invalid email address
        cy
            .get('input[name="email"]')
            .type('invited_user@test.com');

        // type in a code
        cy
            .get('input[name="code"]')
            .type(Math.random().toString(36).substring(2, 10));

        // click on the next button
        cy
            .contains('Next')
            .click();

        // ensure that the page is still the same
        cy
            .url()
            .should('eq', 'http://localhost:3000/register');

        // ensure that the email field has a red border
        cy
            .get('input[name="email"]')
            .should('have.class', 'invalid-field');

        // ensure that the code field has a red border
        cy
            .get('input[name="code"]')
            .should('have.class', 'invalid-field');

        // ensure that the error feedback is present
        cy
            .get('.invalid-feedback-msg')
            .eq(0)
            .should('have.text', 'Sorry, the email address or code you entered was incorrect.');
    });

    it("Email field - valid, Code field - valid (Non-Invited User)", () => {

        // visit the register page
        cy.visit('http://localhost:3000/register');

        // type in an invalid email address
        cy
            .get('input[name="email"]')
            .type('user@test.com');

        // type in a code
        cy
            .get('input[name="code"]')
            .type(Math.random().toString(36).substring(2, 10));

        // click on the next button
        cy
            .contains('Next')
            .click();

        // ensure that the page is still the same
        cy
            .url()
            .should('eq', 'http://localhost:3000/register');

        // ensure that the email field has a red border
        cy
            .get('input[name="email"]')
            .should('have.class', 'invalid-field');

        // ensure that the code field has a red border
        cy
            .get('input[name="code"]')
            .should('have.class', 'invalid-field');

        // ensure that the error feedback is present
        cy
            .get('.invalid-feedback-msg')
            .eq(0)
            .should('have.text', 'Sorry, the email address or code you entered was incorrect.');
    });

});

describe("Stage 2 Tests", () => {

    it("Check if the necessary elements are present", () => {

        let email = 'invited_user@test.com';

        // visit the register page
        cy.visit('http://localhost:3000/register');

        // type in an invalid email address
        cy
            .get('input[name="email"]')
            .type(email);

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
            .wait(3000);

        // check if profile pic button present
        cy
            .get('.btn')
            .eq(0)
            .should('exist')
            .should('have.text', 'Select Profile Pic');

        // check if first name field present
        cy
            .get('input[name="fname"]')
            .should('exist');

        // check if last name field present
        cy
            .get('input[name="lname"]')
            .should('exist');

        // check if email field present, that it's read-only and has the user's
        // email address
        cy
            .get('input[name="email"]')
            .should('exist')
            .should('have.value', email)
            .should('have.attr', 'readonly')

        // check if password field present
        cy
            .get('input[name="pw"]')
            .should('exist');

        // check if confirm password field present
        cy
            .get('input[name="pw_c"]')
            .should('exist');

        // check if register button present
        cy
            .get('.btn')
            .eq(1)
            .should('exist')
            .should('have.text', 'Register');
    });
});