import program from 'commander';

import create from './create'; // 项目创建
import init from './init'; // 项目初始化
import dev from './dev'; // 项目启动
import build from './build'; //项目打包

// 命令行列表

let actionMap = {
  // 项目创建
  create: {
    description: '创建一个新的项目',
    usages: [
      'biko-cli create ProjectName',
      'bkc create ProjectName'
    ],
    alias: 'c'
  },
  // 项目初始化
  init: {
    description: '项目初始化',
    usages: [
      'biko-cli init',
      'bkc init'
    ],
    alias: 'i'
  },

  dev: {
    description: '本地启动项目',
    usages: [
      'biko-cli dev',
      'bkc dev' 
    ],
    options: [
      {
        flags: '-p --port <port>',
        description: '端口',
        defaultValue: 3000
      }
    ],
    alias: 'd'
  },

  build: {
    description: '服务端项目打包',
    usages: [
      'biko-cli build',
      'bkc build'
    ],
    options: [
      {
        flags: '-u --username <port>',
        description: 'github用户名',
        defaultValue: ''
      },
      {
        flags: '-t --token <port>',
        description: 'github创建token',
        defaultValue: ''
      }
    ],
    alias: 'b'
  }
}

Object.keys(actionMap).forEach(action =>{
  if (actionMap[action].options) {
    Object.keys(actionMap[action].options).forEach(option => {
      let obj = actionMap[action].options[option]
      program.option(obj.flags, obj.description, obj.defaultValue)
    })
  }

  program
    .command(action)
    .description(actionMap[action].description)
    .alias(actionMap[action].alias)
    .action(() => {
      switch (action) {
        case 'create':
          create(...process.argv.slice(3))
          break
        case 'init':
          init(program.username, program.token)
          break
        case 'dev':
          dev(program.port)
          break
        case 'build':
          build();
          break;
        default:
          break
      }
    })
})

program
  .version(require('../package.json').version, '-v --version')
  .parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}