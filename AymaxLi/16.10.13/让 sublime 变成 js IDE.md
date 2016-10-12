# 让 sublime 变成 js IDE

标签（空格分隔）： sublime 设置

---

## 前提
安装了 node.js 并配置好环境变量

## 原理
通过 sublime text 在 cmd 里面输入 ```node xxx.js``` 来运行 js 文件

## 配置
- 打开Sublime Text，选择 Tools > Build System > New Build System...
- 输入并保存为保存为Node.sublime-build，或者你喜欢的名字（保存位置Data\Packages\User文件夹）
```
{"cmd": ["node", "$file"],"selector": "source.js"}
```
- 在 Tools > Build System 里选择刚刚创建好的 Node，就可以调试了

## 使用
写好js文件后，按下 ctrl + B 运行（mac 的同学应该是 command + B）

