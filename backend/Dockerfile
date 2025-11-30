# Use Node.js 18
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy backend package.json and package-lock.json
COPY backend/package*.json ./

# Install dependencies (production only)
RUN npm install --only=prod

# Copy all backend code into /app
COPY backend/ ./

# Expose port (Render will override PORT environment variable)
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
