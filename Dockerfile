FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g @angular/cli @angular-devkit/build-angular && npm install

EXPOSE 4201

CMD ["npm", "start"]