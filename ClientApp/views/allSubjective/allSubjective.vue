<template>
	<div id="all-subjective">
		<header-component></header-component>
		<section class="content">
			<top-menu></top-menu>
			<div class="index-content">
				<div style="margin-right:20px;margin-bottom:20px; float:right;">
					<select class="sport-list" v-model="trainFirse">
						<option value="">-全部大项-</option>
						<option :value="index" v-for="(item,index) in zhuanxiangList" v-if="item.SystemId.length == 3">{{item.Name}}</option>
					</select>
					<select class="sport-list" v-model="trainId">
						<option value="">-全部小项-</option>
						<option :value="item.Id" v-for="(item,index) in zhuanxiangList" v-if="item.SystemId.length == 6 && trainFirse !== '' && item.SystemId.substr(0,3) == zhuanxiangList[trainFirse].SystemId">{{item.Name}}</option>
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
					<button class="daochu" v-on:click="daochu = true">导出</button>
					<button class="daochu" v-on:click="getList()">查询</button>
				</div>
				<div style="clear: both;"></div>
				<section class="ti-cheng-fen" v-if="childNum == 1" :style="{'width':(showPingFen?'100%':'60%')}">
					<subjective-index v-bind:shuaxin="shuaxin" v-bind:body-list="bodyList"></subjective-index>
				</section>
				<section class="ti-cheng-fen" v-if="childNum == 2" :style="{'width':(showPingFen?'100%':'60%')}">
					<child-component-first v-bind:again-biao="againBiao" v-bind:shuaxin="shuaxin" v-bind:body-list="bodyList"></child-component-first>
				</section>
				<section class="ping-fen" :style="{'margin-right':(showPingFen?'-40%':'0%')}">
					<ping-fen v-bind:show-ping-fen="showPingFen"></ping-fen>
				</section>
				<div class="col-hr"></div>
				<div style="clear: both;"></div>
				<section style="float: left;width: 50%;">
					<child-component-third v-bind:again-biao="againBiao" v-bind:shuaxin="shuaxin" v-bind:body-list="bodyList"></child-component-third>
				</section>
				<section style="float: left;width: 50%;">
					<child-component-second v-bind:again-biao="againBiao" v-bind:shuaxin="shuaxin" v-bind:user-id="userId"></child-component-second>
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
						 :value="item.UserId" type="checkbox" name="user" v-model="userXuanZe" />{{item.FullName}}</div>
				</div>
				<div v-if="daochuNum == 1" class="but-box"><button v-on:click="daochuNum = 2">下一步</button><button v-on:click="daochu = false">取消</button></div>

				<div v-if="daochuNum == 2" class="daochu-table">
					<table>
						<tr>
							<td><input value="MorPulse,晨脉" type="checkbox" name="daochu" v-model="daochuList" />晨脉</td>
							<td><input value="Weight,体重" type="checkbox" name="daochu" v-model="daochuList" />体重</td>
						</tr>
						<tr>
							<td><input value="SleepDuration,睡眠时间" type="checkbox" name="daochu" v-model="daochuList" />睡眠时间</td>
							<td><input value="SleepQuality,睡眠质量" type="checkbox" name="daochu" v-model="daochuList" />睡眠质量</td>
						</tr>
						<tr>
							<td><input value="Desire,饮食欲望" type="checkbox" name="daochu" v-model="daochuList" />饮食欲望</td>
							<td><input value="SorenessLevel,肌肉酸痛评价" type="checkbox" name="daochu" v-model="daochuList" />肌肉酸痛评价</td>
						</tr>
						<tr>
							<td><input value="FatigueLevel,伤病疼痛评价" type="checkbox" name="daochu" v-model="daochuList" />伤病疼痛评价</td>
							<td><input value="TrainStatus,自我训练状态评价" type="checkbox" name="daochu" v-model="daochuList" />自我训练状态评价</td>
						</tr>
						<tr>
							<td><input value="Fatigue,RPE" type="checkbox" name="daochu" v-model="daochuList" />RPE</td>
							<td><input value="TrainIntensity,训练负荷" type="checkbox" name="daochu" v-model="daochuList" />训练负荷</td>
						</tr>
						<tr>
							<td><input value="Evaluate,教练评价" type="checkbox" name="daochu" v-model="daochuList" />教练评价</td>
						</tr>
					</table>
				</div>
				<div v-if="daochuNum == 2" class="but-box">
					<a :href="daochuUrl">确认</a><button v-on:click="daochuNum = 1">上一步</button></div>
			</div>
		</div>
	</div>
</template>
<script>
	var vm;
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
				userType: '',
				trainId: '', //小项
				trainFirse: '', //专项父级
				zhuanxiangList: [], //项目列表
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
						"MorPulse,晨脉",
						"Weight,体重",
						"SleepDuration,睡眠时间",
						"SleepQuality,睡眠质量",
						"Desire,饮食欲望",
						"SorenessLevel,肌肉酸痛评价",
						"FatigueLevel,伤病疼痛评价",
						"TrainStatus,自我训练状态评价",
						"Fatigue,RPE",
						"TrainIntensity,训练负荷",
						"Evaluate,教练评价",
					];
				} else {
					vm.daochuList = [];
				}
			}
		},
		//计算属性
		computed: {
			userId: function() {
				return vm.sportList[vm.sportIndex] ? vm.sportList[vm.sportIndex].UserId : '';
			},
			daochuUrl: function() {
				var _nameList = [];
				var _valueList = [];
				for (var i = 0; i < vm.daochuList.length; i++) {
					if (vm.daochuList[i]) {
						if (i != 0) {
							_nameList += ',';
							_valueList += ',';
						}
						_nameList += vm.daochuList[i].split(',')[0];
						_valueList += vm.daochuList[i].split(',')[1];
					}
				}
				var data = '';
				data += "starttime=" + document.getElementById('starttime').value;
				data += "&endtime=" + document.getElementById('endtime').value;
				data += "&userid=" + vm.userXuanZe.join(',');
				data += "&projectValue=" + _nameList;
				data += "&projectName=" + _valueList;
				return myPublic.publicUrl + '/API/Excelreport/SubjectiveExport?' + data;
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
				vm.GetAllTrain().then(() => {
					vm.getSport().then(() => {
						vm.setTimeInp();
						// vm.getList();
					});
				});
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
								vm.zhuanxiangList = result.body.Data;
								vm.$nextTick(function() {
									var _id = JSON.parse(window.localStorage.getItem('user')).TrainId;
									for (var i = 0; i < vm.zhuanxiangList.length; i++) {
										if (vm.zhuanxiangList[i].Id == _id) {

											vm.trainFirse = i;
											break;
										}
									}
								})
							}
							resolve() 
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
					vm.$http.post(myPublic.publicUrl + '/API/Account/AthletesSelect?' + 'trainId=' + vm.trainId + '&sex=' + vm.sex, {})
						.then(function(
							result) {
							if (result.body.StateCode == 0) {
								vm.sportList = result.body.Data;
								for (var i = 0; i < result.body.Data.length; i++) {
									vm.userXuanZe.push(result.body.Data[i].UserId);
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
							reject();
						});
				});
			},
			getList: function(totle) {
				vm.shuaxin = !vm.shuaxin;
				var _d = {};
				_d.trainId = vm.trainFirse === '' ? '' : vm.zhuanxiangList[vm.trainFirse].Id;
				_d.trainSecId = vm.trainFirse === '' ? '' : vm.trainId;
				_d.sex = vm.sex;
				_d.sportuserid = vm.sportIndex !== '' ? vm.userId : '';
				_d.starttime = document.getElementById('starttime').value;
				_d.endtime = document.getElementById('endtime').value;
				_d.pagesize = totle ? totle : 999;
				_d.pageindex = 1;
				vm.$http.get(myPublic.publicUrl + '/API/Test/GetAllUserSubjective', {
					params: _d
				}).then(function(result) {
					if (result.body.StateCode == 0) {
						vm.bodyList = result.body.Data;
					} else {
						vm.$router.push({
							path: '/login'
						});
					}
				}).catch(function(error) {
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
