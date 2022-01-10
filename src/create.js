const fs = require('fs');
const { Buffer } = require('buffer');
const utils = require('../utils');

module.exports = function (res) {
  /* 创建文件 */
  utils.green('------开始构建-------');
  const sourcePath = __dirname.slice(0, -3) + `${res.type}-template`;
  utils.blue('当前路径:' + process.cwd());
  /* 修改package.json*/
  fs.mkdir(res.name, () => {
    const path = process.cwd()+`/${res.name}`
    revisePackageJson(res, sourcePath,path+'/package.json').then(() => {
      copy(sourcePath, path);
      utils.yellow('创建文件夹：' + res.name);
    });
  });
};

const copy = (sourcePath, currentPath)=> {
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
  fs.readFile(sourcePath + '/package.json', (err, data) => {
    if (err) throw err;
    const { author, name } = res;
    let json = data.toString();
    json = json.replace(/demoname/g, name.trim());
    json = json.replace(/demoAuthor/g, author.trim());
    const data1 = new Uint8Array(Buffer.from(json));
    fs.writeFile(path, data1, () => {
      utils.green('创建文件：' + path);
      resolve();
    });
  });
});