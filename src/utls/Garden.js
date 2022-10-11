export default class {
    constructor(ctx,x,y,size,cany,chenge){
        this.ctx = ctx;
        this.x = x ;
        this.y = y ;
        this.size = size ;
        this.cany = cany ;
        this.change = chenge;
    }
    render(){
      
      this.ctx.save()
      this.ctx.translate(this.x,this.y)
      this.ctx.fillStyle = `rgba(255,245,250,0.4)`;
      this.ctx.beginPath()
      this.ctx.arc(this.x, 0, this.size, 0, Math.PI *2, 0);
      this.ctx.fill();
      this.ctx.restore()
    }
}