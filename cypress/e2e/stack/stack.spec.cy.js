import {
  addButtonSelector,
  circleSelector,
  clearButtonSelector,
  contentCircleSelector,
  deleteButtonSelector,
  inputSelector
} from "../constants/selectors";


describe('stack page works correctly', function () {
  beforeEach(function () {
    cy.visit('stack');
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

  it('if clear button is pressed the length of the stack is 0', function () {

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

    cy.get('[class*=resultContainer]').first().as('result');
    cy.get('@result').should('be.empty');

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
    cy.get('@firstCircleContent').children().contains('top');

    cy.get('@input').type('7');
    cy.get('@addButton').click();

    cy.get(contentCircleSelector).eq(1).as('secondCircleContent');
    cy.get(circleSelector).eq(1).as('secondCircle');

    cy.get('@secondCircle').should('have.css', 'border', '4px solid rgb(210, 82, 225)');
    cy.get('@secondCircle').should('have.css', 'border', '4px solid rgb(0, 50, 255)');
    cy.get('@secondCircleContent').children().contains('top');

    cy.get('@deleteButton').click();

    cy.get('@secondCircle').should('have.css', 'border', '4px solid rgb(210, 82, 225)');
    cy.get('@secondCircle').should('not.exist');
    cy.get('@firstCircleContent').children().contains('top');
    cy.get('@firstCircle').should('have.text', '5');

  });
});