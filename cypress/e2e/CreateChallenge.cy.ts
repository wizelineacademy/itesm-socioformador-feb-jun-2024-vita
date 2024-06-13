describe('CreateChallenge Component', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('/home/createChallenge')
    cy.getSubscription()
  })

  it('should submit the form with valid input', () => {
    cy.getSubscription()

    cy.intercept('POST', '/api/challenges', {}).as('createChallenge')
    cy.intercept('GET', '/api/healthdata', {}).as('getData')
    cy.intercept('GET', '/api/membership', {}).as('getMembership')

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
