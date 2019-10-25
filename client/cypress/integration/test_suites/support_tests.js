
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

        // check local storage values
        cy
            .get('window')
            .should(() => {
                expect(localStorage.getItem('TreasureIDToken')).to.not.eq(null);
                expect(localStorage.getItem('TreasureUType')).to.eq('0');
                expect(localStorage.getItem('TreasureUName')).to.not.eq(null);
                expect(localStorage.getItem('TreasureUImg')).to.not.eq(null);
            });

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

        // check local storage values
        cy
            .get('window')
            .should(() => {
                expect(localStorage.getItem('TreasureIDToken')).to.not.eq(null);
                expect(localStorage.getItem('TreasureUType')).to.eq('1');
                expect(localStorage.getItem('TreasureUName')).to.not.eq(null);
                expect(localStorage.getItem('TreasureUImg')).to.not.eq(null);
            });

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

});
