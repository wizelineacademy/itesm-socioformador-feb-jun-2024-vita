/// <reference types="cypress" />

describe('CreateChallenge Component', () => {
  beforeEach(() => {
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
    cy.visit('/home/createChallenge')
  })

  it('should submit the form with valid input', () => {
    cy.intercept('POST', '/api/challenges', {}).as('createChallenge')

    // Llena el formulario con valores válidos
    cy.get('input[id="name"]').type('My Challenge')
    cy.get('textarea[id="description"]').type('Description of my challenge')
    cy.get('select[id="month"]').select('Enero')
    cy.get('input[id="year"]').type('2024')

    cy.get('button[type="submit"]').click()

    // Verifica que se muestre un mensaje de éxito después de enviar el formulario
    cy.contains('Reto creado exitosamente').should('be.visible')
  })
})
