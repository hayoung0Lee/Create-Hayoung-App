5. 웹팩 바벨 등 리액트의 설정들을 튜토리얼 블로그 자료
https://medium.com/@_diana_lee/cra%EC%97%86%EC%9D%B4-%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0-feat-%EC%9B%B9%ED%8C%A9-%EB%B0%94%EB%B2%A8-74f5bc3c5da1


내가 react-app 구성한다음 cli를 만들어서 패키지 다운로드 받으면될랑강?


* process 객체(브라우저에서 window같은거) - https://sollife.tistory.com/39
    * https://nodejs.org/api/process.html#process_process_chdir_directory
    * 현재 작업 디렉토리를 바꿀수있다. 

    * process.cwd() https://stackoverflow.com/questions/9874382/whats-the-difference-between-process-cwd-vs-dirname


* path모듈 사용법 파악하기
  - resolve, join 
  - https://www.hanumoka.net/2018/11/08/node-20181108-node-path-join-vs-resolve/

* var spawn = require('cross-spawn');
A cross platform solution to node's spawn and spawnSync.
https://backback.tistory.com/362
```
const args = [
    'install'
]
const proc = spawn('npm', args, {stdio: 'inherit'});
```
이렇게하면 npm install이 실행된다

* var fs = require('fs-extra');
같음
https://www.npmjs.com/package/fs-extra
