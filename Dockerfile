FROM danielmichaels/ci-toolkit AS toolkit
FROM node:lts-slim AS node

COPY --from=toolkit ["/usr/local/bin/task", "/usr/local/bin/task"]

# PNPM is required to build the assets
RUN corepack enable pnpm
RUN mkdir -p /build/ui
WORKDIR /build

COPY ui/ ui/
RUN cd ui && pnpm install && pnpm run build

FROM golang:1.23-bookworm AS builder
WORKDIR /build

COPY go.mod go.sum ./
RUN go mod download && go mod verify

COPY --from=node ["/build/ui/dist", "/build/ui/dist"]

RUN apt-get install git -y

COPY . .

RUN go build  \
    -ldflags="-s -w" \
    -o app ./cmd/pb

FROM debian:bookworm-slim

ENV NODE_ENV=production
ENV DB_PATH=/pb_data/data.db
ENV AUX_PATH=/pb_data/auxiliary.db
ARG NODE_ENV=$NODE_ENV
ARG DB_PATH=$DB_PATH
ARG AUX_PATH=$AUX_PATH

COPY --from=builder ["/build/entrypoint", "/usr/bin/entrypoint"]
COPY --from=builder ["/build/app", "app"]

RUN apt-get update \
    && apt-get install ca-certificates curl vim sqlite3 -y \
    && apt-get clean && \
    chmod +x /usr/bin/entrypoint

ENTRYPOINT ["/usr/bin/entrypoint"]