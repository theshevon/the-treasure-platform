describe("Login Tests", function() {

    it("Email field - blank, Password field - blank", function() {

        // visit the log in page
        cy.visit("http://localhost:3000/login");

        // click on the log in button
        cy
            .contains('Log In')
            .click();

        // ensure that the page is still the same
        cy
            .url()
            .should('eq', 'http://localhost:3000/login');

        // ensure that the email field has a red border
        cy
            .get('input[name="email"]')
            .should('have.class', 'invalid-field');

        // ensure that the error feedback for a blank email address is present
        cy
            .get('.invalid-feedback-msg')
            .eq(0)
            .should('have.text', 'Please enter a valid email address.');

        // ensure that the password field has a red border
        cy
            .get('input[name="password"]')
            .should('have.class', 'invalid-field');

        // ensure that the error feedback for a blank password is present
        cy
            .get('.invalid-feedback-msg')
            .eq(1)
            .should('have.text', 'Please enter a password.');
    });

    it("Email field - invalid, Password field - blank", function() {

        // visit the log in page
        cy.visit("http://localhost:3000/login");

        // type in an invalid email
        cy
            .get('input[name="email"]')
            .type('amsms');

        // click on the log in button
        cy
            .contains('Log In')
            .click();

        // ensure that the page is still the same
        cy
            .url()
            .should('eq', 'http://localhost:3000/login');

        // ensure that the email field has a red border
        cy
            .get('input[name="email"]')
            .should('have.class', 'invalid-field');

        // ensure that the error feedback for an invalid email address is present
        cy
            .get('.invalid-feedback-msg')
            .eq(0)
            .should('have.text', 'Please enter a valid email address.');

        // ensure that the password field has a red border
        cy
            .get('input[name="password"]')
            .should('have.class', 'invalid-field');

        // ensure that the error feedback for a blank password is present
        cy
            .get('.invalid-feedback-msg')
            .eq(1)
            .should('have.text', 'Please enter a password.');
    });

    it("Email field - valid, Password field - blank", function() {

        // visit the log in page
        cy.visit("http://localhost:3000/login");

        // type in a valid email
        cy
            .get('input[name="email"]')
            .type('su@test.com');

        // click on the log in button
        cy
            .contains('Log In')
            .click();

        // ensure that the page is still the same
        cy
            .url()
            .should('eq', 'http://localhost:3000/login');

        // ensure that the email field does not have a red border
        cy
            .get('input[name="email"]')
            .should('not.have.class', 'invalid-field');

        // ensure that the password field has a red border
        cy
            .get('input[name="password"]')
            .should('have.class', 'invalid-field');

        // ensure that the error feedback for a blank password is present
        cy
            .get('.invalid-feedback-msg')
            .eq(0)
            .should('have.text', 'Please enter a password.');
    });

    it("Email field - blank, Password field - valid", function() {

        // visit log in page
        cy.visit("http://localhost:3000/login");

        // type in a valid password (>6 characters)
        cy
            .get('input[name="password"]')
            .type('password');

        // click on the log in button
        cy
            .contains('Log In')
            .click();

        // ensure that the page is still the same
        cy
            .url()
            .should('eq', 'http://localhost:3000/login');

        // ensure that the email field has a red border
        cy
            .get('input[name="email"]')
            .should('have.class', 'invalid-field');

        // ensure that the error feedback for a blank email is present
        cy
            .get('.invalid-feedback-msg')
            .eq(0)
            .should('have.text', 'Please enter a valid email address.');

        // ensure that the password field does not have a red border
        cy
            .get('input[name="password"]')
            .should('not.have.class', 'invalid-field');

        // ensure that the password field is blank
        cy
            .get('input[name="password"]')
            .should('have.value', '');

    });

    it("Email field - invalid, Password field - valid", function() {

        // visit the log in page
        cy.visit("http://localhost:3000/login");

        // type in an invalid email
        cy
            .get('input[name="email"]')
            .type('amsms');

        // type in a valid password (>6 characters)
        cy
            .get('input[name="password"]')
            .type('password');

        // click on the log in button
        cy
            .contains('Log In')
            .click();

        // ensure that the page is still the same
        cy
            .url()
            .should('eq', 'http://localhost:3000/login');

        // ensure that the email field has a red border
        cy
            .get('input[name="email"]')
            .should('have.class', 'invalid-field');

        // ensure that the error feedback for an invalid email address is present
        cy
            .get('.invalid-feedback-msg')
            .eq(0)
            .should('have.text', 'Please enter a valid email address.');

        // ensure that the password field does not have a red border
        cy
            .get('input[name="password"]')
            .should('not.have.class', 'invalid-field');

        // ensure that the password field is blank
        cy
            .get('input[name="password"]')
            .should('have.value', '');

    });

    it("Email field - blank, Password field - invalid", function() {

        // visit the log in page
        cy.visit("http://localhost:3000/login");

        // type in an invalid password
        cy
            .get('input[name="password"]')
            .type('lljl');

        // click on the log in button
        cy
            .contains('Log In')
            .click();

        // ensure that the page is still the same
        cy
            .url()
            .should('eq', 'http://localhost:3000/login');

        // ensure that the email field has a red border
        cy
            .get('input[name="email"]')
            .should('have.class', 'invalid-field');

        // ensure that the error feedback for an invalid email address is present
        cy
            .get('.invalid-feedback-msg')
            .eq(0)
            .should('have.text', 'Please enter a valid email address.');

        // ensure that the password field does not have a red border
        cy
            .get('input[name="password"]')
            .should('not.have.class', 'invalid-field');

        // ensure that the password field is blank
        cy
            .get('input[name="password"]')
            .should('have.value', '');
    });

    it("Email field - invalid, Password field - invalid", function() {

        // visit the log in page
        cy.visit("http://localhost:3000/login");

        // type in an invalid email
        cy
            .get('input[name="email"]')
            .type('amsms');

        // type in an invalid password
        cy
            .get('input[name="password"]')
            .type('lljl');

        // click on the log in button
        cy
            .contains('Log In')
            .click();

        // ensure that the page is still the same
        cy
            .url()
            .should('eq', 'http://localhost:3000/login');

        // ensure that the email field has a red border
        cy
            .get('input[name="email"]')
            .should('have.class', 'invalid-field');

        // ensure that the error feedback for a blank email address is present
        cy
            .get('.invalid-feedback-msg')
            .eq(0)
            .should('have.text', 'Please enter a valid email address.');

        // ensure that the password field does not hav a red border
        cy
            .get('input[name="password"]')
            .should('not.have.class', 'invalid-field');

        // ensure that the password field is blank
        cy
            .get('input[name="password"]')
            .should('have.value', '');
    });

    it("Email field - valid, Password field - invalid", function() {

        // visit the log in page
        cy.visit("http://localhost:3000/login");

        // type in a valid email
        cy
            .get('input[name="email"]')
            .type('su@test.com');

        // type in an invalid password
        cy
            .get('input[name="password"]')
            .type('lljl');

        // click on the log in button
        cy
            .contains('Log In')
            .click();

        // ensure that the page is still the same
        cy
            .url()
            .should('eq', 'http://localhost:3000/login');

        // ensure that the email field has a red border
        cy
            .get('input[name="email"]')
            .should('have.class', 'invalid-field');

        // ensure that the password field has a red border
        cy
            .get('input[name="password"]')
            .should('have.class', 'invalid-field');

        // ensure that the error feedback for a blank password is present
        cy
            .get('.invalid-feedback-msg')
            .eq(0)
            .should('have.text', 'Sorry, the email address or password you entered is incorrect.');

        // ensure that the password field is blank
        cy
            .get('input[name="password"]')
            .should('have.value', '');
    });

    it("Email field - valid, Password field - valid (Primary User)", function() {

        // clear local storage
        cy
            .clearLocalStorage()
            .should(ls => {
                expect(localStorage.getItem('TreasureIDToken')).to.be.null;
                expect(localStorage.getItem('TreasureUType')).to.be.null;
                expect(localStorage.getItem('TreasureUName')).to.be.null;
                expect(localStorage.getItem('TreasureUImg')).to.be.null;
            })

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

        // check local storage values
        cy
            .get('window')
            .should(() => {
                expect(localStorage.getItem('TreasureIDToken')).to.not.eq('');
                expect(localStorage.getItem('TreasureUType')).to.eq('0');
                expect(localStorage.getItem('TreasureUName')).to.not.eq('');
                expect(localStorage.getItem('TreasureUImg')).to.not.eq(null);
            });
    });

    it("Email field - valid, Password field - valid (Secondary User)", function() {

        // clear local storage
        cy
            .clearLocalStorage()
            .should(ls => {
                expect(localStorage.getItem('TreasureIDToken')).to.be.null;
                expect(localStorage.getItem('TreasureUType')).to.be.null;
                expect(localStorage.getItem('TreasureUName')).to.be.null;
                expect(localStorage.getItem('TreasureUImg')).to.be.null;
            })

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

        // check local storage values
        cy
            .get('window')
            .should(() => {
                expect(localStorage.getItem('TreasureIDToken')).to.not.eq('');
                expect(localStorage.getItem('TreasureUType')).to.eq('1');
                expect(localStorage.getItem('TreasureUName')).to.not.eq('');
                expect(localStorage.getItem('TreasureUImg')).to.not.eq(null);
            });
    });

});
