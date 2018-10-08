<template>
    <div class="floorDetailInfo">
        <mt-header title="楼盘详情">
            <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
        </mt-header>
        <div class="floor_detail">
            <div class="floor_div">
                <span class="floor_laber">开发商</span>
                <span class="floor_txt">{{developUnitName}}</span>
            </div>
            <div class="floor_div">
                <span class="floor_laber">物业服务</span>
                <span class="floor_txt">{{propertyUnitName}}</span>
            </div>
            <div class="floor_div">
                <span class="floor_laber">产权年限</span>
                <span class="floor_txt">{{equity}}</span>
            </div>
            <div class="floor_div" style="border-bottom: 1px solid #EAEBED">
                <span class="floor_laber">规划户数</span>
                <span class="floor_txt">{{totalRoomNum}}</span>
            </div>
            <div class="floor_div">
                <span class="floor_laber">区域位置</span>
                <span class="floor_txt">{{areaname}}</span>
            </div>
            <div class="floor_div">
                <span class="floor_laber">楼盘地址</span>
                <span class="floor_txt">{{projectaddress}}</span>
            </div>
            <div class="floor_div" style="border-bottom: 1px solid #EAEBED">
                <span class="floor_laber">装修标准</span>
                <span class="floor_txt">{{decorationtype}}</span>
            </div>
            <div class="floor_div">
                <span class="floor_laber">绿化率</span>
                <span class="floor_txt">{{greenrate}}</span>
            </div>
            <div class="floor_div">
                <span class="floor_laber">容积率</span>
                <span class="floor_txt">{{arearate}}</span>
            </div>
        </div>
        
    </div>
</template>
<script>
import { estateInfo } from '@/api/build'
import { Header, Button } from 'mint-ui';
import footer  from '@/components/footer/footer.vue';
    export default {
        components: {
            'mt-header': Header,
            'mt-button': Button,
            'my-footer': footer
        },
        data() {
            return{
                developUnitName: null,// 开发商
                propertyUnitName: null,// 物业单位
                equity: null,// 产权年限
                totalRoomNum: null,// 规划户数
                greenrate: null,// 绿化率
                arearate: null,// 容积率
                decorationtype: null,// 装修标准
                projectaddress: null,// 楼盘地址
                areaname: null,// 区地址
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            },
            handleGetEstateInfo() {
                this.Axios.post("/app/3.0/building_front/estateInfo", { id: this.$route.params.id}).then(res=>{
                    console.log(res)
                    if( res.code === 0 ){
                        let data = res.data;
                        this.developUnitName = data.developUnitName;// 开发商
                        this.propertyUnitName = data.propertyUnitName;// 物业单位
                        this.equity = data.equity;// 产权年限
                        this.totalRoomNum = data.totalRoomNum;// 规划户数
                        this.greenrate = data.greenRate;
                        this.arearate  = data.areaRate;
                        this.decorationtype = data.decorationType;
                        this.projectaddress = data.address;
                        this.areaname = data.areaName;
                    }
                })
            },

        },
        created() {
            
        },
        mounted() {
            this.handleGetEstateInfo()
        }
    }
</script>

<style scoped>
@import "./floorDetail.css";
</style>