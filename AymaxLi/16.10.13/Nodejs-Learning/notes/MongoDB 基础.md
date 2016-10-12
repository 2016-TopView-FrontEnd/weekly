# MongoDB 基础

标签（空格分隔）： MongoDB

---

[toc]

---

## 与 SQL 术语比较

SQL | MongoDB | 说明
:-|:-|:-|
database |database|数据库
table|collection|数据库表 / 集合
row|document|数据记录行 / 文档
column|field|数据字段 / 域
index|index|索引
table joins||表链接，MongoDB 不支持
primary key|primary key|主键，MongoDB 自动将 ```_id``` 字段设置为主键

## 数据库 database
MongoDB的单个实例可以容纳多个独立的数据库，每一个都有自己的集合和权限，不同的数据库也放置在不同的文件中

## 文档 document
文档是一个键值 (key-value) 对（感觉像是 JSON 对象）。MongoDB 的文档**不需要设置相同的字段**，并且**相同的字段不需要相同的数据类型**，这是 MongoDB 非常突出的特点

## 集合 collection
集合就是 MongoDB 文档组，存在于数据库中，没有固定的结构
### 集合命名
>- 不能是空字符串 ```""```
>- 不能含有 ```\0```（空字符），这个字符表示集合名的结尾
>- 集合名不能以"system."开头，这是为系统集合保留的前缀
>- 不能含有保留字符

## MongoDB 数据类型
数据类型|描述
:-|:-
String | 字符串，UTF-8 才合法
Integer | 整型数值，根据所采用的服务器可分为 32 位和 64 位
Boolean | 布尔值
Double | 双精度浮点值
\* Min / Max keys | 将一个值与 BSON（二进制的 JSON）元素的最低值和最高值相对比
\* Arrays | 用于将数组或列表或多个值存为一个键
Timestamp | 时间戳，记录文档修改或添加的具体时间
Object | 用于内嵌文档
Null | 用于创建空值
\* Symbol | 符号，该数据类型基本上等同于字符串类型，但不同的是，它一般用于采用特殊符号类型的语言
Date | 日期时间，用 UNIX 时间格式来存储日期或时间
Object ID | 对象 ID，即文档的 ID
Binary Date | 二进制数据
Code | 代码类型
Regular expression | 正则表达式

