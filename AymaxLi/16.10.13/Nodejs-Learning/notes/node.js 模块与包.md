# node.js 模块与包

标签（空格分隔）： node.js

---

[toc]

## require 函数

用于在当前模块加载和使用别的模块，传入一个模块名，返回一个模块对象
模块名可以使用相对或者绝对路径，且```.js```扩展名可省略

## export 对象

```export``` 对象指当前模块导出的对象

## module 对象

```module``` 对象可以访问到当前模块的一些信息，最多的用途是替换当前模块的导出对象

例：把导出对象替换成函数
```
module.exports = function () {
    console.log('haha');
};
```

## 所有模块在执行过程中只初始化一次
例：
counter.js
```
var i = 0;

function count() {
	return ++i;
}

exports.count = count;
```
main.js
```
var counter1 = require('./counter');
var counter2 = require('./counter');

console.log(counter1.count());  // 1
console.log(counter2.count());  // 2
console.log(counter1.count());  // 3
```

counter.js并没有因为被require了两次而初始化两次

## 模块路径解析规则

1. 内置模块
如果传递给 ```require``` 的是 NodeJS 内置模块名称，则不做路径解析，直接返回内部模块的导出对象
例: 
```
var http = require('http');
```

2. node_modules目录 ？？逐级往上查找？？
NodeJS 定义了一个特殊的 node_modules 目录用于存放模块。例如某个模块的绝对路径是 ```/home/user/hello.js```，在该模块中使用 ```require('foo/bar')``` 方式加载模块时，则 NodeJS 依次尝试使用以下路径：
    >/home/user/node_modules/foo/bar
    /home/node_modules/foo/bar
    /node_modules/foo/bar

3. NODE_PATH环境变量
- 与 PATH 环境变量类似，NodeJS 允许通过 NODE_PATH 环境变量来指定额外的模块搜索路径，NODE_PATH 环境变量中包含一到多个目录路径。
- 路径之间在 Linux 下使用 ```:``` 分隔，在 Windows 下使用 ```;``` 分隔

例： 定义了以下NODE_PATH环境变量
```
NODE_PATH = /home/user/lib；/home/lib
```
使用 ```require('util/sayHaha');``` 时，NodeJS 依次尝试使用以下路径：
 > /home/user/lib/foo/bar
 /home/lib/foo/bar
 
 ## 包（package）
 
 由多个模块组成，需要一个入口模块，入口模块的导出对象作为包的导出对象
 入口模块：一般命名为 ```index.js```，且会引入包内其他模块
 例：
```
var head = require('./head');
var body = require('./body');

exports.create = function (name) {
	return {
		name: name,
		head: head.create(),
		body: body.create()
	}
}
```
引用包的时候，可直接引用包名（包内有 ```index.js```），或者直接引用入口模块
```
var cat = require('./cat');
// 也可写成
// var cat = require('./cat/index');

var xiaoBai = cat.create('xiaoBai');
```

也可以在包的子目录下放一个 ```package.json```，自定义入口文件的位置及文件名
package.json
```
{
    "name": "cat",
    "main": "./lib/main.js" // 入口模块
}
```
这样使用 ```require('/home/user/lib/cat');``` 加载这个包的时候，会根据 ```package.json``` 找到入口模块

