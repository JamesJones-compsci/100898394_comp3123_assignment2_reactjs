# Use Node.js 18
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (production only)
RUN npm install --only=prod

# Copy the rest of the backend code
COPY . .

# Expose port (Render assigns dynamic port via PORT env)
EXPOSE 5000

# Start the server with production script
CMD ["npm", "start"]
