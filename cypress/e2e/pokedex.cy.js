/// <reference types="Cypress" />

const URL = 'http://127.0.0.1:8080';


before(() => {
 cy.visit(URL);
});


describe('Testear buscador', () => {

    it('Buscar un pokemon no existente', () =>{
        cy.wait(2000);
        cy.get('input').type('asdasd');
        cy.get('#boton-buscar').click();
        cy.get('#error').should('not.have.class', 'oculto');
    });

    it('Buscar un pokemon existente', () =>{

        cy.intercept('https://pokeapi.co/api/v2/pokemon/pikachu', { fixture: 'pikachu' }).as('obtenerPikachu');
        cy.get('input').clear().type('pikachu');
        cy.get('#boton-buscar').click();
        cy.get('#error').should('have.class', 'oculto');
        cy.get('input').should('have.attr', 'disabled');
        cy.get('#tarjeta-pokemon #imagen-pokemon').should('have.attr', 'src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png');
        cy.get('#tarjeta-pokemon #id').contains('Id: 25');
        cy.get('#tarjeta-pokemon #name').contains('Name: pikachu');
        cy.get('#tarjeta-pokemon #height').contains('Height: 0.4 m');
        cy.get('#tarjeta-pokemon #weight').contains('Weight: 6 kg');
        cy.get('#tarjeta-pokemon #tipos').contains('Tipo: electric');
    });

    it('Buscar un pokemon vacio', () =>{
        cy.get('#quit > img').click();
        cy.get('input').clear();
        cy.get('#boton-buscar').click();
        cy.get('#error').should('not.have.class', 'oculto');
    });
});


describe('Testear pokemon', () => {

    it('Hace click en un pokemon', () => {
        cy.intercept('https://pokeapi.co/api/v2/pokemon/charizard', { fixture: 'charizard' }).as('obtenerCharizard');
        cy.get('.charizard').click();
        cy.get('#tarjeta-pokemon #imagen-pokemon').should('have.attr', 'src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png');
        cy.get('#tarjeta-pokemon #id').contains('Id: 6');
        cy.get('#tarjeta-pokemon #name').contains('Name: charizard');
        cy.get('#tarjeta-pokemon #height').contains('Height: 1.7 m');
        cy.get('#tarjeta-pokemon #weight').contains('Weight: 90.5 kg');
        cy.get('#tarjeta-pokemon #tipos').contains('Tipo: fire flying');
        cy.get('input').should('have.attr', 'disabled');
    });
});

describe('Testear paginador', () => {
    
    it('Testea primera pagina', () => {
        cy.get('#boton-1').should('have.attr', 'disabled');
        cy.get('#anterior').should('have.attr', 'disabled');
    });
    
    it('Hace click en una pagina', () =>{
        cy.intercept('https://pokeapi.co/api/v2/pokemon/?offset=180&limit=20', { fixture: 'pagina-10' }).as('obtenerPagina10');
        cy.get('#quit > img').click();
        cy.get('#boton-10').click().should('have.attr', 'disabled');
    });
});