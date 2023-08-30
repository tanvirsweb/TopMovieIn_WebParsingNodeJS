# WebParsingNodeJS
 Get IMDB rating,release year of Top movies using ** NODEJS & Selenium webdriver **. Store data in XCEL file

 @COPYRIGHT: TANVIR ANJOM SIDDIQUE (ALVI)
 
*** 
With time websites code and css selector of a tag may change.In that case:
    goto the website > right click > inspect > select tag to get text > rigth click > copy css selector > use that updated selector in this projects code. 
***

01)
When you run npm init -y, it generates a package.json file in the current directory with minimal information. This can be helpful when you want to quickly create a new project without going through the interactive prompts that ask for details like project name, version, description, entry point, test command, etc.

bash/command promt terminal:
    npm init -y

02)
Install the required packages(bash/cmd terminal):
    npm install selenium-webdriver exceljs

03)
Make sure you have the appropriate web driver installed. For example, if you're using Chrome, you can use the ChromeDriver.

04)
Create a script (TopIMDB_MovieInfo.js) with the following code.
Run the script(open bash/cmd terminal and write):
    node TopIMDB_MovieInfo.js