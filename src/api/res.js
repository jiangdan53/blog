import axios from "axios";
const ins = axios.create();
ins.interceptors.response.use((res)=>{
if(res.data.code !== 0){
    console.log(`网络请求错误${res.data.msg}`);
    return null
}
return res.data.data
})
export  default ins;