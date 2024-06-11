/// <reference types="cypress" />

describe('Sleep hours', () => {
  beforeEach(() => {
    cy.login()
    // Visitar página de ingresar horas de sueño
    cy.visit('/sleep/records')
    cy.getSubscription()
  })

  it('should submit the form with valid input', () => {
    cy.intercept('POST', '/api/records', {}).as('sendRecord')

    // Llena los inputs con valores válidos
    const sleepInput = cy
      .get('label')
      .contains('¿A qué hora te acostaste?')
      .next()
      .find('input')
    sleepInput.type('22:00')

    const wakeupInput = cy
      .get('label')
      .contains('¿A qué hora te levantaste?')
      .next()
      .find('input')
    wakeupInput.type('06:00')

    //Hacer click en el botón de enviar
    cy.get('button').contains('Enviar').click()

    // Verifica que se muestre un mensaje de éxito después de enviar el formulario
    cy.contains('Éxito').should('be.visible')
  })

  it('should calculate the correct amount of sleep hours for valid input', () => {
    cy.intercept('POST', '/api/records', {}).as('sendRecord')

    // Llena los inputs con valores válidos
    const sleepInput = cy
      .get('label')
      .contains('¿A qué hora te acostaste?')
      .next()
      .find('input')
    sleepInput.type('22:00')

    const wakeupInput = cy
      .get('label')
      .contains('¿A qué hora te levantaste?')
      .next()
      .find('input')
    wakeupInput.type('06:00')

    //Hacer click en el botón de enviar
    cy.get('button').contains('Enviar').click()

    // Verifica que se muestre la cantidad de horas correcta
    cy.contains('8.0 horas').should('be.visible')
  })

  it('should return an error if the second time is less than the first time', () => {
    cy.intercept('POST', '/api/records', {}).as('sendRecord')

    // Llenar los inputs con una hora de hoy
    const sleepInput = cy
      .get('label')
      .contains('¿A qué hora te acostaste?')
      .next()
      .find('input')
    sleepInput.type('22:00')
    sleepInput.siblings('button').contains('Hoy').click()

    // Llenar los inputs con una hora de ayer
    const wakeupInput = cy
      .get('label')
      .contains('¿A qué hora te levantaste?')
      .next()
      .find('input')
    wakeupInput.type('06:00')
    wakeupInput.siblings('button').contains('Ayer').click()

    //Hacer click en el botón de enviar
    cy.get('button').contains('Enviar').click()

    // Verifica que se muestre un mensaje de error
    cy.contains(
      'La cantidad de horas de sueño debe ser mayor o igual a 0',
    ).should('be.visible')
  })
})
