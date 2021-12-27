## 도커를 이용한 간단한 Node.js 애플리케이션 만들기

```dockerfile
FROM node:16.13.1

WORKDIR /usr/src/app

# package.json server.js 파일 복사 
COPY ./ ./

# 도커 이미지 생성 전 수행할 셸 명령어 
RUN npm install

CMD [ "node", "server.js"]
```

#### 생성한 이미지로 앱 실행시 접근이 안되는 이유

```bash
$ docker run -p 50001:8080 sangjinsu/node-app
```

- 로컬 호스트 포트 : 컨테이너 속 포트 

- 네트워크도 로컬 호스트의 네트워크를 컨테이너 내부에 있는 네트워크와 연결해야 한다 

#### 작업 디렉터리 명시하기

```dockerfile
WORKDIR /usr/src/app
```

- 도커 파일에서 뒤에 오는 모든 지시자에 대한 작업 디렉터리를 설정합니다.
- 리눅스 명려어의 cd 와 비슷한 역할을 합니다 
- WORKDIR 지시자를 사용해 작업 디렉터리를 별도로 지정하면 로컬에 있는 파일들이 도커 컨테이너로 복사될 때 WORLDIR 지시자에 정의한 디렉터리로 들어갑니다

- 원래 최상위 폴더 안에 들어있던 파일 및 폴더 이름이 COPY 지시자로 복하한 파일 및 폴더 이름과 같다면 원래 있던 파일을 덮어쓴다
- 모든 파일이 한 디렉터리에 있으면 정리전돈이 되지 않아 복잡하다 

#### 애플리케이션 소스 변경으로 다시 빌드할 때의 문제점

- 도커 환경 실행 순서
  1. 도커 파일 작성
  2. 도커 파일로 도커 이미지 작성
  3. 도커 이미지로 컨테이너 생성 후 앱 실행

####  문제점

- 소스 코드만 변경하고 종속성은 전혀 수정하지 않아 종속성을 다시 내려 받으면 큰 리소스 손실이다 
- 소스 코드를 변경하고 도커 이미지 재생성, 컨테이너 재실행하는 과정이 번거롭다

#### <u>**소스 코드 변경시 이미지 효율적으로 다시 빌드하기**</u>

```dockerfile
FROM node:16.13.1

WORKDIR /usr/src/app

COPY package.json ./

# 도커 이미지 생성 전 수행할 셸 명령어 
RUN npm install

COPY ./ ./

CMD [ "node", "server.js"]
```

- npm install 로 모듈을 설치하는 과정에서 불필요한 다운로드를 피하기 위해서 COPY 지시자 부분 변경

- **<u>COPY 를 RUN 전후로 나눴다. 코드를 변경하면 종속성을 내려받을 때 Run npm install 전 단계의 COPY에서 조금이라도 변화가 있다면 npm install을 다시 내려받고 없다면 캐시를 이용해 이 과정을 생략한다</u>**

-v %cd%:/usr/src/app

### Docker volume

- 아직도 코드 변경시 변경 소스 코드를 복사하고 다시 이미지를 빌드하고 컨테이너를 다시 실행해야 하는 번거로움이 있다 

- COPY 지시자는 로컬 호스트의 디렉터리에 있는 파일을 도커 컨테이너로 그대로 복사하는 방식입니다.
- 도커 볼륨은 도커 컨테이너에서 호스트 디렉터리에 있는 파일들을 참조해서 사용하는 방식입니다 

```powershell
$ docker run -d -p 5000:8080 -v /usr/src/app/node_modules -v ${pwd}:/usr/src/app sangjinsu/node-app # powershell
```

- `-v /usr/src/app/node_modules` 
  - 도커 볼륨은 컨테이너에서 호스트 디렉터리를 참조하는데, 참조하면 안되는 부분이 있다. 바로 node_modules 폴더이다 
  - node_modules 폴더는 컨테이너에 있지만 호스트 디렉터리에는 없습니다 



