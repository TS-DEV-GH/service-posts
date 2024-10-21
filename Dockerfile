FROM node:20-alpine

WORKDIR /home/node/app

EXPOSE 4000:4000

COPY src ./src
COPY package.json ./package.json
COPY tsconfig.json ./tsconfig.json

RUN npm i

CMD npm run $([ $NODE_ENV = 'production' ] && echo 'start' || echo 'dev')
