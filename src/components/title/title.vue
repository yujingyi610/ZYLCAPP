<template>
   <div class='title_group'>
        <div class='title'>{{name}}</div>
        <div class='more' @click="goto(link)">
          <span class='more_house' v-if="link">更多</span>
          <!-- <i class='icon-arrow-right'></i> -->
          <!--<img v-if="link" src="../../../static/images/home/icon_right.png" width="10" height="16">-->
          <span v-if="link" class="iconfont">&#xe638;</span>	
        </div>
      </div>
</template>
<script>
  export default {
    name: 'title',
    props: ['name','link',"articleType"],
    methods: {
      goto:function(link){
        this.$emit('topMethod', link,this.articleType )
      }
    }
  }
</script>
<style scoped>
  @import './title.css';
</style>
