describe('linked list page works correctly', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000/list');
  });

  it('buttons should be disabled if input is empty and active if it is not', function () {

    cy.get('[class^=input_]').first().as('inputValue');
    cy.get('@inputValue').should('have.value', '');

    cy.get('[class^=input_]').eq(2).as('inputIndex');
    cy.get('@inputIndex').should('have.value', '');

    cy.get('[id=addByIndex]').as('addByIndexButton');
    cy.get('[id=deleteByIndex]').as('deleteByIndexButton');
    cy.get('[id=addHead]').as('addHeadButton');
    cy.get('[id=addTail]').as('addTailButton');
    cy.get('@addByIndexButton').should('have.disabled', true);
    cy.get('@deleteByIndexButton').should('have.disabled', true);
    cy.get('@addHeadButton').should('have.disabled', true);
    cy.get('@addTailButton').should('have.disabled', true);

    cy.get('@inputValue').type('5');
    cy.get('@addByIndexButton').should('have.disabled', true);
    cy.get('@deleteByIndexButton').should('have.disabled', true);
    cy.get('@addHeadButton').should('not.have.disabled', true);
    cy.get('@addTailButton').should('not.have.disabled', true);

    cy.get('@inputIndex').type('1');
    cy.get('@addByIndexButton').should('not.have.disabled', true);
    cy.get('@deleteByIndexButton').should('not.have.disabled', true);
    cy.get('@addHeadButton').should('not.have.disabled', true);
    cy.get('@addTailButton').should('not.have.disabled', true);

    cy.get('@inputValue').type('{backspace}');
    cy.get('@addByIndexButton').should('have.disabled', true);
    cy.get('@deleteByIndexButton').should('not.have.disabled', true);
    cy.get('@addHeadButton').should('have.disabled', true);
    cy.get('@addTailButton').should('have.disabled', true);

    cy.get('@inputIndex').type('{backspace}');
    cy.get('@addByIndexButton').should('have.disabled', true);
    cy.get('@deleteByIndexButton').should('have.disabled', true);
    cy.get('@addHeadButton').should('have.disabled', true);
    cy.get('@addTailButton').should('have.disabled', true);

  });

  it('default list is present and is correct', function () {

    cy.get('[class*=circle_circle]').first().as('firstCircle');
    cy.get('[class*=circle_circle]').eq(1).as('secondCircle');
    cy.get('[class*=circle_circle]').eq(2).as('thirdCircle');
    cy.get('[class*=circle_circle]').eq(3).as('forthCircle');

    cy.get('@firstCircle').should('have.text', '0');
    cy.get('@secondCircle').should('have.text', '34');
    cy.get('@thirdCircle').should('have.text', '8');
    cy.get('@forthCircle').should('have.text', '1');

  });

  it('elements are added and deleted correctly', function () {

    cy.get('[class^=input_]').first().as('inputValue');
    cy.get('[class^=input_]').eq(2).as('inputIndex');

    cy.get('[id=addByIndex]').as('addByIndexButton');
    cy.get('[id=deleteByIndex]').as('deleteByIndexButton');
    cy.get('[id=addHead]').as('addHeadButton');
    cy.get('[id=addTail]').as('addTailButton');
    cy.get('[id=deleteHead]').as('deleteHeadButton');
    cy.get('[id=deleteTail]').as('deleteTailButton');
    cy.get('[class*=circle_circle]').first().as('firstCircle');
    cy.get('[class*=circle_circle]').eq(1).as('secondCircle');
    cy.get('[class*=circle_content]').first().as('firstCircleContent');

    cy.get('@firstCircle').should('have.text', '0');
    cy.get('@secondCircle').should('have.text', '34');

    //add to head
    cy.get('@inputValue').type('5');

    cy.get('@addHeadButton').click();

    cy.get('[class*=circle_changing]').as('smallCircle');
    cy.get('@firstCircleContent').children().contains('5');

    cy.get('@firstCircle').should('have.text', '5').and('have.css', 'border', '4px solid rgb(127, 224, 81)');
    cy.get('@firstCircleContent').children().contains('head');
    cy.get('@secondCircle').should('have.text', '0');
    cy.get('@firstCircle').should('have.css', 'border', '4px solid rgb(0, 50, 255)');

    //delete from head
    cy.get('@deleteHeadButton').click();

    cy.get('@firstCircleContent').children().contains('5');
    cy.get('[class*=circle_changing]').as('smallCircle');
    cy.get('@firstCircle').should('have.text', '');

    cy.get('@firstCircle').should('have.text', '0');
    cy.get('@firstCircleContent').children().contains('head');

    cy.wait(1000)

    //add to tail
    cy.get('@inputValue').type('5');

    cy.get('@addTailButton').click();

    cy.get('[class*=circle_circle]').eq(3).as('fourthCircle');
    cy.get('[class*=circle_content]').eq(3).as('fourthCircleContent');
    cy.get('[class*=circle_circle]').eq(4).as('fifthCircle');
    cy.get('[class*=circle_content]').eq(4).as('fifthCircleContent');

    cy.get('[class*=circle_changing]').as('smallCircle');
    cy.get('@fourthCircleContent').children().contains('5');

    cy.get('@fifthCircle').should('have.text', '5').and('have.css', 'border', '4px solid rgb(127, 224, 81)');
    cy.get('@fifthCircleContent').children().contains('tail');
    cy.get('@fourthCircle').should('have.text', '1');
    cy.get('@fifthCircle').should('have.css', 'border', '4px solid rgb(0, 50, 255)');

    cy.wait(1000)

    //delete from tail
    cy.get('@deleteTailButton').click();

    cy.get('@fifthCircleContent').children().contains('5');
    cy.get('[class*=circle_changing]').as('smallCircle');
    cy.get('@fifthCircle').should('have.text', '');

    cy.get('@fourthCircle').should('have.text', '1');
    cy.get('@fifthCircle').should('not.exist');
    cy.get('@fourthCircleContent').children().contains('tail');

    cy.wait(1000)

    //add by index
    cy.get('@inputValue').type('5');
    cy.get('@inputIndex').type('1');
    cy.get('[class*=circle_content]').eq(1).as('secondCircleContent');
    cy.get('[class*=circle_circle]').eq(2).as('thirdCircle');
    cy.get('[class*=circle_content]').eq(2).as('thirdCircleContent');
    cy.get('[class*=circle_circle]').eq(3).as('fourthCircle');
    cy.get('[class*=circle_content]').eq(3).as('fourthCircleContent');

    cy.get('@addByIndexButton').click();

    cy.get('@secondCircleContent').children().contains('5');
    cy.get('@secondCircle').should('have.css', 'border', '4px solid rgb(210, 82, 225)');
    cy.get('[class*=circle_changing]').as('smallCircle');
    cy.get('@firstCircle').should('have.css', 'border', '4px solid rgb(210, 82, 225)');

    cy.get('@firstCircle').should('have.css', 'border', '4px solid rgb(210, 82, 225)');
    cy.get('@thirdCircleContent').children().contains('5');
    cy.get('[class*=circle_changing]').as('smallCircle');
    cy.get('@secondCircle').should('have.css', 'border', '4px solid rgb(210, 82, 225)');
    cy.get('@thirdCircle').should('have.css', 'border', '4px solid rgb(210, 82, 225)');

    cy.get('@secondCircle').should('have.css', 'border', '4px solid rgb(127, 224, 81)');
    cy.get('@secondCircle').should('have.text', '5');
    cy.get('@secondCircle').should('have.css', 'border', '4px solid rgb(0, 50, 255)');

    cy.wait(1000)

    //delete by index
    cy.get('@inputIndex').type('1');

    cy.get('@deleteByIndexButton').click();

    cy.get('@firstCircle').should('have.css', 'border', '4px solid rgb(210, 82, 225)');

    cy.get('@secondCircle').should('have.text', '5');
    cy.get('@secondCircle').should('have.css', 'border', '4px solid rgb(210, 82, 225)');
    cy.get('@secondCircleContent').children().contains('5');
    cy.get('@secondCircle').should('have.text', '');
    cy.get('@thirdCircle').should('have.css', 'border', '4px solid rgb(210, 82, 225)');

    cy.get('@secondCircle').should('have.text', '34');
    cy.get('@secondCircle').should('have.css', 'border', '4px solid rgb(0, 50, 255)');

  });

});