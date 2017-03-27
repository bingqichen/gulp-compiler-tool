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
const sourcemaps = require('gulp-sourcemaps');

const rootPath = process.env.PWD; // 执行命令根目录

const options = minimist(process.argv.slice(2), {
  string: ['src', 'dist'],
  boolean: ['sourcemaps'],
  unknown: () => false
}); // 读取参数

const src = options.src; // 需要编译的目录
const dist = options.dist; // 编译后目录

const staticSrcMap = [
  '!' + path.resolve(rootPath, dist),
  '!' + path.resolve(rootPath, 'node_modules')
];
const jsSrcMap = [
  '!' + path.resolve(rootPath, dist),
  '!' + path.resolve(rootPath, 'node_modules')
]
const lessSrcMap = [
  '!' + path.resolve(rootPath, dist),
  '!' + path.resolve(rootPath, 'node_modules')
]
src.split(',').forEach(item => {
  staticSrcMap.push(path.resolve(rootPath, item.replace(/\/$/, '') + '/**/*.*'));
  staticSrcMap.push('!' + path.resolve(rootPath, item.replace(/\/$/, '') + '/**/*.js'));
  staticSrcMap.push('!' + path.resolve(rootPath, item.replace(/\/$/, '') + '/**/*.less'));
  jsSrcMap.push(path.resolve(rootPath, item.replace(/\/$/, '') + '/**/*.js'));
  lessSrcMap.push(path.resolve(rootPath, item.replace(/\/$/, '') + '/**/*.less'));
})

gulp.task('static', () => (
  gulp.src(staticSrcMap)
    .pipe(gulp.dest(path.resolve(rootPath, dist)))
));

gulp.task('js', () => (
  gulp.src(jsSrcMap)
    .pipe(sourcemaps.init())
    .pipe(babel({
      babelrc: true
    }))
    .pipe(uglify())
    // .pipe(replace(/(.*?require.+?\.)less|sass|scss|stylus(.*?)/gm, '$1css$2'))
    .pipe(replace(/(.*?require.+?\.)less(.*?)/gm, '$1css$2'))
    .pipe(sourcemaps.write('', {
      mapFile: mapFilePath => mapFilePath.replace('.js.map', '.map')
    }))
    .pipe(gulp.dest(path.resolve(rootPath, dist)))
));

gulp.task('less', () => (
  gulp.src(lessSrcMap)
    .pipe(less())
    .pipe(postcss([
      autoprefixer({ browsers: ['> 1%', 'ie >= 8'] })
    ]))
    .pipe(clean())
    .pipe(gulp.dest(path.resolve(rootPath, dist)))
));

gulp.task('default', ['static', 'js', 'less']);

gulp.task('watch', () => (
  gulp.watch(src.split(',')
    .map(item => path.resolve(rootPath, item.replace(/\/$/, '') + '/**/*.*')),
    ['static', 'js', 'less'])
));
