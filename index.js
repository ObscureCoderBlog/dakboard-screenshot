require('dotenv').config();
const puppeteer = require('puppeteer');
const cron = require('node-cron');

const [width, height] = process.env.SCREENSHOT_RESOLUTION.split('x').map(Number);
const screenshotPath = process.env.SCREENSHOT_PATH;
const webpageUrl = process.env.DAKBOARD_URL;
const cronSchedule = process.env.CRON_SCHEDULE;

async function takeScreenshot() {
    // Launch browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set viewport to the specified resolution
    await page.setViewport({
        width: width,
        height: height,
    });

    // Navigate to webpage and wait until it's fully loaded
    await page.goto(webpageUrl, { waitUntil: 'networkidle0' });

    // Take and save screenshot
    await page.screenshot({ path: screenshotPath });

    // Close browser
    await browser.close();
    console.log(`Screenshot saved to ${screenshotPath}`);
}

// Schedule task
cron.schedule(cronSchedule, takeScreenshot, {
    scheduled: true
});
