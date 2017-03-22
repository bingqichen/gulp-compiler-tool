#!/usr/bin/env node
const path = require('path');

const shelljs = require('shelljs');

console.log(__dirname);

shelljs.exec(`gulp --gulpfile ${path.resolve(__dirname, 'gulpfile.js')}`);
