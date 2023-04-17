import { loadCredential } from '../support/app.po';

describe('Project', () => {
  beforeEach(() => {
    //Health check
    cy.request('/').should((res) => {
      expect(res.status).to.eq(200);
      expect(res).to.have.property('headers');
      expect(res).to.have.property('duration');
    });

    cy.visit('/');
    loadCredential();
  });

  it('should display welcome message', () => {
    cy.get('h1').should(
      'contain',
      'BCG X Portal is a command center for case operations, tooling, and digital asset management'
    );
  });
});
