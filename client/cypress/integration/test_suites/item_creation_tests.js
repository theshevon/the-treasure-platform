
describe("Stage 1", () => {

    beforeEach(() => {
        cy.go_to_dashboard();
    });

    it("All fields blank", () => {

        // click 'Next'
        cy
            .contains('Next')
            .click();

        // ensure that invalid fields have red borders and appropriate error
        // messages

        cy
            .get('.invalid-feedback')
            .eq(0)
            .should('have.text', 'Please enter a name for the item.');

        cy
            .get('.invalid-feedback')
            .eq(1)
            .should('have.text', 'Please enter a description of the item.');

        cy
            .get('.invalid-feedback')
            .eq(2)
            .should('have.text', 'Please upload at least one photo.');

    });

    it("Toggle visibility", () => {

        // select a user from the visibility dropdown
        cy
            .get('#visibility_selector')
            .click()
            .get('#visibility_selector .item')
            .eq(0)
            .click();

        // toggle the visibility
        cy
            .get('#visibility_toggler')
            .click()
            .get('#visibility_toggler .item')
            .eq(1)
            .click();

        // check what the visibility toggling dropdown has selected
        cy
            .get('#visibility_toggler .text')
            .eq(0)
            .should('have.text', 'Hidden from');

        // check if the visibilty list has been cleared
        cy
            .get('#visibility_selector')
            .should('not.have.descendants', 'a.ui.label');

        // select a user from the visibility dropdown
        cy
            .get('#visibility_selector')
            .click()
            .get('#visibility_selector .item')
            .eq(0)
            .click();

        // toggle the visibility
        cy
            .get('#visibility_toggler')
            .click()
            .get('#visibility_toggler .item')
            .eq(0)
            .click();

        // check what the visibility toggling dropdown has selected
        cy
            .get('#visibility_toggler .text')
            .eq(0)
            .should('have.text', 'Visible to');

        // check if the visibilty list has been cleared
        cy
            .get('#visibility_selector')
            .should('not.have.descendants', 'a.ui.label');
    })

});
