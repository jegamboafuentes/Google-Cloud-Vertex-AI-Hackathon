
chrome.runtime.onInstalled.addListener(function () {
  // Create context menu
  chrome.contextMenus.create({
    id: "tweetCreator",
    title: "Summarize this text",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === "tweetCreator") {
    let selectedText = info.selectionText;

    // Call to Palm2 API for text summarization
    console.log(selectedText);
    fetch("https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=AIzaSyDziGoZ8H9asRgWUUHiEfcitZYeHWB5iVQ", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "prompt": { "text": selectedText } })
    })
      .then(response => response.json())
      .then(data => {
        // Store summarized text in local storage
        chrome.storage.local.set({ summarizedText: data.text });
      })
      .catch(error => console.error('Error:', error));
  }
});
