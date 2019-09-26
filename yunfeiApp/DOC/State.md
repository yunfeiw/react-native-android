# State(状态)
* 两种数据控制一个组件：props和state。props是在父组件中指定，而且已经指定，在被指定的组件的生命周期中则不再改变。对于需要改变的数据，我们使用state

* 在constructor中初始化state，使用setState方法来修改

* 实际开发时一般不使用定时器函数 setInterval/setTimeout来操作 state。

* 每次代用setState，组件都会重新执行render方法重新渲染

+ 一切界面变化都是状态 state变化
+ state的修改必须通过setState变化
+ this.state。likes =100// 赋值无效
+ setState是一个merge 合并操作，只修改指定属性，不影响其他属性

+ setState是一个异步操作 ， 修改 不会马上生效

