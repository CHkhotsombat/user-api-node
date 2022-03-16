FROM node:12-alpine

WORKDIR '/app'

COPY package.json ./
EXPOSE 35000

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
