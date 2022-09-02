describe('View Profile Test', () => {
    it('Logs in', () => {
        cy.visit('localhost:3000')
        cy.get('input[name="email"]').clear()
        cy.get('input[name="password"]').clear()
        cy.get('input[name="email"]').type("Admin@gmail.com")
        cy.get('input[name="password"]').type("Password12@")
        cy.contains('Continue').click()
        cy.url().should('include', '/dashboard')
        cy.contains('Logged in successfully').should('be.visible')
    })
    it('Goes to profile page', () => {

        cy.get('#primary-search-account-menu').invoke('show');
        //cy.get('.navprofilename').trigger('mouseover')
        cy.contains('Profile').should('be.visible')
        //cy.contains('Profile').click()
    })
  })
