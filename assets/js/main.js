document.addEventListener("DOMContentLoaded", () => {
  const scanButton = document.getElementById("scan-btn");

  scanButton.addEventListener("click", async () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.scripting.executeScript(
          {
            target: { tabId: tabs[0].id },
            files: ["content.js"],
          },
          () => {
            chrome.tabs.sendMessage(
              tabs[0].id,
              { action: 'getHTMLContent' },
              (response) => {
                if (response && response.success) {
                  chrome.runtime.sendMessage({ action: 'logHTMLContent', content: response.content });
                }
              }
            );
          }
        );
      }
    });
  });
});