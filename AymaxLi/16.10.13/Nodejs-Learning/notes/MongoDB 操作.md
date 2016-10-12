# MongoDB 操作

标签（空格分隔）： MongoDB

---

### 创建/切换数据库
```
use DATABASE_NAME
```
---
### 查看所有数据库
```
show dbs
```
---
### 删除当前数据库
```
db.dropDatabase()
```
---
### 插入文档
```
db.COLLECTION_NAME.insert(document)
```
如果该集合不在该数据库中， MongoDB 会自动创建该集合并插入文档
---
### 更新文档 update()
格式
```
db.collection.update(
   <query>,
   <update>,
   {
     upsert: <boolean>,
     multi: <boolean>,
     writeConcern: <document>
   }
)
```
参数说明
> - query : 查询条件，类似 sql update 查询内 where 后面的。
- update : update 的对象和一些更新的操作符（如 $, $inc...）等，也可以理解为 sql update 查询内 set 后面的
- upsert : 可选，这个参数的意思是，如果不存在 update 的记录，是否插入 objNew （true 为插入，默认是 false，不插入）
- multi : 可选，**mongodb 默认是 false, 只更新找到的第一条记录**，如果这个参数为 true, 就把按条件查出来多条记录全部更新。
- writeConcern\* :可选，抛出异常的级别。

实例：通过 ````update()``` 方法来更新标题 (title) :
```
// 插入
db.col.insert({
    title: 'MongoDB 教程', 
    description: 'MongoDB 是一个 Nosql 数据库',
    by: '菜鸟教程',
    url: 'http://www.runoob.com',
    tags: ['mongodb', 'database', 'NoSQL'],
    likes: 100
});
// 修改
db.col.update({'title':'MongoDB 教程'},{$set:{'title':'MongoDB'}});
// 输出的信息
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
```
---
### 替换已有文档 save()
```save()``` 方法通过传入的文档来替换已有文档
语法格式
```
db.collection.save(
   <document>,
   {
     writeConcern: <document>
   }
)
```
参数说明
> - document : 要 save 的文档
- writeConcern :可选，抛出异常的级别
实例：替换 _id 为 56064f89ade2f21f36b03136 的文档数据
```
db.col.save({
	"_id" : ObjectId("56064f89ade2f21f36b03136"),
    "title" : "MongoDB",
    "description" : "MongoDB 是一个 Nosql 数据库",
    "by" : "Runoob",
    "url" : "http://www.runoob.com",
    "tags" : [
            "mongodb",
            "NoSQL"
    ],
    "likes" : 110
})
```
---
### 删除文档 remove()
格式
```
db.collection.remove(
   <query>,
   {
     justOne: <boolean>,
     writeConcern: <document>
   }
)
```
参数说明
>- query :（可选）删除的文档的条件
- justOne : （可选）如果设为 true 或 1，则只删除一个文档
- writeConcern :（可选）抛出异常的级别

---
### 查询文档
- ```find()``` 返回集合的所有文档
```
db.COLLECTION_NAME.find()
db.COLLECTION_NAME.find().pretty() // 加上 .pretty（）可以让文档展开
```
- ```findOne()```
只返回一个文档
---
### AND 条件

实例：通过 by 和 title 键来查询菜鸟教程中‘MongoDB 教程’的数据

```
db.col.find({"by":"菜鸟教程", "title":"MongoDB 教程"}).pretty()
// 输出
{
        "_id" : ObjectId("56063f17ade2f21f36b03133"),
        "title" : "MongoDB 教程",
        "description" : "MongoDB 是一个 Nosql 数据库",
        "by" : "菜鸟教程",
        "url" : "http://www.runoob.com",
        "tags" : [
                "mongodb",
                "database",
                "NoSQL"
        ],
        "likes" : 100
}
```
---
### OR 条件
实例查询键 by 值为‘菜鸟教程’或键 title 值为‘MongoDB 教程’的文档
```
db.col.find({$or:[{"by":"菜鸟教程"},{"title": "MongoDB 教程"}]}).pretty()
{
        "_id" : ObjectId("56063f17ade2f21f36b03133"),
        "title" : "MongoDB 教程",
        "description" : "MongoDB 是一个 Nosql 数据库",
        "by" : "菜鸟教程",
        "url" : "http://www.runoob.com",
        "tags" : [
                "mongodb",
                "database",
                "NoSQL"
        ],
        "likes" : 100
}
```
---
### MongoDB 条件语句

操作|格式|范例
:-|:-|:-
等于|```{<key>:<value>}```|```db.col.find({"by":"菜鸟教程"}).pretty()```
小于|```{<key>:{$lt:<value>}}```|```db.col.find({"likes":{$lt:50}}).pretty()	```
小于或等于|```{<key>:{$lte:<value>}}```|```db.col.find({"likes":{$lte:50}}).pretty()```
大于|```{<key>:{$gt:<value>}}```|```db.col.find({"likes":{$gt:50}}).pretty()```
大于或等于|```{<key>:{$gte:<value>}}```|```db.col.find({"likes":{$gte:50}}).pretty()```
不等于|```{<key>:{$ne:<value>}}```|```db.col.find({"likes":{$ne:50}}).pretty()```

---
### $type 操作符

类型	|数字	|备注
:-|:-|:-
Double	|1	 |
String	|2	 |
Object	|3	 |
Array	|4	 |
Binary data	|5	 |
Undefined	|6	|已废弃。
Object id	|7	 |
Boolean	|8	 |
Date	|9	 
Null	|10	 
Regular Expression	|11	 
JavaScript	|13	 
Symbol	|14	 
JavaScript (with scope)	|15	 
32-bit integer	|16	 
Timestamp	|17	 
64-bit integer	|18	 
Min key	|255	|Query with -1.
Max key	|127	 

实例：获取"col"集合中 title 为 String 的数据
```
db.col.find({"title" : {$type : 2}})
```