const api = () => Cypress.env('API')

Cypress.Commands.add('createParty', (data = {}) => {
  cy.request({
    method: 'POST',
    url: `${api()}/parties`,
    data
  }).then((res) => res.body)
})
