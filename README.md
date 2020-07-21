To Do List


It is now available as a chrome extension! 

In order to use as a chrome extension:
1. download the repository
2. go to chrome://extensions
3. click on load unpacked
4. select the folder you downloaded the files to

In order to open it manually, click on the puzzle piece icon near the top right of your google chrome to bring up a dropdown of installed extensions. Find the one called "To Do List" and press the pin icon to pin it to your search bar. Then click on the icon to open up the page.

Note: If the empty tasks don't appear at first, try refreshing the page. If it still doesn't work, go back to chrome://extensions, press the refresh button at the bottom right corner, and open up a new tab.

If you would like to override the New Tab Page, meaning you'll have access to your to do list anytime you open up a new page, go to manifest.json and add this portion:

	"chrome_url_overrides": {
		"newtab": "tasklist.html"
	},

and it should properly override the New Tab Page.

This was just a small venture for me to practice HTML, CSS, and Javascript and to learn jQuery and how to use Javascript Canvas.

Hope you enjoy!

Danny Qi
4th year Computer Science/Computer Game Science at UCI