<template>
	<div id="agent">
		<mt-header title="官方顾问">
			<mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
        </mt-header>
		<div class="tag-wrap">
          <span class="tag">专业服务</span>
          <span class="tag">绿城官方</span>
          <span class="tag">免费咨询</span>
          <span class="tag">户型分析</span>
        </div>
		<div class="agent-content">
            <div class="agent-content-item" v-for="(a, index) in brokerList" :key="index" @click="toDetail(a)">
              <div class="agent-content-item-pic">
                <img :src="a.photo">
              </div>
              <div class="agent-content-item-name">
                <div class="name">{{a.userName}}</div>
                <div class="grade">{{a.userDesc}}</div>
              </div>
              <div class="agent-content-item-tel">
                <!--<img src='static/assets/icon_phone_call@3x.png' />-->
                 <i class="iconfont bd-icon">&#xe64a;</i>
              </div>
            </div>
        </div>
	</div>
</template>

<script>
import { Header, Button } from "mint-ui";
export default {
  components: {
    "mt-header": Header,
    "mt-button": Button
  },
  data() {
    return {
      brokerList: [],
      estateId: this.$route.query.estateId,
			data:null,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    handleGetEstateBrokerList() {// 获取官方经济人列表
      this.Axios.post("/app/3.0/building_front/estateBrokerList", { estateId: this.estateId}).then(res=>{
        console.log(res)
        if( res.code === 0 ){
          this.brokerList = res.data.pageListData;
        }
      })
    },
		getBuildDetail(){
			this.Axios.post("/app/3.0/building_front/estateInfo", {
				id: this.estateId
			}).then(res => {
				console.log(res)
				if(res.code === 0) {
					this.data = res.data;
				}
			})
		},
		toDetail(info){
			this.$router.push({
				name: 'orderCounselor',
				params: {
					info: info,
					estateInfo: this.data
				}
			});
		}
  },
  mounted() {
    // console.log(this.$route.query.estateId)
    window.Vue = this;
    this.estateId = this.$route.query.estateId
    this.handleGetEstateBrokerList()
		this.getBuildDetail();
  }
};
</script>

<style scoped>
@import "./agent.css";
</style>
