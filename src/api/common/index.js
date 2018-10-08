import axios from "axios";//"@/axios/api.js"
import wx from 'weixin-js-sdk';

function getWeChatLicense(params){
  return axios.service({
    url: 'app/3.0/WXShare/loadShareInfo',
    method: 'get',
    params
  })
}

//转码Base64
function toBase64(input){
  let _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  let output = "";
  let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  let i = 0;
  while (i < input.length) {
    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);
    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;
    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }
    output = output +
      _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
      _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    }
    return output;
}

export function gotoShare(mid,type){
  let params = {
    token : window.localStorage.getItem('token'),
		jobId : new Date().valueOf(),
		url: window.location.href,
		spName: 'MaterialShareService',
		id: mid,
    type:type
  }
  axios.get('app/3.0/WXShare/loadShareInfo',{params:params}).then((res) =>{
    console.log(res)
    if(res.status == 200){
      if(localStorage.getItem('source_type') == 20){
        window.location.href="gt://gt-dreamlife-share?name="+toBase64(res.data.data.title)+"&simpleDesc="+toBase64(res.data.data.desc)+"&imgUrl="+res.data.data.imgUrl+"&url="+res.data.data.url
      }else{
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.data.data.appID, // 必填，公众号的唯一标识
          timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
          signature: res.data.data.signature,// 必填，签名，见附录1
          jsApiList: ['checkJsApi','onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone']// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        wx.ready(() => {
          let _data = {
            title: res.data.data.title,// 分享标题
            desc: res.data.data.desc,// 分享描述
            link: res.data.data.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: res.data.data.imgUrl,// 分享图标
          }
          wx.onMenuShareTimeline({
            title: _data.desc, 	// 分享标题
            desc: _data.desc,		// 分享描述
            link: _data.url, 		// 分享链接
            imgUrl: _data.imgUrl, 	// 分享图标
            success: function (res) {
                   //shareOK();
            }
          });
          wx.onMenuShareAppMessage(_data);  //发送给好友
          wx.onMenuShareQQ(_data); //发送给QQ
          wx.onMenuShareWeibo(_data); //分享到微博
          wx.onMenuShareQZone(_data); //分享到空间
        })
      }
    }else{
      console.log('获取微信分享SDK证书错误');
    }
  }).catch((error) => {
    console.log(error);
  })
}
