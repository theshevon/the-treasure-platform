// PU = primary user
// SU = secondary user

// NOTE! only works if "Dash, the Cat"s in both SU accounts are unliked initially

//* Tests for View Interested
// 1. Check single SU liking an item is reflected in the PU View Int Modal
// 2. Check that single user un-liking the same item is reflected in the PU View Int Modal
// 3. Check if more than one SU liking the same item is reflected in the PU View Int Modal


// login function
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

// logout from items page
Cypress.Commands.add('logout', () => {
    // logs out of primary user account
    cy
        .get('.dropdown-toggle')
        .click();
    cy
        .get('.dropdown-menu > [href="#"]')
        .click();
})

describe('Get to the Items Page', function () {
  it('logs into secondary user account using the UI', function () {

    // visit the log in page
    cy.visit("http://localhost:3000/login");

    // sets up primary user test login
    const username = "su@test.com"
    const password = "password"

    cy.login(username, password);
  })
})


describe('One User expresses interest', function () {
    it('expresses interest in an item', function () {
        const likeObject = "Dash, the Cat"

        // click on the 'like' button for the item to be assigned
        cy
            .contains(likeObject).parent('div')
            .within(()=>{
                cy.get('.like-btn').click()
            })
    })
})

describe('Secondary user log out', function () {
    it('logs out', function () {
        //logs out of secondary user account
        cy.logout()
    })
})
describe('Primary User sign in', function () {
    it('logs in', function () {
        // sets up primary user test login
        const username = "pu@test.com"
        const password = "password"

        cy.login(username, password)
    })
})

describe('Check view interested has been updated', function () {
    it('navigates to the item modal', function () {
        const likeObject = "Dash, the Cat"
        // open item modal
        cy
            .contains(likeObject).parent('div')
            .within(()=>{
                cy.contains('more info').click()
            })
    })
    it('confirms that new interested user shows up', function () {
        const testSecondaryUser = "Hugh Jackman"
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
                // should contain testSecondaryUSer
                expect($interestedUsers).to.contain(testSecondaryUser)
            })
    })
})

/////// check to see if unliking an item is reflected in the primary user account

describe('Log out of Primary User and sign into second Secondary User', function () {

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

    it('logs into secondary user account using the UI', function () {

      // sets up another secondary user test login
      const username = "su@test.com"
      const password = "password"

      // type in a valid email
      cy.login(username, password)
    })

})


describe('Secondary User unlikes the same object', function () {
    it('unlikes the same item', function () {
        const likeObject = "Dash, the Cat"

        // click on the 'unlike' button for the item to be un-assigned
        cy
            .contains(likeObject).parent('div')
            .within(()=>{
                cy.get('.like-btn').click()
            })

        cy.wait(4000);
    })
})



describe('Secondary user log out', function () {
    it('logs out', function () {
        //logs out of secondary user account
        cy.logout()
    })
})
describe('Primary User sign in', function () {
    it('logs in', function () {
        // sets up primary user test login
        const username = "pu@test.com"
        const password = "password"

        // type in a valid email
        cy.login(username, password)
    })
})

describe('Check view interested has been updated', function () {
    it('navigates to the item modal', function () {
        const likeObject = "Dash, the Cat"
        // open item modal
        cy
            .contains(likeObject).parent('div')
            .within(()=>{
                cy.contains('more info').click()
            })
    })
    it('confirms that interested user modal has been updated', function () {
        const testSecondaryUser = "Hugh Jackman"
        // open 'interested users' modal
        cy
            .get('.modal-btn-set > :nth-child(1) > div > .btn')
            .click()

        // wait for interested users to turn up
        cy.wait(3000)

        // check for testSecondaryUser
        cy
            .get('.int-user-modal > .modal-dialog > .modal-content')
            .should(($interestedUsers) => {
                // should NOT contain testSecondaryUSer
                expect($interestedUsers).to.not.contain(testSecondaryUser)
            })
    })
})


/////// Check that another user liking the same item works shows up in interested users
describe('Log out of PU and sign into SU', function () {

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

    it('logs into secondary user account using the UI', function () {

      // sets up another secondary user test login
      const username = "su4@test.com"
      const password = "password"

      // type in a valid email
      cy.login(username, password);
    })

})


describe('Second User expresses interest in the same object', function () {
    it('expresses interest in an item', function () {
        const likeObject = "Dash, the Cat"

        // click on the 'like' button for the item to be assigned
        cy
            .contains(likeObject).parent('div')
            .within(()=>{
                cy.get('.like-btn').click()
            })
    })
})



describe('Secondary user log out', function () {
    it('logs out', function () {
        //logs out of secondary user account
        cy.logout()
    })
})


describe('Log into other secondary user account', function() {
    it('logs into secondary user account 2 using the UI', function () {

      // sets up another secondary user test login
      const username = "su@test.com"
      const password = "password"

      cy.login(username, password)
    })

    it('expresses interest in an item', function () {
        const likeObject = "Dash, the Cat"

        // click on the 'like' button for the item to be assigned
        cy
            .contains(likeObject).parent('div')
            .within(()=>{
                cy.get('.like-btn').click()
            })
    })

})

describe('Secondary user 2 logs out', function () {
    it('logs out', function () {
        //logs out of secondary user account
        cy.logout()
        cy.wait(3000);
    })
})

describe('Primary User sign in', function () {
    it('logs in', function () {
        // sets up primary user test login
        const username = "pu@test.com"
        const password = "password"

        // type in a valid email
        cy.login(username, password)
    })
})

describe('Check view interested has been updated', function () {
    it('navigates to the item modal', function () {
        const likeObject = "Dash, the Cat"
        // open item modal
        cy
            .contains(likeObject).parent('div')
            .within(()=>{
                cy.contains('more info').click()
            })
    })
    it('confirms that both new interested user shows up', function () {
        const testSecondaryUser1 = "Hugh Jackman"
        const testSecondaryUser2 = "Uncle Benjamin"
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
