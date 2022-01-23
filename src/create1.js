const fs = require('fs-extra');
const inquirer = require('inquirer');
const { Buffer } = require('buffer');
const utils = require('../utils');
const { red,yellow } = utils;
const existProjectName = (name) => {
  red(`${name}    文件已经存在`)
  const question = [
    {
      name: "isNext" /* key */,
      type: "confirm" /* 确认 */,
      message: `${name}  文件已存在，是否进行覆盖` /* 提示 */,
    },
  ]
  return inquirer.prompt(question)
}
const createTemplate = (res,sourcePath) => {
  fs.mkdirp(res.name, () => {
    const path = process.cwd()+`/${res.name}`
    revisePackageJson(res, sourcePath,path+'/package.json').then(() => {
      copy(sourcePath, path);
      utils.yellow('创建文件夹：' + res.name);
    });
  });
}
module.exports = async (res)=> {
  /* 创建文件 */
  utils.green('------开始构建-------');
  const sourcePath = __dirname.slice(0, -3) + `${res.type}-template`;
  utils.blue('当前路径:' + process.cwd());
  if (fs.existsSync(res.name)) {
    const {isNext} = await existProjectName(res.name)
    if (isNext) {
      createTemplate(res,sourcePath)
      return;
    }
    yellow('没关系，希望以后有合作机会! 联系QQ:630280136')
    return
  };
  createTemplate(res,sourcePath)

};

const copy = (sourcePath, currentPath) => {
  fs.copy(sourcePath, currentPath, err => {
    console.log(err,'????')
  })
  fs.readdir(sourcePath, (err, paths) => {
    if (err) {
      throw err;
    }
    paths.forEach((path) => {
      if (path !== '.git' && path !== 'package.json');
      const newSoucePath = sourcePath + '/' + path;
      const newCurrentPath = currentPath + '/' + path;
      fs.stat(newSoucePath, (err, stat) => {
        if (err) {
          throw err;
        }
        if (stat.isFile() && path !== 'package.json') {
          const readSteam = fs.createReadStream(newSoucePath);
          const writeSteam = fs.createWriteStream(newCurrentPath);
          readSteam.pipe(writeSteam);
          utils.green('创建文件：' + newCurrentPath);
        } else if (stat.isDirectory()) {
          if (path !== '.git' && path !== 'package.json') {
            dirExist(newSoucePath, newCurrentPath, copy);
          }
        }
      });
    });
  });
}

const dirExist =(sourcePath, currentPath, copyCallback)=> {
  fs.access(currentPath,fs.constants.F_OK,(error) => {
    if (!error) {
      copyCallback(sourcePath, currentPath);
    } else {
      fs.mkdir(currentPath, () => {
        copyCallback(sourcePath, currentPath);
        utils.yellow('创建文件夹：' + currentPath);
      });
    }
  });
}

const revisePackageJson = (res, sourcePath, path) => new Promise((resolve) => {
  fs.readFile(sourcePath + '/package.json','utf8', (err, data) => {
    if (err) throw err;
    const { author, name } = res;
    let json = data;
    json = json.replace(/demoname/g, name.trim());
    json = json.replace(/demoAuthor/g, author.trim());
    fs.writeFile(path, json, () => {
      utils.green('创建文件：' + path);
      resolve();
    });
  });
});