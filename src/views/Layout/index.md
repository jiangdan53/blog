## 布局组件 
 1. nav导航区我们进入页面时对其进行隐藏 点击浮动按钮显示 使用$emit进行父子组件通信 以及能让父组件控制其显示隐藏
 2. 内容去的浮动按钮我们将其作为元素呈现 当页面滚动到一定位置不展示文字只展示图标 
 3. 博客内容区
  - 实现方法 使用插槽来实现组件的传递
  - 组件 
   1. imgaeheder展示组件 
    - 实现使用插槽传入需要显示的文字 以及需要展示的组件 
    - 背景图 通过props传参的形式来实现
    - 大小通过定义主页图片格式以及文章格式使用怕props
   2. 文字图片展示区 （使用md文档格式来实现文档的展示）
    - 实现 使用正常的组件间的传值来事项(预想使用md)
    - 相关插件 showdown
    ```js
    // 第一步引入showdown 包
    let converter = new showdown.Converter();
    //将markdown字符串转为html代码
    let html = converter.makeHtml('参数可以是markdown字符串可以是markdown文件')
    // 得到html字符串 将其放入到你想要展示的位置即可
    
    ```
