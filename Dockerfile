FROM node:12.2.0-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json /usr/src/app/package.json
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent
COPY . /usr/src/app

EXPOSE 3000
CMD ["npm", "start"]
