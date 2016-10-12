# node.js 网络操作

标签（空格分隔）： node.js

---

使用NodeJS内置的http模块实现一个简单HTTP服务器
```
var http = require('http');

http.createServer(function (request, response) {
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('haha\n');
}).listen(8080);

console.log('Server running at http://127.0.0.1: 8080/');
```





