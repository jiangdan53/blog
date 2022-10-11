import styles from './loding.module.less'
import loding from '@/assets/img/loding8.gif'
function getDomStyle(dom){
   return dom.getBoundingClientRect();
}
function createDom(el,DomType){
    const domStyleStr  = setDomStyle(el);
    let img = document.createElement('img');
    img.src = loding;
    let dom = document.createElement('div');
    dom.style = domStyleStr;
    dom.appendChild(img)
    dom.className  = styles[`skeleton`];

    return dom
};
function setDomStyle(el){
    const domStyleObj = getDomStyle(el)
    let Style = 'position:absolute;background:#ebeee8;'
    for (const key in domStyleObj) {
        if(typeof domStyleObj[key] === 'number'){
           if(key === 'width' || key === 'height'){
                Style += `${key}:${domStyleObj[key]}px;`
            }
        }
       
    }
      return Style 
}
// function DomCssStyles(){
//     let obj = {}
//     const reg = /(^@)/
//     const stlyls = document.styleSheets;
//     for (const item of stlyls) {
//         for (const i of Array.from(item.cssRules)) {
//             let elestyle = {}
//                 if(!i.cssText.match(reg) ){
//                     // obj[i.selectorText]= i.
//                     for(let j = 0; j <= i.styleMap.size ; j++){
//                         if(i.style[i.style[j]] !== undefined){
//                             elestyle[i.style[j]] = i.style[i.style[j]]
//                         }
//                     }
//                     obj[i.selectorText] = elestyle
//                 }
               
//         }
       
// }
// return obj
// }

// function createDom(DomArr){
//     const classObj = DomCssStyles()
//     newDom.push(DomArr)
//     console.log(newDom,classObj)
// }

// function getDom(el){
//     if(el.children.length !== 0){
//         const childrenArr = el.children;
//     if(childrenArr.length>0){
//         for (const ele of childrenArr) {
//             if(ele.children){
//                 getDom(ele);
//             }else{
//             createDom(getDomStyle(ele));
//             }
//         }       
//     } 
//     }
//     return createDom(getDomStyle(el))
  
// }
export default {
    bind(el,obj){
    },
    inserted(el,bindObj,vnode){
        const style = createDom(el,'R');
        document.body.appendChild(style);
    },
    update(el,bindObj){ 
        if(bindObj.oldValue ){
            if(document.getElementsByClassName(styles['skeleton'])[0]){
                if(!bindObj.value){
                    document.getElementsByClassName(styles[`skeleton`])[0].style.transform=`scaleY(0)`;
                    document.getElementsByClassName(styles[`skeleton`])[0].style.opacity=`0`;
                    document.getElementsByClassName(styles[`skeleton`])[0].style.width='0px'
                    setTimeout(()=>{
                        document.getElementsByClassName(styles[`skeleton`])[0].remove()
                    },500)
                }
               }
        }else{
            const style = createDom(el,'R');
            document.body.appendChild(style);
    }
},
componentUpdated(el){
    
}
      
 }