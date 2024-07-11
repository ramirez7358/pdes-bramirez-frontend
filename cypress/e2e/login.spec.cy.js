describe("Login", () => {
  let email;
  const fullname = "John Doe";
  const password = "securepassword";

  before(() => {
    // Genera un correo electrónico aleatorio antes de todos los tests
    const randomString = Math.random().toString(36).substring(2, 10); // Genera un componente aleatorio
    email = `john.doe.${randomString}@example.com`;
  });

  it("should fill out the registration form and verify the fullname in the navbar", () => {
    cy.visit("http://localhost:5173/register");
    cy.get('input[name="fullname"]').type(fullname);

    cy.get('input[name="email"]').type(email);

    cy.get('input[name="password"]').type(password);

    cy.get("form").submit();

    cy.contains(".navbar-container .fullname", fullname).should("be.visible");
  });

  it("should fail to register with the same email", () => {
    cy.visit("http://localhost:5173");

    cy.get('input[name="username"]').type(email);

    cy.get('input[name="password"]').type(password);

    cy.get("form").submit();

    cy.contains(".navbar-container .fullname", fullname).should("be.visible");
  });
});
