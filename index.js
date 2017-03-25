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

for (let variable in option) {
  if (option[variable] === true) {
    throw new Error('参数错误');
  }
}

console.log(option)

// shelljs.exec(`gulp --gulpfile ${path.resolve(__dirname, 'gulpfile.js')}`);
