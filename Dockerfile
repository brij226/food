# Use Node LTS
FROM node:22

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Expose port (adjust if different)
EXPOSE 3000

# Start in watch mode for hot reload
CMD ["npm", "run", "start:dev"]
