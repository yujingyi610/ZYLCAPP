<template lang="html">
  <div id="searchTab">
    <div class="container" @click="noDelete">
      <div class="head">
        <div class="oinput">
          <span class="loc" @click="showCityList"><span>{{location}}</span><i class="iconfont icon-lvcheng_chengshixiala"></i></span>
          <form action="javascript:return;" method="post" style="display:inline-block;">
            <input type="search" :placeholder="placeholder" v-model="inputValue" @keypress="searchHandle"/>
          </form>
        </div>
        <button @click="close">取消</button>
      </div>
      <div class="selectBox">
        <div class="localBuild">
          <h3>搜索历史<i class="iconfont icon-lvcheng_sousuo-shanchu" @click="clearAllLocalBuild"></i></h3>
          <div class="localSelectBox">
            <button class="historyBtn" type="button" v-for="(item,index) in localBuild" :key="index" @touchstart="touchStart(index)" @touchend="touchEnd" @click="addSearchValue(item,index)">{{item}}<i v-show="index == longTouchIndex" @click="deleteThisHistory(index)" class="iconfont icon-lvcheng_shanchusousuotiaojian"></i></button>
            <a href="javascript:;">更多<i class="iconfont icon-lvcheng_jiantouxia"></i></a>
          </div>
        </div>
        <!--<div class="hotBuild">
          <h3>热门搜索</h3>
          <div class="hotSelectBox">
            <button type="button" v-for="(item,index) in localBuild" :key="index">{{item}}</button>
          </div>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      location:"获取位置中...",
      placeholder:'大家都在搜:凤起和鸣',
      inputValue:'',
      localBuild:[],
      timmer:null,
      keepTime:0,
      longTouchIndex:null,
    }
  },
  methods:{
    clearAllLocalBuild(){//清除所有本地楼盘
      this.localBuild = [];
      localStorage.removeItem('search_history');
    },
    displayMoreLocalBuild(){//显示更多本地楼盘

    },
    showCityList(){
      this.$emit('showCityList');
    },
    close(){
      this.inputValue = "";
      this.$emit('closeSearchTip');
      this.$emit('searchHandle','');
    },
    getLocalBuild(){
      this.Axios.post('/app/3.0/Search/localEstateSearch').then((res)=>{

      })
    },
    searchHandle(code){//键盘按键监听
      let that = this;
      if(code.charCode == 13){//点击搜索按键
        let _history = localStorage.getItem('search_history');//从localStorage获取搜索历史
        if(_history == null || _history == '' || typeof(_history) == undefined || _history == undefined){//无搜索历史
          if(that.inputValue != '' && that.inputValue != null){
            let arr = new Array();
            arr.push(that.inputValue);
            localStorage.setItem('search_history',JSON.stringify(arr));
            that.localBuild = arr;
          }
        }else{//存在搜索历史
          if(that.inputValue != '' && that.inputValue != null){
            let arr = JSON.parse(_history);
            let flag = true;
            arr.map((item) => {//去重
              if(item == that.inputValue){
                flag = false;
              }
            })
            if(flag){//已存记录中无当前搜索项
              arr.push(that.inputValue);
              localStorage.setItem('search_history',JSON.stringify(arr));
              that.localBuild = arr;
            }
          }
        }
        if(this.isIndex){//首页搜索跳转楼盘列表
          this.$router.push({
            path:'/mainPage/buildingList',
            query:{
              type:'index',
              params:this.inputValue
            }
          })
        }else{//楼盘列表页搜索
          this.$emit('searchHandle',this.inputValue);
        }
      }
    },
    addSearchValue(item,index){
      if(index != this.longTouchIndex){//是否长按
        this.inputValue = item;
      }
    },
    noDelete(){
      this.longTouchIndex = null;
    },
    touchStart(index){
      let that = this;
      this.timmer = setTimeout(()=>{
        this.keepTime = 1500;
        this.longTouchIndex = index;
      },1500)
    },
    touchEnd(){
      let that = this;
      clearTimeout(that.timmer);
    },
    deleteThisHistory(index){//删除当前选中搜索历史
      let that = this;
      this.localBuild.splice(index,1);
      localStorage.setItem('search_history',JSON.stringify(that.localBuild));
      this.longTouchIndex = null;
    }
  },
  mounted(){
    let that = this;
    let timmer = setInterval(() => {
      let locationInfo = sessionStorage.getItem('locationInfo');
      if(locationInfo != null && typeof(locationInfo) != 'undefined' && locationInfo != undefined && locationInfo != ""){
        that.location = JSON.parse(locationInfo).city;
        clearInterval(timmer);
      }
    },30)
    this.localBuild = localStorage.getItem('search_history')?JSON.parse(localStorage.getItem('search_history')):[];
  },
  props:['newLocation','isIndex'],
  watch:{
    newLocation(){
      this.location = this.newLocation;
    },
  }
}
</script>

<style lang="scss" scoped="scoped">
  .container{
    position: relative;
    min-height:100vh;
    width:100%;
    overflow-y:scroll;
    background-color:#fff;
    .head{
      width:100%;
      button{
        position:absolute;
        border:none;
        background-color:#fff;
        left:3.25rem;
        width:0.6rem;
        top:0.24rem;
        font-size:0.14rem;
        color:#333333;
        outline:none;
        padding-left:0!important;
      }
      .oinput{
        display:inline-block;
        position:absolute;
        width:2.95rem;
        height:0.3rem;
        line-height:0.3rem;
        background-color: #F4F4F5;
        border-radius:0.06rem;
        left:0.18rem;
        top:0.18rem;
        padding-left:0.1rem;
        .loc{
          display:inline-block;
          max-width:1rem;
          span{
            display:inline-block;
            max-width:0.8rem;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            vertical-align: middle;
            font-size:0.12rem;
            color: #222222;
          }
          i{
            vertical-align:middle;
            color: #222222;
          }
        }
        input{
          min-width:1.8rem;
          display:inline-block;
          height:0.3rem;
          background-color:rgba(0, 0, 0, 0);
          border:none;
          outline:none;
          font-size:0.12rem;
        }
      }
    }
    .selectBox{
      margin-top: 1rem;
      padding:0 0.18rem;
      h3{
        font-size:0.21rem;
        position:relative;
        i{
          position: absolute;
          right:0;
          color:#646A7D;
          font-size:0.24rem;
          line-height:0.28rem;
        }
      }
      .hotBuild{
        margin-top:0.5rem;
      }
      button{
        font-size:0.13rem;
        color:#646A7D;
        border:none;
        outline:none;
        background-color: #F4F4F5;
        height:0.31rem;
        border-radius:0.5rem;
        padding:0.065rem 0.24rem;
        margin-right:0.1rem;
        margin-top:0.15rem;
      }
      .localSelectBox{
        height:1.06rem;
        overflow:hidden;
        position:relative;
        a{
          display:inline-block;
          position:absolute;
          font-size:0.15rem;
          color:#6BA686;
          height:0.15rem;
          left: 0;
          bottom:-0.15rem;
        }
      }
      .hotSelectBox{

      }
    }
    .historyBtn{
      position:relative;
      user-select:none;
      i{
        position:absolute;
        right: -0.05rem;
        top: -0.05rem;
      }
    }
  }
</style>
