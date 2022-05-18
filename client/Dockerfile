FROM node:17.3.0-alpine

WORKDIR /client

COPY package.json /client
RUN cd /client && npm install
RUN apk --no-cache add curl

COPY . .
EXPOSE 3000