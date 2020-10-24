# Create-Hayoung-App
[React](https://github.com/facebook/react)를 사용하면서 항상 create-react-app을 통해서 리액트 프로젝트의 환경을 설정해왔습니다. 그런데 어느날 cra가 어떻게 동작하는 것인지 궁금해져서 [create-react-app](https://github.com/facebook/create-react-app) 의 가장 초기 브랜치(v0.1.0)를 기준으로 어떻게 cra명령어로 환경설정을 할 수 있도록 구조화 되어있는지 파악해봤습니다. 

## 사용방법
1. npm install  -g create-hayoung-app 
    * global하게 설치해서 사용할 수 있습니다. 
    `create-hayoung-app appName` 이라는 명령을 통해 제가 만든 탬플릿대로 react초기세팅이 되어있는 프로젝트를 시작하실 수 있습니다. 

   * 실제 create-react-app도 전역설치해서 사용함 https://eunvanz.github.io/react/2018/06/05/React-create-react-app%EC%9C%BC%EB%A1%9C-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0/
  
2. npx create-hayoung-app appName
   * npx 명령을 통해 패키지 설치없이 제가 설정한 템플릿대로 프로젝트를 생성해 보실 수 있습니다. 


3. 1또는 2의 템플릿은 현재는 [React-Hayoung-Template](https://github.com/I-am-interested-in-Javascript/React-Hayoung-Template) 리포지토리의 내용을 참고해서 생성했습니다. 리액트 프로젝트 초기세팅에 대해서 더욱 공부한 후에 추후에 create-hayoung-app 패키지도 업데이트 하고자합니다(하지만 언제 할지는 몰라요!)


4. 해당 앱으로 이동하면 개발 모드 또는 프로덕션 모드로 빌드를 하실 수 있습니다. 
    * package.json으로 이동하시면 npm run을 통해서 실행할 수 있는 스크립트 명령어가 두가지 있습니다.(공식적으로 이걸 어떻게 부르는지는 잘 모르겠네요...! 여튼 scripts부분에 있는 것들은 npm run start 이런식으로 명령하면 실행할 수 있습니다. ) 
    ```
    "start": "webpack serve --mode development --open --hot",
    "build": "webpack --mode production"
    ```
    
    * npm run start를 하시면 개발모드로 react 프로젝트를 시작하실 수 있습니다. 

    * npm run build를 하시면 dist폴더내에 번들된 js파일이 생성되는 것을 확인하실 수 있습니다. 


5. [create-hayoung-app 리포지토리](https://github.com/hayoung0Lee/Create-Hayoung-App) 에 오시면 diary폴더 내에 제가 이 프로젝트를 하면서 이것저것 메모 해놓은 것들도 보실 수 있습니다. 


## 프로젝트 구조 설명
1. root의 package.json의 역할
    ```
    "bin": {
        "create-hayoung-app": "./bin/create-hayoung-app.js"
    },
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "postinstall": "cd global-cli && npm install",
        "create-hayoung-app": "node bin/create-hayoung-app.js "
    },
    ```

    * [bin의 역할](https://programmingsummaries.tistory.com/385)
      * 이 부분이 이번에 공부하면서 가장 감명깊었던 내용이다. 위의 링크의 내용을 요약하자면, 실행할 수 있는 패키지를 만들기 위해서 bin을 사용한다. bin 안에 "create-hayoung-app": "./bin/create-hayoung-app.js" 이렇게 설정하면 global로 설치하는 경우에는 npm이 글로벌에 설치한 후 해당 경로로 심볼릭 링크를 생성하고, 로컬에 설치하게 되면 node_modules폴더내에 .bin 폴더에 심볼릭 링크를 만든다. (사실 이부분은 좀더 공부를 해야 제대로 이해할 수 있을 것 같다!!)
      * link라는 것을 공부할 때 본 자료: 
        * `npm link`: This will globally install a symlink linking to your current project so there's no need for you to re-run this when we update our code. After running npm link you should have your CLI commands available. [참고한 글](https://docs.npmjs.com/cli/link.html)
        * npm ls --global 이걸 통해서 global symlink를 확인했다.(좀 100프로 이해하는 것은 아닌데, 나중에 더 공부해보고 제대로 이해하면 다시 글을 정리해야겠다.)



    * scripts의 역할
      * postinstall을 사용한 이유: npm install했을때 global-cli안의 package.json에 설정되어있는 패키지들도 설치할 수 있도록 하기 위해서 사용했습니다. [참고한 글](https://docs.npmjs.com/cli/link.html)

2. [npmignore의 역할 vs gitignore의 역할](https://blog.utopian.dev/npm/npmignore-vs-gitignore-which-one-to-use/)
    npm은 publish할 때 npmignore가 없으면 gitignore를 참고해서 해당 파일을 무시하고 publish하지않는다. 나는 diary의 내용은 내 리포에는 올리고 싶어서 gitignore파일에는 포함하지 않았고, npmignore는 포함해서 퍼블리시 되지않도록 했다. 


3. bin폴더의 역할   
    ```
    #!/usr/bin/env node
    // require = require('esm')(module /*, options*/);
    require('../global-cli/index').cliInit(process.argv);
    ```
    `#!/usr/bin/env node `이부분은 cli를 만들때 꼭 필요하다고 한다 이렇게 해야 글로벌 cli를 만들수 있다고 하는데 정확한 동작원리는 파악이 아직 어려웠다. 이 파일의 역할은 global-cli 폴더의 index파일에서 export해주는 cliInit이라는 함수를 실행한다. 

4. global-cli폴더의 역할
    * cliInit: npm create-hayoung-app appname 다음에 오는 arguments를 받는 곳이다. `const commands = argv.slice(2);` 를 통해 argv가 인수를 받아올 수 있다. 우리는 무조건 앱이름은 있어야해서 앱이름이 없으면 오류를 내고 프로세스를 종료하고, 성공적이면 createApp함수를 실행한다. 

    * createApp: 사용자가 넘겨준 앱이름을 이용해서 폴더를 생성하고(이미 존재하는 경우 에러를 내고 종료) 
        ```
        const packageJson = {
            name: appName,
            version: '0.0.1',
            description: 'app from create-hayoug-app',
            private: true,
        };
        fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify(packageJson));
        ``` 
        * packageJson이라는 객체를 생성하고 writeFileSync함수를 통해서 앱의 위치에 package.json이라는 이름으로 파일을 생성해준다. 

        * `process.chdir(root); // root안으로 이동` 을 통해서 chdir함수를 이용하면 프로세스의 위치를 쉽게 이동할 수 잇다. 

    * run: spawn - A cross platform solution to node's spawn and spawnSync(https://backback.tistory.com/362) - 을 통해서 npm install을 실행하는 곳이다. 
        ```
        const args = [
            'install'
        ]
        const proc = spawn('npm', args, {stdio: 'inherit'}); // process실행
        proc.on('close', function(code) {
            if(code != 0){
                console.log("npm error!");
            } else {
                getHayoungTemplate(root, appName)
            }
        })
        ``` 
        * install이라는 argument를 넘겨주고, npm install이 잘 실행되면 getHayoungTemplate함수를 실행한다. 

    * getHayoungTemplate
        ```
        const rootPackage= JSON.parse(fs.readFileSync(path.join(root, 'package.json'), {encoding: 'utf-8'}))
        
        rootPackage.main = "index.js";

        rootPackage.scripts = {};
        rootPackage.scripts["start"] = "webpack serve --mode development --open --hot";
        rootPackage.scripts["build"] = "webpack --mode production";

        rootPackage.dependencies = {}
        rootPackage.dependencies["react"] = "^16.14.0";
        rootPackage.dependencies["react-dom"] = "^16.14.0";
        
        rootPackage.devDependencies = {}
        rootPackage.devDependencies["babel-core"] = "^6.26.3";
        rootPackage.devDependencies["babel-loader"] = "^7.1.5";
        rootPackage.devDependencies["babel-preset-env"] = "^1.7.0";
        rootPackage.devDependencies["babel-preset-react"] = "^6.24.1";
        rootPackage.devDependencies["html-webpack-plugin"] = "^4.5.0";
        rootPackage.devDependencies["webpack"] = "^5.1.3" ;
        rootPackage.devDependencies["webpack-cli"] = "^4.1.0";
        rootPackage.devDependencies["webpack-dev-server"] = "^3.11.0";

        fs.writeFileSync(
            path.join(root, 'package.json'),
            JSON.stringify(rootPackage, null, 2)
        );
        ```
      * 위의 방식대로 루트에 우리가 생성했던 package.json을 읽어온다음 자바스크립트의 객체를 다루는 방식대로 우리가 원하는 내용을 써준다. 나는 scripts에 필요한 내용, 디펜던시 등을 작성했다. 그다은 spawn을 통해 npm install을 실행했다.

      * 그다음은 template 폴더만 복사하면 끝이다. 
  
5. template폴더의 역할
    ```
    const targetFolder = path.join(__dirname, '..', './templates');
    fs.copySync(targetFolder, path.join(root));
    ```
    * global-cli/index.js 파일의 getHayoungTemplate함수에서 위의 코드를 통해서 templates폴더의 파일들을 모두 복사해서 npm create-hayoung-app appname명령어가 실행되는 앱내에 templates내의 내용을 붙여 넣기 한다. 
    * __dirname을 통해서 index.js 파일이 있는 곳의 위치를 접근해서 templates폴더에 접근했다. root는 npm create-hayoung-app appname명령어가 실행되는 곳이기 때문에 copySync(a, b), 즉 경로 a의 파일을 b로 복사하는 명령어를 통해 templates의 파일들을 복붙해주었다. 
    

## 참고할 자료
- [facebook](https://github.com/facebook/create-react-app)
- [한국어 자료...!](https://medium.com/@_diana_lee/cra%EC%97%86%EC%9D%B4-%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0-feat-%EC%9B%B9%ED%8C%A9-%EB%B0%94%EB%B2%A8-74f5bc3c5da1)
- [리액트 공식 문서에서 추천해준 medium 글](https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658)