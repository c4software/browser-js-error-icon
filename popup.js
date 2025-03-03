document.addEventListener('DOMContentLoaded', function() {
  if (window.browser) {
    // Firefox
    browser.tabs
      .query({ active: true, currentWindow: true })
      .then(tabs => browser.action.getBadgeText({ tabId: tabs[0].id }))
      .then(drawContent);
  } else {
    // Chrome
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.action.getBadgeText({ tabId: tabs[0].id }, drawContent);
    });
  }
});

function drawContent(result) {
  if (result == "Disabled") {
    document.body.textContent = "Disabled";
    document.body.style.cssText = "background-color: #356DF2;";
  } else if (result) {
    document.body.style.cssText = "background-color: red;";
    document.body.textContent = `${result} error${result > 1 ? "s" : ""}`;
  } else {
    document.body.style.cssText = "background-color: green;";
    document.body.textContent = "No error";
  }
}
