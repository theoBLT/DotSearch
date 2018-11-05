// For the sport
'use strict';

var
  // airtableUrl = "https://api.airtable.com/v0/appCWEkd1xRl7rETP/shortcuts?&view=Grid%20view",
  // airtableApiKey = "keyDA3iMtSFG4Kj04",
  airtableAuthentication = "Bearer" + " " + airtableApiKey,
  i,
  Shortcuts = [];

// Getting the data from airtable - what's beautiful is this only runs everytime the browser starts
// So, no risk to hit airtable's 5 calls/second threshold
fetch(airtableUrl, {
    headers: {
      "Authorization": airtableAuthentication
    }
  })
  .then(response => response.json())
  .then(records => {
    for (i = 0; i < records.records.length; i++) {
      var newShortcutContent = new Shortcutcontent(
        records.records[i].fields.url,
        records.records[i].fields.explanation,
        records.records[i].fields.search_url
      );
      var newShortcut = new Shortcut(
        records.records[i].fields.key,
        newShortcutContent
      );
      Shortcuts.push(newShortcut);
    }
    console.log(JSON.stringify(Shortcuts));

    // Saving the above handy shortcuts into localStorage
    // We will only use localStorage from there on to access data
    Shortcuts.forEach(function(shortcut) {
      setUrl(
        shortcut.key,
        shortcut.content
      );
    });
  })
  .catch(error => console.log("An error happened when fetching data from airtable" + " • " + error));

// This event is triggered everytime the user writes something into Chrome's omnibox
chrome.omnibox.onInputChanged.addListener(
  function(text, suggest) {
    if (text.includes(" ")) {
      var search = text.split(/\s(.+)/)[1];
      text = text.split(/\s(.+)/)[0];
      suggest(
        // Fetches all of the shortcut keys in local storage
        Object.getOwnPropertyNames(localStorage).map(function(key) {

          // For each of these keys, return the content and description expected of the "suggest" Chrome function
          return {
            content: key,
            description: "<dim>Search</dim> <url>" + capitalizeFirstLetter(key) + "</url><dim> for </dim>" + "<match>" + search + "</match>"
          }

        }).filter(function(item) {

          // Returns the item if the text entered is part of the "content" or "description"
          return item.content.includes(text);
        }));
    } else {

      suggest(
        // Fetches all of the shortcut keys in local storage
        Object.getOwnPropertyNames(localStorage).map(function(key) {

          // For each of these keys, return the content and description expected of the "suggest" Chrome function
          return {
            content: key,
            description: key + ' • ' + ' <match> ' + JSON.parse(localStorage[key]).explanation + '</match>' + ' • ' + '<url> ' + JSON.parse(localStorage[key]).url + '</url>'
          }

        }).filter(function(item) {

          // Returns the item if the text entered is part of the "content" or "description"
          return item.content.includes(text) || item.description.includes(text);
        }));
    };
  });

// This event is fired with the user accepts the input in the omnibox
chrome.omnibox.onInputEntered.addListener(
  function(text) {
    var parsed_query = queryParsing(text);
    if (parsed_query.isMultiple === true) {
      getSearchUrlFromKey(parsed_query.search_key, parsed_query.search_param);
    } else {
      // We go fetch the URL from the text entered by the user
      getUrlFromKey(parsed_query.search_key);
    };
  });

// Analysing whether the input from users is simple or multiple and providing useful objects
function queryParsing(user_query) {
  var parsed_query = {
    isMultiple: false,
    search_key: user_query.split(/\s(.+)/)[0], // everything before the first space
    search_param: user_query.split(/\s(.+)/)[1], // everything after the first space
    raw_search_url: undefined,
  };

  parsed_query.raw_search_url = JSON.parse(localStorage[parsed_query.search_key]).search_url;

  if (typeof parsed_query.search_param !== 'undefined' && typeof parsed_query.raw_search_url === "string") {
    parsed_query.isMultiple = true;
  } else {
    parsed_query.isMultiple = false;
  };
  return parsed_query;
}

// Constructor to build a new Shortcut's description
function Shortcutcontent(url, explanation, opt_search_url) {
  this.url = url;
  this.explanation = explanation;
  this.search_url = opt_search_url;
}

// Constructor to build a new Shortcut object
function Shortcut(key, content) {
  this.key = key;
  this.content = content;
}

function setUrl(key, value) {
  localStorage[key] = JSON.stringify(value);
}

function getUrlFromKey(key) {
  // URL is retrieved from localStorage, and browser redirected
  goToPage(JSON.parse(localStorage[key]).url);
}

function getSearchUrlFromKey(key, param) {
  // Search URL is retrieved from localStorage
  // User query is included as a URL param, and browser redirected
  var raw_search_url = JSON.parse(localStorage[key]).search_url,
    url = raw_search_url.replace("{query}", param);

  goToPage(url);
}

function goToPage(url) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    chrome.tabs.update(tabs[0].id, {
      url: url
    });
  });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
