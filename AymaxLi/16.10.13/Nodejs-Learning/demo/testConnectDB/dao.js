// var mongodb = require('mongodb');
// var server = new mongodb.Server('localhost',27017,{auto_reconnect:true});
// var db = new mongodb.Db('mydb',server,{safe:true});
// db.open(function(err,db){
//  if(!err) {   
//  console.log('connect');
//  } else {
//    console.log(err);
//  }
// });


var mongodb = require('mongodb');

var server = require('./server');

var db = new mongodb.Db('haha', server);

var col = db.collection('users');

function insertData(data, callback) {  
	// 插入数据
	db.open(function(err, db){
		if(!err) {
			col.insert(data, function(err, result) {
				if(!err) {
					db.close() //关闭
					callback(result);
				} else {
					console.log('Error:' + err);						
				}
			});
		} else {
			console.log('Error:' + err);
		}
	});
}

function findData(query, callback) {
	// 查找数据
	db.open(function(err, db){
		if(!err) {
			col.find(query).toArray(function(err, result) {
				if(!err) {
					callback(result);
				} else {
					console.log('Error' + err);
				}
			});
		} else {
			console.log('Error:' + err);
		}
	});
}

function deleteData(query, callback) {
	// 删除数据
	db.open(function(err, db){
		if(!err) {
			col.remove(query, function(err, result) {
				if(!err) {
					callback(result);
					db.close() //关闭
				} else {
					console.log('Error:' + err);						
				}
			});
		} else {
			console.log('Error:' + err);
		}
	});
}

function updateData(query, news, callback) {
	// 更新数据
	db.open(function(err, db){
		if(!err) {
			col.update(query, news, function(err, result) {
				if(!err) {
					callback(result);
					db.close() //关闭
				} else {
					console.log('Error:' + err);						
				}
			});
		} else {
			console.log('Error:' + err);
		}
	});
}

exports.findData = findData;
exports.insertData = insertData;
exports.deleteData = deleteData;
exports.updateData = updateData;

