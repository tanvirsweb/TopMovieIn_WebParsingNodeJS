const { Builder, By, Key, until } = require('selenium-webdriver');
const ExcelJS = require('exceljs');

async function scrapeMovies() {
  const driver = new Builder().forBrowser('chrome').build();// webpage will open in chrome browser
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Top Movies');

  try {
    // web page link to be browsed
    await driver.get('https://www.imdb.com/chart/top');

    await driver.wait(until.elementLocated(By.css('#__next > main > div > div.ipc-page-content-container.ipc-page-content-container--center > section > div > div.ipc-page-grid.ipc-page-grid--bias-left > div > ul')), 5000);

    //movieElements= all elements whose property is By.css(...)
    const movieElements = await driver.findElements(By.css('#__next > main > div > div.ipc-page-content-container.ipc-page-content-container--center > section > div > div.ipc-page-grid.ipc-page-grid--bias-left > div > ul > li'));
    
    //iterate each movieElement
    for (const movieElement of movieElements) {
        // movieElements selector: #__next > main > div > div.ipc-page-content-container.ipc-page-content-container--center > section > div > div.ipc-page-grid.ipc-page-grid--bias-left > div > ul > li 
        //   inside each movieElement select "selector" to point a tag
        // full selector:#__next > main > div > div.ipc-page-content-container.ipc-page-content-container--center > section > div > div.ipc-page-grid.ipc-page-grid--bias-left > div > ul > li > "div.ipc-metadata-list-summary-item__c > div > div > div.ipc-title.ipc-title--base.ipc-title--title.ipc-title-link-no-icon.ipc-title--on-textPrimary.sc-b85248f1-7.lhgKeb.cli-title > a > h3"
        // selector value to be used: div.ipc-metadata-list-summary-item__c > div > div > div.ipc-title.ipc-title--base.ipc-title--title.ipc-title-link-no-icon.ipc-title--on-textPrimary.sc-b85248f1-7.lhgKeb.cli-title > a > h3    
        
        const titleElement = await movieElement.findElement(By.css('div.ipc-metadata-list-summary-item__c > div > div > div.ipc-title.ipc-title--base.ipc-title--title.ipc-title-link-no-icon.ipc-title--on-textPrimary.sc-b85248f1-7.lhgKeb.cli-title > a > h3'));
        const ratingElement = await movieElement.findElement(By.css('div.ipc-metadata-list-summary-item__c > div > div > span > div > span'));
        const yearElement= await movieElement.findElement(By.css('div.ipc-metadata-list-summary-item__c > div > div > div.sc-b85248f1-5.kZGNjY.cli-title-metadata > span:nth-child(1)'));
        const durationElement= await movieElement.findElement(By.css('div.ipc-metadata-list-summary-item__c > div > div > div.sc-b85248f1-5.kZGNjY.cli-title-metadata > span:nth-child(2)'));

        const title = await titleElement.getText();
        const rating = await ratingElement.getText();
        const year = await yearElement.getText();
        const duration = await durationElement.getText();

        worksheet.addRow([title, rating , year , duration]);
    }

    await workbook.xlsx.writeFile('top_movies.xlsx');
    console.log('Data has been scraped and stored in "top_movies.xlsx"');
  } catch (error) {
        console.error('An error occurred:', error);
  } finally {
        await driver.quit();
  }
}

scrapeMovies();
