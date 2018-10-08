<template>
  <div id="bigMap">
		<mt-header title="周边概况">
            <!-- <router-link to="/" slot="left"> -->
                <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
            <!-- </router-link> -->
        </mt-header>
				<nav-bar v-model="mapActiveTab" class="nav-detail">
          <tab-item id="公交">公交</tab-item>
          <tab-item id="地铁">地铁</tab-item>
          <tab-item id="医院">医院</tab-item>
          <tab-item id="学校">学校</tab-item>
          <tab-item id="公园">公园</tab-item>
        </nav-bar>
				<div id='allmap' style="height: 100%;     transform: translateY(-0.9rem);"></div>
	</div>
</template>

<script>
// import util  from '../../config/util';
import { Header, Button } from 'mint-ui';
import { Navbar, TabItem } from "mint-ui";
export default {
	// mixins: [util],
	components: {
			'mt-header': Header,
			'mt-button': Button,
			"nav-bar": Navbar,
    	"tab-item": TabItem,
	},
  data(){
  	return {
			mapActiveTab: "公交",
  		mapObj:{},
  		projectName:this.$route.query.estateName,
  		addressX:this.$route.query.addressX,
  		addressY:this.$route.query.addressY
  	}
  },
  created(){
		$(".menu").show();
	  document.title="周边概况";
	},
	mounted() {
	},
  beforeRouteEnter(to,from,next){
  	next(vm =>{
  		vm.initMap();
  	})
	},
  watch:{
		'$route':['updateParams'],
		mapActiveTab() {
			this.initMap()
		}
  },
  methods:{
		goBack() {
				this.$router.go(-1)
		},
  	updateParams(){
  		this.projectName = this.$route.query.estateName;
  		this.addressX = this.$route.query.addressX;
  		this.addressY = this.$route.query.addressY;
  	},
  	initMap(){
  		this.mapObj = new BMap.Map('allmap');
  		let point = new BMap.Point(this.addressX, this.addressY);
      let marker = new BMap.Marker(point);  // 创建标注
  		this.mapObj.centerAndZoom(point, 15);	
      this.mapObj.addOverlay(marker);   
  		let opts = {
  		  position : point,    // 指定文本标注所在的地理位置
  		  offset   : new BMap.Size(10, 0)    //设置文本偏移量
			}
			var local = new BMap.LocalSearch(this.mapObj, {renderOptions: {map: this.mapObj, autoViewport: true, selectFirstResult:false}});      
      local.searchInBounds(this.mapActiveTab, this.mapObj.getBounds());
  		let label = new BMap.Label(this.projectName, opts);  // 创建文本标注对象
  		label.setStyle({
  			 color : "#fff",
  			 fontSize : ".14rem",
  			 backgroundColor:'#00B96D',
  			 height : "20px",
  			 lineHeight : "18px",
  			 fontFamily:"微软雅黑",
  			 padding:"10px 20px",
  			 border:"1px solid #fff",
  			 maxWidth:"none"
  		 });
  		this.mapObj.addOverlay(label);
  	}
  }
}
</script>

<style>
#app{
	height: 100%;
}
 #bigMap{
 	width: 100%;
 	height: 100%;
	 /* padding-bottom: 0.48rem; */
	 overflow: hidden;
 }
 #bigMap .mint-header{
    border-bottom: 1px solid #EAEBED;
    color: #000;
		background-color: #fff;
		position: relative;
    z-index: 999;
}
 #bigMap h1 {
    margin: .67em 0;
}
 #bigMap label{
    font-weight: 100;
    font-size: .12rem;
}
 #bigMap .mintui{
    font-size: .14rem;
}
#bigMap .nav-detail {
  height: 0.5rem;
  z-index: 5;
	/* margin: 0 0.1rem; */
	background: #fff;
    position: relative;
}

#bigMap .nav-detail a {
  color: #333;
}

#bigMap .nav-detail a>div {
  font-size: 0.15rem;
}

#bigMap .nav-detail a.is-selected {
  text-decoration: none;
  color: #00B573 !important;
  /* background: #00B573 !important; */
  border-bottom: 2px solid #00B573;
  font-size: 0.14rem;
  font-weight: 700;
  margin-bottom: 0 !important;
}
</style>