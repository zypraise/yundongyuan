<template>
	<div id="body">
		<header-component></header-component>
		<section class="content">
			<top-menu></top-menu>
			<div class="index-content">
				<div style="margin-bottom:20px;margin-right:20px;float:right;">
					<select class="sport-list" v-model="trainFirse">
						<!-- <option v-if="userType == '超级管理员'" value="">-全部大项-</option> -->
						<option value="">-全部大项-</option>
						<option :value="index" v-for="(item,index) in zhuanxiangList" v-if="item.SystemId.length == 3">{{item.Name}}</option>
					</select>
					<select class="sport-list" v-model="trainId">
						<option value="">-全部小项-</option>
						<option :value="item.Id" v-for="(item,index) in zhuanxiangLists" v-if="item.SystemId.length == 6 && trainFirse !== '' && item.SystemId.substr(0,3) == zhuanxiangList[trainFirse].SystemId">{{item.Name}}</option>
					</select>
					<select v-if="userType != '分队教练'" class="sport-list" v-model="sex">
						<option value="">-全部性别-</option>
						<option value="男">男</option>
						<option value="女">女</option>
					</select>
					<select class="sport-list" v-model="sportIndex">
						<option value="">-全部运动员-</option>
						<option v-for="(item,index) in sportList" :value="index">{{item.FullName}}</option>
					</select>

					<section class='mydate-box'>
						<input class='form_datetime' onclick='myDate.getFocus(this)' id='starttime' readonly='readonly' type='text'>
						<section id="starttime-section" tabindex='0' class='calendar' onclick="myDate.holdBubble()"></section>
					</section>
					<span>-</span>
					<section class='mydate-box'>
						<input class='form_datetime' onclick='myDate.getFocus(this)' id='endtime' readonly='readonly' type='text'>
						<section id="endtime-section" style="right:20px;" tabindex='0' class='calendar' onclick="myDate.holdBubble()"></section>
					</section>
					<button class="daochu" v-on:click="getBodyFatTrend()">查询</button>
					<button class="daochu" v-on:click="daochu = true">导出</button>
				</div>
				<div style="clear: both;"></div>
				<section class="">
					<div class="body-item">
						<div class="title">
							<ul class="title-tab">
								<li class="item" :class="{'current':childNum == 1}" v-on:click="childNum = 1">数据表</li>
								<li class="item" :class="{'current':childNum == 2}" v-on:click="childNum = 2">折线图</li>
							</ul>
						</div>
						<section v-show="childNum == 1">
							<div id="table-header" class="table-box">
								<table>
									<thead>
										<tr>
											<th style="min-width: 130px;max-width: 130px;width: 130px;left:0px;z-index: 100;">测试时间<img @click="sortbut('Testdate')"
								 :src="sort('Testdate')" /></th>
											<th style="min-width: 130px;max-width: 130px;width: 130px;left:143px;z-index: 100;">运动员<img @click="sortbut('SportName')"
								 :src="sort('SportName')" /></th>
											<th>运动项目</th>
											<th>参赛主项</th>
											<th>年龄</th>
											<th>性别</th>
											<th>体重</th>
											<th>肌肉</th>
											<th>脂肪</th>
											<th>骨矿物盐</th>
											<th>体脂率</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(item,index) in bodyList">
											<th style="min-width: 130px;max-width: 130px;width: 130px;left:0px;">{{item.Testdate}}</th>
											
											<th style="min-width: 130px;max-width: 130px;width: 130px;left:143px;">{{item.SportName}}</th>
											<td>{{item.TrainName}}</td>
											<td>{{item.TrainSecName}}</span></td>
											<td>{{item.Age}}</td>
											<td>{{item.Sex}}</td>
											
											<td>{{item.TotalMass.toFixed(2)}}</td>
											<td>{{item.Muscle.toFixed(2)}}</td>
											<td>{{item.Fat.toFixed(2)}}</td>
											<td>{{item.BoneMSalt.toFixed(2)}}</td>
											<td>{{item.BF.toFixed(2)}}</td>
										</tr>
									</tbody>
								</table>

							</div>
						</section>
						<section v-show="childNum == 2">
							<div class="table-box">
								<div id="biao" style="width: 100%;height: 100%;overflow: hidden;">

								</div>
							</div>
						</section>
					</div>
				</section>
			</div>
		</section>
		<div class="mask" v-if="daochu">
			<div class="daochu-mask">
				<div class="title">
					<img class="close-img" src="../../assets/imgs/close.png" v-on:click="daochu = false">
					<span>选择导出项</span>
					<input v-if="daochuNum == 1" style="margin: 17px 6px 0px 20px;vertical-align:  top;" value="1" type="checkbox"
					 name="alldaochu" v-model="allDaoChu">
					<input v-if="daochuNum == 2" style="margin: 17px 6px 0px 20px;vertical-align:  top;" value="1" type="checkbox"
					 name="alldaochunext" v-model="allDaoChuNext">
					<span>全选/全不选</span>
				</div>
				<div v-if="daochuNum == 1" class="daochu-table">
					<div style="line-height: 40px;float: left;width: 50%;" v-for="item in sportList"><input style="margin-left: 6px;"
						 :value="item.FullName" type="checkbox" name="user" v-model="userXuanZe" />{{item.FullName}}</div>
				</div>
				<div v-if="daochuNum == 1" class="but-box"><button v-on:click="daochuNum = 2">下一步</button><button v-on:click="daochu = false">取消</button></div>

				<div v-if="daochuNum == 2" class="daochu-table">
					<table>
						<tr>
							<td><input value="TotalMass" type="checkbox" name="daochu" v-model="daochuList" />体重</td>
							<td><input value="Muscle" type="checkbox" name="daochu" v-model="daochuList" />肌肉</td>
						</tr>
						<tr>
							<td><input value="Fat" type="checkbox" name="daochu" v-model="daochuList" />脂肪</td>
							<td><input value="BoneMSalt" type="checkbox" name="daochu" v-model="daochuList" />骨矿物盐</td>
						</tr>
						<tr>
							<td><input value="BF" type="checkbox" name="daochu" v-model="daochuList" />体脂率</td>
							<td></td>
						</tr>
					</table>
				</div>
				<div style="height: 0px;overflow: hidden;">
					<table id="daochu">
						<tr>
							<th>测试时间</th>
							<th>运动员</th>
							<th>运动项目</th>
							<th>参赛主项</th>
							<th>年龄</th>
							<th>性别</th>
							<th v-if="daochuList.indexOf('TotalMass')>=0">体重</th>
							<th v-if="daochuList.indexOf('Muscle')>=0">肌肉</th>
							<th v-if="daochuList.indexOf('Fat')>=0">脂肪</th>
							<th v-if="daochuList.indexOf('BoneMSalt')>=0">骨矿物盐</th>
							<th v-if="daochuList.indexOf('BF')>=0">体脂率</th>
						</tr>
						<tr v-for="item in bodyList" v-if="userXuanZe.indexOf(item.SportName)>=0">
							<td>{{item.Testdate}}</td>
				
							<td>{{item.SportName}}</td>
							<td>{{item.TrainName}}</td>
							<td>{{item.TrainSecName}}</span></td>
							<td>{{item.Age}}</td>
							<td>{{item.Sex}}</td>
				
							<td v-if="daochuList.indexOf('TotalMass')>=0">{{item.TotalMass.toFixed(2)}}</td>
							<td v-if="daochuList.indexOf('Muscle')>=0">{{item.Muscle.toFixed(2)}}</td>
							<td v-if="daochuList.indexOf('Fat')>=0">{{item.Fat.toFixed(2)}}</td>
							<td v-if="daochuList.indexOf('BoneMSalt')>=0">{{item.BoneMSalt.toFixed(2)}}</td>
							<td v-if="daochuList.indexOf('BF')>=0">{{item.BF.toFixed(2)}}</td>
						</tr>
					</table>
				</div>
				<div v-if="daochuNum == 2" class="but-box">
					<button v-on:click="mytableExcel('daochu')">确认</button><button v-on:click="daochuNum = 1">上一步</button></div>
			</div>
		</div>
	</div>
</template>
<script>
	var vm;
	import {
		getSortText
	} from '../../components/sort.js';
	import header from '../../components/header.vue';
	import topMenu from '../../components/menu.vue';
	import '../../assets/styles/body.css';
	import {
		sortimg
	} from '../../components/sort.js';

	export default {
		//变量
		data: function() {
			return {
				sortlist:[
					{
						type:'Testdate',
						is:true,
						sort:false
					},
					{
						type:'SportName',
						is:false,
						sort:false
					}
				],
				childNum: 1,
				getOnr: {},
				allDaoChu: ['1'],
				allDaoChuNext: [],
				daochuNum: 1,
				userXuanZe: [],
				daochuList: [],
				daochu: false,
				bodyList: [],
				userType: '',
				sex: '',
				trainId: '', //小项
				trainFirse: '', //专项父级
				zhuanxiangList: [], //项目列表
				zhuanxiangLists: [], //项目列表
				sportList: [],
				sportIndex: ''
			}
		},
		//公共模板
		components: {
			headerComponent: header,
			topMenu: topMenu
		},
		watch: {
			trainFirse: function(newVal, oldVal) {
				vm.trainId = '';
				vm.sportIndex = '';
				vm.getSport();
			},
			trainId: function(newVal, oldVal) {
				vm.sportIndex = '';
				vm.getSport();
			},
			sex: function(newVal, oldVal) {
				vm.sportIndex = '';
				vm.getSport();
			},
			allDaoChu: function(newVal, oldVal) {
				if (newVal.length > 0) {
					vm.getSport()
				} else {
					vm.userXuanZe = [];
				}
			},
			childNum: function(newVal, oldVal) {
				if (newVal == 2) {
					vm.$nextTick(function() {

						vm.setBiao();
					})
				}
			},
			allDaoChuNext: function(newVal, oldVal) {
				if (newVal.length > 0) {
					vm.daochuList = ["TotalMass", "Muscle", "Fat", "BoneMSalt", "BF"]
				} else {
					vm.daochuList = [];
				}
			}
		},
		//计算属性
		computed: {},
		methods: {
			start: function() {
				document.getElementById('starttime').value = myPublic.dateForFormat(myPublic.getAddMonthDate(null, -2),
					'yyyy-MM-dd');
				document.getElementById('endtime').value = myPublic.dateForFormat(null, 'yyyy-MM-dd');
				vm.userType = window.localStorage.getItem('Sport_userType');
				if (vm.userType == '分队教练') {
					vm.sex = JSON.parse(window.localStorage.getItem('user')).Sex;
				}
				myPublic.tableHeader('#table-header');
				vm.GetAllTrain().then(() => {
					vm.setTimeInp();
					vm.getSport().then(() => {
						vm.getBodyFatTrend();
					})
				});
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
				vm.getBodyFatTrend();
			},
			mytableExcel: function(id) {
				myPublic.tableExcel(id);
			},
			//获取训练专项
			GetAllTrain: function() {
				return new Promise(function(resolve, reject) {
					vm.$http.get(myPublic.publicUrl + '/API/Account/GetAllTrain', {
							params: {
								userName: ''
							}
						}).then(function(result) {
							if (result.body.StateCode == 0) {
								var _z = [];
								var _id = JSON.parse(window.localStorage.getItem('user')).TrainId.split(',');
								if (!(_id[0] === '' && _id.length == 1)) {
									for (var i = 0; i < result.body.Data.length; i++) {
										if (_id.includes(result.body.Data[i].Id)) {
											_z.push(result.body.Data[i]);
											if(_z.length >= _id.length){break;}
										}
									}
								} else {
									_z = [...result.body.Data];
								}
								vm.zhuanxiangList = _z;
								vm.zhuanxiangLists = [...result.body.Data];
								vm.$nextTick(function() {
									resolve()
								});

							}
						})
						.catch(function(error) {
							console.log(error);
							reject()
						});
				});

			},
			//获取远动员列表
			getSport: function() {
				return new Promise(function(resolve, reject) {
					vm.$http.post(myPublic.publicUrl + '/API/Account/AthletesSelect?' + 'trainFId=' + (vm.trainFirse !== '' ? vm.zhuanxiangList[
							vm.trainFirse].Id : '') + '&trainId=' + vm.trainId + '&sex=' + vm.sex, {})
						.then(function(
							result) {

							if (result.body.StateCode == 0) {
								vm.sportList = result.body.Data;
								for (var i = 0; i < result.body.Data.length; i++) {
									vm.userXuanZe.push(result.body.Data[i].FullName);
								}
								// if (result.body.Data && result.body.Data.length > 0) {
								// 	vm.sportIndex = 0;
								// }
							} else {
								vm.$router.push({
									path: '/login'
								});
							}
							resolve();

						}).catch(function(error) {
							console.log(error);
						});
				});
			},
			//获取体成分
			getBodyFatTrend: function() {
				vm.$http.get(myPublic.publicUrl + '/API/Test/GetAllBodyComposition', {
					params: {
						trainId: (vm.trainFirse !== '' ? vm.zhuanxiangList[vm.trainFirse].Id : ""),
						trainSecId: vm.trainId,
						sex: vm.sex,
						sportuserid: (vm.sportIndex === '' ? '' : vm.sportList[vm.sportIndex].UserId),
						starttime: document.getElementById('starttime').value,
						endtime: document.getElementById('endtime').value,
						sort:getSortText(vm.sortlist),
						pagesize: 9999,
						pageindex: 1
					}
				}).then(function(result) {
					if (result.body.StateCode == 0) {
						vm.bodyList = result.body.Data ? result.body.Data : [];
						vm.setBiao();
					} else {
						vm.$router.push({
							path: '/login'
						});
					}
				}).catch(function(error) {
					console.log(error);
				});
			},
			setBiao: function() {
				var _dateList = [];
				var _series = [{
						name: '体脂率',
						type: 'line',
						yAxisIndex: 1,
						data: []
					},
					{
						name: '骨矿物盐',
						barWidth: '50%',
						type: 'bar',
						stack: '总量',
						data: []
					},
					{
						name: '脂肪',
						type: 'bar',
						stack: '总量',
						data: []
					},
					{
						name: '肌肉',
						type: 'bar',
						stack: '总量',
						data: []
					}
				];
				for (var i = 0; i < vm.bodyList.length; i++) {
					_dateList.push(vm.bodyList[i].SportName + ' ' + vm.bodyList[i].Testdate);
					_series[0].data.push(vm.bodyList[i].BF)
					_series[1].data.push(vm.bodyList[i].BoneMSalt)
					_series[2].data.push(vm.bodyList[i].Fat)
					_series[3].data.push(vm.bodyList[i].Muscle)
				}
				document.getElementById('biao').setAttribute("_echarts_instance_", "");
				document.getElementById('biao').innerHTML = '';
				// 基于准备好的dom，初始化echarts实例
				var myChart = echarts.init(document.getElementById('biao'));

				// 指定图表的配置项和数据
				var option = {
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					legend: {
						data: ['体脂率', '骨矿物盐', '脂肪', '肌肉']
					},
					grid: {
						left: '50px',
						right: '50px',
						bottom: '10px',
						containLabel: true
					},
					xAxis: {
						type: 'category',
						data: _dateList
					},
					yAxis: [{
						type: 'value',
						name: '质量',
						axisLabel: {
							formatter: '{value} kg'
						}

					}, {
						type: 'value',
						name: '百分比',
						max: 50,
						axisLabel: {
							formatter: '{value} %'
						}
					}],
					series: _series
				};

				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option);
			},
			setTimeInp: function() {
				document.getElementById('starttime-section').addEventListener('blur', function() {
					var _date1 = document.getElementById('starttime').value;
					var _date2 = document.getElementById('endtime').value;
					var isDate = _date1.split('-')[0] * 10000 + _date1.split('-')[1] * 100 + _date1.split('-')[2] * 1 <= _date2.split(
						'-')[0] * 10000 + _date2.split('-')[1] * 100 + _date2.split('-')[2] * 1;
					if (_date2 == '' || isDate) {
						return;
					}
					myPublic.alertMy('开始时间不能大于结束时间');
					document.getElementById('starttime').value = document.getElementById('endtime').value;
				});
				document.getElementById('endtime-section').addEventListener('blur', function() {
					var _date1 = document.getElementById('starttime').value;
					var _date2 = document.getElementById('endtime').value;
					var _thisDate = myPublic.dateForFormat(null, 'yyyy-MM-dd');
					var _isDate = _thisDate.split('-')[0] * 10000 + _thisDate.split('-')[1] * 100 + _thisDate.split('-')[2] * 1 <
						_date2.split('-')[0] * 10000 + _date2.split('-')[1] * 100 + _date2.split('-')[2] * 1;
					if (_isDate) {
						document.getElementById('endtime').value = _thisDate;
						return;
					}
					var isDate = _date1.split('-')[0] * 10000 + _date1.split('-')[1] * 100 + _date1.split('-')[2] * 1 <= _date2.split(
						'-')[0] * 10000 + _date2.split('-')[1] * 100 + _date2.split('-')[2] * 1;
					if (_date1 == '' || isDate) {
						return;
					}
					myPublic.alertMy('开始时间不能大于结束时间');
					document.getElementById('endtime').value = document.getElementById('starttime').value;
				});
			}
		},
		beforeCreate: function() {
			vm = this;
		},
		mounted: function() {
			vm.start();
			vm.getOnr = {};
			window.onresize = function() {
				clearTimeout(vm.getOnr);
				vm.getOnr = setTimeout(function() {
					vm.start();
				}, 200);
			}
		}
	}
</script>
