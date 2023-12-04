FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT = 3002
ENV MODE = "development"

EXPOSE 3002

CMD [ "npm", "start" ]