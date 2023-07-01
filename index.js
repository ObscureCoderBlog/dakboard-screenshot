require('dotenv').config();
const puppeteer = require('puppeteer');
const cron = require('node-cron');
const { exec } = require('child_process');

const [width, height] = process.env.SCREENSHOT_RESOLUTION.split('x').map(Number);
const screenshotPath = process.env.SCREENSHOT_PATH;
const webpageUrl = process.env.DAKBOARD_URL;
const cronSchedule = process.env.CRON_SCHEDULE;
const runRClone = process.env.RUN_RCLONE === 'true';
const rcloneDestination = process.env.RCLONE_DESTINATION;
const rcloneMinAge = process.env.RCLONE_MIN_AGE;

async function takeScreenshot() {
    console.log('launch browser for screenshot');

    // Launch browser, no sandbox arguments for running in container, it can be removed if not being run in docker
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
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

    // Run RClone is env var is set to true
    if (runRClone) {
        // Use rclone to copy the screenshot to Google Photos and delete old screenshots
        exec(`rclone copy ${screenshotPath} ${rcloneDestination} && rclone delete ${rcloneDestination} --min-age ${rcloneMinAge}`, (err, stdout, stderr) => {
            if (err) {
                console.error(`exec error: ${err}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        });
    }

    console.log(`Screenshot saved to ${screenshotPath} and uploaded to Google Photos`);
}

// Schedule task
cron.schedule(cronSchedule, takeScreenshot, {
    scheduled: true
});