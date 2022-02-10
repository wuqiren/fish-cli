#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const shell = require('shelljs');
const inquirer = require('inquirer');
const chalk = require('chalk');
const download = require('download-git-repo');
const ora = require('ora');
const { exit, exec, cd, cp, rm } = shell;

const init = () => {
  inquirer.prompt([
    {
      name: 'templateType',
      type: 'list',
      message: '请选择你需要的项目模板',
      choices: ['server', 'full-stack'],
      default: 'server',
    },
    {
      name: 'name',
      message: '请输入项目英文名',
      validate(value) {
        if (value.trim()) return true;
      },
    },
    {
      name: 'cnName',
      message: '请输入项目中文名',
      default: '腾讯内容开放平台',
      validate(value) {
        if (value.trim()) return true;
      },
    },
    {
      name: 'description',
      message: '请输入项目描述',
    },
    {
      name: 'author',
      message: '请输入项目作者',
      default: 'omfe',
    },
    {
      name: 'templateConfig',
      message: '请选择你想要的项目配置',
      type: 'checkbox',
      choices: [
        { name: 'Aegis前端监控', value: 'useAegis', checked: true },
        { name: 'AutoTrack前端自动埋点', value: 'useAutoTrack', checked: true },
        { name: '天机阁监控系统', value: 'useTps', checked: true },
      ],
    },
  ])
    .then((answers) => {
      console.log(answers);
      // Use user feedback for... whatever!!
      downloadTemplate(answers);
    })
    .catch((error) => {
      console.log(chalk.red(`Error: ${error}`));
      exit(0);
    });
};

const downloadTemplate = (params) => {
  const { templateType, name } = params;
  const downloadPath = path.join(process.cwd(), name);
  const downloadPathTemporary = path.join(process.cwd(), `${name}Temporary`);
  if (fs.existsSync(downloadPath) || fs.existsSync(downloadPathTemporary)) {
    console.log(chalk.red('文件名冲突，请重新输入'));
    init();
    return;
  }
  const spinner = ora('正在下载模板, 请稍后...');
  spinner.start();
  download(
    // 直连下载，默认下载master
    'direct:https://git.woa.com/cpom_fetech/titan-ts.git',
    downloadPathTemporary,
    { clone: true },
    async (error) => {
      if (!error) {
        // success download
        cp('-R', `${downloadPathTemporary}/template/${templateType}/`, downloadPath);
        rm('-rf', downloadPathTemporary);
        spinner.succeed();
        const templatePathList = fs.readdirSync(path.join(__dirname, 'template'));
        templatePathList.forEach((path) => {
          require(`./template/${path}`)(params, downloadPath);
        });
        install(name, downloadPath, templateType);
      } else {
        spinner.fail();
        console.log(chalk.red('failed! 拉取模板失败', error));
        exit(0);
      }
    }
  );
};

const install = async (name, downloadPath, templateType) => {
  const { next } = await inquirer.prompt({
    type: 'confirm',
    name: 'next',
    message: '是否继续安装项目依赖?',
    default: true,
  });
  if (!next) {
    console.log(chalk.green('success! 项目初始化成功！'));
    console.log(`${chalk.greenBright('开启项目')}\n${
      chalk.greenBright(`cd ${name}`)}\n${
      chalk.greenBright('tnpm i')}\n${
      chalk.greenBright(`${templateType === 'full-stack' ? 'npm run dev:web\nnpm run dev:server' : 'npm run dev'}`)}\n${
      chalk.red('重要：在项目正式开始之前，你需要进行一些准备工作，详情请点击 https://iwiki.woa.com/pages/viewpage.action?pageId=625941354')}`);
    exit(0);
  }
  const { tool } = await inquirer.prompt({
    name: 'tool',
    type: 'list',
    message: 'choose the tool to install',
    choices: ['tnpm', 'yarn'],
    default: 'tnpm',
  });
  cd(downloadPath);
  const spinner = ora('正在安装项目依赖, 请稍后...');
  spinner.start();
  if (exec(`${tool} run init`).code !== 0) {
    spinner.fail();
    console.log(`${chalk.red('依赖安装失败，请手动安装')}\n${
      chalk.greenBright(`${tool} install`)}\n${
      chalk.greenBright(`${templateType === 'full-stack' ? 'npm run dev:web\nnpm run dev:server' : 'npm run dev'}`)
    }`);
    exit(0);
  }
  spinner.succeed();
  console.log(`${chalk.greenBright('success! 项目初始化成功！')}\n${
    chalk.greenBright('开启项目')}\n${
    chalk.greenBright(`cd ${name}`)}\n${
    chalk.greenBright(`${templateType === 'full-stack' ? 'npm run dev:web\nnpm run dev:server' : 'npm run dev'}`)}\n${
    chalk.red('重要：在项目正式开始之前，你需要进行一些准备工作，详情请点击 https://iwiki.woa.com/pages/viewpage.action?pageId=625941354')}`);
};

init();
