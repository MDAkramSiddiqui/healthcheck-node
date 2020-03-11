FROM node:alpine

RUN mkdir -p /doc/src/app

WORKDIR /doc/src/app

COPY . .

RUN yarn install

CMD ["node", "index.js"]

