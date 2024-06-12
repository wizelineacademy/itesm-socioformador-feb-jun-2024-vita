describe('GeneralData E2E Test', () => {
  beforeEach(() => {
    cy.login()
    // Cambia esta ruta a la ruta donde se monta tu componente
    cy.visit('/home/generalData')
    cy.getSubscription()
  })

  it('renders the page correctly', () => {
    cy.get('h1').contains('Datos Generales').should('be.visible')
  })

  it('shows an error if birth date is less than 15 years ago', () => {
    // Mock the API call to get health data
    cy.intercept('GET', '/api/healthdata', {
      statusCode: 200,
      body: {
        weight: 70,
        sex: 'M',
        bodyFat: 20,
        height: 1.75,
        birthDate: '2000-01-01',
        muscularMass: 30,
      },
    }).as('getHealthData')

    cy.intercept('POST', '/api/healthdata', {}).as('sendData')

    // Ensure the page has loaded the initial data
    cy.wait('@getHealthData')

    // Click the edit button
    cy.get('button').contains('Editar').click()

    // Try to set the birth date to a date less than 15 years ago
    const currentDate = new Date()
    const recentDate = new Date(
      currentDate.getFullYear() - 10,
      currentDate.getMonth(),
      currentDate.getDate(),
    )
    const formattedDate = recentDate.toISOString().split('T')[0]

    cy.get('input[name="birthDate"]')
      .clear({ force: true })
      .type(formattedDate, { force: true })

    // Save the changes
    cy.get('button').contains('Guardar Cambios').click()

    // Check the error message
    cy.on('window:alert', (text) => {
      expect(text).to.contains(
        'La fecha de nacimiento no puede ser menor a 15 años antes de la fecha actual',
      )
    })
  })

  it('cancels edit and restores original data', () => {
    // Mock the API call to get health data
    cy.intercept('GET', '/api/healthdata', {
      statusCode: 200,
      body: {
        weight: 70,
        sex: 'M',
        bodyFat: 20,
        height: 1.75,
        birthDate: '2000-01-01',
        muscularMass: 30,
      },
    }).as('getHealthData')

    cy.intercept('POST', '/api/healthdata', {}).as('sendData')

    // Ensure the page has loaded the initial data
    cy.wait('@getHealthData')

    // Click the edit button
    cy.get('button').contains('Editar').click()

    // Edit the weight input
    cy.get('input[name="weight"]')
      .clear({ force: true })
      .type('75', { force: true })

    // Cancel the edit
    cy.get('button').contains('Cancelar').click({ force: true })

    // Verify the data has been restored
    cy.get('div').contains('70').should('be.visible')
  })

  Cypress.on('uncaught:exception', (err) => {
    // We can ignore invalid time value error
    if (err.message.includes('Invalid time value')) {
      return false
    }
    return true
  })
})
