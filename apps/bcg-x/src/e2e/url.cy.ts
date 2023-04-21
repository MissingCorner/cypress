import { loadCredential } from '../support/app.po';

describe('Website URl Test', () => {
  beforeEach(() => {
    //Health check
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

  it('should display welcome message', () => {
    cy.get('h1').should(
      'contain',
      'BCG X Portal is a command center for case operations, tooling, and digital asset management'
    );

    //check format URL
    cy.url()
      .should('contain', 'https://')
      .then((url) => {
        expect(url.startsWith('https://')).to.be.true;
        expect(url.includes('bcg.com')).to.be.true;
        expect(url.includes('/portal')).to.be.true;
      });

    //Check prevent XSS attack
    const maliciousInput = '<script>alert("XSS attack!")</script>';
    const spy = cy.spy(window, 'alert');
    cy.visit(
      `https://sbx.x.bcg.com/portal/catalog?fullText=${maliciousInput}`
    ).then(() => {
      expect(spy).to.haveOwnProperty('callCount');
      expect(spy).to.not.be.called;
    });
  });
});
