chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    document.getElementById('summary').innerText = request.summary;
  });
  
  document.getElementById('textToSpeech').addEventListener('click', () => {
    let summary = document.getElementById('summary').innerText;
    chrome.tts.speak(summary);
  });
  
  document.getElementById('tweet').addEventListener('click', () => {
    // Add your tweeting functionality here
  });
  