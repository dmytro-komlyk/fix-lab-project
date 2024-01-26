ARG NODE_VERSION=18

FROM --platform=linux/amd64 node:${NODE_VERSION}-alpine3.17 as base

ARG PACKAGE_NAME=client
# ARG PNPM_VERSION=8.9.0
ARG SERVICE_PATH=apps/client

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store \
#     npm i --global --no-update-notifier --no-fund pnpm@${PNPM_VERSION}

FROM base AS dependencies
WORKDIR /app
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json .npmrc ./
COPY ${SERVICE_PATH}/package.json ./${SERVICE_PATH}/package.json
COPY apps/server/package.json ./apps/server/package.json
COPY ${SERVICE_PATH}/next.config.js ./${SERVICE_PATH}/next.config.js
# --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store \
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --filter ${PACKAGE_NAME}
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --filter server

FROM base AS builder
COPY . /app
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/${SERVICE_PATH}/node_modules ./${SERVICE_PATH}/node_modules
COPY --from=dependencies /app/apps/server/node_modules ./apps/server/node_modules
COPY ${SERVICE_PATH}/.env.docker.example ./${SERVICE_PATH}/.env.local

ENV NEXT_TELEMETRY_DISABLED 1
RUN pnpm db:generate 
RUN pnpm build:${PACKAGE_NAME}
# RUN pnpm deploy --filter=${PACKAGE_NAME} --prod /app/${PACKAGE_NAME}

FROM base as runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

USER nextjs

COPY --from=builder --chown=nextjs:nodejs /app/${SERVICE_PATH}/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/${SERVICE_PATH}/.next/static ./${SERVICE_PATH}/.next/static

WORKDIR /app/${SERVICE_PATH}

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1

USER nextjs

ENV HOSTNAME 0.0.0.0
ENV PORT 3001
EXPOSE 3001

CMD ["pnpm", "start:prod"]
