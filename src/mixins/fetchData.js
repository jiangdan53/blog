export default function(defaultDataValue = null){
    return {
        data(){
            return {
            isLoding:true,
            data:defaultDataValue    
            }
        },
      async created() {
        this.data = await this.fetchData();
        this.isLoding = false 
        },
    }
}