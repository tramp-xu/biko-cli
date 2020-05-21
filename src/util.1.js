import fs from 'fs';
import symbol from 'log-symbols';
import chalk from 'chalk';
import inquirer from 'inquirer';
import downloadGit from 'download-git-repo';

// 文件是否存在
let notExistFold = async (name) => {
  return new Promise((resolve) => {
      if (fs.existsSync(name)) {
          console.log(symbol.error, chalk.red('文件夹名已被占用，请更换名字重新创建'));
      } else {
          resolve();
      }
  });
}

// 询问用户
const prompList = [
  {
    type: 'list',
    name: 'env',
    message: '请选择环境(客户端/服务端)',
    choices: ['Js', 'Node']
  },
  {
    type: 'list',
    name: 'nodeFrame',
    message: '请选择框架',
    choices: ['Koa', 'Express'],
    when: (answer) => {
      return answer.env === 'Node'
    }
  },
  {
    type: 'confirm',
    name: 'jwt',
    message: '是否使用 jwt'
  },
  {
    type: 'list',
    name: 'frame',
    message: '请选择框架',
    choices: ['Vue', 'React'],
    when: (answer) => {
      return answer.env === 'Js'
    }
  },
  {
    type: 'list',
    name: 'frame',
    message: '请选择 UI 框架',
    choices: ['ElementUI', 'Vant'],
    when: (answer) => {
      return answer.env === 'Js' && answer.frame === 'Vue'
    }
  },
  {
    type: 'list',
    name: 'frame',
    message: '请选择 UI 框架',
    choices: ['Ant-Design'],
    when: (answer) => {
      return answer.env === 'Js' && answer.frame === 'React'
    }
  },
  {
    type: 'input',
    name: 'description',
    message: 'Please enter the project description: '
  },
  {
    type: 'input',
    name: 'author',
    message: 'Please enter the author name: '
  }
]

let prompt = () => {
  return new Promise(resolve => {
    inquirer
      .prompt(prompList)
      .then(answer => {
        resolve(answer)
      })
  })
}

// 项目模板远程下载
let  downloadTemplate = async (ProjectName, api) => {
  return new Promise((resolve, reject) => {
      downloadGit(api, ProjectName, {clone: true}, (err) => {
          if(err){
              reject(err);
          }else{
              resolve();
          }
      })
  });
};


// 更新json配置文件
let updateJsonFile = (fileName, obj) => {

  return new Promise(resolve => {
    if(fs.existsSync(fileName)){
        const data = fs.readFileSync(fileName).toString();
        let json = JSON.parse(data);
        Object.keys(obj).forEach(key => {
            json[key] = obj[key];
        });
        fs.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');
        resolve();
    }
  });
}


module.exports = {
  notExistFold,
  prompt,
  downloadTemplate,
  updateJsonFile
}