// #!/usr/bin/env node
const path = require('path');
const shelljs = require('shelljs');
const minimist = require('minimist');

const defaultValue = {
  src: 'src',
  dist: 'dist'
}

console.log(process.env.PWD) // 用户执行命令的目录

const option = minimist(process.argv.slice(2), {
  default: defaultValue
});

for (let key in option) {
  if (option.hasOwnProperty(key) && option[key] === true) {
    throw new Error('参数错误');
  }
}

const optionToString = option => {
  let str = '';
  for (let key in option) {
    if (option.hasOwnProperty(key)) {
      const value = option[key];
      str += `--${key} ${value}`
    }
  }
}

console.log(optionToString(option));

// shelljs.exec(`gulp --gulpfile ${path.resolve(__dirname, 'gulpfile.js')} ${optionToString(option)}`);
