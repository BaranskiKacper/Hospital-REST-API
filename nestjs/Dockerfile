FROM node:18.15.0-alpine3.17

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

CMD [ "npm", "run", "start" ]
