FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["node", "BE-03/server.js"]