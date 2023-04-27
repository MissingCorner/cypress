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
    cy.intercept({method: 'GET', url: "https://nlos.ncore.dev.v2.nuclent.com/v1/apps"}).as('login');
    cy.wait('@login', { timeout: 10000 }).then(() => {

      cy.get('#mantine-r0-target').click({timeout: 5000})
      cy.get('[class="mantine-Text-root mantine-10frjkq"]').eq(1).should('contain', 'nLOS - Originate').click();
    });
  });
  
  it('should new application', () =>{
    cy.get('[class="mantine-3xbgk5 mantine-Button-inner"]').click({timeout:5000});
    cy.get('[class="mantine-Input-input mantine-Select-input mantine-9g3cpg"]').click();
  });
  
});
