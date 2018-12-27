// Saves options to chrome.storage
function save_options() {
  var apiKey = document.getElementById('airtableApiKey').value
  var apiUrl = document.getElementById('airtableUrl').value
  console.log(apiKey + ':' + apiUrl)
  chrome.storage.sync.set(
    {
      airtableUrl: apiUrl,
      airtableApiKey: apiKey
    },
    () => {
      // Update status to let user know options were saved.
      var status = document.getElementById('status')
      status.textContent =
        "Your URL and API keys have been saved and synced with your Google profile. You're all set!"
      setTimeout(function() {
        status.textContent = ''
      }, 2500)
    }
  )
}

// Restores form to the values
// stored in chrome.storage.
function restore_options() {
  // Use empty strings as default values
  chrome.storage.sync.get(
    {
      airtableUrl: '',
      airtableApiKey: ''
    },
    items => {
      document.getElementById('airtableUrl').value = items.airtableUrl
      document.getElementById('airtableApiKey').value = items.airtableApiKey
    }
  )
}
document.addEventListener('DOMContentLoaded', restore_options)
document.getElementById('save').addEventListener('click', save_options)
