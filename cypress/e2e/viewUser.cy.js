describe('View User Test', () => {
    // beforeEach(() => {
    //     cy.restoreLocalStorage();
    //   });
    
    //   afterEach(() => {
    //     cy.saveLocalStorage();
    //   });
    it('Should display correct user information', () => {
        // Login
        cy.visit('localhost:3000')
        cy.get('input[name="email"]').type("Admin@gmail.com")
        cy.get('input[name="password"]').type("Password12@")
        cy.contains('Continue').click()
        // Navigate to User Information Page
        cy.contains('Users').click()
        cy.contains('peterwong').click()
        // Check if particulars of user is correct
        cy.contains('peterwong')
        cy.contains('Admin')
        cy.contains('LEAPTRON_LIVE')
        cy.contains('peterwong@leaptron.com')
        cy.contains('91851560')
        cy.contains('Sales admin')
        cy.contains('Management')
    })
  })