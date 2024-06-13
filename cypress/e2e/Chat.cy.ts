describe('Chatbot Test', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('/chat')
    cy.getSubscription()
  })

  it('should send a respond to a question', () => {
    cy.intercept('POST', '/api/conversation', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          role: 'assistant',
          content: 'No soy un asistente médico dedicado a ese tema',
        },
      })
    }).as('getChatResponse')

    cy.intercept('POST', '/api/feature_usage', (req) => {
      req.reply({
        statusCode: 200,
      })
    }).as('featureUsage')

    cy.get('input[placeholder="¿Dime qué nutrientes contiene la papa?"]').type(
      'Dime la historia de México',
    )

    cy.get('button').contains('Preguntar').click()

    cy.contains('No soy un asistente médico dedicado a ese tema').should(
      'be.visible',
    )
  })
})
