# Stage 1: Build React App
FROM node:18 AS build
WORKDIR /app

# Copy dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# Stage 2: Serve React via Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (mapped to 3000 in docker-compose)
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]