// tests view-interested updates
// NOTE! only works if "Dash, the Cat"s in both accounts are unliked initially

describe('Get to the Items Page', function () {
  it('logs into secondary user account using the UI', function () {

    // visit the log in page
    cy.visit("http://localhost:3000/login");

    // sets up primary user test login
    const username = "su@test.com"
    const password = "password"

    // type in a valid email
    cy
        .get('input[name="email"]')
        .type(username);

    // type in an invalid password
    cy
        .get('input[name="password"]')
        .type(password);

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
        cy
            .get('.dropdown-toggle')
            .click();
        cy
            .get('.dropdown-menu > [href="#"]')
            .click();
    })
})
describe('Primary User sign in', function () {
    it('logs in', function () {
        // sets up primary user test login
        const username = "pu@test.com"
        const password = "password"

        // type in a valid email
        cy
            .get('input[name="email"]')
            .type(username);

        // type in an invalid password
        cy
            .get('input[name="password"]')
            .type(password);

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

//////////////// Check that another user liking the same item works shows up in interested users
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
        cy
            .get('.dropdown-toggle')
            .click();
        cy
            .get('.dropdown-menu > [href="#"]')
            .click();
        })

    it('logs into secondary user account using the UI', function () {

      // sets up another secondary user test login
      const username = "su4@test.com"
      const password = "password"

      // type in a valid email
      cy
          .get('input[name="email"]')
          .type(username);

      // type in a valid password
      cy
          .get('input[name="password"]')
          .type(password);

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
        cy
            .get('.dropdown-toggle')
            .click();
        cy
            .get('.dropdown-menu > [href="#"]')
            .click();
    })
})
describe('Primary User sign in', function () {
    it('logs in', function () {
        // sets up primary user test login
        const username = "pu@test.com"
        const password = "password"

        // type in a valid email
        cy
            .get('input[name="email"]')
            .type(username);

        // type in an invalid password
        cy
            .get('input[name="password"]')
            .type(password);

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
        cy
            .get('.dropdown-toggle')
            .click();
        cy
            .get('.dropdown-menu > [href="#"]')
            .click();
        })

    it('logs into secondary user account using the UI', function () {

      // sets up another secondary user test login
      const username = "su@test.com"
      const password = "password"

      // type in a valid email
      cy
          .get('input[name="email"]')
          .type(username);

      // type in a valid password
      cy
          .get('input[name="password"]')
          .type(password);

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
    })
})



describe('Secondary user log out', function () {
    it('logs out', function () {
        //logs out of secondary user account
        cy
            .get('.dropdown-toggle')
            .click();
        cy
            .get('.dropdown-menu > [href="#"]')
            .click();
    })
})
describe('Primary User sign in', function () {
    it('logs in', function () {
        // sets up primary user test login
        const username = "pu@test.com"
        const password = "password"

        // type in a valid email
        cy
            .get('input[name="email"]')
            .type(username);

        // type in an invalid password
        cy
            .get('input[name="password"]')
            .type(password);

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



// check single user likkng
    // log into su
    // check if button is already lit - if it is, don't touch, if it isn't, like it
    //log out
    // log into PU
    //click on the relevant item modal
    // click on view interested
    // verify that SU is there
// check multiple users liking
    // log into su4
    // check if button is already lit - if it is, don't touch, if it isn't, like it
    // log out
    // log into PU
    //click on the relevant item modal
    // click on view interested
    // verify that SU is there
// check that single user unliking is updating
    //log into su
    // go to item card, unlike the item
    // go back to PU
    //click on the relevant item modal
    // click on view interested
    // verify that SU is NOT there
