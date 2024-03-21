/* 
  Open a browser and go to the DuckDuckGo search engine (https://duckduckgo.com/)
  Verify if the search bar is visible and active
  Go to settings and change appearance to dark mode
  Verify if the background color has been updated
*/

describe('DuckDuckGo - Verify if the search bar is visible and active', () => {
  before(() => {
    cy.visit('https://duckduckgo.com')
  })

  it('search bar should be visible and active', () => {
    cy.get('#searchbox_input').should('be.visible')
  })

  it('search button should be disabled if nothing is entered', () => {
    cy.get('button[type="submit"]').should('be.visible').and('be.disabled')
  })

  it('search button should be enabled if something is entered', () => {
    cy.get('#searchbox_input').type('something')
    cy.get('button[type="submit"]').should('be.visible').and('be.enabled')
  })
})

describe('Go to Settings and change Appearance to themes', () => {
  it('goto settings page', () => {
    cy.visit('https://duckduckgo.com/settings')
  })

  it('goto Appearance tab', () => {
    cy.get('[data-tabid="appearance"]').click()
    cy.contains('All Settings').should('be.visible')

    cy.url().should('include', '/settings#appearance')
  })

  it('change themes and validate', () => {
    const allThemes = {
      Default: 'rgb(255, 255, 255)',
      Basic: 'rgb(255, 255, 255)',
      Contrast: 'rgb(255, 255, 255)',
      Dark: 'rgb(28, 28, 28)',
      Gray: 'rgb(255, 255, 255)',
      Terminal: 'rgb(34, 34, 34)'
    }

    //iterate thru object themes
    for (const [key, value] of Object.entries(allThemes)) {
      cy.get('.set-themes__wrapper').contains(key).click({ force: true })
      cy.get('.notification__text').should('be.visible').and('contain.text', 'Settings updated')

      cy.wait(2000) // wait for the notification__text to disappear and the background color to update
      /* 
        TODO: improvement: Instead of hard waiting 2000ms, which slows down the tests, we can look into the dev-code and find out
        after how many milliseconds the notification is set to disappear and reduce our wait time accordingly eg. (n + 100ms) 
      */
      cy.get('.notification__text').should('not.be.visible')

      // Verify if the background color has been updated
      cy.get('body').should('have.css', 'background-color', value)

      //TODO: improvements - check if the updated theme has a enabled check-box checked
    }
  })
})
