
document.getElementById("tos-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const tosText = document.getElementById("tos-input").value;
    if (!tosText) {
        alert("Please enter the Terms of Service text to summarize.");
        return;
    }

    const apiKey = "AIzaSyBqfxJ7NFEyb7oCRthvLaSUiEDmbieMzpY";
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            contents: [{
                parts: [{ text: `Keep it very short! Provide a short summary of the TOS text, and give one sentence each about the following clauses: Data Collection, Tracking, and Third Party Sharing. Use icons to show the level of risk: ✅ for safe, ⚠️ for warning, and ❌ for danger. Keep it very short, only 250 words, and return only the categories I mentioned: ${tosText}` }]
            }]
        })
    };

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, requestOptions);
        
        if (!response.ok) {
            throw new Error("Network response was not OK.");
        }

        const data = await response.json();
        let summary = data.candidates?.[0]?.content?.parts?.[0]?.text || "Summary not available.";

        summary = summary
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")      
            .replace(/\n\s*\*/g, "</li><li>")                      
            .replace(/✅/g, "<span class='icon safe'>✅</span>")   
            .replace(/⚠️/g, "<span class='icon warning'>⚠️</span>") 
            .replace(/❌/g, "<span class='icon danger'>❌</span>"); 

        summary = `<ul><li>${summary}</li></ul>`;

        document.getElementById("summary-output").innerHTML = summary;

    } catch (error) {
        console.error("Error fetching the summary:", error);
        alert("An error occurred while fetching the summary. Please try again.");
    }
});
