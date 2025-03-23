describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display login form', () => {
    cy.get('h1').should('contain', 'Login to Pathfinder');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('button[type="submit"]').should('exist');
  });

  it('should navigate to register page', () => {
    cy.contains('Register').click();
    cy.url().should('include', '/register');
  });

  it('should show validation error for empty fields', () => {
    cy.get('button[type="submit"]').click();
    cy.get('input[name="email"]:invalid').should('exist');
    cy.get('input[name="password"]:invalid').should('exist');
  });

  it('should login successfully with valid credentials', () => {
    // Mock localStorage to verify token storage
    cy.window().then((win) => {
      cy.stub(win.localStorage, 'setItem').as('setItemSpy');
    });

    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Since we're using mock authentication in the preview version,
    // we should be redirected to the dashboard
    cy.url().should('include', '/dashboard');
    
    // Verify token was stored in localStorage
    cy.get('@setItemSpy').should('be.calledWith', 'token', Cypress.sinon.match.string);
  });
});