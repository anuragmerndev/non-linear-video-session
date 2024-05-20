FROM node:20-alpine

WORKDIR /usr/src/app

COPY package* .

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 8081

CMD [ "npm", "run", "start:prod" ]