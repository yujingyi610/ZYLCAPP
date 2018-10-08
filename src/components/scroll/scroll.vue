
<template>
   <div class='building_group'>
      <div class='building_item' v-for='item in builds' :key="item.id" @click='goDetail(item.id)'>
        <div class='building_picture'>
          <img :src="item.images==null?'http://temp.im/640x260/ccc':item.images">
        </div>
        <div class='building_name'>
          <span class='name'>{{item.estateShortName?item.estateShortName:''}}</span>
        </div>
        <div class='address'>{{item.projectAddress?item.projectAddress:''}}</div>

        <div class='price_bg'>
            <span class="unitprice">均价  <span class="price">{{item.price?item.price:''}}</span> 元/㎡</span>
        </div>

        <div class='build-tag'>
          <span  class="my_label" v-for='a in item.labels' :key="a">{{a?a:''}}</span>
        </div>
      </div>
      <!-- <div class='building_item_more'>
        <div class='build_more'>加载更多</div>
      </div> -->
    </div>
</template>
<script>
  export default {
    // name: 'title',
    props: ['builds','tt'],
    mounted(){
      window.addEventListener('scroll', this.handleScroll);
      console.log(this._props.builds)
    },
    methods: {
      goto:function(link){
        this.$emit('topMethod', link)
      },
      handleScroll:function(){
        //console.log('dd');
      },
      goDetail(estateId) {
        this.$router.push({
          path:'/mainPage/buildDetail',
          query:{
            'estateId':estateId,
          },
        })
//		this.$router.push('/mainPage/buildDetail/'+ estateId)
//		this.$emit('estateIdRouter', estateId)
      }
    }
  }
</script>
<style scoped>
  @import './scroll.css';
  .build-tag{
    height:0.165rem;
  }
  .address{
    height:0.16rem;
  }
</style>
