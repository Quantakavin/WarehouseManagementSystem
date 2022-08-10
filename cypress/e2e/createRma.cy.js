describe("View RMA test", () => {
  it("Visits the Create RMA page", () => {
    cy.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.visit("localhost:3000");
    cy.get('input[name="email"]').type("shine.thw@gmail.com");
    cy.get('input[name="password"]').type("Password12@");
    cy.contains("Continue").click();
    cy.contains("RMA").click();
    cy.contains("Create").click();
    cy.on("uncaught:exception", (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      cy.get('input[name="Customer Name"]').type("Shine Tan");
      cy.get('input[name="Customer Email"]').type("shine.thw@gmail.com");
      cy.get('input[name="Company"]').type("Leaptron Engineering");
      cy.get('input[name="Contact Number"]').type("96963677");
      return false;
    });
  });
});
