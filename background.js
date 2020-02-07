var pattern = /^((http|https):\/\/)/;
try {
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (!pattern.test(tab.url)) {
      chrome.browserAction.setBadgeText({ text: "Disabled", tabId: tab.id });
      return;
    }
  });
} catch (err) {
  // IGNORED
  console.log(err);
}

// accept messages from background
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  chrome.browserAction.setBadgeText({
    text: request.error,
    tabId: sender.tab.id
  });

  chrome.browserAction.setBadgeBackgroundColor({
    color: "#F00",
    tabId: sender.tab.id
  });

  try {
    if (chrome.browserAction.setBadgeTextColor) {
      chrome.browserAction.setBadgeTextColor({
        color: "#FFFFFF"
      });
    }
  } catch (err) {}
});
