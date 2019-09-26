# 处理文本输入
* TextInput是一个润徐用户输入文本的基础组件。
* onChangeText接受函数，文本变化时调用
* onSubmitEdting 在文本提交后（用户按下软键盘上的提交键）调用

## TextInput 

* 容许在应用中通过键盘输入文本； 包含多种特性 自动完成、自动大小写、占位文字

* onChangeText 是唯一读取值的方式

- 例子

"
    export default class UselessTextInput extends Component {
    constructor(props) {
        super(props);
        this.state = { text: 'Useless Placeholder' };
    }

    render() {
        return (
        <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
        />
        );
    }
    }
"

- 注意有些属性仅在multiline为true或者为false时有效。当 multiline=false时，为元素的摸一个边添加边框样式不会生效； 可使用view来包裹TextInput

