import symbol from 'log-symbols';
import chalk from 'chalk';
import ora from 'ora';

import {
    notExistFold,
    prompt,
    downloadTemplate,
    updateJsonFile
} from './util';

let create = async (ProjectName) => {
  if (ProjectName === undefined) {
    console.log(symbol.error, chalk.red('创建项目的时候,请输入项目名'))
    // process.exit(1)
  } else {
    notExistFold(ProjectName).then(() => {
      prompt().then(answer => {
        if (answer.frame === 'react') {
          console.log(symbol.warning, chalk.yellow('react模板还在路上'))
          process.exit(1)
        }

        let loading = ora('模板下载中...')
        loading.start('模块下载中...')

        // 根据选择的框架选择模板下载地址
        let Api = '';
        if (answer.frame === 'React') {
          Api = 'direct:https://github.com/LuoYangYY/react-template.git';
        }

        if (answer.frame === 'Vue') {
          if (answer.platform === 'PC') {
            Api = 'direct:https://github.com/PanJiaChen/vue-admin-template.git'
          } else if (answer.platform === 'Mobile') {
            Api = 'direct:https://github.com/tramp-xu/vant-mobile-template.git'
          }
        }

        downloadTemplate(ProjectName, Api)
          .then(() => {
            loading.succeed('模板下载完成');

            // 下载完成后,根据用户输入更新配置文件
            const fileName = `${ProjectName}/package.json`;
            answer.name = ProjectName;
            updateJsonFile(fileName, answer)
            .then(() => {
                console.log(symbol.success, chalk.green('配置文件更新完的。'));
            })
          }, () => {
              loading.fail('模板下载失败');
          });

      })
    })
  }
}

module.exports = create