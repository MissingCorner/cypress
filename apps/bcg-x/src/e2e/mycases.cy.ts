import dimensions from '../fixtures/dimensions';
import { loadCredential } from '../support/app.po';

describe('Home Page', () => {
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

});

describe('Responsive', () => {
  Object.values(dimensions).map((d) => {
    it('Scrolling', () => {
      cy.viewport(d.viewportWidth, d.viewportHeight);
      cy.visit('/');
      cy.intercept('https://logon.okta.com/idp/idx/challenge/answer').as(
        'login'
      );
      loadCredential();
      cy.wait('@login', { timeout: 15000 }).then(() => {
        cy.scrollTo('bottom', { duration: 5000 });
        cy.scrollTo('top', { duration: 5000 });
      });
    });
  });
});
