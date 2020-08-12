<template>
	<div id="all-subjective">
		<header-component></header-component>
		<section class="content">
			<top-menu></top-menu>
			<div class="index-content">
				<div style="margin-right:20px;margin-bottom:20px; float:right;">
					<select class="sport-list" v-model="trainFirse">
						<!-- <option v-if="userType == '超级管理员'" value="">-全部大项-</option> -->
						<option value="">-全部大项-</option>
						<option :value="index" v-for="(item,index) in zhuanxiangList" v-if="item.SystemId.length == 3">{{item.Name}}</option>
					</select>
					<select class="sport-list" v-model="trainId">
						<option value="">-全部小项-</option>
						<option :value="item.Id" v-for="(item,index) in zhuanxiangLists" v-if="item.SystemId.length == 6 && trainFirse !== '' && item.SystemId.substr(0,3) == zhuanxiangList[trainFirse].SystemId">{{item.Name}}</option>
					</select>
					<select class="sport-list" v-if="userType != '分队教练'" v-model="sex">
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
					<button class="daochu" v-on:click="getList()">查询</button>
					<button class="daochu" v-on:click="daochu = true">导出</button>
				</div>
				<div style="clear: both;"></div>
				<section class="ti-cheng-fen" v-if="childNum == 1">
					<subjective-index v-bind:shuaxin="shuaxin" v-bind:sortlist='sortlist' v-bind:body-list="bodyList"></subjective-index>
				</section>
				<section class="ti-cheng-fen" v-if="childNum == 2">
					<child-component-first v-bind:again-biao="againBiao" v-bind:shuaxin="shuaxin" v-bind:body-list="bodyList"></child-component-first>
				</section>
				<section class="ti-cheng-fen" v-if="childNum == 3">
					<child-component-second v-bind:again-biao="againBiao" v-bind:shuaxin="shuaxin" v-bind:user-id="userId"></child-component-second>
				</section>
				<section class="ping-fen" :style="{'display':(showPingFen?'none':'block')}">
					<ping-fen v-bind:show-ping-fen="showPingFen"></ping-fen>
				</section>
				<div class="col-hr"></div>
				<div style="clear: both;"></div>
				<!-- <section style="float: left;width: 50%;">
					<child-component-third v-bind:again-biao="againBiao" v-bind:shuaxin="shuaxin" v-bind:body-list="bodyList"></child-component-third>
				</section> -->

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
							<td><input value="MorPulse" type="checkbox" name="daochu" v-model="daochuList" />晨脉</td>
							<td><input value="Weight" type="checkbox" name="daochu" v-model="daochuList" />体重</td>
						</tr>
						<tr>
							<td><input value="SleepDuration" type="checkbox" name="daochu" v-model="daochuList" />睡眠时间</td>
							<td><input value="SleepQuality" type="checkbox" name="daochu" v-model="daochuList" />睡眠质量</td>
						</tr>
						<tr>
							<td><input value="Desire" type="checkbox" name="daochu" v-model="daochuList" />饮食欲望</td>
							<td><input value="SorenessLevel" type="checkbox" name="daochu" v-model="daochuList" />肌肉酸痛</td>
						</tr>
						<tr>
							<td><input value="FatigueLevel" type="checkbox" name="daochu" v-model="daochuList" />伤病疼痛</td>
							<td><input value="TrainStatus" type="checkbox" name="daochu" v-model="daochuList" />自我训练状态</td>
						</tr>
						<tr>
							<td><input value="Fatigue" type="checkbox" name="daochu" v-model="daochuList" />RPE</td>
							<td><input value="TrainIntensity" type="checkbox" name="daochu" v-model="daochuList" />训练负荷</td>
						</tr>
						<tr>
							<td><input value="Evaluate" type="checkbox" name="daochu" v-model="daochuList" />教练评价</td>
						</tr>
					</table>
				</div>
				<div style="height: 0px;overflow: hidden;">
					<table id="daochu">
						<tr>
							<th style="min-width: 130px;max-width: 130px;width: 130px;left:0px;z-index: 100;">测试时间</th>
							<th style="min-width: 130px;max-width: 130px;width: 130px;left:143px;z-index: 100;">运动员</th>
							<th>运动项目</th>
							<th>参赛主项</th>
							<th>年龄</th>
							<th>性别</th>
							<th v-if="daochuList.indexOf('MorPulse')>=0">晨脉</th>
							<th v-if="daochuList.indexOf('Weight')>=0">体重</th>
							<th v-if="daochuList.indexOf('SleepDuration')>=0">睡眠时间</th>
							<th v-if="daochuList.indexOf('SleepQuality')>=0">睡眠质量</th>
							<th v-if="daochuList.indexOf('Desire')>=0">饮食欲望</th>
							<th v-if="daochuList.indexOf('SorenessLevel')>=0">肌肉酸痛</th>
							<th v-if="daochuList.indexOf('FatigueLevel')>=0">伤病疼痛</th>
							<th v-if="daochuList.indexOf('TrainStatus')>=0">自我训练状态</th>
							<th v-if="daochuList.indexOf('Fatigue')>=0">RPE</th>
							<th v-if="daochuList.indexOf('TrainIntensity')>=0">训练负荷</th>
							<th v-if="daochuList.indexOf('Evaluate')>=0">教练评价</th>
						</tr>
						<tr v-for="item in bodyList" v-if="userXuanZe.indexOf(item.SportName)>=0">
							<th style="min-width: 130px;max-width: 130px;width: 130px;left:0px;">{{item.DateSign}}</th>
							<th style="min-width: 130px;max-width: 130px;width: 130px;left:143px;">{{item.SportName}}</th>
							<td>{{item.TrainName}}</td>
							<td>{{item.TrainSecName}}</span></td>
							<td>-</td>
							<td>{{item.Sex}}</td>

							<td v-if="daochuList.indexOf('MorPulse')>=0">{{item.MorPulse}}</td>
							<td v-if="daochuList.indexOf('Weight')>=0">{{item.Weight}}</td>
							<td v-if="daochuList.indexOf('SleepDuration')>=0">{{item.SleepDuration}}</td>
							<td v-if="daochuList.indexOf('SleepQuality')>=0">{{item.SleepQuality}}</td>
							<td v-if="daochuList.indexOf('Desire')>=0">{{item.Desire}}</td>
							<td v-if="daochuList.indexOf('SorenessLevel')>=0">{{item.SorenessLevel}}</td>
							<td v-if="daochuList.indexOf('FatigueLevel')>=0">{{item.FatigueLevel}}</td>
							<td v-if="daochuList.indexOf('TrainStatus')>=0">{{item.TrainStatus}}</td>
							<td v-if="daochuList.indexOf('Fatigue')>=0">{{item.Fatigue}}</td>
							<td v-if="daochuList.indexOf('TrainIntensity')>=0">{{item.TrainIntensity}}</td>
							<td v-if="daochuList.indexOf('Evaluate')>=0">{{item.Evaluate?item.Evaluate:'-'}}</td>
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
	import pingFen from '../../components/pingFen.vue';
	import subjectiveIndex from '../allSubjective/allSubjective-index.vue';
	import childComponent1 from '../allSubjective/childNum1.vue';
	import childComponent2 from '../allSubjective/childNum2.vue';
	import childComponent3 from '../allSubjective/childNum3.vue';
	import '../../assets/styles/allSubjective.css';
	export default {
		//变量
		data: function() {
			return {
				sortlist:[
					{
						type:'DateSign',
						is:true,
						sort:false
					},
					{
						type:'SportName',
						is:false,
						sort:false
					}
				],
				userType: '',
				trainId: '', //小项
				trainFirse: '', //专项父级
				zhuanxiangList: [], //项目列表
				zhuanxiangLists: [], //项目列表
				sex: "",
				againBiao: true,
				getOnr: {},
				allDaoChu: ['1'],
				allDaoChuNext: [],
				daochuNum: 1,
				userXuanZe: [],
				daochuList: [],
				sportList: [],
				sportIndex: '',
				bodyList: [],
				shuaxin: true,
				showPingFen: true,
				daochu: false,
				childNum: 1
			}
		},
		//公共模板
		components: {
			headerComponent: header,
			pingFen: pingFen,
			subjectiveIndex: subjectiveIndex,
			childComponentFirst: childComponent1,
			childComponentSecond: childComponent2,
			childComponentThird: childComponent3,
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
			allDaoChuNext: function(newVal, oldVal) {
				if (newVal.length > 0) {
					vm.daochuList = [
						"MorPulse",
						"Weight",
						"SleepDuration",
						"SleepQuality",
						"Desire",
						"SorenessLevel",
						"FatigueLevel",
						"TrainStatus",
						"Fatigue",
						"TrainIntensity",
						"Evaluate",
					];
				} else {
					vm.daochuList = [];
				}
			}
		},
		//计算属性
		computed: {
			userId: function() {
				return (vm.sportIndex === '' ? '' : vm.sportList[vm.sportIndex].UserId);
			}
		},
		methods: {
			start: function() {
				vm.userType = window.localStorage.getItem('Sport_userType');
				if (vm.userType == '分队教练') {
					vm.sex = JSON.parse(window.localStorage.getItem('user')).Sex;
				}
				document.getElementById('starttime').value = myPublic.dateForFormat(myPublic.getAddDayDate(null, -14),
					'yyyy-MM-dd');
				document.getElementById('endtime').value = myPublic.dateForFormat(null, 'yyyy-MM-dd');
				window.bus.$on('pingfen', function(val) {
					vm.showPingFen = val;
				});

				window.bus.$on('childNum', function(val) {
					vm.childNum = val;
				});
				window.bus.$on('sortlist', function(val){
					vm.sortlist = val;
					vm.getList();
				});
				vm.setTimeInp();
				vm.GetAllTrain().then(() => {
					vm.getSport().then(() => {
						vm.getList();
					});
				});
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
									// if(vm.userType == '超级管理员'){
									// 	vm.trainFirse = '';
									// }else{
									// 	for(var i = 0; i < _z.length; i++) {
									// 		if(_z[i].SystemId.length == 3) {
									// 			vm.trainFirse = i;
									// 			break;
									// 		}
									// 	}
									// }
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

							} else {
								vm.$router.push({
									path: '/login'
								});
							}
							resolve();
						}).catch(function(error) {
							console.log(error);
							reject();
						});
				});
			},
			getList: function(totle) {
				vm.shuaxin = !vm.shuaxin;
				vm.$http.get(myPublic.publicUrl + '/API/Test/GetAllUserSubjective', {
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
					} else {
						vm.$router.push({
							path: '/login'
						});
					}
				}).catch(function(error) {
					vm.bodyList = [];
					console.log(error);
				});
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
		beforeDestroy: function() {
			window.bus.$off('pingfen');
			window.bus.$off('childNum');
			window.bus.$off('sortlist');
		},
		mounted: function() {
			vm.start();
			vm.getOnr = {};
			window.onresize = function() {
				clearTimeout(vm.getOnr);
				vm.getOnr = setTimeout(function() {
					vm.againBiao = !vm.againBiao;
				}, 200);
			}
		}
	}
</script>
