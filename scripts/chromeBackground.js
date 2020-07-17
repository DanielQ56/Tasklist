chrome.browserAction.onClicked.addListener(function(activeTab){
  var newURL = chrome.extension.getURL('tasklist.html')
  chrome.tabs.create({ url: newURL });
});