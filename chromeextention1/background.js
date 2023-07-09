
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
      //body: JSON.stringify({ "prompt": { "text": "create a poem about Java Script" } })
      body: JSON.stringify({ "prompt": { "text": selectedText+" Please, summarize this text as a tweet with hashtags and emojis" } })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        console.log(data.candidates[0].output);
        // Store summarized text in local storage
        chrome.storage.local.set({ summarizedText: data.candidates[0].output });
      })
      .catch(error => {
        console.error('Error:', error);
        chrome.storage.local.set({ summarizedText: "PALM 2 CANT READ THE MESSAGE. INFORMATION ABOUT THE ERROR: " + error.message });
      });
  }
});