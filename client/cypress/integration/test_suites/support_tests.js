
describe("Support Tests", function() {

    it("Go to Support page (Primary User)", function() {

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


    it("Go to Support page (Secondary User)", function() {

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


    it("Support request: Empty subject, empty message", function() {

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
            .wait(2000);

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

});
