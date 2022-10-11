<template>
  <div>
     <canvas id="myCanvas" ref="canvas" :width="width" :height="height"></canvas>
  </div>
</template>

<script>
import {Garden,Throttle} from "@/utls";
export default {
  data() {
    return {
      width: 500,
      height: 500,
      tiem: Date.now(),
      canvasNumber: 180,
      GardenArr: [],
      Tirm: null
    };
  },
   methods: {
   throttle(fun,dir,inert = undefined){
    let  time ;
    if(inert){
        return (...ags)=>{
            if(!time ||  Date.now() - time >=dir ){
                fun(...ags)
                time =  Date.now()
                return 
            }
        }
    }
    return (...ags)=>{
    if(time){
       return ; 
    }
    time = setTimeout(()=>{
        fun(...ags)
        time=null
    },dir)
}
  
    }
  },
  created() {
    this.height = window.innerHeight;
    this.width = window.innerWidth;
  },

  mounted() {
    let canvas = this.$refs.canvas;
    if (canvas.getContext) {
      const ctx = canvas.getContext("2d");
      let Mycanvas = () => {
        let x = Math.floor((Math.random() * this.width) / 2);
        let size = 5 + Math.random() * 2;
        let cany = Math.random() / 2 + 0.1;
        let deftirem = 10;
        requestAnimationFrame(() => {
          let lastT = Date.now();
          if (lastT - this.tiem > deftirem) {
            this.tiem = lastT;
            let mg = new Garden(ctx, x, this.height, size, cany, false);
            mg.render();
            this.GardenArr.push(mg);
            
          }
          if (this.GardenArr.length === this.canvasNumber) {
            return;
          } else {
            Mycanvas(this.canvasNumber);
          }
        });
      };
      Mycanvas();
      const run = () => {
        let moveN = Math.floor(Math.random() * this.GardenArr.length);
        this.Tirm = requestAnimationFrame(() => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          for (let i = 0; i < this.GardenArr.length; i++) {
            if (this.GardenArr[i] !== null) {
              this.GardenArr[i].y = 
                this.GardenArr[i].y - this.GardenArr[i].cany <= 0
                  ? this.height
                  : this.GardenArr[i].y - this.GardenArr[i].cany;
              this.GardenArr[i].render();
            }
          }
          if (
            moveN > this.GardenArr.length / 10 &&
            moveN < this.GardenArr.length / 2
          ) {
            requestAnimationFrame(() => {
              if (this.GardenArr[moveN] !== null) {
                if (this.GardenArr[moveN].y < 300) {
                  this.GardenArr[moveN].y = 0;
                }
              }
            });
          }
          run();
        });
      };
      run();
       let f = Throttle(() => {
        cancelAnimationFrame(this.Tirm);
        let tirm = setInterval(()=>{
        cancelAnimationFrame(this.Tirm);
          clearInterval(tirm)
          this.GardenArr.splice(Math.floor(Math.random() * this.GardenArr.length),Math.floor(Math.random() * this.GardenArr.length));
          run();
          Mycanvas()
        },16)
        return;
      },3000,true)
      window.onresize = f ;
      window.addEventListener('resize',(e)=>{
        this.width = window.innerWidth;
        this.height = window.innerHeight;
      })
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") {
          cancelAnimationFrame(this.Tirm);
        } else if (document.visibilityState === "visible") {
          cancelAnimationFrame(this.Tirm);
          run();
        }
      });
    }
  },
  beforeDestroy() {
    cancelAnimationFrame(this.Tirm)
    this.$emit("u", this.GardenArr);
    window.onresize = null 
    window.removeEventListener('resize',()=>{});
    document.removeEventListener('visibilitychange',()=>{})
  }
}
</script>

<style lang="less" scoped>
#myCanvas {
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
}
</style>