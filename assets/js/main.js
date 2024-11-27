document.addEventListener("DOMContentLoaded", function () {
  const popup = document.getElementById("popup");
  const closePopup = document.getElementById("closePopup");

  closePopup.addEventListener("click", function () {
    popup.classList.remove("show");
  });
});


// document
//   .getElementById("tos-form")
//   .addEventListener("submit", async function (event) {
//     event.preventDefault();

//     const tosText = document.getElementById("tos-input").value;
//     if (!tosText) {
//       alert("Please enter the Terms of Service text to summarize.");
//       return;
//     }

//     const apiKey = "AIzaSyBqfxJ7NFEyb7oCRthvLaSUiEDmbieMzpY";
//     const requestOptions = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         contents: [
//           {
//             parts: [
//               {
//                 text: `Please summarize the Terms of Service (TOS) text provided in a brief paragraph, and give clear and detailed information for the following three clauses: Data Collection, Tracking, and Third Party Sharing.

// Follow these guidelines for your response:

// Do not return empty data for any clause. Even if a clause does not apply (e.g., no data is collected), provide a description like "No data is collected" or "No tracking occurs."
// Use HTML formatting to structure the response as follows:
// Start with a brief summary paragraph (max. 3-4 sentences) explaining the overall TOS.
// Use an ordered list (<ol>) for the three clauses, with each clause as a list item (<li>).
// For each clause title, use the <strong> tag to highlight it.
// For line breaks within sentences, use the <br> tag.
// Do not use asterisks or any unnecessary characters like bold symbols. The response should be HTML-friendly.
// Clauses to include:

// Data Collection: Describe if any personal or usage data is collected. Use ✅ if no data is collected, ⚠️ if limited data is collected for essential functions, or ❌ if extensive data is collected.
// Tracking: Explain if tracking technologies (e.g., cookies, IP logging) are used. Use ✅ if no tracking is done, ⚠️ for basic tracking, or ❌ if extensive tracking is employed.
// Third Party Sharing: Indicate if user data is shared with external parties. Use ✅ if no data is shared, ⚠️ if limited sharing is done, or ❌ for extensive sharing.
// Ensure the response is concise, not exceeding 250 words, and formatted properly in HTML. ${tosText}`,
//               },
//             ],
//           },
//         ],
//       }),
//     };

//     try {
//       const response = await fetch(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
//         requestOptions
//       );

//       if (!response.ok) {
//         throw new Error("Network response was not OK.");
//       }

//       const data = await response.json();
//       let summary =
//         data.candidates?.[0]?.content?.parts?.[0]?.text ||
//         "Summary not available.";

//       document.getElementById("summary-output").innerHTML = summary;
//     } catch (error) {
//       console.error("Error fetching the summary:", error);
//       alert("An error occurred while fetching the summary. Please try again.");
//     }
//   });
