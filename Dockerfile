FROM node:18-alpine AS base

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json ./

FROM base AS deps

RUN npm install

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY .env ./
COPY . .

RUN npm run build

FROM nginx:alpine AS runner

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist ./

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
