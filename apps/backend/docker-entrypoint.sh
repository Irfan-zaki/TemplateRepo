#!/bin/sh
set -e
node dist/db/migrate.js
node dist/db/seeds/index.js
exec node dist/index.js
