describe("Login Page", () => {
  beforeEach(() => {
    // Se ejecuta antes de cada test
    cy.visit("http://localhost:5173");
  });

  it("should display the welcome text", () => {
    // Verifica que el texto "Welcome to APC" esté presente en la página
    cy.contains("h1", "Welcome to APC").should("be.visible");
  });

  it("should navigate to the login form", () => {
    // Verifica que el enlace "Login" esté presente y navega al formulario de login
    cy.contains("Login").click();
    cy.url().should("include", "/");
  });

  it("should navigate to the register form", () => {
    // Verifica que el enlace "Sign up" esté presente y navega al formulario de registro
    cy.contains("Sign up").click();
    cy.url().should("include", "/register");
  });
});
