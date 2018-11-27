// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  beforeEach(() => {})

  it('Visits the app root url', () => {
    cy.withinExtension(
      $app => {
        cy.get('#power-on-button').click({ force: true })
        cy.get('#bitsButton').click({ force: true })
        cy.get('.amazonPay1').click({ force: true })
        // cy.get('#snackbarComp').should('be.visible')
      },
      { log: true }
    )
  })
})
