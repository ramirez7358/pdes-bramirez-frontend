describe("Product Filter", () => {
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

    cy.get("select").select(6);

    cy.get("select").should("not.have.value", "");

    cy.get(".search-button").should("not.be.disabled");

    cy.get(".search-button").click();

    cy.get(".product-result-container").should("be.visible");

    cy.get(".product-card")
      .first()
      .within(() => {
        cy.contains("button", "Buy").should("be.visible").click();

        cy.contains("button", "Bookmark").should("be.visible").click();
      });

    cy.get(".modal").should("be.visible");

    const comment = "Great product!";

    cy.get('input[placeholder="Rate the product"]').type("5");
    cy.get("textarea").type(comment);

    cy.contains("button", "Add").should("not.be.disabled").click();

    cy.contains("Product has been bookmarked").should("be.visible");

    // Verifica que el modal se haya cerrado
    cy.get(".modal").should("not.exist");

    // Hacer clic en el enlace "Bookmarks" en la barra de navegación
    cy.contains("a", "Bookmarks").click();

    // Verificar que el producto bookmarkeado esté en la lista
    cy.get(".product-table-container").should("be.visible");
    cy.get("#bookmarked-table").should("contain", comment);

    // Eliminar el producto bookmarkeado
    cy.get("#bookmarked-table").within(() => {
      cy.contains("button", "Delete").should("be.visible").click();
    });

    // Verificar que el producto haya sido eliminado
    cy.contains("Bookmark of product").should("be.visible");
  });
});
