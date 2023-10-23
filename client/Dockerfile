# Build Stage
FROM node:18-alpine AS runner
WORKDIR /app/client
COPY package*.json ./
COPY .env.example ./.env
RUN npm ci

COPY . .

RUN npm run build

# Production Stage
FROM node:18-alpine AS production
WORKDIR /app/client

# Copy artifacts from the "runner" stage
COPY --from=runner /app/client/next.config.js ./
COPY --from=runner /app/client/package*.json ./
COPY --from=runner /app/client/.next ./.next
COPY --from=runner /app/client/out ./out
COPY --from=runner /app/client/public ./public
COPY --from=runner /app/client/node_modules ./node_modules

# Set environment variables
ENV NODE_ENV=production
EXPOSE 3001

# CMD to run build and start
CMD ["npm", "run", "start"]
