FROM node:20-alpine

WORKDIR /app

COPY package* .
RUN npm ci --include=dev

COPY . .
RUN npx prisma generate

EXPOSE 5000