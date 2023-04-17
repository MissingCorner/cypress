export const loadCredential = () => {
  cy.get('#username').type(Cypress.env('username'));
  cy.get('#password').type(Cypress.env('password'));
  cy.get('[value="Sign In"]').click();
};
