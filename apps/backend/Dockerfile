FROM node:22-alpine
WORKDIR /app

COPY apps/backend/package.json ./package.json
RUN npm install

COPY apps/backend/tsconfig.json ./tsconfig.json
COPY apps/backend/src ./src
COPY apps/backend/drizzle ./drizzle
COPY apps/backend/docker-entrypoint.sh ./docker-entrypoint.sh

RUN npm run build && chmod +x docker-entrypoint.sh

ENV NODE_ENV=production
EXPOSE 3000
ENTRYPOINT ["./docker-entrypoint.sh"]
