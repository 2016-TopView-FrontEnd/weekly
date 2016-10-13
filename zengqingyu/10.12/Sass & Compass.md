# Sass & Compass

标签（空格分隔）： 分享会

---

> 以下是个人在Sass学习过程的体会：


----------

# Sass


----------


## 拥有变量的好处


----------


在 以往我写CSS 的时候，对一些相同的值（比如颜色：#123345），要复用的时候，因为记不住具体的值，所以总是要回去复制，但是，有了变量，就可以像写 JS 一样直接使用变量了， 而且更改时也很方便！

```
$mainColor: #123456
.header {
    background-color: $mainColor;
}
... // 此处好多行代码

.XX{
    background-color: $mainColor;
    // 直接使用变量名
}

```


----------


## 提供了map类型的变量


----------


在我的实践，map对于存储变量数据很有用！

```
// 看起来有点像是js中的对象
$colors: (
	placeholder: #B7B7B7,
	font: #3B3B3B,
	error: #F83636,
	success: #34FC60,
	inputBgc: white,
	inputFont: #767676,
	formBgc: #193441,
	labelFont: #273466,
	avator: #BE76C0
);

// 使用sass提供的 map-get() 来获取相应的value值
.XX {
    color: map-get($colors, error);
}

```
在上面的例子中，我们每一次拿颜色都是用

`map-get($colors, XXX)`

这样会敲到手酸！


----------


## @function 函数


----------


sass支持函数,

    @function  |  @return [value]

也支持逻辑判断：

    @if  |  @else  |  not

所以对于以上取颜色可以用一个方法来完成，并做一个 **@if 判断**

```
@function color($color){
    // map-has-key() 返回有没有的 key
    @if not map-has-key($colors,$color){
        @warn "No color found for `#{$color}` in $colors map";
    }
    @return map-get($colors,$color);
}

.XX {
    color: color(error);
}

```
@function 有挺多好用的用途， 不过我还没更多地使用 @function = =。


----------


## 关于选择符


----------
以往写 CSS 的选择器是这样的
```
.super {
    background-color: red;
    //...
}

.super .sub {
    color: white;
    // ...
}

.super .sub:focus {
    color: blue;
    // ...
}

.super .sub:focus + label {
    ...
}
```

- 缺点： 当写多了以后，回头去看时，可能会比较乱！ （个人感觉）


在Sass 中的实现：

### 使用  选择器嵌套

```

.super {
    background-color: red;
    //...
    .sub {
        color: white;
        // ...
    }
    .sub:focus {
        color: blue;
        // ...
    }
}
// 编译出来就是上面的css
```
### 使用父选择器 & 进一步简化
```
.super {
    background-color: red;

    .sub {
        color: white;
        
        &:focus {   & : 即为 .sub
            color: blue;
        }
    }
}

// 这样的结构看起来更为清晰
```
### 然而，使用选择器嵌套 并**不被推荐使用** ！

> 因为浏览器在选择器查询时总是从右向左开始查询的，**过多嵌套** 可能会造成性能问题

> 在CSS 中有一种命名方式叫做 **BEM**  , 类似的长相：

```
.block {}
.block__element{}  // 用__代替了 .block element
.block--element{}  // 用--代替了 .block element

```

- 好处： 避免了 **嵌套查询**， 而且又不失 **“嵌套”结构**
- 缺点： **书写麻烦**， 要写好多东西


----------


## 使用#{} 插值 、 @at-root

----------
> 插值 可将一个变量的值插入字符串、类名中
###  使用 #{ } 生成类名
```
$list: red, blue, green;
@for $i from 1 through length($list) {
  .span-#{$i} {
    color: nth($list, $i);
  }
}

// CSS
.span-1{
    color:red
}
.span-2{
    color:blue
}
.span-3{
    color:green
}
```
## 用插值 #{ } 配合 @at-root
> @at-root: 让选择器不发生任何的嵌套，直接移除了父选择

### 这两者配合使用可以实现 BEM 的命名方式 且 **不失结构**
```
// SCSS
.main {
	font-family: $main-font;

	@at-root{
		#{&}-headline {
			font: {                 // 属性嵌套
				family: $main-font;
				size: 16px;
			}
		}

		#{&}-detail {
			font-size: 12px;
		}
	}
}

// CSS
.main {
  font-family: Arial, sans-serif;
}

.main-headline {
  font-family: Arial, sans-serif;
  font-size: 16px;
}

.main-detail {
  font-size: 12px;
}
```


----------
## Sass提供一堆调整颜色的方法

### 但是， 除了lighten（）和 darken（）外，我不知道有什么用途！！
#### 小例子： 慕课教程的颜色卡片 （改良版）

----------

# Compass

## 创建项目，也提供mixin库、函数库等

#### 小例子： form的input框
 
----------

## 个人笔记

----------


- [输出方式][1]
- [嵌套][2]
- [变量][3]
- [混合宏 (@mixin & @include)][4]
- [占位符%][5]
- [混合宏 VS 继承 VS 占位符][6]
- [插值][7]
- [运算][8]
- [Map][9]


  [1]: http://note.youdao.com/noteshare?id=35dd8bb95a82432ccb97be367c02b537
  [2]: http://note.youdao.com/noteshare?id=ff4a455a0eb8b4edd3be25bcb5a1e06f
  [3]: http://note.youdao.com/noteshare?id=669947b2ac6386ec153d1909b95c7bdd
  [4]: http://note.youdao.com/noteshare?id=fc217b6acdc8c4a082793196e4e9afb7
  [5]: http://note.youdao.com/noteshare?id=3f88507800d8802e498ea13171cf3cba
  [6]: http://note.youdao.com/noteshare?id=73f13aa828ed39aa371fa504f2a10066
  [7]: http://note.youdao.com/noteshare?id=1bccb0887abdea1d562350f86ceea55b
  [8]: http://note.youdao.com/noteshare?id=42dbe06975d149a7a99add5b525af947
  [9]: http://note.youdao.com/noteshare?id=5c953e5e60ce75d17aa7ccf00d162680