### 도커를 사용하는 이유

- 프로그램을 내려받는 과정을 간단하게 만들기 위해서 
- 프로그램 설치시 서버, 패키지 버전, 운영체제 등에 따라 다양한 에러 발생
- 설치 과정 복잡 

### 도커에서의 컨테이너

- 프로그램과 실행환경을 추상화하여 컨테이너에 담고 동일한 인터페이스를 제공하여 프로그램 배포 및 관리를 단순하게 해준다 
- 컨테이너의 개념이 물건을 운송하는 역할 처럼 손쉽게 이동 배포 관리를 할 수 있게 한다 

-  코드와 모든 종속성을 패키지화 하여 프로그램이 한 컴퓨팅 환경에서 다른 컴퓨팅 환경으로 빠르고 안정적으로 실행되도록 하는 소프트웨어의 표준 단위이다

### 컨테이너 이미지

- 코드, 런타임, 시스템 도구, 시스템 라이브러리 및 설정과 같은 응용 프로그램을 실행하는 데 필요한 모든 것을 포함하는 가볍고 독립적이며 실행 가능한 소프트웨어 패키지

- 런타임에 컨테이너를 생성하고 도커 컨테이너의 경우 도커 엔진에서 실행될 때 이미지가 컨테이너가 된다 
- 도커 컨테이너는 도커 이미지의 인스턴스이며 도커 이미지는 응용 프로그램 실행에 필요한 설정과 종속성을 모두 가진다 

### 도커 사용할 때 흐름

```bash
$ docker run hello-world

Hello from Docker!
This message shows that your installation appears to be working correctly.    

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.     
    (amd64)
 3. The Docker daemon created a new container from that image which runs the  
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:        
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```

### 도커와 기존 가상화 기술의 차이점

- 가상화 이전 방식
  - 한 서버를 한 용도로 사용
  - 남은 서버 공간 방치 및 낭비

- 하이퍼바이저 기반의 가상화 기술
  - 공간을 분할하여 가상 머신이라는 독립적인 가상 환경에서 서버를 이용하는 기술
  - 한 서버가 한 용도로 사용했던 비효율적인 부분 해결
  - 호스트 시스템에서 게스트 운영체제들을 구동할 수 있게 함
  - 하드웨어를 가상화하면서 하드웨어와 각 가상머신들을 모니터링하는 중간 관리자 

#### 공통점

도커 컨테이너와 가상 머신은 기본 하드웨어에서 격리된 환경 내에 애플리케이션을 배치하는 방법이다

#### 차이점

격리된 환경을 얼마나 격리 시켰는지 

- 가상 머신과 비교했을 때 컨테이너는 하이퍼 바이저와 게스트 OS 가 필요하지 않으므로 더 가볍다
- 어플리케이션 실행시 컨테이너 방식에서 호스트 OS 위에서 애플리케이션의 실행 패키지인 



**도커 컨테이너에서 구동되는 애플리케이션은 컨테이너가 제공하는 격리 기능 내부에 샌드박스가 존재한다 여전히 같은 호스트의 다른 컨테이너와 동일한 커널을 공유한다. 결과적으로 컨테이너 내부에서 실행되는 프로세스는 호스트 시스템에서 볼 수 있다**. **컨테이너가 전체 OS를 내장할 필요가 없어 컨테이너가 가볍고 용량이 매우 작다**

가상 머신과 가상 머신 내부에서 실행되는 모든 것은 호스트 운영체제나 하이퍼바이저와 독립되어 있다. 게스트 OS, 하이퍼바이저가 았어서 매우 오버헤드가 크다. 사용방법은 간단하지만 굉장히 느리다



### Cgroup과 네임스페이스

- 컨테이너와 호스트에서 실행되는 다른 포스세스 사이에 벽을 만드는 리눅스 커널 기능들

#### Cgroup

CPU, 메모리, 네트워크 bandwidth, HD I/O 등 프로세스 그룹의 시스템 리소스 사용량을 관리한다. 어떤 애플리케이션 사용량이 많다면 그 애플리케이션을 Cgroup 에 배치하여  CPU,  메모리 사용량을 제한한다 

#### 네임스페이스

한 시스템에서 프로세스를 격리시킬 수 있는 가상화 기술, 격리된 환경을 제공하는 경량 프로세스 가상화 기술 
