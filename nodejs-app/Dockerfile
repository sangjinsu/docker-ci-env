FROM node:16.13.1

WORKDIR /usr/src/app

COPY package.json ./

# 도커 이미지 생성 전 수행할 셸 명령어 
RUN npm install

COPY ./ ./

CMD [ "node", "server.js"]