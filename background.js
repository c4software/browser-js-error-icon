chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  chrome.action.setBadgeText({
    text: request.error,
    tabId: sender.tab.id
  });

  chrome.action.setBadgeBackgroundColor({
    color: "#F00",
    tabId: sender.tab.id
  });

  try {
    if (chrome.action.setBadgeTextColor) {
      chrome.action.setBadgeTextColor({
        color: "#FFFFFF"
      });
    }
  } catch (err) {}
});
