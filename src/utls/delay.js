export default function(delay=200){
    return new Promise(res=>{
        setTimeout(() => {
            res()
        }, delay);
    })
}