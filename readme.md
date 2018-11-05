# Chrome GoLinks

Superpower your colleague's workflows with shortcuts to your most commonly used URLs, and most common internal searches.

If you're familiar with Alfred's Web Search feature, this extension provides pretty much the same functionality within the Chrome web browser, with the added bonus of a centralized database for shortcuts.

## Getting Started

You'll need an *airtable* account, and a new base with 4 columns:
* key
* url
* explanation
* search_url


### Installing

- `Unzip` the downloaded file.

#### Hooking up the extension
You'll be able to dynamically feed your whole team with the same shortcuts, centralized in one airtable database. To do so:

- Open the unzipped *SmartGoLinks* folder
- Rename the file `env-example.js` into `env.js`
- Replace the airtable API key with your own, and the URL of the base's records with your own
- You're hooked!

#### Installing the chrome extension
- In Google Chrome, Open (chrome://extensions/) or select the menu `Window > Extensions`.
- Enable the developer mode at top right.
- Click `Load unpacked extension...` and select the unzipped *SmartGoLinks* folder.
- You're all set

## How does it work?

Just type `qq` into Chrome's omnibox, then search for your key.
Press `enter` and your browser will be redirected to the URL you specified for that key in airtable, or add a search term to leverage the search URL you included.


## License

This project is licensed under the MIT License.

## Acknowledgments

* Hat tip to the chrome extension I got inspired by, GoLinks (i'll add a proper reference link when this readme and extension start to look half-decent)
