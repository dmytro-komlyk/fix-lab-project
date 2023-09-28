FROM node:18-alpine as runner
WORKDIR /app/admin
COPY package*.json ./
COPY .env.example ./.env
RUN npm install
COPY . .
RUN npm run build

# Production Stage
FROM node:18-alpine as production
WORKDIR /app/admin
COPY --from=runner /app/admin/package.json ./package.json
COPY --from=runner /app/admin/node_modules ./node_modules
COPY --from=runner /app/admin/.next ./.next
COPY --from=runner /app/admin/public ./public
ENV NODE_ENV=production
EXPOSE 3002

CMD ["npm", "run", "start"]