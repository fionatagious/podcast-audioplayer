describe("Audio Player Functionality", () => {
  beforeEach(() => {
    cy.intercept("GET", "/data/conversation.json", {
      fixture: "conversation.json",
    }).as("getConversation");
    cy.visit("/");
    cy.wait("@getConversation");
  });

  describe("Audio Controls", () => {
    it("should play and pause audio", () => {
      // Wait for audioplayer to exist in the DOM
      cy.get("audio").should("exist");

      // Initially should show Play button
      cy.get('button[data-cy="play-pause-button"]').should("contain", "Play");
      cy.get('button[data-cy="play-pause-button"]').should("be.visible");

      // Click play
      cy.get('button[data-cy="play-pause-button"]').click();

      // Should show Pause button after clicking play
      cy.get('button[data-cy="play-pause-button"]').should("contain", "Pause");

      // Click pause
      cy.get('button[data-cy="play-pause-button"]').click();

      // Should show Play button again
      cy.get('button[data-cy="play-pause-button"]').should("contain", "Play");
    });

    it("should mute and unmute audio", () => {
      // Initially should show Mute button
      cy.get('button[data-cy="mute-unmute-button"]').should("contain", "Mute");

      // Click mute
      cy.get('button[data-cy="mute-unmute-button"]').click();

      // Should show Unmute button
      cy.get('button[data-cy="mute-unmute-button"]').should(
        "contain",
        "Unmute"
      );

      // Click unmute
      cy.get('button[data-cy="mute-unmute-button"]').click();

      // Should show Mute button again
      cy.get('button[data-cy="mute-unmute-button"]').should("contain", "Mute");
    });

    it("should show volume slider when volume button is clicked", () => {
      // Click volume button
      cy.get("button").contains("Volume").click();

      // Should show volume slider
      cy.get('input[type="range"]').should("have.length.at.least", 2); // Progress bar + volume slider
    });

    it("should have working progress bar", () => {
      // Progress bar should exist
      cy.get('input[type="range"]').first().should("exist");

      // Should be able to interact with progress bar
      cy.get('input[type="range"]').first().should("be.visible");
    });
  });

  describe("Audio File", () => {
    it("should have audio source", () => {
      cy.get("audio source")
        .should("have.attr", "src")
        .and("include", "conversation.m4a");
    });

    it("should have correct audio type", () => {
      cy.get("audio source").should("have.attr", "type", "audio/mp4");
    });
  });

  describe("Download Functionality", () => {
    it("should have download link", () => {
      cy.get("a").contains("Download audio file").should("be.visible");
    });

    it("should have download attribute", () => {
      cy.get('a[data-cy="download-audio-button"]').should(
        "contain",
        "Download audio file"
      );

      cy.get('a[data-cy="download-audio-button"]').should(
        "have.attr",
        "download"
      );
    });
  });

  describe("Audio Player Layout", () => {
    it("should have proper audio player container", () => {
      cy.get("audio").parent().should("have.class", "flex");
      cy.get("audio").parent().should("have.class", "flex-nowrap");
    });

    it("should have audio controls section", () => {
      cy.get("audio")
        .parent()
        .within(() => {
          cy.get("button").should("exist");
          cy.get('input[type="range"]').should("exist");
        });
    });

    it("should have proper spacing and styling", () => {
      cy.get("audio").parent().should("have.class", "gap-4");
      cy.get("audio").parent().should("have.class", "my-4");
      cy.get("audio").parent().should("have.class", "border-2");
    });
  });
});
