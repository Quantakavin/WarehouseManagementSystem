describe('My First Test', () => {
  it('Visits the Login Page', () => {
    cy.visit('localhost:3000')
    cy.contains('Continue').click()
  })
})