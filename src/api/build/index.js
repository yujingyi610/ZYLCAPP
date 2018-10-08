import axios from "@/axios/api.js"
let api = '/api/bpm'


// 获取楼盘所有信息
export function estateInfo(data){
  return axios.service({
    url: '/app/3.0/building_front/estateInfo',
    method: 'post',
    data
  })
}


// 获取业务表单数据
// export function getformInfo(params){
//   return axios.service({
//     url: api + '/trdChange/get',
//     method: 'get',
//     params
//   })
// }

// 同意
// export function agree(data){
//   return axios.service({
//     url: api + '/core/handle',
//     method: 'post',
//     data
//   })
// }

