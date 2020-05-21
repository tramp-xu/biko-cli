'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _logSymbols = require('log-symbols');

var _logSymbols2 = _interopRequireDefault(_logSymbols);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _downloadGitRepo = require('download-git-repo');

var _downloadGitRepo2 = _interopRequireDefault(_downloadGitRepo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 文件是否存在
let notExistFold = async name => {
  return new Promise(resolve => {
    if (_fs2.default.existsSync(name)) {
      console.log(_logSymbols2.default.error, _chalk2.default.red('文件夹名已被占用，请更换名字重新创建'));
    } else {
      resolve();
    }
  });
};

// 询问用户
const prompList = [{
  type: 'list',
  name: 'frame',
  message: '请选择框架',
  choices: ['Vue', 'React']
}, {
  type: 'list',
  name: 'platform',
  message: '请选择平台',
  choices: ['PC', 'Mobile'],
  when: answer => {
    return answer.frame === 'Vue';
  }
}, {
  type: 'list',
  name: 'platform',
  message: '请选择平台',
  choices: ['PC'],
  when: answer => {
    return answer.frame === 'React';
  }
}, {
  type: 'input',
  name: 'description',
  message: 'Please enter the project description: '
}, {
  type: 'input',
  name: 'author',
  message: 'Please enter the author name: '
}];

let prompt = () => {
  return new Promise(resolve => {
    _inquirer2.default.prompt(prompList).then(answer => {
      resolve(answer);
    });
  });
};

// 项目模板远程下载
let downloadTemplate = async (ProjectName, api) => {
  return new Promise((resolve, reject) => {
    (0, _downloadGitRepo2.default)(api, ProjectName, { clone: true }, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

// 更新json配置文件
let updateJsonFile = (fileName, obj) => {

  return new Promise(resolve => {
    if (_fs2.default.existsSync(fileName)) {
      const data = _fs2.default.readFileSync(fileName).toString();
      let json = JSON.parse(data);
      Object.keys(obj).forEach(key => {
        json[key] = obj[key];
      });
      _fs2.default.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');
      resolve();
    }
  });
};

// 更新 readme 配置文件
let updateReadmeFile = fileName => {
  return new Promise(resolve => {
    if (_fs2.default.existsSync(fileName)) {
      _fs2.default.appendFileSync(fileName, 'ceshiyix\r\n ## ddsad');
      resolve();
    }
  });
};

module.exports = {
  notExistFold,
  prompt,
  downloadTemplate,
  updateJsonFile,
  updateReadmeFile
};