// <reference types='cypress' />


describe("testes gerais cenarios de sucesso", () => {



  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    // cy.visit('http://localhost:4200/login');
  });


  function comentar() {
    cy.visit('http://localhost:4200/accounts/posts')
    cy.wait(10000)
    cy.get('#iddd')
      .click()
    cy.wait(10000)
    cy.get('#textoComentario')
      .type("Escrevi um comentário")
    cy.get('#comentar')
      .click()

  }

  it('teste geral',()=>{
    const nome="Rui"
    const nome2="Alex"
    const password= "password";
    const email= "emailend2end@gmail.com"
    const email2= "emailend2end@hotmail.com"
    const telefone="916963933"
    const telefone2="916963934"
    const pais="Portugal"
    const rua="Rua de Cima"
    const localidade= "Trofa"
    const codigoPostal= "4785-049"
    const perfilFacebook="facebook/rui"
    const perfilLinkedIn="linkedIn/rui"
    const estadoHumor="Joyful"
    const tagsInteresse="gaming,futebol,restaurantes"


    registarPessoa(nome,password,email,telefone,pais,rua,localidade,codigoPostal,perfilFacebook,perfilLinkedIn,estadoHumor,tagsInteresse)
    cy.wait(10000)
    login(email,password)
    cy.wait(10000)
    criarPost()
    cy.wait(10000)
    registarPessoa(nome2,password,email2,telefone2,pais,rua,localidade,codigoPostal,perfilFacebook,perfilLinkedIn,estadoHumor,tagsInteresse)
    cy.wait(10000)
    login(email2,password)
    enviarPedidoLigacao()
    cy.wait(10000)
    login(email,password)
    cy.wait(10000)
    aceitarPedidoLigacao()
    cy.wait(10000)
    login(email2,password)
    cy.wait(10000)
    comentar()
  });

  // it('Creating a New Post', () => {
  //   cy.visit('http://vsgate-http.dei.isep.ipp.pt:10646/dashboard');
  //
  //   cy.location('pathname', { timeout: 10000 })
  //     .should('include', '/dashboard');
  //
  //   cy.get("#styled").type(texto);
  //
  //   cy.get('#post').click();
  //
  //   cy.contains(texto);
  // });



  function aceitarPedidoLigacao() {
    cy.visit("http://localhost:4200/accounts/pedidos")
    cy.wait(10000)
    cy.get('#aceitarPedido')
      .click()
    cy.wait(2000)

  }


  function enviarPedidoLigacao() {
    cy.visit("http://localhost:4200/accounts/jogadoresObjetivo")
    cy.wait(10000)
    cy.get('#botaoPedidoLigacao')
      .click()

  }

  function criarPost() {
  cy.visit('http://localhost:4200/accounts/posts')
    cy.get('#textoPost')
      .type('Criei o meu primeiro post')
    cy.get('#tagsPost')
      .type('arroz,massa,batata')
    cy.get('#criarPost')
      .click()
  }

  function registarPessoa(nome, password, email, telefone,pais, rua, localidade, codigoPostal, perfilFacebook, perfilLinkedIn, estadoHumor, tagsInteresse) {
    cy.visit('http://localhost:4200/register');
    cy.get('#name')
      .type(nome);
    cy.get('#email')
      .type(email);
    cy.get('#dataNascimento')
      .type('2009-12-12')
    cy.get('#telefone')
      .type(telefone);
    cy.get('#pais')
      .type(pais);
    cy.get('#rua')
      .type(rua);
    cy.get('#localidade')
      .type(localidade);
    cy.get('#codigoPostal')
      .type(codigoPostal);
    cy.get('#perfilFacebook')
      .type(perfilFacebook);
    cy.get('#perfilLinkedIn')
      .type(perfilLinkedIn);
    cy.get('#estadoHumor')
      .type(estadoHumor);
    cy.get('#interestTags')
      .type(tagsInteresse);
    cy.get("#terms")
      .click();
    cy.get('#submitRegister')
      .click()

  }

  function login(email, password) {
    cy.visit('http://localhost:4200/login');
    cy.get('#login')
      .type(email);
    cy.get('#password')
      .type(password)
    cy.get('#loginBotao')
      .click()
    cy.wait(2000)
  }

});
