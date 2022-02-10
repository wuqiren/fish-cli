const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const ora = require('ora');
const utils = require('../utils');
const download = require('download-git-repo');
const { red, yellow, greenBright, green } = utils;
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

module.exports = async (res)=> {
  /* 创建文件 */
  utils.green('------开始构建-------');
  utils.blue('当前路径:' + process.cwd());
  downloadTemplate({ author:res.author,name: res.name,type: res.type})
};
const downloadAction = async (url,params) => {
  const spinner = ora('正在下载模板, 请稍后...');
  spinner.start();
  download(
    // 直连下载，默认下载master
    `wuqiren/fish-${params.type}`,
    url,
    async (error) => {
      if (!error) {
        const paths = process.cwd()+`/${params.name}`
        revisePackageJson(params, paths, paths +'/package.json')
        spinner.succeed();
        green('success! 项目创建成功！');
        greenBright('请初始化项目')
        greenBright(`cd ${params.name}`)
        greenBright('npm install')
      } else {
        red('failed! 拉取模板失败', error);
        spinner.fail();
      }
    }
  );
}
const downloadTemplate = async (params) => {
  const { name } = params;
  const downloadPathTemporary = path.join(process.cwd(), `${name}`);
  if (fs.existsSync(downloadPathTemporary)) {
    const {isNext} = await existProjectName(name)
    if (isNext) {
      downloadAction(downloadPathTemporary,params)
      return;
    }
    yellow('没关系，希望以后有合作机会! 联系QQ:630280136')
    return
  }
  downloadAction(downloadPathTemporary,params)

};
const revisePackageJson = (res, sourcePath, path) => new Promise((resolve) => {
  fs.readFile(sourcePath + '/package.json','utf8', (err, data) => {
    if (err) throw err;
    const { author, name } = res;
    let json = data;
    json = json.replace(/demoname/g, name.trim());
    json = json.replace(/demoAuthor/g, author.trim());
    fs.writeFile(path, json, () => {
      resolve();
    });
  });
});