/// <reference types="Cypress" />

describe('Launch application', function()
{
    it('Add to cart',function()
    {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
        cy.get('.search-keyword').type('ca')
        cy.wait(2000)
        cy.get('.product:visible').should('have.length',4)

        // Declare alias
        cy.get('.products').as('productLocator')

        // parent child chaining and click based on index
        cy.get('@productLocator').find('.product').eq(2).contains('ADD TO CART').click().then(function()
        {
          console.log("3rd product added to cart")
        })

        // using for each, do iterate and click product based on text
        cy.get('@productLocator').find('.product').each(($el,index,$list) =>{
           const vegtxt=  $el.find('h4.product-name').text()
          if(vegtxt.includes('Carrot'))
          {
            cy.wrap($el).find('button').click()
            cy.log('Carrot has been added to CART!')
          }          
        })


        // assertion using should
        cy.get('.brand').should('have.text','GREENKART')

    })
})