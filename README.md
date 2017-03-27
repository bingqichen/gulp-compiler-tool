# gulp源码编译工具

## 安装
npm
```javascript
$ npm install gulp-compiler-tool --save-dev
```
yarn
```javascript
$ yarn add gulp-compiler-tool --dev
```

## 使用示例

- 直接使用

在package.json文件中添加以下字段：
```javascript
"script": {
  "compiler": "gulp-compiler"
}
```
执行`npm run compiler`或`yarn compiler`默认会编译项目的`src`目录中的文件到`dist`目录。

- 添加参数

如果你需要编译其他目录，该工具也提供选项指定编译路径和保存路径：
```javascript
"script": {
  "compiler": "gulp-compiler --src sourceDir --dist outputDir"
}
```

也支持指定多个编译目录，只需要在多个目录之间用`,`分隔：
```javascript
"script": {
  "compiler": "gulp-compiler --src sourceDir1,sourceDir2,sourceDir3,... --dist outputDir"
}
```

你也可以直接编译当前目录下的所有文件，用`.`表示，工具会自动排除`node_modules`和编译后的目录。

## 备注
- 目前支持编译的样式表语言暂时只有`less`，其他样式表语言会直接被视为静态文件直接输出；
- 编译`js`需要`.babelrc`文件。

## 许可信息
MIT
