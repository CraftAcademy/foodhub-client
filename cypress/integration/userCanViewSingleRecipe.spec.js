describe('View single recipe', () => {
  it('Successfully', () => {
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/v1/recipes/1',
      response: 'fixture:single_recipe.json',
      status: 200
    })
    cy.get('#recipe-1')
      .click({ force: true })
    cy.get('[name="single-recipe"]').within(() => {
      cy.get('.header').should('contain', 'Quiche')
        .get('[name="recipe-ingredients"]').should('contain', 'Eggs')
        .get('[name="recipe-directions"]').should('contain', 'Stir the mixture')
    })
  })

  it('Fails to', () => {
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/v1/recipes/1',
      response: '{ "error_message": "The recipe could not be found" }',
      status: 404
    })
    cy.get('#recipe-1')
      .click({ force: true })
    cy.get('#response-message')
      .should('contain', 'The recipe could not be found')
  })
  
  it('A forked recipe has original creators details and is linked', () => {
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/v1/recipes/2',
      response: 'fixture:forked_recipe.json',
      status: 200
    }),
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/v1/recipes/1',
      response: 'fixture:single_recipe.json',
      status: 200
    })
    cy.anotherLoginUser('user2@mail.com', 'password')
    cy.get('#recipe-2').click({ force: true })
    cy.get('[name="single-recipe"]').within(() => {
      cy.get('.header').should('contain', 'Quiche')
        .get('[name="parent-data"]').should('contain', 'This recipe Quiche was forked from Bob')
        .get('[name="parent-data"]').click()
    })
    cy.get('[name="single-recipe"]').within(() => {
      cy.get('.header').should('contain', 'Quiche')
        .get('[name="recipe-ingredients"]').should('contain', 'Eggs')
        .get('[name="recipe-directions"]').should('contain', 'Stir the mixture')
    })  
  })

  it('A recipe can have ratings', () => {
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/v1/recipes/2',
      response: 'fixture:single_recipe.json',
      status: 200
    }),
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/v1/recipes/like',
      response: '{"message": "You like this recipe!"}',
      status: 201
    })

    cy.loginUser('user@mail.com', 'password')
    cy.get('#recipe-1').click({ force: true })
    cy.get('#likes').should('contain', '0')
    cy.get('name["add-like-to-recipe"]').click()
    cy.get('#response-message')
      .should('contain', 'You like this recipe!')
    cy.get('#likes').should('contain', '1')
  })
})