#!/usr/bin/env node
const program = require('commander');
const inquirer = require('inquirer');
const create = require('../src/create');
const consoleColors = require('../utils');
const question = [
  {
    name: 'conf' /* key */,
    type: 'confirm' /* 确认 */,
    message: '是否创建新的项目？' /* 提示 */,
  },
  {
    name: 'name',
    message: '请输入项目名称？',
    when: (res) => Boolean(res.conf) /* 是否进行 */,
  },
  {
    name: 'author',
    message: '请输入作者？',
    when: (res) => Boolean(res.conf),
  },
  {
    type: 'list' /* 选择框 */,
    message: '请选择公共管理状态,抱歉没得选，只有zustand一个^_^',
    name: 'state',
    choices: ['zustand'] /* 选项*/,
    filter: function (val) {
      /* 过滤 */
      return val.toLowerCase();
    },
    when: (res) => Boolean(res.conf),
  },
];
const { green,yellow } = consoleColors;
// fishcli创建项目
program
  .command('create')
  .description('create a project')
  .action(() => {
    green('欢迎使用fishcli，轻松构建react+ts 项目');
    inquirer.prompt(question).then((answer) => {
      if (answer.conf) {
        create(answer);
      } else {
        yellow('这次没关系，希望以后有合作机会!');
      }
    });
  });

program.parse(process.argv);