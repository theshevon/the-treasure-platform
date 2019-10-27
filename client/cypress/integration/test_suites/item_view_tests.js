
describe("Item View Tests", () => {

    it("Get more info (Primary User)", () => {

        cy.login_primary_user();

        // click more info button on an item
        cy
            .get('.centered-btn')
            .contains('more info')
            .eq(0)
            .click();

        // ensure that item name is not empty
        cy
            .get('.item-modal-title')
            .eq(0)
            .should('not.have.text', '');

        // ensure that item description is not empty
        cy
            .get('.text-justify')
            .eq(0)
            .should('not.have.text', '');

        // ensure that View Interested button exists
        cy
            .get('.btn')
            .contains('View Interested')
            .eq(0)
            .should('exist');

        // ensure that Assign button exists
        cy
            .get('.btn')
            .contains('Assign')
            .eq(0)
            .should('exist');

        // ensure that Delete button exists
        cy
            .get('.btn')
            .contains('Delete')
            .eq(0)
            .should('exist');

        // ensure that the X button exists
        cy
            .get('button[class="close"]')
            .should('exist');

        // click the X button
        cy
            .get('button[class="close"]')
            .click();

        // ensure that the X button works correctly
        cy
            .get('button[class="close"]')
            .should('not.exist');

        cy
            .get('.item-modal-title')
            .should('not.exist');

    });


    it.only("Get more info (Secondary User)", () => {

        cy.login_secondary_user();

        // click more info button on an item
        cy
            .get('.centered-btn')
            .contains('more info')
            .eq(0)
            .click();

        // ensure that item name is not empty
        cy
            .get('.item-modal-title')
            .eq(0)
            .should('not.have.text', '');

        // ensure that item description is not empty
        cy
            .get('.text-justify')
            .eq(0)
            .should('not.have.text', '');

        // ensure that View Interested button does not exist
        cy
            .get('.btn')
            .contains('View Interested')
            .should('not.exist');

        // ensure that Assign button does not exist
        cy
            .get('.btn')
            .contains('Assign')
            .should('not.exist');

        // ensure that Delete button does not exist
        cy
            .get('.btn')
            .contains('Delete')
            .should('not.exist');

        // ensure that the X button exists
        cy
            .get('button[class="close"]')
            .should('exist');

        // click the X button
        cy
            .get('button[class="close"]')
            .click();

        // ensure that the X button works correctly
        cy
            .get('button[class="close"]')
            .should('not.exist');

        cy
            .get('.item-modal-title')
            .should('not.exist');

    });


    it("Express interest in item (Secondary User)", () => {

        cy.login_secondary_user();

        // ensure that the expression of interest button exists
        cy
            .get('.like-btn')
            .should('exist');

        cy
            .get('.like-btn')
            .eq(0)
            .get('img[src="/static/media/unliked.b235d92b.svg"]')
            .eq(0)
            .should('exist');

        // ensure that the expression of interest button becomes full
        cy
            .get('.like-btn')
            .eq(0)
            .get('img[src="/static/media/unliked.b235d92b.svg"]')
            .eq(0)
            .click();

        cy
            .get('.like-btn')
            .eq(0)
            .get('img[src="/static/media/liked.9b24a825.svg"]')
            .eq(0)
            .should('exist');

        // ensure that the expression of interest button becomes empty
        cy
            .get('.like-btn')
            .eq(0)
            .get('img[src="/static/media/liked.9b24a825.svg"]')
            .eq(0)
            .click();

        cy
            .get('.like-btn')
            .eq(0)
            .get('img[src="/static/media/unliked.b235d92b.svg"]')
            .eq(0)
            .should('exist');

        });

});
