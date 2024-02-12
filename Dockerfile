# FROM node:16

# WORKDIR /usr/src/app

# COPY package*.json ./
# RUN npm install

# COPY . .

# RUN npm run build

# FROM alpine:latest
# WORKDIR /usr/src/app
# COPY --from=0 /usr/src/app/build /usr/src/app/build
# CMD ["npm", "run", "dev"]


FROM node:16

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . ./

# start app
CMD ["npm", "run", "dev"]