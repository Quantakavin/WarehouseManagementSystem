describe('Accepts RMA', () => {
    it('Accepts an RMA request', () => {
      cy.visit('localhost:3000')
      cy.get('input[name="email"]').type('bogus@gmail.com')
      cy.get('input[name="password"]').type('Password12@')
      cy.contains('Continue').click()
      cy.contains('RMA').click()
      cy.contains('gfds').click()
    })
  })