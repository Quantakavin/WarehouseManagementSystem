describe('View RMA test', () => {
  it('Visits the RMA page', () => {
    cy.visit('localhost:3000')
    cy.get('input[name="email"]').type('shine.thw@gmail.com')
    cy.get('input[name="password"]').type('Password12@')
    cy.contains('Continue').click()
    cy.contains('RMA').click()
  })
})