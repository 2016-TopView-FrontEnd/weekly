var dao = require('./dao'); //错误版本，只能调用一次，原因：db.close() 没有成功执行
var dao2 = require('./dao2'); //重写版本

// dao.findData({"age": 23}, function (result) {
// 	console.log('查询结果：')
// 	console.log(result);
// });

var dataTest = [{"name":'wilson001',"age":21},{"name":'wilson002',"age":22}];
dao.insertData(dataTest, function (result) {
	console.log('成功添加文档： ' + result);
});

dao.insertData(dataTest, function (result) {
	console.log('成功添加文档： ' + result);
});

// dao.deleteData({"age": 21}, function (result) {
// 	console.log('成功删除文档');
// });

// dao.updateData({"age": 21}, {$set: {"age": 23}},function (result) {
// 	console.log('成功修改文档');
// });


// dao2.insertData({"name": "muzi", "age": 20}, function (result) {
// 	console.log('成功添加文档： ');
// 	console.log(result);
// });

// dao2.insertData({"name": "muzi", "age": 20}, function (result) {
// 	console.log('成功添加文档： ');
// 	console.log(result);
// });

// dao2.insertData({"name": "我聪", "age": 18}, function (result) {
// 	console.log('成功添加文档： ');
// 	console.log(result);
// 	console.log('---');
// })

// dao2.updateData({"name": "我聪"}, {$set: {"age": 16}}, function (result) {
// 	console.log('成功修改文档')
// 	// console.log(result);
// 	console.log('---');
// })

// dao2.findData({"name": "我聪"}, function (result) {
// 	console.log('查询结果：')
// 	console.log(result);
// 	console.log('---');
// });

// dao2.deleteData({"name": "我聪"}, function (result) {
// 	console.log('成功删除文档');
// 	console.log('---');
// });

// dao2.findData({"name": "我聪"}, function (result) {
// 	console.log('查询结果：')
// 	console.log(result);
// 	console.log('---');
// });