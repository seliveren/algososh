describe('string page works correctly', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000/fibonacci');
  });

  it('button should be disabled if input is empty and active if it is not', function () {

    cy.get('[class^=input_]').first().as('input');
    cy.get('@input').should('have.value', '');
    cy.get('[id=button]').as('button');
    cy.get('@button').should('have.disabled', true);

    cy.get('@input').type('5');
    cy.get('@button').should('not.have.disabled', true);

    cy.get('@input').type('{backspace}');
    cy.get('@button').should('have.disabled', true);

  });

  it('fibonacci sequence is correct', function () {

    cy.get('[class^=input_]').first().as('input');
    cy.get('[id=button]').as('button');

    cy.get('@input').type('5');
    cy.get('@button').click();

    cy.get('[class*=circle_circle]').first().as('firstCircle');
    cy.get('@firstCircle', {timeout: 500}).should('have.text', '1').and('have.css', 'border', '4px solid rgb(0, 50, 255)');

    cy.wait(500);

    cy.get('[class*=circle_circle]').eq(1).as('secondCircle');
    cy.get('@secondCircle').should('have.text', '1').and('have.css', 'border', '4px solid rgb(0, 50, 255)');

    cy.wait(500);

    cy.get('[class*=circle_circle]').eq(2).as('thirdCircle');
    cy.get('@thirdCircle').should('have.text', '2').and('have.css', 'border', '4px solid rgb(0, 50, 255)');

    cy.wait(500);

    cy.get('[class*=circle_circle]').eq(3).as('forthCircle');
    cy.get('@forthCircle').should('have.text', '3').and('have.css', 'border', '4px solid rgb(0, 50, 255)');

    cy.wait(500);

    cy.get('[class*=circle_circle]').eq(4).as('fifthCircle');
    cy.get('@fifthCircle').should('have.text', '5').and('have.css', 'border', '4px solid rgb(0, 50, 255)');

    cy.wait(500);

    cy.get('[class*=circle_circle]').eq(5).as('sixthCircle');
    cy.get('@sixthCircle').should('have.text', '8').and('have.css', 'border', '4px solid rgb(0, 50, 255)');

  });
});