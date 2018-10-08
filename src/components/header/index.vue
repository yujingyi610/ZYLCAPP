<template lang="html">
  <div id="header">
    <div class="header-container">
      <header>
        <div class="back" @click="goBack">
          <img src="../../../static/images/icon_back_black.png">
          <span style="color:#989CA8;vertical-align:middle;">返回</span>
        </div>
        <span style="font-size:0.16rem;">{{title}}</span>
      </header>
    </div>
  </div>
</template>

<script>
export default {
  props:['title'],
  data(){
    return{
      name:'header',
    }
  },
  methods:{
    goBack(){
      this.$emit('goBackEvent');
    }
  }
}
</script>

<style scoped="scoped">
  header{
    font-size:0.14rem;
    height:0.5rem;
    line-height:0.5rem;
    text-align:center;
  }
  header img{
    display:inline-block;
    width:0.15rem;
    height:0.18rem;
    vertical-align:middle;
  }
  .back{
    position:absolute;
    height:0.5rem;
    left:0;
    top:0;
    display: inline-block;
    padding-left:0.12rem;
    width:0.6rem;
    float:left;
  }
  .header-container{
    width:100vw;
    position:fixed;
    height:0.5rem;
    top:0;
    z-index:3000;
    background-color:#fff;
  }
</style>
