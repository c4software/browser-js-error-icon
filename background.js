try{
  chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if(tab.url.indexOf('chrome://') != -1){
      return; 
    }
    
    if (changeInfo.status == 'complete') {
      chrome.tabs.get(tabId, function(tab) {
        chrome.tabs.executeScript(tabId, {file: 'inject.js'});
      });
    }
  })
} catch(err) {
  // IGNORED
}

// accept messages from background
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    chrome.browserAction.setBadgeText({text: request.error, tabId: sender.tab.id});

    if(request.error !== "0"){
        chrome.browserAction.setBadgeBackgroundColor({color: "#F00", tabId: sender.tab.id});
    } else {
      chrome.browserAction.setBadgeBackgroundColor({color: "#585858", tabId: sender.tab.id});
    }
});