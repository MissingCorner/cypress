import { loadCredential } from '../support/app.po';

describe('Catalog', () => {
  beforeEach(() => {
    cy.request('/').should((res) => {
      expect(res.status).to.eq(200);
      expect(res).to.have.property('headers');
      expect(res).to.have.property('duration');
    });
    cy.visit('/');
    cy.intercept('https://logon.okta.com/idp/idx/challenge/answer').as('login');
    loadCredential();
    //check redirect
    cy.url().should('contain', 'okta.com');
    cy.wait('@login', { timeout: 15000 }).end();
  });

  it('', () => {
    cy.get('[href="/portal/catalog"]')
      .click()
      .then(() => cy.get('h1').should('contain', 'Catalog'));

    cy.get('input[placeholder="Search"]').type('a');

    cy.get('[class="mantine-1ge2278"]').then((buttons) => {
      cy.wrap(buttons).eq(1).click();
      cy.wrap(buttons).eq(2).click();
      cy.wrap(buttons).eq(3).click();
      cy.wrap(buttons).eq(4).click();
      cy.wrap(buttons).eq(5).click();
      cy.wrap(buttons).eq(0).click();
    });
    cy.get('[class="mantine-1vt0v9l"]').then((buttons) => {
      cy.wrap(buttons).eq(0).click();
      cy.wrap(buttons).eq(1).click();
      cy.wrap(buttons).eq(2).click();
      cy.wrap(buttons).eq(3).click();
      cy.wrap(buttons).eq(4).click();
      cy.wrap(buttons).eq(5).click();
      cy.wrap(buttons).eq(6).click();
      cy.wrap(buttons).eq(7).click();
      cy.wrap(buttons).eq(8).click();
      cy.wrap(buttons).eq(9).click();
      cy.wrap(buttons).eq(10).click();
      cy.wrap(buttons).eq(11).click();
    });

    cy.get('[class="mantine-Checkbox-input mantine-rxnhd4"]').then(
      (checkboxes) => {
        cy.wrap(checkboxes).eq(0).check();
        cy.wrap(checkboxes).eq(1).check();
        cy.wrap(checkboxes).eq(2).check();
        cy.contains('span', ' + 14 more').click();

        cy.wrap(checkboxes).eq(17).check();
        cy.wrap(checkboxes).eq(18).check();
        cy.wrap(checkboxes).eq(19).check();
        cy.contains('span', ' + 29 more').click();
      }
    );

    cy.get('input#mantine-rf').focus().type('Vietnam').type('{enter}');
    //   .trigger('keydown', { key: 'Enter' });
  });
});
