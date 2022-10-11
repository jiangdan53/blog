## 分页组件 
 - 需传递数据为 
  1. 使用组件需注册一个事件名为chengePage 的事件 
    - 次事件为分页组件的回调事件 负责改变当前页面 
    - 由组件本身触发 传值给父组件 触发$emit('chengePage',参数)
    - 可选参数 
     1. limit 表示当前每页展示条数 默认为10
     2. curIndex 表示当前展示第几页 默认为1 
     3. totlo 表示数据总数 默认为0，
     4. pageNumber 表示展示展示多少个页码 默认为5
    - 计算属性
     1. totloPage 次属性 计算总页码 
     2. getPageMax 此属性 计算当前页码之后的最大展示页码 
     3. getPageMix 此属性 计算当前页码之后的最小展示页码 
     4. showPages 此属性 计算出当前展示的页码区间 返回一个数组 通过循环本数组展示页码 
methods 创建点击事件 chengePage 
 - 此是将接收一个参数 为用户的点击事件 以及触发emit将数据交给父组件处理