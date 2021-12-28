# 단일 컨테이너를 활용한 애플리케이션 개발하기

- Dockerfile.dev

  ```dockerfile
  FROM node:alpine
  
  WORKDIR /usr/src/app
  
  COPY package.json ./
  
  RUN npm install
  
  COPY ./ ./
  
  CMD [ "npm", "run", "start" ]
  
  ```

- `COPY package.json ./` 
  - 애플리케이션의 소스 코드 변경시 변경되지 않은 종속성까지 다시 내려가는 비효율적인 문제 해결

- `docker build -f Dockerfile.dev .`
  - 자동으로 도커 파일 찾지 못하는 경우 에러 발생
  - 강제로 지정해 주어야 함

- `node_modules` 로컬에서 삭제
  - COPY 로 다시 복사해 비효율적 