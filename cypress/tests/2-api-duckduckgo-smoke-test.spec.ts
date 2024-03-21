// smoke test for the duckduckgo query API
const queryFor = 'Cats'

const requestConfig = {
  method: 'GET',
  url: 'https://api.duckduckgo.com/',
  qs: {
    format: 'json'
  },
  failOnStatusCode: false
}

describe('DuckDuckGo Query API Smoke Test', () => {
  // happy path
  it('should return search results for a valid query', () => {
    requestConfig.qs.q = queryFor

    cy.request(requestConfig).then(response => {
      expect(response.status).to.eq(200)

      //convert response body to json
      response.body = JSON.parse(response.body)

      expect(response.body).to.not.be.empty
      expect(response.body.Heading).to.eq(queryFor)
      expect(response.body.AbstractURL).to.not.be.empty
      expect(response.body.AbstractSource).to.eq('Wikipedia')
      expect(response.body.RelatedTopics).to.be.an('array')
      expect(response.body.RelatedTopics).to.have.length.above(0)
    })
  })

  // negative test - unhappy path
  it('should return no results for an invalid query', () => {
    requestConfig.qs.q = 'invalid_query'

    cy.request(requestConfig).then(response => {
      expect(response.status).to.eq(200)

      response.body = JSON.parse(response.body)

      expect(response.body).to.not.be.empty
      expect(response.body.Heading).to.eq('')
      expect(response.body.AbstractSource).to.eq('')
      expect(response.body.AbstractText).to.eq('')
      expect(response.body.AbstractURL).to.eq('')
      expect(response.body.Heading).to.eq('')
      expect(response.body.AbstractSource).to.eq('')
      expect(response.body.RelatedTopics).to.be.an('array')
      expect(response.body.RelatedTopics).to.have.length(0)
    })
  })
})
