// PU = Primary User
// SU = Secondary USer

// Tests Assign Item Updates
// 1) PU assigns item then checks that star is on SU's item card
// 2) PU unassigns item then checks that star is NOT on SU's item card

// test assignees
const testSecondaryUser = 'Hugh Jackman'
const noOne = 'No One'

// icon classes
const assignedIcon = 'assigned-icon'

// test login usernames and passwords
const testSecondaryUsername = 'su@test.com'
const testPrimaryUsername = 'pu@test.com'
const testPassword = 'password'

// assigned object
const assignObject = "Magic Runes"

// assigned-to icon index
const assignedIndex = 1

// button texts
const assignButtonText = "Assign"

// login custom cypress command
Cypress.Commands.add('login', (username, pw) => {
    cy
        .get('input[name="email"]')
        .type(username);

    // type in an invalid password
    cy
        .get('input[name="password"]')
        .type(pw);

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

})

// logout custom cypress command
Cypress.Commands.add('logout', () => {
    // logs out of primary user account
    cy
        .get('.dropdown-toggle')
        .click();
    cy
        .get('.dropdown-menu > [href="#"]')
        .click();
})

// openAssignToModal custom cypress command
Cypress.Commands.add('openAssignToModal', () => {

    // click on the 'more info' button for the item to be assigned
    cy
        .contains(assignObject).parent('div')
        .within(()=>{
            cy.get('Button').click();
        })

    // click on the assign button
    cy
        .contains(assignButtonText).click();
})

////// 1) PU assign item then check that star is on SU's item card
describe('Get to the Items Page', function () {
  it('logs into primary user account using the UI', function () {

    // visit the log in page
    cy.visit("http://localhost:3000/login");

    // primary user login
    cy.login(testPrimaryUsername, testPassword);
  })
})

// assign item to secondary user
describe('Assign', function () {
    it('selects user to assign item to and reflect changes', function () {

        // open up assign dialog
        cy
            .openAssignToModal()

        // enter the name of the assignee
        cy
            .get('input.search')
            .type(testSecondaryUser);

        // wait for the search results to appear
        cy.wait(4000)

        // confirm the changes
        cy
            .contains('Confirm')
            .click();
    })

    it('reflect changes in "assigned to" label', function () {

        // check that the assignee label reflects the change
        cy
            .get('.assignee').should('contain', testSecondaryUser)
    })
})

describe('Log out of PU and sign into SU', function () {

    it('exit modals and logout', function () {

        // exits "assign" modal
        cy
            .get('.assign-modal > .modal-dialog > .modal-content > .modal-header > .close ')
            .click()

        // waits for the modal to close
        cy.wait(3000)

        // exits the item modal
        cy
            .get('.close ')
            .click()

        // logs out of primary user account
        cy.logout()
        })

    it('logs into secondary user account using the UI', function () {

      cy.login(testSecondaryUsername, testPassword)
    })

})

describe('Assigned To icon is present on assigned object', function () {

    it('checks if star exist on the assigned object', function () {

        // check: first icon is star icon

        cy.contains(assignObject).parent().within(()=> {
            cy.get('div').eq(assignedIndex)
            .children().first()
            .should('have.class', assignedIcon)
        })
    })
})


describe('Log out of SU and log into PU', function () {

    it('logout', function () {
        cy.logout()
    })

    it('logs into primary user account', function () {
      cy.login(testPrimaryUsername, testPassword)
    })

})

////// 2) PU unassign item then check that star is NOT on SU's item card

// assign the same item to "No One"
describe('Assign', function () {
    it('selects user to assign item to and reflect changes', function () {
        // open up assign dialog
        cy
            .openAssignToModal()

        // enter the name of the assignee
        cy
            .get('input.search')
            .type(noOne);

        // wait for the search results to appear
        cy.wait(4000)

        // confirm the changes
        cy
            .contains('Confirm')
            .click();
    })

    it('reflect changes in "assigned to" label', function () {
        // check that the assignee label reflects the change
        cy
            .get('.assignee').should('contain', noOne)
    })
})

// log out of PU and login to SU
describe('Log out of PU and sign into SU', function () {

    it('exit modals and logout', function () {

        // exits "assign" modal
        cy
            .get('.assign-modal > .modal-dialog > .modal-content > .modal-header > .close ')
            .click()

        // waits for the modal to close
        cy.wait(3000)

        // exits the item modal
        cy
            .get('.close ')
            .click()

        // logs out of primary user account
        cy.logout()
        })

    it('logs into secondary user account using the UI', function () {

      cy.login(testSecondaryUsername, testPassword)

    })
})

// check to see if changes are reflected in the secondary user account
describe('Assigned To icon is NOT present on un-assigned object', function () {

    it('checks if star exist on the assigned object', function () {

        // check : first icon is not star icon
        cy.contains(assignObject).parent().within(()=> {
            cy.get('div').eq(assignedIndex)
            .children().first()
            .should('not.have.class', assignedIcon)
        })
    })
})
