const path = require('path');

const minimist = require('minimist');

const gulp = require('gulp');
const replace = require('gulp-replace');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const clean = require('gulp-clean-css');

const rootPath = process.env.PWD; // 执行命令根目录

const option = minimist(process.argv.slice(2)); // 读取参数

gulp.task('static', () => (
  gulp.src([
    path.resolve(rootPath, 'src/**/*.*'),
    '!' + path.resolve(rootPath, 'src/**/*.js'),
    '!' + path.resolve(rootPath, 'src/**/*.less')
  ])
    .pipe(gulp.dest(path.resolve(rootPath, 'dist')))
));

gulp.task('js', () => (
  gulp.src(path.resolve(rootPath, 'src/**/*.js'))
    .pipe(babel({
      babelrc: true
    }))
    .pipe(uglify())
    // .pipe(replace(/(.*?require.+?\.)less|sass|scss|stylus(.*?)/gm, '$1css$2'))
    .pipe(replace(/(.*?require.+?\.)less(.*?)/gm, '$1css$2'))
    .pipe(gulp.dest(path.resolve(rootPath, 'dist')))
));

gulp.task('less', () => (
  gulp.src(path.resolve(rootPath, 'src/**/*.less'))
    .pipe(less())
    .pipe(postcss([
      autoprefixer({ browsers: ['> 1%', 'ie >= 8'] })
    ]))
    .pipe(clean())
    .pipe(gulp.dest(path.resolve(rootPath, 'dist')))
));

gulp.task('default', ['static', 'js', 'less']);

gulp.task('watch', () => (
  gulp.watch(path.resolve(rootPath, 'src/**/*.*'), ['static', 'js', 'less'])
));
