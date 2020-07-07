FROM node:latest

WORKDIR /app

RUN npm install -g  vue-cli

EXPOSE 8080

CMD ["npm", "run","dev"]