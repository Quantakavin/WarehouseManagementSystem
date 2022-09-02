describe('View All Users Test', () => {
    // beforeEach(() => {
    //     cy.restoreLocalStorage();
    //   });
    
    //   afterEach(() => {
    //     cy.saveLocalStorage();
    //   });
    it('Displays List of Users', () => {
        // Login
        cy.visit('localhost:3000')
        cy.get('input[name="email"]').type("Admin@gmail.com")
        cy.get('input[name="password"]').type("Password12@")
        cy.contains('Continue').click()
        // Navigate to Users Page
        cy.contains('Users').click()
        // Check if information of more than one user is displayed
        cy.contains('1')
        cy.contains('peterwong')
        cy.contains('peterwong@leaptron.com')
        cy.contains('LEAPTRON_LIVE')
        cy.contains('Admin')
        cy.contains('91851560')
        cy.contains('2')
        cy.contains('kelynwong')
        cy.contains('kelynwonget@gmail.com')
        cy.contains('LEAPTRON_LIVE')
        cy.contains('Sales Admin')
        cy.contains('7777777')
    })
    it('Searches Users by any Column', () => {
        // Login
        cy.visit('localhost:3000')
        cy.get('input[name="email"]').type("Admin@gmail.com")
        cy.get('input[name="password"]').type("Password12@")
        cy.contains('Continue').click()
        // Navigate to Users Page
        cy.contains('Users').click()
        // Search by name
        cy.get('input').first().type("sales")
        // Irrelevant resutls should be filtered out
        cy.contains('peterwong').should('not.exist');
        // Relevant resutls should be displayed
        cy.contains('Sales Engineer')
    })
    it('Checks if there are no relevant results', () => {
        // Login
        cy.visit('localhost:3000')
        cy.get('input[name="email"]').type("Admin@gmail.com")
        cy.get('input[name="password"]').type("Password12@")
        cy.contains('Continue').click()
        // Navigate to Users Page
        cy.contains('Users').click()
        // Search by name
        cy.get('input').first().type("zzzzzz")
        // Message should be displayed
        cy.contains('No Users Found')
    })
  })