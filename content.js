chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getHTMLContent") {
    const htmlContent = document.body.innerHTML;

    const apiKey = "AIzaSyBqfxJ7NFEyb7oCRthvLaSUiEDmbieMzpY";
    const geminiPrompt = `
          Please summarize the Terms of Service (TOS) text provided and return the data strictly in the following format. Keep the response concise and focused:

          <div class="popup show" id="popup">
              <div class="popup-content">
                    <button 
                        class="close-btn" 
                        id="closePopup" 
                        onclick="console.log('Closing popup'); 
                                const popup = document.getElementById('popup'); 
                                if (popup) popup.classList.remove('show');">
                        <span>x</span>
                    </button>

                  <header class="popup-header">
                      <img src="https://n-pacis.github.io/dig245-final/assets/img/logo.png" alt="TOS Lens Logo" class="popup-logo">
                  </header>
                  <p class="summary-description">[Brief Summary: Replace this with a short 1-2 sentence summary of the TOS]</p>
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
                              <td>[Description of data collection practices]</td>
                          </tr>
                          <tr class="[severity-class-for-tracking]">
                              <td>Tracking</td>
                              <td>[Description of tracking practices]</td>
                          </tr>
                          <tr class="[severity-class-for-third-party-sharing]">
                              <td>Third-Party App Sharing</td>
                              <td>[Description of third-party data sharing practices]</td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>

          <script src="https://n-pacis.github.io/dig245-final/assets/js/main.js"></script>

          Guidelines:
          - Replace [Brief Summary] with a concise, 1-2 sentence summary of the TOS.
          - For each <tr>, dynamically assign the class attribute based on severity:
              - Use red if the clause indicates extensive data collection/tracking/sharing.
              - Use yellow if the clause indicates limited data collection/tracking/sharing.
              - Use green if the clause indicates no data collection/tracking/sharing.
          - Ensure the descriptions are short and strictly follow this format.
          - Do not include additional information outside this structure.

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

        const preconnect1 = document.createElement("link");
        preconnect1.rel = "preconnect";
        preconnect1.href = "https://fonts.googleapis.com";
        document.head.appendChild(preconnect1);

        const preconnect2 = document.createElement("link");
        preconnect2.rel = "preconnect";
        preconnect2.href = "https://fonts.gstatic.com";
        preconnect2.crossOrigin = "true";
        document.head.appendChild(preconnect2);

        const fontLink = document.createElement("link");
        fontLink.href =
          "https://fonts.googleapis.com/css2?family=Creepster&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap";
        fontLink.rel = "stylesheet";
        document.head.appendChild(fontLink);

        const stylesheetLink = document.createElement("link");
        stylesheetLink.rel = "stylesheet";
        stylesheetLink.href =
          "https://n-pacis.github.io/dig245-final/assets/css/popup.css";
        document.head.appendChild(stylesheetLink);

        document.body.insertAdjacentHTML("beforeend", cleanedResponse);
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
