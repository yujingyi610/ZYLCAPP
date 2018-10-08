<template lang="html">
  <div id="cityList">
    <mt-index-list>
      <mt-index-section index=""></mt-index-section>
      <mt-index-section index="">
        <mt-cell>
          <div class="cityListLab">
            <h3>当前定位城市</h3>
            <div class="nowLocation">
              <span @click="selectCity({'cityId':'','areaName':thisLocal})">{{thisLocal}}</span>
              <button type="button" @click="resetLocation">重新定位</button>
            </div>
            <div class="hotCity">
              <span>热门城市</span>
                <span v-for="(item,index) in hotCityList" :key="index" @click="selectCity(item)">{{item.areaName}}</span>
            </div>
          </div>
        </mt-cell>
      </mt-index-section>
      <mt-index-section v-for="(item,index) in list" :index="item.key" :key="index">
        <div v-for="(city,oindex) in item.list" :key="oindex" @click="selectCity(city)">
          <mt-cell :title="city.areaName"></mt-cell>
        </div>
      </mt-index-section>
    </mt-index-list>
  </div>
</template>

<script>
import { IndexList, IndexSection, Toast } from 'mint-ui';
export default {
  data(){
    return{
      list:[],
      title:'城市选择',
      thisLocal:null,
      hotCityList:[],
    }
  },
  methods:{
    selectCity(city){
      console.log('城市信息',city)
      let data = {
        cityId:city.id,
        cityName:city.areaName,
      }
      //city":"杭州市","city_code":0,"
      let cityInfo = {
        city:city.areaName,
        city_code:city.id
      }
      sessionStorage.setItem('locationInfo',JSON.stringify(cityInfo));
      this.$emit('selectedCity',data);
      Toast({
        message: '已切换至'+city.areaName,
        iconClass: 'icon icon-success'
      });
    },
    refreshCity(city){
      let data = {
        cityId:city.id,
        cityName:city.tableName,
      }
      this.$emit('hasRefreshCity',data);
    },
    resetLocation(){
      let that = this;
      this.thisLocal = '重新定位中...';
      setTimeout(() => {
        that.getLocation();
      },200);
    },
    getHotCity(){
      this.Axios.post('/app/3.0/Search/localhotCitySearch').then((res) => {
        if(res.code == 0){
          this.hotCityList = res.data;
        }
      })
    },
    getLocation(){
      //百度地图定位
      let that = this;
      let point = new BMap.Point(116.331398,39.897445);
      let geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(r){
          if(this.getStatus() == BMAP_STATUS_SUCCESS){
               let mk = new BMap.Marker(r.point);
               that.thisLocal = r.address.city;
//             console.log(r);
               let city = {
                 id:"",
                 tableName:r.address.city
               }
               that.refreshCity(city);
               sessionStorage.setItem('locationInfo',JSON.stringify(r.address));
          }else {
               console.log('failed'+this.getStatus());
          }
      },{enableHighAccuracy: true})
      //百度地图定位
    }
  },
  created(){
    this.Axios.post('/app/3.0/home/area/list').then((res) => {
      console.log(res);
      if(res.code == 0){
        this.list = res.data;
      }
    });
    this.getHotCity();
  },
  mounted(){
    //
    if(sessionStorage.getItem('locationInfo')){
      this.thisLocal = JSON.parse(sessionStorage.getItem('locationInfo')).city;
    }else{
      this.getLocation();
    }
    //this.thisLocal = JSON.parse(sessionStorage.getItem('locationInfo')).city;
  }
}
</script>

<style scoped="scoped">
.cityListLab{
  background-color:#fff;
}
.t{
  width:100%;
  text-align:left;
}
.cityMoreInfo{
  height:1rem;
  background-color:green;
  position:fixed;
  top: 0px;
}
.cityListLab{
  width:100vw;
  height:2rem;
}
.cityListLab h3{
  margin-top:0.15rem;
  font-size:12px;
  color:#000;
  height:0.35rem;
  line-height:0.35rem;
  background-color:#fafafa;
}
.nowLocation{
  width:90%;
  height:36px;
  display:flex;
  justify-content: space-between;
  align-items:center;
  color:#000;
}
.hotCity{
  width:90%;
  height:auto;
}
.hotCity span{
  color:#000;
  font-size:14px;
  display:inline-block;
  margin-right:5px;
}
.nowLocation span{
  display:inline-block;
}
.nowLocation button{
  padding:2px 5px;
  background-color: #04ac75;
  border-radius:3px;
  color:#fff;
  border:none;
  outline:none;
}
</style>
