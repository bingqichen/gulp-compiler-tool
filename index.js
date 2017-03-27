#!/usr/bin/env node
const path = require('path');
const shelljs = require('shelljs');
const minimist = require('minimist');

const defaultValue = {
  src: 'src',
  dist: 'dist',
  sourcemaps: true
}

const options = minimist(process.argv.slice(2), {
  default: defaultValue,
  string: ['src', 'dist'],
  boolean: ['sourcemaps'],
  unknown: () => false
});

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

shelljs.exec(`gulp --gulpfile ${path.resolve(__dirname, 'gulpfile.js')} ${optionsToString(options)}`);
