'use strict';

var _logSymbols = require('log-symbols');

var _logSymbols2 = _interopRequireDefault(_logSymbols);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let create = async ProjectName => {
  if (ProjectName === undefined) {
    console.log(_logSymbols2.default.error, _chalk2.default.red('创建项目的时候,请输入项目名'));
    // process.exit(1)
  } else {
    (0, _util.notExistFold)(ProjectName).then(() => {
      (0, _util.prompt)().then(answer => {
        // if (answer.frame === 'react') {
        //   console.log(symbol.warning, chalk.yellow('react模板还在路上'))
        //   process.exit(1)
        // }

        let loading = (0, _ora2.default)('模板下载中...');
        loading.start('模块下载中...');

        // 根据选择的框架选择模板下载地址
        let Api = '';
        if (answer.frame === 'React') {
          Api = 'direct:https://github.com/LuoYangYY/react-template.git';
        }

        if (answer.frame === 'Vue') {
          if (answer.platform === 'PC') {
            Api = 'direct:https://github.com/PanJiaChen/vue-admin-template.git';
          } else if (answer.platform === 'Mobile') {
            Api = 'direct:https://github.com/tramp-xu/vant-mobile-template.git';
          }
        }

        (0, _util.downloadTemplate)(ProjectName, Api).then(() => {
          loading.succeed('模板下载完成');

          // 下载完成后,根据用户输入更新配置文件
          const fileName = `${ProjectName}/package.json`;
          let readme = `${ProjectName}/readme.md`;

          answer.name = ProjectName;
          (0, _util.updateJsonFile)(fileName, answer).then(() => {
            console.log(_logSymbols2.default.success, _chalk2.default.green('配置文件更新完成'));
          }, () => {
            loading.fail('模板下载失败');
          });

          (0, _util.updateReadmeFile)(readme).then(() => {
            console.log(_logSymbols2.default.success, _chalk2.default.green('更新Readme完成。'));
          }, () => {
            loading.fail('模板下载失败');
          });
        });
      });
    });
  }
};

module.exports = create;