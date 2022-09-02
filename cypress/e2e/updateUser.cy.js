describe('Update User Test', () => {

    it('Should contain default values', () => {
        // Login
        cy.visit('localhost:3000')
        cy.get('input[name="email"]').type("Admin@gmail.com")
        cy.get('input[name="password"]').type("Password12@")
        cy.contains('Continue').click()
        // Navigate to Edit User Page
        cy.contains('Users').click()
        cy.contains('test@gmail.com').scrollIntoView().click()
        cy.contains('Edit Details').click()
        // Check if all form fields are present
        cy.get('input[name="name"]').should('be.visible')
        cy.get('input[name="email"]').should('be.visible')
        cy.get('input[name="password"]').should('be.visible')
        cy.get('input[name="mobileno"]').should('be.visible')
        // Check if default information is autofilled
        cy.get('input[name="name"]').should('have.value', 'test')
        cy.get('input[name="email"]').should('have.value', 'test@gmail.com')
        cy.get('input[name="mobileno"]').should('have.value', '98765432')
        cy.contains('LEAPTRON_LIVE')
        // Password is validated
        cy.contains('Next').click()
        cy.contains('Password cannot be empty')
        // Default Password is not validated
        cy.get('[type="checkbox"]').check({ force: true }) 
        cy.contains('Next').click()
        // User groups and Notification Groups are auto selected
        cy.contains('Sales Admin')
        cy.contains('Maintainence, Management')
        // Submit
        cy.contains('Submit').click()
        cy.url().should('include', '/user')
        cy.contains("User updated successfully")
    })
    it('Should be able to change default values',() => {
        // Login
        cy.visit('localhost:3000')
        cy.get('input[name="email"]').type("Admin@gmail.com")
        cy.get('input[name="password"]').type("Password12@")
        cy.contains('Continue').click()
        // Navigate to Edit User Page
        cy.contains('Users').click()
        cy.contains('test@gmail.com').scrollIntoView().click()
        cy.contains('Edit Details').click()
        // Check if all form fields are present
        cy.get('input[name="name"]').should('be.visible')
        cy.get('input[name="email"]').should('be.visible')
        cy.get('input[name="password"]').should('be.visible')
        cy.get('input[name="mobileno"]').should('be.visible')
        // Fill up all the form fields
        cy.get('input[name="name"]').clear().type('test2')
        cy.get('input[name="email"]').clear().type('test2@gmail.com')
        cy.get('input[name="password"]').clear().type('Password1@')
        cy.get('input[name="mobileno"]').clear().type('97498452')
        cy.get('[name="company"]').parent().click()
        cy.contains('SERVO_LIVE').click()
        // Navigate to second part of form
        cy.contains('Next').click()
        // Fill up all the form fields
        cy.get('[name="usergroup"]').parent().click()
        cy.contains('Sales Engineer').click()
        cy.get('[name="notificationgroups"]').parent().click()
        cy.contains('RMA Notification').click()
        cy.get('body').scrollIntoView().click();
        // Submit
        cy.contains('Submit').click()
        cy.url().should('include', '/user')
        cy.contains("User updated successfully")
    })
  })
