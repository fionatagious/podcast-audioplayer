describe("Speaker Filtering", () => {
  beforeEach(() => {
    cy.intercept("GET", "/data/conversation.json", {
      fixture: "conversation.json",
    }).as("getConversation");
    cy.visit("/");
    cy.wait("@getConversation");
  });

  describe("Speaker Dropdown", () => {
    it("should display the speaker filter dropdown", () => {
      cy.contains("To view only the snippets of a specific participant").should(
        "be.visible"
      );
      cy.get("select").should("exist");
    });

    it("should have all speakers in the dropdown", () => {
      cy.get("select").find("option").should("have.length", 4); // 3 speakers + empty option
      cy.get("select").should("contain", "Moderator");
      cy.get("select").should("contain", "Sarah");
      cy.get("select").should("contain", "Mike");
    });

    it('should have an empty option for all participants ("Select a participant")', () => {
      cy.get("select").find("option").first().should("have.value", "");
    });
  });

  describe("Filtering by Speaker", () => {
    it("should show all snippets when no speaker is selected", () => {
      // Ensure no speaker is selected (empty value)
      cy.get("select").should("have.value", "");

      // Should show all snippets
      cy.contains(
        "Welcome to this conversation of the Local Voices Network."
      ).should("be.visible");
      cy.contains("Thank you for having us here today.").should("be.visible");
      cy.contains(
        "I'm really excited to share my thoughts about Boston."
      ).should("be.visible");
    });

    it("should filter to show only Moderator snippets", () => {
      cy.get("select").select("Moderator");

      // Should only show Moderator's snippet
      cy.contains(
        "Welcome to this conversation of the Local Voices Network."
      ).should("be.visible");

      // Should not show other speakers' snippets
      cy.contains("Thank you for having us here today.").should("not.exist");
      cy.contains(
        "I'm really excited to share my thoughts about Boston."
      ).should("not.exist");
    });

    it("should filter to show only Sarah snippets", () => {
      cy.get("select").select("Sarah");

      // Should only show Sarah's snippet
      cy.contains("Thank you for having us here today.").should("be.visible");

      // Should not show other speakers' snippets
      cy.contains(
        "Welcome to this conversation of the Local Voices Network."
      ).should("not.exist");
      cy.contains(
        "I'm really excited to share my thoughts about Boston."
      ).should("not.exist");
    });

    it("should filter to show only Mike snippets", () => {
      cy.get("select").select("Mike");

      // Should only show Mike's snippet
      cy.contains(
        "I'm really excited to share my thoughts about Boston."
      ).should("be.visible");

      // Should not show other speakers' snippets
      cy.contains(
        "Welcome to this conversation of the Local Voices Network."
      ).should("not.exist");
      cy.contains("Thank you for having us here today.").should("not.exist");
    });
  });

  describe("Filtering Behavior", () => {
    it("should show expected snippets when switching between speakers", () => {
      // Start with Moderator
      cy.get("select").select("Moderator");
      cy.contains(
        "Welcome to this conversation of the Local Voices Network."
      ).should("be.visible");
      cy.contains("Thank you for having us here today.").should("not.exist");

      // Switch to Sarah
      cy.get("select").select("Sarah");
      cy.contains("Thank you for having us here today.").should("be.visible");
      cy.contains(
        "Welcome to this conversation of the Local Voices Network."
      ).should("not.exist");

      // Switch to Mike
      cy.get("select").select("Mike");
      cy.contains(
        "I'm really excited to share my thoughts about Boston."
      ).should("be.visible");
      cy.contains("Thank you for having us here today.").should("not.exist");
    });

    it("should show all snippets when selecting empty option", () => {
      // First filter by a speaker
      cy.get("select").select("Sarah");
      cy.contains("Thank you for having us here today.").should("be.visible");
      cy.contains("Welcome to this conversation").should("not.exist");

      // Then select empty option to show all
      cy.get("select").select("");

      // Should show all snippets again
      cy.contains(
        "Welcome to this conversation of the Local Voices Network."
      ).should("be.visible");
      cy.contains("Thank you for having us here today.").should("be.visible");
      cy.contains(
        "I'm really excited to share my thoughts about Boston."
      ).should("be.visible");
    });
  });

  describe("Speaker Labels", () => {
    it("should display speaker names correctly", () => {
      cy.contains("Moderator").should("be.visible");
      cy.contains("Sarah").should("be.visible");
      cy.contains("Mike").should("be.visible");
    });

    it("should have proper speaker label styling", () => {
      // Check that speaker labels exist in the transcript
      cy.get('[class*="border-l-4"]').should("exist");
    });
  });

  describe("Speaker Statistics", () => {
    it("should display word count statistics for all speakers", () => {
      cy.contains("How many words each speaker said").should("be.visible");

      // Check that statistics are displayed
      cy.get('[class*="flex justify-between"]').should("exist");
    });

    it("should display duration statistics for all speakers", () => {
      cy.contains("How long each speaker spoke").should("be.visible");
    });

    it("should show statistics even when filtered", () => {
      // Filter by a speaker
      cy.get("select").select("Sarah");

      // Statistics should still be visible
      cy.contains("How many words each speaker said").should("be.visible");
      cy.contains("How long each speaker spoke").should("be.visible");
    });
  });

  describe("Filtering UI", () => {
    it("should have proper dropdown styling", () => {
      cy.get("select").should("be.visible");
      cy.get("select").should("not.be.disabled");
    });

    it("should have proper filter instructions", () => {
      cy.contains(
        "To view only the snippets of a specific participant, use this dropdown to filter the conversation by participant:"
      ).should("be.visible");
    });

    it("should have proper filter container styling", () => {
      cy.contains("To view only the snippets of a specific participant")
        .parent()
        .should("have.class", "bg-orange-100");
    });
  });
});
