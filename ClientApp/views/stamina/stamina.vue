<template>
	<div id="stamina">
		<header-component></header-component>
		<section class="content">
			<top-menu></top-menu>
			<div class="index-content">
				<div :style="{'height':(childNum == 1 || childNum == 2)?'39px':'0px','margin-bottom':(childNum == 1 || childNum == 2)?'20px':'0px'}" style="margin-right:20px;float:right;overflow: hidden;">
					<section class='mydate-box'>
						<input class='form_datetime' onclick='myDate.getFocus(this)' id='starttime' readonly='readonly' type='text'>
						<section id="starttime-section" tabindex='0' class='calendar' onclick="myDate.holdBubble()"></section>
					</section>
					<span>-</span>
					<section class='mydate-box'>
						<input class='form_datetime' onclick='myDate.getFocus(this)' id='endtime' readonly='readonly' type='text'>
						<section id="endtime-section" style="right:20px;" tabindex='0' class='calendar' onclick="myDate.holdBubble()"></section>
					</section>
				</div>
				<div style="clear: both;"></div>
				<section v-if="childNum == 1 || childNum == 2" class="">
					<div class="body-item">
						<div class="title">
							<ul class="title-tab">
								<li class="item" :class="{'current':childNum == 1}" v-on:click="childNum = 1">折线图</li>
								<li class="item" :class="{'current':childNum == 2}" v-on:click="childNum = 2">数据表</li>
							</ul>
							<div><span>体能测试数据</span><img v-on:click="childNum = 3" class="workout-add" src="../../assets/imgs/add.png"></div>
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
	</div>
</template>
<script>
	var vm;
	import header from '../../components/header.vue';
	import topMenu from '../../components/menu.vue';
	import childComponent1 from '../stamina/childNum1.vue';
	import childComponent2 from '../stamina/childNum2.vue';
	import childComponent3 from '../stamina/childNum3.vue';
	import '../../assets/styles/stamina.css';

	export default {
		//变量
		data: function() {
			return {
				childNum: 1,
				staminaList:[],
				staminaName:[],
				staminaDate:[]
			}
		},
		//公共模板
		components: {
			headerComponent: header,
			childComponentFirst: childComponent1,
			childComponentSecond: childComponent2,
			childComponentThird: childComponent3,
			topMenu: topMenu
		},
		watch: {},
		//计算属性
		computed: {},
		methods: {
			start: function() {
				document.getElementById('starttime').value = myPublic.dateForFormat(myPublic.getAddMonthDate(null, -4), 'yyyy-MM-dd')
				document.getElementById('endtime').value = myPublic.dateForFormat(null, 'yyyy-MM-dd')
				window.bus.$on('stamina', function(val) {
					vm.childNum = val;
					vm.getList();
				});
				vm.getList();
				vm.setTimeInp();
			},
			getList:function(){
				vm.$http.get(myPublic.publicUrl + '/API/Test/GetAllTrainResult', {
					params: {
						sportuserid: '',
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
						for(var i = 0;i<_list.length;i++){
							if(itemName.indexOf(_list[i].TypeName)<0){
								itemName.push(_list[i].TypeName);
							}
							
							
							if(itemDate.indexOf(_list[i].TestDate)>=0){
								//包含
								itemList[itemDate.indexOf(_list[i].TestDate)].valueList[itemName.indexOf(_list[i].TypeName)] = _list[i].Value;
							}else{
								itemDate.push(_list[i].TestDate);
								itemList.push({
									TestDate:_list[i].TestDate,
									valueList:[]
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
			setTimeInp:function(){
				document.getElementById('starttime-section').addEventListener('blur',function(){
					var _date1 = document.getElementById('starttime').value;
					var _date2 = document.getElementById('endtime').value;
					var isDate = _date1.split('-')[0]*10000 + _date1.split('-')[1]*100 + _date1.split('-')[2]*1 <= _date2.split('-')[0]*10000 + _date2.split('-')[1]*100 + _date2.split('-')[2]*1;
					if(_date2 == '' || isDate){
						vm.getList();
						return;
					}
					myPublic.alertMy('开始时间不能大于结束时间');
					document.getElementById('starttime').value = document.getElementById('endtime').value;
            		vm.getList();
				});
				document.getElementById('endtime-section').addEventListener('blur',function(){
					var _date1 = document.getElementById('starttime').value;
					var _date2 = document.getElementById('endtime').value;
					var _thisDate = myPublic.dateForFormat(null,'yyyy-MM-dd');
					var _isDate = _thisDate.split('-')[0] * 10000 + _thisDate.split('-')[1] * 100 + _thisDate.split('-')[2] * 1 < _date2.split('-')[0] * 10000 + _date2.split('-')[1] * 100 + _date2.split('-')[2] * 1;
					if(_isDate) {
						document.getElementById('endtime').value = _thisDate;
						vm.getList();
						return;
					}
					var isDate = _date1.split('-')[0]*10000 + _date1.split('-')[1]*100 + _date1.split('-')[2]*1 <= _date2.split('-')[0]*10000 + _date2.split('-')[1]*100 + _date2.split('-')[2]*1;
					if(_date1 == '' || isDate){
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
			window.bus.$off('stamina');
		},
		mounted: function() {
			vm.start();
		}
	}
</script>