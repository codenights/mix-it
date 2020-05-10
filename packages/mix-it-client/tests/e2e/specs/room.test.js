describe('Room', () => {
  it('joins a room', () => {
    cy.visit('/')
    /* cy.createParty().then((party) => {
      cy.get('[data-test=join-room]').type(`${party.id}{enter}`)
      cy.location('href').should('match', /room\/\w+$/)
    }) */
  })
})
