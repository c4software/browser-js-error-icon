document.addEventListener("DOMContentLoaded", event => {
  if (window.browser) {
    // Firefox
    browser.tabs
      .query({ active: true })
      .then(tab => browser.browserAction.getBadgeText({ tabId: tab[0].id }))
      .then(drawContent);
  } else {
    // Is chrome
    chrome.tabs.getSelected(null, tab => {
      chrome.browserAction.getBadgeText({ tabId: tab.id }, drawContent);
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
