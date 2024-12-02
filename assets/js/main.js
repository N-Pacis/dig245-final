document.addEventListener("DOMContentLoaded", () => {
  const scanButton = document.getElementById("scan-btn");
  const scanText = document.getElementById("scan-text");
  const scanLoader = document.getElementById("scan-loader");

  scanButton.addEventListener("click", () => {
    scanText.style.display = "none";
    scanLoader.style.display = "inline-block";
    scanButton.disabled = true;

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

                scanText.style.display = "inline";
                scanLoader.style.display = "none";
                scanButton.disabled = false;
              }
            );
          }
        );
      }
    });
  });
});
