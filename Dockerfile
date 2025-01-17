# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files và cài đặt dependencies
COPY package*.json ./
RUN npm ci

# Copy toàn bộ mã nguồn và build ứng dụng
COPY . .
RUN npm run build

# Stage 2: Runtime
FROM node:20-alpine AS runtime

WORKDIR /app

# Copy các file cần thiết từ builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./

# Cài đặt dependencies cần thiết cho production
RUN npm ci --production

ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "start"]
