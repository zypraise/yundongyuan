<template>
	<div id="injury">
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
					<!-- <button class="daochu" v-on:click="daochu = true">导出</button> -->
					<button class="daochu" v-on:click="getDoctor()">查询</button>
				</div>
				<div style="clear: both;"></div>
				
				<div class="injury-main">
					<div class="title">
						<div class="injury-add">
							<!--<img v-on:click="showMask = true" src="../../assets/imgs/add.png" />
							<span>添加记录</span>-->
						</div>
						<span>伤病记录</span>
					</div>
					<div class="box">
						<!--<div class="item" v-for="(item,index) in doctorList">
							<div class="item-top">
								<img v-on:click="del()" style="cursor: pointer;width: 26px;float: right;margin: 10px 0px;" src="../../assets/imgs/del.png" />
								<span>{{item.Date}}</span>
							</div>
							<div class="item-val">{{item.Record}}</div>
						</div>-->
						<div style="background-color: #FFFFFF; margin: 20px 20px 0px 20px;position:  relative;z-index: 1;">
							<table>
								<tr>
									<th style="width: 120px;">时间</th>
									<th>伤病记录</th>
								</tr>
							</table>
							
						</div>
						<div style="position: absolute;left: 20px;right: 20px;top: 20px;bottom: 20px;overflow-y: auto;overflow-x: hidden;">
							<table>
								<tr></tr>
								<tr v-for="(item,index) in doctorList">
									<td style="width: 120px;">{{item.Date}}</td>
									<td style="text-align: left;">{{item.Record}}</td>
								</tr>
							</table>
							
						</div>
					</div>
				</div>
			</div>
		</section>
		<div class="mask" v-if="showMask">
			<div class="injury-mask-box">
				<div class="top">伤病记录</div>
				<div class="main">
					<textarea v-model="doctorText"></textarea>
				</div>
				<div class="but-box">
					<button v-on:click="save()">确认</button>
					<button v-on:click="showMask = false">取消</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	var vm;
	import header from '../../components/header.vue';
	import topMenu from '../../components/menu.vue';

	export default {
		//变量
		data: function() {
			return {
				url:'',
				doctorList: [], //伤病记录
				showMask: false, //显示添加伤病记录
				doctorText:'',
				userType: '', //用户类型
				
				sex: '',

				trainFirse: '',
				trainId: '',
				sportIndex: '',

				sportList: [],
				zhuanxiangList: [],
				zhuanxiangLists: []
				
				
				
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
			//关闭窗口清空信息
			showMask:function(newVal,oldVal){
				if(!newVal){
					vm.doctorText = '';
				}
			}
		},
		//计算属性
		computed: {},
		methods: {
			start: function() {
				vm.userType = window.localStorage.getItem('Sport_userType');
				if(vm.userType == '分队教练') {
					vm.sex = JSON.parse(window.localStorage.getItem('user')).Sex;
				}
				vm.url = myPublic.publicUrl;
				vm.GetAllTrain().then(() => {
					vm.getSport().then(() => {
						vm.getDoctor()
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

			},
			//查询运动员
			getSport: function() {
				return new Promise(function(resolve, reject) {
					vm.$http.post(myPublic.publicUrl + '/API/Account/AthletesSelect?' + 'trainFId=' + (vm.trainFirse !== '' ? vm.zhuanxiangList[vm.trainFirse].Id : '') + '&trainId=' + vm.trainId + '&sex=' + vm.sex, {})
						.then(function(
							result) {
							if(result.body.StateCode == 0) {
								vm.sportList = result.body.Data;
								for(var i = 0; i < result.body.Data.length; i++) {
									vm.userXuanZe.push(result.body.Data[i].UserId);
								}
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
			//查询伤病记录
			getDoctor: function() {
				if(vm.sportIndex === ''){
					myPublic.alertMy('请选择一位运动员')
return;					
				}
				vm.$http.get(myPublic.publicUrl + '/API/Test/GetAllDoctorRecord', {
					params: {
						userid: (vm.sportIndex === '' ? '' : vm.sportList[vm.sportIndex].UserId),
						pagesize:9999,
						pageindex:1
					}
				}).then(function(result) {
					if(result.body.StateCode == 0) {
						vm.doctorList = result.body.Data;
					} else {
						vm.$router.push({
							path: '/login'
						});
					}
				}).catch(function(error) {
					console.log(error);
				});
			},
			save:function(){
				
			},
			del:function(){}
		},
		beforeCreate: function() {
			vm = this;
		},
		mounted: function() {
			vm.start();
		}
	}
</script>