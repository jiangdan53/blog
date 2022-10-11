export default function (fun,dir = 100,inert = false){
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