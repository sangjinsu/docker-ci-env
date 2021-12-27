# 도커 컴포즈

- 다중 컨테이너인 도커 애플리케이션을 정의하고 실행하기 위한 도구 

#### 레디스 

- 메모리 기반 키 - 갑 구조 데이터 관리 시스템

- 모든 데이터를 메모리에 저장하므로 빠르게 읽고 쓸 수 있으며, 비 관계형 데이터베이스 

- 하드디스크에 데이터를 저장하는 데이터베이스보다 훨신 빠르게 데이터를 저장하고 불러온다 

- 데이터를 메모리에 저장하지만 영속적으로 보관할 수 있다 

- 서버 재부팅 후에도 데이터를 유지한다 

  

```yaml
version: "3"
services:
  redis-server:
    image: "redis"
  compose-app:
    build: .
    ports:
      - "5000:8000"
```



#### 도커 컴포즈 실행 `docker-compose up`

#### 도커 컴포즈 백그라운드 실행 `docker-compose -d up`

#### 이미지를 다시 빌드하고 실행 `docker-compose up --build`

#### 도커 컴포즈 정지 `docker-compose stop`

#### 정지 후 삭제 `docker-compose down`

