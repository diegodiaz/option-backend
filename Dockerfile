# Use the official lightweight Node.js 14 image.
# https://hub.docker.com/_/node
FROM node:14-alpine

# add dependencies
RUN apk add --update zip unzip libxml2-dev openssl g++ make python3

# Create and change to the app directory.
WORKDIR /server

# Copy local code to the container image.
COPY . ./

# Run the web service on container startup.
CMD [ "npm", "run", "start:prod" ]
