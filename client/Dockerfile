# Production Stage
FROM node:18-alpine AS production
WORKDIR /app/client
COPY --from=runner /app/client/next.config.js ./
COPY --from=runner /app/client/package*.json ./
COPY --from=runner /app/client/.next ./.next
COPY --from=runner /app/client/out ./out
COPY --from=runner /app/client/public ./public
COPY --from=runner /app/client/node_modules ./node_modules
ENV NODE_ENV=production
EXPOSE 3001

CMD ["npm", "run", "build", "&&", "npm", "run", "start"]
