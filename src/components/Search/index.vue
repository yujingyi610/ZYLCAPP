<template>
  <div id="search">
    <div class="searchBox1" v-if="type==1">
      <button type="button" @click="showCityList"><span class="loca-position">{{thisLocation}}</span><span style="vertical-align:middle;"><i class="iconfont icon-lvcheng_chengshixiala"></i></span></button>
      <input type="text" readonly v-model="svalue" :placeholder="placeholder" @click="showSearchDetail">
    </div>
    <div class="searchBox2" v-if="type==2">
      <button type="button" @click="showCityList"><span class="loca-position">{{thisLocation}}</span><i class="iconfont icon-lvcheng_chengshixiala"></i></button>
      <input type="text" readonly v-model="svalue" :placeholder="placeholder" @click="showSearchDetail">
    </div>
    <span v-if="type==2" class="shaixuan iconfont icon-zyj-m-shaixuan" @click="showShaixuan">&#xe626;</span>
    <span class="cancle" v-if="type==3" @click="toLastPage"><i class="iconfont icon-lvcheng_fanhui"></i> 返回</span>
    <div class="searchBox3" v-if="type==3">
      <button type="button" @click="showCityList"><span class="loca-position">{{thisLocation}}</span><i class="iconfont icon-lvcheng_chengshixiala"></i></button>
      <input type="text" readonly :placeholder="placeholder" v-model="svalue" @click="showSearchDetail">
    </div>
    <span v-if="type==3" class="shaixuan iconfont icon-zyj-m-shaixuan" @click="showShaixuan">&#xe626;</span>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        name:'搜索',
        thisLocation:'定位中...',
        placeholder:'请输入楼盘名称',
        svalue:null,
      }
    },
    methods:{
      showCityList(){
        this.$emit('showCityList')
      },
      showSearchDetail(){
        this.$emit('showSearchTip')
      },
      showShaixuan(){
        this.$emit('showShaixuanPop');
      },
      toLastPage(){
        window.history.go(-1);
      },
      getLocation(){
        //百度地图定位
        let that = this;
	      let point = new BMap.Point(116.331398,39.897445);
	      let geolocation = new BMap.Geolocation();
	      geolocation.getCurrentPosition(function(r){
		        if(this.getStatus() == BMAP_STATUS_SUCCESS){
			           let mk = new BMap.Marker(r.point);
                 that.thisLocation = r.address.city;
                 that.$emit('reLocated',r.address.city);
                 sessionStorage.setItem('locationInfo',JSON.stringify(r.address));
		        }else {
			           console.log('failed'+this.getStatus());
		        }
	      },{enableHighAccuracy: true})
        //百度地图定位
      }
    },
    props:['loca','type','searchValue'],
    watch:{
      loca(){
        this.thisLocation = this.loca;
      },
      searchValue(){
        this.svalue = this.searchValue;
      }
    },
    mounted(){
      //this.getLocation();
      if(sessionStorage.getItem('locationInfo')){
        this.thisLocation = JSON.parse(sessionStorage.getItem('locationInfo')).city;
        this.$emit('reLocated',this.thisLocation);
      }else{
        this.getLocation();
      }
    }
  }
</script>
<style scoped="scoped" lang="scss">
  #search{
    position:relative;
    .shaixuan{
      position: absolute;
      top: 0.06rem;
      right: 0.15rem;
      font-size: 0.2rem;
      color:#333333;
      font-weight: 600;
    }
  }
  .searchBox1{
    border:solid thin #F4F4F5;
    height:0.3rem;
    width:92vw;
    margin: 0 auto;
    border-radius:5px;
    /*margin-top:0.2rem;*/
    display:flex;
    flex-direction: row;
    box-shadow:0 0.05rem 0.125rem #F2F2F2;
    button{
    //  width:25%;
     display:inline-block;
     border:none;
     background-color:#fff;
     outline:none;
    }
    input{
      // width: 75%;
      height:95%;
      border:none;
      outline:none;
      background-color: rgba(0,0,0,0);
    }
    .loca-position{
      display:inline-block;
      max-width:0.8rem;
      vertical-align: middle;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
  }
  .searchBox2{
    width:3.10rem;
    height:0.30rem;
    margin-top:0.10rem;
    background-color:#F4F4F5;
    margin-left:0.16rem;
    border-radius:0.06rem;
    display:flex;
    flex-direction: row;
    .loca-position{
      padding-top:0.02rem;
      font-size:0.12rem;
      max-width:0.6rem;
      display:inline-block;
      overflow:hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    button{
      width:auto;
      border:none;
      background-color:rgba(0,0,0,0);
      outline:none;
      padding-right:0.2rem;
      position: relative;
      line-height:0.256rem;
      i{
        padding-top:0.02rem;
        position:absolute;
        top:0.01rem;
      }
    }
    input{
      min-width:2rem;
      background-color:rgba(0,0,0,0);
      border:none;
      outline:none;
    }
  }
  .searchBox3{
    width:2.51rem;
    height:0.30rem;
    margin-top:0.15rem;
    background-color:#F4F4F5;
    margin-left:0.18rem;
    border-radius:0.06rem;
    display:flex;
    flex-direction: row;
    margin-left: 0.8rem;
    .loca-position{
      padding-top:0.02rem;
      font-size:0.12rem;
      max-width:0.6rem;
      display:inline-block;
      overflow:hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    button{
      width:auto;
      border:none;
      background-color:rgba(0,0,0,0);
      outline:none;
      padding-right:0.2rem;
      position: relative;
      line-height:0.256rem;
      i{
        padding-top:0.02rem;
        position:absolute;
        top:0.01rem;
      }
    }
    input{
      min-width:2rem;
      background-color:rgba(0,0,0,0);
      border:none;
      outline:none;
    }
  }
  .cancle{
    display:inline-block;
    width:0.8rem;
    position:absolute;
    left:0.16rem;
    font-size:0.14rem;
    top:0.06rem;
    color:#989CA8;
  }
</style>
