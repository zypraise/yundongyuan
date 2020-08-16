<template>
	<div id="workout">
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
					<button class="daochu" v-on:click="isGetList = !isGetList;">查询</button>
					<!--<button class="daochu" v-on:click="daochu = true">导出</button>-->
				</div>
				<div style="clear: both;"></div>
				<!-- 子集 -->
				<section v-if="childNum == 1">
					<jichu :daochu="daochu" :is-get-list="isGetList" :zhuanxiang-list="zhuanxiangList" :userXuanZe="userXuanZe" :train-firse="trainFirse" :train-id="trainId" :sport-list="sportList" :sport-index="sportIndex" :sex="sex" :plist-type="plistType"></jichu>
				</section>
				<section v-if="childNum == 2">
					<zhuanxiang :is-get-list="isGetList" :sport-list="sportList" :sport-index="sportIndex"></zhuanxiang>
				</section>
				<!--<section v-if="childNum == 3">
					<duibi :sport-list="sportList"></duibi>
				</section>-->
			</div>
		</section>
	</div>
</template>
<script>
	var vm;
	import header from '../../components/header.vue';
	import topMenu from '../../components/menu.vue';
	import jichu from '../workout/childNum1.vue'; //基础组件
	import zhuanxiang from '../workout/childNum2.vue'; //基础组件
	import '../../assets/styles/workout.css';

	export default {
		//变量
		data: function() {
			return {
				daochu:false,
				userType: '', //用户类型
				sex: '',
				childNum: 0,
				isGetList: true,

				trainFirse: '',
				trainId: '',
				sportIndex: '',

				sportList: [],
				zhuanxiangList: [],
				zhuanxiangLists: [],
				userXuanZe: [], //导出用户项
				plistType: 1

			}
		},
		//公共模板
		components: {
			headerComponent: header,
			topMenu: topMenu,
			jichu: jichu,
			zhuanxiang: zhuanxiang
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
		},
		beforeRouteEnter(to, from, next) {
			if(from.fullPath == '/workoutAdd') {
				window.localStorage.setItem('workoutFrom', '0')
			} else {
				window.localStorage.setItem('workoutFrom', '1')
			}
			next();
		},
		//计算属性
		computed: {},
		methods: {
			start: function() {
				// myPublic.alertResult('请选择一位运动员');
				document.getElementById('starttime').value = myPublic.dateForFormat(myPublic.getAddMonthDate(null, -2),
					'yyyy-MM-dd');
				document.getElementById('endtime').value = myPublic.dateForFormat(null, 'yyyy-MM-dd');
				vm.setTimeInp();
				vm.userType = window.localStorage.getItem('Sport_userType');
				if(vm.userType == '分队教练') {
					vm.sex = JSON.parse(window.localStorage.getItem('user')).Sex;
				}
				window.bus.$on('workout', function(val) {
					vm.childNum = val.split(',')[0];
					vm.plistType = val.split(',')[1];
					vm.isGetList = !vm.isGetList;
				});
				window.bus.$on('daochu', function(val) {
					vm.daochu = val;
				});
				vm.GetAllTrain().then(() => {
					vm.getSport().then(() => {
						if(window.localStorage.getItem('workoutFrom') == '0') {
							vm.childNum = 2;
						} else {
							vm.childNum = 1;
						}
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
							if(result.body.StateCode == 0) {
								var _z = [];
								var _id = JSON.parse(window.localStorage.getItem('user')).TrainId.split(',');
								if(!(_id[0] === '' && _id.length == 1)) {
									for(var i = 0; i < result.body.Data.length; i++) {
										if(_id.includes(result.body.Data[i].Id)) {
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

			}, //获取远动员列表
			getSport: function() {
				return new Promise(function(resolve, reject) {
					vm.$http.post(myPublic.publicUrl + '/API/Account/AthletesSelect?' + 'trainFId=' + (vm.trainFirse !== '' ? vm.zhuanxiangList[vm.trainFirse].Id : '') + '&trainId=' + vm.trainId + '&sex=' + vm.sex, {})
						.then(function(
							result) {

							if(result.body.StateCode == 0) {
								vm.sportList = result.body.Data;
								for(var i = 0; i < result.body.Data.length; i++) {
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
			setTimeInp: function() {
				document.getElementById('starttime-section').addEventListener('blur', function() {
					var _date1 = document.getElementById('starttime').value;
					var _date2 = document.getElementById('endtime').value;
					var isDate = _date1.split('-')[0] * 10000 + _date1.split('-')[1] * 100 + _date1.split('-')[2] * 1 <= _date2.split(
						'-')[0] * 10000 + _date2.split('-')[1] * 100 + _date2.split('-')[2] * 1;
					if(_date2 == '' || isDate) {
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
					if(_isDate) {
						document.getElementById('endtime').value = _thisDate;
						return;
					}
					var isDate = _date1.split('-')[0] * 10000 + _date1.split('-')[1] * 100 + _date1.split('-')[2] * 1 <= _date2.split(
						'-')[0] * 10000 + _date2.split('-')[1] * 100 + _date2.split('-')[2] * 1;
					if(_date1 == '' || isDate) {
						return;
					}
					myPublic.alertMy('开始时间不能大于结束时间');
					document.getElementById('endtime').value = document.getElementById('starttime').value;
				});
			},
			workoutAdd: function() {
				vm.$router.push({
					path: '/workoutAdd'
				});
			}
		},
		beforeCreate: function() {
			vm = this;
		},
		beforeDestroy: function() {
			window.bus.$off('workout');
			window.bus.$off('daochu');
		},
		mounted: function() {
			vm.start();
		}
	}
</script>