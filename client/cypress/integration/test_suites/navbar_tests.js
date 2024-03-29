
describe("Navbar Tests", () => {

    it("View Navbar from Items page (Primary User)", () => {

        cy.login_primary_user();

        // check navbar has dashboard
        cy
            .get('.nav-link')
            .eq(0)
            .should('have.text', 'Dashboard');

        // check navbar has items
        cy
            .get('.nav-link')
            .eq(1)
            .should('have.text', 'Items');

    });


    it("Ensure no Navbar options (Secondary User)", () => {

        cy.login_secondary_user();

        // check navbar does not have dashboard option
        cy
            .get('a[href*="/dashboard"]')
            .should('not.exist');

    });


    it("Go to Dashboard page from Items page (Primary User)", () => {

        cy.login_primary_user();

        // check navbar has dashboard
        cy
            .get('.nav-link')
            .eq(0)
            .should('have.text', 'Dashboard');

        // click dashboard from the navbar
        cy
            .get('.nav-link')
            .eq(0)
            .click()

        // wait for the next page to load
        cy
            .wait(3000);

        // ensure that the page is now the dashboard page
        cy
            .url()
            .should('eq', 'http://localhost:3000/dashboard');

    });


    it("View Navbar from Dashboard page (Primary User)", () => {

        cy.login_primary_user();

        // check navbar has dashboard
        cy
            .get('.nav-link')
            .eq(0)
            .should('have.text', 'Dashboard');

        // click dashboard from the navbar
        cy
            .get('.nav-link')
            .eq(0)
            .click()

        // wait for the next page to load
        cy
            .wait(3000);

        // ensure that the page is now the dashboard page
        cy
            .url()
            .should('eq', 'http://localhost:3000/dashboard');

        // check navbar has dashboard
        cy
            .get('.nav-link')
            .eq(0)
            .should('have.text', 'Dashboard');

        // check navbar has items
        cy
            .get('.nav-link')
            .eq(1)
            .should('have.text', 'Items');

    });


    it("Reload Items page via Navbar (Primary User)", () => {

        cy.login_primary_user();

        // check navbar has items
        cy
            .get('.nav-link')
            .eq(1)
            .should('have.text', 'Items');

        // click items from the navbar
        cy
            .get('.nav-link')
            .eq(1)
            .click()

        // wait for the next page to load
        cy
            .wait(3000);

        // ensure that the page is now the items page
        cy
            .url()
            .should('eq', 'http://localhost:3000/items');

    });


    it("Go to Items page from Dashboard page (Primary User)", () => {

        cy.login_primary_user();

        // check navbar has dashboard
        cy
            .get('.nav-link')
            .eq(0)
            .should('have.text', 'Dashboard');

        // click dashboard from the navbar
        cy
            .get('.nav-link')
            .eq(0)
            .click()

        // wait for the next page to load
        cy
            .wait(3000);

        // ensure that the page is now the dashboard page
        cy
            .url()
            .should('eq', 'http://localhost:3000/dashboard');

        // check navbar has items
        cy
            .get('.nav-link')
            .eq(1)
            .should('have.text', 'Items');

        // click items from the navbar
        cy
            .get('.nav-link')
            .eq(1)
            .click()

        // wait for the next page to load
        cy
            .wait(3000);

        // ensure that the page is now the items page
        cy
            .url()
            .should('eq', 'http://localhost:3000/items');

    });


    it("Reload Dashboard page via Navbar (Primary User)", () => {

        cy.login_primary_user();

        // check navbar has dashboard
        cy
            .get('.nav-link')
            .eq(0)
            .should('have.text', 'Dashboard');

        // click dashboard from the navbar
        cy
            .get('.nav-link')
            .eq(0)
            .click()

        // wait for the next page to load
        cy
            .wait(3000);

        // ensure that the page is now the dashboard page
        cy
            .url()
            .should('eq', 'http://localhost:3000/dashboard');

        // check navbar has dashboard
        cy
            .get('.nav-link')
            .eq(0)
            .should('have.text', 'Dashboard');

        // click dashboard from the navbar
        cy
            .get('.nav-link')
            .eq(0)
            .click()

        // wait for the next page to load
        cy
            .wait(3000);

        // ensure that the page is now the dashboard page
        cy
            .url()
            .should('eq', 'http://localhost:3000/dashboard');

    });

});
