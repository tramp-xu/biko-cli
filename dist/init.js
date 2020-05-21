'use strict';

var _logSymbols = require('log-symbols');

var _logSymbols2 = _interopRequireDefault(_logSymbols);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _util = require('./util.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const util = require("util");
const exec = util.promisify(require("child_process").exec); // 执行命令


let loadCmd = async (cmd, text) => {
  let loading = (0, _ora2.default)();
  loading.start(`${text}: 命令执行中...`);
  await exec(cmd);
  loading.succeed(`${text}: 命令执行完成`);
};

let init = async (username, token) => {
  try {
    await loadCmd('git init', 'git初始化');
    if (username === '' || token === '') {
      console.log(_logSymbols2.default.warning, _chalk2.default.yellow('缺少入参无法创建远端仓库'));
    } else {
      const projectName = process.cwd().split('/').slice(-1)[0];
      // curl -u username:password url 使用命令行链接网络
      await loadCmd(`curl -u "${username}:${token}" https://api.github.com/user/repos -d '{"name": "${projectName}"}'`, 'Github仓库创建');
      await loadCmd(`git remote add origin https://github.com/${username}/${projectName}.git`, '关联远端仓库');
      let loading = (0, _ora2.default)();
      loading.start(`package.json更新repository: 命令执行完成`);
      await (0, _util.updateJsonFile)('package.json', {
        "repository": {
          "type": "git",
          "url": `https://gihub.com/${username}/${projectName}.git`
        }
      }).then(() => {
        loading.succeed(`package.json更新respositoty: 命令执行完成`);
      });
      await loadCmd(`git add .`, '执行git add');
      await loadCmd(`git commit -a -m 'init'`, '执行git commit');
      await loadCmd(`git push --set-upstream origin master`, '执行git push');
    }
    await loadCmd(`npm install`, '安装依赖');
  } catch (error) {
    console.log(_logSymbols2.default.error, _chalk2.default.red('初始化失败'));
    console.log(_logSymbols2.default.error, _chalk2.default.red(err));
    process.exit(1);
  }
};

module.exports = init;