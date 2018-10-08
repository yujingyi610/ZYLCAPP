<template>
    <div class="oneDetail">
        <div style="line-height: .1rem;">
            <div class="swiper-slide" @click="goBigPic"><img :src="picWechat"></div>
        </div>
        <div class="text-wrap">
            <div style="line-height: .25rem;">
                <span class="title">{{name}}</span>
                <span class="space">建面{{houseArea}}㎡</span>
            </div>
            <div>
                <span class="tag" v-for="(item, index) in labelList" :key="index">{{item.labelName}}</span>
            </div>
        </div>
        <div class="parse-wrap">
            <div class="parse-title">户型解析</div>
            <div class="parse">{{houseAnalyze}}</div>
            <!-- <div><span class="more">更多</span><span class="arrows-down"><img src="static/assets/Group@2x.png" /></span></div> -->
        </div>
        <div class="prototypeRoom" v-if="modelList.length > 0">
            <p class="title">样板间（{{modelList.length}}）</p>
            <div class="content-pic">
                <div class="content-pic-item" v-for="(o, index) in modelList" :key="index" @click="goPicCarousel">
                    <img :src="o.albumUrlwechat" />
                </div>
            </div>
        </div>
        <house-type-pic v-if="showPic" @close="closeChild" :info="info" :navList="navList"></house-type-pic>
    </div>
</template>

<script>
import houseTypePic from '../houseTypePic/houseTypePic.vue'
    export default {
        // props: {
        //     info: Number,
        //     navList: Array
        // },
        props: ['info', 'navList'],
        components: {
            houseTypePic
        },
        watch: {
            info(e) {
                console.log(e)
                this.handleGetHosueTypeDetail()
                // this.name = this.info;
            },
            navList: {
                handler(val, oldVal) {
                    console.log(val)
                },
                deep: true
            }
        },
        data() {
            return{
                name: null,
                showPic: false,
                houseArea: null,
                houseAnalyze: null,
                labelList: [],
                modelList: [],
                picWechat: null
            }
        },
        methods: {
            goBigPic() {
                // this.$router.push('/mainPage/houseTypePic?index=' + this.info)

                this.showPic = true
            },
            handleGetHosueTypeDetail() {
                this.Axios.post('/app/3.0/building_front/housePicInfo',
                    {
                        id: this.navList[this.info].id
                    }
                ).then((res)=> {
                    if( res.code === 0 ){
                        let data = res.data;
                        this.name = this.navList[this.info].houseName;
                        this.houseArea = data.houseArea;
                        this.houseAnalyze = data.houseAnalyze;
                        this.labelList = data.labelList;
                        this.modelList = data.modelList;
                        this.picWechat = data.picWechat;
                        
                    }
                })
            },
            closeChild(index) {
                this.$emit('changeNav', index)
                this.showPic = false
            },
            goPicCarousel() {
                this.$router.push('picCarousel')
            }
        },
        mounted() {
            console.log(this.info)
            console.log(this.navList)
            // this.name = this.info;
            // this.handleGetHosueTypeDetail()
        }
    }
</script>

<style scoped>
.oneDetail{
    width: 100%;
    text-align: initial;
}
img{
    width: 100%;
}
.text-wrap{
    padding: .2rem;
    line-height: .2rem;
    border-bottom: 1px solid #EAEBED;
}
.title{
    color: #333333;
    line-height: .19rem;
    font-size: .15rem;
}
.space{
    color: #989CA8;
    line-height: .16rem;
    font-size: .12rem;
}
.tag{
    color: #25B07E;
    letter-spacing: 0;
    line-height: 22px;
    border: 1px solid #25B07E;
    border-radius: .02rem;
    padding: .01rem;
}
.parse-wrap{
    padding: .2rem;
    line-height: .2rem;
    color: #989CA8;
    border-bottom: 1px solid #EAEBED;
}
.arrows-down{
    display: inline-block;
    width: .12rem;
}
.more{
    color: #6BA686;
    line-height: .3rem;
    font-size: .15rem;
}
.prototypeRoom{
    padding: .2rem
}

.prototypeRoom .title{
    font-size: .12rem;
    color: #989CA8;
    line-height: .16rem;
}
.prototypeRoom .content-pic{
    width: 100%;
    overflow: hidden;
}
.prototypeRoom .content-pic-item{
    width: 1.1rem;
    height: 1.1rem;
    float: left;
    padding: .05rem;
    box-sizing: border-box;
}
.prototypeRoom  .content-pic-item img{
    width: 100%;
    height: 100%;
}
.prototypeRoom .content-pic-item .more{
    width: 100%;
    height: 100%;
    line-height: 1rem;
    font-size: .12rem;
    color: #989CA8;
    text-align: center;
    background: #F4F4F5;
}
</style>