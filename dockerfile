FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock files
COPY package*.json yarn.lock ./

# Install project dependencies
RUN yarn install 

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Expose the application port (adjust if needed)
EXPOSE 3000

# Start the application
CMD ["yarn", "start:dev"]
