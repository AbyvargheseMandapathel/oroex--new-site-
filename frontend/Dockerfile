FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY package.json package-lock.json* ./

RUN npm ci --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4173"]
