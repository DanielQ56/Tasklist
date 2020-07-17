To Do List


It is now available as a chrome extension! 

In order to use as a chrome extension:
1. download the repository
2. go to chrome://extensions
3. click on load unpacked
4. select the folder you downloaded the files to

This project overrides the New Tab page, meaning you'll have access to your to do list anytime you open up a new page!

If you prefer not to override your current New Tab open up the file manifest.json and remove the portion:
	"chrome_url_overrides": {
		"newtab": "tasklist.html"
	},

and it should revert back to your original New Tab page. 

In order to open it manually, click on the puzzle piece icon near the top right of your google chrome to bring up a dropdown of installed extensions. Find the one called "To Do List" and press the pin icon to pin it to your search bar. Then click on the icon to open up the page.

Note: If the empty tasks don't appear at first, go back to chrome://extensions, press the refresh button at the bottom right corner, and open up a new tab.

This was just a small venture for me to practice HTML, CSS, and Javascript and to learn jQuery and how to use Javascript Canvas.

Hope you enjoy!

Danny Qi
4th year Computer Science/Computer Game Science at UCI