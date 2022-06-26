### STAGE 1: Build ###
FROM node:12.14-alpine AS build
WORKDIR /usr/src/app
COPY ./client-web-app/dislinkt-client/package.json ./client-web-app/dislinkt-client/package-lock.json ./
RUN npm install
COPY ./client-web-app/dislinkt-client/ .
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY ./client-web-app/dislinkt-client/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/dislinkt-client /usr/share/nginx/html

