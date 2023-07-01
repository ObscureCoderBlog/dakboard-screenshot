# Use Node.js 16 on Alpine
FROM node:16-alpine

# Add necessary packages for Puppeteer
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    zlib \
    zlib-dev

# Tell Puppeteer to skip downloading Chrome and use the pre-installed package
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN mkdir -p /app/img

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install


# Globally install pm2
RUN npm install -g pm2

# Copy the rest of your app's source files
COPY . .

CMD [ "pm2-runtime", "index.js" ]
