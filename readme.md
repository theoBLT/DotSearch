# Dot Search

Superpower your colleague's workflows with shortcuts to your most commonly used URLs, and most common internal searches.

If you're familiar with Alfred's Web Search feature, this extension provides pretty much the same functionality within the Chrome web browser, with the added bonus of a centralized database for shortcuts.

## Getting Started

You'll need an *airtable* account, and a new base with 4 columns:
* key → The list of shortcuts you'll want to type in your browser to access the URLs
* url → The URL each `key` should open
* explanation → An explainer of what the URL that opens points to
* search_url → (optional) A URL such as `https://wwww.google.com?s={query}` where `query` will be replaced by anything you type after the key. e.g searching for `google cute cats` will leverage the search URL and search for `https://wwww.google.com?s=cute cats`


### Installing

- `Unzip` the downloaded file.

#### Hooking up the extension
You'll be able to dynamically feed your whole team with the same shortcuts, centralized in one airtable database. To do so:

- Open the unzipped *SmartGoLinks* folder

#### Installing the chrome extension
- In Google Chrome, Open (chrome://extensions/) or select the menu `Window > Extensions`.
- Enable the developer mode at top right.
- Click `Load unpacked extension...` and select the unzipped *SmartGoLinks* folder.
- On first install, you'll be directed to a settings page, follow the instructions to fill in your airtable sheet's details
- Hit "save"

## How does it work?

- Just type `qq` into Chrome's omnibox, then search for your key.
- Press `enter` and your browser will be redirected to the URL you specified for that key in airtable, or add a space, then a search term to leverage the search URL you included.


## License

This project is licensed under the MIT License.

## Acknowledgments

* Hat tip to the chrome extension I got inspired by, GoLinks (i'll add a proper reference link when this readme and extension start to look half-decent)