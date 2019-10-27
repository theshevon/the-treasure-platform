
describe("Support Tests", () => {

    it("Go to Support page (Primary User)", () => {

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

        // click support from the Navbar
        cy
            .get('.dropdown-toggle')
            .click()
            .get('.dropdown-item')
            .eq(0)
            .click();

        // wait for the next page to load
        cy
            .wait(2000);

        // ensure that the page is now the support page
        cy
            .url()
            .should('eq', 'http://localhost:3000/support');

    });


    it("Go to Support page (Secondary User)", () => {

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

        // click support from the Navbar
        cy
            .get('.dropdown-toggle')
            .click()
            .get('.dropdown-item')
            .eq(0)
            .click();

        // wait for the next page to load
        cy
            .wait(2000);

        // ensure that the page is now the support page
        cy
            .url()
            .should('eq', 'http://localhost:3000/support');

    });


    it("Support request: Empty subject, empty message", () => {

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

        // click support from the Navbar
        cy
            .get('.dropdown-toggle')
            .click()
            .get('.dropdown-item')
            .eq(0)
            .click();

        // wait for the next page to load
        cy
            .wait(2000);

        // ensure that the page is now the support page
        cy
            .url()
            .should('eq', 'http://localhost:3000/support');

        // click on the send button
        cy
            .contains('Send')
            .click();

        // ensure that the page is still the same
        cy
            .url()
            .should('eq', 'http://localhost:3000/support');

        // ensure that the subject field has a red border
        cy
            .get('input[name="subject"]')
            .should('have.class', 'invalid-field');

        // ensure that the message field has a red border
        cy
            .get('textarea[name="message"]')
            .should('have.class', 'invalid-field');

        // ensure that the error feedback for a blank subject is present
        cy
            .get('.invalid-feedback-msg')
            .eq(0)
            .should('have.text', 'Please enter a subject!');

        // ensure that the error feedback for a blank message is present
        cy
            .get('.invalid-feedback-msg')
            .eq(1)
            .should('have.text', 'Please enter a message!');

    });


    it("Support request: Empty subject, valid message", () => {

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

        // click support from the Navbar
        cy
            .get('.dropdown-toggle')
            .click()
            .get('.dropdown-item')
            .eq(0)
            .click();

        // wait for the next page to load
        cy
            .wait(2000);

        // ensure that the page is now the support page
        cy
            .url()
            .should('eq', 'http://localhost:3000/support');

        cy
            .get('textarea[name="message"]')
            .type('test message');

        // click on the send button
        cy
            .contains('Send')
            .click();

        // ensure that the page is still the same
        cy
            .url()
            .should('eq', 'http://localhost:3000/support');

        // ensure that the subject field has a red border
        cy
            .get('input[name="subject"]')
            .should('have.class', 'invalid-field');

        // ensure that the message field does not have a red border
        cy
            .get('textarea[name="message"]')
            .should('not.have.class', 'invalid-field');

        // ensure that the error feedback for a blank subject is present
        cy
            .get('.invalid-feedback-msg')
            .eq(0)
            .should('have.text', 'Please enter a subject!');

        // ensure that there is no error message for the message field
        cy
            .get('.invalid-feedback-msg')
            .eq(1)
            .should('not.exist');
    });


    it("Support request: Valid subject, empty message", () => {

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

        // click support from the Navbar
        cy
            .get('.dropdown-toggle')
            .click()
            .get('.dropdown-item')
            .eq(0)
            .click();

        // wait for the next page to load
        cy
            .wait(2000);

        // ensure that the page is now the support page
        cy
            .url()
            .should('eq', 'http://localhost:3000/support');

        cy
            .get('input[name="subject"]')
            .type('test subject');

        // click on the send button
        cy
            .contains('Send')
            .click();

        // ensure that the page is still the same
        cy
            .url()
            .should('eq', 'http://localhost:3000/support');

        // ensure that the subject field does not have a red border
        cy
            .get('input[name="subject"]')
            .should('not.have.class', 'invalid-field');

        // ensure that the message field has a red border
        cy
            .get('textarea[name="message"]')
            .should('have.class', 'invalid-field');

        // ensure that the error feedback for a blank subject is present
        cy
            .get('.invalid-feedback-msg')
            .eq(0)
            .should('have.text', 'Please enter a message!');

        // ensure that there is no error message for the message field
        cy
            .get('.invalid-feedback-msg')
            .eq(1)
            .should('not.exist');
    });


    it("Support request: Valid fields", () => {

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

        // click support from the Navbar
        cy
            .get('.dropdown-toggle')
            .click()
            .get('.dropdown-item')
            .eq(0)
            .click();

        // wait for the next page to load
        cy
            .wait(2000);

        // ensure that the page is now the support page
        cy
            .url()
            .should('eq', 'http://localhost:3000/support');

        cy
            .get('input[name="subject"]')
            .type('test subject');

        cy
            .get('textarea[name="message"]')
            .type('test message');

        // click on the send button
        cy
            .contains('Send')
            .click();

        // ensure that the page is still the same
        cy
            .url()
            .should('eq', 'http://localhost:3000/support');

        // ensure that the subject field does not have a red border
        cy
            .get('input[name="subject"]')
            .should('not.have.class', 'invalid-field');

        // ensure that the message field does not have a red border
        cy
            .get('textarea[name="message"]')
            .should('not.have.class', 'invalid-field');

        // ensure that there is no error messages
        cy
            .get('.invalid-feedback-msg')
            .should('not.exist');

        // check that a confirmation message is displayed
        cy
            .get('.alert-success')
            .eq(0)
            .should('exist');
    });

});
