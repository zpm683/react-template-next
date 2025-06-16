/**
 * End to end tests for the home page
 */
describe("Home Page", () => {
  beforeEach(() => {
    // Navigate to the home page before each test
    cy.visit("/");

    // Intercept API calls to make tests more reliable
    cy.intercept("GET", "http://localhost:8888/users", {
      fixture: "example.json",
    }).as("getUsers");
  });

  it("should display the welcome message", () => {
    // Test the welcome message is displayed
    cy.contains("Welcome to use react-template-next").should("exist");
  });

  it("should increment counter when clicking ADD button", () => {
    // Get the initial count from the welcome message
    cy.contains(/Welcome to use react-template-next 🎉x(\d+)/).then(($el) => {
      const text = $el.text();
      const match = text.match(/🎉x(\d+)/);

      if (match && match[1]) {
        const initialCount = parseInt(match[1], 10);

        // Click the ADD button
        cy.contains("ADD conut").click();

        // Check if the count has been incremented
        cy.contains(
          `Welcome to use react-template-next 🎉x${initialCount + 1}`,
        ).should("exist");
      }
    });
  });

  it("should display user cards after API response", () => {
    // Wait for the API call to complete
    cy.wait("@getUsers");

    // Make sure skeleton is not displayed
    cy.get(".MuiSkeleton-root").should("not.exist");

    // Check if user cards are displayed
    cy.get(".MuiCard-root").should("exist");
  });

  it("should open a dialog when clicking on a user card", () => {
    // Wait for the API call to complete
    cy.wait("@getUsers");

    // Click on the first user card
    cy.get(".MuiButton-sizeSmall").first().click();

    // Check if the dialog is displayed
    cy.get('[role="dialog"]').should("be.visible");
    cy.contains("ID:").should("exist");
    cy.contains("Name:").should("exist");
  });
});
