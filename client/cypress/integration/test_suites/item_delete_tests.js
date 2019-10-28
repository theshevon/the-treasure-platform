
const deleteItem = "deleteTest"

const deleteButtonText = "Delete"
const deleteConfirmText = "Yes, I'm sure"

describe("Go to items page (Primary User)", () => {

    it("log into primary user account, redirect to items page", () => {

        cy.login_primary_user();
    })
});

describe("Delete test item (Primary User)", () => {

    it("attempt to delete provided test item", () => {

        // click on the 'more info' button for the item to be deleted
        cy
            .contains(deleteItem).parent('div')
            .within(()=>{
                cy.get('Button').click();
            })

        // click on the delete button
        cy
            .contains(deleteButtonText).click();

        // click on the delete confirm button
        cy
            .contains(deleteConfirmText).click();

        // wait for item to delete
        cy.wait(3000)

        // ensure that item deleted does not exist
        cy
            .contains(deleteItem).parent('div')
            .should('not.exist');
    })
});