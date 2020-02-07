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
