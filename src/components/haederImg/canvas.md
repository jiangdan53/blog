1. # **1/1** haederimg 组件 用于展示首页头部图片 以及头部提示信息展示 
 1. 头部图片展示为背景图 
 ### 无序列表
   1. 文字组件为插槽 通过自定义内容传入组件展示
   5. ererer
   6. sdadasd
 - 我们还需要使用canvas来设置一个好看的动画 来实现
  - canvas
     - 基础 canvas是一个类似于img元素一样的东西 
      - 与img元素的区别 
       - canvas和img元素主要就是没有src属性 也无法发送网络请求 画面需要产生的内容由js控制
      - canvas 通过添加width,height给定画布的坐标最大值 然而我们画
  - 得到我们的canvas 我们可以通过给canvas一个id来得到他的真实dom元素 
  - 得到后就可以进行绘画了 
   - 
```js
let canvas = document.getElementById('canvas'); // 得到真实元素 
if(canvas.getContext){ //判断是否得到的是canvas元素 如果部是则不具备getContext() 方法 此方法用于设置我们画布需要展示的样式 可以是2d 可以是3d
const ctx = canvas.getContext('2d');
    // fillRect(x,y,width,height) 我们的canvas的x,y的坐标轴是以元素的左上顶点位置开始为0,0 一直到右下顶点为最大绘画区域 width,height 是我们需要绘制的正方形的长宽
    ctx.fillRect(25, 25, 100, 100); //此方法为为我们需要绘制一个实心的正方法 
    // ctx.clearRect(x,y,width,height) 代表我们需要清理的图形区域 同上方法一样 
    ctx.clearRect(45, 45, 60, 60);
    // ctx.strokeRect(x,y,width,height) 此方法代表我们需要在画布中生成一个具有空心的正方形 与fillRect()所画的形状相反
    ctx.strokeRect(50, 50, 50, 50);
}
```
# canvas绘图路径 
 - 也就是非常重要的知识 我们需要指定一个路径来生成我们需要绘制的点 线 弧线 以及我们需要的图形初始位置， 总的来说就是一个需要图形生成器
 下面是js代码以及我们的api 
 ```js
 {
const canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    // beginPath() 此方法就是一个生成器 需要参数我们可以理解为画笔
    ctx.beginPath();
    // moveTo(x,y) 此方法是我们所需要绘制的线的起始位置 没有此方法我们所绘制的图形无法显示 因为没有起始位置
    
    ctx.moveTo(75, 50);
    //lineTo(x, y); 从我们的其实位置绘制一条直线 参数为x,y
    ctx.lineTo(100, 75);
    ctx.lineTo(100, 25);
    //closePath() 没有参数 指定我们需要从最后一个线段的末尾位置向起点位置添加一条直线 可以理解为将图形封闭起来
    //ctx.closePath() 
    // storke() 绘制一个空心的图形
    // ctx.storke()
    // fill() 绘制一个实心的图形 
    ctx.fill();
  }
 }
 ```
 # 绘制弧线 
  - 弧线我们通常会用到arc()，arcTo()
   ```js
   {
    ...同以上代码相同的获取元素设置需要展示图形的样式 
    ctx.arc(x,y,半径，其实弧度，结束弧度，是否逆时针) // 此方法的xy 代表的是圆心的位置 半径决定了我们的园的大小 ，起始位置决定了我们圆的起始弧度，也就是我们从圆弧上的那一个点开始画园，注意是弧度不是角度，通常我们的弧度用Math.PI来表示一个180度 ，结束弧度也就是我们需要的在哪里结束 注意这个结束弧度于最后一个参数的是否为逆时针有着直接的关系 因为我们的园上的每个弧度是固定的 而最后一个参数会直接影响到我们所化的园的弧度大小 也就是我们顺时针画一个0度到90度的园那么也就是一个4/1园 如果我们是逆时针那么就是一个4/3园

   }
   ```
   # ccanvas实现向上的小气泡
    - 此方法需提前申明需要创建的元素的类 并且该类需要提供render方法便于生成图形
   ```js
      let canvas = this.$refs.canvas;
    if(canvas.getContext){
      const ctx = canvas.getContext('2d');
      let heigth = canvas.height
    const Mycanvas = (maxG)=>{  // 定义一个函数生成指定数量的图形
        let x = Math.floor(Math.random() * window.innerWidth / 2); // 定义图形生成的范围 因为需要实现canvas覆盖首屏所以需要我们获得屏幕的一半我们的图形才能是出现在我们屏幕的可视范围内
        let size = 5 + Math.random() * 3; // 设置图形的大小 因为这里我们生成的是圆所以我们只需要生成半径即可
        let cany = Math.random() +0.5 ; // 定义图形在y轴方向上的偏移量 因为气泡都是垂直向上的
        let deftirem = 40; // 设置图形生成的间隔时间 因为我用的是requestAnimationFrame() 这个api是将我们的屏幕分成了一秒钟60帧来执行里面的回调函数 在动画量大时比setInterval,setTimeout 更好不会造成动画堵塞
      requestAnimationFrame(()=>{
        let lastT = Date.now()  // 获取动画的执行时间 以便于实现定时器一样的效果也就是延迟并不是这个api函数就不执行了
          if( lastT - this.tiem > deftirem){ // 查看但前的生成图形的时刻是否以到达 
              this.tiem = lastT ; // 将当前到达的时间付给vue组件中的data数组中的时间戳
             let mg = new Garden(ctx,x,heigth,size,cany); // 得到每个图形的类对象包括canvas元素 以及x,y,size,偏移量 这里的cany
             mg.render(); //调用该类的render方法 生成一个图形 因为每个图形都是一个单独的个体 方便我们控制起移动
              this.GardenArr.push(mg) // 将该对象放入到数组中
             this.cont++ // 这是一个计数器 计算当前已生成的图形的数量
          }
          if(this.cont === maxG){ // 当图形的数量到达了指定目标即可停止创建元素的函数
            return ;
          }else{
            Mycanvas(maxG) // 入过数量不够继续递归调用
          }
            
      })
    }
    Mycanvas(120); // 需要调用一次该函数 初始化
    const run = ()=>{ // 定义移动函数
        let moveN = Math.floor(Math.random() * this.GardenArr.length); // 在数组中找到一个下标以便于我们在动画过程中消失该图形
      requestAnimationFrame(()=>{ 
          ctx.clearRect(0,0,canvas.width,canvas.height) //清楚上一次以画出来的图形
        for(let i = 0 ; i < this.GardenArr.length;i++){ // 循环变量数组 实现所有图形的移动
          this.GardenArr[i].y = (this.GardenArr[i].y - this.GardenArr[i].cany) <= 0 ? canvas.height : this.GardenArr[i].y - this.GardenArr[i].cany ; //当我们的偏移量递减到了0 我们要让他重新出现在我们的底部往上走
          this.GardenArr[i].render()  // 该方法的render方法渲染新的位置
        }
        if(moveN > 10  && moveN < 60) { // 得到一个区间 区消除掉已经出现的图新 
          requestAnimationFrame(()=>{
            if(this.GardenArr[moveN].y < 400){ // 判断当前需要消除的元素的y轴坐标是否以及到了可以消除的线
            this.GardenArr[moveN].y = canvas.height // 让不在继续绘画的元素回到我们的底部
            }
          
          })
          
        }
        run() // 递归调用自己 不停渲染
      })
    }
    run() // 初始画调用移动函数 
    }
   ```

 