chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getHTMLContent") {
    const htmlContent = document.body.innerHTML;

    const apiKey = "AIzaSyBD6OEEzTwcvJB70dc8QlSGf8h3uhx5UR8";
    const geminiPrompt = `
      Please summarize the Terms of Service (TOS) text provided and return the data strictly in the following format. The response should be concise, factual, and highlight serious risks, with no sugar-coating. Mark clauses that pose a significant danger to user privacy or data as "red". Mark those that are concerning but not extreme as "yellow". Only use "green" for clauses with no risks.

      <div class="popup" id="tos-popup">
        <div class="popup-content">
          <button
              class="close-btn"
              id="closePopup"
              onclick="const popup = document.getElementById('tos-popup');
                      popup.style.visibility='hidden'">
            <span>x</span>
          </button>

          <header class="popup-header">
            <img src="https://n-pacis.github.io/dig245-final/assets/img/logo.png" alt="TOS Lens Logo" class="popup-logo">
          </header>

          <p class="summary-description">[Brief Summary: Replace this with a clear, no-nonsense, 1-2 sentence summary of the TOS highlighting major risks.]</p>

          <table class="summary-table">
            <thead>
              <tr>
                <th>Clause</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr class="[severity-class-for-data-collection]">
                <td>Data Collection</td>
                <td>[Description of data collection practices and why they pose a risk]</td>
              </tr>
              <tr class="[severity-class-for-tracking]">
                <td>Tracking</td>
                <td>[Description of tracking practices and their potential dangers]</td>
              </tr>
              <tr class="[severity-class-for-third-party-sharing]">
                <td>Third-Party Sharing</td>
                <td>[Description of third-party sharing practices and the associated risks]</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      Guidelines:
      - Replace [Brief Summary] with a concise, direct summary of the TOS, highlighting any critical risks, such as extensive data collection or surveillance.
      - For each clause:
        - Assign **red** if the clause involves **extensive data collection, tracking, or sharing with third parties** that could significantly compromise user privacy and security.
        - Assign **yellow** if the clause involves **moderate risks**, such as limited data collection or tracking that could still be a concern in terms of privacy but does not pose immediate danger.
        - Assign **green** if the clause poses **no privacy risks** and there is no significant data collection, tracking, or third-party sharing.
      - Ensure that all descriptions are concise and directly point out the implications of each clause.
      - Do not add anything extra; focus strictly on summarizing the TOS in terms of risk.

      ${htmlContent}
    `;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: geminiPrompt,
              },
            ],
          },
        ],
      }),
    };

    fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK.");
        }
        return response.json();
      })
      .then((data) => {
        const geminiResponse =
          data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "No response from Gemini.";

        const cleanedResponse = geminiResponse
          .replace(/```html|```/g, "")
          .trim();

        const addElementIfNotExists = (selector, createElementCallback) => {
          if (!document.querySelector(selector)) {
            createElementCallback();
          }
        };

        addElementIfNotExists(
          'link[rel="preconnect"][href="https://fonts.googleapis.com"]',
          () => {
            const preconnect1 = document.createElement("link");
            preconnect1.rel = "preconnect";
            preconnect1.href = "https://fonts.googleapis.com";
            document.head.appendChild(preconnect1);
          }
        );

        addElementIfNotExists(
          'link[rel="preconnect"][href="https://fonts.gstatic.com"]',
          () => {
            const preconnect2 = document.createElement("link");
            preconnect2.rel = "preconnect";
            preconnect2.href = "https://fonts.gstatic.com";
            preconnect2.crossOrigin = "true";
            document.head.appendChild(preconnect2);
          }
        );

        addElementIfNotExists(
          'link[rel="stylesheet"][href*="fonts.googleapis.com/css2"]',
          () => {
            const fontLink = document.createElement("link");
            fontLink.href =
              "https://fonts.googleapis.com/css2?family=Creepster&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap";
            fontLink.rel = "stylesheet";
            document.head.appendChild(fontLink);
          }
        );

        addElementIfNotExists(
          'link[rel="stylesheet"][href*="assets/css/popup.css"]',
          () => {
            const stylesheetLink = document.createElement("link");
            stylesheetLink.rel = "stylesheet";
            stylesheetLink.href = chrome.runtime.getURL("assets/css/popup.css");
            document.head.appendChild(stylesheetLink);
          }
        );

        const scriptElement = document.createElement("script");
        scriptElement.src = chrome.runtime.getURL("assets/js/main.js");
        document.body.appendChild(scriptElement);

        addElementIfNotExists("#tos-popup", () => {
          document.body.insertAdjacentHTML("beforeend", cleanedResponse);
        });
        sendResponse({
          success: true,
          content: "Fetched TOS summary successfully.",
        });
      })
      .catch((error) => {
        console.error("Error fetching the Gemini API response:", error);
        sendResponse({
          success: false,
          error: "Failed to fetch Gemini API response.",
        });
      });

    return true;
  }
});
