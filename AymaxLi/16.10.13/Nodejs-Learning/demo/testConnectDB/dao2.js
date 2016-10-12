var MongoClient = require('mongodb').MongoClient

// var assert = require('assert');

var collectionUrl = 'mongodb://localhost:27017/haha';

function insertData(data, callback) {
	// 插入数据
	MongoClient.connect(collectionUrl, function(err, db) {
		// assert.equal(null, err);
		var col = db.collection('users');
		col.insert(data, function (err, result) {
			if(!err) {
				callback(result.ops);
			} else {
				console.log('Error: ' + err);
			}
		})
		db.close();
	});
}

function findData(query, callback) {
	// 查找数据
	MongoClient.connect(collectionUrl, function(err, db) {
		// assert.equal(null, err);
		var col = db.collection('users');
		col.find(query).toArray(function(err, result) {
			if(!err) {
				callback(result);
			} else {
				console.log('Error' + err);
			}
		});
		db.close();
	});
}

function deleteData(query, callback) {
	// 删除数据
	MongoClient.connect(collectionUrl, function(err, db) {
		// assert.equal(null, err);
		var col = db.collection('users');
		col.remove(query, function(err, result) {
			if(!err) {
				callback(result);
			} else {
				console.log('Error:' + err);						
			}
		});
		db.close();
	});
}

function updateData(query, news, callback) {
	// 更新数据
	MongoClient.connect(collectionUrl, function(err, db) {
		// assert.equal(null, err);
		var col = db.collection('users');
		col.update(query, news,function(err, result) {
			if(!err) {
				callback(result);
			} else {
				console.log('Error:' + err);						
			}
		});
		db.close();
	});
}

exports.findData = findData;
exports.insertData = insertData;
exports.deleteData = deleteData;
exports.updateData = updateData;