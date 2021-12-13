FROM node:16-alpine AS builder
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
COPY src ./src
RUN npm install
RUN npm run build

FROM node:16-alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY .env ./
COPY knexfile.js ./
COPY knex ./knex
COPY --from=builder /app/dist ./dist
RUN npm install --only=production
RUN npm install pm2 -g
CMD ["pm2-runtime", "./dist/index.js"]
