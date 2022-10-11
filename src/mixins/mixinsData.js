export default function(){
    let obj = {}
return {
    created(){
        this.$bus.$on('setData',this.setData)
        this.$bus.$emit('getData',this.getData)
        // this.$bus.$on('getData',this.getData)
    },
    methods:{
        setData(newobj){
            console.log(newobj,'ssss')
            obj = newobj
        },
      
    }
}
}