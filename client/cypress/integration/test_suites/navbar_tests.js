
describe("Navbar Tests", function() {

    it("View Navbar from Items page (Primary User)", function() {

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

        // check local storage values
        cy
            .get('window')
            .should(() => {
                expect(localStorage.getItem('TreasureIDToken')).to.not.eq(null);
                expect(localStorage.getItem('TreasureUType')).to.eq('0');
                expect(localStorage.getItem('TreasureUName')).to.not.eq(null);
                expect(localStorage.getItem('TreasureUImg')).to.not.eq(null);
            });

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


    it("Go to Dashboard page from Items page (Primary User)", function() {

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

        // check local storage values
        cy
            .get('window')
            .should(() => {
                expect(localStorage.getItem('TreasureIDToken')).to.not.eq(null);
                expect(localStorage.getItem('TreasureUType')).to.eq('0');
                expect(localStorage.getItem('TreasureUName')).to.not.eq(null);
                expect(localStorage.getItem('TreasureUImg')).to.not.eq(null);
            });

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


    it("View Navbar from Dashboard page (Primary User)", function() {

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

        // check local storage values
        cy
            .get('window')
            .should(() => {
                expect(localStorage.getItem('TreasureIDToken')).to.not.eq(null);
                expect(localStorage.getItem('TreasureUType')).to.eq('0');
                expect(localStorage.getItem('TreasureUName')).to.not.eq(null);
                expect(localStorage.getItem('TreasureUImg')).to.not.eq(null);
            });

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


    it("Reload Items page via Navbar (Primary User)", function() {

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

        // check local storage values
        cy
            .get('window')
            .should(() => {
                expect(localStorage.getItem('TreasureIDToken')).to.not.eq(null);
                expect(localStorage.getItem('TreasureUType')).to.eq('0');
                expect(localStorage.getItem('TreasureUName')).to.not.eq(null);
                expect(localStorage.getItem('TreasureUImg')).to.not.eq(null);
            });

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


    it("Go to Items page from Dashboard page (Primary User)", function() {

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

        // check local storage values
        cy
            .get('window')
            .should(() => {
                expect(localStorage.getItem('TreasureIDToken')).to.not.eq(null);
                expect(localStorage.getItem('TreasureUType')).to.eq('0');
                expect(localStorage.getItem('TreasureUName')).to.not.eq(null);
                expect(localStorage.getItem('TreasureUImg')).to.not.eq(null);
            });

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


    it("Reload Dashboard page via Navbar (Primary User)", function() {

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

        // check local storage values
        cy
            .get('window')
            .should(() => {
                expect(localStorage.getItem('TreasureIDToken')).to.not.eq(null);
                expect(localStorage.getItem('TreasureUType')).to.eq('0');
                expect(localStorage.getItem('TreasureUName')).to.not.eq(null);
                expect(localStorage.getItem('TreasureUImg')).to.not.eq(null);
            });

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
