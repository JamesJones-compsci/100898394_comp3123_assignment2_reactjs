# Use Node.js 18
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (production only)
RUN npm install --only=prod

# Copy all backend files
COPY . .

# Expose port (Render will assign the real PORT via environment variable)
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
