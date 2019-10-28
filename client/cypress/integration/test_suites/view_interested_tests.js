// PU = primary user
// SU = secondary user

// NOTE! only works if "Dash, the Cat"s in both SU accounts are unliked initially

//* Tests for View Interested
// 1. Check single SU liking an item is reflected in the PU View Int Modal
// 2. Check single user un-liking the same item is reflected in the PU View Int Modal
// 3. Check if more than one SU liking the same item is reflected in the PU View Int Modal

// test login usernames and passwords
const testPrimaryUsername = 'pu@test.com'
const testSecondaryUsername1 = 'su@test.com'
const testSecondaryUsername2= 'su4@test.com'
const testPassword = 'password'

// test interested SUs
const testSecondaryUser1 = "Hugh Jackman"
const testSecondaryUser2 = "Uncle Benjamin"

// test object of interest
const likeObject = "Dash, the Cat"

// custom Cypress login command
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

// custom Cypress logout from item page command
Cypress.Commands.add('logout', () => {
    // logs out of primary user account
    cy
        .get('.dropdown-toggle')
        .click();
    cy
        .get('.dropdown-menu > [href="#"]')
        .click();
})


////// 1. Check single SU liking an item is reflected in the PU View Int Modal
describe('Go to the Items Page', function () {
  it('logs into Secondary User 1 account using the UI', function () {

    // visit the log in page
    cy.visit("http://localhost:3000/login");

    // SU1 login
    cy.login(testSecondaryUsername1 , testPassword);
  })
})


describe('Secondary User 1  expresses interest', function () {
    it('expresses interest in an item', function () {

        // click on the 'like' button for the item to be assigned
        cy
            .contains(likeObject).parent('div')
            .within(()=>{
                cy.get('.like-btn').click()
            })
    })
})


describe('Secondary User 1 log out', function () {
    it('logs out', function () {

        //logs out of secondary user account
        cy.logout()
    })
})


describe('Primary User logs in', function () {
    it('logs in', function () {

        // PU login
        cy.login(testPrimaryUsername, testPassword)
    })
})


describe('Check view interested has been updated', function () {
    it('navigates to the item modal', function () {

        // open item modal
        cy
            .contains(likeObject).parent('div')
            .within(()=>{
                cy.contains('more info').click()
            })
    })
    it('confirms that Secondary User 1 shows up', function () {

        // open 'interested users' modal
        cy
            .get('.modal-btn-set > :nth-child(1) > div > .btn')
            .click()

        // wait for interested users to turn up
        cy.wait(3000)

        // navigate to "Interested Users" list
        cy
            .get('.int-user-modal > .modal-dialog > .modal-content')
            .should(($interestedUsers) => {
                // should contain testSecondaryUser1
                expect($interestedUsers).to.contain(testSecondaryUser1)
            })
    })
})


/////// 2. Check single user un-liking the same item is reflected in the PU View Int Modal
describe('Log out of Primary User and sign into second Secondary User 1', function () {

    it('exit modals and logout', function () {

        // exits "view-interested" modal
        cy
            .get('.int-user-modal > .modal-dialog > .modal-content > .modal-header > .close')
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

    it('logs into Secondary User 1 account using the UI', function () {

      // SU1 login
      cy.login(testSecondaryUsername1, testPassword)
    })

})


describe('Secondary User 1 unlikes the same object', function () {
    it('unlikes the same item', function () {

        // click on the 'unlike' button for the item to be un-assigned
        cy
            .contains(likeObject).parent('div')
            .within(()=>{
                cy.get('.like-btn').click()
            })

        cy.wait(4000);
    })
})



describe('Secondary User 1 logs out', function () {
    it('logs out', function () {

        // SU1 logout
        cy.logout()
    })
})


describe('Primary User signs in', function () {
    it('logs in', function () {

        // PU login
        cy.login(testPrimaryUsername, testPassword)
    })
})


describe('Check view interested has been updated', function () {
    it('navigates to the item modal', function () {

        // open item modal
        cy
            .contains(likeObject).parent('div')
            .within(()=>{
                cy.contains('more info').click()
            })
    })
    it('confirms that interested user modal has been updated', function () {

        // open 'interested users' modal
        cy
            .get('.modal-btn-set > :nth-child(1) > div > .btn')
            .click()

        // wait for interested users to turn up
        cy.wait(3000)

        // check for testSecondaryUser1
        cy
            .get('.int-user-modal > .modal-dialog > .modal-content')
            .should(($interestedUsers) => {
                // should NOT contain testSecondaryUser1
                expect($interestedUsers).to.not.contain(testSecondaryUser1)
            })
    })
})


///////  3. Check if more than one SU liking the same item is reflected in the PU View Int Modal
describe('Log out of PU and sign into SU2', function () {

    it('exit modals and logout', function () {

        // exits "view-interested" modal
        cy
            .get('.int-user-modal > .modal-dialog > .modal-content > .modal-header > .close')
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

    it('logs into Secondary User 2 account using the UI', function () {

      // SU2 login
      cy.login(testSecondaryUsername2, testPassword);
    })

})


describe('Second User expresses interest in the same object', function () {
    it('expresses interest in an item', function () {

        // click on the 'like' button for the item to be assigned
        cy
            .contains(likeObject).parent('div')
            .within(()=>{
                cy.get('.like-btn').click()
            })
    })
})


describe('Secondary User 2 logs out', function () {
    it('logs out', function () {
        // SU2 logout
        cy.logout()
    })
})


describe('Log into other Secondary User 1 account', function() {
    it('logs into Secondary User account 1 using the UI', function () {

        // SU1 login
        cy.login(testSecondaryUsername1, testPassword)
    })

    it('expresses interest in an item', function () {

        // click on the 'like' button for the item to be assigned
        cy
            .contains(likeObject).parent('div')
            .within(()=>{
                cy.get('.like-btn').click()
            })
    })

})


describe('Secondary User 1 logs out', function () {
    it('logs out', function () {

        //logs out of Secondary User 1 account
        cy.logout()
        cy.wait(3000);
    })
})


describe('Primary User sign in', function () {
    it('logs in', function () {

        // PU login
        cy.login(testPrimaryUsername, testPassword)
    })
})


describe('Check view interested has been updated', function () {
    it('navigates to the item modal', function () {

        // open item modal
        cy
            .contains(likeObject).parent('div')
            .within(()=>{
                cy.contains('more info').click()
            })
    })
    it('confirms that both new interested user shows up', function () {

        // open 'interested users' modal
        cy
            .get('.modal-btn-set > :nth-child(1) > div > .btn')
            .click()

        // wait for interested users to turn up
        cy.wait(3000)

        // check for first user
        cy
            .get('.int-user-modal > .modal-dialog > .modal-content')
            .should(($interestedUsers) => {
                // should contain testSecondaryUSer1
                expect($interestedUsers).to.contain(testSecondaryUser1)
            })

        // check for second user
        cy
            .get('.int-user-modal > .modal-dialog > .modal-content')
            .should(($interestedUsers) => {
                // should contain testSecondaryUSer2
                expect($interestedUsers).to.contain(testSecondaryUser2)
            })
    })
})
