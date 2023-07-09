document.addEventListener('DOMContentLoaded', () => {
    // Fetch summarized text from local storage
    chrome.storage.local.get(['summarizedText'], function (result) {
        document.getElementById('summary').innerText = result.summarizedText;
    });

    // Add event listener for tweet button
    document.getElementById('tweet').addEventListener('click', () => {
        let tweetText = document.getElementById('summary').innerText;
        let tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
        window.open(tweetUrl, "_blank");
    });

    // Listen for messages from the background script
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        // Update the popup's content
        document.getElementById('summary').innerText = request.summarizedText;
    });
});
