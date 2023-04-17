export const loadCredential = () => {
  cy.get('#idp-discovery-username').type(Cypress.env('username'));
  cy.get('#idp-discovery-submit').click();

  cy.get('#input29').type(Cypress.env('password'));
  cy.get('[value="Verify"]').click();
};
