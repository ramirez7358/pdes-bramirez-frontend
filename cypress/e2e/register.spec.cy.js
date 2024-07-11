describe("Register", () => {
    let email;
    const fullname = "John Doe";
    const password = "securepassword";
  
    before(() => {
      // Genera un correo electrónico aleatorio antes de todos los tests
      const randomString = Math.random().toString(36).substring(2, 10); // Genera un componente aleatorio
      email = `john.doe.${randomString}@example.com`;
    });
  
    beforeEach(() => {
      // Visita la página de registro antes de cada test
      cy.visit("http://localhost:5173/register");
    });
  
    it("should fill out the registration form and verify the fullname in the navbar", () => {
      cy.get('input[name="fullname"]').type(fullname);
  
      cy.get('input[name="email"]').type(email);
  
      cy.get('input[name="password"]').type(password);
  
      cy.get("form").submit();
  
      cy.contains(".navbar-container .fullname", fullname).should("be.visible");
    });
  
    it("should fail to register with the same email", () => {
      cy.get('input[name="fullname"]').type(fullname);
  
      cy.get('input[name="email"]').type(email); // Reuse the same email
  
      cy.get('input[name="password"]').type(password);
  
      cy.get("form").submit();
  
      // Verifica que se muestre un mensaje de error, asumiendo que el mensaje de error contiene "Email already in use"
      cy.contains(`Key (email)=(${email}) already exists.`).should("be.visible");
    });
  });
  