# syntax=docker/dockerfile:1.4

FROM node:lts AS development

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

WORKDIR /code

ARG PORT=80
ENV PORT=$PORT
EXPOSE $PORT 9229 9230

COPY package*.json ./
RUN npm ci

HEALTHCHECK --interval=30s CMD node healthcheck.js

COPY . .

CMD ["node", "src/index.js"]

# optional dev stage for VS Code remote containers
FROM development as dev-envs
RUN apt-get update && apt-get install -y --no-install-recommends git \
  && rm -rf /var/lib/apt/lists/*

RUN useradd -s /bin/bash -m vscode \
  && groupadd docker \
  && usermod -aG docker vscode

# if you want Docker CLI available, add:
FROM docker:27.3.1-cli AS docker-cli
FROM dev-envs
COPY --from=docker-cli /usr/local/bin/docker /usr/local/bin/
