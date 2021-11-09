const fs = require('fs');
const { Buffer } = require('buffer');
const utils = require('../utils');

/* 三变量判断异步操作 */
let fileCount = 0; /* 文件数量 */
let dirCount = 0; /* 文件夹数量 */
let flat = 0; /* readir数量 */

module.exports = function (res) {
  /* 创建文件 */
  utils.green('------开始构建-------');
  const sourcePath = __dirname.slice(0, -3) + 'template';
  utils.blue('当前路径:' + process.cwd());
  /* 修改package.json*/
  revisePackageJson(res, sourcePath).then(() => {
    copy(sourcePath, process.cwd());
  });
};

const copy = (sourcePath, currentPath)=> {
  flat++;
  fs.readdir(sourcePath, (err, paths) => {
    flat--;
    if (err) {
      throw err;
    }
    paths.forEach((path) => {
      if (path !== '.git' && path !== 'package.json') fileCount++;
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
          fileCount--;
        } else if (stat.isDirectory()) {
          if (path !== '.git' && path !== 'package.json') {
            dirCount++;
            dirExist(newSoucePath, newCurrentPath, copy);
          }
        }
      });
    });
  });
}

const dirExist =(sourcePath, currentPath, copyCallback)=> {
  fs.exists(currentPath,(exist) => {
    if (exist) {
      copyCallback(sourcePath, currentPath);
    } else {
      fs.mkdir(currentPath, () => {
        fileCount--;
        dirCount--;
        copyCallback(sourcePath, currentPath);
        utils.yellow('创建文件夹：' + currentPath);
      });
    }
  });
}

const revisePackageJson = (res, sourcePath) => new Promise((resolve) => {
  fs.readFile(sourcePath + '/package.json', (err, data) => {
    if (err) throw err;
    const { author, name } = res;
    let json = data.toString();
    json = json.replace(/demoname/g, name.trim());
    json = json.replace(/demoAuthor/g, author.trim());
    const path = process.cwd() + '/package.json';
    const data1 = new Uint8Array(Buffer.from(json));
    fs.writeFile(path, data1, () => {
      utils.green('创建文件：' + path);
      resolve();
    });
  });
});