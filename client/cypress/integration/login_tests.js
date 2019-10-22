describe("Login Tests", function() {

    it("Email field - blank, Password field - blank", function() {
        cy.visit("localhost:3000/login");
    });

    it("Email field - invalid, Password field - blank", function() {
        cy.visit("localhost:3000/login");
    });

    it("Email field - valid, Password field - blank", function() {
        cy.visit("localhost:3000/login");
    });

    it("Email field - blank, Password field - valid", function() {
        cy.visit("localhost:3000/login");
    });

    it("Email field - invalid, Password field - valid", function() {
        cy.visit("localhost:3000/login");
    });

    it("Email field - blank, Password field - invalid", function() {
        cy.visit("localhost:3000/login");
    });

    it("Email field - invalid, Password field - invalid", function() {
        cy.visit("localhost:3000/login");
    });

    it("Email field - valid, Password field - invalid", function() {
        cy.visit("localhost:3000/login");
    });

    it("Email field - valid, Password field - valid", function() {
        cy.visit("localhost:3000/login");
    });

});
