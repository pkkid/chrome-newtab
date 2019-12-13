// Encoding: UTF-8
// Chrome NewTab Options
'use strict';

var save_setting = function(key, value, callback) {
  var data = {};
  data[key] = value;
  chrome.storage.sync.set(data, function() {
    if (!chrome.runtime.lastError) {
      console.log('Saved', key, value);
      if (callback) { callback(); }
    }
  });
};


//------------------------------
// Options
//------------------------------
var Options = {
  init: function() {
    // Load initial values from storage
    if ($('#options').length) {
      chrome.storage.sync.get(null, function(result) {
        console.log(result);
        $('#url').val(result.url || '');
        $('#iframe').attr('checked', result.iframe || false);
      });
    }
    // Save new values to storage when modified
    $('#url').on('blur', function() { save_setting('url', $(this).val()); });
    $('#iframe').on('change', function() { save_setting('iframe', $(this).is(':checked')); });
    $('.special.help a').on('click', function() { $('#url').val($(this).text()).trigger('blur'); });
  },
};


//------------------------------
// New Tab
//------------------------------
var NewTab = {
  init: function() {
    chrome.storage.sync.get(['url','iframe'], function(result) {
      var url = result.url || 'chrome://apps/';
      var iframe = result.iframe || false;
      if (url.startsWith('chrome://')) {
        chrome.tabs.create({'url': url});
        window.close();
      } else if (iframe) {
        $('#iframe').attr('src', url);
      } else {
        window.top.location = url;
      }
    });
  },
};


//------------------------------
// Main
//------------------------------
if ($('#newtab').length) { NewTab.init(); }
if ($('#options').length) { Options.init(); }
