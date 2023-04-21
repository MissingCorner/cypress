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

  it('should login', () => {
    cy.get('[class="mantine-Text-root mantine-1aw9h4g"]').should(
      'contain',
      'Admin Application'
    );
  });
});
