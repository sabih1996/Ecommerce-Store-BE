FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env .env

RUN npm run build

EXPOSE 3002

CMD ["npm", "run", "start:dev"]
