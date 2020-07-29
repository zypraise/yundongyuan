<template>
	<div>
		<div class="edit-mask" v-if="isEdit">
			<div class="is-edit">
				<div class="header">选择需要在列表中显示的指标<img v-on:click="isEdit = false" style="width: 20px;height: 20px;vertical-align: top;float: right;margin-top: 2px;cursor: pointer;"
					 src="../../assets/imgs/close.png" /></div>
				<div class="body">
					<div v-if="listType == 1" class="item" :class="{'current':item.is}" v-for="(item,index) in xuanze" v-on:click="setXuanze(index)">
						<div class="code"><img v-if="item.is" src="../../assets/imgs/code.png" /></div>
						<p>{{item.name}}</p>
					</div>
					<div v-if="listType == 3" class="item" :class="{'current':item.is}" v-for="(item,index) in peizhi" v-on:click="setXuanze(index)">
						<div class="code"><img v-if="item.is" src="../../assets/imgs/code.png" /></div>
						<p>{{item.name}}</p>
					</div>
				</div>
			</div>
		</div>

		<div class="edit-mask" v-if="isDuibi">
			<div class="is-edit" style="width: 800px;">
				<div class="header" style="text-align: center;">基础体能雷达对比图<img v-on:click="isDuibi = false" style="width: 20px;height: 20px;vertical-align: top;float: right;margin-top: 2px;cursor: pointer;"
					 src="../../assets/imgs/close.png" /></div>
				<div class="body">
					<div id="ditu" style="width: 100%;height: 500px;"></div>
				</div>
			</div>
		</div>

		<section class="shengli-main">
			<div class="body-item" style="overflow-x: hidden;">
				<div class="title" style="min-width: 852px;">
					<div style="float: right;">
						<img v-if="listType == 1 || listType == 3" src="../../assets/imgs/vs.png" style="width:  20px;height:  20px;vertical-align:  top;margin: 18px 10px;cursor: pointer;"
						 v-on:click="duibi()" />
						<img v-if="listType == 1 || listType == 3" src="../../assets/imgs/edit.png" style="width:  20px;height:  20px;vertical-align:  top;margin: 18px 10px;cursor: pointer;"
						 v-on:click="isEdit = !isEdit" />
						<img src="../../assets/imgs/wen.png" style="width:  20px;height:  20px;vertical-align:  top;margin: 18px 10px;cursor: pointer;"
						 v-on:click="showPingFen = false" /></div>
					<ul class="title-tab">
						<li class="item" :class="{'current':listType == 1}" v-on:click="listType = 1">基础体能</li>
						<li class="item" :class="{'current':listType == 2}" v-on:click="listType = 2">板块体能</li>
						<li class="item" :class="{'current':listType == 3}" v-on:click="listType = 3">稳定和均衡</li>
						<li class="item" v-on:click="backWorkout('2,0')">专项体能</li>
						<!--<li class="item" v-on:click="backWorkout('3,0')">雷达图</li>-->
					</ul>
				</div>
				<section>
					<div class="table-box">
						<table style="margin-bottom: 50px;">
							<thead>
								<tr>
									<th style="min-width: 80px;max-width: 80px;width: 80px;left:0px;z-index: 100;">对比选择</th>
									<th style="min-width: 130px;max-width: 130px;width: 130px;left:93px;z-index: 100;">测试时间<img @click="sortbut('TestDate')"
								 :src="sort('TestDate')" /></th>
									<th style="min-width: 130px;max-width: 130px;width: 130px;left:236px;z-index: 100;">运动员<img @click="sortbut('SportName')"
								 :src="sort('SportName')" /></th>
									<th>运动项目</th>
									<th>参赛主项</th>
									<th>年龄</th>
									<th>性别</th>
									<th v-if="listType == 1">身高</th>
									<th v-if="listType == 1">体重</th>
									<th v-for="(item,index) in staminaName">{{item}}</th>
									<th>评分<img @click="sortbut('Score')"
								 :src="sort('Score')" /></th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item,index) in staminaList">
									<th style="min-width: 80px;max-width: 80px;width: 80px;left:0px;"><input :disabled="!(listType == 1 || listType == 3)"
										 type="checkbox" name="check" :value="index" v-model="check" /></th>

									<th style="min-width: 130px;max-width: 130px;width: 130px;left:93px;">{{item.TestDate}}</th>

									<th style="min-width: 130px;max-width: 130px;width: 130px;left:236px;">{{list[index].SportName}}</th>
									<td>{{list[index].TrainName}}</td>
									<td>{{list[index].TrainSecName}}</span></td>
									<td>{{list[index].Age}}</td>
									<td>{{list[index].Sex}}</td>


									<td v-if="listType == 1">{{list[index].Height}}</td>
									<td v-if="listType == 1">{{list[index].Weight}}</td>
									<td v-for="val in item.valueList">{{val}}</td>
									<td>{{list[index].Score}}</td>
								</tr>
							</tbody>
						</table>
						<div v-if="sport !== ''" id="biao1" style="margin-bottom: 50px;width: 100%;height: 500px;overflow: hidden;"></div>
						<div v-if="sport !== '' && (listType == 1 || listType == 3)" id="biao2" style="width: 100%;height: 500px;overflow: hidden;"></div>

					</div>
				</section>
			</div>
		</section>
		<section class="ping-fen" :style="{'display':(showPingFen?'none':'block')}">
			<ti-neng v-if="listType == 1" v-bind="daochu" v-bind:show-ping-fen="showPingFen"></ti-neng>
			<ban-kuai v-if="listType == 2" v-bind="daochu" v-bind:show-ping-fen="showPingFen"></ban-kuai>
			<qu-gan v-if="listType == 3" v-bind="daochu" v-bind:show-ping-fen="showPingFen"></qu-gan>
		</section>
		<div class="mask" v-if="daochu">
			<div class="daochu-mask">
				<div class="title">
					<img class="close-img" src="../../assets/imgs/close.png" v-on:click="closeDaochu()">
					<span>选择导出项</span>
					<input v-if="listType == 1 && daochuNum == 1" style="margin: 17px 6px 0px 20px;vertical-align:  top;" value="1"
					 type="checkbox" name="alldaochu" v-model="allDaoChu1">
					<input v-if="listType == 1 && daochuNum == 2" style="margin: 17px 6px 0px 20px;vertical-align:  top;" value="1"
					 type="checkbox" name="alldaochunext" v-model="allDaoChuNext1">

					<input v-if="listType == 2 && daochuNum == 1" style="margin: 17px 6px 0px 20px;vertical-align:  top;" value="1"
					 type="checkbox" name="alldaochu" v-model="allDaoChu2">
					<input v-if="listType == 2 && daochuNum == 2" style="margin: 17px 6px 0px 20px;vertical-align:  top;" value="1"
					 type="checkbox" name="alldaochunext" v-model="allDaoChuNext2">

					<input v-if="listType == 3 && daochuNum == 1" style="margin: 17px 6px 0px 20px;vertical-align:  top;" value="1"
					 type="checkbox" name="alldaochu" v-model="allDaoChu3">
					<input v-if="listType == 3 && daochuNum == 2" style="margin: 17px 6px 0px 20px;vertical-align:  top;" value="1"
					 type="checkbox" name="alldaochunext" v-model="allDaoChuNext2">
					<span>全选/全不选</span>
				</div>
				<div v-if="daochuNum == 1" class="daochu-table">
					<div v-if="listType == 1" style="line-height: 40px;float: left;width: 50%;" v-for="item in sportList"><input style="margin-left: 6px;"
						 :value="item.FullName" type="checkbox" name="user" v-model="userXuanZe1" />{{item.FullName}}</div>
					<div v-if="listType == 2" style="line-height: 40px;float: left;width: 50%;" v-for="item in sportList"><input style="margin-left: 6px;"
						 :value="item.FullName" type="checkbox" name="user" v-model="userXuanZe1" />{{item.FullName}}</div>
					<div v-if="listType == 3" style="line-height: 40px;float: left;width: 50%;" v-for="item in sportList"><input style="margin-left: 6px;"
						 :value="item.FullName" type="checkbox" name="user" v-model="userXuanZe1" />{{item.FullName}}</div>
				</div>
				<div v-if="daochuNum == 1" class="but-box">
					<!-- <button v-on:click="daochuNum = 2">下一步</button><button v-on:click="closeDaochu()">取消</button> -->
					<button v-on:click="mytableExcel('daochu')">确认</button><button v-on:click="closeDaochu()">取消</button>
				</div>
				<div style="height:0px;overflow: hidden;">
					<table id="daochu" style="margin-bottom: 50px;">
						<thead>
							<tr>
								<th>测试时间</th>
								<th>运动员</th>
								<th>运动项目</th>
								<th>参赛主项</th>
								<th>年龄</th>
								<th>性别</th>
								<th v-if="listType == 1">身高</th>
								<th v-if="listType == 1">体重</th>
								<th v-for="(item,index) in staminaName">{{item}}</th>
								<th>评分</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in staminaList" v-if="(listType == 1 && userXuanZe1.indexOf(list[index].SportName)>=0) || (listType == 2 && userXuanZe2.indexOf(list[index].SportName)>=0) || (listType == 2 && userXuanZe3.indexOf(list[index].SportName)>=0)">
								<td>{{item.TestDate}}</td>
								<td>{{list[index].SportName}}</td>
								<td>{{list[index].TrainName}}</td>
								<td>{{list[index].TrainSecName}}</span></td>
								<td>{{list[index].Age}}</td>
								<td>{{list[index].Sex}}</td>
					
					
								<td v-if="listType == 1">{{list[index].Height}}</td>
								<td v-if="listType == 1">{{list[index].Weight}}</td>
								<td v-for="val in item.valueList">{{val}}</td>
								<td>{{list[index].Score}}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	var vm;
	import {
		numUpperLimbScore,
		numLowerLimbScore
	} from './getNum.js';
	import tineng from '../../components/tineng.vue';
	import qugan from '../../components/qugan.vue';
	import bankuai from '../../components/bankuai.vue';
	import {
		sortimg
	} from '../../components/sort.js';
	export default {
		props: ["daochu", "isGetList", "zhuanxiangList", "trainFirse", "trainId", "sportList", "userXuanZe", "sportIndex",
			"sex", "plistType"
		],
		data: function() {
			return {
				sortlist:[
					{
						type:'TestDate',
						is:true,
						sort:true
					},
					{
						type:'SportName',
						is:false,
						sort:false
					},
					{
						type:'Score',
						is:false,
						sort:false
					}
				],
				daochuNum: 1,
				userXuanZe1: [],
				userXuanZe2: [],
				userXuanZe3: [],
				daochuList: [],

				allDaoChu1: ['1'],
				allDaoChuNext1: [],
				allDaoChu2: ['1'],
				allDaoChuNext2: [],
				allDaoChu3: ['1'],
				allDaoChuNext3: [],



				check: [],
				listType: 0,
				isEdit: false,
				isDuibi: false,
				getOnr: {},
				list: [],
				staminaList: [],
				staminaName: [],
				staminaDate: [],
				LeiDaSeries: [],
				peizhi: [{
					is: true,
					name: '左45°'
				}, {
					is: true,
					name: '右45°'
				}, {
					is: true,
					name: '左135°'
				}, {
					is: true,
					name: '右135°'
				}, {
					is: true,
					name: '左90°'
				}, {
					is: true,
					name: '右90°'
				}, {
					is: true,
					name: '0°'
				}, {
					is: true,
					name: '180°'
				}, {
					is: true,
					name: '上肢比值%'
				}, {
					is: true,
					name: '下肢比值%'
				}, {
					is: true,
					name: '左上肢'
				}, {
					is: true,
					name: '右上肢'
				}, {
					is: true,
					name: '左下肢'
				}, {
					is: true,
					name: '右下肢'
				}],
				xuanze: [{
					is: true,
					name: 'BMI'
				}, {
					is: false,
					name: '体脂'
				}, {
					is: true,
					name: '坐位体前屈'
				}, {
					is: true,
					name: '30米冲刺'
				}, {
					is: true,
					name: '垂直纵跳'
				}, {
					is: false,
					name: '深蹲最大力量'
				}, {
					is: true,
					name: '深蹲相对力量'
				}, {
					is: false,
					name: '卧推最大力量'
				}, {
					is: true,
					name: '卧推相对力量'
				}, {
					is: true,
					name: '引体向上'
				}, {
					is: false,
					name: '屈臂悬垂'
				}, {
					is: true,
					name: '腹肌耐力'
				}, {
					is: true,
					name: '背肌耐力'
				}, {
					is: true,
					name: '3000米'
				}, {
					is: false,
					name: '2000米测功仪'
				}, {
					is: false,
					name: 'Yo-Yo'
				}],
				jichuLeiDaHide: {},
				jichuLeiDaAll: {},
				wendingLeiDaHide: {},
				wendingLeiDaAll: {},
				indicator: [],
				sport: undefined,
				showPingFen: true
			}
		},
		components: {
			tiNeng: tineng,
			quGan: qugan,
			banKuai: bankuai
		},
		watch: {
			showPingFen: function() {
				window.setTimeout(function() {
					vm.getinfo()
				}, 1000)
			},
			isGetList: function(newVal, oldVal) {
				vm.sport = vm.sportIndex;
				vm.getinfo()
			},
			listType: function(newVal, oldVal) {
				if (newVal == 2) {
					vm.isEdit = false
				}
				vm.getinfo()
			},
			allDaoChu1: function(newVal, oldVal) {
				if (newVal.length > 0) {
					vm.userXuanZe1 = [...vm.sportList]
				} else {
					vm.userXuanZe1 = [];
				}
			},
			allDaoChuNext1: function(newVal, oldVal) {
				if (newVal.length > 0) {
					vm.daochuList[0] = ["BMI", "tizhi", "zuowei", "sanshi", "chuizhi", "shendunzui", "shendunxiang", "wotuizui",
						"wotuixiang", "yinti",
						"qubi", "fuji", "beiji", "sanqian", "liangqian", "yoyo", "pingfen"
					];
				} else {
					vm.daochuList[0] = [];
				}
			},
			allDaoChu2: function(newVal, oldVal) {
				if (newVal.length > 0) {
					vm.userXuanZe2 = [...vm.sportList]
				} else {
					vm.userXuanZe2 = [];
				}
			},
			allDaoChuNext2: function(newVal, oldVal) {
				if (newVal.length > 0) {
					vm.daochuList[1] = ["shijian", "jvli", "xinlv", "zuida", "bashi", "pingfen"];
				} else {
					vm.daochuList[1] = [];
				}
			},
			allDaoChu3: function(newVal, oldVal) {
				if (newVal.length > 0) {
					vm.userXuanZe3 = [...vm.sportList]
				} else {
					vm.userXuanZe3 = [];
				}
			},
			allDaoChuNext3: function(newVal, oldVal) {
				if (newVal.length > 0) {
					vm.daochuList[2] = ["left45", "right45", "left135", "right135", "left90", "right90", "ling", "yibaling",
						"shangbai", "xiabai", "leftshang", "rightshang", "leftxia", "rightxia", "pingfen"
					];
				} else {
					vm.daochuList[2] = [];
				}
			}
		},
		computed: {},
		methods: {
			start: function() {
				myPublic.tableHeader(".table-box");
				window.bus.$on('pingfen', function(val) {
					vm.showPingFen = val;
				});
				// var _l = vm.userXuanZe;
				vm.userXuanZe1 = [...vm.userXuanZe];
				vm.userXuanZe2 = [...vm.userXuanZe];
				vm.userXuanZe3 = [...vm.userXuanZe];
				vm.listType = vm.plistType;
				vm.sport = vm.sportIndex;
				vm.getinfo()
			},
			sort: function(res){
				return sortimg(res,vm.sortlist);
			},
			sortbut: function(res) {
				var l = [...vm.sortlist];
				for (var i = 0; i < l.length; i++) {
					l[i].is = false;
					if (res == l[i].type) {
						l[i].is = true;
						l[i].sort = !l[i].sort;
					}
				}
				vm.sortlist = l;
				vm.getinfo();
			},
			mytableExcel: function(id) {
				myPublic.tableExcel(id);
			},
			closeDaochu: function() {
				window.bus.$emit('daochu', false)
			},
			duibi: function() {
				vm.isDuibi = !vm.isDuibi;
				vm.$nextTick(function() {
					document.getElementById('ditu').setAttribute("_echarts_instance_", "");
					document.getElementById('ditu').innerHTML = '';
					var myChart = echarts.init(document.getElementById('ditu'));
					var _indicator = [];
					if (vm.listType == 1) {
						if (vm.xuanze[0].is) {
							_indicator.push({
								name: 'BMI',
								max: 10
							})
						}
						if (vm.xuanze[1].is) {
							_indicator.push({
								name: '体脂',
								max: 10
							})
						}
						if (vm.xuanze[2].is) {
							_indicator.push({
								name: '坐位体前屈',
								max: 10
							})
						}
						if (vm.xuanze[3].is) {
							_indicator.push({
								name: '30米冲刺',
								max: 10
							})
						}
						if (vm.xuanze[4].is) {
							_indicator.push({
								name: '垂直纵跳',
								max: 10
							})
						}
						if (vm.xuanze[5].is) {
							_indicator.push({
								name: '深蹲最大力量',
								max: 10
							})
						}
						if (vm.xuanze[6].is) {
							_indicator.push({
								name: '深蹲相对力量',
								max: 10
							})
						}
						if (vm.xuanze[7].is) {
							_indicator.push({
								name: '卧推最大力量',
								max: 10
							})
						}
						if (vm.xuanze[8].is) {
							_indicator.push({
								name: '卧推相对力量',
								max: 10
							})
						}
						if (vm.xuanze[9].is) {
							_indicator.push({
								name: '引体向上',
								max: 10
							})
						}
						if (vm.xuanze[10].is) {
							_indicator.push({
								name: '屈臂悬垂',
								max: 10
							})
						}
						if (vm.xuanze[11].is) {
							_indicator.push({
								name: '腹肌耐力',
								max: 10
							})
						}
						if (vm.xuanze[12].is) {
							_indicator.push({
								name: '背肌耐力',
								max: 10
							})
						}
						if (vm.xuanze[13].is) {
							_indicator.push({
								name: '3000米',
								max: 10
							})
						}
						if (vm.xuanze[14].is) {
							_indicator.push({
								name: '2000米测功仪',
								max: 10
							})
						}
						if (vm.xuanze[15].is) {
							_indicator.push({
								name: 'Yo-Yo',
								max: 10
							})
						}
					} else if (vm.listType == 3) {
						if (vm.peizhi[0].is) {
							_indicator.push({
								name: '左45°', //BMI Score
								max: 10
							});
						}
						if (vm.peizhi[1].is) {
							_indicator.push({
								name: '右45°', //Sit Forward Score
								max: 10
							});
						}
						if (vm.peizhi[2].is) {
							_indicator.push({
								name: '左135°', //ThirtyMeterDashScore
								max: 10
							});
						}
						if (vm.peizhi[3].is) {
							_indicator.push({
								name: '右135°', //VerticalJumpScore
								max: 10
							});
						}
						if (vm.peizhi[4].is) {
							_indicator.push({
								name: '左90°', //Relative Squat Max Strength Score
								max: 10
							});
						}
						if (vm.peizhi[5].is) {
							_indicator.push({
								name: '右90°', //Relative Lying Push Max Strength Score
								max: 10
							});
						}
						if (vm.peizhi[6].is) {
							_indicator.push({
								name: '0°', //Pull Up Score
								max: 10
							});
						}
						if (vm.peizhi[7].is) {
							_indicator.push({
								name: '180°', //Abdominal Endurance Score
								max: 10
							});
						}
						if (vm.peizhi[8].is) {
							_indicator.push({
								name: '上肢比值%', //Back Muscle Endurance Score
								max: 5
							});
						}
						if (vm.peizhi[9].is) {
							_indicator.push({
								name: '下肢比值%', //Three Km Score
								max: 5
							});
						}
						if (vm.peizhi[10].is) {
							_indicator.push({
								name: '左上肢', //Three Km Score
								max: 5
							});
						}
						if (vm.peizhi[11].is) {
							_indicator.push({
								name: '右上肢', //Three Km Score
								max: 5
							});
						}
						if (vm.peizhi[12].is) {
							_indicator.push({
								name: '左下肢', //Three Km Score
								max: 5
							});
						}
						if (vm.peizhi[13].is) {
							_indicator.push({
								name: '右下肢', //Three Km Score
								max: 5
							});
						}
					}
					var _seriesData = [];
					var _legend = []

					for (var i = 0; i < vm.check.length; i++) {
						_seriesData.push({
							value: vm.staminaList[vm.check[i]].scoreList,
							name: vm.staminaList[vm.check[i]].TestDate + '-' + vm.list[vm.check[i]].SportName + '-' + vm.list[vm.check[
								i]].TrainName
						})
						_legend.push(vm.staminaList[vm.check[i]].TestDate + '-' + vm.list[vm.check[i]].SportName + '-' + vm.list[vm.check[
							i]].TrainName);
					}

					var option = {
						tooltip: {},
						legend: {
							data: _legend,
							orient: 'vertical',
							right: 10,
							top: 'center'
						},
						radar: {
							name: {
								textStyle: {
									color: '#fff',
									backgroundColor: '#ba2538',
									borderRadius: 3,
									padding: [3, 5]
								}
							},
							center: ['40%', '50%'],
							indicator: _indicator
						},
						series: [{
							name: '预算 vs 开销（Budget vs spending）',
							type: 'radar',
							data: _seriesData
						}]
					};
					myChart.setOption(option)
				})
			},
			setXuanze: function(index) {
				if (vm.listType == 1) {
					vm.xuanze[index].is = !vm.xuanze[index].is
				}
				if (vm.listType == 3) {
					vm.peizhi[index].is = !vm.peizhi[index].is
				}
				vm.getinfo()
			},
			getinfo: function() {
				if (vm.listType == 1) {
					vm.getLeiDaHide().then(() => {
						vm.getLeiDaAll().then(() => {
							vm.getList()
						})
					})
				}
				if (vm.listType == 2) {
					vm.getList()
				}
				if (vm.listType == 3) {
					vm.getLeiDaHide().then(() => {
						vm.getLeiDaAll().then(() => {
							vm.getList()
						})
					})
				}
			},
			getLeiDaHide: function() {
				return new Promise(function(resolve, reject) {
					if (vm.listType == 1) {
						vm.$http.post(myPublic.publicUrl + '/API/Test/BasicPhysicalTop?sex=' + vm.sex, {}).then(function(result) {
							if (result.body.StateCode == 0) {
								var _j = {};
								if (vm.xuanze[0].is) {
									_j.BMIScore = result.body.Data.BMIScore
								}
								if (vm.xuanze[1].is) {
									_j.BodyFatScore = result.body.Data.BodyFatScore
								}
								if (vm.xuanze[2].is) {
									_j.SitForwardScore = result.body.Data.SitForwardScore
								}
								if (vm.xuanze[3].is) {
									_j.ThirtyMeterDashScore = result.body.Data.ThirtyMeterDashScore
								}
								if (vm.xuanze[4].is) {
									_j.VerticalJumpScore = result.body.Data.VerticalJumpScore
								}
								if (vm.xuanze[6].is) {
									_j.RelativeSquatMaxStrengthScore = result.body.Data.RelativeSquatMaxStrengthScore
								}
								if (vm.xuanze[8].is) {
									_j.RelativeLyingPushMaxStrengthScore = result.body.Data.RelativeLyingPushMaxStrengthScore
								}
								if (vm.xuanze[9].is) {
									_j.PullUpScore = result.body.Data.PullUpScore
								}
								if (vm.xuanze[11].is) {
									_j.AbdominalEnduranceScore = result.body.Data.AbdominalEnduranceScore
								}
								if (vm.xuanze[12].is) {
									_j.BackMuscleEnduranceScore = result.body.Data.BackMuscleEnduranceScore
								}
								if (vm.xuanze[13].is) {
									_j.ThreeKmScore = result.body.Data.ThreeKmScore
								}
								vm.jichuLeiDaHide = _j;
								resolve()
							}
						}).catch(function(error) {
							if (error.status == 500) {
								var _j = {};
								if (vm.xuanze[0].is) {
									_j.BMIScore = 0
								}
								if (vm.xuanze[1].is) {
									_j.BodyFatScore = 0
								}
								if (vm.xuanze[2].is) {
									_j.SitForwardScore = 0
								}
								if (vm.xuanze[3].is) {
									_j.ThirtyMeterDashScore = 0
								}
								if (vm.xuanze[4].is) {
									_j.VerticalJumpScore = 0
								}
								if (vm.xuanze[6].is) {
									_j.RelativeSquatMaxStrengthScore = 0
								}
								if (vm.xuanze[8].is) {
									_j.RelativeLyingPushMaxStrengthScore = 0
								}
								if (vm.xuanze[9].is) {
									_j.PullUpScore = 0
								}
								if (vm.xuanze[11].is) {
									_j.AbdominalEnduranceScore = 0
								}
								if (vm.xuanze[12].is) {
									_j.BackMuscleEnduranceScore = 0
								}
								if (vm.xuanze[13].is) {
									_j.ThreeKmScore = 0
								}
								vm.jichuLeiDaHide = _j;
								resolve()
							}
						})
					}
					if (vm.listType == 3) {
						vm.$http.post(myPublic.publicUrl + '/API/Test/TrunkTop?sex=' + vm.sex, {}).then(function(result) {
							if (result.body.StateCode == 0) {
								var _j = {};
								if (vm.peizhi[0].is) {
									_j.Left45Score = result.body.Data.Left45Score
								}
								if (vm.peizhi[1].is) {
									_j.Right45Score = result.body.Data.Right45Score
								}
								if (vm.peizhi[2].is) {
									_j.Left135Score = result.body.Data.Left135Score
								}
								if (vm.peizhi[3].is) {
									_j.Right135Score = result.body.Data.Right135Score
								}
								if (vm.peizhi[4].is) {
									_j.Left90Score = result.body.Data.Left90Score
								}
								if (vm.peizhi[5].is) {
									_j.Right90Score = result.body.Data.Right90Score
								}
								if (vm.peizhi[6].is) {
									_j.ZeroScore = result.body.Data.ZeroScore
								}
								if (vm.peizhi[7].is) {
									_j.OneHundredEightyScore = result.body.Data.OneHundredEightyScore
								}
								if (vm.peizhi[8].is) {
									_j.UpperLimbRatioScore = result.body.Data.UpperLimbRatioScore
								}
								if (vm.peizhi[9].is) {
									_j.LowerLimbRatioScore = result.body.Data.LowerLimbRatioScore
								}
								if (vm.peizhi[10].is || vm.peizhi[11].is) {
									_j.UpperLimbScore = result.body.Data.UpperLimbScore
								}
								if (vm.peizhi[12].is || vm.peizhi[13].is) {
									_j.LowerLimbScore = result.body.Data.LowerLimbScore
								}
								vm.wendingLeiDaHide = _j;
								resolve()
							}
						}).catch(function(error) {
							if (error.status == 500) {
								var _j = {};
								if (vm.peizhi[0].is) {
									_j.Left45Score = 0
								}
								if (vm.peizhi[1].is) {
									_j.Right45Score = 0
								}
								if (vm.peizhi[2].is) {
									_j.Left135Score = 0
								}
								if (vm.peizhi[3].is) {
									_j.Right135Score = 0
								}
								if (vm.peizhi[4].is) {
									_j.Left90Score = 0
								}
								if (vm.peizhi[5].is) {
									_j.Right90Score = 0
								}
								if (vm.peizhi[6].is) {
									_j.ZeroScore = 0
								}
								if (vm.peizhi[7].is) {
									_j.OneHundredEightyScore = 0
								}
								if (vm.peizhi[8].is) {
									_j.UpperLimbRatioScore = 0
								}
								if (vm.peizhi[9].is) {
									_j.LowerLimbRatioScore = 0
								}
								if (vm.peizhi[10].is || vm.peizhi[11].is) {
									_j.UpperLimbScore = 0
								}
								if (vm.peizhi[12].is || vm.peizhi[13].is) {
									_j.LowerLimbScore = 0
								}
								vm.wendingLeiDaHide = _j;
								resolve()
							}
							console.log(error)
						})
					}
				})
			},
			getLeiDaAll: function() {
				return new Promise(function(resolve, reject) {
					if (vm.listType == 1) {
						vm.$http.post(myPublic.publicUrl + '/API/Test/BasicPhysicalAverage?trainId=' + vm.trainId + '&sex=' + vm.sex, {})
							.then(function(result) {
								if (result.body.StateCode == 0) {
									var _j = {};
									if (vm.xuanze[0].is) {
										_j.BMIScore = result.body.Data.BMIScore
									}
									if (vm.xuanze[1].is) {
										_j.BodyFatScore = result.body.Data.BodyFatScore
									}
									if (vm.xuanze[2].is) {
										_j.SitForwardScore = result.body.Data.SitForwardScore
									}
									if (vm.xuanze[3].is) {
										_j.ThirtyMeterDashScore = result.body.Data.ThirtyMeterDashScore
									}
									if (vm.xuanze[4].is) {
										_j.VerticalJumpScore = result.body.Data.VerticalJumpScore
									}
									if (vm.xuanze[6].is) {
										_j.RelativeSquatMaxStrengthScore = result.body.Data.RelativeSquatMaxStrengthScore
									}
									if (vm.xuanze[8].is) {
										_j.RelativeLyingPushMaxStrengthScore = result.body.Data.RelativeLyingPushMaxStrengthScore
									}
									if (vm.xuanze[9].is) {
										_j.PullUpScore = result.body.Data.PullUpScore
									}
									if (vm.xuanze[11].is) {
										_j.AbdominalEnduranceScore = result.body.Data.AbdominalEnduranceScore
									}
									if (vm.xuanze[12].is) {
										_j.BackMuscleEnduranceScore = result.body.Data.BackMuscleEnduranceScore
									}
									if (vm.xuanze[13].is) {
										_j.ThreeKmScore = result.body.Data.ThreeKmScore
									}
									vm.jichuLeiDaAll = _j;
									resolve()
								}
							}).catch(function(error) {
								if (error.status == 500) {
									var _j = {};
									if (vm.xuanze[0].is) {
										_j.BMIScore = 0
									}
									if (vm.xuanze[2].is) {
										_j.BodyFatScore = 0
									}
									if (vm.xuanze[2].is) {
										_j.SitForwardScore = 0
									}
									if (vm.xuanze[3].is) {
										_j.ThirtyMeterDashScore = 0
									}
									if (vm.xuanze[4].is) {
										_j.VerticalJumpScore = 0
									}
									if (vm.xuanze[6].is) {
										_j.RelativeSquatMaxStrengthScore = 0
									}
									if (vm.xuanze[8].is) {
										_j.RelativeLyingPushMaxStrengthScore = 0
									}
									if (vm.xuanze[9].is) {
										_j.PullUpScore = 0
									}
									if (vm.xuanze[11].is) {
										_j.AbdominalEnduranceScore = 0
									}
									if (vm.xuanze[12].is) {
										_j.BackMuscleEnduranceScore = 0
									}
									if (vm.xuanze[13].is) {
										_j.ThreeKmScore = 0
									}
									vm.jichuLeiDaAll = _j;
									resolve()
								}
								console.log(error)
							})
					}
					if (vm.listType == 3) {
						vm.$http.post(myPublic.publicUrl + '/API/Test/TrunkAverage?trainId=' + (vm.trainFirse !== '' ? vm.zhuanxiangList[
							vm.trainFirse].Id : "") + '&sex=' + vm.sex, {}).then(function(result) {
							if (result.body.StateCode == 0) {
								var _j = {};
								if (vm.peizhi[0].is) {
									_j.Left45Score = result.body.Data.Left45Score
								}
								if (vm.peizhi[1].is) {
									_j.Right45Score = result.body.Data.Right45Score
								}
								if (vm.peizhi[2].is) {
									_j.Left135Score = result.body.Data.Left135Score
								}
								if (vm.peizhi[3].is) {
									_j.Right135Score = result.body.Data.Right135Score
								}
								if (vm.peizhi[4].is) {
									_j.Left90Score = result.body.Data.Left90Score
								}
								if (vm.peizhi[5].is) {
									_j.Right90Score = result.body.Data.Right90Score
								}
								if (vm.peizhi[6].is) {
									_j.ZeroScore = result.body.Data.ZeroScore
								}
								if (vm.peizhi[7].is) {
									_j.OneHundredEightyScore = result.body.Data.OneHundredEightyScore
								}
								if (vm.peizhi[8].is) {
									_j.UpperLimbRatioScore = result.body.Data.UpperLimbRatioScore
								}
								if (vm.peizhi[9].is) {
									_j.LowerLimbRatioScore = result.body.Data.LowerLimbRatioScore
								}
								if (vm.peizhi[10].is || vm.peizhi[11].is) {
									_j.UpperLimbScore = result.body.Data.UpperLimbScore
								}
								if (vm.peizhi[12].is || vm.peizhi[13].is) {
									_j.LowerLimbScore = result.body.Data.LowerLimbScore
								}
								vm.wendingLeiDaAll = _j;
								resolve()
							}
						}).catch(function(error) {
							if (error.status == 500) {
								var _j = {};
								if (vm.peizhi[0].is) {
									_j.Left45Score = 0
								}
								if (vm.peizhi[1].is) {
									_j.Right45Score = 0
								}
								if (vm.peizhi[2].is) {
									_j.Left135Score = 0
								}
								if (vm.peizhi[3].is) {
									_j.Right135Score = 0
								}
								if (vm.peizhi[4].is) {
									_j.Left90Score = 0
								}
								if (vm.peizhi[5].is) {
									_j.Right90Score = 0
								}
								if (vm.peizhi[6].is) {
									_j.ZeroScore = 0
								}
								if (vm.peizhi[7].is) {
									_j.OneHundredEightyScore = 0
								}
								if (vm.peizhi[8].is) {
									_j.UpperLimbRatioScore = 0
								}
								if (vm.peizhi[9].is) {
									_j.LowerLimbRatioScore = 0
								}
								if (vm.peizhi[10].is || vm.peizhi[11].is) {
									_j.UpperLimbScore = 0
								}
								if (vm.peizhi[12].is || vm.peizhi[13].is) {
									_j.LowerLimbScore = 0
								}
								vm.wendingLeiDaAll = _j;
								resolve()
							}
							console.log(error)
						})
					}
				})
			},
			getList: function() {
				if (vm.listType == 1) {
					if (vm.sport !== '') {
						vm.getLeiDa1()
					}
					vm.getList1()
				} else if (vm.listType == 2) {
					vm.getList2()
				} else if (vm.listType == 3) {
					if (vm.sport !== '') {
						vm.getLeiDa3()
					}
					vm.getList3()
				}
			},
			getList1: function() {
				var _d = '';
				_d += 'trainId=' + (vm.trainFirse !== '' ? vm.zhuanxiangList[vm.trainFirse].Id : "");
				_d += '&trainSecId=' + vm.trainId;
				_d += '&sex=' + vm.sex;
				_d += '&sportuserid=' + (vm.sport === '' ? '' : vm.sportList[vm.sport].UserId);
				_d += '&starttime=' + document.getElementById('starttime').value + '&endtime=' + document.getElementById('endtime')
					.value + '&sort=' + '&pagesize=9999&pageindex=1';
				vm.$http.get(myPublic.publicUrl + '/API/Test/GetAllBasicPhysicalData?' + _d, {
					headers: {
						token: window.localStorage.getItem('Sport_Access_Token')
					}
				}).then(function(result) {
					if (result.body.StateCode == 0) {
						vm.list = result.body.Data ? result.body.Data : [];
						var _staminaDate = [];
						var _staminaList = [];
						var _staminaName = [];
						if (vm.xuanze[0].is) {
							_staminaName.push('BMI')
						}
						if (vm.xuanze[1].is) {
							_staminaName.push('体脂')
						}
						if (vm.xuanze[2].is) {
							_staminaName.push('坐位体前屈')
						}
						if (vm.xuanze[3].is) {
							_staminaName.push('30米冲刺')
						}
						if (vm.xuanze[4].is) {
							_staminaName.push('垂直纵跳')
						}
						if (vm.xuanze[5].is) {
							_staminaName.push('深蹲最大力量')
						}
						if (vm.xuanze[6].is) {
							_staminaName.push('深蹲相对力量')
						}
						if (vm.xuanze[7].is) {
							_staminaName.push('卧推最大力量')
						}
						if (vm.xuanze[8].is) {
							_staminaName.push('卧推相对力量')
						}
						if (vm.xuanze[9].is) {
							_staminaName.push('引体向上')
						}
						if (vm.xuanze[10].is) {
							_staminaName.push('屈臂悬垂')
						}
						if (vm.xuanze[11].is) {
							_staminaName.push('腹肌耐力')
						}
						if (vm.xuanze[12].is) {
							_staminaName.push('背肌耐力')
						}
						if (vm.xuanze[13].is) {
							_staminaName.push('3000米')
						}
						if (vm.xuanze[14].is) {
							_staminaName.push('2000米测功仪')
						}
						if (vm.xuanze[15].is) {
							_staminaName.push('Yo-Yo')
						}
						if (result.body.Data) {
							var valueList;
							var scoreList;
							for (var i = 0; i < result.body.Data.length; i += 1) {
								_staminaDate.push(result.body.Data[i].Testdate);
								valueList = [];
								scoreList = [];
								if (vm.xuanze[0].is) {
									valueList.push(result.body.Data[i].BMI);
									scoreList.push(result.body.Data[i].BMIScore);
								}
								if (vm.xuanze[1].is) {
									valueList.push(result.body.Data[i].BodyFat);
									scoreList.push(result.body.Data[i].BodyFatScore);
								}
								if (vm.xuanze[2].is) {
									valueList.push(result.body.Data[i].SitForward);
									scoreList.push(result.body.Data[i].SitForwardScore);
								}
								if (vm.xuanze[3].is) {
									valueList.push(result.body.Data[i].ThirtyMeterDash);
									scoreList.push(result.body.Data[i].ThirtyMeterDashScore);
								}
								if (vm.xuanze[4].is) {
									valueList.push(result.body.Data[i].VerticalJump);
									scoreList.push(result.body.Data[i].VerticalJumpScore);
								}
								if (vm.xuanze[5].is) {
									valueList.push(result.body.Data[i].SquatMaxStrength);
									scoreList.push(0);
								}
								if (vm.xuanze[6].is) {
									valueList.push(result.body.Data[i].RelativeSquatMaxStrength);
									scoreList.push(result.body.Data[i].RelativeSquatMaxStrengthScore);
								}
								if (vm.xuanze[7].is) {
									valueList.push(result.body.Data[i].LyingPushMaxStrength);
									scoreList.push(0);
								}
								if (vm.xuanze[8].is) {
									valueList.push(result.body.Data[i].RelativeLyingPushMaxStrength);
									scoreList.push(result.body.Data[i].RelativeLyingPushMaxStrengthScore);
								}
								if (vm.xuanze[9].is) {
									valueList.push(result.body.Data[i].PullUp);
									scoreList.push(result.body.Data[i].PullUpScore);
								}
								if (vm.xuanze[10].is) {
									valueList.push(result.body.Data[i].CantileverSuspension);
									scoreList.push(0);
								}
								if (vm.xuanze[11].is) {
									valueList.push(result.body.Data[i].AbdominalEndurance);
									scoreList.push(result.body.Data[i].AbdominalEnduranceScore);
								}
								if (vm.xuanze[12].is) {
									valueList.push(result.body.Data[i].BackMuscleEndurance);
									scoreList.push(result.body.Data[i].BackMuscleEnduranceScore);
								}
								if (vm.xuanze[13].is) {
									valueList.push(result.body.Data[i].ThreeKm);
									scoreList.push(result.body.Data[i].ThreeKmScore);
								}
								if (vm.xuanze[14].is) {
									valueList.push(result.body.Data[i].TwoKmDynamometer);
									scoreList.push(result.body.Data[i].TwoKmDynamometerScore);
								}
								if (vm.xuanze[15].is) {
									valueList.push(result.body.Data[i].YoyoTest)
									scoreList.push(0);
								}
								_staminaList.push({
									TestDate: result.body.Data[i].Testdate,
									valueList: valueList,
									scoreList: scoreList
								})
							}
						}
						vm.staminaName = _staminaName;
						vm.staminaDate = _staminaDate;
						vm.staminaList = _staminaList;
						vm.$nextTick(function() {
							vm.setBiaoAxis(myPublic.copys(vm.staminaDate), myPublic.copys(vm.staminaList))
						})
					} else {
						vm.$router.push({
							path: '/login'
						})
					}
				}).catch(function(error) {
					console.log(error)
				})
			},
			getList2: function() {
				var _d = '';
				_d += 'trainId=' + (vm.trainFirse !== '' ? vm.zhuanxiangList[vm.trainFirse].Id : "");
				_d += '&trainSecId=' + vm.trainId;
				_d += '&sex=' + vm.sex;
				_d += '&sportuserid=' + (vm.sport === '' ? '' : vm.sportList[vm.sport].UserId);
				_d += '&starttime=' + document.getElementById('starttime').value + '&endtime=' + document.getElementById('endtime')
					.value + '&sort=' + '&pagesize=9999&pageindex=1';
				vm.$http.get(myPublic.publicUrl + '/API/Test/GetAllPlateFitnessData?' + _d, {
					headers: {
						token: window.localStorage.getItem('Sport_Access_Token')
					}
				}).then(function(result) {
					if (result.body.StateCode == 0) {
						var _staminaName = ['攀爬时间', '攀爬距离', '平均心率', '最大心率', '80%以上最大心率保持'];
						var _staminaDate = [];
						var _staminaList = [];
						vm.list = result.body.Data ? result.body.Data : [];
						if (result.body.Data) {
							for (var i = 0; i < result.body.Data.length; i += 1) {
								_staminaDate.push(result.body.Data[i].Testdate);
								_staminaList.push({
									TestDate: result.body.Data[i].Testdate,
									valueList: [result.body.Data[i].ClimbingTime, result.body.Data[i].ClimbingDistance, result.body.Data[i].MeanHeartRate,
										result.body.Data[i].MaxHeartRate, result.body.Data[i].MaxHeartRateHoldTime
									]
								})
							}
						}
						vm.staminaName = _staminaName;
						vm.staminaDate = _staminaDate;
						vm.staminaList = _staminaList;
						vm.$nextTick(function() {
							vm.setBiaoAxis(myPublic.copys(vm.staminaDate), myPublic.copys(vm.staminaList))
						})
					} else {
						vm.$router.push({
							path: '/login'
						})
					}
				}).catch(function(error) {
					console.log(error)
				})
			},
			getList3: function() {
				var _d = '';
				_d += 'trainId=' + (vm.trainFirse !== '' ? vm.zhuanxiangList[vm.trainFirse].Id : "");
				_d += '&trainSecId=' + vm.trainId;
				_d += '&sex=' + vm.sex;
				_d += '&sportuserid=' + (vm.sport === '' ? '' : vm.sportList[vm.sport].UserId);
				_d += '&starttime=' + document.getElementById('starttime').value + '&endtime=' + document.getElementById('endtime')
					.value + '&sort=' + '&pagesize=9999&pageindex=1';
				vm.$http.get(myPublic.publicUrl + '/API/Test/GetAllTrunkStabilityBalance?' + _d, {
					headers: {
						token: window.localStorage.getItem('Sport_Access_Token')
					}
				}).then(function(result) {
					if (result.body.StateCode == 0) {
						var _staminaName = [];
						var _staminaDate = [];
						var _staminaList = [];
						if (vm.peizhi[0].is) {
							_staminaName.push('左45°')
						}
						if (vm.peizhi[1].is) {
							_staminaName.push('右45°')
						}
						if (vm.peizhi[2].is) {
							_staminaName.push('左135°')
						}
						if (vm.peizhi[3].is) {
							_staminaName.push('右135°')
						}
						if (vm.peizhi[4].is) {
							_staminaName.push('左90°')
						}
						if (vm.peizhi[5].is) {
							_staminaName.push('右90°')
						}
						if (vm.peizhi[6].is) {
							_staminaName.push('0°')
						}
						if (vm.peizhi[7].is) {
							_staminaName.push('180°')
						}
						if (vm.peizhi[8].is) {
							_staminaName.push('上肢比值%')
						}
						if (vm.peizhi[9].is) {
							_staminaName.push('下肢比值%')
						}
						if (vm.peizhi[10].is) {
							_staminaName.push('左上肢')
						}
						if (vm.peizhi[11].is) {
							_staminaName.push('右上肢')
						}
						if (vm.peizhi[12].is) {
							_staminaName.push('左下肢')
						}
						if (vm.peizhi[13].is) {
							_staminaName.push('右下肢')
						}
						if (result.body.Data) {
							vm.list = result.body.Data ? result.body.Data : [];
							var valueList;
							var scoreList;
							for (var i = 0; i < result.body.Data.length; i += 1) {
								valueList = [];
								scoreList = [];
								_staminaDate.push(result.body.Data[i].Testdate);
								if (vm.peizhi[0].is) {
									valueList.push(result.body.Data[i].Left45);
									scoreList.push(result.body.Data[i].Left45Score);
								}
								if (vm.peizhi[1].is) {
									valueList.push(result.body.Data[i].Right45);
									scoreList.push(result.body.Data[i].Right45Score);
								}
								if (vm.peizhi[2].is) {
									valueList.push(result.body.Data[i].Left135);
									scoreList.push(result.body.Data[i].Left135Score);
								}
								if (vm.peizhi[3].is) {
									valueList.push(result.body.Data[i].Right135);
									scoreList.push(result.body.Data[i].Right135Score);
								}
								if (vm.peizhi[4].is) {
									valueList.push(result.body.Data[i].Left90);
									scoreList.push(result.body.Data[i].Left90Score);
								}
								if (vm.peizhi[5].is) {
									valueList.push(result.body.Data[i].Right90);
									scoreList.push(result.body.Data[i].Right90Score);
								}
								if (vm.peizhi[6].is) {
									valueList.push(result.body.Data[i].Zero);
									scoreList.push(result.body.Data[i].ZeroScore);
								}
								if (vm.peizhi[7].is) {
									valueList.push(result.body.Data[i].OneHundredEighty);
									scoreList.push(result.body.Data[i].OneHundredEightyScore);
								}
								if (vm.peizhi[8].is) {
									valueList.push(result.body.Data[i].UpperLimbRatio);
									scoreList.push(result.body.Data[i].UpperLimbRatioScore);
								}
								if (vm.peizhi[9].is) {
									valueList.push(result.body.Data[i].LowerLimbRatio);
									scoreList.push(result.body.Data[i].LowerLimbRatioScore);
								}
								if (vm.peizhi[10].is) {
									valueList.push(result.body.Data[i].LeftUpperLimb);
									scoreList.push(numUpperLimbScore(result.body.Data[i].LeftUpperLimb, result.body.Data[i].Sex));
								}
								if (vm.peizhi[11].is) {
									valueList.push(result.body.Data[i].RightUpperLimb);
									scoreList.push(numUpperLimbScore(result.body.Data[i].RightUpperLimb, result.body.Data[i].Sex));
								}
								if (vm.peizhi[12].is) {
									valueList.push(result.body.Data[i].LeftLowerLimb);
									scoreList.push(numLowerLimbScore(result.body.Data[i].LeftLowerLimb, result.body.Data[i].Sex));
								}
								if (vm.peizhi[13].is) {
									valueList.push(result.body.Data[i].RightLowerLimb);
									scoreList.push(numLowerLimbScore(result.body.Data[i].RightLowerLimb, result.body.Data[i].Sex));
								}
								_staminaList.push({
									TestDate: result.body.Data[i].Testdate,
									valueList: valueList,
									scoreList: scoreList
								})
							}
						}
						vm.staminaName = _staminaName;
						vm.staminaDate = _staminaDate;
						vm.staminaList = _staminaList;
						vm.$nextTick(function() {
							vm.setBiaoAxis(myPublic.copys(vm.staminaDate), myPublic.copys(vm.staminaList))
						})
					} else {
						vm.$router.push({
							path: '/login'
						})
					}
				}).catch(function(error) {
					console.log(error)
				})
			},
			setBiaoAxis: function(_dateList, _list) {
				try {
					var _series = [];
					var _val = [];
					for (var i = 0; i < vm.staminaName.length; i += 1) {
						_val = [];
						for (var j = 0; j < _dateList.length; j += 1) {
							_val.push(_list[j].valueList[i])
						}
						_series.push({
							name: vm.staminaName[i],
							type: 'line',
							data: _val
						})
					}
					document.getElementById('biao1').setAttribute("_echarts_instance_", "");
					document.getElementById('biao1').innerHTML = '';
					var myChart = echarts.init(document.getElementById('biao1'));
					var option = {
						tooltip: {
							trigger: 'axis',
							axisPointer: {
								type: 'shadow'
							}
						},
						legend: {
							data: vm.staminaName
						},
						grid: {
							left: '10px',
							right: '50px',
							bottom: '10px',
							containLabel: true
						},
						xAxis: {
							type: 'category',
							boundaryGap: false,
							data: _dateList
						},
						yAxis: {
							type: 'value',
							axisLabel: {
								formatter: '{value}'
							}
						},
						series: _series
					};
					myChart.setOption(option)
				} catch (e) {}
			},
			getLeiDa1: function() {
				var _indicator = [];
				if (vm.xuanze[0].is) {
					_indicator.push({
						name: 'BMI',
						max: 10
					})
				}
				if (vm.xuanze[2].is) {
					_indicator.push({
						name: '坐位体前屈',
						max: 10
					})
				}
				if (vm.xuanze[3].is) {
					_indicator.push({
						name: '30米冲刺',
						max: 10
					})
				}
				if (vm.xuanze[4].is) {
					_indicator.push({
						name: '垂直纵跳',
						max: 10
					})
				}
				if (vm.xuanze[6].is) {
					_indicator.push({
						name: '深蹲相对力量',
						max: 10
					})
				}
				if (vm.xuanze[8].is) {
					_indicator.push({
						name: '卧推相对力量',
						max: 10
					})
				}
				if (vm.xuanze[9].is) {
					_indicator.push({
						name: '引体向上',
						max: 10
					})
				}
				if (vm.xuanze[11].is) {
					_indicator.push({
						name: '腹肌耐力',
						max: 10
					})
				}
				if (vm.xuanze[12].is) {
					_indicator.push({
						name: '背肌耐力',
						max: 10
					})
				}
				if (vm.xuanze[13].is) {
					_indicator.push({
						name: '3000米',
						max: 10
					})
				}
				vm.indicator = _indicator;

				function api() {
					return new Promise(function(resolve, reject) {
						var _d = '';
						_d += 'sportuserid=' + (vm.sport !== '' ? vm.sportList[vm.sport].UserId : '');
						var _data = {};
						if (vm.xuanze[0].is) {
							_data.BMIScore = 0
						}
						if (vm.xuanze[1].is) {
							_data.BodyFatScore = 0
						}
						if (vm.xuanze[2].is) {
							_data.SitForwardScore = 0
						}
						if (vm.xuanze[3].is) {
							_data.ThirtyMeterDashScore = 0
						}
						if (vm.xuanze[4].is) {
							_data.VerticalJumpScore = 0
						}
						if (vm.xuanze[6].is) {
							_data.RelativeSquatMaxStrengthScore = 0
						}
						if (vm.xuanze[8].is) {
							_data.RelativeLyingPushMaxStrengthScore = 0
						}
						if (vm.xuanze[9].is) {
							_data.PullUpScore = 0
						}
						if (vm.xuanze[11].is) {
							_data.AbdominalEnduranceScore = 0
						}
						if (vm.xuanze[12].is) {
							_data.BackMuscleEnduranceScore = 0
						}
						if (vm.xuanze[13].is) {
							_data.ThreeKmScore = 0
						}
						vm.$http.post(myPublic.publicUrl + '/API/Test/BasicPhysicalRadarChart?' + _d, {}).then(function(result) {
							if (result.body.StateCode == 0) {
								resolve(result.body.Data)
							}
						}).catch(function(error) {
							if (error.status == 500) {
								resolve(_data)
							}
							console.log(error)
						})
					})
				}
				api().then(res => {
					var _h = [];
					var _all = [];
					var _value = [];
					if (vm.xuanze[0].is) {
						_h.push(vm.jichuLeiDaHide.BMIScore);
						_all.push(vm.jichuLeiDaAll.BMIScore);
						_value.push(res.BMIScore)
					}
					if (vm.xuanze[1].is) {
						_h.push(vm.jichuLeiDaHide.BodyFatScore);
						_all.push(vm.jichuLeiDaAll.BodyFatScore);
						_value.push(res.BodyFatScore)
					}
					if (vm.xuanze[2].is) {
						_h.push(vm.jichuLeiDaHide.SitForwardScore);
						_all.push(vm.jichuLeiDaAll.SitForwardScore);
						_value.push(res.SitForwardScore)
					}
					if (vm.xuanze[3].is) {
						_h.push(vm.jichuLeiDaHide.ThirtyMeterDashScore);
						_all.push(vm.jichuLeiDaAll.ThirtyMeterDashScore);
						_value.push(res.ThirtyMeterDashScore)
					}
					if (vm.xuanze[4].is) {
						_h.push(vm.jichuLeiDaHide.VerticalJumpScore);
						_all.push(vm.jichuLeiDaAll.VerticalJumpScore);
						_value.push(res.VerticalJumpScore)
					}
					if (vm.xuanze[6].is) {
						_h.push(vm.jichuLeiDaHide.RelativeSquatMaxStrengthScore);
						_all.push(vm.jichuLeiDaAll.RelativeSquatMaxStrengthScore);
						_value.push(res.RelativeSquatMaxStrengthScore)
					}
					if (vm.xuanze[8].is) {
						_h.push(vm.jichuLeiDaHide.RelativeLyingPushMaxStrengthScore);
						_all.push(vm.jichuLeiDaAll.RelativeLyingPushMaxStrengthScore);
						_value.push(res.RelativeLyingPushMaxStrengthScore)
					}
					if (vm.xuanze[9].is) {
						_h.push(vm.jichuLeiDaHide.PullUpScore);
						_all.push(vm.jichuLeiDaAll.PullUpScore);
						_value.push(res.PullUpScore)
					}
					if (vm.xuanze[11].is) {
						_h.push(vm.jichuLeiDaHide.AbdominalEnduranceScore);
						_all.push(vm.jichuLeiDaAll.AbdominalEnduranceScore);
						_value.push(res.AbdominalEnduranceScore)
					}
					if (vm.xuanze[12].is) {
						_h.push(vm.jichuLeiDaHide.BackMuscleEnduranceScore);
						_all.push(vm.jichuLeiDaAll.BackMuscleEnduranceScore);
						_value.push(res.BackMuscleEnduranceScore)
					}
					if (vm.xuanze[13].is) {
						_h.push(vm.jichuLeiDaHide.ThreeKmScore);
						_all.push(vm.jichuLeiDaAll.ThreeKmScore);
						_value.push(res.ThreeKmScore)
					}
					vm.LeiDaSeries = [{
						name: '基础体能',
						type: 'radar',
						data: [{
							value: _h,
							name: '国际高水平'
						}, {
							value: _all,
							name: '队内平均值'
						}, {
							value: _value,
							name: '当前队员'
						}]
					}];
					vm.$nextTick(function() {
						vm.setBiaoRadar()
					})
				})
			},
			getLeiDa3: function() {
				var _indicator = [];
				if (vm.peizhi[0].is) {
					_indicator.push({
						name: '左45°',
						max: 10
					})
				}
				if (vm.peizhi[1].is) {
					_indicator.push({
						name: '右45°',
						max: 10
					})
				}
				if (vm.peizhi[2].is) {
					_indicator.push({
						name: '左135°',
						max: 10
					})
				}
				if (vm.peizhi[3].is) {
					_indicator.push({
						name: '右135°',
						max: 10
					})
				}
				if (vm.peizhi[4].is) {
					_indicator.push({
						name: '左90°',
						max: 10
					})
				}
				if (vm.peizhi[5].is) {
					_indicator.push({
						name: '右90°',
						max: 10
					})
				}
				if (vm.peizhi[6].is) {
					_indicator.push({
						name: '0°',
						max: 10
					})
				}
				if (vm.peizhi[7].is) {
					_indicator.push({
						name: '180°',
						max: 10
					})
				}
				if (vm.peizhi[8].is) {
					_indicator.push({
						name: '上肢比值%',
						max: 10
					})
				}
				if (vm.peizhi[9].is) {
					_indicator.push({
						name: '下肢比值%',
						max: 10
					})
				}
				if (vm.peizhi[10].is || vm.peizhi[11].is) {
					_indicator.push({
						name: '上肢',
						max: 10
					})
				}
				if (vm.peizhi[12].is || vm.peizhi[13].is) {
					_indicator.push({
						name: '下肢',
						max: 10
					})
				}
				vm.indicator = _indicator;

				function api() {
					return new Promise(function(resolve, reject) {
						var _d = '';
						_d += 'sportuserid=' + (vm.sport !== '' ? vm.sportList[vm.sport].UserId : '');
						var _data = {};
						if (vm.peizhi[0].is) {
							_data.Left45Score = 0
						}
						if (vm.peizhi[1].is) {
							_data.Right45Score = 0
						}
						if (vm.peizhi[2].is) {
							_data.Left135Score = 0
						}
						if (vm.peizhi[3].is) {
							_data.Right135Score = 0
						}
						if (vm.peizhi[4].is) {
							_data.Left90Score = 0
						}
						if (vm.peizhi[5].is) {
							_data.Right90Score = 0
						}
						if (vm.peizhi[6].is) {
							_data.ZeroScore = 0
						}
						if (vm.peizhi[7].is) {
							_data.OneHundredEightyScore = 0
						}
						if (vm.peizhi[8].is) {
							_data.UpperLimbRatioScore = 0
						}
						if (vm.peizhi[9].is) {
							_data.LowerLimbRatioScore = 0
						}
						if (vm.peizhi[10].is || vm.peizhi[11].is) {
							_data.UpperLimbScore = 0
						}
						if (vm.peizhi[12].is || vm.peizhi[13].is) {
							_data.LowerLimbScore = 0
						}
						vm.$http.post(myPublic.publicUrl + '/API/Test/TrunkRadarChart?' + _d, {}).then(function(result) {
							if (result.body.StateCode == 0) {
								resolve(result.body.Data)
							}
						}).catch(function(error) {
							if (error.status == 500) {
								resolve(_data)
							}
							console.log(error)
						})
					})
				}
				api().then(res => {
					var _h = [];
					var _all = [];
					var _value = [];
					if (vm.peizhi[0].is) {
						_h.push(vm.wendingLeiDaHide.Left45Score);
						_all.push(vm.wendingLeiDaAll.Left45Score);
						_value.push(res.Left45Score)
					}
					if (vm.peizhi[1].is) {
						_h.push(vm.wendingLeiDaHide.Right45Score);
						_all.push(vm.wendingLeiDaAll.Right45Score);
						_value.push(res.Right45Score)
					}
					if (vm.peizhi[2].is) {
						_h.push(vm.wendingLeiDaHide.Left135Score);
						_all.push(vm.wendingLeiDaAll.Left135Score);
						_value.push(res.Left135Score)
					}
					if (vm.peizhi[3].is) {
						_h.push(vm.wendingLeiDaHide.Right135Score);
						_all.push(vm.wendingLeiDaAll.Right135Score);
						_value.push(res.Right135Score)
					}
					if (vm.peizhi[4].is) {
						_h.push(vm.wendingLeiDaHide.Left90Score);
						_all.push(vm.wendingLeiDaAll.Left90Score);
						_value.push(res.Left90Score)
					}
					if (vm.peizhi[5].is) {
						_h.push(vm.wendingLeiDaHide.Right90Score);
						_all.push(vm.wendingLeiDaAll.Right90Score);
						_value.push(res.Right90Score)
					}
					if (vm.peizhi[6].is) {
						_h.push(vm.wendingLeiDaHide.ZeroScore);
						_all.push(vm.wendingLeiDaAll.ZeroScore);
						_value.push(res.ZeroScore)
					}
					if (vm.peizhi[7].is) {
						_h.push(vm.wendingLeiDaHide.OneHundredEightyScore);
						_all.push(vm.wendingLeiDaAll.OneHundredEightyScore);
						_value.push(res.OneHundredEightyScore)
					}
					if (vm.peizhi[8].is) {
						_h.push(vm.wendingLeiDaHide.UpperLimbRatioScore);
						_all.push(vm.wendingLeiDaAll.UpperLimbRatioScore);
						_value.push(res.UpperLimbRatioScore)
					}
					if (vm.peizhi[9].is) {
						_h.push(vm.wendingLeiDaHide.LowerLimbRatioScore);
						_all.push(vm.wendingLeiDaAll.LowerLimbRatioScore);
						_value.push(res.LowerLimbRatioScore)
					}
					if (vm.peizhi[10].is || vm.peizhi[11].is) {
						_h.push(vm.wendingLeiDaHide.UpperLimbScore);
						_all.push(vm.wendingLeiDaAll.UpperLimbScore);
						_value.push(res.UpperLimbScore)
					}
					if (vm.peizhi[12].is || vm.peizhi[13].is) {
						_h.push(vm.wendingLeiDaHide.LowerLimbScore);
						_all.push(vm.wendingLeiDaAll.LowerLimbScore);
						_value.push(res.LowerLimbScore)
					}
					vm.LeiDaSeries = [{
						name: '稳定和均衡',
						type: 'radar',
						data: [{
							value: _h,
							name: '国际高水平'
						}, {
							value: _all,
							name: '队内平均值'
						}, {
							value: _value,
							name: '当前队员'
						}]
					}];
					vm.$nextTick(function() {
						vm.setBiaoRadar()
					})
				})
			},
			setBiaoRadar: function() {
				try {
					document.getElementById('biao2').setAttribute("_echarts_instance_", "");
					document.getElementById('biao2').innerHTML = '';
					var myChart = echarts.init(document.getElementById('biao2'));
					var option = {
						title: {
							text: '基础雷达图'
						},
						tooltip: {},
						legend: {
							data: ['国际高水平', '队内平均值', '当前队员']
						},
						radar: {
							name: {
								textStyle: {
									color: '#fff',
									backgroundColor: '#999',
									borderRadius: 3,
									padding: [3, 5]
								}
							},
							indicator: vm.indicator
						},
						series: vm.LeiDaSeries
					};
					myChart.setOption(option)
				} catch (e) {}
			},
			backWorkout: function(num) {
				window.bus.$emit('workout', num)
			}
		},
		beforeCreate: function() {
			vm = this
		},
		beforeDestroy: function() {
			window.bus.$off('pingfen');
		},
		mounted: function() {
			vm.start();
			vm.getOnr = {};
			window.onresize = function() {
				clearTimeout(vm.getOnr);
				vm.getOnr = setTimeout(function() {
					vm.start()
				}, 200)
			}
		}
	}
</script>
