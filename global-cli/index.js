var fs = require('fs');
var path = require('path');

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

const createApp = (name) => {
    // fs의 sync 인것들 그냥 사용!!
    if(fs.existsSync(name)){
        console.log('The directory `' + name + '` already exists. Aborting.');
        process.exit(1);
    }

    const root = path.resolve(name);
    fs.mkdirSync(root);
    const packageJson = {
        name: name,
        version: '0.0.1',
        description: 'app from create-hayoug-app',
        private: true,
    };

    fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify(packageJson));

    console.log("made pacakage.json!!");
}

module.exports = { 
    cliInit
}