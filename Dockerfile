FROM node:13-alpine
WORKDIR /usr/src/app
COPY . .
EXPOSE 3003
CMD ["node", "production_server"]