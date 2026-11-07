FROM node:22-alpine
WORKDIR /app

COPY apps/api/package.json ./package.json
RUN npm install

COPY apps/api/tsconfig.json ./tsconfig.json
COPY apps/api/src ./src
COPY apps/api/db ./db
COPY apps/api/docker-entrypoint.sh ./docker-entrypoint.sh

RUN npm run build && chmod +x docker-entrypoint.sh

ENV NODE_ENV=production
EXPOSE 3000
ENTRYPOINT ["./docker-entrypoint.sh"]
