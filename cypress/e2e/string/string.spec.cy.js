import {buttonSelector, circleSelector, inputSelector} from "../constants/selectors";


describe('string page works correctly', function () {
  beforeEach(function () {
    cy.visit('recursion');
  });

  it('button should be disabled if input is empty and active if it is not', function () {

    cy.get(inputSelector).first().as('input');
    cy.get('@input').should('have.value', '');
    cy.get(buttonSelector).as('button');
    cy.get('@button').should('have.disabled', true);

    cy.get('@input').type('hello');
    cy.get('body').click(50, 50, {force: true})
    cy.get('@button').should('not.have.disabled', true);

    cy.get('@input').type('{backspace}{backspace}{backspace}{backspace}{backspace}');
    cy.get('body').click(50, 50, {force: true})
    cy.get('@button').should('have.disabled', true);

  });

  it('string is indeed reversed and styles are used in the correct way', function () {

    cy.get(inputSelector).first().as('input');
    cy.get(buttonSelector).as('button');

    cy.get('@input').type('hello');
    cy.get('body').click(50, 50, {force: true})
    cy.get('@button').click();

    cy.get(circleSelector).first().as('firstCircle');
    cy.get(circleSelector).eq(1).as('secondCircle');
    cy.get(circleSelector).eq(2).as('thirdCircle');
    cy.get(circleSelector).eq(3).as('forthCircle');
    cy.get(circleSelector).eq(4).as('fifthCircle');

    cy.get('@firstCircle', {timeout: 1000}).should('have.text', 'h').and('have.css', 'border', '4px solid rgb(0, 50, 255)');
    cy.get('@secondCircle', {timeout: 1000}).should('have.text', 'e').and('have.css', 'border', '4px solid rgb(0, 50, 255)');
    cy.get('@thirdCircle', {timeout: 1000}).should('have.text', 'l').and('have.css', 'border', '4px solid rgb(0, 50, 255)');
    cy.get('@forthCircle', {timeout: 1000}).should('have.text', 'l').and('have.css', 'border', '4px solid rgb(0, 50, 255)');
    cy.get('@fifthCircle', {timeout: 1000}).should('have.text', 'o').and('have.css', 'border', '4px solid rgb(0, 50, 255)');

    cy.wait(1000);

    cy.get('@firstCircle').should('have.text', 'o').and('have.css', 'border', '4px solid rgb(210, 82, 225)');
    cy.get('@secondCircle').should('have.text', 'e').and('have.css', 'border', '4px solid rgb(0, 50, 255)');
    cy.get('@thirdCircle').should('have.text', 'l').and('have.css', 'border', '4px solid rgb(0, 50, 255)');
    cy.get('@forthCircle').should('have.text', 'l').and('have.css', 'border', '4px solid rgb(0, 50, 255)');
    cy.get('@fifthCircle').should('have.text', 'h').and('have.css', 'border', '4px solid rgb(210, 82, 225)');

    cy.wait(1000);

    cy.get('@firstCircle').should('have.text', 'o').and('have.css', 'border', '4px solid rgb(127, 224, 81)');
    cy.get('@secondCircle').should('have.text', 'l').and('have.css', 'border', '4px solid rgb(210, 82, 225)');
    cy.get('@thirdCircle').should('have.text', 'l').and('have.css', 'border', '4px solid rgb(0, 50, 255)');
    cy.get('@forthCircle').should('have.text', 'e').and('have.css', 'border', '4px solid rgb(210, 82, 225)');
    cy.get('@fifthCircle').should('have.text', 'h').and('have.css', 'border', '4px solid rgb(127, 224, 81)');

    cy.wait(1000);

    cy.get('@firstCircle').should('have.text', 'o').and('have.css', 'border', '4px solid rgb(127, 224, 81)');
    cy.get('@secondCircle').should('have.text', 'l').and('have.css', 'border', '4px solid rgb(127, 224, 81)');
    cy.get('@thirdCircle').should('have.text', 'l').and('have.css', 'border', '4px solid rgb(210, 82, 225)');
    cy.get('@forthCircle').should('have.text', 'e').and('have.css', 'border', '4px solid rgb(127, 224, 81)');
    cy.get('@fifthCircle').should('have.text', 'h').and('have.css', 'border', '4px solid rgb(127, 224, 81)');

    cy.wait(1000);

    cy.get('@firstCircle').should('have.text', 'o').and('have.css', 'border', '4px solid rgb(127, 224, 81)');
    cy.get('@secondCircle').should('have.text', 'l').and('have.css', 'border', '4px solid rgb(127, 224, 81)');
    cy.get('@thirdCircle').should('have.text', 'l').and('have.css', 'border', '4px solid rgb(127, 224, 81)');
    cy.get('@forthCircle').should('have.text', 'e').and('have.css', 'border', '4px solid rgb(127, 224, 81)');
    cy.get('@fifthCircle').should('have.text', 'h').and('have.css', 'border', '4px solid rgb(127, 224, 81)');

  });
});