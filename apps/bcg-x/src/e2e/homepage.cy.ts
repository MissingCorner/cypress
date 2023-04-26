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

  it('side bar', () => {
    cy.get('[href="/portal/cases"]')
      .click()
      .then(() => cy.get('h1').should('contain', 'My Cases'));
    cy.get('[href="/portal/resources"]')
      .click()
      .then(() => cy.get('h1').should('contain', 'Resources'));
    cy.get('[href="/portal/catalog"]')
      .click()
      .then(() => cy.get('h1').should('contain', 'Catalog'));
    cy.get('[href="/"]')
      .click()
      .then(() => {
        cy.get('h1').should(
          'contain',
          'BCG X Portal is a command center for case operations, tooling, and digital asset management'
        );
      });
    // cy.get('[href="/portal"]')
    //   .click()
    //   .then(() => {
    //     cy.get('h1').should(
    //       'contain',
    //       'BCG X Portal is a command center for case operations, tooling, and digital asset management'
    //     );
    //   });
    // cy.get('[href="https://bcg.stackenterprise.co/"]')
    //   .invoke('removeAttr', 'target')
    //   .click()
    //   .then(() =>
    //     cy.get('p').should('contain', 'Welcome to Stack Overflow Enterprise')
    //   );

    cy.get('[class="mantine-1avyp1d"]')
      .first()
      .within(() => {
        cy.get(
          '[class="mantine-Paper-root mantine-Dialog-root mantine-5egran"]'
        ).should('not.exist');
      });
    cy.get('[class="mantine-zdsmph"]')
      .first()
      .click()
      .then(() => {
        cy.get('[class="mantine-164wwpr"]')
          .first()
          .within(() => {
            cy.get(
              '[class="mantine-Paper-root mantine-Dialog-root mantine-5egran"]'
            ).should('exist');
            cy.get('[class="mantine-qo1k2 mantine-Button-label"]')
              .first()
              .click();
          });
      });

    cy.get('[class="mantine-1avyp1d"]')
      .eq(1)
      .within(() => {
        cy.get(
          '[class="mantine-Paper-root mantine-Dialog-root mantine-5egran"]'
        ).should('not.exist');
      });
    cy.get('[class="mantine-zdsmph"]')
      .eq(1)
      .click()
      .then(() => {
        cy.get('[class="mantine-164wwpr"]')
          .eq(1)
          .within(() => {
            cy.get(
              '[class="mantine-Paper-root mantine-Dialog-root mantine-5egran"]'
            ).should('exist');
            cy.get('[class="mantine-qo1k2 mantine-Button-label"]')
              .first()
              .click();
          });
      });

    cy.get('[class="mantine-1avyp1d"]')
      .eq(4)
      .click()
      .then(() => cy.get('h1').should('contain', 'Subscriptions & Billings'));

    cy.get('[class="mantine-1avyp1d"]')
      .eq(5)
      .click()
      .then(() =>
        cy.get('[class="mantine-Menu-dropdown mantine-o9nkkk"]').should('exist')
      );
  });

  it('main content', () => {
    cy.contains('span', 'Explore Catalog')
      .click()
      .then(() => cy.get('h1').should('contain', 'Catalog'));
    cy.get('[href="/"]').click();

    cy.contains('span', 'Create a case')
      .click()
      .then(() => cy.get('h1').should('contain', 'Create new case'));
    cy.get('[href="/"]').click();

    cy.contains(
      'div[class="mantine-Text-root mantine-pxsdk"]',
      'Lighthouse Dataset'
    )
      .click()
      .then(() => {
        cy.get('h1').should('contain', 'Catalog');
        cy.url().should(
          'contain',
          '/catalog?orderBy=name&sortOrder=ASC&tags=LIGHTHOUSE'
        );
      });
    cy.get('[href="/"]').click();

    cy.contains(
      'div[class="mantine-Text-root mantine-pxsdk"]',
      'Infrastructure Assets'
    )
      .click()
      .then(() => {
        cy.get('h1').should('contain', 'Catalog');
        cy.url().should('contain', '/catalog?badgeType=infra');
      });
    cy.get('[href="/"]').click();

    cy.contains('div[class="mantine-Text-root mantine-pxsdk"]', 'My Sandbox')
      .click()
      .then(() => {
        cy.get('h1').should('contain', 'My Sandbox');
        cy.url().should('contain', '/portal/cases/sandbox/');
      });
    cy.get('[href="/"]').click();

    cy.contains(
      'div[class="mantine-Text-root mantine-pxsdk"]',
      'My Support Tickets'
    )
      .click()
      .then(() => {
        cy.get('h1').should('contain', 'Account');
        cy.url().should('contain', '/portal/account/support-tickets');
      });
    cy.get('[href="/"]').click();

    cy.get('div[class="mantine-Text-root mantine-pxsdk"]')
      .eq(5)
      .click()
      .then(() => {
        cy.get('div[class="mantine-Text-root mantine-1vzvxsh"]').should(
          'contain',
          'Is this related to a case or a personal request?'
        );
        cy.contains('span', 'Cancel').click();
      });
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
