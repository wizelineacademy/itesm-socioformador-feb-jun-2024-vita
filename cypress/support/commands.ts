/// <reference types="cypress" />

Cypress.Commands.add('login', () => {
  // Intercepta la llamada de autenticación de Google y devuelve una respuesta simulada
  cy.intercept('GET', '/api/auth/session', (req) => {
    req.reply({
      statusCode: 200,
      body: {
        user: {
          name: 'Test User',
          email: 'test@example.com',
        },
        expires: '2099-01-01T00:00:00.000Z',
      },
    })
  }).as('googleLogin')

  cy.visit('/login')

  // Simula el inicio de sesión con Google
  cy.get('button').contains('Continuar con Google').click()

  // Espera a que la solicitud de inicio de sesión sea interceptada y respondida
  cy.wait('@googleLogin')
})

Cypress.Commands.add('getSubscription', () => {
  cy.intercept('GET', '/api/subscription', (req) => {
    req.reply({
      statusCode: 200,
      body: {
        plan: 'Bienestar Total',
        status: 'active',
        end: null,
      },
    })
  })
})
