#!/usr/bin/env node
const consoleColors = require('../utils');
const program = require('commander');
const inquirer = require('inquirer');
const create = require('../src/create');
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
    message: '请选择公共管理状态？',
    name: 'state',
    choices: ['mobx', 'redux'] /* 选项*/,
    filter: function (val) {
      /* 过滤 */
      return val.toLowerCase();
    },
    when: (res) => Boolean(res.conf),
  },
];
console.log(consoleColors, 'consoleColors');
const { blue, green } = consoleColors;
// fishcli创建项目
program
  .command('create')
  .description('create a project')
  .action(function () {
    green('欢迎使用fishcli，轻松构建react ts 项目');
    inquirer.prompt(question).then((answer) => {
      console.log('answer=', answer);
      create(answer);
    });
  });
program
  .command('start')
  .description('start a project')
  .action(function (env, options) {
    green('--------允许项目--------');
  });
program
  .command('build')
  .description('build a project')
  .action(function (env, options) {
    green('--------构建项目--------');
  });

program
  .option('-d, --debug', 'output extra debugging')
  .option('-s, --small', 'small pizza size')
  .option('-p, --pizza-type <type>', 'flavour of pizza');

program.parse(process.argv);

const options = program.opts();
if (options.debug) console.log(options);
blue('pizza details:');
if (options.small) console.log('- small pizza size');
if (options.pizzaType) console.log(`- ${options.pizzaType}`);
