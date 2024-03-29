
describe("Invite Tests", () => {

    beforeEach(() => {
        cy.login_primary_user();
    });

    it("Go to Invite page via Dashboard", () => {

        // check navbar has dashboard
        cy
            .get('.nav-link')
            .eq(0)
            .should('have.text', 'Dashboard');

        // click dashboard from the navbar
        cy
            .get('.nav-link')
            .eq(0)
            .click();

        // wait for the next page to load
        cy
            .wait(2000);

        // ensure that the page is now the dashboard page
        cy
            .url()
            .should('eq', 'http://localhost:3000/dashboard');

        // ensure that the invite button exists
        cy
            .get('.centered-btn')
            .eq(0)
            .should('have.text', 'Invite New Users');

        // click the invite button
        cy
            .get('.centered-btn')
            .eq(0)
            .click();

        // wait for the next page to load
        cy
            .wait(500);

        // check that the invite modal appears
        cy
            .get('.modal-title')
            .eq(0)
            .should('have.text', 'Invite Users');

    });


    it("Add row", () => {

        // check navbar has dashboard
        cy
            .get('.nav-link')
            .eq(0)
            .should('have.text', 'Dashboard');

        // click dashboard from the navbar
        cy
            .get('.nav-link')
            .eq(0)
            .click();

        // wait for the next page to load
        cy
            .wait(2000);

        // ensure that the page is now the dashboard page
        cy
            .url()
            .should('eq', 'http://localhost:3000/dashboard');

        // ensure that the invite button exists
        cy
            .get('.centered-btn')
            .eq(0)
            .should('have.text', 'Invite New Users');

        // click the invite button
        cy
            .get('.centered-btn')
            .eq(0)
            .click();

        // wait for the next page to load
        cy
            .wait(500);

        // check that the invite modal appears
        cy
            .get('.modal-title')
            .eq(0)
            .should('have.text', 'Invite Users');

        // check the number of rows
        cy
            .get('.row')
            .eq(6)
            .should('not.exist');

        // ensure add row button exists
        cy
            .get('.add-row-btn')
            .eq(0)
            .should('exist');

        // add a row
        cy
            .get('.add-row-btn')
            .eq(0)
            .click();

        //check that a row was added
        cy
            .get('.row')
            .eq(6)
            .should('exist');

    });


    it("Incorrect format for email address", () => {

        // check navbar has dashboard
        cy
            .get('.nav-link')
            .eq(0)
            .should('have.text', 'Dashboard');

        // click dashboard from the navbar
        cy
            .get('.nav-link')
            .eq(0)
            .click();

        // wait for the next page to load
        cy
            .wait(2000);

        // ensure that the page is now the dashboard page
        cy
            .url()
            .should('eq', 'http://localhost:3000/dashboard');

        // ensure that the invite button exists
        cy
            .get('.centered-btn')
            .eq(0)
            .should('have.text', 'Invite New Users');

        // click the invite button
        cy
            .get('.centered-btn')
            .eq(0)
            .click();

        // wait for the next page to load
        cy
            .wait(500);

        // check that the invite modal appears
        cy
            .get('.modal-title')
            .eq(0)
            .should('have.text', 'Invite Users');

        // enter email addresses
        cy
            .get('input[name="0-email"]')
            .type('abc');

        // click send invitations button
        cy
            .get('button[type="submit"]')
            .click()

        // wait for the next page to load
        cy
            .wait(2000);

        // ensure that the input field does not have a green border
        cy
            .get('input[name="0-email"]')
            .should('not.have.class', 'valid-field');

        // ensure that no success messages were displayed
        cy
            .get('.valid-feedback-msg')
            .should('not.exist');

    });


    it("Email already in use", () => {

        // check navbar has dashboard
        cy
            .get('.nav-link')
            .eq(0)
            .should('have.text', 'Dashboard');

        // click dashboard from the navbar
        cy
            .get('.nav-link')
            .eq(0)
            .click();

        // wait for the next page to load
        cy
            .wait(2000);

        // ensure that the page is now the dashboard page
        cy
            .url()
            .should('eq', 'http://localhost:3000/dashboard');

        // ensure that the invite button exists
        cy
            .get('.centered-btn')
            .eq(0)
            .should('have.text', 'Invite New Users');

        // click the invite button
        cy
            .get('.centered-btn')
            .eq(0)
            .click();

        // wait for the next page to load
        cy
            .wait(500);

        // check that the invite modal appears
        cy
            .get('.modal-title')
            .eq(0)
            .should('have.text', 'Invite Users');

        // check the number of rows
        cy
            .get('.row')
            .eq(6)
            .should('not.exist');

        // ensure add row button exists
        cy
            .get('.add-row-btn')
            .eq(0)
            .should('exist');

        // add a row
        cy
            .get('.add-row-btn')
            .eq(0)
            .click();

        //check that a row was added
        cy
            .get('.row')
            .eq(5)
            .should('exist');

        // enter email addresses
        cy
            .get('input[name="0-email"]')
            .type('pu@test.com');

        cy
            .get('input[name="5-email"]')
            .type('su@test.com');

        // click send invitations button
        cy
            .get('button[type="submit"]')
            .click()

        // wait for the next page to load
        cy
            .wait(3000);

        // ensure that the input fields each have a red border
        cy
            .get('input[name="0-email"]')
            .should('have.class', 'invalid-field');

        cy
            .get('input[name="5-email"]')
            .should('have.class', 'invalid-field');

        // ensure that no success messages were displayed
        cy
            .get('.valid-feedback-msg')
            .should('not.exist');

        // ensure that an error message was displayed for each input
        cy

            .should('not.exist');

        cy
            .get('.invalid-feedback-msg')
            .eq(0)
            .should('have.text',
                    'This email already belongs to a registered user');

        cy
            .get('.invalid-feedback-msg')
            .eq(1)
            .should('have.text',
                    'This email already belongs to a registered user');

        // ensure that no additional error messages were sent
        cy
            .get('.invalid-feedback-msg')
            .eq(2)
            .should('not.exist');

    });


    it("Valid email addresses", () => {

        // check navbar has dashboard
        cy
            .get('.nav-link')
            .eq(0)
            .should('have.text', 'Dashboard');

        // click dashboard from the navbar
        cy
            .get('.nav-link')
            .eq(0)
            .click();

        // wait for the next page to load
        cy
            .wait(2000);

        // ensure that the page is now the dashboard page
        cy
            .url()
            .should('eq', 'http://localhost:3000/dashboard');

        // ensure that the invite button exists
        cy
            .get('.centered-btn')
            .eq(0)
            .should('have.text', 'Invite New Users');

        // click the invite button
        cy
            .get('.centered-btn')
            .eq(0)
            .click();

        // wait for the next page to load
        cy
            .wait(500);

        // check that the invite modal appears
        cy
            .get('.modal-title')
            .eq(0)
            .should('have.text', 'Invite Users');

        // check the number of rows
        cy
            .get('.row')
            .eq(6)
            .should('not.exist');

        // ensure add row button exists
        cy
            .get('.add-row-btn')
            .eq(0)
            .should('exist');

        // add a row
        cy
            .get('.add-row-btn')
            .eq(0)
            .click();

        //check that a row was added
        cy
            .get('.row')
            .eq(5)
            .should('exist');

        // enter email addresses
        cy
            .get('input[name="0-email"]')
            .type('not.a.user@test.com');

        cy
            .get('input[name="5-email"]')
            .type('not.a.user2@test.com');

        // click send invitations button
        cy
            .get('button[type="submit"]')
            .click()

        // wait for the next page to load
        cy
            .wait(3000);

        // ensure that the input fields each have a green border
        cy
            .get('input[name="0-email"]')
            .should('have.class', 'valid-field');

        cy
            .get('input[name="5-email"]')
            .should('have.class', 'valid-field');

        // ensure that no error messages were displayed
        cy
            .get('.invalid-feedback-msg')
            .should('not.exist');

        // ensure that a success message was displayed for each input
        cy
            .get('.valid-feedback-msg')
            .eq(0)
            .should('have.text', 'Successfully emailed!');

        cy
            .get('.valid-feedback-msg')
            .eq(1)
            .should('have.text', 'Successfully emailed!');

        // ensure that no additional success messages were sent
        cy
            .get('.valid-feedback-msg')
            .eq(2)
            .should('not.exist');

    });


});
