// visit login page.
// sign in using primary user
// assign to uncle benjamin
// log out
// sign into uncl ebenjamin's acc
// look for elemnt of type assigned to

describe('Get to the Items Page', function () {
  it('logs into primary user account using the UI', function () {

    // visit the log in page
    cy.visit("http://localhost:3000/login");

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


describe('Assign', function () {
    it('opens up assignTo modal', function () {
        const assignObject = "Magic Runes"
        const assignButtonText = "Assign"

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

    it('selects user to assign item to and reflect changes', function () {
        const testSecondaryUser = 'Hugh Jackman'

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
        cy
            .get('.dropdown-toggle')
            .click();
        cy
            .get('.dropdown-menu > [href="#"]')
            .click();
        })

    it('logs into secondary user account using the UI', function () {

      // sets up secondary user test login
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

describe('Assigned To label is present on assigned object', function () {

    it('checks if star is on the assigned object', function () {

        const assignObject = "Magic Runes"
        //go to item card's icon bar
        cy.get(':nth-child(10) > .justify-content-end')

    })
})





 // select more info on chosen item card
 // toggle assign to to hugh jackman
 //check that the value of the assign to field changes
  // log out an dgo into hugh jackman's acc
  //check that there is a star icon on the item's card
  //go back to pu
  //look fo rthe same item
 // unassign hugh jackman
 // go to hugh jack;s account
 // check that star is not there anymore
 // go back to PU
 // select the item check that if no one is selected it reflects no one
 // select another users
 //log into anothe ruser's acc
 // check that assign to star is lit
