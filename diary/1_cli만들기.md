1. Create React app의 구조 감잡아보기
https://www.twilio.com/blog/how-to-build-a-cli-with-node-js

facebook의 create-react-app을 클론해와서 v0.1.0로 이동해보면 package.json에 
```
 "scripts": {
    "start": "node scripts/start.js --debug-template",
    "build": "node scripts/build.js --debug-template",
    "create-react-app": "node global-cli/index.js --scripts-version \"$PWD/`npm pack`\""
  },
```
이렇게 세가지 명령어가 있다. 일단 npm create-react-app 하면 global-cli 폴더내의 index.js 가 실행된다. 


index.js를 살펴보면

```
createApp(commands[0], argv.verbose, argv['scripts-version']);

function createApp(name, verbose, version) {
  if (fs.existsSync(name)) {
    console.log('The directory `' + name + '` already exists. Aborting.');
    process.exit(1);
  }

  var root = path.resolve(name);
  var appName = path.basename(root);

  console.log(
    'Creating a new React app in ' + root + '.'
  );
  console.log();

  fs.mkdirSync(root);

  var packageJson = {
    name: appName,
    version: '0.0.1',
    private: true,
  };
  fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify(packageJson));
  process.chdir(root);

  console.log('Installing packages. This might take a couple minutes.');
  console.log('Installing react-scripts from npm...');

  run(root, appName, version, verbose);
}
```

인 코드를 볼수있는데, create-react-app 명령어가 실행되면 노드의 fs모듈을 통해 파일을 조작하는 것을 볼수 있따. 
여기서는 pacakge.json 파일을 생성하고 있다. 


그래서 내 예상은 이런식으로 패키지를 구성해서 npx create-react-app하면 뙇 하고 한번 에 짜자잔!! 다 생기도록 구성을 해놓은 것 같다. 



2. create-react-app이 진짜 하는 일
https://levelup.gitconnected.com/what-does-create-react-app-actually-do-73c899443d61


3. cli 만드는 방법
- https://www.twilio.com/blog/how-to-build-a-cli-with-node-js
- https://www.popit.kr/%EB%82%98%EB%A7%8C%EC%9D%98-cli-%EB%A7%8C%EB%93%A4%EA%B8%B0/


4. create-hayoung-app cli로 pacakage.json 파일이 생성되고 그안에 내가 원하는 내용이 들어갈 수 있도록 만들어보기!!


5. cli를 통해서 templates에 있는 파일들이랑 package.json파일이 생기도록 하기

cli 되고나서 -> react 구성하는 방법 파악하고나서 -> 나만의 리액트 구성한 패키지를 만들어가지고 cli로 한번에 다 구성되도록 만들기(진짜 create-react-app처럼 안보이게 안에 숨기는건 너무 어려울듯) ->  어떻게 babel, webpack설정까지 다 되게 할수잇을지?


6. steps(https://www.twilio.com/blog/how-to-build-a-cli-with-node-js 이거 따라하는 중!)
- `npm init` 

bin 속성 뭐야? https://programmingsummaries.tistory.com/385

bin이라는게 추가되어있어야 global 옵션으로 설치 되었을때 어떤 커맨드를 입력하면 이 애플리케이션이 실행될지 지정
https://programmingsummaries.tistory.com/400


- `npm link`
npm link : This will globally install a symlink linking to your current project so there's no need for you to re-run this when we update our code. After running npm link you should have your CLI commands available. Try running:

https://docs.npmjs.com/cli/link.html

`"postinstall": "cd global-cli && npm install"`

-> npm rm --global foo , npm ls --global foo, npm ls --global --depth 0 , 아니면 진짜 위치가서 지우는게 빠름

- 중첩 구조
https://stackoverflow.com/questions/31773546/the-best-way-to-run-npm-install-for-nested-folders


- node 에서 cli에서 argument처리
https://yogicat.dev/2019/04/cli-with-meow.html

- fs 모듈 사용
https://nodejs.org/api/fs.html#fs_fs_existssync_path


- path module
https://nodejs.org/api/path.html#path_path_resolve_paths

[한국어설명](https://www.hanumoka.net/2018/11/08/node-20181108-node-path-join-vs-resolve/)


7. create-hayoung-app 하면 폴더생기고 안에 package.json파일이 있다!!