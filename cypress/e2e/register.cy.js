
describe('register page', () => {
  it('register', () => {
    cy.visit('https://projeto-final-frontend-ddom.vercel.app/register')
    cy.get('input[id="username"]').type('Test')
    cy.get('input[id="password"]').type('Test')
    cy.get('input[id="email"]').type('Test@mail.com')
    cy.get('input[type="submit"]').click()

    cy.on('window:alert',(conteudo) => {
      expect(conteudo).contain('Obrigado pela candidatura!')
    })
  })
})