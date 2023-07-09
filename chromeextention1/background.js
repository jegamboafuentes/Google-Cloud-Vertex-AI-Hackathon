
chrome.runtime.onInstalled.addListener(function () {
  // Create context menu
  chrome.contextMenus.create({
    id: "tweetCreator",
    title: "Create Tweet about this text",
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
    //body: JSON.stringify({ "prompt": { "text": selectedText } })
    //body: JSON.stringify({ "prompt": "Crea un poema sobre Java Script"})
      body: JSON.stringify({ "prompt": { "text": "Crea un poema sobre Java Script" } })
    })
      .then(response => response.json())
      .then(data => {
        console.log(response);
        // Store summarized text in local storage
        chrome.storage.local.set({ summarizedText: data.text });
      })
      .catch(error => console.error('Error:', error));
  }
});