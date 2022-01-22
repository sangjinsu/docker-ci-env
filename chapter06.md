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

```bash
$ docker build -f Dockerfile.dev  ./
```

```bash
$ docker run -it -p 3000:3000 sangjinsu/docker-react-app
```

```bash
$ docker run -it -p 3000:3000 -v /usr/src/app/node_modules -v $(pwd):/usr/src/app sangjinsu/docker-react-app
```



### 도커 컴포즈를 이용해 애플리케이션 실행하기

```bash
$ docker-compose up --build
```

#### 개발 환경 버전

```bash
$ docker-compose -f docker-compose-dev.yml up --build
```



## 리액트 애플리케이션 테스트하기

```bash
$ docker run -it sangjinsu/docker-react-app npm run test
```

```bash
$ docker-compose -f docker-compose-dev.yml up --build
```

```yaml
version: '3'

services:
  react:
    build: 
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - /usr/src/app/node_modules
      - ./:/usr/src/app
    stdin_open: true   

  tests:
    build: 
      context: .
      dockerfile: Dockerfile.dev
    volumes:
      - /usr/src/app/node_modules
      - ./:/usr/src/app
    command: ["npm", "run", "test"]
```



## 운영 환경의 도커 이미지를 위한 도커 파일 작성하기 

```dockerfile
FROM node:alpine as builder 

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY ./ ./

RUN npm run build

FROM nginx

COPY --from=builder /usr/src/app/build /usr/share/nginx/html

```



## 운영 환경의 도커 컴포즈 파일 작성하기 

```yaml
version: '3'

services:
  react:
    build: 
      context: .
      dockerfile: Dockerfile
    ports:
      - '8080:80'
    volumes:
      - /usr/src/app/node_modules
      - ./:/usr/src/app
    stdin_open: true   
```



