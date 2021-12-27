### 작동 순서

1. 도커 클라이언트에 명령어 입력후 도커 서버로 보냄
2. 도커 서버에서 컨테이너를 위한 이미지가 캐쉬에 이미 존재하는지 확인
3. 없으면 도커 허브에서 다운 받아온다. 존재하면 이미지 컨테이너 생성

### 이미지 컨테이너 생성 순서

1. 파일 스냅샨을 컨테이너 하드 디스크에 업로드한다
2. 시작 명령어를 사용하여 어플리케이션을 실행한다

### 도커 이미지 내부 파일 구조 보기

```bash
docker run 이미지 이름 ls
```

- 네번째 자리는 이미지 기본 시작 명령어 대신 실행할 명령어이다

모든 도커 이미지에서 ls 명령어를 실행할수 있는 것은 아니다

alpine 이미지의 파일 스냅숏 안에 ls 명령어를 사용할 수 있는 파일이 들어있기 때문이다

### 컨테이너 나열하기

#### 현재 실행 중인 컨테이너 나열

```bash
docker ps

CONTAINER ID   IMAGE     COMMAND             CREATED              STATUS              PORTS     NAMES
3abd71d843b6   alpine    "ping google.com"   About a minute ago   Up About a minute
       vigorous_mirzakhani
```

### 컨테이너 나열시 원하는 항목 만 보기

```bash
docker ps --format 'table {{.Names}} \t table {{.Image}}'

NAMES                   table IMAGE
vigorous_mirzakhani     table alpine
```

### 모든 컨테이너 나열

```bash
docekr ps -a
```

### 도커 컨테이너의 생성과 실행

#### 도커 컨테이너 생명 주기

1. 생성 create
2. 시작 start
3. 실행 run
4. 중지 stop
5. 삭제 rm

### docker run

= docker create + docker start

- create : 파일 스냅숏이 도커 컨테이너의 하드디스크로 다운로드된다
- start: 도커 이미지 안에 있던 시작 시 실행할 명령어가 컨테이너 안에서 작동되면서 hello-world 애플리케이션이 실행된다
  - -a (attatch) : 컨테이너를 실행한 후에 표준 입력, 표준 출력, 표준 에러를 가능하게 하며, 프로그램으로 입력 받은 내용을 터미널에 보여주는 역할을 한다

### docker stop and kill

- stop

  우아하게 컨테이너 중지

  그동안 하던 작업들을 마치고 컨테이너를 중지시킨다 (메시지를 보내고 있었다면 모두 전송한 뒤 중지한다)

- kill

  어떠한 것도 기다리지 않고 즉시 컨테이너를 중지시킨다

### docker rm

- 도커 컨테이너 삭제

- 중지된 모든 컨테이너 삭제

  ```bash
  docker rm `docker ps -a -q`
  ```

- 도커 이미지 삭제

  ```bash
  docker images

  docker rmi 이미지
  ```

- 한번에 컨테이너, 이미지, 네트워크 모두 삭제

  ```bash
  docker system prune
  ```

  - 도커 사용하지 않을 때 모두 정리하고 싶을 때 사용
  - 실행 중인 컨테이너에 영향을 주지 않음

### 실행중인 컨테이너에 명령어 전달

#### docker exec 컨테이너 아이디

- `docker run` 명령어와 차이점은 run 은 새로운 컨테이너를 만들고 명령어를 실행하고 exec 명령어는 이미 실행중인 컨테이너에 명령어를 전달한다는 점이 다르다

### 레디스를 이용한 컨테이너 이해

```bash
docker run redis
docker exec -it container id redis-cli
```

- `-it` : i interactive 옵션과 t terminal 옵션이 합쳐진 옵션
  - 해당 옵션을 붙어야 명령어를 적을 수 있다
  - 없다면 그냥 redis-cli를 키기만 하고 밖으로 다시 나온다

### 실행 중인 컨테이너에 쉘 환경 접속하기

```bash
docker exec -it 컨테이너 아이디 sh (bash, zsh, powershell)
```

- 쉘이나 터미널 환경에 접속

- 쉘 환경에서 나오기 `ctrl + D`
