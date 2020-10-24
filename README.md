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

    * bin의 역할

    * scripts의 역할
      * postinstall을 사용한 이유: npm install했을때 global-cli안의 package.json에 설정되어있는 패키지들도 설치할 수 있도록 하기 위해서 사용했습니다. 

2. npmignore의 역할 vs gitignore의 역할

3. bin폴더의 역할

4. global-cli폴더의 역할

5. template폴더의 역할


## 참고할 자료
- [facebook](https://github.com/facebook/create-react-app)
- [한국어 자료...!](https://medium.com/@_diana_lee/cra%EC%97%86%EC%9D%B4-%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0-feat-%EC%9B%B9%ED%8C%A9-%EB%B0%94%EB%B2%A8-74f5bc3c5da1)
- [리액트 공식 문서에서 추천해준 medium 글](https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658)