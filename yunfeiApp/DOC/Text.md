# Text

* 用于显示文本的React组件；支持嵌套、样式、以及触摸处理
* 文本与Web服务相同 会被继承 、

## 嵌套文本

"
    <Text style={{fontWeight:'bold'}}>
        a
        <Text style={{color:"red"}}>
            b
        </Text>
    </Text>
"
* 而实际上在框架内部，这会生成一个扁平结构的NSAttributedStringh或是SpannableString

"
    "I am bold and red"
    0-9: bold
    9-17: bold, red
"

* 嵌套视图（仅限IOS)

## 容器

* <Text> 元素在布局上不同于其他组件；在Text内部的元素不在使用FlexBox布局，而是采用文本布局。这意味着 <Text>内部的元素不在是一个矩形，而可能会在行末进行折叠

## 样式继承限制
+ 文本信息只能放置在 Text 类似于font-size属性，这样定制更为严谨


