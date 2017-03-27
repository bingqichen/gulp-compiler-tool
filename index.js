#!/usr/bin/env node
const path = require('path');
const shelljs = require('shelljs');
const minimist = require('minimist');

const defaultValue = {
  src: 'src',
  dist: 'dist'
}

console.log(process.env.PWD) // 用户执行命令的目录

const options = minimist(process.argv.slice(2), {
  default: defaultValue
});

for (let key in options) {
  if (options.hasOwnProperty(key) && options[key] === true) {
    throw new Error('参数错误');
  }
}

const optionsToString = options => {
  let str = '';
  for (let key in options) {
    if (options.hasOwnProperty(key) && key !== '_') {
      const value = options[key];
      str += `--${key} ${value} `
    }
  }
  return str.trim();
}

console.log(optionsToString(options));

shelljs.exec(`gulp --gulpfile ${path.resolve(__dirname, 'gulpfile.js')} ${optionsToString(option)}`);
