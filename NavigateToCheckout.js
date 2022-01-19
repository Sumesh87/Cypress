/// <reference types="Cypress" />

describe('Launch application', function()
{
    it('Add to cart',function()
    {
        //cy.visit('https://stradegi.nflows.com.sg/nFlows/login/login.jsp')
         cy.visit(Cypress.env('url')+'/seleniumPractise/#/')
        cy.get('.search-keyword').type('ca')
        cy.wait(2000)
       
        // Declare alias
        cy.get('.products').as('productLocator')

        // parent child chaining and click based on index
        cy.get('@productLocator').find('.product').eq(2).contains('ADD TO CART').click() 

        // using for each, do iterate and click product based on text
        cy.get('@productLocator').find('.product').each(($el,index,$list) =>{
           const vegtxt=  $el.find('h4.product-name').text()
          if(vegtxt.includes('Carrot'))
          {
            cy.wrap($el).find('button').click()
            cy.log('Carrot has been added to CART!')
          }          
        })
        // click on cart icon
        cy.get('.cart-icon > img').click()
        cy.wait(2000)

        cy.contains('PROCEED TO CHECKOUT').click()
        cy.wait(2000)
        
        cy.contains('Place Order').click()

    })
})