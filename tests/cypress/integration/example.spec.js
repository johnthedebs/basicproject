const domain = "http://localhost:8080"


context("Basic test example", () => {
  it("Clicks the counter", () => {
    cy.visit(domain)
    cy.get(".counter-state").should("contain", "1")
    cy.get(".counter-state").should("not.contain", "2")
    cy.get("button").click()
    cy.get(".counter-state").should("contain", "2")
    cy.get(".counter-state").should("not.contain", "1")
  })
})
