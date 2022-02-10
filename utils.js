const chalk = require('chalk');
const colors = ['green', 'blue', 'yellow', 'red','greenBright'];
const consoleColors = {};
colors.forEach((color) => {
  consoleColors[color] = function (text, isConsole = true) {
    return isConsole ? console.log(chalk[color](text)) : chalk[color](text);
  };
});
module.exports = consoleColors;
