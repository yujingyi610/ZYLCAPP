<template>
    <div class="houseTypePic">
        <mt-header>
            <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
        </mt-header>
        <div class="swipe">
            <!-- <mt-swipe :show-indicators="false" :auto="0">
                <mt-swipe-item>
                    <one-pic></one-pic>
                </mt-swipe-item> -->
                <!-- <mt-swipe-item style="text-align: center; vertical-align:middle;"><span></span><img src="http://temp.im/640x260/c1c" /></mt-swipe-item>
                <mt-swipe-item style="text-align: center; vertical-align:middle;"><span></span><img src="http://temp.im/640x260/85c" /></mt-swipe-item> -->
            <!-- </mt-swipe> -->
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(o, index) in navList" :key="index" :data="index">
                        <one-pic :info="{index: index, navList: navList}"></one-pic>
                    </div>
                </div>
            </div>
            <!-- Add Arrows -->
    <div class="swiper-button-next">&gt;</div>
    <div class="swiper-button-prev">&lt;</div>
        </div>
    </div>
</template>

<script>
import Swiper from 'swiper';

import { Header, Button } from 'mint-ui';
import { Swipe, SwipeItem } from 'mint-ui';
import onePic from './components/onePic.vue'
    export default {
        props: {
            info: Number,
            navList: Array
        },
        watch: {
            info() {
                console.log(this.info)
                if( this.swiper ){
                    console.log(this.swiper)
                    this.swiper.slideTo(this.info, 1000, false);
                }
                
            }
        },
        components: {
            'mt-header': Header,
            'mt-button': Button,
            'mt-swipe': Swipe,
            'mt-swipe-item': SwipeItem,
            onePic
        },
        data() {
            return{
                swiper: null
            }
        },
        methods: {
            goBack() {
                // console.log($('.swiper-slide-active'))
                // console.log($('.swiper-slide-active').attr('data'))
                //  this.$router.replace('/mainPage/houseTypeDetail?index=' + $('.swiper-slide-active').attr('data'))
                // $('#picCarousel').fadeOut("fast")
                //  document.body.style.overflow='initial';
                this.$emit('close', $('.swiper-slide-active').attr('data'))
            }
        },
        mounted() {
            console.log(this.navList)
            // let index = this.$route.query.index;
            let _this = this;
            console.log(_this.info)
            // setTimeout(()=>{
                this.swiper = new Swiper('.swiper-container', {
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    freeMode : false,
                    initialSlide : _this.info, 
                });
                this.swiper.slideTo(_this.info, 300, false);
            // }, 500)
            
            // swiper.slideTo(index, 300, false);
        }
    }
</script>

<style scoped>
@import './houseTypePic.css';
</style>