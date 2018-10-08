<template>
	<div class="houseTypeDetail">
		<mt-header title="户型详情">
			<mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
        </mt-header>
		<div id="wrapper">
			<div id="scroller" :style="{width: scrollWidth}">
				<div style="width: 100%">
					<div class="item" v-for="(item, index) in navList" :key="index" :class="chooseOneIndex == index?'active':''" @click="changeActive(index)">{{item.houseTypeName}}</div>
				</div>
				
			</div>
		</div>
		<one-detail ref="oneDetailRef" :info="chooseOneIndex" :navList="navList" @changeNav="changeActive"></one-detail>
	</div>
</template>

<script>
// import Swiper from 'swiper';
import IScroll from "iscroll/build/iscroll-lite.js";
import { Header, Button, Navbar, TabItem } from "mint-ui";

import oneDetail from "./components/oneDetail.vue";
export default {
  components: {
    "mt-header": Header,
    "mt-button": Button,
    Navbar,
    TabItem,
    oneDetail
  },
//   watch: {
//     selected() {
//       this.chooseOne = this.navList[this.selected];
// 	},
//   },
  computed: {
	  scrollWidth() {
		  return this.navList.length * 0.9 + 'rem'
	  }
  },
  data() {
    return {
      navList: [],
      selected: 0,
      chooseOne: null,
      chooseOneIndex: 0,
      myScroll: null
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
      // this.$router.go('');
    },
    changeActive(index) {
      console.log(index)
      this.chooseOneIndex = Number(index);
      this.chooseOne = this.navList[index];
      if( index && index > 3 ){
        
        this.myScroll.scrollTo(-90*(index-3),0);  
      }
    },
    handleGetHosueTypeList() {
      this.navList = []
      this.Axios.post('/app/3.0/building_front/estateHousePic',
					{
						estateId: this.$route.query.estateId
					}
				).then((res)=> {
					if( res.code === 0 ){
						// this.navList = res.data.pageListData.map(item=>{
            //   return {
            //     id: item.id,
            //     houseTypeName: item.houseTypeName,
            //     houseName: item.houseName
            //   }
            // })
            this.navList = res.data.pageListData
					}
				}).then(_=>{
          this.$refs.oneDetailRef.handleGetHosueTypeDetail()
        })
    },
    handleGetHosueTypeDetail() {
      this.Axios.post('/app/3.0/building_front/housePicInfo',
					{
						id: this.$route.query.houseTypeId
					}
				).then((res)=> {
					if( res.code === 0 ){
						
					}
				})
    }
  },
  mounted() {
    this.handleGetHosueTypeList()

    setTimeout(()=>{
      // var myScroll = new IScroll("#wrapper", { scrollX: true, scrollY: false });
      this.myScroll = new IScroll('#wrapper',{
          // mouseWheel : true,      //鼠标滚轮支持
          scrollbars : false,      //滚动条支持
          scrollY : false,         //滚动方向（垂直）
          scrollX : true,         //滚动方向（水平）
          bounce : true,          //边界时的反弹动画，默认true
          click : true,           //IScroll默认禁止了点击事件，如需绑定点击事件，请将该参数值设为true
          // freeScroll : true,      //当需要执行两个纬度上的滚动时（即横向、纵向都开启），设置该参数，默认为false
          startX : 0,             //滚动条开始的位置（横坐标）
          startY : 0,             //滚动条开始的位置（纵坐标）
          // tap : true,             //设置为true时，允许为用户点击或者触摸（并没有滚动时）触发一个自定义事件，或者设置值为一个自定义事件名称的字符串
          // snap : 'li'             //对齐（根据元素li对齐切割整个容器）
      });
      
      // console.log(this.$route.query.index)
      // let index = this.$route.query.index;
      let index = 0;
      this.chooseOneIndex = Number(index);
      this.chooseOne = this.navList[index];
      if( index && index > 3 ){
        
        this.myScroll.scrollTo(-90,0);  
      }
    }, 500)
    
    //  $(window).scrollTop(0)
  }
};
</script>

<style scoped>
@import "./houseTypeDetail.css";
.item {
  width: .9rem;
    float: left;
    text-align: center;
	line-height: .4rem;
	color: #989CA8;
}
.item.active{
	border-bottom: 2px solid #000000;
	color: #373C43;
}
#wrapper {
    z-index: 1;
    height: .4rem;
    width: 100%;
    overflow: hidden;
}

#scroller {
  /* position: absolute; */
  /* z-index: 1; */
  /* -webkit-tap-highlight-color: rgba(0, 0, 0, 0); */
  /* width: 1600px; */
  height: 100%;
  /* background-color: #a00; */
  -webkit-transform: translateZ(0);
  -moz-transform: translateZ(0);
  -ms-transform: translateZ(0);
  -o-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-text-size-adjust: none;
  -moz-text-size-adjust: none;
  -ms-text-size-adjust: none;
  -o-text-size-adjust: none;
  text-size-adjust: none;
}

#scroller ul {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  text-align: center;
}

#scroller li {
  display: block;
  float: left;
  width: 100px;
  height: 100%;
  padding-top: 10px;
  border-right: 1px solid #ccc;
  background-color: #555555;
  color: white;
  font-size: 14px;
}
</style>