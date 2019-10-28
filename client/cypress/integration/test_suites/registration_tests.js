
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

    it("Email field - valid, Code field - valid (Registered User)", () => {

        // visit the register page
        cy.visit('http://localhost:3000/register');

        // type in an invalid email address
        cy
            .get('input[name="email"]')
            .type('su@test.com');

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
            .should('have.text', 'Error: This invitation has already been accepted.');
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

// IMPORTANT: these tests will fail once you register a user with the email
// address below, so you'd need to either delete this users data from the
// both the firebase database and auth, or just invite a new user and use their
// email address below.
var validInviteeEmail = 'invited_user@test.com';

describe.only("Stage 2 Tests", () => {

    beforeEach(() => {
        cy.do_stage_1(validInviteeEmail)
    })

    it("Check if the necessary elements are present", () => {

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
            .should('have.value', validInviteeEmail)
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

    it("All blank fields", () => {

        // click register button
        cy
            .get('.btn')
            .eq(1)
            .click()

        // wait for validation
        cy
            .wait(5000);

        // ensure that invalid fields have red borders

        cy
            .get('input[name="fname"]')
            .should('have.class', 'invalid-field');

        cy
            .get('input[name="lname"]')
            .should('have.class', 'invalid-field');

        cy
            .get('input[name="pw"]')
            .should('have.class', 'invalid-field');

        cy
            .get('input[name="pw_c"]')
            .should('have.class', 'invalid-field');

        // ensure that invalid fields have appropriate error messages

        cy
            .get('.invalid-feedback-msg')
            .eq(0)
            .should('have.text', 'Please enter your first name!');

        cy
            .get('.invalid-feedback-msg')
            .eq(1)
            .should('have.text', 'Please enter your last name!');

        cy
            .get('.invalid-feedback-msg')
            .eq(2)
            .should('have.text', 'Please enter a password!');
    });

    it("Short password", () => {

        // enter data

        cy
            .get('input[name="fname"]')
            .type('First');

        cy
            .get('input[name="lname"]')
            .type('Last');

        cy
            .get('input[name="pw"]')
            .type('short');

        cy
            .get('input[name="pw_c"]')
            .type('short');

        // click register button
        cy
            .get('.btn')
            .eq(1)
            .click()

        // wait for validation
        cy
            .wait(5000);

        // ensure that invalid fields have red borders

        cy
            .get('input[name="fname"]')
            .should('not.have.class', 'invalid-field');

        cy
            .get('input[name="lname"]')
            .should('not.have.class', 'invalid-field');

        cy
            .get('input[name="pw"]')
            .should('have.class', 'invalid-field');

        cy
            .get('input[name="pw_c"]')
            .should('have.class', 'invalid-field');

        // ensure that invalid fields have appropriate error messages

        cy
            .get('.invalid-feedback-msg')
            .eq(0)
            .should('have.text', 'Password should be at least 6 characters');

        // ensure that password fields are cleared

        cy
            .get('input[name="pw"]')
            .should('have.value', '');

        cy
            .get('input[name="pw_c"]')
            .should('have.value', '');
    });

    it("Password mismatch", () => {

        // enter data

        cy
            .get('input[name="fname"]')
            .type('First');

        cy
            .get('input[name="lname"]')
            .type('Last');

        cy
            .get('input[name="pw"]')
            .type('password');

        cy
            .get('input[name="pw_c"]')
            .type('paddword');

        // click register button
        cy
            .get('.btn')
            .eq(1)
            .click()

        // wait for validation
        cy
            .wait(5000);

        // ensure that invalid fields have red borders

        cy
            .get('input[name="fname"]')
            .should('not.have.class', 'invalid-field');

        cy
            .get('input[name="lname"]')
            .should('not.have.class', 'invalid-field');

        cy
            .get('input[name="pw"]')
            .should('have.class', 'invalid-field');

        cy
            .get('input[name="pw_c"]')
            .should('have.class', 'invalid-field');

        // ensure that invalid fields have appropriate error messages

        cy
            .get('.invalid-feedback-msg')
            .eq(0)
            .should('have.text', 'Passwords must match!');

        // ensure that password fields are cleared

        cy
            .get('input[name="pw"]')
            .should('have.value', '');

        cy
            .get('input[name="pw_c"]')
            .should('have.value', '');
    });

    it("All valid data", () => {

        // enter data

        cy
            .get('input[name="fname"]')
            .type('First');

        cy
            .get('input[name="lname"]')
            .type('Last');

        cy
            .get('input[name="pw"]')
            .type('password');

        cy
            .get('input[name="pw_c"]')
            .type('password');

        // click register button
        cy
            .get('.btn')
            .eq(1)
            .click()

        // wait for validation
        cy
            .wait(5000);

        // ensure that the user is redirected to the login page
        cy
            .url()
            .should('eq', 'http://localhost:3000/login');
    });
});
