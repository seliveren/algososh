describe('queue page works correctly', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000/queue');
  });

  it('button should be disabled if input is empty and active if it is not', function () {

    cy.get('[class^=input_]').first().as('input');
    cy.get('@input').should('have.value', '');
    cy.get('[id=addButton]').as('button');
    cy.get('@button').should('have.disabled', true);

    cy.get('@input').type('5');
    cy.get('@button').should('not.have.disabled', true);

    cy.get('@input').type('{backspace}');
    cy.get('@button').should('have.disabled', true);

  });

  it('if clear button is pressed the length of the queue is 0', function () {

    cy.get('[class^=input_]').first().as('input');
    cy.get('[id=addButton]').as('addButton');
    cy.get('[id=clearButton]').as('clearButton');

    cy.get('@input').type('5');
    cy.get('@addButton').click();

    cy.get('@input').type('6');
    cy.get('@addButton').click();

    cy.get('@input').type('1');
    cy.get('@addButton').click();

    cy.get('@clearButton').click();

    cy.get('[class*=circle_circle]').first().as('firstCircle');
    cy.get('[class*=circle_circle]').eq(1).as('secondCircle');
    cy.get('[class*=circle_circle]').eq(2).as('thirdCircle');
    cy.get('[class*=circle_circle]').eq(3).as('forthCircle');
    cy.get('[class*=circle_circle]').eq(4).as('fifthCircle');
    cy.get('[class*=circle_circle]').eq(5).as('sixthCircle');
    cy.get('[class*=circle_circle]').eq(6).as('seventhCircle');

    cy.get('@firstCircle').should('have.text', '');
    cy.get('@secondCircle').should('have.text', '');
    cy.get('@thirdCircle').should('have.text', '');
    cy.get('@forthCircle').should('have.text', '');
    cy.get('@fifthCircle').should('have.text', '');
    cy.get('@sixthCircle').should('have.text', '');
    cy.get('@seventhCircle').should('have.text', '');

  });


  it('elements are added and deleted correctly', function () {

    cy.get('[class^=input_]').first().as('input');
    cy.get('[id=addButton]').as('addButton');
    cy.get('[id=deleteButton]').as('deleteButton');

    cy.get('@input').type('5');
    cy.get('@addButton').click();

    cy.get('[class*=circle_content]').first().as('firstCircleContent');
    cy.get('[class*=circle_circle]').first().as('firstCircle');

    cy.get('@firstCircle').should('have.css', 'border', '4px solid rgb(210, 82, 225)');
    cy.get('@firstCircle').should('have.css', 'border', '4px solid rgb(0, 50, 255)');
    cy.get('@firstCircleContent').children().contains('head');
    cy.get('@firstCircleContent').children().contains('tail')

    cy.get('@input').type('7');
    cy.get('@addButton').click();

    cy.get('[class*=circle_content]').eq(1).as('secondCircleContent');
    cy.get('[class*=circle_circle]').eq(1).as('secondCircle');

    cy.get('@secondCircle').should('have.css', 'border', '4px solid rgb(210, 82, 225)');
    cy.get('@secondCircle').should('have.css', 'border', '4px solid rgb(0, 50, 255)');
    cy.get('@firstCircleContent').children().contains('head');
    cy.get('@secondCircleContent').children().contains('tail')

    cy.get('@deleteButton').click();

    cy.get('@firstCircle').should('have.text', '');
    cy.get('@secondCircle').should('have.css', 'border', '4px solid rgb(210, 82, 225)');
    cy.get('@secondCircle').should('have.css', 'border', '4px solid rgb(0, 50, 255)');
    cy.get('@secondCircleContent').children().contains('head');
    cy.get('@secondCircleContent').children().contains('tail')

  });
});