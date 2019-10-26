
describe("Invite Tests", function() {

    it("Go to Invite page via Dashboard", function() {

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
            .wait(2000);

        // check that the invite modal appears
        cy
            .get('.modal-title')
            .eq(0)
            .should('have.text', 'Invite Users');

    });


    it.only("Add row", function() {

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
            .wait(2000);

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

});
