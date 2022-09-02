describe('Create User Test', () => {
    // beforeEach(() => {
    //     cy.restoreLocalStorage();
    //   });
    
    //   afterEach(() => {
    //     cy.saveLocalStorage();
    //   });
    it('Should validate invalid inputs', () => {
        // Login
        cy.visit('localhost:3000')
        cy.get('input[name="email"]').type("Admin@gmail.com")
        cy.get('input[name="password"]').type("Password12@")
        cy.contains('Continue').click()
        // Navigate to Add User Page
        cy.contains('Users').click()
        cy.contains('Create').click()
        // Check if all form fields are present
        cy.get('input[name="name"]').should('be.visible')
        cy.get('input[name="email"]').should('be.visible')
        cy.get('input[name="password"]').should('be.visible')
        cy.get('input[name="mobileno"]').should('be.visible')
        // Leave all form fields blank
        cy.contains('Next').click()
        cy.contains('Username cannot be empty').scrollIntoView().should('be.visible')
        cy.contains('Email Address cannot be empty').should('be.visible')
        cy.contains('Mobile no cannot be empty').should('be.visible')
        cy.contains('Password cannot be empty').should('be.visible')
        cy.contains('Please select at least one option').should('be.visible')
        // Enter Invalid Form Fields
        cy.get('input[name="email"]').type('test@gmailcom')
        cy.get('input[name="password"]').type('password')
        cy.get('input[name="mobileno"]').type('123')
        cy.contains('Next').click()
        cy.contains('Please enter a valid email').should('be.visible')
        cy.contains('Please enter a valid mobile no').should('be.visible')
        cy.contains('Password should be over 8 characters long with a mix of uppercase/lowercase letters and numbers').should('be.visible')
        // Enter everything correctly in first part of form
        cy.get('input[name="email"]').clear()
        cy.get('input[name="password"]').clear()
        cy.get('input[name="mobileno"]').clear()
        cy.get('input[name="name"]').type('test')
        cy.get('input[name="email"]').type('test@gmail.com')
        cy.get('input[name="password"]').type('Password12@')
        cy.get('input[name="mobileno"]').type('98765432')
        cy.get('[name="company"]').parent().click()
        cy.contains('LEAPTRON_LIVE').click()
        // Navigate to second part of form
        cy.contains('Next').click()
        // Leave user group blank
        cy.contains('Submit').click()
        cy.contains('Please select at least one option').should('be.visible')
    })
    it('Should prevent duplicate email or username',() => {
        // Login
        cy.visit('localhost:3000')
        cy.get('input[name="email"]').type("Admin@gmail.com")
        cy.get('input[name="password"]').type("Password12@")
        cy.contains('Continue').click()
        // Navigate to Add User Page
        cy.contains('Users').click()
        cy.contains('Create').click()
        // Check if all form fields are present
        cy.get('input[name="name"]').should('be.visible')
        cy.get('input[name="email"]').should('be.visible')
        cy.get('input[name="password"]').should('be.visible')
        cy.get('input[name="mobileno"]').should('be.visible')
        // Fill up all the form fields including an pre existing email
        cy.get('input[name="name"]').type('testadmin')
        cy.get('input[name="email"]').type('Admin@gmail.com')
        cy.get('input[name="password"]').type('Password12@')
        cy.get('input[name="mobileno"]').type('98765432')
        cy.get('[name="company"]').parent().click()
        cy.contains('LEAPTRON_LIVE').click()
        // Navigate to second part of form
        cy.contains('Next').click()
        // Fill up all the form fields
        cy.get('[name="usergroup"]').parent().click()
        cy.contains('Sales Admin').click()
        cy.get('[name="notificationgroups"]').parent().click()
        cy.contains('Maintainence').click()
        cy.contains('Management').click()
        cy.get('body').scrollIntoView().click();
        // Display Error Alert
        cy.contains('Submit').click()
        cy.contains('User with that email already exists')
        // Navigate back to first part of form
        cy.contains('Back').click()
        // Enter a pre existing username
        cy.get('input[name="email"]').clear()
        cy.get('input[name="email"]').type("test@gmail.com")
        cy.get('input[name="name"]').clear()
        cy.get('input[name="name"]').type("Admin")
        // Navigate to second part of form
        cy.contains('Next').click()
        // Display Error Alert
        cy.contains('Submit').click()
        cy.contains('User with that username already exists')
    })
    it('Create user successfully',() => {
        // Login
        cy.visit('localhost:3000')
        cy.get('input[name="email"]').type("Admin@gmail.com")
        cy.get('input[name="password"]').type("Password12@")
        cy.contains('Continue').click()
        // Navigate to Add User Page
        cy.contains('Users').click()
        cy.contains('Create').click()
        // Check if all form fields are present
        cy.get('input[name="name"]').should('be.visible')
        cy.get('input[name="email"]').should('be.visible')
        cy.get('input[name="password"]').should('be.visible')
        cy.get('input[name="mobileno"]').should('be.visible')
        // Fill up all the form fields
        cy.get('input[name="name"]').type('test')
        cy.get('input[name="email"]').type('test@gmail.com')
        cy.get('input[name="password"]').type('Password12@')
        cy.get('input[name="mobileno"]').type('98765432')
        cy.get('[name="company"]').parent().click()
        cy.contains('LEAPTRON_LIVE').click()
        // Navigate to second part of form
        cy.contains('Next').click()
        // Fill up all the form fields
        cy.get('[name="usergroup"]').parent().click()
        cy.contains('Sales Admin').click()
        cy.get('[name="notificationgroups"]').parent().click()
        cy.contains('Maintainence').click()
        cy.contains('Management').click()
        cy.get('body').scrollIntoView().click();
        // Submit
        cy.contains('Submit').click()
        cy.url().should('include', '/users')
        cy.contains("User created successfully")
    })
  })
