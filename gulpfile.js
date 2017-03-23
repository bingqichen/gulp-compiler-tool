const path = require('path');
const gulp = require('gulp');
const replace = require('gulp-replace');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const clean = require('gulp-clean-css');

gulp.task('static', () => (
  gulp.src([
    path.resolve(__dirname, '../../src/**/*.*'),
    '!' + path.resolve(__dirname, '../../src/**/*.js'),
    '!' + path.resolve(__dirname, '../../src/**/*.less')
  ])
    .pipe(gulp.dest(path.resolve(__dirname, '../../dist')))
));

gulp.task('js', () => (
  gulp.src(path.resolve(__dirname, '../../src/**/*.js'))
    .pipe(babel({
      babelrc: true
    }))
    .pipe(uglify())
    .pipe(replace(/\.less/g, '.css'))
    .pipe(gulp.dest(path.resolve(__dirname, '../../dist')))
));

gulp.task('less', () => (
  gulp.src(path.resolve(__dirname, '../../src/**/*.less'))
    .pipe(less())
    .pipe(postcss([
      autoprefixer({ browsers: ['> 1%', 'ie >= 8'] })
    ]))
    .pipe(clean())
    .pipe(gulp.dest(path.resolve(__dirname, '../../dist')))
));

gulp.task('default', ['static', 'js', 'less']);

gulp.task('watch', () => (
  gulp.watch('src/**/*.*', ['static', 'js', 'less'])
));
