<template>
    <div class="onePic">
        <div class="pic-wrap">
            <img :src="picWechat" /><div class="num">{{index}}/{{info.navList.length}}</div>
        </div>
        <div class="bottom-wrap">
            <div class="text-wrap">
                <div style="line-height: .25rem;">
                    <span class="title">{{houseName}}</span>
                    <span class="space">建面{{housearea}}㎡</span>
                </div>
            </div>
            <div class="parse-wrap">
                <div class="parse-title">户型解析</div>
                <div class="parse">{{houseDesc}}</div>
            </div>
        </div>
        
        
    </div>
</template>

<script>
    export default {
        props: {
            info: Object
        },
        data() {
            return {
                picWechat: null,
                houseName: null,
                housearea: null,
                houseDesc: null,
                index: null
            }
        },
        mounted() {
            console.log(this.info)
            if( this.info ){
                let info = this.info.navList[this.info.index]
                this.picWechat = info.picWechat;
                this.houseName = info.houseName;
                this.housearea = info.housearea;
                this.houseDesc = info.houseDesc;

                this.index = Number(this.info.index) + 1;
            }
        }
    }
</script>

<style scoped>
.onePic{
    height: 100%;
}
.pic-wrap{
    text-align: center;
    width: 100%;
    transform: translate(-50%,-50%);
    position: absolute;
    left: 50%;
    top: 50%;
}
img{
    width: 100%;
    vertical-align: middle
}
.num{
    color: #ffffff;
    position: absolute;
    width: 100%;
}
.bottom-wrap{
    position: absolute;
    bottom: 0;
    text-align: left;
    padding: .2rem;
    line-height: .2rem;
    background: rgba(0,0,0,0.7);
    width: 100%;
}
.text-wrap{
    color: #fff;
}
.title{
    line-height: .19rem;
    font-size: .15rem;
}
.parse-wrap{
    color: #C6CAD3
}
.parse-title{
    line-height: .35rem;
}
.space{
    line-height: .16rem;
    font-size: .12rem;
}
</style>