document.addEventListener("DOMContentLoaded", event => {
  chrome.tabs.getSelected(null, tab => {
    chrome.browserAction.getBadgeText({ tabId: tab.id }, result => {
      if (result == "Disabled") {
        document.body.innerHTML = "Disabled";
        document.body.style.cssText = "background-color: #356DF2;";
      } else if (result) {
        document.body.style.cssText = "background-color: red;";
        document.body.innerHTML = `${result} error${result > 1 ? "s" : ""}`;
      } else {
        document.body.style.cssText = "background-color: green;";
        document.body.innerHTML = "No error";
      }
    });
  });
});
