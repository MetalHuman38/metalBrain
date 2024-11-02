# Description: Dockerfile for the nodejs image
FROM node:latest

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install --production

# Bundle app source
COPY . .

# Expose the port
EXPOSE 3000

# Start the app
CMD [ "npm", "start" ]