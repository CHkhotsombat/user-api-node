FROM node:12-alpine

WORKDIR '/app'

COPY package.json ./
EXPOSE 35000

RUN apk add --no-cache --update bash

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
