<template>
    <div class="newOpening">
        <mt-header title="最新开盘">
            <!-- <router-link to="/" slot="left"> -->
                <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
            <!-- </router-link> -->
        </mt-header>
        <div class="content">
            <div class="content-item" v-for="(o, index) in OpenEstateList" :key="index">
                <div class="content-item-title">
                    预计{{o.openDate}}首开
                </div>
                <div class="content-item-detail">
                    开盘楼栋{{o.openBuildingInfo}}
                </div>
            </div>
        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
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
                OpenEstateList: []
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            },
            handleGetOpenEstateInfo() {// 获取开盘列表
                this.Axios.post("/app/3.0/building_front/openEstateInfo", { estateId: this.$route.query.estateId}).then(res=>{
                    console.log(res)
                    if( res.code === 0 ){
                        this.OpenEstateList = res.data;
                    }
                })
            },
        },
        mounted() {
            this.handleGetOpenEstateInfo()
        }
    }
</script>

<style scoped>
@import "./newOpening.css";
</style>