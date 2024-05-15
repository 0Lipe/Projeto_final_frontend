
describe('Login page', () => {
  it('Login', () => {
    cy.visit('https://projeto-final-frontend-ddom.vercel.app/login')
    cy.get('input[name="username"]').type('Test')
    cy.get('input[name="password"]').type('Test')
    cy.get('input[type="submit"]').click()
    cy.on('window:alert',(conteudo) => {
      expect(conteudo).contain('Obrigado pela candidatura!')
    })
  })
})