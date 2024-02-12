FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM alpine:latest
WORKDIR /usr/src/app
COPY --from=0 /usr/src/app/build /usr/src/app/build
CMD ["npm", "run", "dev"]