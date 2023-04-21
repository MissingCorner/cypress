import dimensions from '../fixtures/dimensions';

describe('Authentication Tests', () => {
  beforeEach(() => {
    cy.request('/').should((res) => {
      expect(res.status).to.eq(200);
      expect(res).to.have.property('headers');
      expect(res).to.have.property('duration');
    });
    cy.intercept('/').as('visit');
  });

  it('auth', () => {
    cy.visit('/');
    cy.wait('@visit', { timeout: 5000 }).then(() => {
      cy.url().should('contain', 'https://gamma.okta.com');
    });

    cy.get('#idp-discovery-username')
      .type(Cypress.env('username'))
      .then(() => {
        cy.get('#idp-discovery-username').should(
          'contain.value',
          Cypress.env('username')
        );
      });

    cy.get('a[data-se="needhelp"]')
      .invoke('attr', 'aria-expanded')
      .should('contain', 'false')
      .then(() => {
        cy.get('[id="help-links-container"]')
          .invoke('attr', 'style')
          .should('contain', 'display: none;');
      });
    cy.get('a[data-se="needhelp"]')
      .click()
      .invoke('attr', 'aria-expanded')
      .should('contain', 'true')
      .then(() => {
        cy.get('[id="help-links-container"]')
          .invoke('attr', 'style')
          .should('contain', '');
      });

    cy.get('input[type="checkbox"]').then((button) => {
      cy.wrap(button).check({ force: true }).should('be.checked');
    });

    cy.get('#idp-discovery-submit')
      .click()
      .then(() => {
        cy.url().should('contain', 'https://logon.okta.com');
      });

    cy.get('#input29')
      .type(Cypress.env('password'))
      .then((input) => {
        cy.wrap(input)
          .invoke('prop', 'value')
          .should('contain', Cypress.env('password'));
      });

    cy.get('#input29').invoke('attr', 'type').should('contain', 'password');
    cy.get('[class="eyeicon visibility-16 button-show"]')
      .click()
      .then((button) => {
        cy.get('#input29').invoke('attr', 'type').should('contain', 'text');
        cy.wrap(button)
          .invoke('attr', 'style')
          .should('contain', 'display: none;');
      });

    cy.get('[class="eyeicon visibility-off-16 button-hide"]')
      .click()
      .then((button) => {
        cy.get('#input29').invoke('attr', 'type').should('contain', 'password');
        cy.wrap(button).invoke('attr', 'style').should('contain', '');
      });

    cy.get('a[data-se="cancel"][class="link js-cancel"]')
      .click()
      .then(() => {
        cy.url().should('contain', 'https://bcg-info.com/logout/logout.html');
      });
  });

  describe.skip('UI - Responsive', () => {
    Object.values(dimensions).map((d) => {
      it('Scrolling', () => {
        cy.viewport(d.viewportWidth, d.viewportHeight);
        cy.visit('/');
        cy.wait('@visit', { timeout: 5000 }).then(() => {
          cy.get('#idp-discovery-username').type(Cypress.env('username'), {
            timeout: 5000,
          });
        });
      });
    });
  });
});
