# Ext

标签（空格分隔）： Ext

---
## Ext.onReady( fn , [scope] , [options] )
> 当ExtExt框架全部加载完后触发该函数( before onload and before images are loaded )，
fn 是onReady后调用的回调函数，
[scope] 是函数执行时绑定的作用域，默认window，
[options] 是一个对象，表示fn函数执行的一些其他特性，有delay， priority， dom属性：

> delay是一个number以ms为单位delay执行fn，
priority是一个number...(看不懂，懂的教我)...
dom是一个Boolean值，true代表等到dom完全加载完才开始触发这个回调函数，默认为false

### 大多数使用的时候只需要第一个参数


----------


## 表单的一些config
> 最基本的textfield表单

- xtype是指定这个组件的类型 (什么textfield,numberfield...)
- vtype是valueType,就是可以指定输入的内容的类型，比如 vtype：eamil,
- fieldLabel是前面的label
- emptyText是占位符
- allowBlank是非空设定，默认为true
- blankText用来设置提示，msgTarget设置提示位置

> 从combobox(下拉选择框)开始接触到Ext的一种数据格式：store



            Ext.define('User', {
			    extend: 'Ext.data.Model',
			    fields: ['考试名称', '班级', '考试时间'],
			});

			var store = Ext.create('Ext.data.Store', {
			    model: 'User',
			    proxy: {
			        type: 'ajax',
			        url : 'json/test.json',
			        reader: {
			        	type: 'json',
			        	rootProperty: 'data'
			        }
			    },
			    // autoLoad:true
			});
			
			//json
			{
            	"fields": ["考试名称", "班级", "考试时间", "查看成绩"],
                "data": [{
                    "考试名称": "Lisa",
                    "班级": "lisa@simpsons.com",
                    "考试时间": "555-111-1224",
                    "查看成绩":"放大镜"
                }, {
                    "考试名称": "Bart",
                    "班级": "bart@simpsons.com",
                    "考试时间": "555-222-1234",
                    "查看成绩":"放大镜"
                }, {
                    "考试名称": "Homer",
                    "班级": "homer@simpsons.com",
                    "考试时间": "555-222-1244",
                    "查看成绩":"放大镜"
                }, {
                    "考试名称": "Marge",
                    "班级": "marge@simpsons.com",
                    "考试时间": "555-222-1254",
                    "查看成绩":"放大镜"
                },{
                    "考试名称": "哈哈",
                    "班级": "哈哈哈哈哈一班",
                    "考试时间": "120838254",
                    "查看成绩":"放大镜"
                }]
            }

> define的这个model继承了Ext.data.model并且指定了field。可以在运用这个model来读取json使指定了要读取的field的格式，proxy的type指定了用ajax请求，url指定路径，用reader的type来指定读取数据的格式，上面的代码为json，rootProperty是从json的哪里开始读，默认是从整个Json对象开始读，这样来指定store之后，可以直接在create方法里把autoLoad设成true来load这个store，也直接在外面load这个store...storeId获取方法。。。。Ext.data.StoreManager.lookup('simpsonsStore'),
(虽然我没用这个..)


----------
## 关于GridPanel
- GridPanel的store也可用上面的方法load出来
- GirdPanel的columns配置，可以是对象，当columns是数组时，每一项就对应一列的items
讨论columns是数组时的情况。每一项的text是每一列的标题，而dataIndex就是对应store数据里面的field，可以获取store里面对应的数据
- GirdPanel的selModel配置：默认是rowmodel...可以显示修改这个rowmodel，比如可以把这个gridpanel的selmodel设成
 

        Ext.create('Ext.selection.CheckboxModel'，{mode:'SIMPLE'}）

  这样这个grid的每一行前端就会有多选框出现...mode是设置这个选择框的，mode:'SINGLE'..可设为单选框........运用


        var rows=Ext.getCmp('#GirdPanel').getSelectionModel().getSelections(); //获取所有选中行


- viewConfig可用于配置插件...说是插件其实也是Ext自带的。。。viewConfig里面可以有一个plugins的属性，在里面指定ptype可以引入插件..


         viewConfig: {
			plugins: {
				ptype:'gridviewdragdrop',
				dragText: '拖动至'
			}
		},
- 这段可以引入一个在gird中拖放行元素的插件
- 在写grid的时候接触到一个叫dockedItems的东西，跟items的用法相似，dockedItems里面的项可以设置一个dock配置，这个配置的值可以是'top','bottom'这些方位，用于定位
- 关于toolbar(工具栏的写法),bar分为了bbar，tbar，lbar，rbar..分别是bottomBar，topBar以此类推...可以直接用于定位工具栏，还有一个fbar...类似于bbar，是footerBar的意思


----------
## tabPanel
- tabPosition调整tab标签的位置
- tabRotation调整标签的方向
- activeItem调整哪个是最开始显示的


----------
## 布局
#### Card布局的翻页

    var navigate = function(panel, direction, prev, next) {
		var layout = panel.getLayout();  //获取panel的layout
		layout[direction]();             //根据传入参数实现翻页
		prev.setDisabled(!layout.getPrev());   //根据是否存在上一页设置上一页的disabled属性
		next.setDisabled(!layout.getNext());
	}

- 获取设置这个布局的panel然后调用这个panel的getLayout方法获取这个panel的layout配置。
- 当这个layout设置成'card'的时候，getLayout获取到的对象可以调用next()或者prev()方法进行翻页
- getLayout获取到的对象还可以通过getPrev()和getNext()获取上一页和下一页的对象