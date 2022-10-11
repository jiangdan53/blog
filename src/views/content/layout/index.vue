<template>
  <div class="header">
    <slot  name="headerImg" ref="headerimg">
      默认展示
    </slot>
    <div class="BlogArticl" >
     <slot  name="content">
    </slot>
      <div class="contact">
          <InfoBtn/>
      </div>
    </div>
  </div>
</template>

<script>
import InfoBtn from '@/components/InfoBtn'
export default {
  components:{
    InfoBtn,
  }
}
</script>

<style lang="less" scoped>
.header{
  width: 100%;
  height: 100vh;
.BlogArticl {
  .listto {
    margin: 5px auto;
    max-width: 1000px;
    min-width: 500px;
    box-shadow: 1px 1px 10px 1px #585a73;
    box-sizing: border-box;
    padding:20px;
  }
  .catalogue{
    position: sticky;
    z-index: 998;
    top: 5px;
  }
  .contact{
    position:fixed;
    bottom: 10px;
    right: 10px;
  }
}}
</style>