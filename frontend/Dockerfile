# Use an official Node runtime as a parent image
FROM node:18-alpine

# Set work directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy project files
COPY . .

# Expose port (5173 for Vite)
EXPOSE 5173

# Run dev server
CMD ["npm", "run", "dev", "--", "--host"]
