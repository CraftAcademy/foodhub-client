describe('View single recipe', () => {

  beforeEach(() => {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/v1/recipes',
      response: 'fixture:recipes.json'
    })
    cy.visit('http://localhost:3001')
  })

  it('Successfully', () => {
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/v1/recipes/1',
      response: 'fixture:single_recipe.json',
      status: 200
    })
    cy.get('#recipes_1').click()
    cy.get('#single-recipe').within(() => {
      cy.get('#recipe-title').should('contain', 'Quiche')
      cy.get('#recipe-ingredients').should('contain', 'Eggs')
      cy.get('#recipe-directions').should('contain', 'Stir the mixture')
    })
  })

  it('Fails to', () => {
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/v1/recipes',
      response: '{ "error_message": "The recipe could not be found" }',
      status: 404
    })

    cy.get('#recipes_1')
      .click()
    cy.get('#response-message')
    cy.should('contain', 'The recipe could not be found')
  })
})