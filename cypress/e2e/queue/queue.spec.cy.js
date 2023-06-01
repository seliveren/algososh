import {
  addButtonSelector,
  circleSelector,
  clearButtonSelector,
  contentCircleSelector,
  deleteButtonSelector,
  inputSelector
} from "../constants/selectors";


describe('queue page works correctly', function () {
  beforeEach(function () {
    cy.visit('queue');
  });

  it('button should be disabled if input is empty and active if it is not', function () {

    cy.get(inputSelector).first().as('input');
    cy.get('@input').should('have.value', '');
    cy.get(addButtonSelector).as('button');
    cy.get('@button').should('have.disabled', true);

    cy.get('@input').type('5');
    cy.get('@button').should('not.have.disabled', true);

    cy.get('@input').type('{backspace}');
    cy.get('@button').should('have.disabled', true);

  });

  it('if clear button is pressed the length of the queue is 0', function () {

    cy.get(inputSelector).first().as('input');
    cy.get(addButtonSelector).as('addButton');
    cy.get(clearButtonSelector).as('clearButton');

    cy.get('@input').type('5');
    cy.get('@addButton').click();

    cy.get('@input').type('6');
    cy.get('@addButton').click();

    cy.get('@input').type('1');
    cy.get('@addButton').click();

    cy.get('@clearButton').click();

    cy.get(circleSelector).first().as('firstCircle');
    cy.get(circleSelector).eq(1).as('secondCircle');
    cy.get(circleSelector).eq(2).as('thirdCircle');
    cy.get(circleSelector).eq(3).as('forthCircle');
    cy.get(circleSelector).eq(4).as('fifthCircle');
    cy.get(circleSelector).eq(5).as('sixthCircle');
    cy.get(circleSelector).eq(6).as('seventhCircle');

    cy.get('@firstCircle').should('have.text', '');
    cy.get('@secondCircle').should('have.text', '');
    cy.get('@thirdCircle').should('have.text', '');
    cy.get('@forthCircle').should('have.text', '');
    cy.get('@fifthCircle').should('have.text', '');
    cy.get('@sixthCircle').should('have.text', '');
    cy.get('@seventhCircle').should('have.text', '');

  });


  it('elements are added and deleted correctly', function () {

    cy.get(inputSelector).first().as('input');
    cy.get(addButtonSelector).as('addButton');
    cy.get(deleteButtonSelector).as('deleteButton');

    cy.get('@input').type('5');
    cy.get('@addButton').click();

    cy.get(contentCircleSelector).first().as('firstCircleContent');
    cy.get(circleSelector).first().as('firstCircle');

    cy.get('@firstCircle').should('have.css', 'border', '4px solid rgb(210, 82, 225)');
    cy.get('@firstCircle').should('have.css', 'border', '4px solid rgb(0, 50, 255)');
    cy.get('@firstCircleContent').children().contains('head');
    cy.get('@firstCircleContent').children().contains('tail')

    cy.get('@input').type('7');
    cy.get('@addButton').click();

    cy.get(contentCircleSelector).eq(1).as('secondCircleContent');
    cy.get(circleSelector).eq(1).as('secondCircle');

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