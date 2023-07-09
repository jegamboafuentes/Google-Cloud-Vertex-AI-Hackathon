chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: 'summarize',
      title: 'Summarize with Tweet Creator',
      contexts: ['selection']
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'summarize') {
      const selectedText = info.selectionText;
      fetch('https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=AIzaSyDziGoZ8H9asRgWUUHiEfcitZYeHWB5iVQ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'prompt': {
            'text': selectedText
          }
        })
      })
      .then(response => response.json())
      .then(data => {
        chrome.tabs.sendMessage(tab.id, {summary: data.generated_text});
      })
      .catch(console.error);
    }
  });
  