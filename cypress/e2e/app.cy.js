describe("Cortico Conversation App", () => {
  beforeEach(() => {
    // Intercept the conversation data API call and return our fixture
    cy.intercept("GET", "/data/conversation.json", {
      fixture: "conversation.json",
    }).as("getConversation");
    cy.visit("/");
    cy.wait("@getConversation");
  });

  describe("Page Load and Basic Content", () => {
    it("should load the page and display the main heading", () => {
      cy.get("h1").should("contain", "Conversation at the MIT Media Lab");
    });

    it("should display conversation metadata", () => {
      cy.contains("Date/Time").should("be.visible");
      cy.contains("Location").should("be.visible");
      cy.contains("Coordinates").should("be.visible");
      cy.contains("Kendall Square").should("be.visible");
      cy.contains("-71.09, 42.36").should("be.visible");
    });

    it("should display the transcript section", () => {
      cy.contains("h2", "Transcript").should("be.visible");
    });

    it("should display speaker stats section", () => {
      cy.contains("h2", "Speaker Stats").should("be.visible");
      cy.contains("How many words each speaker said").should("be.visible");
      cy.contains("How long each speaker spoke").should("be.visible");
    });
  });

  describe("Audio Player", () => {
    it("should display the audio player", () => {
      cy.get("audio").should("exist");
    });

    it("should have play/pause button", () => {
      cy.get("button").contains("Play").should("be.visible");
    });

    it("should have volume controls", () => {
      cy.get("button").contains("Mute").should("be.visible");
      cy.get("button").contains("Volume").should("be.visible");
    });

    it("should have progress bar", () => {
      cy.get('input[type="range"]').should("exist");
    });

    it("should have download button", () => {
      cy.get("a").contains("Download audio file").should("be.visible");
    });
  });

  describe("Transcript Display", () => {
    it("should display conversation snippets", () => {
      cy.contains(
        "Welcome to this conversation of the Local Voices Network."
      ).should("be.visible");
      cy.contains("Thank you for having us here today.").should("be.visible");
      cy.contains(
        "I'm really excited to share my thoughts about Boston."
      ).should("be.visible");
    });

    it("should display speaker names", () => {
      cy.contains("Moderator").should("be.visible");
      cy.contains("Sarah").should("be.visible");
      cy.contains("Mike").should("be.visible");
    });

    it("should display timestamps", () => {
      cy.contains("0:00:02").should("be.visible"); // 1.68 seconds formatted
      cy.contains("0:00:33").should("be.visible"); // 32.79 seconds formatted
      cy.contains("0:00:45").should("be.visible"); // 45.23 seconds formatted
    });

    it("should have colored speaker indicators", () => {
      // Check that speaker sections have border-left styling
      cy.get('[class*="border-l-4"]').should("exist");
    });
  });

  describe("Speaker Filtering", () => {
    it("should display speaker filter dropdown", () => {
      cy.contains("To view only the snippets of a specific participant").should(
        "be.visible"
      );
      cy.get("select").should("exist");
    });

    it("should show all speakers in dropdown", () => {
      cy.get("select").find("option").should("have.length.at.least", 3);
      cy.get("select").should("contain", "Moderator");
      cy.get("select").should("contain", "Sarah");
      cy.get("select").should("contain", "Mike");
    });

    it("should filter transcript by speaker when selected", () => {
      // Select Moderator
      cy.get("select").select("Moderator");

      // Should only show Moderator's snippets
      cy.contains(
        "Welcome to this conversation of the Local Voices Network."
      ).should("be.visible");
      cy.contains("Thank you for having us here today.").should("not.exist");
      cy.contains(
        "I'm really excited to share my thoughts about Boston."
      ).should("not.exist");
    });

    it('should show all snippets when "All" is selected', () => {
      // First filter by a speaker
      cy.get("select").select("Sarah");
      cy.contains("Thank you for having us here today.").should("be.visible");
      cy.contains("Welcome to this conversation").should("not.exist");

      // Then select "All" (empty value)
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

  describe("Speaker Statistics", () => {
    it("should display word count statistics", () => {
      cy.contains("How many words each speaker said").should("be.visible");
      // The exact numbers would depend on the actual data, but we can check the structure
      cy.get('[class*="flex justify-between"]').should("exist");
    });

    it("should display duration statistics", () => {
      cy.contains("How long each speaker spoke").should("be.visible");
    });
  });

  describe("Responsive Design", () => {
    it("should be responsive on different screen sizes", () => {
      // Test mobile view
      cy.viewport(375, 667);
      cy.get("body").should("be.visible");

      // Test tablet view
      cy.viewport(768, 1024);
      cy.get("body").should("be.visible");

      // Test desktop view
      cy.viewport(1280, 720);
      cy.get("body").should("be.visible");
    });
  });

  describe("Error Handling", () => {
    it("should handle API errors gracefully", () => {
      // Intercept with an error
      cy.intercept("GET", "/data/conversation.json", { statusCode: 500 }).as(
        "getConversationError"
      );
      cy.visit("/");
      cy.wait("@getConversationError");

      // Should show error message
      cy.contains("Error:").should("be.visible");
    });

    it("should show loading state", () => {
      // Intercept with a delay to test loading state
      cy.intercept("GET", "/data/conversation.json", {
        fixture: "conversation.json",
        delay: 1000,
      }).as("getConversationDelayed");
      cy.visit("/");

      // Should show loading message briefly
      cy.contains("Loading conversation data...").should("be.visible");
    });
  });
});
