<template>
	<div id="workout">
		<header-component></header-component>
		<section class="content">
			<top-menu style="min-width: 1172px;"></top-menu>
			<div class="index-content">
				<div style="clear: both;"></div>
				<child-component-third v-if="childNum == 3"></child-component-third>
			</div>
		</section>
	</div>
</template>
<script>
	var vm;
	import header from '../../components/header.vue';
	import topMenu from '../../components/menu.vue';
	import childComponent3 from '../workout/childNum3.vue';
	import '../../assets/styles/workout.css';
	export default {
		//变量
		data: function() {
			return {
				allDaoChu:['1'],
				userXuanZe:[],//导出用户名
				daochuNum:1,
				childNum:3,
				daochu:false,
				daochuList:[],
				trainAllList:[],//所有训练项目
				trainList:[],//训练项
				staminaList:[],
				staminaName:[],
				staminaDate:[],
				sportList:[],
				sportIndex:0
			}
		},
		//公共模板
		components: {
			headerComponent: header,
			childComponentThird:childComponent3,
			topMenu: topMenu
		},
		watch: {
			sportIndex:function(newVal,oldVal){
				window.sportIndex = newVal;
				vm.getList();
			},
			allDaoChu:function(newVal,oldVal){
				if(newVal.length>0){
					vm.getSport()
				}else{
					vm.userXuanZe = [];
				}
			}
		},
		//计算属性
		computed: {
			daochuUrl:function(){
				var _valueList = vm.trainList.join(',');
				var data = '';
				data += "starttime="+document.getElementById('starttime').value;
				data += "&endtime="+document.getElementById('endtime').value;
				data += "&userid="+vm.userXuanZe.join(',');
				data += "&projectValue="+_valueList;
				return myPublic.publicUrl + '/API/Excelreport/TrainingPeopleExport?'+data;
			}
		},
		methods: {
			start: function() {
				document.getElementById('starttime').value = myPublic.dateForFormat(myPublic.getAddMonthDate(null, -4), 'yyyy-MM-dd');
				document.getElementById('endtime').value = myPublic.dateForFormat(null, 'yyyy-MM-dd');
				window.bus.$on('workout', function(val) {
					vm.childNum = val;
					vm.getList();
				});
				vm.getSport();
				vm.setTimeInp();
				vm.getSportItem();
			},
			getList:function(){
				vm.$http.get(myPublic.publicUrl + '/API/Test/GetAllTrainResult', {
					params: {
						sportuserid: vm.sportList[vm.sportIndex].UserId,
						starttime: document.getElementById('starttime').value,
						endtime: document.getElementById('endtime').value,
						pagesize:999,
						pageindex:1
					}
				}).then(function(result) {
					if(result.body.StateCode == 0) {
						var _list = result.body.Data;
						var itemDate = [];
						var itemName = [];
						var itemList = [];
						var _val = [];
						for(var i = 0;i<_list.length;i++){
							if(itemName.indexOf(_list[i].TypeName)<0){
								itemName.push(_list[i].TypeName);
								_val.push(0);
							}
						}
						
						for(var i = 0;i<_list.length;i++){
							if(itemDate.indexOf(_list[i].TestDate)>=0){
								//包含
								itemList[itemDate.indexOf(_list[i].TestDate)].valueList[itemName.indexOf(_list[i].TypeName)] = _list[i].Value;
							}else{
								itemDate.push(_list[i].TestDate);
								itemList.push({
									TestDate:_list[i].TestDate,
									valueList:_val.concat()
								})
								itemList[itemList.length - 1].valueList[itemName.indexOf(_list[i].TypeName)] = _list[i].Value;
							}
						}
						vm.staminaName = itemName;
						vm.staminaDate = itemDate;
						vm.staminaList = itemList;
					} else {
						vm.$router.push({
							path: '/login'
						});
					}
				}).catch(function(error) {
					console.log(error);
				});
			
			},
			//查询体能测试项目
			getSportItem: function() {
				vm.$http.get(myPublic.publicUrl + '/API/Test/GetTrainName', {
					headers: {
						token: window.localStorage.getItem('Sport_Access_Token')
					}
				}).then(function(result) {
					if(result.body.StateCode == 0) {
						vm.trainAllList = [];
						for(var i = 0; i < result.body.Data.length; i++) {
							if(i%2 == 0){
								vm.trainAllList.push([result.body.Data[i]]);
							}else{
								vm.trainAllList[vm.trainAllList.length-1].push(result.body.Data[i]);
							}
						}
					} else {
						vm.$router.push({
							path: '/login'
						});
					}
				}).catch(function(error) {
					console.log(error);
				});
			},
			//获取远动员列表
			getSport: function() {
				vm.$http.get(myPublic.publicUrl + '/API/Account/GetMySportsman', {
					headers: {
						token: window.localStorage.getItem('Sport_Access_Token')
					}
				}).then(function(result) {
					if(result.body.StateCode == 0) {
						vm.sportList = result.body.Data;
						for(var i = 0;i<result.body.Data.length;i++){
							vm.userXuanZe.push(result.body.Data[i].UserId);
						}
						if(result.body.Data && result.body.Data.length > 0) {
							vm.sportIndex = window.sportIndex?window.sportIndex:0;
							vm.getList();
						}
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
					var isDate = _date1.split('-')[0] * 10000 + _date1.split('-')[1] * 100 + _date1.split('-')[2] * 1 <= _date2.split('-')[0] * 10000 + _date2.split('-')[1] * 100 + _date2.split('-')[2] * 1;
					if(_date2 == '' || isDate) {
						vm.getList();
						return;
					}
					myPublic.alertMy('开始时间不能大于结束时间');
					document.getElementById('starttime').value = document.getElementById('endtime').value;
					vm.getList();
				});
				document.getElementById('endtime-section').addEventListener('blur', function() {
					var _date1 = document.getElementById('starttime').value;
					var _date2 = document.getElementById('endtime').value;
					var _thisDate = myPublic.dateForFormat(null,'yyyy-MM-dd');
					var _isDate = _thisDate.split('-')[0] * 10000 + _thisDate.split('-')[1] * 100 + _thisDate.split('-')[2] * 1 < _date2.split('-')[0] * 10000 + _date2.split('-')[1] * 100 + _date2.split('-')[2] * 1;
					if(_isDate) {
						document.getElementById('endtime').value = _thisDate;
						vm.getList();
						return;
					}
					var isDate = _date1.split('-')[0] * 10000 + _date1.split('-')[1] * 100 + _date1.split('-')[2] * 1 <= _date2.split('-')[0] * 10000 + _date2.split('-')[1] * 100 + _date2.split('-')[2] * 1;
					if(_date1 == '' || isDate) {
						vm.getList();
						return;
					}
					myPublic.alertMy('开始时间不能大于结束时间');
					document.getElementById('endtime').value = document.getElementById('starttime').value;
					vm.getList();
				});
			}
		},
		beforeCreate: function() {
			vm = this;
		},
		beforeDestroy: function() {
			window.bus.$off('workout');
		},
		mounted: function() {
			vm.start();
		}
	}
</script>