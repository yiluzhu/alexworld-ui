# Use the official lightweight Node.js 12 image.
# https://hub.docker.com/_/node
FROM node:12-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Install production dependencies.
RUN npm install

# Set environment variables
RUN export ROOT_URL=https://be-4imylu4s7a-ew.a.run.app

# Copy local code to the container image.
COPY . ./

# Run the web service on container startup.
CMD [ "npm", "start" ]