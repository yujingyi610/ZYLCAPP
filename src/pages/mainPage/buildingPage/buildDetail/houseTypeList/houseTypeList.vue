<template>
	<div id="houseTypeList">
		<mt-header title="户型列表">
			<mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
        </mt-header>
        <div class="row content-wrap">
          <div class="content-item" v-for="o in houseTypeList" :key="o.id" @click="goDetail">
            <div class="pic-wrap">
              <img :src="o.picWechat" />
            </div>
            <div class="content-item-right">
                <div class="text-wrap">
                    <span class="title">{{o.houseName}}</span>
                    <span style="color: #989CA8;">建面{{o.houseArea}}㎡</span>
                </div>
                <div class="parse" v-if="o.houseAnalyze">
                    户型解析：{{o.houseAnalyze}}
                </div>
                <!-- <div style="font-size: .12rem;">
                    约<b>390</b>万/套
                </div> -->
                <div class="tags-wrap">
                    <span class="tag-item" v-for="(item, index) in o.labelList" :key="index">{{item.labelName}}</span>
                </div>
            </div>
            
          </div>
		</div>
	</div>
</template>

<script>
import { Header, Button } from 'mint-ui';
	export default {
		components: {
            'mt-header': Header,
			'mt-button': Button
		},
		data() {
			return{
                houseTypeList: []
			}
		},
		methods: {
            goBack() {
                this.$router.go(-1)
            },
            goDetail() {
                this.$router.push('houseTypeDetail?estateId=' + this.$route.query.estateId);
            },
            handleGethouseTypeList() {// 获取户型列表
                this.Axios.post("/app/3.0/building_front/newEstateHousePic", { estateId: this.$route.query.estateId}).then(res=>{
                    console.log(res)
                    if( res.code === 0 ){
                        this.houseTypeList = res.data;
                    }
                })
            },
		},
		mounted() {
            this.handleGethouseTypeList()
		},
	}
</script>

<style scoped>
@import "./houseTypeList.css";

</style>