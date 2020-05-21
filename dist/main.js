'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _create = require('./create');

var _create2 = _interopRequireDefault(_create);

var _init = require('./init');

var _init2 = _interopRequireDefault(_init);

var _dev = require('./dev');

var _dev2 = _interopRequireDefault(_dev);

var _build = require('./build');

var _build2 = _interopRequireDefault(_build);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//项目打包

// 命令行列表

// 项目初始化
let actionMap = {
  // 项目创建
  create: {
    description: '创建一个新的项目',
    usages: ['biko-cli create ProjectName', 'bkc create ProjectName'],
    alias: 'c'
  },
  // 项目初始化
  init: {
    description: '项目初始化',
    usages: ['biko-cli init', 'bkc init'],
    alias: 'i'
  },

  dev: {
    description: '本地启动项目',
    usages: ['biko-cli dev', 'bkc dev'],
    options: [{
      flags: '-p --port <port>',
      description: '端口',
      defaultValue: 3000
    }],
    alias: 'd'
  },

  build: {
    description: '服务端项目打包',
    usages: ['biko-cli build', 'bkc build'],
    options: [{
      flags: '-u --username <port>',
      description: 'github用户名',
      defaultValue: ''
    }, {
      flags: '-t --token <port>',
      description: 'github创建token',
      defaultValue: ''
    }],
    alias: 'b'
  }
}; // 项目启动
// 项目创建


Object.keys(actionMap).forEach(action => {
  if (actionMap[action].options) {
    Object.keys(actionMap[action].options).forEach(option => {
      let obj = actionMap[action].options[option];
      _commander2.default.option(obj.flags, obj.description, obj.defaultValue);
    });
  }

  _commander2.default.command(action).description(actionMap[action].description).alias(actionMap[action].alias).action(() => {
    switch (action) {
      case 'create':
        (0, _create2.default)(...process.argv.slice(3));
        break;
      case 'init':
        (0, _init2.default)(_commander2.default.username, _commander2.default.token);
        break;
      case 'dev':
        (0, _dev2.default)(_commander2.default.port);
        break;
      case 'build':
        (0, _build2.default)();
        break;
      default:
        break;
    }
  });
});

_commander2.default.version(require('../package.json').version, '-v --version').parse(process.argv);

if (!process.argv.slice(2).length) {
  _commander2.default.outputHelp();
}