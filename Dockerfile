FROM node:16.13.2-alpine as build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM alpine:latest
WORKDIR /app
COPY --from=build /app/build /app/build

CMD ["npm", "run", "serve"]