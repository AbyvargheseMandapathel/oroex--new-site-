FROM node:18-alpine

WORKDIR /app

# Install system deps (important for native modules)
RUN apk add --no-cache python3 make g++

# Copy dependency files first (cache optimization)
COPY package.json package-lock.json* ./

# Clean install (better than npm install)
RUN npm ci --legacy-peer-deps

# Copy rest of the code
COPY . .

# Build frontend (Vite / Next / React)
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "preview"]
