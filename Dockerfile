FROM        node:14.19.3-alpine as builder

RUN         mkdir /srv/forumi/
WORKDIR     /srv/forumi/
COPY        package.json /srv/forumi/

RUN         yarn install --production

COPY        .babelrc /srv/forumi/
COPY        .eslintrc.cjs /srv/forumi/
COPY        app.js /srv/forumi/
COPY        adapters /srv/forumi/adapters/
COPY        application /srv/forumi/application/
COPY        config /srv/forumi/config/
COPY        frameworks /srv/forumi/frameworks/

RUN         yarn run build

FROM        node:14.19.3-alpine


ENV         HTTP_MODE http
ARG         NODE_PROCESSES=2
ENV         NODE_PROCESSES=$NODE_PROCESSES

# Install pm2
RUN         npm install -g pm2
RUN         npm install dotenv dotenv-cli

# Copy over code
WORKDIR     /srv/api/

COPY        --from=builder /srv/forumi/build /srv/api/build
COPY        --from=builder /srv/forumi/package.json /srv/api/package.json

RUN         deluser --remove-home node \
            && addgroup -S node -g 9999 \
            && adduser -S -G node -u 9999 node

USER        node

EXPOSE 3000
CMD         ["npm", "run", "start"]
