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

const basePath = '../..'; // 退回到用户项目根目录

gulp.task('static', () => (
  gulp.src([
    path.resolve(__dirname, basePath, 'src/**/*.*'),
    '!' + path.resolve(__dirname, basePath, 'src/**/*.js'),
    '!' + path.resolve(__dirname, basePath, 'src/**/*.less')
  ])
    .pipe(gulp.dest(path.resolve(__dirname, basePath, 'dist')))
));

gulp.task('js', () => (
  gulp.src(path.resolve(__dirname, basePath, 'src/**/*.js'))
    .pipe(babel({
      babelrc: true
    }))
    .pipe(uglify())
    // .pipe(replace(/(.*?require.+?\.)less|sass|scss|stylus(.*?)/gm, '$1css$2'))
    .pipe(replace(/(.*?require.+?\.)less(.*?)/gm, '$1css$2'))
    .pipe(gulp.dest(path.resolve(__dirname, basePath, 'dist')))
));

gulp.task('less', () => (
  gulp.src(path.resolve(__dirname, basePath, 'src/**/*.less'))
    .pipe(less())
    .pipe(postcss([
      autoprefixer({ browsers: ['> 1%', 'ie >= 8'] })
    ]))
    .pipe(clean())
    .pipe(gulp.dest(path.resolve(__dirname, basePath, 'dist')))
));

gulp.task('default', ['static', 'js', 'less']);

gulp.task('watch', () => (
  gulp.watch('src/**/*.*', ['static', 'js', 'less'])
));
