<template>
    <div>
        <div id="textaudio1" @click="toPlay"></div>
    </div>
</template>

<script>
import audio  from './wx-audio.js'
    export default {
        mixins: ['audio'],
        props: ['brightVoice'],
        watch: {
            brightVoice(e) {
                if( e ){
                    this.wxAudio = new Wxaudio({
                        ele: '#textaudio1',
                        title: '顾问说',
                        // disc: 'Break Me Up',
                        src: e,
                        width: '320px'
                    });
                }
                
            }
        },
        data() {
            return{
                wxAudio: null,
                play: false
            }
        },
        methods: {
            toPlay() {
                if( this.wxAudio ){
                    if( this.play ){
                        this.wxAudio.audioPause()
                        this.play = false
                    }else{
                        this.wxAudio.audioPlay()
                        this.play = true
                    }
                }
                
                
            }
        },
        mounted() {
            if( this.brightVoice ){
                this.wxAudio = new Wxaudio({
                    ele: '#textaudio1',
                    title: '顾问说',
                    // disc: 'Break Me Up',
                    src: this.brightVoice,
                    width: '320px'
                });
            }
            // this.wxAudio = new Wxaudio({
            //     ele: '#textaudio1',
            //     title: 'Jar Of Love',
            //     disc: 'Break Me Up',
            //     src: 'http://jq22.qiniudn.com/ocean_drive_01.mp3',
            //     width: '320px'
            // });
            // function play() {
            //     wxAudio.audioPlay()
            // }
        }
    }
</script>

<style scoped>
.wx-audio-content .wx-audio-content{
  -moz-user-select: -moz-none;
  -ms-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  width: 300px;
  height: auto;
  padding: 8px 10px;
  /*border: 1px solid rgba(33, 44, 55, 0.3);*/
 background: rgba(244,244,245,0.35);
/*border: 1px solid #FFF;*/
border-radius: 4px;
 	background: #f9f9fa;
  margin: 0 auto;
  font-size: 0;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}
</style>