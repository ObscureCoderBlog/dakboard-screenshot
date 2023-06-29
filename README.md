# Webpage Screenshot App

This application uses Node.js, Puppeteer, and node-cron to take screenshots of a specified webpage at a specified resolution, and saves the screenshot to a specified directory. The screenshot capture process is scheduled to occur at regular intervals defined by a cron expression.

## Prerequisites

- Node.js
- npm

## Setup

1. Clone the repository:

    ```
    git clone git@github.com:ObscureCoderBlog/dakboard-screenshot.git
    ```

2. Navigate into the project directory:

    ```
    cd dakboard-screenshot
    ```

3. Install the dependencies:

    ```
    npm install
    ```

4. Create a `.env` file in the root of your project and specify your environment variables:

    ```
    DAKBOARD_URL=https://example.com
    SCREENSHOT_PATH=/path/to/your/screenshot.png
    SCREENSHOT_RESOLUTION=1920x1080
    CRON_SCHEDULE=*/1 * * * *
    RUN_RCLONE=false
    RCLONE_DESTINATION=gphotos:album/DakBoard
    RCLONE_MIN_AGE=4m
    ```

    Replace the placeholders with your actual data.

5. Install PM2:

    ```
    npm install pm2 -g
    ```

6. Use PM2 to start and manage your application:

    ```
    pm2 start index.js --name=dakboardscreenshot
    ```

    You can check the status of your application using:

    ```
    pm2 status
    ```

    To stop your application:

    ```
    pm2 stop dakboardscreenshot
    ```

    For more PM2 commands and usage, check the [PM2 documentation](https://pm2.keymetrics.io/docs/usage/quick-start/).

## Environment Variables

- `DAKBOARD_URL`: The URL of the webpage you want to take screenshots of.
- `SCREENSHOT_PATH`: The path where the screenshot will be saved. Use `./<filename>` for the current directory.
- `SCREENSHOT_RESOLUTION`: The resolution at which the screenshot will be taken, in the format `<width>x<height>`.
- `CRON_SCHEDULE`: The schedule on which the screenshot will be taken, as a cron expression.
- `RUN_RCLONE`: Whether or not to run the rclone upload & delete code.
- `RCLONE_DESTINATION` (Optional): The rclone destination where the screenshot will be uploaded.
- `RCLONE_MIN_AGE` (Optional): The minimum age of the files to be deleted using rclone.

## Usage

The application will take a screenshot of the specified webpage at the specified resolution and save it to the specified directory at the specified intervals. You can check the screenshot in the specified directory.

## License

[MIT](https://choosealicense.com/licenses/mit/)
