    const fs = require('fs');
    const webdriver = require('selenium-webdriver');
    const chromedriver = require('chromedriver');

    // const PATH_TO_CHROME = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
    const PATH_TO_CHROME = '/usr/bin/google-chrome-unstable';

    const chromeCapabilities = webdriver.Capabilities.chrome();
    chromeCapabilities.set('chromeOptions', {
      binary: PATH_TO_CHROME,
      'args': [
        '--headless --window-size=800,600 --disable-gpu --disable-extensions --verbose --log-path=chromedriver.log --no-sandbox',
      ]
    });

    const driver = new webdriver.Builder()
      .forBrowser('chrome')
      .withCapabilities(chromeCapabilities)
      .build();

    // Navigate to google.com, enter a search.
    driver.get('https://www.google.com/ncr');
    driver.findElement({ name: 'q' }).sendKeys('webdriver', webdriver.Key.RETURN);
    // driver.findElement({name: 'btnG'}).click();
    driver.wait(webdriver.until.titleIs('webdriver - Google Search'), 1000);

    // Take screenshot of results page. Save to disk.
    driver.takeScreenshot().then(base64png => {
      fs.writeFileSync('screenshot.png', new Buffer(base64png, 'base64'));
    });

    driver.quit();