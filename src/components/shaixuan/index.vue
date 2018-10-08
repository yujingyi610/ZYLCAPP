<template lang="html">
  <div id="filter">
    <!--<mt-popup v-model="popupVisible" position="right">-->
      <div class="container">
        <div class="singleBox">
          <h3><span class="area" v-show="cityArea.length != 0">区域</span> <span class="posit" @click="showCityList"><span class="loca">{{position}}</span><i class="iconfont icon-lvcheng_chengshixiala"></i></span></h3>
          <div class="filterItem">
              <button :class="item.selected==1?'selectedBtn':'selectBtndefault'" type="button" name="button" v-for="(item,index) in cityArea" @click="selected(item)">{{item.name}}</button>
          </div>
          <h3>购房预算</h3>
          <div class="filterItem">
              <button :class="item.selected==1?'selectedBtn':'selectBtndefault'" type="button" name="button" v-for="(item,index) in budget" @click="selected(item)">{{item.name}}</button>
          </div>
          <h3>购房户型</h3>
          <div class="filterItem">
              <button :class="item.selected==1?'selectedBtn':'selectBtndefault'" type="button" name="button" v-for="(item,index) in houseType" @click="selected(item)">{{item.name}}</button>
          </div>
          <h3>需求面积</h3>
          <div class="filterItem">
              <button :class="item.selected==1?'selectedBtn':'selectBtndefault'" type="button" name="button" v-for="(item,index) in needArea" @click="selected(item)">{{item.name}}</button>
          </div>
          <h3>需求业态</h3>
          <div class="filterItem">
              <button :class="item.selected==1?'selectedBtn':'selectBtndefault'" type="button" name="button" v-for="(item,index) in needFormat" @click="selected(item)">{{item.name}}</button>
          </div>
        </div>
        <div class="handleBox">
          <button class="reset" type="button" name="button" @click="resetSelect">重置</button>
          <button class="finish" type="button" name="button" @click="finish">完成</button>
        </div>
      </div>
    <!--</mt-popup>-->
    <!--<mt-popup id="cityPop" v-model="cityPopupVisible" position="right">
      <my-header :title="title" v-on:goBackEvent="closePopup"/>
      <city-list v-on:closePopEvent="getCityId"/>
    </mt-popup>-->
  </div>
</template>

<script>
import { Popup,Toast,Icon } from 'mint-ui';
import Header from '@/components/header';
import CityList from '@/components/cityList/cityList.vue';
export default {
  components:{
    'city-list':CityList,
    'my-header':Header,
  },
  props:['newPosition'],
  watch:{
    newPosition(){
      this.position = this.newPosition;
    },
    position(){
      if(this.position != null){
          this.getCityArea(this.position);
      }
    }
  },
  data(){
    return{
      popupVisible:true,
      cityPopupVisible:false,
      position:'定位中...',
      title:'城市选择',
      filterData:{},
      cityArea:[],
      budget:[
        {name:'80万以下',code:'0-80',selected:0},
        {name:'80-100万',code:'80-100',selected:0},
        {name:'100-120万',code:'100-120',selected:0},
        {name:'120-150万',code:'120-150',selected:0},
        {name:'150-200万',code:'150-200',selected:0},
        {name:'200-250万',code:'200-250',selected:0},
        {name:'250-350万',code:'250-350',selected:0},
        {name:'350-500万',code:'350-500',selected:0},
        {name:'500万以上',code:'500-max',selected:0},
      ],
      houseType:[
        {name:'一室',code:'1',selected:0},
        {name:'两室',code:'2',selected:0},
        {name:'三室',code:'3',selected:0},
        {name:'四室',code:'4',selected:0},
        {name:'四室以上',code:'max',selected:0},
      ],
      needArea:[
        {name:'不限',code:'',selected:0},
        {name:'50m²以下',code:'0-50',selected:0},
        {name:'50-70m²',code:'50-70',selected:0},
        {name:'70-90m²',code:'70-90',selected:0},
        {name:'90-120m²',code:'90-120',selected:0},
        {name:'120-140m²',code:'120-140',selected:0},
        {name:'140-160m²',code:'140-160',selected:0},
        {name:'160-180m²',code:'160-180',selected:0},
        {name:'180-200m²',code:'180-200',selected:0},
        {name:'200m²以上',code:'200-max',selected:0},
      ],
      needFormat:[
        {name:'住宅',code:'PROJECT_FORMATE_2',selected:0},
        {name:'别墅',code:'PROJECT_FORMATE_1',selected:0},
        {name:'商业',code:'PROJECT_FORMATE_5',selected:0},
        {name:'酒店式公寓',code:'PROJECT_FORMATE_3',selected:0},
        {name:'写字楼',code:'PROJECT_FORMATE_4',selected:0},
        {name:'车位',code:'PROJECT_FORMATE_6',selected:0},
        {name:'储藏室',code:'PROJECT_FORMATE_7',selected:0},
        {name:'其他',code:'',selected:0},
      ],
    }
  },
  methods:{
    selected(val){
      val.selected = val.selected==0?1:0;
    },
    showCityList(){
      this.$emit('showCityList');
    },
    closePopup(){
      this.cityPopupVisible = false;
    },
    getCityArea(areaName){//获取城市区域
      let that = this;
        let data = {
          cityName:areaName,
        }
        this.Axios.post('/app/3.0/home/area/list/info',data).then((res) => {
          if(res.code == 0){
            that.cityArea = [];
            if(res.data.length != 0){
              res.data.map((item,index) => {
                let obj = new Object();
                obj.name = item.areaName;
                obj.code = item.id;
                obj.selected = 0;
                this.cityArea.push(obj);
              })
            }else{
              that.cityArea = [];
            }
          }else{
            that.cityArea = [];
            Toast({
              message:'获取区域失败',
              iconClass:'icon icon-error',
              className:'maxz-index',
              duration:1500
            });
          }
        })
    },
    getCityId(city){
      this.cityPopupVisible = false;
      this.position = city.cityName;
      this.getCityArea(city.city_code);
    },
    assembleFilterData(selectArr){//组装筛选选择数据
      let arr = new Array();
      selectArr.map((item) => {
        if(item.selected == 1){
          arr.push(item.code);
        }
      })
      return arr.toString();
    },
    finish(){
      this.filterData = {
        cityName:this.position,
        areaIds:this.assembleFilterData(this.cityArea),
        totalPrices:this.assembleFilterData(this.budget),
        houseTypeIds:this.assembleFilterData(this.houseType),
        houseArea:this.assembleFilterData(this.needArea),
        formatCodes:this.assembleFilterData(this.needFormat)
      }
      this.$emit('shaixuanHandle',this.filterData);
      //this.resetSelect();
    },
    clearAllSelected(arr){
      arr.map((item) => {
        item.map((obj) => {
          if(obj.selected == 1){
            obj.selected = 0;
          }
        })
      })
    },
    resetSelect(){//重置选框
      this.clearAllSelected([this.cityArea,this.budget,this.houseType,this.needArea,this.needFormat]);
    },
  },
  mounted(){
    window.Vue = this;
    this.position = sessionStorage.getItem('locationInfo')?JSON.parse(sessionStorage.getItem('locationInfo')).city:'';
    //this.getCityArea(JSON.parse(sessionStorage.getItem('locationInfo')).city);
  }
}
</script>

<style lang="scss" scoped="scoped">
  .container{
    width: 85vw;
    background-color: #fff;
    height: 100vh;
    padding-left:0.15rem;
    overflow-y:scroll;
    .singleBox{
      background-color:#fff;
      h3{
        line-height:0.16rem;
        font-size:0.16rem;
        padding: 0.15rem 0;
        padding-right:0.15rem;
        .area{
          line-height:0.16rem;
          font-size:0.16rem;
          padding: 0.15rem 0;
          padding-right:0.15rem;
        }
        .posit{
          display:inline-block;
          float:right;
          .loca{
            display: inline-block;
            max-width: 0.6rem;
            overflow:hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            vertical-align:middle;
          }
        }
      }
      .filterItem{
        .selectBtndefault{
          min-width:0.85rem;
          height:0.31rem;
          border:none;
          line-height:0.31rem;
          text-align:center;
          color:#989CA8;
          background-color:#F4F4F5;
          border-radius:0.16rem;
          outline:none;
          margin-bottom:0.12rem;
          margin-right:0.1rem;
        }
        .selectedBtn{
          min-width:0.85rem;
          height:0.31rem;
          border:none;
          line-height:0.31rem;
          text-align:center;
          color:#fff;
          background-color:#25B07E;
          border-radius:0.16rem;
          outline:none;
          margin-bottom:0.12rem;
          margin-right:0.1rem;
        }
      }
    }
    .handleBox{
      display:flex;
      justify-content:space-between;
      height:1rem;
      align-items:center;
      padding-right:0.15rem;
      button{
        width:1.40rem;
        height:0.42rem;
        border:none;
        outline:none;
        line-height:0.42rem;
        text-align:center;
        border-radius:0.04rem;
      }
      .reset{
        border:solid thin #25B07E;
        background-color:#fff;
        color:#25B07E;
      }
      .finish{
        background-color:#25B07E;
        color:#fff;
      }
    }
  }
</style>
