FROM node:slim AS build
RUN npm i -g pnpm bun && mkdir /app
WORKDIR /app
COPY . .
RUN pnpm i && bun build packages/http/src/main.ts --compile --outfile /run

FROM debian:stable-slim
COPY --from=build /run /run
CMD ["/run"]