<template>
	<div class="calculator">
		<mt-header title="房贷计算器">
			<mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
		</mt-header>

		<div class="contents" ref="wrapper">
			<div>
				<navbar v-model="type">
					<tab-item id="1">
						等额本息
					</tab-item>
					<tab-item id="2">
						等额本金
					</tab-item>
				</navbar>

				<div class="canvas" v-if="showFlag">
					<div class="left">
						<div style="height: 2rem;width: 100%;" id="myChart"></div>
						<div class="left_payM">月供(元)</div>
						<div class='pay_num' ref="wrapper" v-html='payPerMonth'></div>
					</div>

					<div class="right">
						<p class="right_p1"><span class="iconfont lvscolor">&#xe608;</span>支付利息: {{payInterests}} 元</p>
						<p class="right_p2"><span class="iconfont redscolor">&#xe608;</span>还款总额: {{payTotal}} 元</p>
					</div>
				</div>
				<div class="">
					<div class='item_group benxi'>
						<div class='item'>
							<div class='item_title'>贷款方式</div>
							<div class='item_desc'>
								<span class="text-right" @click="showpicker(1)">
							{{loanName}}
						</span>
								<i class="icon-arrow-right" style="color: #a9a9a9;position: relative;top: 1px;" @click="showpicker(1)"></i>
							</div>
						</div>
					</div>
					<div class='item_group' v-if='loanType == "A"'>
						<div class='item'>
							<div class='item_title'>房产总价(万)</div>
							<div class='item_desc'><input type="text" v-model='totolPrice' placeholder="请输入房产总价"></div>
						</div>
						<div class='item'>
							<div class='item_title'>首付比例</div>
							<div class='item_desc'>
								<span class="text-right" @click="showpicker(2)">
							{{proportion}}
						</span>
								<i class="icon-arrow-right" style="color: #a9a9a9;position: relative;top: 1px;" @click="showpicker(2)"></i>
							</div>
						</div>
						<div class='item'>
							<div class='item_title'>公积金贷款金额(万)</div>
							<div class='item_desc'><span style="padding-right:15px;">{{loanMoney == "NaN"? 0:loanMoney}}</span></div>
						</div>
						<div class='item'>
							<div class='item_title'>公积金利率<span style="color:#00B96D;">(基准利率3.25)</span></div>
							<div class='item_desc'>
								<span class="text-right" @click="showpicker(4)">
							{{ratioName}}
						</span>
								<i class="icon-arrow-right" style="color: #a9a9a9;position: relative;top: 1px;" @click="showpicker(4)"></i>
							</div>
						</div>
						<div class='item'>
							<div class='item_title'>公积金利率</div>
							<div class='item_desc'><input type="text" v-model='ratio'></div>
						</div>
						<div class='item'>
							<div class='item_title'>期限</div>
							<div class='item_desc'>
								<span class="text-right" @click="showpicker(3)">
							{{time}}
						</span>
								<i class="icon-arrow-right" style="color: #a9a9a9;position: relative;top: 1px;" @click="showpicker(3)"></i>
							</div>
						</div>
					</div>
					<div class='item_group' v-if='loanType == "B"'>
						<div class='item'>
							<div class='item_title'>房产总价(万)</div>
							<div class='item_desc'><input type="text" v-model='totolPrice' placeholder="请输入房产总价"></div>
						</div>
						<div class='item'>
							<div class='item_title'>首付比例</div>
							<div class='item_desc'>
								<span class="text-right" @click="showpicker(2)">
							{{proportion}}
						</span>
								<i class="icon-arrow-right" style="color: #a9a9a9;position: relative;top: 1px;" @click="showpicker(2)"></i>
							</div>
						</div>
						<div class='item'>
							<div class='item_title'>商贷 金额<span style="color:#00B96D;">({{loanAmount}}成/万)</span></div>
							<div class='item_desc'><span style="padding-right:15px;">{{loanMoney == "NaN"? 0:loanMoney}}</span></div>
						</div>
						<div class='item'>
							<div class='item_title'>商贷利率<span style="color:#00B96D;">(基准利率4.9)</span></div>
							<div class='item_desc'>
								<span class="text-right" @click="showpicker(4)">
							{{ratioName}}
							</span>
								<i class="icon-arrow-right" style="color: #a9a9a9;position: relative;top: 1px;" @click="showpicker(4)"></i>
							</div>
						</div>
						<div class='item'>
							<div class='item_title'>商贷利率</div>
							<div class='item_desc'><input type="text" v-model='ratio'></div>
						</div>
						<div class='item'>
							<div class='item_title'>期限</div>
							<div class='item_desc'>
								<span class="text-right" @click="showpicker(3)">
							{{time}}
						</span>
								<i class="icon-arrow-right" style="color: #a9a9a9;position: relative;top: 1px;" @click="showpicker(3)"></i>
							</div>
						</div>
					</div>
					<div class='item_group' v-if='loanType == "C"'>
						<div class='item'>
							<div class='item_title'>房产总价(万)</div>
							<div class='item_desc'><input type="text" v-model='totolPrice' placeholder="请输入房产总价"></div>
						</div>
						<div class='item'>
							<div class='item_title'>公积金贷款金额(万)</div>
							<div class='item_desc'><input type="text" v-model='gjj_money'></div>
						</div>
						<div class='item'>
							<div class='item_title'>公积金利率<span style="color:#00B96D;">(基准利率3.25)</span></div>
							<div class='item_desc'>
								<span class="text-right" @click="showpicker(4)">
						{{ratioName}}
						</span>
								<i class="icon-arrow-right" style="color: #a9a9a9;position: relative;top: 1px;" @click="showpicker(4)"></i>
							</div>
						</div>
						<div class='item'>
							<div class='item_title'>公积金利率</div>
							<div class='item_desc'><input type="text" v-model='ratio'></div>
						</div>
						<div class='item'>
							<div class='item_title'>商贷款金额(万)</div>
							<div class='item_desc'><span style="padding-right:15px;">{{businessMoney}}</span></div>
						</div>
						<div class='item'>
							<div class='item_title'>商贷利率<span style="color:#00B96D;">(基准利率4.9)</span></div>
							<div class='item_desc'>
								<span class="text-right" @click="showpicker(5)">
						{{businessRatioName}}
						</span>
								<i class="icon-arrow-right" style="color: #a9a9a9;position: relative;top: 1px;" @click="showpicker(5)"></i>
							</div>
						</div>
						<div class='item'>
							<div class='item_title'>商贷利率</div>
							<div class='item_desc'><input type="text" v-model='businessRatio'></div>
						</div>
						<div class='item'>
							<div class='item_title'>期限</div>
							<div class='item_desc'>
								<span class="text-right" @click="showpicker(3)">
							{{time}}
						</span>
								<i class="icon-arrow-right" style="color: #a9a9a9;position: relative;top: 1px;" @click="showpicker(3)"></i>
							</div>
						</div>
					</div>
					<!--<div style="padding:0 0.1rem;">-->
					<!--<a href="javascript:void(0)" type="button" class="btn btn-register" style="color:#fff;" @click="compute">开始计算</a>-->
					<!--</div>-->
				</div>


			</div>
		</div>
		<!--贷款类型picker-->
				<mt-picker id="loanPicker" v-show="loanPickshow" valueKey="name" :showToolbar=true :slots="loanSlots" @change="onLoanValuesChange" class="jjr_picker scroll">
					<div class="toolbar">
						<span class="col-xs-3" style="color: #a9a9a9;" @click="picker_cancel(1)">
	   	   	  	  取消
	   	   	  </span>
						<span class="col-xs-3 col-xs-offset-6" style="color: #37ab6a;" @click="sure_picker(1)">
	   	   	  	  确定
	   	   	  </span>
					</div>
				</mt-picker>
				<div v-show="loanPickshow" class="select_mask"></div>

				<!--首付比例picker-->
				<mt-picker v-show="proportionPickerShow" valueKey="ratio" :showToolbar=true :slots="proportionSlots" @change="onProportionValuesChange" class="jjr_picker scroll">
					<div class="toolbar">
						<span class="col-xs-3" style="color: #a9a9a9;" @click="picker_cancel(2)">
	   	   	  	  取消
	   	   	  </span>
						<span class="col-xs-3 col-xs-offset-6" style="color: #37ab6a;" @click="sure_picker(2)">
	   	   	  	  确定
	   	   	  </span>
					</div>
				</mt-picker>
				<div v-show="proportionPickerShow" class="select_mask"></div>

				<!--期限 picker-->
				<mt-picker v-show="showTimePicker" valueKey="text" :showToolbar=true :slots="timeSlots" @change="onTimeValuesChange" class="jjr_picker scroll">
					<div class="toolbar">
						<span class="col-xs-3" style="color: #a9a9a9;" @click="picker_cancel(3)">
	   	   	  	  取消
	   	   	  </span>
						<span class="col-xs-3 col-xs-offset-6" style="color: #37ab6a;" @click="sure_picker(3)">
	   	   	  	  确定
	   	   	  </span>
					</div>
				</mt-picker>
				<div v-show="showTimePicker" class="select_mask"></div>

				<!--利率picker-->
				<mt-picker v-show="showRatioPicker" valueKey="text" :showToolbar=true :slots="ratioSlots" @change="onRatioValuesChange" class="jjr_picker scroll">
					<div class="toolbar">
						<span class="col-xs-3" style="color: #a9a9a9;" @click="picker_cancel(4)">
	   	   	  	  取消
	   	   	  </span>
						<span class="col-xs-3 col-xs-offset-6" style="color: #37ab6a;" @click="sure_picker(4)">
	   	   	  	  确定
	   	   	  </span>
					</div>
				</mt-picker>

				<mt-picker v-show="showRatioPickerC" valueKey="text" :showToolbar=true :slots="ratioSlotsC" @change="onRatioValuesChangeC" class="jjr_picker scroll">
					<div class="toolbar">
						<span class="col-xs-3" style="color: #a9a9a9;" @click="picker_cancel(5)">
	   	   	  	 取消
	   	   	  </span>
						<span class="col-xs-3 col-xs-offset-6" style="color: #37ab6a;" @click="sure_picker(5)">
	   	   	  	  确定
	   	   	  </span>
					</div>
				</mt-picker>
				<div v-show="showRatioPicker" class="select_mask"></div>
				<div v-show="showRatioPickerC" class="select_mask"></div>



		<div class="btns" style="background:#25b07e">
			<button @click="compute" style="background:#25b07e">开始计算</button>
		</div>


	</div>
</template>

<script>
	import { Header, Button, Navbar, TabItem, Picker, Toast } from 'mint-ui';
	import util from './util';    
	import BScroll from 'better-scroll'

	export default {
		mixins: [util],
		data() {
			return {
				type: '1',
				selecteds: '1',
				selected: "benxi",
				payTotal: 0,
				payPerMonth: 0,
				payInterests: 0,
				showFlag: true,
				titles: "房贷计算器",
				/*贷款类型*/
				loanType: 'A', //贷款方式
				loanName: "商业贷款",
				loanSlots: [{ //贷款类型列表
					flex: 1,
					values: [],
					className: 'slot2',
					textAlign: 'center',
				}],
				loanList: [{
						name: '商业贷款',
						value: 'B'
					},
					{
						name: '公积金贷款',
						value: 'A'
					},
					{
						name: '组合贷款',
						value: 'C'
					}
				],
				loanPickshow: false, //带框弹框是否显示

				totolPrice: this.$route.params.totalPrice ? this.$route.params.totalPrice : '', //总价

				/*首付比例*/
				proportion: '3成', //比例
				proportionSlots: [{ //贷款类型列表
					flex: 1,
					values: [],
					className: 'slot2',
					textAlign: 'center'
				}],
				proportionPickerShow: false,
				proportionList: [{
						ratio: '3成'
					},
					{
						ratio: '4成'
					},
					{
						ratio: '5成'
					},
					{
						ratio: '6成'
					},
					{
						ratio: '7成'
					}
				],
				proportionList2: [{
						ratio: '1成'
					},
					{
						ratio: '2成'
					},
					{
						ratio: '5成'
					},
					{
						ratio: '6成'
					},
					{
						ratio: '7成'
					}
				],

				/*利率1*/
				ratio: 4.9,
				ratioName: "基准利率",
				showRatioPicker: false,
				showRatioPickerC: false,
				ratioSlots: [{ //贷款类型列表
					flex: 1,
					values: [],
					className: 'slot2',
					textAlign: 'center'
				}],
				ratioSlotsC: [{
					flex: 1,
					values: [],
					className: 'slot2',
					textAlign: 'center'
				}],
				ratioListA: [{
						ratio: 3.25,
						text: '基准利率'
					}, {
						ratio: (3.25 * 0.7).toFixed(2),
						text: '7折利率'
					},
					{
						ratio: (3.25 * 0.8).toFixed(2),
						text: '8折利率'
					},
					{
						ratio: (3.25 * 0.85).toFixed(2),
						text: '8.5折利率'
					},
					{
						ratio: (3.25 * 0.9).toFixed(2),
						text: '9折利率 '
					},
					{
						ratio: (3.25 * 0.95).toFixed(2),
						text: '9.5折利率'
					}, {
						ratio: (3.25 * 1.1).toFixed(2),
						text: '1.1倍利率'
					}, {
						ratio: (3.25 * 1.2).toFixed(2),
						text: '1.2倍利率'
					}, {
						ratio: (3.25 * 1.3).toFixed(2),
						text: '1.3倍利率'
					}
				],
				businessRatio: 4.9, //组合商贷利率
				gjj_money: '20', //组合公积金金额
				businessRatioName: '',
				ratioListB: [{
						ratio: 4.9,
						text: '基准利率'
					}, {
						ratio: (4.9 * 0.7).toFixed(2),
						text: '7折利率'
					},
					{
						ratio: (4.9 * 0.8).toFixed(2),
						text: '8折利率'
					},
					{
						ratio: (4.9 * 0.85).toFixed(2),
						text: '8.5折利率'
					},
					{
						ratio: (4.9 * 0.9).toFixed(2),
						text: '9折利率 '
					},
					{
						ratio: (4.9 * 0.95).toFixed(2),
						text: '9.5折利率'
					}, {
						ratio: (4.9 * 1.1).toFixed(2),
						text: '1.1倍利率'
					}, {
						ratio: (4.9 * 1.2).toFixed(2),
						text: '1.2倍利率'
					}, {
						ratio: (4.9 * 1.3).toFixed(2),
						text: '1.3倍利率'
					}
				],

				time: '20年', //期限
				showTimePicker: false,
				timeSlots: [{
					flex: 1,
					values: [],
					className: 'slot2',
					textAlign: 'center'
				}], //期限数组
				timeList: [{
						text: '1年',
						value: 1
					},
					{
						text: '2年',
						value: 2
					},
					{
						text: '3年',
						value: 3
					},
					{
						text: '4年',
						value: 4
					},
					{
						text: '5年',
						value: 5
					},
					{
						text: '6年',
						value: 6
					},
					{
						text: '7年',
						value: 7
					},
					{
						text: '8年',
						value: 8
					},
					{
						text: '9年',
						value: 9
					},
					{
						text: '10年',
						value: 10
					},
					{
						text: '11年',
						value: 11
					},
					{
						text: '12年',
						value: 12
					},
					{
						text: '13年',
						value: 13
					},
					{
						text: '14年',
						value: 14
					},
					{
						text: '15年',
						value: 15
					},
					{
						text: '16年',
						value: 16
					},
					{
						text: '17年',
						value: 17
					},
					{
						text: '18年',
						value: 18
					},
					{
						text: '19年',
						value: 19
					},
					{
						text: '20年',
						value: 20
					},
					{
						text: '21年',
						value: 21
					},
					{
						text: '22年',
						value: 22
					},
					{
						text: '23年',
						value: 23
					},
					{
						text: '24年',
						value: 24
					},
					{
						text: '25年',
						value: 25
					},
					{
						text: '26年',
						value: 26
					},
					{
						text: '27年',
						value: 27
					},
					{
						text: '28年',
						value: 28
					},
					{
						text: '29年',
						value: 29
					},
					{
						text: '30年',
						value: 30
					}
				]

			}
		},
		created() {

		},
		mounted() {
		},
		beforeRouteEnter (to, from, next) {
    	next(vm =>{
    		vm.updataStatus();
    		localStorage.setItem("enter_time",new Date());
    		  vm.ajaxLogRequest('/addLog',{
		      logtype:'new_mobile_visit',
		      user_id:sessionStorage.getItem('userid') || null,
		      account_type:localStorage.getItem('account_type'),
		      user_agent:vm.getBrowser(),//浏览器信息
		      cookie:'',//暂无，不知道怎么获取(用户唯一身份)
		      ip_addr:  localStorage.getItem('ip'),
		      os_type:  vm.getPhoneType(),
		      present_url:  window.location.href,
		      record_time: new Date(),
		      version: '3.0.0',
		      source_type:localStorage.getItem('source_type')
    		},'POST')
	    })
	 },
	  beforeRouteLeave(to, from, next) {
	      let userAgent = this.getBrowser();
	      let os_type = this.getPhoneType();
	      let enter_time = localStorage.getItem("enter_time");
	      let leave_time = new Date();
	      let enter_url = window.location.host + to.path;
	      let leave_url = window.location.href;
	      if (leave_url.indexOf("?") > 0) {
	        leave_url = leave_url.substr(0, leave_url.indexOf("?"));
	      }
	      let version = '3.0.0';
	      this.ajaxLogRequest('/addLog', {
	        logtype: 'new_mobile_visit_time',
	        user_id: sessionStorage.getItem('userid') || null,
	        user_agent: userAgent,
	        cookie: '',
	        ip_addr: localStorage.getItem('ip'),
	        os_type: os_type,
	        enter_url: enter_url,
	        leave_url: leave_url,
	        enter_time: enter_time,
	        leave_time: leave_time,
	        version: version,
	      },'POST');
		next();
	},
		deactivated() {
			this.$destroy(true)
		},
		methods: {
			_initScroll() {
				if(!this.scroll) {
					this.scroll = new BScroll(this.$refs.wrapper, {
						click: true,
						scrollY: true,
						probeType: 3
					});
				} else {
					this.scroll.refresh();
				}
			},
			ajaxLogRequest(url, data, type){
			  const appId = 'onlineSale';
			  const appSecurect = 'e9178578-845f-486c-bd18-5011c7472f72';
			  const time = new Date().getTime();
			  let sign = this.$md5(appId + time + appSecurect);
			  let content = [];

			  content.push(data);
			  let jsonData = {
			      appId:appId,
			      time:time,
			      sign:sign,
			      content: content
			  }
			  if(type == 'POST'){
			   jsonData = JSON.stringify(jsonData);
			  // let _url = 'https://partner-sso.gtdreamlife.com/api/logServer' + url; //测试环境log
			  let _url = 'https://ideallife-sso.gtdreamlife.com/api/logServer' + url; //正式环境log
			  	return this.Axios.post(_url,
			  	{jsonData:jsonData},
			  	{headers: {'Content-Type': 'application/x-www-form-urlencoded"'}}
			  	).then((res)=>{//因为服务器的原因，这个功能不能使用
    			console.log(res);
    		})
			}
			},
			getBrowser(){
                var appName = navigator.appName; //浏览器的正式名称
                var appVersion = navigator.appVersion; //浏览器的版本号
                var cookieEnabled = navigator.cookieEnabled; // 返回用户浏览器是否启用了cookie
                var cpuClass = navigator.cpuClass; //返回用户计算机的cpu的型号，通常intel芯片返回"x86"（火狐没有）
                var mimeType = navigator.mimeTypes; // 浏览器支持的所有MIME类型的数组
                var platform = navigator.platform; // 浏览器正在运行的操作系统平台，包括Win16(windows3.x)
                //   Win32(windows98,Me,NT,2000,xp),Mac68K(Macintosh 680x0)
                //     和ＭacPPC(Macintosh PowerPC)
                var plugins = navigator.plugins; //  安装在浏览器上的所有插件的数组
                var userLanguage = navigator.userLanguage; // 用户在自己的操作系统上设置的语言（火狐没有）
                var userAgent = navigator.userAgent; //包含以下属性中所有或一部分的字符串：appCodeName,appName,appVersion,language,platform
                var systemLanguage = navigator.systemLanguage; // 用户操作系统支持的默认语言（火狐没有）
				//判断是否IE
	            var isIe = function() {
	                var i = navigator.userAgent.toLowerCase().indexOf("msie");
	                return i >= 0;
	            }
            //判断是否firefox
	            var isFireFox = function() {
	                var i = navigator.userAgent.toLowerCase().indexOf("firefox");
	                return i >= 0;
	            }
                var info = "";
                var type = "";
                if (isIe()) {
                    type = "IE浏览器";
                } else if (isFireFox()) {
                    type = "火狐浏览器";
                }
								info = userAgent;
                /*info += "浏览器类型：" + type;
                info += "浏览器属性信息：" + userAgent  ;
                info += "浏览器的正式名称：" + appName ;
                info += "浏览器的版本号：" + appVersion ;
                info += "浏览器的是否启用了cookie：" + cookieEnabled ;
                info += "cpu等级：" + cpuClass;
                info += "浏览器的MIME类型：" + mimeType.length;
                info += "系统平台：" + platform;
                info += "安装的插件：" + plugins;
                info += "插件的数量：" + plugins.length;
                info += "用户设置的操作系统语言：" + userLanguage;
                info += "操作系统支持的默认语言：" + systemLanguage ;
                info += "javaEnabled：" + navigator.javaEnabled() ;
                info += "屏幕分辨率高度：" + window.screen.height ;
                info += "屏幕分辨率宽度：" + window.screen.width ;
                info += "颜色质量：" + window.screen.colorDepth + "位";
                info += "像素：" + window.screen.deviceXDPI + "像素/英寸";
                info += "字体是否平滑：" + window.screen.fontSmoothingEnabled ;*/
 				return info;
			},
			getPhoneType(){
				var u = navigator.userAgent;
				var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
				var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
				if(isAndroid){
					return 'Android';
				} else if(isiOS){
					return 'ios';
				};
			},
			drawLine() {
				// 基于准备好的dom，初始化echarts实例
				//      this.$nextTick(() => {
				this.showFlag = true
				let myChart = this.$echarts.init(document.getElementById('myChart'))
				// 绘制图表
				myChart.setOption({
					color: ['#FE5A4C', '#25B07E'],
					//					graphic
					series: [{
						name: '房贷计算器',
						type: 'pie',
						radius: ['50%', '70%'],
						avoidLabelOverlap: false,
						label: {
							normal: {
								show: false,
								position: 'center',

							},
						},
						itemStyle: {
							normal: {
								borderWidth: 3,
								borderColor: '#fff',
							}
						},
						labelLine: {
							normal: {
								show: false
							}
						},
						data: [{
								value: this.payInterests,
								name: '支付利息'
							},
							{
								value: this.payTotal,
								name: '还款总额'
							},

						]
					}]
				});
				//      })
			},
			goBack() {
				this.$router.go(-1)
			},
			updataStatus() {
				//document.title = '房贷计算器';  //我修改的2018.09.25
				this.totalPrice = this.$route.params.totalPrice != "null" ? this.$route.params.totalPrice : '';
			},
			showpicker(pickerType) {
				$('body').on('touchmove', function(event) {
					event.preventDefault();
				});
				switch(pickerType) {
					case 1:
						this.preLoanName = this.loanName;
						this.preLoanType = this.loanType;
						this.$set(this.loanSlots[0], "values", this.loanList);
						this.loanPickshow = true;
						break;
					case 2:
						this.preProportion = this.proportion;
						this.$set(this.proportionSlots[0], "values", this.proportionList);
						this.proportionPickerShow = true;
						break;
					case 3:
						this.preTime = this.time;
						this.$set(this.timeSlots[0], "values", this.timeList);
						this.showTimePicker = true;
						break;
					case 4:
						this.preRatio = this.ratio;
						this.preRatioName = this.ratioName;
						if(this.loanType == 'A') {
							this.$set(this.ratioSlots[0], "values", this.ratioListA);
						} else if(this.loanType == 'B') {
							this.$set(this.ratioSlots[0], "values", this.ratioListB);
						} else {
							this.$set(this.ratioSlots[0], "values", this.ratioListA);
						}
						this.showRatioPicker = true;
						break;
					case 5:
						this.businessRatio = this.ratio;
						this.$set(this.ratioSlotsC[0], "values", this.ratioListB);
						this.showRatioPickerC = true;
						break;
				}
			},
			picker_cancel(pickerType) {
				$('body').unbind();
				switch(pickerType) {
					case 1:
						this.loanName = this.preLoanName;
						this.loanType = this.preLoanType;
						this.loanPickshow = false;
						break;
					case 2:
						this.proportion = this.preProportion;
						this.proportionPickerShow = false;
						break;
					case 3:
						this.time = this.preTime;
						this.showTimePicker = false;
						break;
					case 4:
						this.ratio = this.preRatio;
						this.ratioName = this.preRatioName;
						this.showRatioPicker = false;
						break;
					case 5:
						this.showRatioPickerC = false;
						break;
				}
			},
			sure_picker(pickerType) {
				$('body').unbind();
				switch(pickerType) {
					case 1:
						this.loanPickshow = false;
						/*初始化*/
						if(this.loanType == 'A') {
							this.totolPrice = '';
							this.proportion = "3成";
							this.ratioName = "基准利率";
							this.ratio = 3.25;
							this.time = 20;
						} else if(this.loanType == 'B') {
							this.totolPrice = '';
							this.proportion = "4成";
							this.ratioName = "基准利率";
							this.ratio = 4.9;
							this.time = 20;
							this.proportionList = this.proportionList2;
						} else {
							this.totolPrice = '';
							this.proportion = "4成";
							this.ratioName = "基准利率";
							this.ratio = 3.25;
							this.time = 20;
							this.businessRatioName = "基准利率";
							this.businessRatio = 3.25;
							this.gjj_money = '';
							this.businessRatio = 4.9;
						}
						this.payPerMonth = 0;
						this.payTotal = 0;
						this.payInterests = 0;
						break;
					case 2:
						this.proportionPickerShow = false;
						break;
					case 3:
						this.showTimePicker = false;
						break;
					case 4:
						this.showRatioPicker = false;
						break;
					case 5:
						this.showRatioPickerC = false;
						break;
				}
			},
			onLoanValuesChange(picker, values) {
				if(values[0]) {
					this.loanName = values[0].name;
					this.loanType = values[0].value;
				}
			},
			onProportionValuesChange(picker, values) {
				if(values[0]) {
					this.proportion = values[0].ratio;
				}
			},
			onTimeValuesChange(picker, values) {
				if(values[0]) {
					this.time = values[0].text;
				}
			},
			onRatioValuesChange(picker, values) {
				if(values[0]) {
					this.ratio = values[0].ratio;
					this.ratioName = values[0].text;
				}
			},
			onRatioValuesChangeC(picker, values) {
				if(values[0]) {
					this.businessRatio = values[0].ratio;
					this.businessRatioName = values[0].text;
				}
			},
			compute() {
				this.showFlag = true
				var month, huankuan;
				//本息还款的月还款额(参数: 年利率/贷款总额/贷款总月份)
				function getMonthMoney1(lilv, total, month) {
					var lilv_month = lilv / 12; //月利率
					return total * lilv_month * Math.pow(1 + lilv_month, month) / (Math.pow(1 + lilv_month, month) - 1);
				}
				//本金还款的月还款额(参数: 年利率 / 贷款总额 / 贷款总月份 / 贷款当前月0～length-1)
				function getMonthMoney2(lilv, total, month, cur_month) {
					var lilv_month = lilv / 12; //月利率
					//return total * lilv_month * Math.pow(1 + lilv_month, month) / ( Math.pow(1 + lilv_month, month) -1 );
					var benjin_money = total / month;
					return(total - benjin_money * cur_month) * lilv_month + benjin_money;
				}
				if(this.loanType == "C") {
					if(!this.totolPrice || !this.gjj_money || !this.ratio || !this.businessRatio || !this.time) {
						Toast("请填写完整信息！");
						return;
					}
					var gjj_lv = this.ratio / 100;
					var sd_lv = this.businessRatio / 100;
					var gjj_total = parseInt(this.gjj_money);
					var sd_total = parseInt(this.businessMoney);
					var total_daikuan = gjj_total + sd_total;
					month = parseInt(this.time) * 12;
					// debugger;
					if(this.type == "1") {
						var combine_perMoney = (getMonthMoney1(sd_lv, sd_total * 10000, month) + getMonthMoney1(gjj_lv, gjj_total * 10000, month)); //调用函数计算
						this.payPerMonth = combine_perMoney.toFixed(2);
						this.payTotal = (combine_perMoney * month).toFixed(2);
						this.payInterests = (this.payTotal - total_daikuan * 10000).toFixed(2);
					} else {
						var combine_total = 0;
						var combine_month_money = "";
						for(var j = 0; j < month; j++) {
							//调用函数计算: 本金月还款额
							huankuan = getMonthMoney2(sd_lv, sd_total * 10000, month, j) + getMonthMoney2(gjj_lv, gjj_total * 10000, month, j);
							combine_total += huankuan;
							//fmobj.month_money2.options[j] = new Option( (j+1) +"月," + huankuan + "(元)", huankuan);
							combine_month_money += "<div>" + (j + 1) + "月," + huankuan.toFixed(2) + "(元)</div>";
						}
						this.payPerMonth = combine_month_money;
						this.payTotal = combine_total.toFixed(2);
						this.payInterests = (combine_total - total_daikuan * 10000).toFixed(2);
					}
				} else {
					if(!this.totolPrice || !this.proportion || !this.ratio || !this.time) {
						Toast("请填写完整信息！");
						return;
					}
					var lilv = this.ratio / 100;
					var huankuan, all_total2 = 0,
						month_money2 = '';
					month = parseInt(this.time) * 12;
					if(this.type == "1") {
						var perMoney = getMonthMoney1(lilv, this.loanMoney * 10000, month);
						this.payPerMonth = perMoney.toFixed(2);
						this.payTotal = (perMoney * month).toFixed(2);
						this.payInterests = (this.payTotal - this.loanMoney * 10000).toFixed(2);
					} else {
						for(var j = 0; j < month; j++) {
							huankuan = getMonthMoney2(lilv, this.loanMoney * 10000, month, j);
							all_total2 += huankuan;
							month_money2 += "<div>" + (j + 1) + "月," + huankuan.toFixed(2) + "(元)</div>";
						}
						this.payPerMonth = month_money2;
						this.payTotal = all_total2.toFixed(2);
						this.payInterests = (all_total2 - this.loanMoney * 10000).toFixed(2);
					}
				}

				setTimeout(() => {
					this.drawLine()
				}, 50)
			}
		},
		update() {
			//			this.drawLine()
			//			this.showFlag = true;
		},
		watch: {

		},
		computed: {
			loanAmount() {
				return 10 - parseInt(this.proportion);
			},
			loanMoney() {
				return(this.totolPrice * (this.loanAmount / 10)).toFixed(1);
			},
			businessMoney() {
				return this.totolPrice - this.gjj_money;
			}
		},
		components: {
			"mt-picker": Picker,
			'mt-header': Header,
			            'mt-button': Button,
			            Navbar,
			            TabItem
		}
	}
</script>
</script>

<style scoped>
	@import "./calculator.css";
</style>
