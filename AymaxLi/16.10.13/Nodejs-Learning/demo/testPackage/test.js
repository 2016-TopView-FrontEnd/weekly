var cat = require('./cat');
// 也可写成
// var cat = require('./cat/index');

var xiaoBai = cat.create('xiaoBai');
console.log(xiaoBai.body.color);