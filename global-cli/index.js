var fs = require('fs-extra');
var path = require('path');
var spawn = require('cross-spawn');

const cliInit = (argv) => {
    const commands = argv.slice(2);
    if (commands.length === 0) {
        console.error(
          '사용법: create-hayoung-app <project-directory> [--verbose]'
        );
        process.exit(1);
    }

    createApp(commands[0]);
}

const createApp = (appName) => {
    // fs의 sync 인것들 그냥 사용!!
    if(fs.existsSync(appName)){
        console.log('The directory `' + appName + '` already exists. Aborting.');
        process.exit(1);
    }

    const root = path.resolve(appName);
    fs.mkdirSync(root);
    const packageJson = {
        name: appName,
        version: '0.0.1',
        description: 'app from create-hayoug-app',
        private: true,
    };

    fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify(packageJson));
    console.log("made pacakage.json!!");

    process.chdir(root); // root안으로 이동
    // TODO - fix here run not working
    run(root, appName); 
}

const run = (root, appName) =>{
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
}

const getHayoungTemplate = (root, appName) => {
    // root: where it is currently running
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

    const args = [
        'install'
    ]
    const proc = spawn('npm', args, {stdio: 'inherit'}); // process실행
    proc.on('close', function(code) {
        if(code != 0){
            console.log("npm error!");
        } else {
            console.log("done!!");
        }
    })

    const targetFolder = path.join(__dirname, '..', './templates');
    fs.copySync(targetFolder, path.join(root));
}

module.exports = { 
    cliInit
}