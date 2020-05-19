<template>
	<div id="workout">
		<header-component></header-component>
		<section class="content">
			<top-menu></top-menu>
			<div class="index-content">
				<div :style="{'height':(childNum == 1 || childNum == 2)?'39px':'0px','margin-bottom':(childNum == 1 || childNum == 2)?'20px':'0px'}" style="margin-right:20px;float:right;overflow: hidden;">
					<select class="sport-list" v-model="sportIndex">
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
				</div>
				<div style="clear: both;"></div>
				<section v-if="childNum == 1 || childNum == 2" class="">
					<div class="body-item">
						<div class="title">
							<ul class="title-tab">
								<li class="item" :class="{'current':childNum == 1}" v-on:click="childNum = 1">折线图</li>
								<li class="item" :class="{'current':childNum == 2}" v-on:click="childNum = 2">数据表</li>
							</ul>
							<div><span>体能训练记录指标</span><img v-on:click="workoutAdd()" class="workout-add" src="../../assets/imgs/add.png"></div>
						</div>
						<section>
							<div class="table-box">
								<child-component-first v-bind:stamina-list="staminaList" v-bind:stamina-name="staminaName" v-bind:stamina-date="staminaDate" v-if="childNum == 1"></child-component-first>
								<child-component-second v-bind:stamina-list="staminaList" v-bind:stamina-name="staminaName" v-if="childNum == 2"></child-component-second>
							</div>
						</section>
					</div>
				</section>
				<child-component-third v-if="childNum == 3"></child-component-third>
			</div>
		</section>
		<div class="mask" v-if="daochu">
			<div class="daochu-mask">
				<div class="title">
					<img class="close-img" src="../../assets/imgs/close.png" v-on:click="daochu = false">
					<span>选择导出项</span>
					<input v-if="daochuNum == 1" style="margin: 17px 6px 0px 20px;vertical-align:  top;" value="1" type="checkbox" name="alldaochu" v-model="allDaoChu">
					<input v-if="daochuNum == 2" style="margin: 17px 6px 0px 20px;vertical-align:  top;" value="1" type="checkbox" name="alldaochunext" v-model="allDaoChuNext">
					<span>全选/全不选</span>
				</div>
				<div v-if="daochuNum == 1" class="daochu-table">
					<div style="line-height: 40px;float: left;width: 50%;" v-for="item in sportList"><input style="margin-left: 6px;" :value="item.UserId" type="checkbox" name="user" v-model="userXuanZe" />{{item.FullName}}</div>
				</div>
				<div v-if="daochuNum == 1" class="but-box"><button v-on:click="daochuNum = 2">下一步</button><button v-on:click="daochu = false">取消</button></div>
				
				<div v-if="daochuNum == 2" class="daochu-table">
					<table>
						<tr v-for="(item,index) in trainAllList">
							<td><input :value="item[0].TrainId" type="checkbox" name="daochu" v-model="trainList" />{{item[0].Name}}</td>
							<td v-if="item[1]"><input :value="item[1].TrainId" type="checkbox" name="daochu" v-model="trainList" />{{item[1].Name}}</td>
						</tr>
					</table>
				</div>
				<div v-if="daochuNum == 2" class="but-box"><a :href="daochuUrl">确认</a><button v-on:click="daochuNum = 1">上一步</button></div>
			</div>
		</div>
	</div>
</template>
<script>
	var vm;
	import header from '../../components/header.vue';
	import topMenu from '../../components/menu.vue';
	import childComponent1 from '../workout/childNum1.vue';
	import childComponent2 from '../workout/childNum2.vue';
	import childComponent3 from '../workout/childNum3.vue';
	import '../../assets/styles/workout.css';
	export default {
		//变量
		data: function() {
			return {
				allDaoChu:['1'],
				allDaoChuNext:[],
				userXuanZe:[],//导出用户名
				daochuNum:1,
				childNum:1,
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
			childComponentFirst:childComponent1,
			childComponentSecond:childComponent2,
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
			},
			allDaoChuNext:function(newVal,oldVal){
				if(newVal.length>0){
					vm.trainList
					for(var i = 0; i<vm.trainAllList.length;i++){
						vm.trainList.push(vm.trainAllList[i][0].TrainId);
						vm.trainList.push(vm.trainAllList[i][1].TrainId);
					}
				}else{
					vm.trainList = [];
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
				vm.$http.get(myPublic.publicUrl + '/API/Test/GetAllTrainNames', {
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
			},
			workoutAdd:function(){
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
		},
		mounted: function() {
			vm.start();
		}
	}
</script>