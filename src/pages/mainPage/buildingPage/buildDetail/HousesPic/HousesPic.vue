<template>
    <div class="HousesPic">
        <mt-header title="楼盘相册">
            <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
        </mt-header>
        <div class="content">
            <div v-for="(item, index) in picList" :key="index">
                <p class="title">{{item.list[0].albumTypeName}}({{item.list.length}})</p>
                <div class="content-pic">
                    <div class="content-pic-item" v-for="(o, index) in item.list" :key="index" v-if="index< 8 || ( index >= 8 && item.showFlag)">
                        <img :src="o.uriwechat" />
                    </div>
                    <div class="content-pic-item" v-if="!item.showFlag && item.list.length >8">
                        <div class="more" @click="lookMore(index)">点击查看更多</div>
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
                showFlag: false,
                picList: []
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            },
            handleGetAlbumListInfo() {// 获取所有相册
                this.picList = [];
                this.Axios.post("/app/3.0/building_front/albumListInfo", { estateId: this.$route.query.estateId}).then(res=>{
                    console.log(res)
                    if( res.code === 0 ){
                        let data = res.data;
                        
                        for( let key in data ){
                            if( key.indexOf('data') != -1 && data[key].length > 0 ){
                                this.picList.push({
                                    list: data[key],
                                    showFlag: false
                                })
                            }
                        }
                        console.log(this.picList)
                    }
                })
            },
            lookMore(index) {
                this.picList[index].showFlag = true;
                // this.showFlag = true;
            },

        },
        mounted() {
            $(window).scrollTop(0)
            // document.body.style.overflow='initial';
            this.handleGetAlbumListInfo()
        }
    }
</script>

<style scoped>
@import "./HousesPic.css";
</style>