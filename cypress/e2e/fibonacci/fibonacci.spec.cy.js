import {buttonSelector, circleSelector, inputSelector} from "../constants/selectors";


describe('string page works correctly', function () {
  beforeEach(function () {
    cy.visit('fibonacci');
  });

  it('button should be disabled if input is empty and active if it is not', function () {

    cy.get(inputSelector).first().as('input');
    cy.get('@input').should('have.value', '');
    cy.get(buttonSelector).as('button');
    cy.get('@button').should('have.disabled', true);

    cy.get('@input').type('5');
    cy.get('@button').should('not.have.disabled', true);

    cy.get('@input').type('{backspace}');
    cy.get('@button').should('have.disabled', true);

  });

  it('fibonacci sequence is correct', function () {

    cy.get(inputSelector).first().as('input');
    cy.get(buttonSelector).as('button');

    cy.get('@input').type('5');
    cy.get('@button').click();

    cy.get(circleSelector).first().as('firstCircle');
    cy.get('@firstCircle', {timeout: 500}).should('have.text', '1').and('have.css', 'border', '4px solid rgb(0, 50, 255)');

    cy.wait(500);

    cy.get(circleSelector).eq(1).as('secondCircle');
    cy.get('@secondCircle').should('have.text', '1').and('have.css', 'border', '4px solid rgb(0, 50, 255)');

    cy.wait(500);

    cy.get(circleSelector).eq(2).as('thirdCircle');
    cy.get('@thirdCircle').should('have.text', '2').and('have.css', 'border', '4px solid rgb(0, 50, 255)');

    cy.wait(500);

    cy.get(circleSelector).eq(3).as('forthCircle');
    cy.get('@forthCircle').should('have.text', '3').and('have.css', 'border', '4px solid rgb(0, 50, 255)');

    cy.wait(500);

    cy.get(circleSelector).eq(4).as('fifthCircle');
    cy.get('@fifthCircle').should('have.text', '5').and('have.css', 'border', '4px solid rgb(0, 50, 255)');

    cy.wait(500);

    cy.get(circleSelector).eq(5).as('sixthCircle');
    cy.get('@sixthCircle').should('have.text', '8').and('have.css', 'border', '4px solid rgb(0, 50, 255)');

  });
});