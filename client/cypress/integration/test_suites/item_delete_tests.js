
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

        cy.wait(3000)

        // click on the delete confirm button
        cy
            .contains(deleteConfirmText).click();
    })
});